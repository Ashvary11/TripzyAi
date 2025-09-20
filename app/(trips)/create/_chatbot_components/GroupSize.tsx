"use client";

import React from "react";
import { Users, User, Heart, Home } from "lucide-react";

type GroupOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  people: string;
};

const groupOptions: GroupOption[] = [
  {
    id: "solo",
    title: "Solo",
    description: "Traveling alone, full flexibility.",
    icon: <User className="w-6 h-6 text-blue-500" />,
    people: "1",
  },
  {
    id: "couple",
    title: "Couple",
    description: "Perfect for two people exploring together.",
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    people: "2",
  },
  {
    id: "family",
    title: "Family",
    description: "Ideal for family vacations and comfort.",
    icon: <Home className="w-6 h-6 text-green-500" />,
    people: "4",
  },
  {
    id: "friends",
    title: "Friends",
    description: "Great for group fun and shared memories.",
    icon: <Users className="w-6 h-6 text-purple-500" />,
    people: "5 to 10",
  },
];

function GroupSize({ onSelectedOption }: any) {
  return (
    <div className="flex flex-col gap-3 p-3 max-w-md mx-auto">
      <p className="text-sm text-gray-500 mb-1">Choose your group type:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {groupOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onSelectedOption(option.title + ":" + option.people)}
            className="cursor-pointer flex flex-col items-center text-center p-4 space-y-2 border rounded-2xl hover:shadow-lg transition"
          >
            {option.icon}
            <h3 className="font-semibold text-base">{option.title}</h3>
            <p className="text-xs text-gray-500">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupSize;
