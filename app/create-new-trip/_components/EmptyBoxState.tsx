import React from "react";
import { Earth, Globe2, Landmark, Plane } from "lucide-react";
import FinalTripUi from "./FinalTripUi";
function EmptyBoxState({ onSelectOption }: any) {
  const suggestions = [
    {
      title: "Create New Trip",
      icon: <Globe2 className="text-blue-400 h-5 w-5 " />,
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
    <div className="mt-10 px-4 ">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="font-bold text-3xl sm:text-4xl leading-tight">
          Plan your next <span className="text-primary">Adventure</span> with{" "}
          <span className="text-primary">AI</span>
        </h1>

        <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
          Create personalized itineraries, discover incredible destinations, and
          design a dream vacation—effortlessly. Let the smart assistant handle
          the details so the journey stays front and center.
        </p>

        <div className="flex flex-col gap-5">
          {suggestions.map((suggestion, index) => {
            return (
              <div
                key={index}
                onClick={() => onSelectOption(suggestion.title)}
                className="flex  items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary"
              >
                {suggestion.icon}

                <h2 className="text-sm hover:text-white font-semibold">
                  {suggestion.title}
                </h2>
              </div>
            );
          })}

          {/* <FinalTripUi disable={false}/> */}
        </div>
      </section>
    </div>
  );
}

export default EmptyBoxState;
