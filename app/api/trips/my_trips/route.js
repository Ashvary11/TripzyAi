import connectToDb from "../../../../lib/dbConfig";
import Trip from "../../../../models/TripModel";

export async function GET(req) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    const trips = await Trip.find({ userId }).sort({ createdAt: -1 }).lean();

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