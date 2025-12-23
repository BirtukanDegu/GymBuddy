"use client";

import { Plus, Dumbbell } from "lucide-react";
import { Home, StatusUp, User } from "iconsax-reactjs"
import { memo } from "react";
import { InstallPWA } from "../InstallPWA";

interface DesktopBottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const DesktopBottomNav = memo(function DesktopBottomNav({
  activeTab = "home",
  onTabChange,
}: DesktopBottomNavProps) {
  const handleTabClick = (tab: string) => {
    onTabChange?.(tab);
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-2">
        <nav className="flex items-center gap-8 bg-[#252525] rounded-full px-8 py-4 border border-white/5 shadow-2xl" aria-label="Main navigation">
          <button
            onClick={() => handleTabClick("home")}
            className="flex flex-col items-center gap-1 hover:scale-110 transition"
            aria-label="Home"
            aria-current={activeTab === "home" ? "page" : undefined}
          >
            <Home
              className={`w-6 h-6 ${
                activeTab === "home" ? "text-white" : "text-gray-500"
              }`}
            />
          </button>
          <button
            onClick={() => handleTabClick("stats")}
            className="flex flex-col items-center gap-1 hover:scale-110 transition"
            aria-label="Statistics"
            aria-current={activeTab === "stats" ? "page" : undefined}
          >
            <StatusUp
              className={`w-6 h-6 ${
                activeTab === "stats" ? "text-white" : "text-gray-500"
              }`}
            />
          </button>
          <button
            onClick={() => handleTabClick("add")}
            className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
            aria-label="Add workout"
          >
            <Plus className="w-7 h-7 text-white" />
          </button>
          <button
            onClick={() => handleTabClick("workouts")}
            className="flex flex-col items-center gap-1 hover:scale-110 transition"
            aria-label="Workouts"
            aria-current={activeTab === "workouts" ? "page" : undefined}
          >
            <Dumbbell
              className={`w-6 h-6 ${
                activeTab === "workouts" ? "text-white" : "text-gray-500"
              }`}
            />
          </button>
          <button
            onClick={() => handleTabClick("profile")}
            className="flex flex-col items-center gap-1 hover:scale-110 transition"
            aria-label="Profile"
            aria-current={activeTab === "profile" ? "page" : undefined}
          >
            <User
              className={`w-6 h-6 ${
                activeTab === "profile" ? "text-white" : "text-gray-500"
              }`}
            />
          </button>
        </nav>
        <InstallPWA />
      </div>
    </div>
  );
});
