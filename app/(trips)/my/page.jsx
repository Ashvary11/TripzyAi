"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderFive } from "@/components/ui/loader";
import RemoveTrip from "@/components/RemoveTrip";

export default function My_Trip() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get("/api/trip");
        setTrips(res.data?.trips || []);
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
      <div className="flex justify-center items-center sm:text-6xl text-4xl sm:mt-[10%] mt-[50%]">
        <LoaderFive text="Fetching your trips..." />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col sm:items-center">
      {trips.length > 0 && (
        <h1 className="text-3xl font-bold mb-8 sm:text-center text-gray-800 dark:text-amber-100 text-left px-3">
          My Planned Trips
        </h1>
      )}

      {trips.length === 0 ? (
        <div
          className="p-10 flex flex-col items-center text-center
          bg-gradient-to-br from-orange-100 via-orange-50 to-white
          dark:from-gray-800 dark:via-gray-900 dark:to-gray-950
          rounded-3xl shadow-lg max-w-md w-full
          border border-orange-200 dark:border-orange-700/50
          dark:shadow-orange-900/20"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-200 dark:bg-amber-800/30 mb-6">
            <span className="text-3xl">🗺️</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-3 dark:text-amber-100">
            No Trips Yet
          </h2>

          <p className="text-sm text-gray-500 mb-6 max-w-xs dark:text-amber-100/80">
            Start planning your first adventure and create lasting memories.
          </p>

          <Link href="/create">
            <Button className="px-8 py-2 text-base rounded-full shadow-sm hover:shadow-md transition
              bg-amber-500 hover:bg-amber-600 text-white
              dark:bg-amber-700 dark:hover:bg-amber-600 cursor-pointer">
              ✨ Create New Trip
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col hover:-translate-y-1 w-full max-w-md 
                dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 
                dark:border dark:border-orange-700/30 dark:hover:orange-amber-500/50
                dark:shadow-amber-900/10 dark:hover:shadow-amber-800/20 relative"
            >
              {/* Remove Trip Button */}
              <div className="absolute top-3 right-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                <RemoveTrip
                  tripId={trip._id}
                  onDeleted={(deletedId) =>
                    setTrips((prev) => prev.filter((t) => t._id !== deletedId))
                  }
                />
              </div>

              {/* Trip Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-amber-100">
                  {trip.trip_plan.origin} ➝ {trip.trip_plan.destination}
                </h2>
                <p className="text-sm text-gray-500 mt-2 dark:text-amber-100/90">
                  {trip.trip_plan.duration} | Budget:{" "}
                  <span className="font-medium text-gray-700 dark:text-amber-200">
                    {trip.trip_plan.budget}
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-amber-100/90">
                  Group: {trip.trip_plan.group_size}
                </p>
              </div>

              {/* Hotels Preview */}
              {trip.trip_plan.hotels?.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-sm font-semibold mb-3 text-indigo-600 dark:text-amber-400">
                    Hotels
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {trip.trip_plan.hotels.map((hotel, idx) => (
                      <div
                        key={idx}
                        className="min-w-[140px] rounded-xl border p-2 bg-gray-50 shadow-sm hover:shadow-md transition 
                          dark:bg-gray-700/50 dark:border-amber-600/30 dark:text-amber-100
                          dark:hover:bg-gray-700/70 dark:hover:border-amber-500/50"
                      >
                        <img
                          src={hotel.hotel_image_url}
                          alt={hotel.hotel_name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <p className="text-xs font-semibold mt-2 truncate dark:text-amber-100">
                          {hotel.hotel_name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-amber-100/80">
                          {hotel.price_per_night}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex justify-between items-center border-t pt-4 dark:border-amber-700/30">
                <Link href={`/my/${trip._id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="cursor-pointer hover:bg-orange-100
                      dark:border-amber-600 dark:text-amber-100 dark:hover:bg-amber-800/30
                      dark:hover:text-amber-50 dark:hover:border-amber-500"
                  >
                    View Trip
                  </Button>
                </Link>

                <p className="text-xs text-gray-400 dark:text-amber-100/60">
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