"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="sticky bottom-0 bg-white/10 backdrop-blur-sm border-t border-white/20 z-50 mt-auto">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Image
              src="/app-icon.png"
              alt="App Icon"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-white">Install Répéter</h3>
            <p className="text-xs text-white/80 mt-1">
              Install this app on your device for quick access
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleInstallClick}
              size="sm"
              className="text-xs bg-white text-[#5BA3E8] hover:bg-white/90"
            >
              Install
            </Button>
            <Button
              onClick={() => setShowInstallPrompt(false)}
              variant="outline"
              size="sm"
              className="text-xs border-white/30 text-white hover:bg-white/10"
            >
              Not now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
