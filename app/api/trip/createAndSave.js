// import { currentUser } from "@clerk/nextjs/server";
import connectToDb from "../../../lib/dbConfig";
import User from "../../../models/UserModel";
import Trip from "../../../models/TripModel";


export default async function createAndSaveTrip(data, userId) {
  try {
    await connectToDb();
    if (!userId) {
      return { error: "User Id required" };
    }
    // const clerkUser = await currentUser();

    // if (!clerkUser) {
    //   return new Response(JSON.stringify({ error: "Not authenticated" }), {
    //     status: 401,
    //   });
    // }

    // let user = await User.findOne({ clerkId: clerkUser.id });
    let user = await User.findOne({ userId: userId });


    // if (!user) {
    //   user = await User.create({
    //     clerkId: clerkUser.id,
    //     name: clerkUser.fullName,
    //     email: clerkUser.emailAddresses[0]?.emailAddress,
    //     imageUrl: clerkUser.imageUrl,
    //   });
    // }
    if (!user) {
      user = await User.create({
        userId: userId.id,
      });
    }

    const newTrip = await Trip.create({
      userId: userId, 
      trip_plan: data,
    });
    console.log("function triggred and saved");

    return {
      message: "Trip saved successfully",
      user: user,
      trip: newTrip,
      // tripId: newTrip._id.toString(),
    };
  } catch (err) {
    return { error: err.message };
  }
}
