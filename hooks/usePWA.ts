import { useState, useEffect, useCallback } from "react";
import {
  isPWA,
  isServiceWorkerSupported,
  registerServiceWorker,
  requestNotificationPermission,
  subscribeToPushNotifications,
  isOnline,
} from "@/lib/pwa";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface UsePWAReturn {
  isInstalled: boolean;
  isInstallable: boolean;
  isOffline: boolean;
  notificationPermission: NotificationPermission;
  installPrompt: BeforeInstallPromptEvent | null;
  promptInstall: () => Promise<boolean>;
  requestNotifications: () => Promise<boolean>;
}

/**
 * Custom hook for PWA functionality
 * Handles installation, notifications, and offline detection
 */
export function usePWA(): UsePWAReturn {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>("default");
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    setIsInstalled(isPWA());
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOffline(!isOnline());
    };

    updateOnlineStatus();

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    if (isServiceWorkerSupported()) {
      registerServiceWorker().then((registration) => {
        if (registration && Notification.permission === "granted") {
          subscribeToPushNotifications(registration);
        }
      });
    }
  }, []);

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!installPrompt) {
      return false;
    }

    try {
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        setIsInstallable(false);
        setInstallPrompt(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error prompting install:", error);
      return false;
    }
  }, [installPrompt]);

  const requestNotifications = useCallback(async (): Promise<boolean> => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotificationPermission("granted");

      if (isServiceWorkerSupported()) {
        const registration = await navigator.serviceWorker.ready;
        await subscribeToPushNotifications(registration);
      }
    }
    return granted;
  }, []);

  return {
    isInstalled,
    isInstallable,
    isOffline,
    notificationPermission,
    installPrompt,
    promptInstall,
    requestNotifications,
  };
}
