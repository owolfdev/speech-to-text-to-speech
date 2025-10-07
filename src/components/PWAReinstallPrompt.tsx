"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function PWAReinstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("PWA installed successfully");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 md:max-w-sm md:left-auto">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">Install App</h3>
          <p className="text-gray-600 text-xs mt-1">
            Install for a better experience
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <Button
            onClick={handleInstall}
            size="sm"
            className="bg-[#5BA3E8] hover:bg-[#4A90C7] text-white"
          >
            Install
          </Button>
          <Button
            onClick={() => setShowPrompt(false)}
            size="sm"
            variant="outline"
          >
            ×
          </Button>
        </div>
      </div>
    </div>
  );
}
