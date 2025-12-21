"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/constants";
import { promptPWAInstall } from "@/lib/pwa";

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [dismissed, setDismissed] = useLocalStorage(
    STORAGE_KEYS.PWA_DISMISSED,
    false
  );
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);

      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [dismissed]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    await promptPWAInstall(deferredPrompt);
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setShowInstallBanner(false);
    setDismissed(true);
  }, [setDismissed]);

  if (!deferredPrompt) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleInstall}
        className="rounded-full"
      >
        <Download className="w-5 h-5" />
      </Button>

      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-2xl shadow-duo-lg">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Download className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Install Gym Buddy</h3>
                  <p className="text-sm mb-3">
                    Get quick access and work offline!
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleInstall}
                      className="bg-white text-purple-600 hover:bg-gray-100 font-bold"
                    >
                      Install Now
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleDismiss}
                      className="text-white hover:bg-white/20"
                    >
                      Maybe Later
                    </Button>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
