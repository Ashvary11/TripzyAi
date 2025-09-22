"use client";

import React, { useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  HotelIcon,
  Star,
  Ticket,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconBrandGoogleMaps } from "@tabler/icons-react";
import { useTrip } from "@/app/(trips)/TripContext";
import { GlobeDemo } from "@/components/Globe";

export function Itineray() {
  const { trip_data } = useTrip();
  const [showGlobe, setShowGlobe] = useState(false);

  const data = !trip_data
    ? []
    : [
        {
          title: "Recommended Hotels",
          content: (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {trip_data?.hotels.map((hotel, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm"
                >
                  <Image
                    src={hotel?.hotel_image_url}
                    alt={hotel?.hotel_name}
                    width={400}
                    height={200}
                    className="rounded-2xl shadow object-cover w-full h-48"
                    unoptimized
                  />
                  <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {hotel?.hotel_name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">
                    {hotel?.hotel_address}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="flex gap-2 text-green-600 items-center">
                      <Wallet /> {hotel?.price_per_night}
                    </p>
                    <p className="flex gap-2 text-yellow-500 items-center">
                      <Star /> {hotel?.rating}
                    </p>
                  </div>
                  <p className="text-gray-500 dark:text-gray-300 text-sm line-clamp-2">
                    {hotel?.description}
                  </p>
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      hotel?.hotel_name
                    )}`}
                    target="_blank"
                  >
                    <Button variant="outline" className="mt-2 w-full text-sm">
                      View <HotelIcon className="inline-block ml-1" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ),
        },
        ...(trip_data?.itinerary || []).map((dayData, i) => ({
          title: `Day ${dayData?.day}`,
          content: (
            <div key={i} className="flex flex-col gap-4">
              <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Best Time: {dayData?.best_time_to_visit}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {(dayData.activities || []).map((activity, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm flex flex-col gap-2"
                  >
                    <Image
                      src={activity?.place_image_url}
                      width={400}
                      height={200}
                      alt={activity?.place_name}
                      className="w-full h-48 object-cover rounded-xl"
                      unoptimized
                    />
                    <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                      {activity?.place_name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-300 text-sm line-clamp-2">
                      {activity?.place_details}
                    </p>
                    <p className="flex gap-2 text-blue-500 items-center text-sm">
                      <Ticket /> {activity?.ticket_pricing}
                    </p>
                    <p className="flex gap-2 text-blue-500 items-center text-sm">
                      <Clock /> {activity?.best_time_to_visit}
                    </p>
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        activity?.place_name
                      )}`}
                      target="_blank"
                    >
                      <Button
                        className="w-full mt-2 text-sm"
                        variant="outline"
                        size="sm"
                      >
                        View{" "}
                        <IconBrandGoogleMaps className="inline-block ml-1" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ),
        })),
      ];

  return (
    <div className="relative w-full h-[85vh] overflow-y-auto p-4">
      {trip_data ? (
        <Timeline data={data} trip_data={trip_data} />
      ) : (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
          <div className="absolute top-3 right-3 z-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGlobe((prev) => !prev)}
              className="cursor-pointer"
            >
              {showGlobe ? "Hide Globe" : "Show Globe"}
            </Button>
          </div>

          {showGlobe ? (
            <GlobeDemo />
          ) : (
            <>
              <Image
                src={"/hottel1.jpg"}
                width={400}
                height={400}
                alt="travel"
                className="w-full h-full object-cover rounded-2xl"
                unoptimized
              />
              <p className="absolute bottom-3 left-3 flex items-center text-white text-sm md:text-base rounded-lg font-bold bg-black/40 p-2">
                <ArrowLeft className="w-4 h-4 mr-1" /> Plan the best trip for
                yourself...
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
