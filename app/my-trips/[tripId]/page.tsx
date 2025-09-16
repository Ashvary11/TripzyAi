"use client";
import React, { use, useEffect, useState } from "react";
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

import { TripInfo } from "@/app/create-new-trip/_components/ChatBox";
import { IconDirection } from "@tabler/icons-react";

type TripIdProps = {
  params: Promise<{
    tripId: string;
  }>;
};
export default function TripDetailPage({ params }: TripIdProps) {
  const { tripId } = use(params);

  const [data, setData] = useState<TripInfo | null>(null);

  useEffect(() => {
    console.log("tripId", tripId);

    const fn = async () => {
      try {
        const res = await axios.get(`/api/trip/${tripId}`);
        setData(res.data.trip_plan);
        console.log(res.data.trip_plan);

      } catch (err) {
        console.error("Failed to fetch trip", err);
      }
    };
    fn();
  }, [tripId]);
  if (!data) {
    return <p className="text-center mt-10">Loading trip details...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Trip Header */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {data.origin} ➝ {data.destination}
          </CardTitle>
          <p className="text-lg mt-2">{data.duration}</p>
        </CardHeader>
        <CardContent className="flex gap-6 flex-wrap">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar size={16} /> {data.duration}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users size={16} /> {data.group_size} people
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <IndianRupee size={16} /> {data.budget}
          </Badge>
        </CardContent>
      </Card>

      {/* Hotels Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recommended Hotels</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.hotels.map((hotel, idx) => (
            <Card key={idx} className="shadow-md hover:shadow-lg transition">
              <Link
                target="_blank"
                href={`https://www.google.com/search?tbm=isch&q=${`${hotel.hotel_name}+${hotel.hotel_address}`}`}
              >
                <img
                  src={hotel.hotel_image_url}
                  alt={hotel.hotel_name}
                  className="w-full h-40 object-cover rounded-t-xl"
                  title="view more.."
                />
              </Link>

              {/* <LinkPreview url={`https://www.google.com/maps/place?q=${hotel.hotel_address}`}>
              view
              </LinkPreview> */}
              <CardHeader>
                <CardTitle>{hotel.hotel_name}</CardTitle>
                <p className="text-sm text-gray-500">{hotel.rating} ⭐</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{hotel.description}</p>
                <p className="mt-2 font-semibold">
                  {hotel.price_per_night} / night
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href={`https://www.google.com/maps/place?q=${hotel.hotel_address}`}
                    target="_blank"
                    className="text-sm text-teal-600 hover:underline flex items-center gap-1 font-bold"
                  >
                    Locate  <MapPin size={13} color="red" />
                  </Link>

                  <LinkPreview url={`https://www.google.com/maps/place?q=${hotel.hotel_address}`}>
                    <span className="text-xs text-gray-600 flex gap-1 items-center">
                      {hotel.hotel_address}
                    </span>
                  </LinkPreview>
                </div>


                {/* <LinkPreview url={`https://www.google.com/maps/place?q=${hotel.hotel_address}`}>
                                    <p className="text-xs text-gray-600 mt-1 flex gap-2 items-center">
                                        <MapPin size={15} color="red" /> {hotel.hotel_address}
                                    </p>
                                </LinkPreview> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Itinerary Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🎯 Planned Activities</h2>
        <Accordion type="single" collapsible className="w-full">
          {data.itinerary.map((day, idx) => (
            <AccordionItem key={idx} value={`day-${idx}`}>
              <AccordionTrigger className="text-lg font-medium">
                {day.day}: {day.day_plan}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 mt-2">
                  {day.activities.map((act, j) => (
                    <Card key={j} className="flex gap-4 shadow">
                      <Link
                        target="_blank"
                        href={`https://www.google.com/search?tbm=isch&q=${`${act.place_name} `}`}
                      >
                        <img
                          src={act.place_image_url}
                          alt={act.place_name}
                          className="w-32 h-32 object-cover rounded-l-xl"
                        />
                      </Link>
                      <CardContent className="flex flex-col justify-center">
                        <h3 className="font-semibold">{act.place_name}</h3>
                        <p className="text-sm text-gray-600">
                          {act.place_details}
                        </p>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`https://www.google.com/maps/place?q=${act.place_address}`}
                            target="_blank"
                            className="text-sm text-teal-600  flex items-center "
                          >
                            <strong className="hover:underline">
                              Find
                            </strong>   <span  >📍</span>
                          </Link>

                          <LinkPreview
                            url={`https://www.google.com/maps/place?q=${act.place_address}`}
                          >
                            <p className="text-xs text-gray-500 mt-1">
                              {act.place_address}
                            </p>
                          </LinkPreview>
                        </div>



                        <p className="text-xs">🎟 {act.ticket_pricing}</p>
                        <p className="text-xs">
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
