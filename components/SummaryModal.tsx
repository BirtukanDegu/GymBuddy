"use client";

import { Workout } from "@/types";
import { CheckCircle2, TrendingUp, Dumbbell, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Confetti } from "./Confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  getTotalSets,
  getCompletedSets,
  getTotalVolume,
  getCompletionPercentage,
  getExerciseCompletedCount,
} from "@/lib/workoutUtils";
import { Star, Star1, Timer1, TrendUp } from "iconsax-reactjs";

interface SummaryModalProps {
  workout: Workout;
  onClose: () => void;
  onFinish: () => void;
}

export function SummaryModal({
  workout,
  onClose,
  onFinish,
}: SummaryModalProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [open, setOpen] = useState(true);

  const totalSets = getTotalSets(workout);
  const completedSets = getCompletedSets(workout);
  const totalVolume = getTotalVolume(workout);
  const completionRate = getCompletionPercentage(workout);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 200);
  };

  const handleFinish = () => {
    setOpen(false);
    setTimeout(onFinish, 200);
  };

  return (
    <>
      {showConfetti && <Confetti />}

      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent className="max-w-lg p-0 gap-0 border-none">
          <div className="relative bg-gradient-to-br from-lime-500 to-lime-600 p-8 text-center rounded-t-3xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
              <CheckCircle2
                className="w-12 h-12 text-lime-600"
                strokeWidth={2.5}
              />
            </div>

            <DialogTitle className="text-2xl font-black text-white mb-2 drop-shadow-lg">
              Workout Complete!
            </DialogTitle>
            <DialogDescription className="text-white text-base">
              Great job on completing your workout
            </DialogDescription>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <StatCard
                icon={<Dumbbell className="w-5 h-5" />}
                label="Sets"
                value={`${completedSets}/${totalSets}`}
              />
              <StatCard
                icon={<TrendUp className="w-5 h-5" />}
                label="Volume"
                value={`${totalVolume.toLocaleString()} lbs`}
              />
              <StatCard
                icon={<Timer1 className="w-5 h-5" />}
                label="Complete"
                value={`${completionRate}%`}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide mb-3">
                Exercise Summary
              </h3>
              <div className="space-y-2">
                {workout.exercises.map((ex) => {
                  const completed = getExerciseCompletedCount(ex);
                  const isComplete = completed === ex.sets;
                  return (
                    <div
                      key={ex.id}
                      className="flex items-center justify-between p-3 bg-card rounded-xl hover:bg-card/90 transition border border-border"
                    >
                      <div className="flex items-center gap-3">
                        {isComplete ? (
                          <Star1
                            variant="Bulk"
                            className="w-5 h-5 text-lime-400 flex-shrink-0"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <Star1 className="w-5 h-5 flex-shrink-0" />
                        )}
                        <span className="text-sm text-white">
                          {ex.name}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-bold px-3 py-1 rounded-full ${
                          isComplete
                            ? "bg-lime-500 text-white"
                            : "bg-neutral-900 text-gray-200"
                        }`}
                      >
                        {completed}/{ex.sets}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 h-12 bg-card hover:bg-card/90 text-white text-sm font-bold rounded-xl transition border border-border"
              >
                Keep Working
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 h-12 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white text-sm font-black rounded-xl transition shadow-lg"
              >
                Finish Workout
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl p-4 text-center border border-border">
      <div className="inline-flex items-center justify-center w-10 h-10 bg-border rounded-full mb-2 text-white">
        {icon}
      </div>
      <p className="text-lg font-black text-white mb-1">{value}</p>
      <p className="text-xs text-gray-300 tracking-wide font-semibold">
        {label}
      </p>
    </div>
  );
}
