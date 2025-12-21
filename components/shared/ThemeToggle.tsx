"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  }, [theme, setTheme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  );
}
