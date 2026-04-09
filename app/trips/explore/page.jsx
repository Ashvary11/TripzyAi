"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderFive } from "@/components/ui/loader";

export default function All_Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const trips = await axios.get(`/api/trips`);
        console.log(trips);

        setTrips(trips.data || []);
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
        <LoaderFive text="Fetching  trips..." />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
          All Trips
        </h1>

        {trips.length !== 0 && (
          <Link href="/trips/create">
            <Button className="rounded-full px-5 hover:bg-orange-700 hover:cursor-pointer hover:dark:text-white">
              + New Trip
            </Button>
          </Link>
        )}
      </div>

      {/* Empty State */}
      {trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 border rounded-2xl dark:border-gray-800">
          <div className="text-5xl mb-4">🧳</div>
          <h2 className="text-lg font-semibold">No trips yet</h2>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Start planning your first journey
          </p>

          <Link href="/trips/create" >
            <Button className="cursor-pointer">Create Trip</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="border rounded-2xl p-5 bg-white dark:bg-gray-900 dark:border-gray-800 hover:shadow-md transition hover:bg-orange-600/30 dark:hover:bg-orange-600/10"
            >
              {/* Top */}
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">
                  {trip.trip_plan.origin} → {trip.trip_plan.destination}
                </h2>
              </div>

              {/* Meta */}
              <div className="text-sm text-gray-500 mt-2 space-y-1">
                <p>{trip.trip_plan.duration}</p>
                <p>💰 {trip.trip_plan.budget}</p>
                <p>👥 {trip.trip_plan.group_size}</p>
              </div>

              {/* Hotels (clean preview) */}
              {trip.trip_plan.hotels?.length > 0 && (
                <div className="mt-4 flex -space-x-2">
                  {trip.trip_plan.hotels.slice(0, 3).map((hotel, i) => (
                    <img
                      key={i}
                      src={hotel.hotel_image_url}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                    />
                  ))}
                  {trip.trip_plan.hotels.length > 3 && (
                    <div className="w-10 h-10 flex items-center justify-center text-xs bg-gray-200 rounded-full">
                      +{trip.trip_plan.hotels.length - 3}
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-between items-center mt-5">
                <Link href={`/trips/${trip._id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:cursor-pointer"
                  >
                    View
                  </Button>
                </Link>

                <span className="text-xs text-gray-400">
                  {new Date(trip.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
