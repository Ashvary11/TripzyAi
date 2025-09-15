"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TripInfo } from "../create-new-trip/_components/ChatBox";

type TripDocument = {
  _id: string;
  userId: string;
  trip_plan: TripInfo;
  createdAt: string;
  updatedAt: string;
};
export default function My_Trip() {

  const [trips, setTrips] = useState<TripDocument[]>([]);


  useEffect(() => {

    const fetchTrips = async () => {
      try {
        const res = await axios.get<{ trips: TripDocument[] }>("/api/trip");
        setTrips(res.data?.trips || []);
        console.log("Trips fetched:", res.data);
      } catch (err) {
        console.error("Error fetching trips", err);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div>
      <h1>My Trips</h1>
      {trips.length === 0 ? (
        <p>No trips yet.</p>
      ) : (
        <ul>
          {trips.map((trip, i) => (
            <li key={i}>{`${i + 1} : ${trip.trip_plan.origin} to ,${trip.trip_plan.destination
              }`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

