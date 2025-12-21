"use client";

import { ArrowLeft, Pause, Play } from "lucide-react";
import { memo } from "react";

interface WorkoutHeaderProps {
  workoutName: string;
  isRunning: boolean;
  onBack: () => void;
  onTogglePlayPause: () => void;
}

export const WorkoutHeader = memo(function WorkoutHeader({
  workoutName,
  isRunning,
  onBack,
  onTogglePlayPause,
}: WorkoutHeaderProps) {
  return (
    <div className="p-6 flex items-center justify-between">
      <button
        onClick={onBack}
        className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="text-center">
        <p className="text-sm font-semibold text-white/90">{workoutName}</p>
      </div>
      <button
        onClick={onTogglePlayPause}
        className={`w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition ${
          isRunning ? "bg-white" : "bg-lime-500 animate-pulse"
        }`}
        aria-label={isRunning ? "Pause workout" : "Start/Resume workout"}
      >
        {isRunning ? (
          <Pause className="w-5 h-5 text-black" fill="black" />
        ) : (
          <Play className="w-5 h-5 text-white" fill="white" />
        )}
      </button>
    </div>
  );
});
