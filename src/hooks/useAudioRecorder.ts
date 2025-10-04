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
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeoutCallbackRef = useRef<(() => void) | null>(null);

  const startRecording = useCallback(
    async (maxTime?: number, onTimeout?: () => void) => {
      try {
        console.log("🎙️ Requesting microphone access...");

        // Check if mediaDevices is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error(
            "Your browser does not support audio recording. Please use a modern browser."
          );
        }

        console.log("✅ MediaDevices API available");

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

        // Detect supported MIME type for better mobile compatibility
        let mimeType = "audio/webm;codecs=opus";

        if (!MediaRecorder.isTypeSupported(mimeType)) {
          console.log("⚠️ WEBM Opus not supported, trying fallbacks...");
          // Fallback for Safari/iOS
          if (MediaRecorder.isTypeSupported("audio/mp4")) {
            mimeType = "audio/mp4";
            console.log("✅ Using audio/mp4");
          } else if (MediaRecorder.isTypeSupported("audio/webm")) {
            mimeType = "audio/webm";
            console.log("✅ Using audio/webm");
          } else if (MediaRecorder.isTypeSupported("audio/ogg")) {
            mimeType = "audio/ogg";
            console.log("✅ Using audio/ogg");
          } else {
            // Let the browser choose
            mimeType = "";
            console.log("⚠️ Using browser default MIME type");
          }
        } else {
          console.log("✅ Using audio/webm;codecs=opus");
        }

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

        mediaRecorder.start(1000); // Collect data every second
        console.log("🔴 Recording started!");

        const recordingMaxTime = maxTime || 30;

        setState((prev) => ({
          ...prev,
          isRecording: true,
          isPaused: false,
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
            const isNearLimit = newTime >= recordingMaxTime - 5; // Warning 5 seconds before limit

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
              isNearLimit,
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
      } catch (error) {
        console.error("❌ Error starting recording:", error);
        console.error("Error details:", {
          name: (error as Error).name,
          message: (error as Error).message,
        });
        throw error;
      }
    },
    []
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
    let baseTime = 3;

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
  };
}
