import React from "react";
import Header from "./_components/Header";

function Provider({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="flex-grow w-full">{children}</main>
    </div>
  );
}

export default Provider;
