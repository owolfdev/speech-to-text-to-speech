"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Mic,
  MicOff,
  SkipForward,
  Check,
  Circle,
  Smile,
  Laugh,
  Star,
  Trophy,
  PartyPopper,
  Info,
  Volume2,
  TestTube,
  X,
} from "lucide-react";
import Image from "next/image";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import {
  getNextPhrase,
  getTotalPhraseCount,
  type FrenchPhrase,
} from "@/lib/phrases-fallback";
import { getPronunciationFeedback } from "@/lib/text-comparison";

// SIMPLE STATE MACHINE
type AppState = "idle" | "recording" | "processing";

export default function PronunciationPracticeSimple() {
  // Core state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(1); // Start at 1 for display
  const [successfulReps, setSuccessfulReps] = useState(0);
  const [requiredReps] = useState(5);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [currentPhrase, setCurrentPhrase] = useState<FrenchPhrase | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Simple feedback state
  const [lastResult, setLastResult] = useState<{
    success: boolean;
    message: string;
    transcription?: string;
  } | null>(null);

  // Testing mode state
  const [showTestingMode, setShowTestingMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const [rawTranscription, setRawTranscription] = useState<string>("");

  // SIMPLE STATE MACHINE
  const [appState, setAppState] = useState<AppState>("idle");

  // Button animation state
  const [buttonPressed, setButtonPressed] = useState(false);

  // Use our existing audio recorder hook
  const {
    isRecording: isAudioRecording,
    recordingTime,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  // Load initial phrase
  useEffect(() => {
    const loadPhrase = async () => {
      const newPhrase = await getNextPhrase();
      setCurrentPhrase(newPhrase);
    };
    loadPhrase();
  }, []);

  // Debug logging
  useEffect(() => {
    console.log("🔄 App State:", appState, {
      isAudioRecording,
      audioBlob: audioBlob
        ? `${audioBlob.type} (${audioBlob.size} bytes)`
        : null,
      successfulReps,
      requiredReps,
    });
  }, [appState, isAudioRecording, audioBlob, successfulReps, requiredReps]);

  // Handle audio playback using native TTS (for now)
  const handlePlayAudio = async () => {
    if (!currentPhrase) return;

    console.log("🔊 Starting native TTS for:", currentPhrase.text);
    setIsPlayingAudio(true);

    // Use native TTS directly for now (Google TTS needs API key setup)
    if ("speechSynthesis" in window) {
      // Debug: Check available voices
      const voices = window.speechSynthesis.getVoices();
      console.log("🎤 Available voices:", voices.length);

      // Find French voices
      const frenchVoices = voices.filter(
        (voice) => voice.lang.startsWith("fr") || voice.lang.includes("French")
      );
      console.log(
        "🇫🇷 French voices:",
        frenchVoices.map((v) => `${v.name} (${v.lang})`)
      );

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Wait a moment for cancellation to complete
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(currentPhrase.text);

        // Try to use a French voice if available
        if (frenchVoices.length > 0) {
          utterance.voice = frenchVoices[0];
          console.log("🎯 Using French voice:", frenchVoices[0].name);
        } else {
          console.log("⚠️ No French voices found, using default");
        }

        utterance.lang = "fr-FR";
        utterance.rate = 0.8; // Slower for better pronunciation
        utterance.volume = 1.0;
        utterance.pitch = 1.0;

        utterance.onstart = () => {
          console.log("🎵 Native TTS started");
          setIsPlayingAudio(true);
        };

        utterance.onend = () => {
          console.log("✅ Native TTS ended");
          setIsPlayingAudio(false);
        };

        utterance.onerror = (event) => {
          console.error("❌ Native TTS error:", event.error, event);
          setIsPlayingAudio(false);

          // Try with English as fallback
          console.log("🔄 Trying English fallback...");
          const englishUtterance = new SpeechSynthesisUtterance(
            currentPhrase.text
          );
          englishUtterance.lang = "en-US";
          englishUtterance.rate = 0.8;
          englishUtterance.volume = 1.0;

          englishUtterance.onend = () => {
            console.log("✅ English TTS ended");
            setIsPlayingAudio(false);
          };

          englishUtterance.onerror = () => {
            console.error("❌ English TTS also failed");
            setIsPlayingAudio(false);
          };

          window.speechSynthesis.speak(englishUtterance);
        };

        console.log("🔊 Speaking:", currentPhrase.text);
        console.log("🔊 Voice settings:", {
          voice: utterance.voice?.name || "default",
          lang: utterance.lang,
          rate: utterance.rate,
          volume: utterance.volume,
          pitch: utterance.pitch,
        });

        window.speechSynthesis.speak(utterance);
      }, 100);
    } else {
      console.error("❌ Speech synthesis not supported in this browser");
      setIsPlayingAudio(false);
    }
  };

  // Handle phrase navigation
  const handleNextPhrase = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    handleButtonPress(); // Trigger animation

    // Reset everything for new phrase
    setAppState("idle");
    setShowCelebration(false);
    setLastResult(null);
    setCurrentPhraseIndex((prev) => (prev % getTotalPhraseCount()) + 1);
    setSuccessfulReps(0);
    setShowTranslation(false);
    setIsPlayingAudio(false);

    // Load next phrase in sequence
    const loadNewPhrase = async () => {
      const newPhrase = await getNextPhrase();
      setCurrentPhrase(newPhrase);
    };
    loadNewPhrase();

    resetRecording();
  };

  // Button press animation handler
  const handleButtonPress = () => {
    setButtonPressed(true);
    setTimeout(() => setButtonPressed(false), 150);
  };

  // SIMPLE RECORDING START
  const handleStartRecording = async (): Promise<void> => {
    try {
      console.log("🎤 Starting recording...");
      handleButtonPress(); // Trigger animation

      // Clear any previous state
      setPermissionError(null);
      setLastResult(null); // Clear success/failure message when starting new recording
      setAppState("idle");

      // Start recording
      await startRecording();
      setAppState("recording");

      console.log("✅ Recording started successfully");
    } catch (error) {
      const err = error as Error;
      console.error("Failed to start recording:", error);
      const errorMessage = err.message || "Failed to access microphone";
      setPermissionError(errorMessage);

      // Provide helpful error messages for mobile users
      if (
        errorMessage.includes("Permission denied") ||
        errorMessage.includes("NotAllowedError")
      ) {
        alert(
          "Microphone access denied. Please:\n\n1. Check your browser settings\n2. Allow microphone access for this site\n3. On iOS: Settings > Safari > Microphone\n4. Try using HTTPS or Chrome/Safari"
        );
      } else if (errorMessage.includes("NotFoundError")) {
        alert(
          "No microphone found. Please check your device has a working microphone."
        );
      } else {
        alert(
          "Please allow microphone access to use this feature.\n\nNote: Mobile browsers may require HTTPS for microphone access."
        );
      }
    }
  };

  // SIMPLE RECORDING STOP + AUTO PROCESS
  const handleStopRecording = async () => {
    console.log("🛑 Stopping recording...");
    handleButtonPress(); // Trigger animation

    // Stop recording
    stopRecording();

    // Set processing state immediately
    setAppState("processing");
    console.log("🔄 Waiting for audio blob...");
  };

  // SIMPLE AUTO PROCESSING
  const processAudioAutomatically = useCallback(
    async (blob: Blob): Promise<void> => {
      console.log("🔄 processAudioAutomatically called");
      console.log(
        "🔍 Audio blob:",
        blob ? `${blob.type} (${blob.size} bytes)` : "No blob"
      );
      console.log("🔍 Current phrase:", currentPhrase?.text);

      if (!blob || !currentPhrase) {
        console.log("🚫 Cannot process - missing data");
        setAppState("idle");
        setLastResult({
          success: false,
          message: "Missing audio or phrase data. Please try again.",
        });
        return;
      }

      console.log("🔄 Auto-processing audio...");

      try {
        console.log("🔄 Step 1: Converting audio to base64...");

        // Convert audio to base64
        const base64Audio = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            const base64Data = base64.split(",")[1];
            console.log(
              "📦 Audio converted to base64, length:",
              base64Data.length
            );
            resolve(base64Data);
          };
          reader.onerror = (error) => {
            console.error("❌ FileReader error:", error);
            reject(error);
          };
          reader.readAsDataURL(blob);
        });

        console.log("✅ Step 1 complete: Audio converted to base64");

        console.log("🔄 Step 2: Sending to API...");

        // Send to speech-to-text API
        const response = await fetch("/api/speech-to-text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audioData: base64Audio,
            mimeType: blob.type,
          }),
        });

        console.log("📤 API response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ API error response:", errorText);
          throw new Error(`API error: ${response.status} - ${errorText}`);
        }

        console.log("✅ Step 2 complete: API call successful");

        const responseData = await response.json();
        console.log("📋 Full API response:", responseData);

        const { transcription } = responseData;
        console.log("🗣️ Transcription received:", transcription);

        // Compare with target phrase
        const feedback = getPronunciationFeedback(
          transcription,
          currentPhrase.text
        );
        console.log("📊 Feedback:", feedback);

        setAttempts((prev) => prev + 1);

        // SIMPLE LOGIC: If acceptable, add progress
        if (feedback.isAcceptable) {
          setScore((prev) => prev + 1);
          const newSuccessfulReps = successfulReps + 1;
          setSuccessfulReps(newSuccessfulReps);

          setLastResult({
            success: true,
            message: `Great! Progress: ${newSuccessfulReps}/${requiredReps}`,
            transcription,
          });

          if (newSuccessfulReps >= requiredReps) {
            setShowCelebration(true);
          }
        } else {
          // Not acceptable - just show failure message
          setLastResult({
            success: false,
            message: "Keep practicing!",
            transcription,
          });
        }

        // CLEAR AUDIO DATA IMMEDIATELY after processing
        resetRecording();

        // Go straight to idle state - message stays until user clicks record
        setAppState("idle");
      } catch (error) {
        console.error("❌ Error processing speech:", error);
        setLastResult({
          success: false,
          message: "Processing failed. Try again.",
        });

        // Clear audio data and reset
        resetRecording();
        setAppState("idle");
      }
    },
    [currentPhrase, successfulReps, requiredReps, resetRecording]
  );

  // Listen for audio blob changes and auto-process when available
  useEffect(() => {
    if (appState === "processing" && audioBlob && audioBlob.size > 0) {
      console.log("🎵 Audio blob available, processing...");
      console.log(
        "🔍 Audio blob:",
        `${audioBlob.type} (${audioBlob.size} bytes)`
      );
      processAudioAutomatically(audioBlob);
    }
  }, [audioBlob, appState, processAudioAutomatically]);

  // Test TTS function
  const handleTestTTS = () => {
    console.log("🧪 Testing TTS...");
    const testUtterance = new SpeechSynthesisUtterance("Hello, this is a test");
    testUtterance.lang = "en-US";
    testUtterance.rate = 1.0;
    testUtterance.volume = 1.0;

    testUtterance.onstart = () => console.log("🧪 Test TTS started");
    testUtterance.onend = () => console.log("🧪 Test TTS ended");
    testUtterance.onerror = (event) =>
      console.error("🧪 Test TTS error:", event);

    window.speechSynthesis.speak(testUtterance);
  };

  // Testing mode functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setUploadedAudioUrl(url);
      setRawTranscription("");
    }
  };

  const handleTestUploadedFile = async (): Promise<void> => {
    if (!uploadedFile) return;

    setAppState("processing");
    setRawTranscription("");
    try {
      console.log("🎤 Starting file upload test...");
      console.log("📁 File:", uploadedFile.name, "Type:", uploadedFile.type);

      // Convert file to base64
      const base64Audio = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          const base64Data = base64.split(",")[1];
          console.log(
            "✅ File converted to base64, length:",
            base64Data.length
          );
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(uploadedFile);
      });

      console.log("📤 Sending to API...");
      // Send to speech-to-text API
      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audioData: base64Audio,
          mimeType: uploadedFile.type,
        }),
      });

      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ API Error:", errorData);
        throw new Error(errorData.error || "Failed to process speech");
      }

      const responseData = await response.json();
      console.log("📋 Full API Response:", responseData);

      const { transcription } = responseData;
      console.log("🗣️ Transcription:", transcription);

      // Just display the raw transcription - no comparison
      if (transcription) {
        setRawTranscription(transcription);
        console.log("✅ Transcription set successfully");
      } else {
        setRawTranscription(
          "[Empty transcription - Google STT returned nothing]"
        );
        console.warn("⚠️ Transcription is empty");
      }
    } catch (error) {
      console.error("❌ Error processing speech:", error);
      alert(
        `Failed to process audio: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setAppState("idle");
      console.log("🏁 Processing complete");
    }
  };

  // Get difficulty color for badges
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Get emotional progression icons
  const getEmotionIcon = (index: number, isCompleted: boolean) => {
    if (!isCompleted) {
      return <Circle className="w-6 h-6 text-muted-foreground/40" />;
    }

    switch (index) {
      case 0:
        return <Smile className="w-6 h-6 text-primary" />;
      case 1:
        return <Laugh className="w-6 h-6 text-primary" />;
      case 2:
        return <Star className="w-6 h-6 text-primary" />;
      case 3:
        return <Trophy className="w-6 h-6 text-primary" />;
      case 4:
        return <PartyPopper className="w-6 h-6 text-primary" />;
      default:
        return <Check className="w-6 h-6 text-primary" />;
    }
  };

  // SIMPLE BUTTON STATE LOGIC
  const getButtonState = () => {
    switch (appState) {
      case "idle":
        return {
          text: "Record",
          icon: <Mic className="w-4 md:w-5 h-4 md:h-5 mr-2" />,
          disabled: false,
          onClick: handleStartRecording,
          className: "bg-[#5BA3E8] hover:bg-[#5BA3E8]/90 text-white",
        };
      case "recording":
        return {
          text: `Stop (${Math.floor(recordingTime / 60)}:${(recordingTime % 60)
            .toString()
            .padStart(2, "0")})`,
          icon: <MicOff className="w-4 md:w-5 h-4 md:h-5 mr-2" />,
          disabled: false,
          onClick: handleStopRecording,
          className: "bg-destructive hover:bg-destructive/90",
        };
      case "processing":
        return {
          text: "Processing...",
          icon: null,
          disabled: true,
          onClick: () => {},
          className: "bg-gray-500",
        };
      default:
        return {
          text: "Record",
          icon: <Mic className="w-4 md:w-5 h-4 md:h-5 mr-2" />,
          disabled: false,
          onClick: handleStartRecording,
          className: "bg-[#5BA3E8] hover:bg-[#5BA3E8]/90 text-white",
        };
    }
  };

  if (!currentPhrase) {
    return (
      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/app-icon.png"
            alt="Répéter"
            width={48}
            height={48}
            className="rounded-xl"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white">Répéter</h1>
        </div>
        <Card className="p-8 shadow-xl border-0">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        </Card>
      </div>
    );
  }

  const buttonState = getButtonState();

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
      {/* Header with branding */}
      <div className="flex items-center justify-center gap-3">
        <Image
          src="/app-icon.png"
          alt="Répéter"
          width={48}
          height={48}
          className="rounded-xl"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white">Répéter</h1>
        {/* <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTestingMode(!showTestingMode)}
          className="ml-auto text-white/80 hover:text-white hover:bg-white/10"
          title="Toggle Testing Mode"
        >
          <TestTube className="w-4 h-4" />
        </Button> */}
      </div>

      {/* Testing Mode */}
      {showTestingMode && (
        <Card className="border-2 border-blue-500 bg-blue-50/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-600 flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                🧪 Developer Testing Mode
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTestingMode(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <CardDescription>
              Upload an audio file (.ogg, .mp3, .wav, .webm, etc.) to test
              Google Speech-to-Text
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    dark:file:bg-blue-900 dark:file:text-blue-200"
                />
              </div>

              <Button
                onClick={handleTestTTS}
                size="sm"
                variant="outline"
                className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                🧪 Test TTS (English)
              </Button>
            </div>

            {uploadedFile && (
              <div className="space-y-4">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Selected: <strong>{uploadedFile.name}</strong> (
                  {uploadedFile.type})
                </div>

                {uploadedAudioUrl && (
                  <audio controls src={uploadedAudioUrl} className="w-full" />
                )}

                <Button
                  onClick={handleTestUploadedFile}
                  disabled={appState === "processing"}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {appState === "processing"
                    ? "Processing..."
                    : "Test Speech-to-Text"}
                </Button>
              </div>
            )}

            {rawTranscription && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <Label className="text-green-800 dark:text-green-200 font-semibold">
                  ✅ Raw Transcription from Google STT:
                </Label>
                <p className="mt-2 text-lg font-medium text-green-900 dark:text-green-100">
                  {rawTranscription}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stats card */}
      <Card className="p-4 md:p-6 shadow-xl border-0">
        <div className="flex items-center justify-around gap-2 md:gap-4">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-[#5BA3E8]">
              {score}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">Score</p>
          </div>
          <div className="h-10 md:h-12 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              {attempts}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">Attempts</p>
          </div>
          <div className="h-10 md:h-12 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">Accuracy</p>
          </div>
        </div>
      </Card>

      {/* Main practice card */}
      <Card className="p-4 md:p-8 shadow-xl border-0 space-y-4 md:space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-lg font-semibold text-foreground">
              Current Phrase {currentPhraseIndex}/{getTotalPhraseCount()}
            </h2>
            <Badge className={getDifficultyColor(currentPhrase.difficulty)}>
              {currentPhrase.difficulty}
            </Badge>
          </div>

          <div className="space-y-3">
            {/* Phrase display with audio and translation controls */}
            <div className="p-4 md:p-6 bg-[#5BA3E8]/10 rounded-xl border-2 border-[#5BA3E8]/30 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayAudio}
                disabled={isPlayingAudio}
                className="absolute top-2 left-2 h-8 w-8 rounded-full hover:bg-[#5BA3E8]/10"
                title="Listen to pronunciation"
              >
                <Volume2
                  className={`w-4 h-4 text-[#5BA3E8] ${
                    isPlayingAudio ? "animate-pulse" : ""
                  }`}
                />
              </Button>

              <p className="text-xl md:text-2xl font-medium text-[#5BA3E8] text-center text-balance px-8">
                {currentPhrase.text}
              </p>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTranslation(!showTranslation)}
                className="absolute top-2 right-2 h-8 w-8 rounded-full hover:bg-[#5BA3E8]/10"
                title="Show translation"
              >
                <Info className="w-4 h-4 text-[#5BA3E8]" />
              </Button>
            </div>

            {/* Translation display */}
            {showTranslation && (
              <div className="p-3 md:p-4 bg-muted/50 rounded-xl border-2 border-muted-foreground/20 animate-in fade-in slide-in-from-top-2">
                <p className="text-base md:text-lg text-muted-foreground text-center italic">
                  {currentPhrase.english_translation}
                </p>
              </div>
            )}
          </div>

          {/* Progress section with emotional progression */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">
                Progress
              </span>
              <span className="font-bold text-[#5BA3E8]">
                {successfulReps} / {requiredReps}
              </span>
            </div>
            <div className="flex gap-1.5 md:gap-2">
              {Array.from({ length: requiredReps }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1.5 md:gap-2"
                >
                  <div className="transition-all duration-500 transform hover:scale-110">
                    {i < successfulReps ? (
                      <div className="text-[#5BA3E8]">
                        {getEmotionIcon(i, true)}
                      </div>
                    ) : (
                      getEmotionIcon(i, false)
                    )}
                  </div>
                  <div
                    className={`w-full h-2.5 md:h-3 rounded-full transition-all duration-500 ${
                      i < successfulReps
                        ? "bg-[#5BA3E8] shadow-lg shadow-[#5BA3E8]/30"
                        : "bg-muted border-2 border-muted-foreground/20"
                    }`}
                  >
                    {i < successfulReps && (
                      <div className="flex items-center justify-center h-full">
                        <Check className="w-2.5 md:w-3 h-2.5 md:h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Error handling for microphone permissions */}
        {permissionError && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              <strong>Microphone Error:</strong> {permissionError}
            </p>
            <p className="text-xs text-red-500 dark:text-red-400 mt-1">
              Mobile users: Check browser settings or try using HTTPS
            </p>
          </div>
        )}

        {/* Control buttons */}
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <Button
            size="lg"
            onClick={buttonState.onClick}
            disabled={buttonState.disabled}
            className={`flex-1 md:w-40 h-12 md:h-14 text-base md:text-lg font-semibold transition-all duration-150 ${
              buttonPressed ? "scale-95" : "scale-100 hover:scale-105"
            } ${buttonState.className}`}
          >
            {buttonState.icon}
            {buttonState.text}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleNextPhrase}
            disabled={appState === "recording" || appState === "processing"}
            className={`flex-1 md:w-40 h-12 md:h-14 text-base md:text-lg font-semibold border-2 border-[#5BA3E8] text-[#5BA3E8] hover:bg-[#5BA3E8]/10 bg-transparent transition-all duration-150 ${
              buttonPressed ? "scale-95" : "scale-100 hover:scale-105"
            }`}
          >
            <SkipForward className="w-4 md:w-5 h-4 md:h-5 mr-2" />
            {showCelebration ? "Next" : "Skip"}
          </Button>
        </div>

        {/* SIMPLE SUCCESS/FAILURE MESSAGE - Below buttons */}
        {lastResult && (
          <div
            className={`p-4 rounded-xl border-2 ${
              lastResult.success
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
            }`}
          >
            <div className="text-center space-y-2">
              {/* <div className="text-2xl">{lastResult.success ? "🎉" : "💪"}</div>
              <h3
                className={`font-bold ${
                  lastResult.success
                    ? "text-green-600 dark:text-green-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                {lastResult.success ? "Success!" : "Keep Practicing!"}
              </h3> */}
              <p
                className={`${
                  lastResult.success
                    ? "text-green-700 dark:text-green-300"
                    : "text-yellow-700 dark:text-yellow-300"
                }`}
              >
                {lastResult.message}
              </p>
              {lastResult.transcription && (
                <p className="text-sm text-muted-foreground italic">
                  You said: &quot;{lastResult.transcription}&quot;
                </p>
              )}
            </div>
          </div>
        )}

        {/* Celebration display */}
        {showCelebration && (
          <div className="p-4 md:p-6 bg-[#5BA3E8]/10 rounded-xl border-2 border-[#5BA3E8] text-center space-y-2 animate-in fade-in slide-in-from-bottom-4">
            <p className="text-xl md:text-2xl font-bold text-[#5BA3E8]">
              🎉 Phrase Mastered!
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              You&apos;ve successfully repeated this phrase {requiredReps}{" "}
              times. Ready for the next one?
            </p>
          </div>
        )}
      </Card>

      {/* Footer instruction */}
      <p className="text-center text-xs md:text-sm text-white/80 px-4">
        Repeat the phrase successfully {requiredReps} times to move to the next
        one
      </p>
    </div>
  );
}
