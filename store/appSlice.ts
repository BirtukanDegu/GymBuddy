import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ViewType = "activity" | "plan" | "workout";

interface AppState {
  currentView: ViewType;
  theme: "light" | "dark";
  isInitialized: boolean;
}

const initialState: AppState = {
  currentView: "activity",
  theme: "dark",
  isInitialized: false,
};

const loadState = (): AppState => {
  if (typeof window === "undefined") return initialState;

  try {
    const currentView = localStorage.getItem(
      "gym-buddy-current-view"
    ) as ViewType;
    const theme = localStorage.getItem("gym-buddy-theme") as "light" | "dark";

    return {
      currentView: currentView || "activity",
      theme: theme || "dark",
      isInitialized: true,
    };
  } catch (err) {
    console.error("Error loading app state from localStorage:", err);
    return initialState;
  }
};

const saveState = (state: AppState) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("gym-buddy-current-view", state.currentView);
    localStorage.setItem("gym-buddy-theme", state.theme);
  } catch (err) {
    console.error("Error saving app state to localStorage:", err);
  }
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<ViewType>) => {
      state.currentView = action.payload;
      saveState(state);
    },

    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      saveState(state);
    },

    initializeApp: (state) => {
      const loadedState = loadState();
      state.currentView = loadedState.currentView;
      state.theme = loadedState.theme;
      state.isInitialized = true;
    },
  },
});

export const { setCurrentView, setTheme, initializeApp } = appSlice.actions;

export default appSlice.reducer;
