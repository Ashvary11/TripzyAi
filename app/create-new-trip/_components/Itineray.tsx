"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  ExternalLink,
  HotelIcon,
  Star,
  Ticket,
  View,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconBrandGoogleMaps } from "@tabler/icons-react";
import { useTrip } from "@/app/TripContext";

export function Itineray() {
  //  @ts-ignore

  // const trip_data = {
  //   budget: "Medium",
  //   destination: "Manali, Himachal Pradesh",
  //   duration: "5 Days",
  //   group_size: "Family",
  //   origin: "Nagpur, Maharashtra",
  //   hotels: [
  //     {
  //       hotel_name: "Himalayan Retreat",
  //       hotel_address: "Near Mall Road, Manali, Himachal Pradesh 175131",
  //       hotel_image_url: "https://example.com/images/himalayan-retreat.jpg",
  //       price_per_night: "₹4,500",
  //       geo_coordinates: {
  //         latitude: 32.2396,
  //         longitude: 77.1887,
  //       },
  //       rating: "4.5/5",
  //       description:
  //         "A cozy boutique hotel with mountain views, modern amenities, and easy access to Mall Road.",
  //     },
  //   ],
  //   itinerary: [
  //     {
  //       day: "Day 1",
  //       day_plan: "Arrival in Manali and local sightseeing",
  //       best_time_to_visit: "Morning to Evening",
  //       activities: [
  //         {
  //           place_name: "Hadimba Temple",
  //           place_details:
  //             "A historic wooden temple surrounded by deodar trees, dedicated to Goddess Hadimba.",
  //           place_image_url: "https://example.com/images/hadimba-temple.jpg",
  //           geo_coordinates: {
  //             latitude: 32.2432,
  //             longitude: 77.1892,
  //           },
  //           place_address: "Old Manali, Himachal Pradesh 175131",
  //           ticket_pricing: "Free Entry",
  //           time_travel_each_location: "15 minutes from Mall Road",
  //           best_time_to_visit: "Morning",
  //         },
  //         {
  //           place_name: "Mall Road",
  //           place_details:
  //             "The main street with shops, cafes, and restaurants offering local delicacies and handicrafts.",
  //           place_image_url: "https://example.com/images/mall-road.jpg",
  //           geo_coordinates: {
  //             latitude: 32.2455,
  //             longitude: 77.1897,
  //           },
  //           place_address: "Manali, Himachal Pradesh 175131",
  //           ticket_pricing: "Free Entry",
  //           time_travel_each_location: "10 minutes from Hadimba Temple",
  //           best_time_to_visit: "Evening",
  //         },
  //       ],
  //     },
  //     {
  //       day: "Day 2",
  //       day_plan: "Solang Valley Adventure",
  //       best_time_to_visit: "Morning to Afternoon",
  //       activities: [
  //         {
  //           place_name: "Solang Valley",
  //           place_details:
  //             "A popular spot for adventure sports like paragliding, zorbing, and skiing (in winters).",
  //           place_image_url: "https://example.com/images/solang-valley.jpg",
  //           geo_coordinates: {
  //             latitude: 32.3181,
  //             longitude: 77.1588,
  //           },
  //           place_address: "Solang Valley, Manali, Himachal Pradesh 175131",
  //           ticket_pricing: "₹500 - ₹2,000 depending on activity",
  //           time_travel_each_location: "45 minutes from Manali town",
  //           best_time_to_visit: "Morning",
  //         },
  //       ],
  //     },
  //   ],
  // };
  // const { trip } = useTrip();
  const { trip_data } = useTrip();
  const data = !trip_data?[]:[
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
                  alt={hotel?.hotel_name
}
                  width={400}
                  height={200}
                  className="rounded-2xl shadow object-cover mb-2"
                  unoptimized
                />
                <h2 className="font-semibold text-lg">{hotel?.hotel_name}</h2>
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
    <div className="relative w-full h-[85vh] overflow-y-scroll">
      {trip_data ? (
        <Timeline data={data} trip_data={trip_data} />
      ) : (
        <div className="relative">
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
        </div>
      )}
    </div>
  );
}
