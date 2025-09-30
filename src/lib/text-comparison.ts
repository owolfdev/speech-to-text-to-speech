/**
 * Text comparison utilities for French pronunciation practice
 */

// Normalize text by removing accents and converting to lowercase
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .trim();
}

// Calculate similarity between two texts using Levenshtein distance
export function calculateSimilarity(text1: string, text2: string): number {
  const normalized1 = normalizeText(text1);
  const normalized2 = normalizeText(text2);

  if (normalized1 === normalized2) return 1.0;

  const distance = levenshteinDistance(normalized1, normalized2);
  const maxLength = Math.max(normalized1.length, normalized2.length);

  return maxLength === 0 ? 1.0 : 1 - distance / maxLength;
}

// Levenshtein distance algorithm
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

// Check if pronunciation is acceptable (above threshold)
export function isPronunciationAcceptable(
  spoken: string,
  target: string,
  threshold: number = 0.7
): boolean {
  return calculateSimilarity(spoken, target) >= threshold;
}

// Get detailed feedback on pronunciation
export function getPronunciationFeedback(
  spoken: string,
  target: string
): {
  similarity: number;
  isAcceptable: boolean;
  suggestions: string[];
} {
  const similarity = calculateSimilarity(spoken, target);
  const isAcceptable = similarity >= 0.7;

  const suggestions: string[] = [];

  if (similarity < 0.5) {
    suggestions.push("Try speaking more clearly and slowly");
  } else if (similarity < 0.7) {
    suggestions.push(
      "Good attempt! Focus on the pronunciation of individual words"
    );
  } else if (similarity < 0.9) {
    suggestions.push("Almost perfect! Just a few minor adjustments needed");
  } else {
    suggestions.push("Excellent pronunciation!");
  }

  return {
    similarity,
    isAcceptable,
    suggestions,
  };
}
