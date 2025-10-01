"use client";

import { useState, useRef, useCallback } from "react";

interface AudioRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
  audioBlob: Blob | null;
  audioUrl: string | null;
}

export function useAudioRecorder() {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isPaused: false,
    recordingTime: 0,
    mediaRecorder: null,
    audioChunks: [],
    audioBlob: null,
    audioUrl: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(async () => {
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

      setState((prev) => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        mediaRecorder,
        audioChunks: [],
        audioBlob: null,
        audioUrl: null,
        recordingTime: 0,
      }));

      // Start timer
      intervalRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          recordingTime: prev.recordingTime + 1,
        }));
      }, 1000);
    } catch (error) {
      console.error("❌ Error starting recording:", error);
      console.error("Error details:", {
        name: (error as Error).name,
        message: (error as Error).message,
      });
      throw error;
    }
  }, []);

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

    setState((prev) => ({
      ...prev,
      isRecording: false,
      isPaused: false,
      recordingTime: 0,
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

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    setState({
      isRecording: false,
      isPaused: false,
      recordingTime: 0,
      mediaRecorder: null,
      audioChunks: [],
      audioBlob: null,
      audioUrl: null,
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

  return {
    ...state,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
    convertToBase64,
  };
}
