import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workout, Exercise, SetData } from "@/types";
import { initializeWorkoutSets } from "@/lib/workoutUtils";

interface WorkoutState {
  currentWorkout: Workout | null;
  activeWorkouts: Record<string, Workout>; // Store multiple active workouts by ID
  workoutHistory: Workout[];
  startTime: number | null;
  isActive: boolean;
}

const initialState: WorkoutState = {
  currentWorkout: null,
  activeWorkouts: {},
  workoutHistory: [],
  startTime: null,
  isActive: false,
};

const loadState = (): WorkoutState => {
  if (typeof window === "undefined") return initialState;

  try {
    const serializedState = localStorage.getItem("gym-buddy-redux-state");
    if (serializedState === null) return initialState;

    const loadedState = JSON.parse(serializedState) as Partial<WorkoutState>;

    // Migrate old state to new structure
    return {
      currentWorkout: loadedState.currentWorkout || null,
      activeWorkouts: loadedState.activeWorkouts || {}, // Ensure activeWorkouts exists
      workoutHistory: loadedState.workoutHistory || [],
      startTime: loadedState.startTime || null,
      isActive: loadedState.isActive || false,
    };
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return initialState;
  }
};

const saveState = (state: WorkoutState) => {
  if (typeof window === "undefined") return;

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("gym-buddy-redux-state", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState: loadState(),
  reducers: {
    startWorkout: (state, action: PayloadAction<Workout>) => {
      const workoutId = action.payload.id;

      // Ensure activeWorkouts exists
      if (!state.activeWorkouts) {
        state.activeWorkouts = {};
      }

      // Check if this workout already exists in activeWorkouts
      if (state.activeWorkouts[workoutId]) {
        // Resume existing workout
        state.currentWorkout = state.activeWorkouts[workoutId];
      } else {
        // Initialize new workout
        const workout = initializeWorkoutSets(action.payload);
        state.currentWorkout = workout;
        state.activeWorkouts[workoutId] = workout;
      }

      state.startTime = Date.now();
      state.isActive = true;
      saveState(state);
    },

    updateSet: (
      state,
      action: PayloadAction<{
        exerciseId: string;
        setIndex: number;
        updates: Partial<SetData>;
      }>
    ) => {
      if (!state.currentWorkout) return;

      const exercise = state.currentWorkout.exercises.find(
        (ex) => ex.id === action.payload.exerciseId
      );

      if (exercise && exercise.setDetails[action.payload.setIndex]) {
        exercise.setDetails[action.payload.setIndex] = {
          ...exercise.setDetails[action.payload.setIndex],
          ...action.payload.updates,
        };

        // Update in activeWorkouts as well
        if (state.activeWorkouts && state.currentWorkout.id) {
          state.activeWorkouts[state.currentWorkout.id] = state.currentWorkout;
        }

        saveState(state);
      }
    },

    toggleSetCompletion: (
      state,
      action: PayloadAction<{
        exerciseId: string;
        setIndex: number;
      }>
    ) => {
      if (!state.currentWorkout) return;

      const exercise = state.currentWorkout.exercises.find(
        (ex) => ex.id === action.payload.exerciseId
      );

      if (exercise && exercise.setDetails[action.payload.setIndex]) {
        const set = exercise.setDetails[action.payload.setIndex];
        set.isCompleted = !set.isCompleted;

        // Update in activeWorkouts as well
        if (state.activeWorkouts && state.currentWorkout.id) {
          state.activeWorkouts[state.currentWorkout.id] = state.currentWorkout;
        }

        saveState(state);
      }
    },

    updateSetWeight: (
      state,
      action: PayloadAction<{
        exerciseId: string;
        setIndex: number;
        weight: number;
      }>
    ) => {
      if (!state.currentWorkout) return;

      const exercise = state.currentWorkout.exercises.find(
        (ex) => ex.id === action.payload.exerciseId
      );

      if (exercise && exercise.setDetails[action.payload.setIndex]) {
        exercise.setDetails[action.payload.setIndex].actualWeight =
          action.payload.weight;

        // Update in activeWorkouts as well
        if (state.activeWorkouts && state.currentWorkout.id) {
          state.activeWorkouts[state.currentWorkout.id] = state.currentWorkout;
        }

        saveState(state);
      }
    },

    completeWorkout: (state) => {
      if (!state.currentWorkout) return;

      state.workoutHistory.push({
        ...state.currentWorkout,
        id: `${state.currentWorkout.id}-${Date.now()}`,
      });

      // Remove from activeWorkouts when completed
      if (state.activeWorkouts && state.currentWorkout.id) {
        delete state.activeWorkouts[state.currentWorkout.id];
      }

      state.currentWorkout = null;
      state.startTime = null;
      state.isActive = false;
      saveState(state);
    },

    cancelWorkout: (state) => {
      // Remove from activeWorkouts when cancelled
      if (state.currentWorkout && state.activeWorkouts) {
        delete state.activeWorkouts[state.currentWorkout.id];
      }

      state.currentWorkout = null;
      state.startTime = null;
      state.isActive = false;
      saveState(state);
    },

    clearHistory: (state) => {
      state.workoutHistory = [];
      saveState(state);
    },

    restoreWorkout: (state, action: PayloadAction<string>) => {
      const workout = state.workoutHistory.find((w) => w.id === action.payload);
      if (workout) {
        state.currentWorkout = initializeWorkoutSets(workout);
        state.startTime = Date.now();
        state.isActive = true;
        saveState(state);
      }
    },

    hydrateState: (state) => {
      const loadedState = loadState();
      return loadedState;
    },

    resetWorkout: (state, action: PayloadAction<string>) => {
      // Remove a specific workout from activeWorkouts
      const workoutId = action.payload;

      if (state.activeWorkouts) {
        delete state.activeWorkouts[workoutId];
      }

      // If it's the current workout, clear it
      if (state.currentWorkout?.id === workoutId) {
        state.currentWorkout = null;
        state.startTime = null;
        state.isActive = false;
      }

      saveState(state);
    },
  },
});

export const {
  startWorkout,
  updateSet,
  toggleSetCompletion,
  updateSetWeight,
  completeWorkout,
  cancelWorkout,
  clearHistory,
  restoreWorkout,
  hydrateState,
  resetWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;
