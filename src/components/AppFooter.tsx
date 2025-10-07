"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function AppFooter() {
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

  return (
    <footer className="bg-white/10 backdrop-blur-sm border-t border-white/20 mt-auto">
      {/* PWA Install Prompt */}
      {showInstallPrompt && (
        <div className="border-b border-white/20">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Image
                  src="/app-icon.png"
                  alt="App Icon"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-white">
                  Install Répéter
                </h3>
                <p className="text-xs text-white/80">
                  Install this app on your device for quick access
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  className="text-xs bg-white text-[#5BA3E8] hover:bg-white/90 h-7 px-3"
                >
                  Install
                </Button>
                <Button
                  onClick={() => setShowInstallPrompt(false)}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-white/90 hover:bg-white/10 hover:text-white h-7 px-3"
                >
                  Not now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-center gap-6 md:gap-8">
          <Link
            href="/docs"
            className="text-white/80 hover:text-white text-sm md:text-base transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/blog"
            className="text-white/80 hover:text-white text-sm md:text-base transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-white/80 hover:text-white text-sm md:text-base transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
