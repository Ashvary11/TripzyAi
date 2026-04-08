"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Earth, Globe2, Landmark, Plane } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import DraggableCards from "@/components/DraggableCards";

function Hero() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let id = localStorage.getItem("user_uuidv4");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("user_uuidv4", id);
    }
    setUser(id);
  }, []);

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

  const [input, setInput] = useState("");
  // const { user } = useUser();
  const router = useRouter();

  const onSend = () => {
    // if (!user) {
    //   router.push("/sign-in");
    //   return;
    // }
    router.push("/create?title=" + encodeURIComponent(input));
    setInput("");
  };

  return (
    <section className="w-full flex flex-col items-center px-4 mt-10 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Centered content */}
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Heading */}
        <h1 className="text-2xl md:text-5xl font-bold leading-snug text-gray-900 dark:text-gray-100">
          Hey 👋, I'm your personal <br />
          <span className="text-primary text-3xl md:text-5xl font-extrabold">
            AI-Trip Planner
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          Tell me what you want, and I will handle the rest: Flights, Hotels,
          and Trip Planning — everything in seconds.
        </p>

        {/* Input Box */}
        <div className="relative border rounded-2xl p-4 shadow-sm bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <Textarea
            placeholder="Create a trip from Paris to New York"
            className="w-full h-20 border-none focus-visible:ring-0 shadow-none resize-none bg-transparent text-gray-900 dark:text-gray-100"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSend();
              }
            }}
          />
          <Button
            onClick={onSend}
            className="px-3 py-2 absolute bottom-4 right-4 rounded-2xl cursor-pointer"
          >
            Get Started
          </Button>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 sm:gap-3">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 border px-4 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors dark:hover:bg-gray-700  w-full sm:w-auto  active:bg-primary active:text-white dark:active:bg-gray-700 duration-200 ease-in-out "
              onClick={() => setInput(s.title)}
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
