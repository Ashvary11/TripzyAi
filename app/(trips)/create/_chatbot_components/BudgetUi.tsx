"use client";

import React from "react";
import { DollarSign, Wallet, Gem } from "lucide-react";

type BudgetOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const budgetOptions: BudgetOption[] = [
  {
    id: "cheap",
    title: "Cheap",
    description: "Budget-friendly, save money while traveling.",
    icon: <Wallet className="w-6 h-6 text-green-500" />,
  },
  {
    id: "moderate",
    title: "Moderate",
    description: "Balanced comfort and cost.",
    icon: <DollarSign className="w-6 h-6 text-blue-500" />,
  },
  {
    id: "luxury",
    title: "Luxury",
    description: "Premium comfort and exclusive experiences.",
    icon: <Gem className="w-6 h-6 text-purple-500" />,
  },
];

function BudgetUi({
  onSelectedOption,
}: {
  onSelectedOption: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 p-3 max-w-md mx-auto">
      <p className="text-sm text-gray-500 mb-1">Choose your budget:</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {budgetOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onSelectedOption(option.title)}
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

export default BudgetUi;
