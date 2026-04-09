"use client";
import React, { Suspense } from "react";
import ChatBox from "./_chatbot_components/ChatBox";
import { Itineray } from "./_chatbot_components/Itineray";
import { TripProvider } from "../TripContext";

export default function CreateNewTrip() {
  return (
    <TripProvider>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300">
            Loading...
          </div>
        }
      >
        {/* <div className="min-h-screen flex flex-col md:flex-row gap-4 p-2 md:p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"> */}
          <div className="min-h-screen flex flex-col lg:flex-row gap-4 p-3 sm:p-4 md:p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {/* Chat Box */}
          <div className="flex-1 md:max-w-sm">
            <ChatBox className="h-full w-full" />
          </div>

          {/* Itinerary */}
          {/* <div className="sm:flex flex-1 sm:mt-0 mt-20 hidden"> */}
          {/* <div className="flex-1 w-full "> */}
          <div className="flex-1 w-full mt-4 lg:mt-0 hidden sm:flex">
            <Itineray className="w-full h-full" />
          </div>

        </div>
      </Suspense>
    </TripProvider>
  );
}

