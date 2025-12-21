"use client";

import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SetData, Exercise } from "@/types";

interface SetRowProps {
  set: SetData;
  setNumber: number;
  exercise: Exercise;
  onToggle: () => void;
  onWeightChange: (weight: number) => void;
}

export const SetRow = memo(function SetRow({
  set,
  setNumber,
  exercise,
  onToggle,
  onWeightChange,
}: SetRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempWeight, setTempWeight] = useState(set.actualWeight.toString());

  const handleWeightSubmit = () => {
    const weight = parseFloat(tempWeight);
    if (!isNaN(weight) && weight >= 0) {
      onWeightChange(weight);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleWeightSubmit();
    } else if (e.key === "Escape") {
      setTempWeight(set.actualWeight.toString());
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
        set.isCompleted
          ? "bg-lime-500/20 border border-lime-500/30"
          : "bg-white/5 hover:bg-white/10"
      }`}
    >
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
          set.isCompleted
            ? "bg-lime-500 text-white"
            : "bg-white/10 text-gray-400 hover:bg-white/20"
        }`}
        aria-label={`Toggle set ${setNumber}`}
      >
        {set.isCompleted && <Check className="w-5 h-5" />}
      </button>

      <div className="flex-1 flex items-center gap-3">
        <span className="text-sm font-bold text-white">Set {setNumber}</span>

        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={tempWeight}
              onChange={(e) => setTempWeight(e.target.value)}
              onBlur={handleWeightSubmit}
              onKeyDown={handleKeyDown}
              className="w-20 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500"
              autoFocus
              aria-label={`Edit weight for set ${setNumber}`}
            />
            <button
              onClick={handleWeightSubmit}
              className="p-1 bg-lime-500 rounded hover:bg-lime-600"
              aria-label="Save weight"
            >
              <Check className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => {
                setTempWeight(set.actualWeight.toString());
                setIsEditing(false);
              }}
              className="p-1 bg-red-500 rounded hover:bg-red-600"
              aria-label="Cancel edit"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            disabled={set.isCompleted}
            className={`text-sm font-semibold ${
              set.isCompleted
                ? "text-lime-400"
                : "text-purple-400 hover:text-purple-300"
            }`}
            aria-label={`Edit weight: ${set.actualWeight} ${exercise.weightUnit}`}
          >
            {set.actualWeight > 0
              ? `${set.actualWeight} ${exercise.weightUnit}`
              : exercise.weightUnit}
          </button>
        )}

        <span className="text-sm text-gray-400">× {set.reps}</span>
      </div>
    </motion.div>
  );
});
