import {
  VIBRATION_PATTERNS,
  SOUND_PATHS,
  NOTIFICATION_TAGS,
} from "./constants";

/**
 * Request notification permission from the user
 * @returns Promise<boolean> - true if permission granted
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    console.warn("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

interface ExtendedNotificationOptions extends NotificationOptions {
  vibrate?: number | number[];
}

export const showNotification = async (
  title: string,
  options?: ExtendedNotificationOptions
): Promise<void> => {
  if (typeof window === "undefined") return;

  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    console.warn("Notification permission not granted");
    return;
  }

  try {
    const notificationOptions: ExtendedNotificationOptions = {
      icon: "/icon-192x192.png",
      badge: "/icon-192x192.png",
      vibrate: VIBRATION_PATTERNS.MEDIUM,
      requireInteraction: false,
      ...options,
    };

    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, notificationOptions as any);
    } else {
      new Notification(title, notificationOptions as any);
    }
  } catch (error) {
    console.error("Failed to show notification:", error);
  }
};

export const vibrate = (pattern: number | number[]): void => {
  if (typeof window === "undefined" || !("vibrate" in navigator)) return;

  try {
    navigator.vibrate(pattern);
  } catch (error) {
    console.error("Failed to vibrate:", error);
  }
};

export const playSound = async (soundUrl: string): Promise<void> => {
  if (typeof window === "undefined") return;

  try {
    const audio = new Audio(soundUrl);
    audio.volume = 0.5;
    await audio.play();
  } catch (error) {
    console.warn("Could not play sound:", error);
  }
};

export const celebrationEffects = async (): Promise<void> => {
  vibrate(VIBRATION_PATTERNS.CELEBRATION);
  playSound(SOUND_PATHS.SUCCESS);
  await showNotification("Workout Complete!", {
    body: "Great job! You crushed it today!",
    tag: NOTIFICATION_TAGS.WORKOUT_COMPLETE,
  });
};

export const restTimerComplete = async (): Promise<void> => {
  vibrate(VIBRATION_PATTERNS.MEDIUM);
  playSound(SOUND_PATHS.BEEP);
  await showNotification("Rest Time Over! 💪", {
    body: "Time to get back to work!",
    tag: NOTIFICATION_TAGS.REST_TIMER,
  });
};

export const isPWA = (): boolean => {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes("android-app://")
  );
};

export const isServiceWorkerSupported = (): boolean => {
  return typeof window !== "undefined" && "serviceWorker" in navigator;
};

export const registerServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    if (!isServiceWorkerSupported()) {
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      return registration;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
      return null;
    }
  };

/**
 * Unregister all service workers (for debugging)
 */
export const unregisterServiceWorkers = async (): Promise<boolean> => {
  if (!isServiceWorkerSupported()) return false;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((reg) => reg.unregister()));
    return true;
  } catch (error) {
    console.error("Failed to unregister service workers:", error);
    return false;
  }
};

export const isOnline = (): boolean => {
  return typeof window !== "undefined" && navigator.onLine;
};

export const subscribeToPushNotifications = async (
  registration: ServiceWorkerRegistration
): Promise<PushSubscription | null> => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      return null;
    }

    let subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      return subscription;
    }

    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";

    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidKey
        ? urlBase64ToUint8Array(vapidKey)
        : undefined,
    });

    return subscription;
  } catch (error) {
    console.error("Failed to subscribe to push notifications:", error);
    return null;
  }
};

export const unsubscribeFromPushNotifications = async (
  registration: ServiceWorkerRegistration
): Promise<boolean> => {
  try {
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to unsubscribe from push notifications:", error);
    return false;
  }
};

function urlBase64ToUint8Array(base64String: string): BufferSource {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const promptPWAInstall = async (
  deferredPrompt: any
): Promise<boolean> => {
  if (!deferredPrompt) {
    return false;
  }

  try {
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    return choiceResult.outcome === "accepted";
  } catch (error) {
    console.error("Error prompting PWA install:", error);
    return false;
  }
};

export const cacheAssets = async (urls: string[]): Promise<boolean> => {
  if (!("caches" in window)) {
    return false;
  }

  try {
    const cache = await caches.open("gym-buddy-v1");
    await cache.addAll(urls);
    return true;
  } catch (error) {
    console.error("Failed to cache assets:", error);
    return false;
  }
};

export const clearAllCaches = async (): Promise<boolean> => {
  if (!("caches" in window)) return false;

  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
    return true;
  } catch (error) {
    console.error("Failed to clear caches:", error);
    return false;
  }
};
