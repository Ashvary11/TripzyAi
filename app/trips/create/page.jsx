"use client";
import { Suspense } from "react";
import { TripProvider } from "../TripContext";
import ChatBox from "../../../components/chatbot_components/ChatBox";
import {Itineray} from "../../../components/chatbot_components/Itineray";

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
        <div className="min-h-screen flex flex-col lg:flex-row gap-4 p-3 sm:p-4 md:p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="flex-1 md:max-w-sm">
            <ChatBox className="h-full w-full" />
          </div>

          <div className="flex-1 w-full mt-4 lg:mt-0 hidden sm:flex">
            <Itineray className="w-full h-full" />
          </div>
        </div>
      </Suspense>
    </TripProvider>
  );
}
