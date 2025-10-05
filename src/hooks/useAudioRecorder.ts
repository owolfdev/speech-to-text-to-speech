"use client";

import { useState, useRef, useCallback } from "react";

interface AudioRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  maxRecordingTime: number;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
  audioBlob: Blob | null;
  audioUrl: string | null;
  isNearLimit: boolean;
  isRequestingPermission: boolean;
  isReady: boolean;
}

export function useAudioRecorder() {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isPaused: false,
    recordingTime: 0,
    maxRecordingTime: 30, // Default 30 seconds
    mediaRecorder: null,
    audioChunks: [],
    audioBlob: null,
    audioUrl: null,
    isNearLimit: false,
    isRequestingPermission: false,
    isReady: false,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeoutCallbackRef = useRef<(() => void) | null>(null);

  // Cache for MIME type detection
  const cachedMimeTypeRef = useRef<string | null>(null);
  const isPreparingRef = useRef<boolean>(false);

  // Pre-detect supported MIME type (call this early)
  const detectMimeType = useCallback((): string => {
    if (cachedMimeTypeRef.current) {
      return cachedMimeTypeRef.current;
    }

    console.log("🔍 Detecting supported MIME type...");

    const mimeTypes = [
      "audio/webm;codecs=opus",
      "audio/mp4",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/ogg",
    ];

    for (const mimeType of mimeTypes) {
      if (MediaRecorder.isTypeSupported(mimeType)) {
        console.log(`✅ Using cached MIME type: ${mimeType}`);
        cachedMimeTypeRef.current = mimeType;
        return mimeType;
      }
    }

    console.log("⚠️ Using browser default MIME type");
    cachedMimeTypeRef.current = "";
    return "";
  }, []);

  const startRecording = useCallback(
    async (maxTime?: number, onTimeout?: () => void) => {
      try {
        // Prevent multiple simultaneous requests
        if (isPreparingRef.current) {
          console.log("⏳ Already preparing recording...");
          return;
        }

        isPreparingRef.current = true;

        // Immediate UI feedback
        setState((prev) => ({
          ...prev,
          isRequestingPermission: true,
        }));

        console.log("🎙️ Requesting microphone access...");

        // Check if mediaDevices is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error(
            "Your browser does not support audio recording. Please use a modern browser."
          );
        }

        console.log("✅ MediaDevices API available");

        // Get cached MIME type (no delay)
        const mimeType = detectMimeType();

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            // Remove sampleRate for better mobile compatibility
          },
        });

        console.log("✅ Microphone access granted");
        console.log("🎤 Audio tracks:", stream.getAudioTracks().length);

        streamRef.current = stream;

        const options = mimeType ? { mimeType } : {};
        const mediaRecorder = new MediaRecorder(stream, options);

        console.log(
          "📼 MediaRecorder created with MIME:",
          mediaRecorder.mimeType
        );

        mediaRecorderRef.current = mediaRecorder;

        const audioChunks: Blob[] = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, {
            type: mimeType || "audio/webm",
          });
          const audioUrl = URL.createObjectURL(audioBlob);

          setState((prev) => ({
            ...prev,
            audioBlob,
            audioUrl,
            audioChunks,
          }));
        };

        const recordingMaxTime = maxTime || 30;

        // Start recording immediately
        mediaRecorder.start(1000); // Collect data every second
        console.log("🔴 Recording started!");

        // Update state atomically
        setState((prev) => ({
          ...prev,
          isRecording: true,
          isPaused: false,
          isRequestingPermission: false,
          isReady: true,
          mediaRecorder,
          audioChunks: [],
          audioBlob: null,
          audioUrl: null,
          recordingTime: 0,
          maxRecordingTime: recordingMaxTime,
          isNearLimit: false,
        }));

        // Store timeout callback
        onTimeoutCallbackRef.current = onTimeout || null;

        // Start timer
        intervalRef.current = setInterval(() => {
          setState((prev) => {
            const newTime = prev.recordingTime + 1;

            // Auto-stop if time limit reached
            if (newTime >= recordingMaxTime) {
              console.log("⏰ Recording time limit reached, auto-stopping...");
              if (onTimeoutCallbackRef.current) {
                onTimeoutCallbackRef.current();
              }
              return prev; // The timeout callback will handle stopping
            }

            return {
              ...prev,
              recordingTime: newTime,
              isNearLimit: false, // Always stay green
            };
          });
        }, 1000);

        // Set timeout for auto-stop
        timeoutRef.current = setTimeout(() => {
          console.log("⏰ Recording timeout reached, stopping recording...");
          if (onTimeoutCallbackRef.current) {
            onTimeoutCallbackRef.current();
          }
        }, recordingMaxTime * 1000);

        isPreparingRef.current = false;
      } catch (error) {
        console.error("❌ Error starting recording:", error);
        console.error("Error details:", {
          name: (error as Error).name,
          message: (error as Error).message,
        });

        // Reset state on error
        setState((prev) => ({
          ...prev,
          isRequestingPermission: false,
          isReady: false,
        }));

        isPreparingRef.current = false;
        throw error;
      }
    },
    [detectMimeType]
  );

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setState((prev) => ({
      ...prev,
      isRecording: false,
      isPaused: false,
      recordingTime: 0,
      isNearLimit: false,
      isRequestingPermission: false,
    }));
  }, [state.isRecording]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording && !state.isPaused) {
      mediaRecorderRef.current.pause();
      setState((prev) => ({ ...prev, isPaused: true }));
    }
  }, [state.isRecording, state.isPaused]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording && state.isPaused) {
      mediaRecorderRef.current.resume();
      setState((prev) => ({ ...prev, isPaused: false }));
    }
  }, [state.isRecording, state.isPaused]);

  const resetRecording = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Clear timeout callback
    onTimeoutCallbackRef.current = null;

    setState({
      isRecording: false,
      isPaused: false,
      recordingTime: 0,
      maxRecordingTime: 30,
      mediaRecorder: null,
      audioChunks: [],
      audioBlob: null,
      audioUrl: null,
      isNearLimit: false,
      isRequestingPermission: false,
      isReady: false,
    });
  }, []);

  const convertToBase64 = useCallback(async (): Promise<string> => {
    const sourceBlob = state.audioBlob;
    if (!sourceBlob) {
      throw new Error("No audio data available");
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        // Remove data URL prefix
        const base64Data = base64.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(sourceBlob);
    });
  }, [state.audioBlob]);

  // Calculate appropriate recording time based on phrase length
  const calculateRecordingTime = useCallback((phrase: string): number => {
    const wordCount = phrase.split(/\s+/).length;
    const charCount = phrase.length;

    // Base time: 3 seconds minimum
    const baseTime = 3;

    // Add time based on word count (1.5 seconds per word)
    const wordTime = wordCount * 1.5;

    // Add time based on character count (0.1 seconds per character)
    const charTime = charCount * 0.1;

    // Use the higher of word-based or char-based calculation
    const calculatedTime = Math.max(wordTime, charTime, baseTime);

    // Cap at 60 seconds maximum, minimum 5 seconds
    return Math.min(Math.max(calculatedTime, 5), 60);
  }, []);

  // Validate audio size before sending to API
  const validateAudioSize = useCallback(
    (audioBlob: Blob): { isValid: boolean; error?: string } => {
      const maxSizeBytes = 10 * 1024 * 1024; // 10MB limit
      const maxDurationSeconds = 60; // 60 seconds max

      if (audioBlob.size > maxSizeBytes) {
        return {
          isValid: false,
          error: `Audio file too large (${Math.round(
            audioBlob.size / 1024 / 1024
          )}MB). Maximum size is 10MB.`,
        };
      }

      if (state.recordingTime > maxDurationSeconds) {
        return {
          isValid: false,
          error: `Recording too long (${state.recordingTime}s). Maximum duration is 60 seconds.`,
        };
      }

      return { isValid: true };
    },
    [state.recordingTime]
  );

  // Pre-initialize MIME type detection (call this early in component lifecycle)
  const preInitialize = useCallback(() => {
    if (!cachedMimeTypeRef.current) {
      detectMimeType();
      console.log("🚀 Pre-initialized MIME type detection");
    }
  }, [detectMimeType]);

  return {
    ...state,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
    convertToBase64,
    calculateRecordingTime,
    validateAudioSize,
    preInitialize,
  };
}
