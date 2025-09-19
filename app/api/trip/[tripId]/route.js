import connectToDb from "../../../../lib/dbConfig";
// import { currentUser } from "@clerk/nextjs/server";
import Trip from "../../../../models/TripModel";

export async function GET(req, { params }) {
  try {
    await connectToDb();
    // const clerkUser = await currentUser();
    // if (!clerkUser) {
    //   return new Response(JSON.stringify({ error: "Not authenticated" }), {
    //     status: 401,
    //   });
    // }

    const { tripId } = params;  

    const trip = await Trip.findById(tripId);  

    if (!trip) {
      return new Response(JSON.stringify({ error: "Trip not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(trip), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}


// DELETE /api/trips/[tripId]
export async function DELETE(req, { params }) {
  try {
    await connectToDb();
    // const clerkUser = await currentUser();
    // if (!clerkUser) {
    //   return new Response(JSON.stringify({ error: "Not authenticated" }), {
    //     status: 401,
    //   });
    // }

    const { tripId } = params;

    const deletedTrip = await Trip.findByIdAndDelete(tripId);

    if (!deletedTrip) {
      return new Response(JSON.stringify({ error: "Trip not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Trip deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}