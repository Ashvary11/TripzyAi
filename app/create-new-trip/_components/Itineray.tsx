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
import { useTrip } from "@/app/TripContext";

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
            <div
              className=" gap-2"
              // className="grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              {trip_data?.hotels.map((hotel, index) => {
                return (
                  <div key={index} className="flex flex-col gap-1">
                    <Image
                      // src={"/hottel1.jpg"}
                      src={hotel?.hotel_image_url}
                      alt={hotel?.hotel_name}
                      width={400}
                      height={200}
                      className="rounded-2xl shadow object-cover mb-2"
                      unoptimized
                    />
                    <h2 className="font-semibold text-lg">
                      {hotel?.hotel_name}
                    </h2>
                    <h2 className="text-gray-500">{hotel?.hotel_address}</h2>
                    <div className="flex justify-between  items-center">
                      <p className="flex gap-2 text-green-600">
                        <Wallet /> {hotel?.price_per_night}
                      </p>
                      <p className="flex gap-2 text-yellow-600">
                        <Star /> {hotel?.rating}
                      </p>
                    </div>
                    <p className="line-clamp-2 text-gray-500">
                      {hotel?.description}
                    </p>
                    <Link
                      href={
                        "https://www.google.com/maps/search/?api=1&query=" +
                        hotel?.hotel_name
                      }
                      target="_blank"
                    >
                      <Button variant={"outline"} className="mt-1 w-full">
                        View <HotelIcon />
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          ),
        },
        ...(trip_data?.itinerary || []).map((dayData, i) => ({
          title: `Day ${dayData?.day}`,
          content: (
            <div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  Best Time : {dayData?.best_time_to_visit}
                  {(dayData.activities || []).map((activity, i) => (
                    <div key={i}>
                      <Image
                        // src={"/hottel1.jpg"}
                        src={activity?.place_image_url}
                        width={400}
                        height={200}
                        alt={activity?.place_name}
                        className="object-cover rounded-xl"
                        unoptimized
                      />
                      <h2 className="font-semibold text-lg">
                        {activity?.place_name}
                      </h2>
                      <p className="text-gray-500 line-clamp-2">
                        {activity?.place_details}
                      </p>
                      <h2 className="flex text-blue-500 line-clamp-1 gap-2">
                        <Ticket /> {activity?.ticket_pricing}
                      </h2>
                      <p className="flex text-blue-500 line-clamp-1 gap-2">
                        <Clock /> {activity?.best_time_to_visit}
                      </p>
                      <Link
                        href={
                          "https://www.google.com/maps/search/?api=1&query=" +
                          activity?.place_name
                        }
                        target="_blank"
                      >
                        <Button
                          className="w-full mt-1"
                          variant={"outline"}
                          size={"sm"}
                        >
                          View <IconBrandGoogleMaps />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        })),
      ];

  return (
    <div className="relative w-full h-[85vh] overflow-y-scroll ">
      {trip_data ? (
        <Timeline data={data} trip_data={trip_data} />
      ) : (
        <div className="relative overflow-hidden ">
          <div className="absolute top-3 right-3 z-10 ">
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
                className="w-full h-full object-cover rounded-3"
                unoptimized
              />
              <p
                className="absolute bottom-3 left-3 flex items-center   
                    text-white text-sm md:text-base   
                   rounded-lg font-bold bg-black/40 p-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Plan the best trip for yourself...
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
