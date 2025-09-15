import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk ID

    trip_plan: {
      destination: { type: String, required: true },
      duration: { type: String, required: true },
      origin: { type: String, required: true },
      budget: { type: String, required: true },
      group_Size: { type: String, required: true },

      hotels: [
        {
          hotel_name: { type: String, required: true },
          hotel_address: { type: String, required: true },
          hotel_image_url: { type: String },
          price_per_night: { type: String },
          geo_coordinates: {
            latitude: { type: Number },
            longitude: { type: Number },
          },
          rating: { type: String },
          description: { type: String },
        },
      ],

      itinerary: [
        {
          day: { type: String, required: true },
          day_plan: { type: String },
          best_time_to_visit: { type: String },
          activities: [
            {
              place_name: { type: String, required: true },
              place_details: { type: String },
              place_image_url: { type: String },
              geo_coordinates: {
                latitude: { type: Number },
                longitude: { type: Number },
              },
              place_address: { type: String },
              ticket_pricing: { type: String },
              time_travel_each_location: { type: String },
              best_time_to_visit: { type: String },
            },
          ],
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Trip || mongoose.model("Trip", TripSchema);
