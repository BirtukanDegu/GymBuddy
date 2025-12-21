"use client";

import { useMemo, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Exercise } from "@/types";
import { isExerciseComplete } from "@/lib/workoutUtils";
import { SetRow } from "./SetRow";

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleSet: (exerciseId: string, setIndex: number) => void;
  onUpdateWeight: (
    exerciseId: string,
    setIndex: number,
    weight: number
  ) => void;
}

export const ExerciseItem = memo(function ExerciseItem({
  exercise,
  index,
  isExpanded,
  onToggleExpand,
  onToggleSet,
  onUpdateWeight,
}: ExerciseItemProps) {
  const completedCount = useMemo(
    () => exercise.setDetails.filter((s) => s.isCompleted).length,
    [exercise.setDetails]
  );

  const isFullyCompleted = useMemo(
    () => isExerciseComplete(exercise),
    [exercise]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`backdrop-blur-sm rounded-2xl overflow-hidden transition-all ${
        isFullyCompleted
          ? "bg-gradient-to-br from-lime-500/20 to-lime-500/20 border border-lime-500/30"
          : "bg-white/5"
      }`}
    >
      <button onClick={onToggleExpand} className="w-full p-4 text-left">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">{exercise.name}</h3>
            {isFullyCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 bg-lime-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </div>
          <span className="text-sm text-gray-400">
            {exercise.sets} × {exercise.reps}
          </span>
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>
              Progress: {completedCount}/{exercise.sets}
            </span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                isFullyCompleted
                  ? "bg-gradient-to-r from-lime-500 to-lime-500"
                  : "bg-gradient-to-r from-purple-500 to-purple-400"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / exercise.sets) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>
            {exercise.weight > 0
              ? `${exercise.weight} ${exercise.weightUnit}`
              : exercise.weightUnit}
          </span>
          <span>•</span>
          <span>Rest: {exercise.restSeconds}s</span>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10"
          >
            <div className="p-4 space-y-2">
              {exercise.setDetails.map((set, setIndex) => (
                <SetRow
                  key={set.id}
                  set={set}
                  setNumber={setIndex + 1}
                  exercise={exercise}
                  onToggle={() => onToggleSet(exercise.id, setIndex)}
                  onWeightChange={(weight) =>
                    onUpdateWeight(exercise.id, setIndex, weight)
                  }
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
