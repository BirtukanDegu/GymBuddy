"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getWeekDayLabels,
} from "@/lib/dateUtils";

interface CalendarProps {
  date: Date;
  currentDay: number;
  onDayClick?: (day: number) => void;
}

export function Calendar({ date, currentDay, onDayClick }: CalendarProps) {
  const daysInMonth = useMemo(() => getDaysInMonth(date), [date]);
  const firstDayOfMonth = useMemo(() => getFirstDayOfMonth(date), [date]);
  const weekDays = useMemo(() => getWeekDayLabels(), []);

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 mb-3">
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="text-center text-xs text-gray-500 font-medium"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isToday = day === currentDay;
          return (
            <motion.button
              key={day}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDayClick?.(day)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                isToday
                  ? "bg-[#d4ff00] text-black"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {day}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
