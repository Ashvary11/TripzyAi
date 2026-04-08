const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // clerkId: { type: String, unique: true },
    // name: {
    //   type: String,
    // },
    // imageUrl: {
    //   type: String,
    // },
    // email: {
    //   type: String,
    // },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
