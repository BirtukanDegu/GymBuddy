import { Workout } from "@/types";

export const UPPER_BODY_WORKOUT: Workout = {
  id: "workout-upper-body",
  name: "Upper Body Strength",
  description: "Focus on chest, shoulders, and triceps",
  exercises: [
    {
      id: "upper-ex-1",
      name: "Bench Press",
      sets: 4,
      reps: 8,
      weight: 135,
      weightUnit: "lbs",
      restSeconds: 90,
      setDetails: [],
    },
    {
      id: "upper-ex-2",
      name: "Overhead Press",
      sets: 3,
      reps: 10,
      weight: 65,
      weightUnit: "lbs",
      restSeconds: 60,
      setDetails: [],
    },
    {
      id: "upper-ex-3",
      name: "Tricep Dips",
      sets: 3,
      reps: 12,
      weight: 0,
      weightUnit: "bodyweight",
      restSeconds: 45,
      setDetails: [],
    },
  ],
};

export const LOWER_BODY_WORKOUT: Workout = {
  id: "workout-lower-body",
  name: "Lower Body Strength",
  description: "Focus on glutes, quads, and hamstrings",
  exercises: [
    {
      id: "lower-ex-1",
      name: "Squats",
      sets: 4,
      reps: 10,
      weight: 185,
      weightUnit: "lbs",
      restSeconds: 120,
      setDetails: [],
    },
    {
      id: "lower-ex-2",
      name: "Romanian Deadlifts",
      sets: 3,
      reps: 12,
      weight: 135,
      weightUnit: "lbs",
      restSeconds: 90,
      setDetails: [],
    },
    {
      id: "lower-ex-3",
      name: "Leg Press",
      sets: 3,
      reps: 15,
      weight: 270,
      weightUnit: "lbs",
      restSeconds: 90,
      setDetails: [],
    },
    {
      id: "lower-ex-4",
      name: "Lunges",
      sets: 3,
      reps: 12,
      weight: 0,
      weightUnit: "bodyweight",
      restSeconds: 60,
      setDetails: [],
    },
  ],
};

export const SAMPLE_WORKOUT = UPPER_BODY_WORKOUT;
