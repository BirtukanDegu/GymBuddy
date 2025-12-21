import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./workoutSlice";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    workout: workoutReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["workout/startWorkout", "workout/hydrateState"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
