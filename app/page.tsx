"use client";

import { useEffect, useCallback } from "react";
import { ActivityView } from "@/components/ActivityView";
import { WorkoutPlanView } from "@/components/WorkoutPlanView";
import { ActiveWorkoutView } from "@/components/ActiveWorkoutView";
import { UPPER_BODY_WORKOUT, LOWER_BODY_WORKOUT } from "@/lib/workoutData";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setCurrentView, initializeApp } from "@/store/appSlice";
import { startWorkout } from "@/store/workoutSlice";

type ViewType = "activity" | "plan" | "workout";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector((state) => state.app.currentView);
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const currentWorkout = useAppSelector(
    (state) => state.workout.currentWorkout
  );

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  // Restore workout view if there's an active workout
  useEffect(() => {
    if (isInitialized && currentWorkout && currentView === "activity") {
      // If there's an active workout but we're on activity view,
      // it means user navigated away and came back
      // Don't automatically switch views, let user decide
    }
  }, [isInitialized, currentWorkout, currentView]);

  const handleSelectWorkout = useCallback(
    (workoutId: "upper" | "lower") => {
      const workout =
        workoutId === "upper" ? UPPER_BODY_WORKOUT : LOWER_BODY_WORKOUT;

      // startWorkout will now automatically resume if the workout exists in activeWorkouts
      dispatch(startWorkout(workout));
      dispatch(setCurrentView("workout"));
    },
    [dispatch]
  );

  const handleNavigate = useCallback(
    (view: ViewType) => {
      dispatch(setCurrentView(view));
    },
    [dispatch]
  );

  if (!isInitialized) {
    return <LoadingSkeleton />;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {currentView === "activity" && (
        <ActivityView onNavigate={handleNavigate} />
      )}
      {currentView === "plan" && (
        <WorkoutPlanView
          onNavigate={handleNavigate}
          onSelectWorkout={handleSelectWorkout}
        />
      )}
      {currentView === "workout" && currentWorkout && (
        <ActiveWorkoutView
          onNavigate={handleNavigate}
          workout={currentWorkout}
        />
      )}
      {currentView === "workout" && !currentWorkout && (
        <WorkoutPlanView
          onNavigate={handleNavigate}
          onSelectWorkout={handleSelectWorkout}
        />
      )}
    </main>
  );
}
