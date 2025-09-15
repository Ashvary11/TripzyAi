"use client";

import React, { useState } from "react";
import { Minus, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

function SelectDayUi({
  onSelectedOption,
}: {
  onSelectedOption: (val: string) => void;
}) {
  const [days, setDays] = useState<number>(1);

  const increase = () => setDays((prev) => prev + 1);
  const decrease = () => setDays((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col gap-4 p-3 max-w-md mx-auto border rounded-2xl">
      <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-blue-500" /> How many days do you want
        for your trip?
      </p>

      <div className="flex items-center justify-center gap-6">
        <Button
          size="icon"
          variant="outline"
          onClick={decrease}
          className="rounded-full w-10 h-10 cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </Button>

        <span className="text-2xl font-semibold">
          {days} {days > 1 ? "days" : "day"}
        </span>

        <Button
          size="icon"
          variant="outline"
          onClick={increase}
          className="rounded-full w-10 h-10 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => onSelectedOption(`${days} days`)}
          className="rounded-xl px-6 cursor-pointer"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default SelectDayUi;
