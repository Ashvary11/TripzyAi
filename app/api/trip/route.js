import connectToDb from "../../../lib/dbConfig";
import { currentUser } from "@clerk/nextjs/server";
import Trip from "../../../models/TripModel";

 
export async function GET() {
  try {
    await connectToDb();
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    const trips = await Trip.find({ userId: clerkUser.id });
    // const trips = await Trip.find({
    //   userId: "user_3209fVYxW0tvYdnMfxvatMB9aNa",
    // });

    return new Response(
      JSON.stringify({
        count: trips.length,
        trips,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
