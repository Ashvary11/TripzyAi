import { NextRequest, NextResponse } from "next/server";
import { messageHistories } from "@/lib/messageHistories";
  
export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "SessionId is required" },
        { status: 400 }
      );
    }
    // console.log("messageHistoriesBeforClear",messageHistories);

    
    if (messageHistories.has(sessionId)) {
      messageHistories.delete(sessionId);
      // console.log(`Cleared message history for session: ${sessionId}`);
    }
    //  console.log("messageHistoriesAfterClear--",messageHistories);
    return NextResponse.json({
      success: true,
      sessionId,
      message: "Chat history cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing chat history:", error);
    return NextResponse.json(
      { error: "Failed to clear chat history" },
      { status: 500 }
    );
  }
}
