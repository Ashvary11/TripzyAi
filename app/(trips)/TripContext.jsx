"use client";
import { createContext, useContext, useState } from "react";

const TripContext = createContext();

export function TripProvider({ children }) {
  const [trip_data, setTrip] = useState(null);

  const setTripData = (trip) => {
    setTrip(trip);
  };

  return (
    <TripContext.Provider value={{ trip_data, setTrip: setTripData }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a <TripProvider>");
  }
  return context;
}
