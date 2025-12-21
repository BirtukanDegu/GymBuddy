export const STORAGE_KEYS = {
  CURRENT_VIEW: "gym-buddy-current-view",
  SELECTED_WORKOUT: "gym-buddy-selected-workout",
  WORKOUT_PREFIX: "gym-buddy-workout-",
  THEME: "gym-buddy-theme",
  PWA_DISMISSED: "gym-buddy-pwa-dismissed",
} as const;

export const VIBRATION_PATTERNS = {
  SHORT: [100] as number[],
  MEDIUM: [200, 100, 200] as number[],
  CELEBRATION: [100, 50, 100, 50, 100, 50, 200] as number[],
} as const;

export const SOUND_PATHS = {
  BEEP: "/beep.mp3",
  SUCCESS: "/success.mp3",
} as const;

export const NOTIFICATION_TAGS = {
  WORKOUT_COMPLETE: "workout-complete",
  REST_TIMER: "rest-timer",
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  MEDIUM: 0.5,
  SLOW: 1,
} as const;

export const DAILY_CALORIE_GOAL = 2500;

export const DEFAULT_USER = {
  name: "Abeba",
  title: "Fitness Freak",
  avatar: "/images/avatars/1.svg",
} as const;
