"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Earth, Globe2, Landmark, Plane, Send } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import DraggableCards from "@/components/DraggableCards";

function Hero() {
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

  const { user } = useUser();
  const router = useRouter();

  const onSend = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    router.push("/create-new-trip");
  };

  return (
    <section className="w-full flex flex-col items-center px-4 mt-10">
      {/* Centered content */}
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Heading */}
        <h1 className="text-2xl md:text-5xl font-bold leading-snug">
          Hey 👋, I'm your personal{" "}
          <span className="text-primary text-3xl md:text-5xl">
            Trip Planner
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          Tell me what you want, and I'll handle the rest: Flights, Hotels, and
          Trip Planning — everything in seconds.
        </p>

        {/* Input Box */}
        <div className="relative border rounded-2xl p-4 shadow-sm bg-white dark:bg-neutral-900">
          <Textarea
            placeholder="Create a trip from Paris to New York"
            className="w-full h-20 border-none focus-visible:ring-0 shadow-none resize-none bg-transparent"
          />
          <Button
            size="icon"
            onClick={onSend}
            className="absolute bottom-3 right-3 rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 border px-4 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              {s.icon}
              <span className="text-sm font-medium">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full-width DraggableCards */}
      <div className="mt-12 w-full">
        <DraggableCards />
      </div>
    </section>
  );
}

export default Hero;
