"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Workout } from "@/types";
import { vibrate, playSound, showNotification } from "@/lib/pwa";
import { SummaryModal } from "./SummaryModal";
import { Confetti } from "./Confetti";
import { useWorkoutTimer } from "@/hooks/useWorkoutTimer";
import { useRestTimer } from "@/hooks/useRestTimer";
import {
  VIBRATION_PATTERNS,
  SOUND_PATHS,
  NOTIFICATION_TAGS,
} from "@/lib/constants";
import { getTotalSets, getCompletedSets } from "@/lib/workoutUtils";
import { WorkoutHeader } from "./workout/WorkoutHeader";
import { WorkoutProgress } from "./workout/WorkoutProgress";
import { ExerciseItem } from "./workout/ExerciseItem";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  toggleSetCompletion,
  updateSetWeight,
  completeWorkout,
} from "@/store/workoutSlice";

interface ActiveWorkoutViewProps {
  onNavigate: (view: "activity" | "plan" | "workout") => void;
  workout: Workout;
}

export function ActiveWorkoutView({
  onNavigate,
  workout,
}: ActiveWorkoutViewProps) {
  const dispatch = useAppDispatch();
  const { elapsed, isRunning, toggle } = useWorkoutTimer();
  const {
    timeLeft: restTimer,
    isResting,
    startRest,
    cancelRest,
  } = useRestTimer();

  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSets = useMemo(() => getTotalSets(workout), [workout]);
  const completedSets = useMemo(() => getCompletedSets(workout), [workout]);

  const handleToggleSetCompletion = useCallback(
    (exerciseId: string, setIndex: number) => {
      const exercise = workout.exercises.find((ex) => ex.id === exerciseId);
      if (!exercise) return;

      const wasCompleted = exercise.setDetails[setIndex].isCompleted;

      dispatch(toggleSetCompletion({ exerciseId, setIndex }));

      if (!wasCompleted) {
        startRest(exercise.restSeconds);
        vibrate([...VIBRATION_PATTERNS.SHORT]);
        playSound(SOUND_PATHS.BEEP);

        const allCompleted = exercise.setDetails.every(
          (s, idx) => idx === setIndex || s.isCompleted
        );
        if (allCompleted) {
          setShowConfetti(true);
          vibrate([...VIBRATION_PATTERNS.CELEBRATION]);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } else {
        cancelRest();
      }
    },
    [workout.exercises, dispatch, startRest, cancelRest]
  );

  const handleUpdateSetWeight = useCallback(
    (exerciseId: string, setIndex: number, weight: number) => {
      dispatch(updateSetWeight({ exerciseId, setIndex, weight }));
    },
    [dispatch]
  );

  const handleFinishWorkout = useCallback(() => {
    vibrate(VIBRATION_PATTERNS.CELEBRATION);
    playSound(SOUND_PATHS.SUCCESS);

    showNotification("Workout Complete! 🎉", {
      body: `Great job! You completed ${completedSets} sets today!`,
      tag: NOTIFICATION_TAGS.WORKOUT_COMPLETE,
      vibrate: VIBRATION_PATTERNS.CELEBRATION,
      requireInteraction: false,
    });

    dispatch(completeWorkout());
    setShowSummary(false);
    onNavigate("plan");
  }, [dispatch, onNavigate, completedSets]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      {showConfetti && <Confetti />}

      {showSummary && (
        <SummaryModal
          workout={workout}
          onClose={() => setShowSummary(false)}
          onFinish={handleFinishWorkout}
        />
      )}

      <div className="mobile-container relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/50 to-[#1a1a1a]">
          <div className="w-full h-[70vh] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
            <Image
              src="/images/6.svg"
              alt="Workout"
              fill
              className="object-contain p-8"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col pb-28">
          <WorkoutHeader
            workoutName={workout.name}
            isRunning={isRunning}
            onBack={() => onNavigate("plan")}
            onTogglePlayPause={toggle}
          />

          <div className="mt-auto">
            <div className="bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a] to-transparent pt-12 pb-6">
              <div className="px-6">
                <WorkoutProgress
                  elapsed={elapsed}
                  completedSets={completedSets}
                  totalSets={totalSets}
                  restTimer={restTimer}
                  isResting={isResting}
                />

                <div className="mt-8 space-y-3 overflow-y-auto">
                  {workout.exercises.map((exercise, index) => (
                    <ExerciseItem
                      key={exercise.id}
                      exercise={exercise}
                      index={index}
                      isExpanded={expandedExercise === exercise.id}
                      onToggleExpand={() =>
                        setExpandedExercise(
                          expandedExercise === exercise.id ? null : exercise.id
                        )
                      }
                      onToggleSet={handleToggleSetCompletion}
                      onUpdateWeight={handleUpdateSetWeight}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {completedSets > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
          >
            <div className="w-full max-w-md p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSummary(true)}
                className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-black py-4 rounded-2xl shadow-2xl pointer-events-auto"
              >
                Complete Workout
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
