"use client";

import { Check } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SetData } from "@/types";
import { motion } from "framer-motion";

interface SetRowProps {
  set: SetData;
  index: number;
  onToggle: () => void;
  onWeightChange: (weight: number) => void;
}

export default function SetRow({
  set,
  index,
  onToggle,
  onWeightChange,
}: SetRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center gap-3 p-4 rounded-[1.5rem] transition-all duration-200 ${
        set.isCompleted
          ? "bg-lime-500/20 border-2 border-lime-500"
          : "bg-gray-800 border-2 border-gray-700 hover:border-gray-600"
      }`}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 font-black text-sm text-white">
        {index + 1}
      </div>

      <div className="flex flex-1 items-center gap-3">
        <Input
          type="number"
          value={set.actualWeight}
          onChange={(e) => onWeightChange(Number(e.target.value))}
          disabled={set.isCompleted}
          className={`w-20 h-11 text-center font-bold text-base border-0 rounded-xl bg-gray-700 text-white ${
            set.isCompleted ? "opacity-60" : ""
          }`}
        />
        <div className="text-sm font-bold text-gray-400 whitespace-nowrap">
          lbs × {set.reps}
        </div>
      </div>

      <Button
        size="lg"
        onClick={onToggle}
        className={`rounded-full w-12 h-12 p-0 transition-all active:scale-90 ${
          set.isCompleted
            ? "bg-lime-500 hover:bg-lime-600"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
      >
        <motion.div
          initial={false}
          animate={{
            scale: set.isCompleted ? 1 : 0,
            rotate: set.isCompleted ? 0 : 180,
          }}
          transition={{ duration: 0.3, ease: "backOut" }}
        >
          <Check className="w-6 h-6 text-black" strokeWidth={3} />
        </motion.div>
      </Button>
    </motion.div>
  );
}
