"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TripInfo } from "../create-new-trip/_components/ChatBox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TripDocument = {
  _id: string;
  userId: string;
  trip_plan: TripInfo;
  createdAt: string;
  updatedAt: string;
};
export default function My_Trip() {
  const [trips, setTrips] = useState<TripDocument[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get<{ trips: TripDocument[] }>("/api/trip");
        setTrips(res.data?.trips || []);
        console.log("Trips fetched:", res.data);
      } catch (err) {
        console.error("Error fetching trips", err);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="m-auto flex  flex-col justify-center items-center">
      <h1>My Created Trips</h1>
      {trips.length === 0 ? (
        <div className="p-7 flex rounded-2xl justify-center items-center gap-5 flex-col ">
          <h2>You don't have any trip plan created!</h2>
          <Link href={"/create-new-trip"}>
            <Button>Create New Trip</Button>{" "}
          </Link>
        </div>
      ) :
        (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip, i) => (
              <div
                key={trip._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col"
              >
                {/* Header */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {trip.trip_plan.origin} ➝ {trip.trip_plan.destination}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {trip.trip_plan.duration} | Budget: {trip.trip_plan.budget}
                  </p>
                  <p className="text-sm text-gray-500">
                    Group: {trip.trip_plan.group_size}
                  </p>
                </div>

                {/* Hotels Preview */}
                {trip.trip_plan.hotels?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2 text-indigo-500">
                      Hotels
                    </h3>
                    <div className="flex gap-3 overflow-x-auto">
                      {/* //remove slice  */}
                      {trip.trip_plan.hotels.map((hotel, idx) => (
                        <div
                          key={idx}
                          className="min-w-[120px] rounded-xl border p-2 bg-gray-50 shadow-sm"
                        >
                          <img
                            src={hotel.hotel_image_url}
                            alt={hotel.hotel_name}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <p className="text-xs font-semibold mt-2">
                            {hotel.hotel_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {hotel.price_per_night}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-5 flex justify-between items-center">
                  <Link href={`/my-trips/${trip._id}`}>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </Link>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(trip.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>


        )}
    </div>
  );
}
