"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { formatTime } from "@/lib/workoutUtils";

interface WorkoutProgressProps {
  elapsed: number;
  completedSets: number;
  totalSets: number;
  restTimer: number;
  isResting: boolean;
}

export const WorkoutProgress = memo(function WorkoutProgress({
  elapsed,
  completedSets,
  totalSets,
  restTimer,
  isResting,
}: WorkoutProgressProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-400 mb-1">Elapsed</p>
          <p className="text-4xl font-black text-white">
            {formatTime(elapsed)}
          </p>
          {elapsed === 0 && (
            <p className="text-xs text-gray-500 mt-1">Press play to start</p>
          )}
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
            <p className="text-3xl font-black">
              {completedSets}/{totalSets}
            </p>
          </div>
          <p className="text-xs text-gray-400">Sets</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 mb-1">
            {isResting ? "Rest" : "Timer"}
          </p>
          <p
            className={`text-4xl font-black ${
              isResting ? "text-purple-400" : "text-white"
            }`}
          >
            {isResting ? formatTime(restTimer) : "0:00"}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${(completedSets / totalSets) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </>
  );
});
