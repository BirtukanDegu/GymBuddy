import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const triggerFeedback = () => {
  if ("vibrate" in navigator) {
    navigator.vibrate([200, 100, 200]);
  }

  const audio = new Audio('/sounds/timer-done.mp3'); 
  audio.play();
};