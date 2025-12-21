export interface SetData {
  id: string;
  prescribedWeight: number;
  actualWeight: number;
  reps: number;
  isCompleted: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  weightUnit: string;
  restSeconds: number;
  setDetails: SetData[];
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
}