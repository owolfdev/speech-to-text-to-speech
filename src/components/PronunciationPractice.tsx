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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import {
  frenchPhrases,
  getRandomPhrase,
  type FrenchPhrase,
} from "@/data/french-phrases";
import { getPronunciationFeedback } from "@/lib/text-comparison";

interface PronunciationResult {
  transcription: string;
  similarity: number;
  isAcceptable: boolean;
  suggestions: string[];
}

export default function PronunciationPractice() {
  const [currentPhrase, setCurrentPhrase] = useState<FrenchPhrase | null>(null);
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [difficulty, setDifficulty] = useState<
    "beginner" | "intermediate" | "advanced"
  >("beginner");

  const [permissionError, setPermissionError] = useState<string | null>(null);

  const {
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
    convertToBase64,
  } = useAudioRecorder();

  // Load a new phrase when component mounts or difficulty changes
  useEffect(() => {
    loadNewPhrase();
  }, [difficulty]);

  const loadNewPhrase = () => {
    const newPhrase = getRandomPhrase(difficulty);
    setCurrentPhrase(newPhrase);
    setResult(null);
    resetRecording();
  };

  const handleStartRecording = async () => {
    try {
      setPermissionError(null);
      await startRecording();
    } catch (error: any) {
      console.error("Failed to start recording:", error);
      const errorMessage = error.message || "Failed to access microphone";
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

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleSubmitRecording = async () => {
    if (!audioBlob || !currentPhrase) return;

    setIsProcessing(true);
    try {
      // Convert audio to base64
      const base64Audio = await convertToBase64();

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

      if (!response.ok) {
        throw new Error("Failed to process speech");
      }

      const { transcription } = await response.json();

      // Compare with target phrase
      const feedback = getPronunciationFeedback(
        transcription,
        currentPhrase.text
      );

      setResult({
        transcription,
        ...feedback,
      });

      setAttempts((prev) => prev + 1);

      // Update score if pronunciation is acceptable
      if (feedback.isAcceptable) {
        setScore((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error processing speech:", error);
      alert("Failed to process your speech. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "beginner":
        return "text-green-600";
      case "intermediate":
        return "text-yellow-600";
      case "advanced":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          French Pronunciation Practice
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Practice your French pronunciation with AI-powered feedback
        </p>
      </div>

      {/* Score and Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Your Progress</span>
            <div className="flex gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Score: {score}/{attempts}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Accuracy:{" "}
                {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
              </span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Difficulty Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Difficulty</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {(["beginner", "intermediate", "advanced"] as const).map((diff) => (
              <Button
                key={diff}
                variant={difficulty === diff ? "default" : "outline"}
                onClick={() => setDifficulty(diff)}
                className="capitalize"
              >
                {diff}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Phrase */}
      {currentPhrase && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Practice This Phrase</span>
              <span
                className={`text-sm font-medium ${getDifficultyColor(
                  currentPhrase.difficulty
                )}`}
              >
                {currentPhrase.difficulty.toUpperCase()}
              </span>
            </CardTitle>
            <CardDescription>{currentPhrase.english}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-center py-8 bg-slate-50 dark:bg-slate-800 rounded-lg">
              {currentPhrase.text}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recording Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Record Your Pronunciation</CardTitle>
          <CardDescription>
            Click record and speak the French phrase clearly
            {typeof window !== "undefined" &&
              window.location.protocol === "http:" && (
                <span className="block mt-2 text-yellow-600 dark:text-yellow-500">
                  ⚠️ Note: Mobile devices may require HTTPS for microphone
                  access
                </span>
              )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <div className="flex items-center justify-center gap-4">
            {!isRecording ? (
              <Button
                onClick={handleStartRecording}
                size="lg"
                className="bg-red-500 hover:bg-red-600"
              >
                🎤 Start Recording
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={isPaused ? resumeRecording : pauseRecording}
                  variant="outline"
                >
                  {isPaused ? "▶️ Resume" : "⏸️ Pause"}
                </Button>
                <Button
                  onClick={handleStopRecording}
                  variant="outline"
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  ⏹️ Stop
                </Button>
              </div>
            )}
          </div>

          {isRecording && (
            <div className="text-center">
              <div className="text-2xl font-mono">
                {formatTime(recordingTime)}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {isPaused ? "Recording paused" : "Recording..."}
              </div>
            </div>
          )}

          {audioBlob && !isRecording && (
            <div className="space-y-4">
              <div className="text-center">
                <audio
                  controls
                  src={audioUrl || undefined}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={handleSubmitRecording}
                  disabled={isProcessing}
                  size="lg"
                >
                  {isProcessing ? "Processing..." : "Submit for Review"}
                </Button>
                <Button onClick={resetRecording} variant="outline">
                  Record Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.isAcceptable ? "✅ Great Job!" : "❌ Try Again"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>What you said:</Label>
              <Input value={result.transcription} readOnly className="mt-1" />
            </div>

            <div>
              <Label>Target phrase:</Label>
              <Input
                value={currentPhrase?.text || ""}
                readOnly
                className="mt-1"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="font-medium">Similarity: </span>
                <span
                  className={`font-bold ${
                    result.similarity >= 0.8
                      ? "text-green-600"
                      : result.similarity >= 0.6
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {Math.round(result.similarity * 100)}%
                </span>
              </div>
            </div>

            {result.suggestions.length > 0 && (
              <div>
                <Label>Feedback:</Label>
                <ul className="mt-1 space-y-1">
                  {result.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="text-sm text-slate-600 dark:text-slate-400"
                    >
                      • {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={loadNewPhrase} className="flex-1">
                Next Phrase
              </Button>
              {result.isAcceptable && (
                <Button onClick={resetRecording} variant="outline">
                  Practice This Phrase Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
