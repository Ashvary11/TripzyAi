import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { currentUser } from "@clerk/nextjs/server";
// import { aj } from "../arcjet/route";
import { ArcjetRateLimitReason } from "@arcjet/next";
import axios from "axios";
import createAndSaveTrip from "../trip/createAndSave.js";
import { aj } from "@/lib/arject";

// ----------------- Memory Setup -----------------
const messageHistories = new Map<string, InMemoryChatMessageHistory>();

// ----------------- Prompt -----------------

const Prompt = `You are an AI Trip Planner Agent. 
Your goal is to help the user plan a trip by asking one relevant trip-related question at a time. 

If the user sends a message such as "Create New Trip", "Inspire me where to go", "Discover hidden gems", or "Adventure Destination", first respond with a travel suggestion, then continue the planning flow.

Ask questions in this exact order, waiting for the user's answer before moving to the next:
1. Starting location (source)
2. Destination country or city
3. Group size (solo, couple, family, friends)
4. Budget (low, medium, high)
5. Trip duration (number of days)
6. Traveler interests (adventure, sightseeing, cultural, food, nightlife, relaxation)
7. Special requirements or preferences (if any)

Rules:
- Never ask multiple questions at once.
- Never ask irrelevant questions.
- If an answer is missing or unclear, politely ask for clarification.
- If the user has already provided all required details in one message, skip questions and generate the final trip plan immediately using the FinalPrompt schema.
- Keep responses conversational and interactive.

Response format:
Always return strict JSON only (no explanations, no markdown, no code fences).

Schema:
{{
  "resp": "Your text response here",
  "ui": "budget | groupSize | tripDuration | interests | final"
}}

Important:
- After collecting all required details, always return with "ui": "final".
`;

const FinalPrompt = `Generate a detailed Travel Plan with the given details. 

Requirements:
- Provide hotel options (name, address, price, image URL, geo coordinates, rating, description).
- Provide a full itinerary with day-wise plans, places to visit, details, geo coordinates, address, ticket pricing, travel time, and best time to visit.
- Reply with strict JSON only (no explanations, no markdown, no code fences).

Schema:
{{
  "trip_plan": {{
    "destination": string,
    "duration": string,
    "origin": string,
    "budget": string,
    "group_Size": string,
    "hotels": [
      {{
        "hotel_name": string,
        "hotel_address": string,
        "hotel_image_url": string
        "price_per_night": string,
        "geo_coordinates": {{
          "latitude": number,
          "longitude": number
        }},
        "rating": string,
        "description": string
      }}
    ],
    "itinerary": [
      {{
        "day": string,
        "day_plan": string,
        "best_time_to_visit": string,
        "activities": [
          {{
            "place_name": string,
            "place_details": string,
            "place_image_url": string,
            "geo_coordinates": {{
              "latitude": number,
              "longitude": number
            }},
            "place_address": string,
            "ticket_pricing": string,
            "time_travel_each_location": string,
            "best_time_to_visit": string
          }}
        ]
      }}
    ]
  }}
}}
  
Important:
- Use only **direct HTTPS links from Unsplash, Wikimedia Commons, or official hotel/tourism websites** for hotel_image_url and place_image_url.
- Do not use example.com, Googleusercontent, or placeholders. The URL must point directly to an image file. 
- After collecting all required details, always return with "ui": "final".

`;

// ----------------- Model -----------------
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash", //
  apiKey: process.env.GOOGLE_API_KEY!,
  temperature: 0,
});

// ----------------- API Route -----------------
export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId, isFinal } = await req.json();
    console.log("backend", messages, sessionId);

    if (!messages || !sessionId) {
      return NextResponse.json(
        { error: "message and sessionId are required" },
        { status: 400 }
      );
    }
    // ------ rate limiting
    const user = await currentUser();
    const decision = await aj.protect(req, {
      userId: user?.primaryEmailAddress?.emailAddress ?? "",
      requested: isFinal ? 1 : 0,
    }); // Deduct 1 tokens from the bucket
    // console.log("Arcjet decision", decision);

    const reason = decision.reason as ArcjetRateLimitReason;
    console.log("Arcjet reson", reason);

    if (reason?.remaining == 0) {
      return NextResponse.json({
        resp: "You have utilised all Credit for today",
        ui: "limit",
      });
    }

    // ---------------------

    // ----------------- Prompt Template -----------------
    const chatPrompt = ChatPromptTemplate.fromMessages([
      ["system", isFinal ? FinalPrompt : Prompt],
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
      { configurable: { sessionId } }
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
        // console.log("Saved trip ID:", result.tripId);
      } catch (err) {
        console.error("Failed to save trip", err);
      }
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
