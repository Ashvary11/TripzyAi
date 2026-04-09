import { NextRequest   } from "next/server";
import connectToDb from "../../../../lib/dbConfig";
// import { currentUser } from "@clerk/nextjs/server";
import Trip from "../../../../models/TripModel";


export async function GET(req: NextRequest) {
  try {

    await connectToDb(); 
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const lastTrip = await Trip.findOne({ userId: userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!lastTrip) {
      return new Response(JSON.stringify({ error: "No trips found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(lastTrip), { status: 200 });
  } catch (err:any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}