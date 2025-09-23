"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, IndianRupee } from "lucide-react";
import Link from "next/link";
import { LinkPreview } from "@/components/ui/link-preview";
import axios from "axios";
import { LoaderOne } from "@/components/ui/loader";

export default function TripDetailPage({ params }) {
  const { tripId } = React.use(params);
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("tripId", tripId);

    const fetchTripData = async () => {
      try {
        const res = await axios.get(`/api/trip/${tripId}`);
        setData(res.data.trip_plan);
        console.log(res.data.trip_plan);
      } catch (err) {
        console.error("Failed to fetch trip", err);
      }
    };

    fetchTripData();
  }, [tripId]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderOne />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6 md:space-y-10 dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Trip Header */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">
            {data.origin} ➝ {data.destination}
          </CardTitle>
          <p className="text-base md:text-lg mt-2">{data.duration}</p>
        </CardHeader>
        <CardContent className="flex gap-3 md:gap-6 flex-wrap">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 text-xs md:text-sm dark:bg-gray-800 dark:text-white"
          >
            <Calendar size={14} /> {data.duration}
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 text-xs md:text-sm dark:bg-gray-800 dark:text-white"
          >
            <Users size={14} /> {data.group_size} people
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 text-xs md:text-sm dark:bg-gray-800 dark:text-white"
          >
            <IndianRupee size={14} /> {data.budget}
          </Badge>
        </CardContent>
      </Card>

      {/* Hotels Section */}
      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-4 dark:text-white">
          Recommended Hotels
        </h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.hotels.map((hotel, idx) => (
            <Card
              key={idx}
              className="shadow-md hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700"
            >
              <Link
                target="_blank"
                href={`https://www.google.com/search?tbm=isch&q=${`${hotel.hotel_name}+${hotel.hotel_address}`}`}
              >
                <img
                  src={hotel.hotel_image_url}
                  alt={hotel.hotel_name}
                  className="w-full h-40 object-cover rounded-t-xl"
                  title="view images.."
                />
              </Link>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl dark:text-white">
                  {hotel.hotel_name}
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {hotel.rating} ⭐
                </p>
              </CardHeader>
              <CardContent className="flex flex-col  flex-1">
                <p className="text-sm dark:text-gray-300 ">
                  {hotel.description}
                </p>
                <p className="mt-2 font-semibold dark:text-white">
                  {hotel.price_per_night} / night
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-auto  ">
                  <Link
                    href={`https://www.google.com/maps/place?q=${hotel.hotel_address}`}
                    target="_blank"
                    className="text-sm text-teal-600 hover:underline flex items-center gap-1 font-bold dark:text-teal-400 "
                  >
                    Locate <MapPin size={13} color="red" />
                  </Link>

                  <LinkPreview
                    url={`https://www.google.com/maps/place?q=${hotel.hotel_address}`}
                  >
                    <span className="text-xs text-gray-600 flex gap-1 items-center break-words dark:text-gray-400">
                      {hotel.hotel_address}
                    </span>
                  </LinkPreview>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Itinerary Section */}
      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-4 dark:text-white">
          🎯 Planned Activities
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {data.itinerary.map((day, idx) => (
            <AccordionItem
              key={idx}
              value={`day-${idx}`}
              className="dark:border-gray-700"
            >
              <AccordionTrigger className="text-base md:text-lg font-medium px-2 dark:text-white">
                 {day.dayNumber} : {day.dayPlanShortDescription}  
               
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 mt-2">
                  <p className="block">{day.dayPlanLongDescription}</p>

                  {day.activities.map((act, j) => (
                    <Card
                      key={j}
                      className="flex flex-col sm:flex-row gap-4 shadow dark:bg-gray-800 dark:border-gray-700 mt-2"
                    >
                      <Link
                        target="_blank"
                        href={`https://www.google.com/search?tbm=isch&q=${`${act.place_name} `}`}
                        className="sm:w-1/3"
                      >
                        <img
                          src={act.place_image_url}
                          alt={act.place_name}
                          className="w-full h-40 sm:h-full sm:max-h-32 object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
                        />
                      </Link>
                      <CardContent className="flex flex-col justify-center py-4 sm:py-2 sm:w-2/3">
                        <h3 className="font-semibold text-lg dark:text-white">
                          {act.place_name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
                          {act.place_details}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                          <Link
                            href={`https://www.google.com/maps/place?q=${act.place_address}`}
                            target="_blank"
                            className="text-sm text-teal-600 flex items-center dark:text-teal-400"
                          >
                            <strong className="hover:underline">Find</strong>{" "}
                            <span>📍</span>
                          </Link>

                          <LinkPreview
                            url={`https://www.google.com/maps/place?q=${act.place_address}`}
                          >
                            <p className="text-xs text-gray-500 mt-1 sm:mt-0 break-words dark:text-gray-400">
                              {act.place_address}
                            </p>
                          </LinkPreview>
                        </div>

                        <p className="text-xs mt-2 dark:text-gray-400">
                          🎟 {act.ticket_pricing}
                        </p>
                        <p className="text-xs dark:text-gray-400">
                          🕒 Best: {act.best_time_to_visit}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
