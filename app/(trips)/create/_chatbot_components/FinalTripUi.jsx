"use client";

import React, { useEffect, useState } from "react";
import { Globe2, GlobeLock, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

function FinalTripUi({ disable }) {
  const router = useRouter();
  const [tripId, setTripId] = useState("");
  let userId = localStorage.getItem("user_uuidv4");
  const handleViewTrip = () => {
    if (tripId) {
      router.push(`/my/${tripId}`);
    }
  };

  useEffect(() => {
    const fetchLastTrip = async () => {
      try {
        const { data } = await axios.get(`/api/trip/last?userId=${userId}`);
        setTripId(data._id);
      } catch (err) {
        console.error("Failed to fetch last trip:", err);
      }
    };
    fetchLastTrip();
  }, [disable]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-2xl max-w-md mx-auto text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {disable ? (
        <GlobeLock className="w-6 h-6 text-blue-500 animate-bounce duration-75" />
      ) : (
        <Globe2 className="w-6 h-6 text-green-500" />
      )}

      <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-600 dark:text-orange-400">
        <Plane className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        {disable ? (
          <span>Planning your dream trip</span>
        ) : (
          <span>Trip Created</span>
        )}
      </h2>

      {disable ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Gathering best destinations, activities, and travel details for you.
        </p>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">
          Tripzy has finished planning. Let’s explore your adventure.
        </p>
      )}

      <Button
        disabled={disable}
        className={`w-full rounded-xl ${disable ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={handleViewTrip}
      >
        View Trip
      </Button>
    </div>
  );
}

export default FinalTripUi;
