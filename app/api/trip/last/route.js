import connectToDb from "../../../../lib/dbConfig";
import { currentUser } from "@clerk/nextjs/server";
import Trip from "../../../../models/TripModel";

export async function GET() {
  try {
    await connectToDb();
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    const lastTrip = await Trip.findOne({ userId: clerkUser.id })
      .sort({ createdAt: -1 })
      .lean();

    if (!lastTrip) {
      return new Response(JSON.stringify({ error: "No trips found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(lastTrip), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
