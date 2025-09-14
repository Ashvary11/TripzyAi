import React from "react";
import ChatBox from "./_components/ChatBox";
import { Itineray } from "./_components/Itineray";
import { TripProvider } from "../TripContext";

export default function CreateNewTrip() {
  return (
    <TripProvider>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
        <div>
          <ChatBox />
        </div>
        <div className="col-span-2">
          <Itineray />
        </div>
      </div>
    </TripProvider>
  );
}
