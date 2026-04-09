"use client";
import React from "react";
import { Earth, Globe2, Landmark, Plane } from "lucide-react";

function EmptyBoxState({ onSelectOption }) {
  const suggestions = [
    {
      title: "Create New Trip",
      icon: <Globe2 className="text-blue-400 h-5 w-5" />,
    },
    {
      title: "Inspire me where to go",
      icon: <Plane className="text-orange-400 h-5 w-5" />,
    },
    {
      title: "Discover hidden gems",
      icon: <Landmark className="text-teal-400 h-5 w-5" />,
    },
    {
      title: "Adventure Destination",
      icon: <Earth className="text-green-400 h-5 w-5" />,
    },
  ];

  return (
    <div className=" px-4">
      <section className="mx-auto max-w-3xl text-left px-3 ">
        <h1 className="font-bold text-3xl sm:text-4xl leading-tight text-gray-900 dark:text-gray-100">
          Plan your next <span className="text-primary">Adventure</span> with{" "}
          <span className="text-primary">AI</span>
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300  text-lg sm:text-sm leading-relaxed">
          Create personalized itineraries, discover incredible destinations, and
          design a dream vacation—effortlessly. Let the smart assistant handle
          the details so the journey stays front and center.
        </p>

        <div className="flex flex-col gap-5 mt-6 sm:gap-3 sm:mt-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => onSelectOption(suggestion.title)}
              className="flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary dark:hover:bg-gray-700 hover:text-white transition-colors duration-300"
            >
              {suggestion.icon}
              <h2 className="text-sm font-semibold">{suggestion.title}</h2>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default EmptyBoxState;
