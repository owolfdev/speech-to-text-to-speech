"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, X } from "lucide-react";
import type { FrenchPhrase } from "@/lib/phrases";

interface PhraseGeneratorProps {
  onPhrasesGenerated: (phrases: FrenchPhrase[], phraseSet: string) => void;
  onClose: () => void;
}

export default function PhraseGenerator({
  onPhrasesGenerated,
  onClose,
}: PhraseGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [count, setCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a topic for phrase generation");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-phrases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          count: Math.max(1, Math.min(20, count)), // Limit between 1-20
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate phrases");
      }

      const data = await response.json();
      onPhrasesGenerated(data.phrases, data.phrase_set);

      // Reset form
      setPrompt("");
      setCount(10);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const examplePrompts = [
    "avoir verb",
    "restaurant vocabulary",
    "asking for directions",
    "shopping phrases",
    "weather expressions",
    "past tense verbs",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Generate Custom Phrases
            </CardTitle>
            <CardDescription>
              Create personalized French phrases using AI for any topic you want
              to practice
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt">
                What would you like to learn about?
              </Label>
              <Input
                id="prompt"
                placeholder="e.g., avoir verb, restaurant vocabulary, past tense..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="count">Number of phrases (1-20)</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="20"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 10)}
                disabled={isGenerating}
                className="w-20"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Label className="text-sm text-gray-600">Example topics:</Label>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example) => (
                  <Badge
                    key={example}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => setPrompt(example)}
                  >
                    {example}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Phrases
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>
              • Generated phrases will be saved to your browser&apos;s local
              storage
            </p>
            <p>
              • They&apos;ll appear in your phrase sets for immediate practice
            </p>
            <p>
              • You can delete generated sets anytime from the phrase set menu
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
