import { currentUser } from "@clerk/nextjs/server";
import connectToDb from "../../../lib/dbConfig";
import User from "../../../models/UserModel";
import Trip from "../../../models/TripModel";

export default async function createAndSaveTrip(data) {
  try {
    await connectToDb();
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    let user = await User.findOne({ clerkId: clerkUser.id });

    if (!user) {
      user = await User.create({
        clerkId: clerkUser.id,
        name: clerkUser.fullName,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        imageUrl: clerkUser.imageUrl,
      });
    }

    const newTrip = await Trip.create({
      userId: clerkUser.id, // link trip to Clerk user
      trip_plan: data ,
    });
    console.log("function triggred and saved");
    
    return {
      message: "Trip saved successfully",
      user: user,
      trip: newTrip,
    };
  } catch (err) {
    return { error: err.message };
  }
}
