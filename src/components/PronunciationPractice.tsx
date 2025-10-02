"use client";

import { useState, useEffect } from "react";
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

interface PronunciationResult {
  transcription: string;
  similarity: number;
  isAcceptable: boolean;
  suggestion: string;
}

export default function PronunciationPractice() {
  // Core state from refined interface
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(1); // Start at 1 for display
  const [successfulReps, setSuccessfulReps] = useState(0);
  const [requiredReps] = useState(5);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [showAudioPlayback, setShowAudioPlayback] = useState(false);

  // Enhanced state for our existing functionality
  const [currentPhrase, setCurrentPhrase] = useState<FrenchPhrase | null>(null);
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Testing mode state
  const [showTestingMode, setShowTestingMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const [rawTranscription, setRawTranscription] = useState<string>("");

  // Prevent reprocessing the same audio blob
  const [processedAudioBlob, setProcessedAudioBlob] = useState<Blob | null>(
    null
  );

  // Track recording session to ensure we only process current session
  const [currentRecordingSession, setCurrentRecordingSession] = useState<
    string | null
  >(null);

  // Use our existing audio recorder hook
  const {
    isRecording: isAudioRecording,
    isPaused,
    recordingTime,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
    resetRecording,
    convertToBase64,
  } = useAudioRecorder();

  // Load initial phrase
  useEffect(() => {
    const loadPhrase = async () => {
      console.log("🚀 Loading initial phrase...");
      const newPhrase = await getNextPhrase();
      console.log("✅ Initial phrase loaded:", newPhrase.text);
      setCurrentPhrase(newPhrase);
    };
    loadPhrase();
  }, []);

  // Debug logging for state changes
  useEffect(() => {
    const buttonDisabled = showCelebration || isProcessing || showAudioPlayback;
    console.log("🔄 State update:", {
      isAudioRecording,
      audioBlob: audioBlob
        ? `${audioBlob.type} (${audioBlob.size} bytes)`
        : null,
      audioUrl: audioUrl ? "Available" : null,
      isProcessing,
      showAudioPlayback: showAudioPlayback ? "True" : "False",
      showCelebration: showCelebration ? "True" : "False",
      processedAudioBlob: processedAudioBlob ? "Set" : "Null",
      recordingSession: currentRecordingSession || "Null",
      buttonDisabled: buttonDisabled ? "DISABLED" : "ENABLED",
      result: result
        ? `${result.isAcceptable ? "Acceptable" : "Needs review"} (${Math.round(
            result.similarity * 100
          )}%)`
        : null,
    });
  }, [
    isAudioRecording,
    audioBlob,
    audioUrl,
    isProcessing,
    showAudioPlayback,
    processedAudioBlob,
    currentRecordingSession,
    showCelebration,
    result,
  ]);

  // Handle audio playback using native TTS
  const handlePlayAudio = () => {
    if (!currentPhrase) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(currentPhrase.text);
      utterance.lang = "fr-FR";
      utterance.rate = 0.9;

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle phrase navigation
  const handleNextPhrase = async () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setShowCelebration(false);
    setCurrentPhraseIndex((prev) => (prev % getTotalPhraseCount()) + 1);
    setSuccessfulReps(0);
    setResult(null);
    setShowTranslation(false);
    setIsPlayingAudio(false);
    setProcessedAudioBlob(null); // Reset processed blob for new phrase
    setCurrentRecordingSession(null); // Reset recording session

    // Load next phrase in sequence
    console.log("🔄 Loading next phrase...");
    try {
      const newPhrase = await getNextPhrase();
      console.log("✅ Next phrase loaded:", newPhrase.text);
      setCurrentPhrase(newPhrase);
    } catch (error) {
      console.error("❌ Error loading phrase:", error);
    }

    resetRecording();
  };

  // Handle recording start with our existing error handling
  const handleStartRecording = async (): Promise<void> => {
    try {
      console.log("🎤 Starting recording...");
      setPermissionError(null);
      setShowAudioPlayback(false); // Ensure audio playback is cleared
      setShowCelebration(false); // Ensure celebration is cleared
      setResult(null);
      setProcessedAudioBlob(null); // Reset processed blob for new recording
      setCurrentRecordingSession(Math.random().toString(36)); // Create unique session ID
      await startRecording();
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

  // Handle recording stop - automatically process audio
  const handleStopRecording = () => {
    console.log("🛑 Stopping recording...");
    stopRecording();
  };

  // Process audio when audioBlob becomes available
  useEffect(() => {
    const processAudio = async () => {
      if (!audioBlob || !currentPhrase || isAudioRecording || isProcessing)
        return;

      // Prevent reprocessing the same audio blob
      if (processedAudioBlob === audioBlob) {
        console.log("🚫 Skipping - already processed this audio blob");
        return;
      }

      // Only process if we're not currently recording and have a valid blob
      if (audioBlob.size === 0) {
        console.log("🚫 Skipping - empty audio blob");
        return;
      }

      // Only process if we have a current recording session
      if (!currentRecordingSession) {
        console.log("🚫 Skipping - no active recording session");
        return;
      }

      console.log(
        "🎵 Audio blob available, processing...",
        audioBlob.type,
        audioBlob.size
      );

      // Mark this blob as being processed
      setProcessedAudioBlob(audioBlob);
      setIsProcessing(true);

      // Clear the recording session to prevent reprocessing
      setCurrentRecordingSession(null);

      try {
        // Convert audio to base64
        const base64Audio = await convertToBase64();
        console.log(
          "📦 Audio converted to base64, length:",
          base64Audio.length
        );

        // Send to speech-to-text API with MIME type for mobile compatibility
        const response = await fetch("/api/speech-to-text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audioData: base64Audio,
            mimeType: audioBlob.type,
          }),
        });

        console.log("📤 API response status:", response.status);

        if (!response.ok) {
          throw new Error("Failed to process speech");
        }

        const { transcription } = await response.json();
        console.log("🗣️ Transcription received:", transcription);

        // Compare with target phrase using our existing algorithm
        const feedback = getPronunciationFeedback(
          transcription,
          currentPhrase.text
        );

        console.log("📊 Feedback:", feedback);

        const newResult: PronunciationResult = {
          transcription,
          similarity: feedback.similarity,
          isAcceptable: feedback.isAcceptable,
          suggestion: feedback.suggestions[0] || "Keep practicing!",
        };

        setResult(newResult);
        setAttempts((prev) => prev + 1);

        // If pronunciation is acceptable, automatically add progress
        if (feedback.isAcceptable) {
          setScore((prev) => prev + 1);
          const newSuccessfulReps = successfulReps + 1;
          setSuccessfulReps(newSuccessfulReps);

          if (newSuccessfulReps >= requiredReps) {
            setShowCelebration(true);
          }

          // Success feedback will be cleared when starting next recording
        } else {
          // If not acceptable, show audio playback for review
          setShowAudioPlayback(true);
        }
      } catch (error) {
        console.error("❌ Error processing speech:", error);
        // On error, show audio playback so user can try again
        setShowAudioPlayback(true);
      } finally {
        setIsProcessing(false);
      }
    };

    processAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    audioBlob,
    currentPhrase,
    isAudioRecording,
    isProcessing,
    convertToBase64,
    processedAudioBlob,
    currentRecordingSession,
  ]);

  // Handle re-recording from review mode
  const handleRerecord = () => {
    setShowAudioPlayback(false);
    setResult(null);
    setProcessedAudioBlob(null); // Reset processed blob for re-recording
    setCurrentRecordingSession(null); // Reset recording session
    resetRecording();
  };

  // Handle manual processing from review mode
  const handleProcessFromReview = async () => {
    setShowAudioPlayback(false);
    // The result is already set, just update the repetition count if acceptable
    if (result && result.isAcceptable) {
      setScore((prev) => prev + 1);
      const newSuccessfulReps = successfulReps + 1;
      setSuccessfulReps(newSuccessfulReps);

      if (newSuccessfulReps >= requiredReps) {
        setShowCelebration(true);
      }

      // Clear result after a short delay
      setTimeout(() => {
        setResult(null);
      }, 3000);
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

  // Testing mode functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setUploadedAudioUrl(url);
      setRawTranscription(""); // Clear previous transcription
    }
  };

  const handleTestUploadedFile = async (): Promise<void> => {
    if (!uploadedFile) return;

    setIsProcessing(true);
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
      setIsProcessing(false);
      console.log("🏁 Processing complete");
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
              <div className="flex gap-2">
                <Button
                  onClick={async () => {
                    console.log("🧪 Manual test - loading phrase...");
                    const testPhrase = await getNextPhrase();
                    console.log("🧪 Manual test result:", testPhrase.text);
                    setCurrentPhrase(testPhrase);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm"
                >
                  Test Phrase Load
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTestingMode(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardDescription>
              Upload an audio file (.ogg, .mp3, .wav, .webm, etc.) to test
              Google Speech-to-Text
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                  disabled={isProcessing}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? "Processing..." : "Test Speech-to-Text"}
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

        {/* Recording timer */}
        {isAudioRecording && (
          <div className="text-center">
            <div className="text-2xl font-mono text-[#5BA3E8]">
              {Math.floor(recordingTime / 60)}:
              {(recordingTime % 60).toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-muted-foreground">
              {isPaused ? "Recording paused" : "Recording..."}
            </div>
          </div>
        )}

        {/* Control buttons */}
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <Button
            size="lg"
            onClick={
              isAudioRecording ? handleStopRecording : handleStartRecording
            }
            disabled={showCelebration || isProcessing || showAudioPlayback}
            className={`flex-1 md:w-40 h-12 md:h-14 text-base md:text-lg font-semibold transition-all ${
              isAudioRecording
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-[#5BA3E8] hover:bg-[#5BA3E8]/90 text-white"
            }`}
          >
            {isProcessing ? (
              "Processing..."
            ) : isAudioRecording ? (
              <>
                <MicOff className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Mic className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Record
              </>
            )}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleNextPhrase}
            disabled={isAudioRecording || showAudioPlayback}
            className="flex-1 md:w-40 h-12 md:h-14 text-base md:text-lg font-semibold border-2 border-[#5BA3E8] text-[#5BA3E8] hover:bg-[#5BA3E8]/10 bg-transparent"
          >
            <SkipForward className="w-4 md:w-5 h-4 md:h-5 mr-2" />
            {showCelebration ? "Next" : "Skip"}
          </Button>
        </div>

        {/* Audio Playback Section - Only shown when pronunciation needs review */}
        {showAudioPlayback && audioUrl && result && !result.isAcceptable && (
          <div className="space-y-4 pt-4 border-t-2">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                🎧 Review Your Recording
              </h3>
              <div className="flex justify-center">
                <audio controls src={audioUrl} className="w-full max-w-md" />
              </div>
              <p className="text-sm text-muted-foreground">
                Listen to your recording and try to improve your pronunciation.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={handleProcessFromReview}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  ✅ Accept This Attempt
                </Button>
                <Button
                  onClick={handleRerecord}
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50"
                >
                  🔄 Record Again
                </Button>
              </div>
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

        {/* Results display */}
        {result && !showCelebration && !showAudioPlayback && (
          <div className="space-y-4 pt-4 border-t-2">
            {result.isAcceptable ? (
              // Success feedback - more prominent
              <div className="text-center space-y-4 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
                <div className="text-4xl">🎉</div>
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
                  Excellent Pronunciation!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  You&apos;ve earned a progress point!
                </p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="text-green-600 dark:text-green-400">
                    Similarity: {Math.round(result.similarity * 100)}%
                  </span>
                  <span className="text-green-600 dark:text-green-400">
                    Progress: {successfulReps + 1}/{requiredReps}
                  </span>
                </div>
              </div>
            ) : (
              // Needs improvement feedback
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Your Pronunciation
                  </h3>
                  <p className="text-base md:text-lg text-foreground p-3 md:p-4 bg-muted rounded-xl">
                    {result.transcription}
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 md:p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">
                      Similarity Score
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-yellow-600">
                      {Math.round(result.similarity * 100)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base md:text-lg font-semibold text-yellow-600">
                      {result.suggestion}
                    </p>
                  </div>
                </div>
              </div>
            )}
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
