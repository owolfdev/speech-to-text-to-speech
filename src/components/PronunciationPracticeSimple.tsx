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
  ChevronLeft,
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
  Loader2,
  Sparkles,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import {
  getCachedPhrases,
  getAvailablePhraseSets,
  invalidatePhraseCache,
  type FrenchPhrase,
} from "@/lib/phrases";
import { getPronunciationFeedback } from "@/lib/text-comparison";
import TTSAudioPlayer from "@/components/TTSAudioPlayer";
import RecordingStatus from "@/components/RecordingStatus";
import PhraseGenerator from "@/components/PhraseGenerator";
import {
  saveGeneratedPhrases,
  deleteLocalPhraseSet,
  getLocalPhraseSetInfo,
} from "@/lib/local-phrases";

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

  // Category filter state (hidden for now)
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  // Phrase set filter state
  const [phraseSetFilter, setPhraseSetFilter] = useState<string>("all");
  const [showPhraseSetMenu, setShowPhraseSetMenu] = useState(false);
  const [availablePhraseSets, setAvailablePhraseSets] = useState<string[]>([]);

  // Loading state
  const [isLoadingPhrases, setIsLoadingPhrases] = useState(true);
  const [isLoadingPhraseSets, setIsLoadingPhraseSets] = useState(false);

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

  // Phrase generator state
  const [showPhraseGenerator, setShowPhraseGenerator] = useState(false);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    phraseSetId: string;
    phraseSetName: string;
  }>({ show: false, phraseSetId: "", phraseSetName: "" });

  // Button animation states
  const [recordButtonPressed, setRecordButtonPressed] = useState(false);
  const [backButtonPressed, setBackButtonPressed] = useState(false);
  const [nextButtonPressed, setNextButtonPressed] = useState(false);

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

  // Load filter settings and phrase from localStorage on mount
  useEffect(() => {
    const savedDifficulty = localStorage.getItem(
      "pronunciation-difficulty-filter"
    );
    const savedCategory = localStorage.getItem("pronunciation-category-filter");
    const savedPhraseSet = localStorage.getItem(
      "pronunciation-phrase-set-filter"
    );
    const savedPhraseId = localStorage.getItem(
      "pronunciation-current-phrase-id"
    );
    const savedPhraseIndex = localStorage.getItem(
      "pronunciation-current-phrase-index"
    );

    if (
      savedDifficulty &&
      ["all", "beginner", "intermediate", "advanced"].includes(savedDifficulty)
    ) {
      setDifficultyFilter(
        savedDifficulty as "all" | "beginner" | "intermediate" | "advanced"
      );
    }

    if (savedCategory) {
      setCategoryFilter(savedCategory);
    }

    if (savedPhraseSet) {
      setPhraseSetFilter(savedPhraseSet);
    }

    // Store the saved phrase info to restore after phrases are loaded
    if (savedPhraseId && savedPhraseIndex) {
      setCurrentPhraseIndex(parseInt(savedPhraseIndex, 10));
      // We'll restore the phrase after phrases are loaded
    }
  }, []);

  // Save difficulty filter to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("pronunciation-difficulty-filter", difficultyFilter);
  }, [difficultyFilter]);

  // Save category filter to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("pronunciation-category-filter", categoryFilter);
  }, [categoryFilter]);

  // Save phrase set filter to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("pronunciation-phrase-set-filter", phraseSetFilter);
  }, [phraseSetFilter]);

  // Save current phrase to localStorage when it changes
  useEffect(() => {
    if (currentPhrase) {
      localStorage.setItem("pronunciation-current-phrase-id", currentPhrase.id);
      localStorage.setItem(
        "pronunciation-current-phrase-index",
        currentPhraseIndex.toString()
      );
    }
  }, [currentPhrase, currentPhraseIndex]);

  // Load all phrases on component mount
  useEffect(() => {
    const loadAllPhrases = async () => {
      try {
        setIsLoadingPhrases(true);
        const phrases = await getCachedPhrases();
        setAllPhrases(phrases);
      } catch (error) {
        console.error("Error loading all phrases:", error);
      } finally {
        setIsLoadingPhrases(false);
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

        // Apply category filter (hidden for now)
        if (categoryFilter !== "all") {
          phrases = phrases.filter((p) => p.category === categoryFilter);
        }

        // Apply phrase set filter
        if (phraseSetFilter !== "all") {
          phrases = phrases.filter((p) => p.phrase_set === phraseSetFilter);
        }

        setFilteredPhrases(phrases);
        setTotalPhraseCount(phrases.length); // Set total count to filtered phrases count

        if (phrases.length > 0) {
          // Check for saved phrase from localStorage first
          const savedPhraseId = localStorage.getItem(
            "pronunciation-current-phrase-id"
          );
          const savedPhraseIndex = localStorage.getItem(
            "pronunciation-current-phrase-index"
          );

          let phraseToRestore = null;
          let phraseIndex = 0;

          if (savedPhraseId && phrases.some((p) => p.id === savedPhraseId)) {
            // Saved phrase is still in filtered set
            phraseIndex = phrases.findIndex((p) => p.id === savedPhraseId);
            phraseToRestore = phrases[phraseIndex];
          } else if (
            previousPhraseRef.current &&
            phrases.some((p) => p.id === previousPhraseRef.current?.id)
          ) {
            // Fall back to previous phrase if saved phrase not found
            phraseIndex = phrases.findIndex(
              (p) => p.id === previousPhraseRef.current?.id
            );
            phraseToRestore = phrases[phraseIndex];
          }

          if (phraseToRestore) {
            setCurrentFilteredIndex(phraseIndex);
            setCurrentPhrase(phraseToRestore);
            setCurrentPhraseIndex(phraseIndex + 1);
          } else {
            // No saved or previous phrase found, start with first phrase
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
  }, [difficultyFilter, categoryFilter, phraseSetFilter, allPhrases]);

  // Update ref when current phrase changes
  useEffect(() => {
    previousPhraseRef.current = currentPhrase;
  }, [currentPhrase]);

  // Load available phrase sets
  useEffect(() => {
    const loadPhraseSets = async () => {
      try {
        setIsLoadingPhraseSets(true);
        const phraseSets = await getAvailablePhraseSets();
        setAvailablePhraseSets(phraseSets);
      } catch (error) {
        console.error("Error loading phrase sets:", error);
      } finally {
        setIsLoadingPhraseSets(false);
      }
    };

    if (allPhrases.length > 0) {
      loadPhraseSets();
    }
  }, [allPhrases]);

  // Close filter menus when clicking outside
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
      if (showPhraseSetMenu) {
        const target = event.target as Element;
        if (!target.closest("[data-phrase-set-menu]")) {
          setShowPhraseSetMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDifficultyMenu, showCategoryMenu, showPhraseSetMenu]);

  // Get count for each difficulty level (respects current filters)
  const getDifficultyCount = (difficulty: string) => {
    let phrases = allPhrases;

    // Apply current filters except difficulty
    if (phraseSetFilter !== "all") {
      phrases = phrases.filter((p) => p.phrase_set === phraseSetFilter);
    }
    if (categoryFilter !== "all") {
      phrases = phrases.filter((p) => p.category === categoryFilter);
    }

    if (difficulty === "all") {
      return phrases.length;
    }
    return phrases.filter((p) => p.difficulty === difficulty).length;
  };

  // Get count for each category (respects current filters)
  const getCategoryCount = (category: string) => {
    let phrases = allPhrases;

    // Apply current filters except category
    if (difficultyFilter !== "all") {
      phrases = phrases.filter((p) => p.difficulty === difficultyFilter);
    }
    if (phraseSetFilter !== "all") {
      phrases = phrases.filter((p) => p.phrase_set === phraseSetFilter);
    }

    if (category === "all") {
      return phrases.length;
    }
    return phrases.filter((p) => p.category === category).length;
  };

  // Get count for each phrase set (respects current filters)
  const getPhraseSetCount = (phraseSet: string) => {
    let phrases = allPhrases;

    // Apply current filters except phrase set
    if (difficultyFilter !== "all") {
      phrases = phrases.filter((p) => p.difficulty === difficultyFilter);
    }
    if (categoryFilter !== "all") {
      phrases = phrases.filter((p) => p.category === categoryFilter);
    }

    if (phraseSet === "all") {
      return phrases.length;
    }
    return phrases.filter((p) => p.phrase_set === phraseSet).length;
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
    handleNextButtonPress(); // Trigger animation

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

  // Function to move to previous phrase
  const moveToPreviousPhrase = () => {
    handleBackButtonPress(); // Trigger animation

    setShowCelebration(false);
    setLastResult(null);
    setSuccessfulReps(0);
    setShowTranslation(false);

    // Move to previous phrase in filtered list
    const prevIndex =
      currentFilteredIndex === 0
        ? filteredPhrases.length - 1
        : currentFilteredIndex - 1;
    setCurrentFilteredIndex(prevIndex);
    setCurrentPhraseIndex(prevIndex + 1);
    setCurrentPhrase(filteredPhrases[prevIndex]);

    resetRecording();
  };

  // Button press animation handlers
  const handleRecordButtonPress = () => {
    setRecordButtonPressed(true);
    setTimeout(() => setRecordButtonPressed(false), 150);
  };

  const handleBackButtonPress = () => {
    setBackButtonPressed(true);
    setTimeout(() => setBackButtonPressed(false), 150);
  };

  const handleNextButtonPress = () => {
    setNextButtonPressed(true);
    setTimeout(() => setNextButtonPressed(false), 150);
  };

  // SIMPLE RECORDING START
  const handleStartRecording = async (): Promise<void> => {
    try {
      console.log("🎤 Starting recording...");

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

  // Handle phrase generation
  const handlePhrasesGenerated = useCallback(
    async (phrases: FrenchPhrase[], phraseSet: string) => {
      try {
        // Save to local storage
        saveGeneratedPhrases(
          phrases,
          phraseSet,
          phraseSet.replace("generated-", "").replace(/-/g, " ")
        );

        // Invalidate cache to force reload with new phrases
        invalidatePhraseCache();

        // Refresh phrase sets and phrases
        const updatedPhraseSets = await getAvailablePhraseSets();
        setAvailablePhraseSets(updatedPhraseSets);

        // Reload all phrases to include the new ones (using cached version to get local phrases)
        const allPhrases = await getCachedPhrases();
        setAllPhrases(allPhrases);

        // Switch to the new phrase set
        setPhraseSetFilter(phraseSet);

        // Close the generator
        setShowPhraseGenerator(false);

        // Show success message
        setLastResult({
          success: true,
          message: `AI generated ${phrases.length} phrases about "${phraseSet
            .replace("generated-", "")
            .replace(/-/g, " ")}"!`,
        });
      } catch (error) {
        console.error("Error handling generated phrases:", error);
        setLastResult({
          success: false,
          message: "Failed to save generated phrases. Please try again.",
        });
      }
    },
    []
  );

  // Handle phrase set deletion
  const handleDeletePhraseSet = useCallback(
    async (phraseSetId: string) => {
      try {
        // Delete from local storage
        deleteLocalPhraseSet(phraseSetId);

        // Invalidate cache to force reload
        invalidatePhraseCache();

        // Refresh phrase sets and phrases
        const updatedPhraseSets = await getAvailablePhraseSets();
        setAvailablePhraseSets(updatedPhraseSets);

        const allPhrases = await getCachedPhrases();
        setAllPhrases(allPhrases);

        // If we were viewing the deleted set, switch to "All Sets"
        if (phraseSetFilter === phraseSetId) {
          setPhraseSetFilter("all");
        }

        // Close delete confirmation
        setDeleteConfirm({ show: false, phraseSetId: "", phraseSetName: "" });

        // Show success message
        setLastResult({
          success: true,
          message: "Phrase set deleted successfully!",
        });
      } catch (error) {
        console.error("Error deleting phrase set:", error);
        setLastResult({
          success: false,
          message: "Failed to delete phrase set. Please try again.",
        });
      }
    },
    [phraseSetFilter]
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
          onClick: () => {
            handleRecordButtonPress();
            handleStartRecording();
          },
          className: "bg-[#5BA3E8] hover:bg-[#5BA3E8]/90 text-white",
        };
      case "recording":
        return {
          text: "Stop Recording",
          icon: <MicOff className="w-4 md:w-5 h-4 md:h-5 mr-2" />,
          disabled: false,
          onClick: () => {
            handleRecordButtonPress();
            handleStopRecording();
          },
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

  // Show loading state when we're loading phrases or haven't loaded any data yet
  if (isLoadingPhrases || allPhrases.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
        {/* Header with animated app icon */}
        <div className="flex items-center justify-center gap-3">
          <div className="relative">
            <Image
              src="/app-icon.png"
              alt="Répéter"
              width={48}
              height={48}
              className="rounded-xl animate-pulse"
            />
            <div className="absolute inset-0 rounded-xl bg-[#5BA3E8]/20 animate-ping"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white animate-pulse">
            Répéter
          </h1>
        </div>

        {/* Skeleton cards that match the actual layout */}
        <div className="space-y-4 md:space-y-6">
          {/* Stats skeleton */}
          <Card className="p-4 md:p-6 shadow-xl border-0">
            <div className="flex items-center justify-center gap-2 text-[#5BA3E8] mb-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">Loading phrases...</span>
            </div>
            <div className="flex items-center justify-around gap-2 md:gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
              </div>
              <div className="h-10 md:h-12 w-px bg-gray-200 dark:bg-gray-700"></div>
              <div className="text-center space-y-2">
                <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
              </div>
              <div className="h-10 md:h-12 w-px bg-gray-200 dark:bg-gray-700"></div>
              <div className="text-center space-y-2">
                <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
              </div>
            </div>
          </Card>

          {/* Main practice card skeleton */}
          <Card className="p-4 md:p-8 shadow-xl border-0 space-y-4 md:space-y-6">
            {/* Filter skeleton */}
            <div className="space-y-4">
              <div className="w-full">
                <div className="flex flex-row gap-2 w-full">
                  <div className="relative flex-1">
                    <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                  <div className="relative flex-1">
                    <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phrase display skeleton */}
            <div className="space-y-3">
              <div className="p-4 md:p-6 bg-[#5BA3E8]/10 rounded-xl border-2 border-[#5BA3E8]/30">
                <div className="space-y-4">
                  <div className="w-3/4 h-8 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
                  <div className="w-1/2 h-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>

                  {/* Button controls skeleton */}
                  <div className="flex justify-between items-center -mx-2 -mb-2">
                    <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recording controls skeleton */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="w-20 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
              <div className="w-full max-w-md h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </Card>
        </div>

        {/* Loading tips */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> Make sure you have a good internet
            connection
          </p>
          <p className="text-xs text-muted-foreground">
            Loading phrase sets and difficulty levels...
          </p>
        </div>
      </div>
    );
  }

  const buttonState = getButtonState();

  return (
    <div className="max-w-2xl mx-auto space-y-3 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
          <CardContent className="space-y-6">
            <div className="space-y-4">
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

      {/* Stats card with logo - compact on mobile */}
      <Card className="p-3 md:p-6 shadow-xl border-0">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Logo */}
          <Image
            src="/app-icon.png"
            alt="Répéter"
            width={32}
            height={32}
            className="rounded-lg md:rounded-xl md:w-12 md:h-12 flex-shrink-0"
          />

          {/* Stats */}
          <div className="flex items-center justify-around flex-1 gap-1 md:gap-4">
            <div className="text-center">
              <p className="text-xl md:text-3xl font-bold text-[#5BA3E8]">
                {score}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">Score</p>
            </div>
            <div className="h-8 md:h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-xl md:text-3xl font-bold text-foreground">
                {attempts}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Attempts
              </p>
            </div>
            <div className="h-8 md:h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-xl md:text-3xl font-bold text-foreground">
                {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Accuracy
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Main practice card */}
      <Card className="p-4 md:p-8 shadow-xl border-0 space-y-6 md:space-y-8">
        <div className="space-y-6">
          <div className="w-full">
            {/* Mobile Layout: Stacked */}
            <div className="flex flex-col gap-2 md:hidden">
              {/* Generate Phrases Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPhraseGenerator(true)}
                className="w-full flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-300 h-9"
                title="Generate custom French phrases with AI for any topic you want to practice"
              >
                <Sparkles className="h-4 w-4" />
                <span>Generate Phrases</span>
              </Button>

              {/* Phrase Set Filter Menu */}
              <div className="relative w-full" data-phrase-set-menu>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPhraseSetMenu(!showPhraseSetMenu)}
                  className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-foreground border-[#10B981]/30"
                  disabled={isLoadingPhraseSets}
                >
                  {isLoadingPhraseSets ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Filter className="h-4 w-4" />
                  )}
                  <span>
                    {isLoadingPhraseSets
                      ? "Loading sets..."
                      : phraseSetFilter === "all"
                      ? "All Sets"
                      : (() => {
                          const isGenerated =
                            phraseSetFilter.startsWith("generated-");
                          const phraseSetInfo = isGenerated
                            ? getLocalPhraseSetInfo(phraseSetFilter)
                            : null;
                          return (
                            phraseSetInfo?.name ||
                            phraseSetFilter.charAt(0).toUpperCase() +
                              phraseSetFilter.slice(1).replace("-", " ")
                          );
                        })()}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {showPhraseSetMenu && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
                    <div className="py-1">
                      {/* All Sets option */}
                      <button
                        onClick={() => {
                          setPhraseSetFilter("all");
                          setShowPhraseSetMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${
                          phraseSetFilter === "all"
                            ? "bg-[#10B981]/10 text-[#10B981]"
                            : "text-gray-700"
                        }`}
                      >
                        <span>All Sets</span>
                        <span className="text-xs text-gray-500">
                          {getPhraseSetCount("all")}
                        </span>
                      </button>

                      {/* Available phrase sets */}
                      {availablePhraseSets.map((phraseSet) => {
                        const isGenerated = phraseSet.startsWith("generated-");
                        const phraseSetInfo = isGenerated
                          ? getLocalPhraseSetInfo(phraseSet)
                          : null;
                        const displayName =
                          phraseSetInfo?.name ||
                          phraseSet.charAt(0).toUpperCase() +
                            phraseSet.slice(1).replace("-", " ");

                        return (
                          <div
                            key={phraseSet}
                            className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 ${
                              phraseSetFilter === phraseSet
                                ? "bg-[#10B981]/10 text-[#10B981]"
                                : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={() => {
                                setPhraseSetFilter(phraseSet);
                                setShowPhraseSetMenu(false);
                              }}
                              className="flex-1 text-left flex items-center justify-between"
                            >
                              <span>{displayName}</span>
                              <span className="text-xs text-gray-500">
                                {getPhraseSetCount(phraseSet)}
                              </span>
                            </button>

                            {isGenerated && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirm({
                                    show: true,
                                    phraseSetId: phraseSet,
                                    phraseSetName: displayName,
                                  });
                                  setShowPhraseSetMenu(false);
                                }}
                                className="ml-2 p-1 hover:bg-red-100 rounded text-red-500 hover:text-red-700"
                                title={`Delete "${displayName}"`}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

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
            </div>

            {/* Desktop Layout: Horizontal */}
            <div className="hidden md:flex flex-row gap-2 w-full">
              {/* Generate Phrases Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPhraseGenerator(true)}
                className="w-10 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-300"
                title="Generate custom French phrases with AI for any topic you want to practice"
              >
                <Sparkles className="h-4 w-4" />
              </Button>

              {/* Phrase Set Filter Menu */}
              <div className="relative flex-1" data-phrase-set-menu>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPhraseSetMenu(!showPhraseSetMenu)}
                  className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-foreground border-[#10B981]/30 h-9"
                  disabled={isLoadingPhraseSets}
                >
                  {isLoadingPhraseSets ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Filter className="h-4 w-4" />
                  )}
                  <span>
                    {isLoadingPhraseSets
                      ? "Loading sets..."
                      : phraseSetFilter === "all"
                      ? "All Sets"
                      : (() => {
                          const isGenerated =
                            phraseSetFilter.startsWith("generated-");
                          const phraseSetInfo = isGenerated
                            ? getLocalPhraseSetInfo(phraseSetFilter)
                            : null;
                          return (
                            phraseSetInfo?.name ||
                            phraseSetFilter.charAt(0).toUpperCase() +
                              phraseSetFilter.slice(1).replace("-", " ")
                          );
                        })()}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {showPhraseSetMenu && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
                    <div className="py-1">
                      {/* All Sets option */}
                      <button
                        onClick={() => {
                          setPhraseSetFilter("all");
                          setShowPhraseSetMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${
                          phraseSetFilter === "all"
                            ? "bg-[#10B981]/10 text-[#10B981]"
                            : "text-gray-700"
                        }`}
                      >
                        <span>All Sets</span>
                        <span className="text-xs text-gray-500">
                          {getPhraseSetCount("all")}
                        </span>
                      </button>

                      {/* Available phrase sets */}
                      {availablePhraseSets.map((phraseSet) => {
                        const isGenerated = phraseSet.startsWith("generated-");
                        const phraseSetInfo = isGenerated
                          ? getLocalPhraseSetInfo(phraseSet)
                          : null;
                        const displayName =
                          phraseSetInfo?.name ||
                          phraseSet.charAt(0).toUpperCase() +
                            phraseSet.slice(1).replace("-", " ");

                        return (
                          <div
                            key={phraseSet}
                            className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 ${
                              phraseSetFilter === phraseSet
                                ? "bg-[#10B981]/10 text-[#10B981]"
                                : "text-gray-700"
                            }`}
                          >
                            <button
                              onClick={() => {
                                setPhraseSetFilter(phraseSet);
                                setShowPhraseSetMenu(false);
                              }}
                              className="flex-1 text-left flex items-center justify-between"
                            >
                              <span>{displayName}</span>
                              <span className="text-xs text-gray-500">
                                {getPhraseSetCount(phraseSet)}
                              </span>
                            </button>

                            {isGenerated && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirm({
                                    show: true,
                                    phraseSetId: phraseSet,
                                    phraseSetName: displayName,
                                  });
                                  setShowPhraseSetMenu(false);
                                }}
                                className="ml-2 p-1 hover:bg-red-100 rounded text-red-500 hover:text-red-700"
                                title={`Delete "${displayName}"`}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Difficulty Filter Menu */}
              <div className="relative flex-1" data-difficulty-menu>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDifficultyMenu(!showDifficultyMenu)}
                  className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-foreground border-[#5BA3E8]/30 h-9"
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
            </div>
          </div>

          <div className="space-y-4">
            {/* Phrase display with audio and translation controls */}
            <div className="p-4 md:p-6 bg-[#5BA3E8]/10 rounded-xl border-2 border-[#5BA3E8]/30">
              {currentPhrase ? (
                <>
                  <p className="text-2xl md:text-3xl font-medium text-black text-center text-balance mb-3 mt-4">
                    {currentPhrase.text}
                  </p>

                  {/* Button controls at bottom */}
                  <div className="flex justify-between items-center -mx-2 -mb-2">
                    <TTSAudioPlayer
                      text={currentPhrase.text}
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
                        variant="outline"
                        className={getDifficultyColor(currentPhrase.difficulty)}
                      >
                        {currentPhrase.difficulty}
                      </Badge>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowTranslation(!showTranslation)}
                      className="h-14 w-14 md:h-12 md:w-12 rounded-full hover:bg-[#5BA3E8]/10 [&>svg]:!w-6 [&>svg]:!h-6 [&>svg]:!max-w-none [&>svg]:!max-h-none"
                      title="Show translation"
                    >
                      <Info className="text-[#5BA3E8]" />
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

                {/* Usage Notes (Attribution) */}
                {currentPhrase.usage_notes && (
                  <div className="p-3 md:p-4 bg-green-50/80 rounded-xl border-2 border-green-200/30 animate-in fade-in slide-in-from-top-2">
                    <div>
                      <h4 className="text-lg font-semibold text-green-800 mb-2">
                        Context & Attribution:
                      </h4>
                      <p className="text-lg text-green-700">
                        {currentPhrase.usage_notes}
                      </p>
                    </div>
                  </div>
                )}

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
                recordButtonPressed ? "scale-95" : "scale-100 hover:scale-105"
              } ${buttonState.className}`}
            >
              {buttonState.icon}
              {buttonState.text}
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={moveToPreviousPhrase}
              disabled={appState === "recording" || appState === "processing"}
              className={`w-12 md:w-32 h-12 md:h-14 text-base md:text-lg font-semibold border-2 border-[#5BA3E8] text-[#5BA3E8] hover:bg-[#5BA3E8]/10 bg-transparent transition-all duration-150 ${
                backButtonPressed ? "scale-95" : "scale-100 hover:scale-105"
              }`}
            >
              <ChevronLeft className="w-4 md:w-5 h-4 md:h-5 md:mr-2" />
              <span className="hidden md:inline">Back</span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleNextPhrase}
              disabled={appState === "recording" || appState === "processing"}
              className={`w-12 md:w-32 h-12 md:h-14 text-base md:text-lg font-semibold border-2 border-[#5BA3E8] text-[#5BA3E8] hover:bg-[#5BA3E8]/10 bg-transparent transition-all duration-150 ${
                nextButtonPressed ? "scale-95" : "scale-100 hover:scale-105"
              }`}
            >
              <SkipForward className="w-4 md:w-5 h-4 md:h-5 md:mr-2" />
              <span className="hidden md:inline">
                {showCelebration ? "Next" : "Skip"}
              </span>
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
                  ? "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800 animate-in fade-in slide-in-from-bottom-4"
                  : lastResult?.success
                  ? "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800"
                  : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
              }`}
            >
              <div className="text-center space-y-2">
                {showCelebration ? (
                  <>
                    <p className="text-xl md:text-2xl font-bold text-violet-700 dark:text-violet-300">
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
                          ? "text-violet-700 dark:text-violet-300"
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

      {/* Footer with branding and instruction */}
      <div className="text-center space-y-2 px-4 pt-6">
        <h1 className="text-lg md:text-2xl font-bold text-white">Répéter</h1>
        <p className="text-xs md:text-sm text-white/80">
          Repeat the phrase successfully {requiredReps} times to move to the
          next one
        </p>
      </div>

      {/* Phrase Generator Modal */}
      {showPhraseGenerator && (
        <PhraseGenerator
          onPhrasesGenerated={handlePhrasesGenerated}
          onClose={() => setShowPhraseGenerator(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-5 w-5" />
                Delete Phrase Set
              </CardTitle>
              <CardDescription>
                This action cannot be undone. The phrase set and all its phrases
                will be permanently removed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm font-medium text-red-800">
                  Delete: &quot;{deleteConfirm.phraseSetName}&quot;
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() =>
                    handleDeletePhraseSet(deleteConfirm.phraseSetId)
                  }
                  variant="destructive"
                  className="flex-1"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setDeleteConfirm({
                      show: false,
                      phraseSetId: "",
                      phraseSetName: "",
                    })
                  }
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
