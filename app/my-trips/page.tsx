"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TripInfo } from "../create-new-trip/_components/ChatBox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderFive } from "@/components/ui/loader";
// import Image from "next/image";

type TripDocument = {
  _id: string;
  userId: string;
  trip_plan: TripInfo;
  createdAt: string;
  updatedAt: string;
};

export default function My_Trip() {
  const [trips, setTrips] = useState<TripDocument[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get<{ trips: TripDocument[] }>("/api/trip");
        setTrips(res.data?.trips || []);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching trips", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);
  if (loading)
    return (
      <div className="flex justify-center items-center  text-6xl mt-[10%]">
        <LoaderFive text="Fetching your trips..." />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center ">
      {trips.length > 0 && (
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          My Planned Trips
        </h1>
      )}

      {trips.length == 0 ? (
        <div
          className="  p-10 flex flex-col items-center text-center
    bg-gradient-to-br from-orange-100 via-yellow-50 to-white
    dark:from-gray-900 dark:via-gray-950 dark:to-black
    rounded-3xl shadow-lg max-w-md w-full
    border border-orange-200 dark:border-amber-100"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-200 mb-6 ">
            <span className="text-3xl">🗺️</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-3 dark:text-white">
            No Trips Yet
          </h2>

          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Start planning your first adventure and create lasting memories.
          </p>

          <Link href={"/create-new-trip"}>
            <Button className="px-8 py-2 text-base rounded-full shadow-sm hover:shadow-md transition">
              ✨ Create New Trip
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col hover:-translate-y-1 w-full max-w-md dark:bg-gray-700 "
            >
              {/* Header */}
              <div className="flex-1 dark:text-white">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {trip.trip_plan.origin} ➝ {trip.trip_plan.destination}
                </h2>
                <p className="text-sm text-gray-500 mt-2 dark:text-white ">
                  {trip.trip_plan.duration} | Budget:{" "}
                  <span className="font-medium text-gray-700 dark:text-white">
                    {trip.trip_plan.budget}
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-white">
                  Group: {trip.trip_plan.group_size}
                </p>
              </div>

              {/* Hotels Preview */}
              {trip.trip_plan.hotels?.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-sm font-semibold mb-3 text-indigo-600">
                    Hotels
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {trip.trip_plan.hotels.map((hotel, idx) => (
                      <div
                        key={idx}
                        className="min-w-[140px] rounded-xl border p-2 bg-gray-50 shadow-sm hover:shadow-md transition dark:bg-gray-600 dark:text-white "
                      >
                        <img
                          src={hotel.hotel_image_url}
                          alt={hotel.hotel_name}
                          className="w-full h-24 object-cover rounded-lg "
                        />
                        <p className="text-xs font-semibold mt-2 truncate">
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
              <div className="mt-6 flex justify-between items-center border-t pt-4">
                <Link href={`/my-trips/${trip._id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="cursor-pointer hover:bg-orange-100"
                  >
                    View Trip
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
