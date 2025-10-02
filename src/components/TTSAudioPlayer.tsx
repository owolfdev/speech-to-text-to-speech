"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Loader2 } from "lucide-react";

interface TTSAudioPlayerProps {
  text: string;
  className?: string;
  disabled?: boolean;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
  onError?: (error: string) => void;
}

export default function TTSAudioPlayer({
  text,
  className = "",
  disabled = false,
  onPlayStart,
  onPlayEnd,
  onError,
}: TTSAudioPlayerProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Clean up blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Handle audio playback events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      onPlayStart?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onPlayEnd?.();
    };

    const handleError = () => {
      setIsPlaying(false);
      onError?.("Failed to play audio");
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [onPlayStart, onPlayEnd, onError]);

  const handlePlay = async () => {
    if (!text || disabled || isLoading) return;

    setIsLoading(true);
    onPlayStart?.();

    try {
      // Make POST request to TTS API
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.status}`);
      }

      // Get audio blob from response
      const blob = await response.blob();

      // Create object URL from blob
      const url = URL.createObjectURL(blob);

      // Clean up previous URL
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      setAudioUrl(url);

      // Load and play audio
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
        await audioRef.current.play();
      }
    } catch (error) {
      console.error("TTS error:", error);
      onError?.(
        error instanceof Error ? error.message : "Failed to generate audio"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePlay}
        disabled={disabled || isLoading || !text}
        className={`h-8 w-8 rounded-full hover:bg-[#5BA3E8]/10 ${className}`}
        title="Listen to pronunciation"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 text-[#5BA3E8] animate-spin" />
        ) : (
          <Volume2
            className={`w-4 h-4 text-[#5BA3E8] ${
              isPlaying ? "animate-pulse" : ""
            }`}
          />
        )}
      </Button>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} preload="none" style={{ display: "none" }} />
    </>
  );
}
