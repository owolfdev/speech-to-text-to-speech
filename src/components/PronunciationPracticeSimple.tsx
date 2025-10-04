"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  TestTube,
  X,
  Filter,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { getAllPhrases, type FrenchPhrase } from "@/lib/phrases";
import { getPronunciationFeedback } from "@/lib/text-comparison";
import TTSAudioPlayer from "@/components/TTSAudioPlayer";
import RecordingStatus from "@/components/RecordingStatus";

// SIMPLE STATE MACHINE
type AppState = "idle" | "recording" | "processing";

export default function PronunciationPracticeSimple() {
  // Core state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(1); // Start at 1 for display
  const [totalPhraseCount, setTotalPhraseCount] = useState(0);
  const [successfulReps, setSuccessfulReps] = useState(0);
  const [requiredReps] = useState(5);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [currentPhrase, setCurrentPhrase] = useState<FrenchPhrase | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Difficulty filter state
  const [difficultyFilter, setDifficultyFilter] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");
  const [allPhrases, setAllPhrases] = useState<FrenchPhrase[]>([]);
  const [filteredPhrases, setFilteredPhrases] = useState<FrenchPhrase[]>([]);
  const [currentFilteredIndex, setCurrentFilteredIndex] = useState(0);
  const [showDifficultyMenu, setShowDifficultyMenu] = useState(false);

  // Category filter state
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

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

  // Ref to track previous phrase for filter changes
  const previousPhraseRef = useRef<FrenchPhrase | null>(null);

  // Use our existing audio recorder hook
  const {
    isRecording: isAudioRecording,
    recordingTime,
    maxRecordingTime,
    isNearLimit,
    isRequestingPermission,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
    calculateRecordingTime,
    validateAudioSize,
    preInitialize,
  } = useAudioRecorder();

  // Load all phrases on component mount
  useEffect(() => {
    const loadAllPhrases = async () => {
      try {
        const phrases = await getAllPhrases();
        setAllPhrases(phrases);
      } catch (error) {
        console.error("Error loading all phrases:", error);
      }
    };
    loadAllPhrases();

    // Pre-initialize audio recorder for faster recording start
    preInitialize();
  }, [preInitialize]);

  // Cleanup recording when component unmounts
  useEffect(() => {
    return () => {
      if (isAudioRecording) {
        console.log("🧹 Component unmounting, stopping recording...");
        stopRecording();
      }
    };
  }, [isAudioRecording, stopRecording]);

  // Load phrases based on difficulty and category filters
  useEffect(() => {
    const loadPhrases = async () => {
      try {
        let phrases: FrenchPhrase[] = allPhrases;

        // Apply difficulty filter
        if (difficultyFilter !== "all") {
          phrases = phrases.filter((p) => p.difficulty === difficultyFilter);
        }

        // Apply category filter
        if (categoryFilter !== "all") {
          phrases = phrases.filter((p) => p.category === categoryFilter);
        }

        setFilteredPhrases(phrases);
        setTotalPhraseCount(phrases.length); // Set total count to filtered phrases count

        if (phrases.length > 0) {
          // Check if previous phrase is still in the filtered set
          const previousPhrase = previousPhraseRef.current;
          if (
            previousPhrase &&
            phrases.some((p) => p.id === previousPhrase.id)
          ) {
            // Previous phrase is still in filtered set, find its new index
            const newIndex = phrases.findIndex(
              (p) => p.id === previousPhrase.id
            );
            setCurrentFilteredIndex(newIndex);
            setCurrentPhrase(phrases[newIndex]);
            setCurrentPhraseIndex(newIndex + 1);
          } else {
            // Previous phrase is not in filtered set, or there was no previous phrase
            setCurrentFilteredIndex(0);
            setCurrentPhrase(phrases[0]);
            setCurrentPhraseIndex(1);
          }
        } else {
          // No phrases match the filter, clear current phrase
          setCurrentPhrase(null);
          setCurrentFilteredIndex(0);
          setCurrentPhraseIndex(0);
        }
      } catch (error) {
        console.error("Error loading phrases:", error);
      }
    };

    if (allPhrases.length > 0) {
      loadPhrases();
    }
  }, [difficultyFilter, categoryFilter, allPhrases]);

  // Update ref when current phrase changes
  useEffect(() => {
    previousPhraseRef.current = currentPhrase;
  }, [currentPhrase]);

  // Close difficulty menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDifficultyMenu) {
        const target = event.target as Element;
        if (!target.closest("[data-difficulty-menu]")) {
          setShowDifficultyMenu(false);
        }
      }
      if (showCategoryMenu) {
        const target = event.target as Element;
        if (!target.closest("[data-category-menu]")) {
          setShowCategoryMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDifficultyMenu, showCategoryMenu]);

  // Get count for each difficulty level (always shows total count, not filtered count)
  const getDifficultyCount = (difficulty: string) => {
    if (difficulty === "all") {
      return allPhrases.length;
    }
    return allPhrases.filter((p) => p.difficulty === difficulty).length;
  };

  // Get count for each category (always shows total count, not filtered count)
  const getCategoryCount = (category: string) => {
    if (category === "all") {
      return allPhrases.length;
    }
    return allPhrases.filter((p) => p.category === category).length;
  };

  // Get unique categories from all phrases
  const getUniqueCategories = () => {
    const categories = allPhrases.reduce((acc, phrase) => {
      if (!acc.find((cat) => cat.value === phrase.category)) {
        acc.push({
          value: phrase.category,
          label:
            phrase.category.charAt(0).toUpperCase() +
            phrase.category.slice(1).replace("_", " "),
          count: getCategoryCount(phrase.category),
        });
      }
      return acc;
    }, [] as { value: string; label: string; count: number }[]);

    return [
      { value: "all", label: "All Categories", count: allPhrases.length },
      ...categories.sort((a, b) => a.label.localeCompare(b.label)),
    ];
  };

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

  // Handle audio playback events
  const handlePlayStart = () => {
    // Audio playback started
  };

  const handlePlayEnd = () => {
    // Audio playback ended
  };

  const handlePlayError = (error: string) => {
    console.error("TTS Error:", error);
    alert(`Audio playback failed: ${error}`);
  };

  // Handle phrase navigation
  const handleNextPhrase = () => {
    handleButtonPress(); // Trigger animation

    // Reset everything for new phrase
    setAppState("idle");
    setShowCelebration(false);
    setLastResult(null);
    setSuccessfulReps(0);
    setShowTranslation(false);

    // Move to next phrase in filtered list
    const nextIndex = (currentFilteredIndex + 1) % filteredPhrases.length;
    setCurrentFilteredIndex(nextIndex);
    setCurrentPhraseIndex(nextIndex + 1);
    setCurrentPhrase(filteredPhrases[nextIndex]);

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

      // Clear previous audio data when starting new recording
      resetRecording();

      // Calculate appropriate recording time based on current phrase
      const recordingTimeLimit = currentPhrase
        ? calculateRecordingTime(currentPhrase.text)
        : 30; // Default 30 seconds

      console.log(
        `⏱️ Recording time limit set to ${recordingTimeLimit} seconds`
      );

      // Start recording with timeout
      await startRecording(recordingTimeLimit, handleStopRecording);
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

      // Validate audio size before processing
      const validation = validateAudioSize(blob);
      if (!validation.isValid) {
        console.log("❌ Audio validation failed:", validation.error);
        setAppState("idle");
        setLastResult({
          success: false,
          message: validation.error || "Audio file is too large or too long.",
        });
        return;
      }

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

        // Clear audio data immediately after processing
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
    [
      currentPhrase,
      successfulReps,
      requiredReps,
      resetRecording,
      validateAudioSize,
    ]
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
          text: "Stop Recording",
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

  // Show loading state only when we haven't loaded any data yet
  if (allPhrases.length === 0) {
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
          <div className="w-full">
            <div className="flex flex-row gap-2 w-full">
              {/* Difficulty Filter Menu */}
              <div className="relative flex-1" data-difficulty-menu>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDifficultyMenu(!showDifficultyMenu)}
                  className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-foreground border-[#5BA3E8]/30"
                >
                  <Filter className="h-4 w-4" />
                  <span>
                    {difficultyFilter === "all"
                      ? "All Levels"
                      : difficultyFilter.charAt(0).toUpperCase() +
                        difficultyFilter.slice(1)}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {showDifficultyMenu && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      {[
                        {
                          value: "all",
                          label: "All Levels",
                          count: totalPhraseCount,
                        },
                        { value: "beginner", label: "Beginner", count: 0 },
                        {
                          value: "intermediate",
                          label: "Intermediate",
                          count: 0,
                        },
                        { value: "advanced", label: "Advanced", count: 0 },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setDifficultyFilter(
                              option.value as
                                | "all"
                                | "beginner"
                                | "intermediate"
                                | "advanced"
                            );
                            setShowDifficultyMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${
                            difficultyFilter === option.value
                              ? "bg-[#5BA3E8]/10 text-[#5BA3E8]"
                              : "text-gray-700"
                          }`}
                        >
                          <span>{option.label}</span>
                          <span className="text-xs text-gray-500">
                            {getDifficultyCount(option.value)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Category Filter Menu */}
              <div className="relative flex-1" data-category-menu>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                  className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-foreground border-[#10B981]/30"
                >
                  <Filter className="h-4 w-4" />
                  <span>
                    {categoryFilter === "all"
                      ? "All Categories"
                      : categoryFilter.charAt(0).toUpperCase() +
                        categoryFilter.slice(1).replace("_", " ")}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {showCategoryMenu && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
                    <div className="py-1">
                      {getUniqueCategories().map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setCategoryFilter(option.value);
                            setShowCategoryMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${
                            categoryFilter === option.value
                              ? "bg-[#10B981]/10 text-[#10B981]"
                              : "text-gray-700"
                          }`}
                        >
                          <span>{option.label}</span>
                          <span className="text-xs text-gray-500">
                            {option.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Phrase display with audio and translation controls */}
            <div className="p-4 md:p-6 bg-[#5BA3E8]/10 rounded-xl border-2 border-[#5BA3E8]/30">
              {currentPhrase ? (
                <>
                  <p className="text-2xl md:text-3xl font-medium text-black text-center text-balance mb-4 mt-2">
                    {currentPhrase.text}
                  </p>

                  {/* Button controls at bottom */}
                  <div className="flex justify-between items-center -mx-2 -mb-2">
                    <TTSAudioPlayer
                      text={currentPhrase.text}
                      className="[&>button]:!h-14 [&>button]:!w-14 md:[&>button]:!h-12 md:[&>button]:!w-12 [&>button>svg]:!w-6 [&>button>svg]:!h-6"
                      disabled={!currentPhrase}
                      onPlayStart={handlePlayStart}
                      onPlayEnd={handlePlayEnd}
                      onError={handlePlayError}
                    />

                    {/* Center section with phrase number and difficulty badge */}
                    <div className="flex items-center gap-6">
                      <span className="text-sm font-medium text-muted-foreground">
                        {currentPhraseIndex} of {totalPhraseCount}
                      </span>
                      <Badge
                        className={getDifficultyColor(currentPhrase.difficulty)}
                      >
                        {currentPhrase.difficulty}
                      </Badge>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowTranslation(!showTranslation)}
                      className="h-14 w-14 md:h-12 md:w-12 rounded-full hover:bg-[#5BA3E8]/10"
                      title="Show translation"
                    >
                      <Info className="w-7 h-7 md:w-6 md:h-6 text-[#5BA3E8]" />
                    </Button>
                  </div>
                </>
              ) : (
                /* No phrases found message */
                <div className="text-center py-8">
                  <p className="text-xl md:text-2xl font-medium text-muted-foreground/70">
                    No Phrases Found
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground/50 mt-2">
                    Try adjusting your filters to find phrases
                  </p>
                </div>
              )}
            </div>

            {/* Translation display */}
            {showTranslation && currentPhrase && (
              <div className="space-y-3">
                <div className="p-3 md:p-4 bg-muted/50 rounded-xl border-2 border-muted-foreground/20 animate-in fade-in slide-in-from-top-2">
                  <p className="text-xl md:text-2xl text-muted-foreground text-center italic">
                    {currentPhrase.english_translation}
                  </p>
                </div>

                {/* Grammar explanation */}
                {(currentPhrase.grammar_notes ||
                  currentPhrase.verb_conjugation) && (
                  <div className="p-3 md:p-4 bg-blue-50/80 rounded-xl border-2 border-blue-200/30 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                      {currentPhrase.grammar_notes && (
                        <div>
                          <h4 className="text-lg font-semibold text-blue-800 mb-2">
                            Grammar Notes:
                          </h4>
                          <p className="text-lg text-blue-700">
                            {currentPhrase.grammar_notes}
                          </p>
                        </div>
                      )}
                      {currentPhrase.verb_conjugation && (
                        <div>
                          <h4 className="text-lg font-semibold text-blue-800 mb-2">
                            Verb Conjugation:
                          </h4>
                          <p className="text-lg text-blue-700 font-mono">
                            {currentPhrase.verb_conjugation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress section with emotional progression - only show when there's a current phrase */}
          {currentPhrase && (
            <div className="space-y-3">
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
          )}
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

        {/* Control buttons - only show when there's a current phrase */}
        {currentPhrase && (
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
        )}

        {/* RECORDING STATUS - Show during recording/processing */}
        {currentPhrase &&
          (isAudioRecording ||
            appState === "processing" ||
            isRequestingPermission) && (
            <RecordingStatus
              isRecording={isAudioRecording}
              isProcessing={appState === "processing"}
              recordingTime={recordingTime}
              maxRecordingTime={maxRecordingTime}
              isNearLimit={isNearLimit}
              isRequestingPermission={isRequestingPermission}
            />
          )}

        {/* SUCCESS/FAILURE MESSAGES - Show when not recording/processing and there's a current phrase */}
        {currentPhrase &&
          !isAudioRecording &&
          appState !== "processing" &&
          (lastResult || showCelebration) && (
            <div
              className={`p-4 md:p-6 rounded-xl border-2 ${
                showCelebration
                  ? "bg-[#5BA3E8]/10 border-[#5BA3E8] animate-in fade-in slide-in-from-bottom-4"
                  : lastResult?.success
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
              }`}
            >
              <div className="text-center space-y-2">
                {showCelebration ? (
                  <>
                    <p className="text-xl md:text-2xl font-bold text-[#5BA3E8]">
                      🎉 Phrase Mastered!
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground">
                      You&apos;ve successfully repeated this phrase{" "}
                      {requiredReps} times. Ready for the next one?
                    </p>
                  </>
                ) : lastResult ? (
                  <>
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
                  </>
                ) : null}
              </div>
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
