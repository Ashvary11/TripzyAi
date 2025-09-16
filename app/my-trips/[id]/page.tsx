"use client";
import React from "react";
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
 
export default function TripDetailPage() {
    const data = {
        destination: "Goa",
        duration: "7 days",
        origin: "Bhopal",
        budget: "Moderate",
        group_Size: "2",
        hotels: [
            {
                hotel_name: "The Park Calangute Goa",
                hotel_address:
                    "Holiday Street, Gaura Vaddo, Calangute, Goa 403516, India",
                hotel_image_url:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/The_Park_Calangute_Goa.jpg/1280px-The_Park_Calangute_Goa.jpg",
                price_per_night: "$100",
                rating: "4.5",
                description:
                    "A stylish boutique hotel near Calangute Beach, known for its vibrant atmosphere and excellent service.",
            },
            {
                hotel_name: "Radisson Blu Resort Goa Cavelossim",
                hotel_address: "Cavelossim Beach, Cavelossim, Goa 403731, India",
                hotel_image_url:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Radisson_Blu_logo.svg/2560px-Radisson_Blu_logo.svg.png",
                price_per_night: "$120",
                rating: "4.3",
                description:
                    "A luxurious resort on Cavelossim Beach, offering multiple dining options and a large pool area.",
            },
            {
                hotel_name: "W Goa",
                hotel_address: "Vagator Beach, Bardez, Goa 403509, India",
                hotel_image_url:
                    "https://cache.marriott.com/marriottassets/property_images/goiwc-w-goa/1147/goiwc-w-goa-exterior-5844-hor-feat.jpg",
                price_per_night: "$250",
                rating: "4.6",
                description:
                    "A trendy and upscale hotel on Vagator Beach, known for nightlife and stylish design.",
            },
            {
                hotel_name: "W Goa",
                hotel_address: "Vagator Beach, Bardez, Goa 403509, India",
                hotel_image_url:
                    "https://cache.marriott.com/marriottassets/property_images/goiwc-w-goa/1147/goiwc-w-goa-exterior-5844-hor-feat.jpg",
                price_per_night: "$250",
                rating: "4.6",
                description:
                    "A trendy and upscale hotel on Vagator Beach, known for nightlife and stylish design.",
            },
        ],
        itinerary: [
            {
                day: "Day 1",
                day_plan:
                    "Arrival in Goa and check-in to the hotel. Relax by the beach in the evening.",
                best_time_to_visit: "Evening",
                activities: [
                    {
                        place_name: "Calangute Beach",
                        place_details:
                            "One of the most popular beaches in Goa, known for its lively atmosphere and water sports.",
                        place_image_url:
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Calangute_Beach_Goa.jpg/1280px-Calangute_Beach_Goa.jpg",
                        place_address: "Calangute, Goa 403516, India",
                        ticket_pricing: "Free",
                        best_time_to_visit: "Evening",
                    },
                    {
                        place_name: "Calangute Beach",
                        place_details:
                            "One of the most popular beaches in Goa, known for its lively atmosphere and water sports.",
                        place_image_url:
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Calangute_Beach_Goa.jpg/1280px-Calangute_Beach_Goa.jpg",
                        place_address: "Calangute, Goa 403516, India",
                        ticket_pricing: "Free",
                        best_time_to_visit: "Evening",
                    },
                ],
            },
            {
                day: "Day 2",
                day_plan: "Explore North Goa: Visit Fort Aguada and Vagator Beach.",
                best_time_to_visit: "Afternoon & Evening",
                activities: [
                    {
                        place_name: "Fort Aguada",
                        place_details:
                            "A 17th-century Portuguese fort with panoramic sea views.",
                        place_image_url:
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Fort_Aguada_lighthouse.jpg/1280px-Fort_Aguada_lighthouse.jpg",
                        place_address: "Candolim, Goa",
                        ticket_pricing: "Free",
                        best_time_to_visit: "Afternoon",
                    },
                    {
                        place_name: "Vagator Beach",
                        place_details:
                            "Known for its cliffs, red rocks, and vibrant nightlife.",
                        place_image_url:
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Vagator_Beach_Goa.jpg/1280px-Vagator_Beach_Goa.jpg",
                        place_address: "Vagator, Goa 403509",
                        ticket_pricing: "Free",
                        best_time_to_visit: "Evening",
                    },
                ],
            },
        ],
    };

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
                        <Users size={16} /> {data.group_Size} people
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


                                <LinkPreview url={`https://www.google.com/maps/place?q=${hotel.hotel_address}`}>
                                    <p className="text-xs text-gray-600 mt-1 flex gap-2 items-center">
                                        <MapPin size={15} color="red" /> {hotel.hotel_address}
                                    </p>
                                </LinkPreview>

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

                                                <LinkPreview

                                                    url={`https://www.google.com/maps/place?q=${act.place_address}`}
                                                >

                                                    <p className="text-xs text-gray-500 mt-1">
                                                        📍 {act.place_address}
                                                    </p>
                                                </LinkPreview>
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
