"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Download, X } from "lucide-react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/constants";
import { promptPWAInstall } from "@/lib/pwa";

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [dismissed, setDismissed] = useLocalStorage(
    STORAGE_KEYS.PWA_DISMISSED,
    false
  );

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    await promptPWAInstall(deferredPrompt);
    setDeferredPrompt(null);
    toast.dismiss("pwa-install");
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    toast.dismiss("pwa-install");
  }, [setDismissed]);

  const handleButtonClick = useCallback(() => {
    toast.custom(
      (t) => (
        <div className="bg-gradient-to-r from-lime-600 to-lime-700 text-white p-4 rounded-2xl shadow-duo-lg">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h3 className="font-bold text-base mb-1">Install Gym Buddy</h3>
              <p className="text-sm mb-3">
                Get quick access and work offline!
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleInstall}
                  className="bg-lime-100 text-lime-950 hover:bg-lime-200 shadow-none"
                >
                  Install Now
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                  className="text-lime-950 hover:bg-white/20"
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
      ),
      {
        id: "pwa-install",
        duration: Infinity,
        position: "top-center",
      }
    );
  }, [dismissed, handleInstall, handleDismiss]);

  if (!deferredPrompt) return null;

  return (
    <Button
      size="icon"
      onClick={handleButtonClick}
      className="w-12 h-12 bg-[#252525]/95 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition animate-bounce"
    >
      <Download className="w-6 h-6" />
    </Button>
  );
}
