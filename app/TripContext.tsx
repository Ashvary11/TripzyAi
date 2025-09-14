// TripContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { TripInfo } from "./create-new-trip/_components/ChatBox";
 

type TripContextType = {
  trip_data: TripInfo | null;
  setTrip: (t: TripInfo) => void;
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trip_data, setTrip] = useState<TripInfo | null>(null);
  return (
    <TripContext.Provider value={{ trip_data, setTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be inside <TripProvider>");
  return ctx;
}
