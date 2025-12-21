import { useState, useEffect, useCallback, useRef } from "react";
import { vibrate, playSound, showNotification } from "@/lib/pwa";
import {
  VIBRATION_PATTERNS,
  SOUND_PATHS,
  NOTIFICATION_TAGS,
} from "@/lib/constants";

interface UseRestTimerReturn {
  timeLeft: number;
  isResting: boolean;
  startRest: (seconds: number) => void;
  cancelRest: () => void;
}

/**
 * Custom hook for managing rest timer between sets
 * Handles countdown, notifications, and cleanup
 */
export function useRestTimer(): UseRestTimerReturn {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRest = useCallback((seconds: number) => {
    setTimeLeft(seconds);
    setIsResting(true);
  }, []);

  const cancelRest = useCallback(() => {
    setTimeLeft(0);
    setIsResting(false);
  }, []);

  useEffect(() => {
    if (isResting && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            vibrate(VIBRATION_PATTERNS.MEDIUM);
            playSound(SOUND_PATHS.BEEP);
            showNotification("Rest Time Over! 💪", {
              body: "Time to get back to work!",
              tag: NOTIFICATION_TAGS.REST_TIMER,
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isResting, timeLeft]);

  return { timeLeft, isResting, startRest, cancelRest };
}
