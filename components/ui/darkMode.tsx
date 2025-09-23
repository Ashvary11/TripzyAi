"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="cursor-pointer  dark:bg-orange-600 bg-gray-300"
      variant="outline"
      size="icon"
      color="orange"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 transition-all text-white" />
      ) : (
        <Moon className="h-5 w-5 transition-all " />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
