// import { currentUser } from "@clerk/nextjs/server";
import User from "@/models/UserModel";
import connectToDb from "../../lib/dbConfig";
import Trip from "../../models/TripModel";


export default async function createAndSaveTrip(data, userId) {
  try {
    await connectToDb();
    if (!userId) {
      return { error: "User Id required" };
    }
 
    let user = await User.findOne({ userId: userId });
    if (!user) {
      user = await User.create({
        userId: userId,
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
