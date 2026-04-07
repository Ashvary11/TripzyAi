import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { currentUser } from "@clerk/nextjs/server";
import { ArcjetRateLimitReason } from "@arcjet/next";
import createAndSaveTrip from "../trip/createAndSave.js";
import { aj } from "@/lib/arject";
import {
  TripPlannerPrompt,
  FinalTripPlannerPrompt,
} from "@/lib/prompts/tripPlannerPrompts";
import { messageHistories } from "@/lib/messageHistories";

// ----------------- Memory Setup -----------------

// ----------------- Model -----------------
const llm = new ChatGoogleGenerativeAI({
  // model: "gemini-2.0-flash",
  // model: "gemini-2.5-flash",
  // model: "gemini-2.5-flash-lite",
  model: "gemini-3.1-flash-lite-preview",
  apiKey: process.env.GOOGLE_API_KEY!,
  temperature: 0,
  maxRetries: 0,
});

// ----------------- API Route -----------------
export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId, isFinal } = await req.json();
    console.log("backend", messages, sessionId);

    if (!messages || !sessionId) {
      return NextResponse.json(
        { error: "message and sessionId are required" },
        { status: 400 },
      );
    }
    // ------ rate limiting
    const user = await currentUser();
    // console.log("user----------", user);

    const decision = await aj.protect(req, {
      userId: user?.primaryEmailAddress?.emailAddress ?? "",
      requested: isFinal ? 1 : 0,
    }); // Deduct 1 tokens from the bucket
    // console.log("Arcjet decision", decision);

    const reason = decision.reason as ArcjetRateLimitReason;
    console.log("Arcjet reson", reason);

    if (reason?.remaining == 0) {
      return NextResponse.json({
        resp: "You have reached your trip creation limit for today. Please try again tomorrow.",
        ui: "limit",
      });
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

    const response = await chainWithHistory.invoke(
      { input: lastMessage },
      { configurable: { sessionId } },
    );

    // console.log("AI Raw Response:", response);
    //  Normalize Gemini response (string or array of objects)
    let rawContent: string;
    if (typeof response.content === "string") {
      rawContent = response.content;
    } else if (Array.isArray(response.content)) {
      // Join all text parts together
      rawContent = response.content
        .map((part: any) => (part.text ? part.text : ""))
        .join(" ")
        .trim();
    } else {
      rawContent = String(response.content ?? "");
    }
    //  clean accidental markdown fences if Gemini still adds them

    rawContent = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    //  Parse to JSON
    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = { resp: response.content, ui: "final" }; // fallback
    }
    // console.log("messagehistry Obj:--", messageHistories);
    console.log("backed_parsed:--", parsed);
    //
    if (parsed.trip_plan) {
      try {
        const result = await createAndSaveTrip(parsed.trip_plan);
        console.log("Saved trip ID:", result);
        setTimeout(() => {
          messageHistories.delete(sessionId);
        }, 5000);

        console.log("messageHistories:", messageHistories);
      } catch (err) {
        console.error("Failed to save trip", err);
      }
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("ERROR:", error);

    // Detect AI provider errors
    const message = error?.message || "";
    const status = error?.status || error?.response?.status;
    // ✅ Detect Gemini overload / free tier limits
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
        { status: 503 }
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
