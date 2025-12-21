"use client";

import { useEffect, ReactNode } from "react";
import { usePWA } from "@/hooks/usePWA";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi } from "lucide-react";

interface PWAProviderProps {
  children: ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  const {
    isInstalled,
    isOffline,
    notificationPermission,
    requestNotifications,
  } = usePWA();

  useEffect(() => {
    if (isInstalled && notificationPermission === "default") {
      const timer = setTimeout(() => {
        requestNotifications();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isInstalled, notificationPermission, requestNotifications]);

  useEffect(() => {
    console.log("PWA Status:", {
      isInstalled,
      isOffline,
      notificationPermission,
    });
  }, [isInstalled, isOffline, notificationPermission]);

  return (
    <>
      {children}

      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <WifiOff className="w-5 h-5" />
              <span className="font-semibold text-sm">You're offline</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOffline && typeof window !== "undefined" && <OnlineIndicator />}
      </AnimatePresence>
    </>
  );
}

function OnlineIndicator() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-lime-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
        <Wifi className="w-5 h-5" />
        <span className="font-semibold text-sm">Back online!</span>
      </div>
    </motion.div>
  );
}

function useState<T>(initialValue: T): [T, (value: T) => void] {
  const [state, setState] = (0, require("react").useState)(initialValue);
  return [state, setState];
}
