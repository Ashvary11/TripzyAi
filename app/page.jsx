import React from "react";
import Footer from "../components/(main)/Footer";
import Hero from "../components/(main)/HeroSection";

export const metadata = {
  title: "Tripzy-Ai",
  description: "Your personalized AI Trip Planner",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex-grow w-full">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
