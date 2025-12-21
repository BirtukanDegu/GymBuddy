import { Workout, Exercise, SetData } from "@/types";

export function initializeWorkoutSets(workout: Workout): Workout {
  return {
    ...workout,
    exercises: workout.exercises.map((ex) => ({
      ...ex,
      setDetails:
        ex.setDetails?.length > 0
          ? ex.setDetails
          : Array.from({ length: ex.sets }, (_, i) => ({
              id: `${ex.id}-set-${i}`,
              prescribedWeight: ex.weight,
              actualWeight: ex.weight,
              reps: ex.reps,
              isCompleted: false,
            })),
    })),
  };
}

export function getTotalSets(workout: Workout): number {
  return workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
}

export function getCompletedSets(workout: Workout): number {
  return workout.exercises.reduce(
    (sum, ex) => sum + ex.setDetails.filter((set) => set.isCompleted).length,
    0
  );
}

export function getTotalVolume(workout: Workout): number {
  return workout.exercises.reduce(
    (acc, ex) =>
      acc +
      ex.setDetails.reduce(
        (sum, set) =>
          set.isCompleted ? sum + set.actualWeight * set.reps : sum,
        0
      ),
    0
  );
}

export function getCompletionPercentage(workout: Workout): number {
  const total = getTotalSets(workout);
  const completed = getCompletedSets(workout);
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

export function isExerciseComplete(exercise: Exercise): boolean {
  return exercise.setDetails.every((set) => set.isCompleted);
}

export function isWorkoutComplete(workout: Workout): boolean {
  return workout.exercises.every(isExerciseComplete);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function getExerciseCompletedCount(exercise: Exercise): number {
  return exercise.setDetails.filter((set) => set.isCompleted).length;
}
