"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import Image from "next/image"

const phrases = [
  { text: "Bonjour, comment allez-vous?", difficulty: "easy", translation: "Hello, how are you?" },
  { text: "Je voudrais un café, s'il vous plaît", difficulty: "easy", translation: "I would like a coffee, please" },
  { text: "Où se trouve la gare?", difficulty: "easy", translation: "Where is the train station?" },
  { text: "Pourriez-vous répéter, s'il vous plaît?", difficulty: "medium", translation: "Could you repeat, please?" },
  { text: "Je ne comprends pas très bien", difficulty: "medium", translation: "I don't understand very well" },
  { text: "Quelle est votre profession?", difficulty: "medium", translation: "What is your profession?" },
  {
    text: "L'architecture de cette cathédrale est magnifique",
    difficulty: "hard",
    translation: "The architecture of this cathedral is magnificent",
  },
  {
    text: "Je m'intéresse beaucoup à la philosophie française",
    difficulty: "hard",
    translation: "I am very interested in French philosophy",
  },
]

export default function PronunciationPractice() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [successfulReps, setSuccessfulReps] = useState(0)
  const [requiredReps] = useState(5)
  const [isRecording, setIsRecording] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [result, setResult] = useState<{
    transcription: string
    similarity: number
    isAcceptable: boolean
    suggestion: string
  } | null>(null)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const currentPhrase = phrases[currentPhraseIndex]

  const handlePlayAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(currentPhrase.text)
      utterance.lang = "fr-FR"
      utterance.rate = 0.9

      utterance.onstart = () => setIsPlayingAudio(true)
      utterance.onend = () => setIsPlayingAudio(false)
      utterance.onerror = () => setIsPlayingAudio(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  const handleNextPhrase = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
    setShowCelebration(false)
    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
    setSuccessfulReps(0)
    setResult(null)
    setShowTranslation(false)
    setIsPlayingAudio(false)
  }

  const handleRecord = () => {
    setIsRecording(!isRecording)
    if (isRecording) {
      setTimeout(() => {
        const similarity = Math.random() * 100
        const isAcceptable = similarity > 70

        setResult({
          transcription: currentPhrase.text,
          similarity,
          isAcceptable,
          suggestion: similarity > 90 ? "Excellent!" : similarity > 70 ? "Good job!" : "Keep practicing!",
        })
        setAttempts((prev) => prev + 1)

        if (isAcceptable) {
          setScore((prev) => prev + 1)
          const newSuccessfulReps = successfulReps + 1
          setSuccessfulReps(newSuccessfulReps)

          if (newSuccessfulReps >= requiredReps) {
            setShowCelebration(true)
          }
        }
      }, 1000)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getEmotionIcon = (index: number, isCompleted: boolean) => {
    if (!isCompleted) {
      return <Circle className="w-6 h-6 text-muted-foreground/40" />
    }

    switch (index) {
      case 0:
        return <Smile className="w-6 h-6 text-primary" />
      case 1:
        return <Laugh className="w-6 h-6 text-primary" />
      case 2:
        return <Star className="w-6 h-6 text-primary" />
      case 3:
        return <Trophy className="w-6 h-6 text-primary" />
      case 4:
        return <PartyPopper className="w-6 h-6 text-primary" />
      default:
        return <Check className="w-6 h-6 text-primary" />
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
      <div className="flex items-center justify-center gap-3">
        <Image src="/app-icon.png" alt="Répéter" width={48} height={48} className="rounded-xl shadow-lg" />
        <h1 className="text-4xl md:text-5xl font-bold text-white">Répéter</h1>
      </div>

      <Card className="p-4 md:p-6 shadow-xl border-0">
        <div className="flex items-center justify-around gap-2 md:gap-4">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-[#5BA3E8]">{score}</p>
            <p className="text-xs md:text-sm text-muted-foreground">Score</p>
          </div>
          <div className="h-10 md:h-12 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-foreground">{attempts}</p>
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

      <Card className="p-4 md:p-8 shadow-xl border-0 space-y-4 md:space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-lg font-semibold text-foreground">
              Current Phrase {currentPhraseIndex + 1}/{phrases.length}
            </h2>
            <Badge className={getDifficultyColor(currentPhrase.difficulty)}>{currentPhrase.difficulty}</Badge>
          </div>

          <div className="space-y-3">
            <div className="p-4 md:p-6 bg-[#5BA3E8]/10 rounded-xl border-2 border-[#5BA3E8]/30 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayAudio}
                disabled={isPlayingAudio}
                className="absolute top-2 left-2 h-8 w-8 rounded-full hover:bg-[#5BA3E8]/10"
                title="Listen to pronunciation"
              >
                <Volume2 className={`w-4 h-4 text-[#5BA3E8] ${isPlayingAudio ? "animate-pulse" : ""}`} />
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

            {showTranslation && (
              <div className="p-3 md:p-4 bg-muted/50 rounded-xl border-2 border-muted-foreground/20 animate-in fade-in slide-in-from-top-2">
                <p className="text-base md:text-lg text-muted-foreground text-center italic">
                  {currentPhrase.translation}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">Progress</span>
              <span className="font-bold text-[#5BA3E8]">
                {successfulReps} / {requiredReps}
              </span>
            </div>
            <div className="flex gap-1.5 md:gap-2">
              {Array.from({ length: requiredReps }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 md:gap-2">
                  <div className="transition-all duration-500 transform hover:scale-110">
                    {i < successfulReps ? (
                      <div className="text-[#5BA3E8]">{getEmotionIcon(i, true)}</div>
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

        <div className="flex items-center justify-center gap-3 md:gap-4">
          <Button
            size="lg"
            onClick={handleRecord}
            disabled={showCelebration}
            className={`flex-1 md:w-40 h-12 md:h-14 text-base md:text-lg font-semibold transition-all ${
              isRecording ? "bg-destructive hover:bg-destructive/90" : "bg-[#5BA3E8] hover:bg-[#5BA3E8]/90 text-white"
            }`}
          >
            {isRecording ? (
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
            disabled={isRecording}
            className="flex-1 md:w-40 h-12 md:h-14 text-base md:text-lg font-semibold border-2 border-[#5BA3E8] text-[#5BA3E8] hover:bg-[#5BA3E8]/10 bg-transparent"
          >
            <SkipForward className="w-4 md:w-5 h-4 md:h-5 mr-2" />
            {showCelebration ? "Next" : "Skip"}
          </Button>
        </div>

        {showCelebration && (
          <div className="p-4 md:p-6 bg-[#5BA3E8]/10 rounded-xl border-2 border-[#5BA3E8] text-center space-y-2 animate-in fade-in slide-in-from-bottom-4">
            <p className="text-xl md:text-2xl font-bold text-[#5BA3E8]">🎉 Phrase Mastered!</p>
            <p className="text-sm md:text-base text-muted-foreground">
              You've successfully repeated this phrase {requiredReps} times. Ready for the next one?
            </p>
          </div>
        )}

        {result && !showCelebration && (
          <div className="space-y-4 pt-4 border-t-2">
            <div className="space-y-2">
              <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Your Pronunciation
              </h3>
              <p className="text-base md:text-lg text-foreground p-3 md:p-4 bg-muted rounded-xl">
                {result.transcription}
              </p>
            </div>

            <div className="flex items-center justify-between p-3 md:p-4 bg-[#5BA3E8]/10 rounded-xl border-2 border-[#5BA3E8]/30">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Similarity Score</p>
                <p className="text-xl md:text-2xl font-bold text-[#5BA3E8]">{Math.round(result.similarity)}%</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-base md:text-lg font-semibold ${result.isAcceptable ? "text-green-600" : "text-yellow-600"}`}
                >
                  {result.suggestion}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      <p className="text-center text-xs md:text-sm text-white/80 px-4">
        Repeat the phrase successfully {requiredReps} times to move to the next one
      </p>
    </div>
  )
}
