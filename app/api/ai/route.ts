import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ArcjetRateLimitReason } from "@arcjet/next";
import createAndSaveTrip from "../trip/createAndSave.js";
import { aj } from "@/lib/arject";
import {
  TripPlannerPrompt,
  FinalTripPlannerPrompt,
} from "@/lib/prompts/tripPlannerPrompts";
import { messageHistories } from "@/lib/messageHistories";

// ----------------- Model -----------------
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash-lite-preview",
  apiKey: process.env.GOOGLE_API_KEY!,
  temperature: 0,
  maxRetries: 0,
});

// ----------------- API Route -----------------
export async function POST(req: NextRequest) {
  // console.log("messageHistories", messageHistories);

  try {
    const { messages, sessionId, isFinal, userId } = await req.json();

    // console.log("fetch  userId local", userId);
    // console.log("backend", messages, sessionId);

    if (!messages || !sessionId) {
      return NextResponse.json(
        { error: "message and sessionId are required" },
        { status: 400 },
      );
    }

    // ------ rate limiting
    const user = userId || req.headers.get("x-forwarded-for") || "anon";
    // Apply rate limit
    // const decision = await aj.protect(req, {
    //   userId: user?.primaryEmailAddress?.emailAddress ?? "",
    //   requested: isFinal ? 1 : 0,
    // });

    // const reason = decision.reason as ArcjetRateLimitReason;
    // console.log("Arcjet reson", reason);

    // if (reason?.remaining == 0) {
    //   return NextResponse.json({
    //     resp: "You have reached your trip creation limit for today. Please try again tomorrow.",
    //     ui: "limit",
    //   });
    // }
    // ---------------
    // Apply rate limit
    const decision = await aj.protect(req, {
      userId: user,
      requested: 1, // x deduct bucket request per message
    });
    console.log("ArcJetdecision-", decision.reason);

    if (decision.isDenied()) {
      return NextResponse.json(
        {
          error: "RATE_LIMIT_EXCEEDED",
          message: "⚡ Too many messages! Please wait a few seconds.",
          source: "limit",
        },
        { status: 429 },
      );
    }
    // ----------------- Prompt Template -----------------

    const chatPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        isFinal ? FinalTripPlannerPrompt : TripPlannerPrompt(user?.firstName),
      ],
      ["placeholder", "{history}"],
      ["human", "{input}"],
    ]);

    // ----------------- Chain with Memory -----------------
    const chain = chatPrompt.pipe(llm);

    const chainWithHistory = new RunnableWithMessageHistory({
      runnable: chain,
      getMessageHistory: async (sessionId: string) => {
        if (!messageHistories.has(sessionId)) {
          messageHistories.set(sessionId, new InMemoryChatMessageHistory());
        }
        return messageHistories.get(sessionId)!;
      },
      inputMessagesKey: "input",
      historyMessagesKey: "history",
    });

    // ------------------------
    const lastMessage = Array.isArray(messages)
      ? messages[messages.length - 1]?.content
      : messages;

    const inputMessage = isFinal
      ? `Here is all the trip information collected so far:\n${
          Array.isArray(messages)
            ? messages.map((m: any) => `${m.role}: ${m.content}`).join("\n")
            : messages
        }\n\nNow generate the full trip plan strictly based on the above. Do not change the destination or any detail.`
      : lastMessage;

    // ----------------- Invoke with Retry -----------------
    const invokeWithRetry = async (input: string, retries = 2) => {
      for (let i = 0; i <= retries; i++) {
        try {
          const response = await chainWithHistory.invoke(
            { input },
            { configurable: { sessionId } },
          );

          let rawContent: string;
          if (typeof response.content === "string") {
            rawContent = response.content;
          } else if (Array.isArray(response.content)) {
            rawContent = response.content
              .map((part: any) => (part.text ? part.text : ""))
              .join(" ")
              .trim();
          } else {
            rawContent = String(response.content ?? "");
          }

          rawContent = rawContent
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

          const parsed = JSON.parse(rawContent); // throws if malformed → retry
          return parsed;
        } catch (err: any) {
          const isLastAttempt = i === retries;
          const isAiBusy =
            err?.status === 429 ||
            err?.status === 503 ||
            err?.message?.includes("quota") ||
            err?.message?.includes("overloaded") ||
            err?.message?.includes("rate limit");

          if (isLastAttempt || !isAiBusy) throw err;

          console.warn(`Retry ${i + 1} due to AI error:`, err?.message);
          await new Promise((res) => setTimeout(res, 1500 * (i + 1)));
        }
      }
    };

    const parsed = await invokeWithRetry(inputMessage);

    console.log("parsed_Ai_Response:--", parsed);
    console.log("parsed.trip_plan check for save trip:--", parsed.trip_plan);
    // console.log("userID in chat box:--", user);

    if (parsed.trip_plan) {
      try {
        const result = await createAndSaveTrip(parsed.trip_plan, user);
        console.log("Trip-Saved with Id:", result);
        setTimeout(() => {
          messageHistories.delete(sessionId);
        }, 5000);
        // console.log("messageHistories:", messageHistories);
      } catch (err) {
        console.error("Failed to save trip", err);
      }
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("ERROR:", error);

    const message = error?.message || "";
    const status = error?.status || error?.response?.status;

    if (
      status === 429 ||
      status === 503 ||
      message.includes("quota") ||
      message.includes("rate limit") ||
      message.includes("overloaded") ||
      message.includes("429")
    ) {
      return NextResponse.json(
        {
          error: "AI_MODEL_BUSY",
          message:
            "⚡ AI is currently busy due to high demand (free tier). Please try again in a few seconds.",
          source: "ai",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        error: "SERVER_ERROR",
        message: "⚠️ Something went wrong on our side.",
        source: "server",
      },
      { status: 500 },
    );
  }
}
