import { NextRequest } from "next/server";
import connectToDb from "../../../lib/dbConfig";
import Trip from "../../../models/TripModel";

export async function GET(req: NextRequest) {
  try {
    await connectToDb();

    const trips = await Trip.find().sort({ createdAt: -1 }).limit(20).lean();
    if (!trips) {
      return new Response(JSON.stringify({ error: "Trips not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(trips), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
