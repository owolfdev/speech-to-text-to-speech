import { supabase } from "./supabase";

// Type definitions for the new database structure
export interface Category {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
}

export interface DifficultyLevel {
  id: string;
  name: "beginner" | "intermediate" | "advanced";
  level_order: number;
  description: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
}

export interface FrenchPhrase {
  id: string;
  text: string;
  english_translation: string;
  phonetic_guide: string | null;
  audio_url: string | null;
  usage_notes: string | null;
  grammar_notes: string | null;
  verb_conjugation: string | null;
  difficulty_score: number;
  frequency_score: number;
  phrase_set: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  difficulty: string;
  difficulty_level: number;
  difficulty_color: string | null;
  category: string;
  category_description: string | null;
  category_color: string | null;
}

// Legacy interface for backward compatibility
export interface LegacyFrenchPhrase {
  id: string;
  text: string;
  english: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
}

// Data access functions
export async function getAllPhrases(): Promise<FrenchPhrase[]> {
  const { data, error } = await supabase
    .from("language_app_phrases_with_details")
    .select("*")
    .eq("is_active", true)
    .order("difficulty_level", { ascending: true })
    .order("frequency_score", { ascending: false });

  if (error) {
    console.error("Error fetching phrases:", error);
    throw new Error("Failed to fetch phrases");
  }

  return data || [];
}

export async function getPhrasesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): Promise<FrenchPhrase[]> {
  const { data, error } = await supabase
    .from("language_app_phrases_with_details")
    .select("*")
    .eq("difficulty", difficulty)
    .eq("is_active", true)
    .order("frequency_score", { ascending: false });

  if (error) {
    console.error("Error fetching phrases by difficulty:", error);
    throw new Error("Failed to fetch phrases by difficulty");
  }

  return data || [];
}

export async function getPhrasesByCategory(
  category: string
): Promise<FrenchPhrase[]> {
  const { data, error } = await supabase
    .from("language_app_phrases_with_details")
    .select("*")
    .eq("category", category)
    .eq("is_active", true)
    .order("frequency_score", { ascending: false });

  if (error) {
    console.error("Error fetching phrases by category:", error);
    throw new Error("Failed to fetch phrases by category");
  }

  return data || [];
}

export async function getRandomPhrase(
  difficulty?: "beginner" | "intermediate" | "advanced",
  category?: string,
  phraseSet?: string
): Promise<FrenchPhrase> {
  const { data, error } = await supabase.rpc("language_app_get_random_phrase", {
    difficulty_filter: difficulty || null,
    category_filter: category || null,
    phrase_set_filter: phraseSet || null,
    limit_count: 1,
  });

  if (error) {
    console.error("Error fetching random phrase:", error);
    throw new Error("Failed to fetch random phrase");
  }

  if (!data || data.length === 0) {
    throw new Error("No phrases found");
  }

  return data[0];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("language_app_categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }

  return data || [];
}

export async function getDifficultyLevels(): Promise<DifficultyLevel[]> {
  const { data, error } = await supabase
    .from("language_app_difficulty_levels")
    .select("*")
    .order("level_order");

  if (error) {
    console.error("Error fetching difficulty levels:", error);
    throw new Error("Failed to fetch difficulty levels");
  }

  return data || [];
}

// New functions for phrase set filtering
export async function getPhrasesBySet(
  phraseSet: string
): Promise<FrenchPhrase[]> {
  const { data, error } = await supabase
    .from("language_app_phrases_with_details")
    .select("*")
    .eq("phrase_set", phraseSet)
    .eq("is_active", true)
    .order("difficulty_level", { ascending: true })
    .order("frequency_score", { ascending: false });

  if (error) {
    console.error("Error fetching phrases by set:", error);
    throw new Error("Failed to fetch phrases by set");
  }

  return data || [];
}

export async function getPhrasesByDifficultyAndSet(
  difficulty: "beginner" | "intermediate" | "advanced",
  phraseSet: string
): Promise<FrenchPhrase[]> {
  const { data, error } = await supabase
    .from("language_app_phrases_with_details")
    .select("*")
    .eq("difficulty", difficulty)
    .eq("phrase_set", phraseSet)
    .eq("is_active", true)
    .order("frequency_score", { ascending: false });

  if (error) {
    console.error("Error fetching phrases by difficulty and set:", error);
    throw new Error("Failed to fetch phrases by difficulty and set");
  }

  return data || [];
}

export async function getAvailablePhraseSets(): Promise<string[]> {
  const { data, error } = await supabase
    .from("language_app_phrases_with_details")
    .select("phrase_set")
    .eq("is_active", true);

  if (error) {
    console.error("Error fetching phrase sets:", error);
    throw new Error("Failed to fetch phrase sets");
  }

  // Extract unique phrase sets from database
  const dbPhraseSets = [...new Set(data?.map((item) => item.phrase_set) || [])];

  // Add local phrase sets
  const { getAllLocalPhraseSets } = await import("./local-phrases");
  const localPhraseSets = getAllLocalPhraseSets();

  // Combine and sort
  const allPhraseSets = [...new Set([...dbPhraseSets, ...localPhraseSets])];
  return allPhraseSets.sort();
}

// Utility function to convert new format to legacy format for backward compatibility
export function toLegacyFormat(phrase: FrenchPhrase): LegacyFrenchPhrase {
  return {
    id: phrase.id,
    text: phrase.text,
    english: phrase.english_translation,
    difficulty: phrase.difficulty as "beginner" | "intermediate" | "advanced",
    category: phrase.category,
  };
}

// Cached data for better performance
let cachedPhrases: FrenchPhrase[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedPhrases(): Promise<FrenchPhrase[]> {
  const now = Date.now();

  if (cachedPhrases && now - cacheTimestamp < CACHE_DURATION) {
    return cachedPhrases;
  }

  const dbPhrases = await getAllPhrases();
  // Import dynamically to avoid SSR issues
  const { getLocalPhrases } = await import("./local-phrases");
  const localPhrases = getLocalPhrases();

  cachedPhrases = [...dbPhrases, ...localPhrases];
  cacheTimestamp = now;
  return cachedPhrases;
}

// Function to invalidate the cache (useful when local phrases are added)
export function invalidatePhraseCache(): void {
  cachedPhrases = null;
  cacheTimestamp = 0;
}

export async function getCachedRandomPhrase(
  difficulty?: "beginner" | "intermediate" | "advanced",
  category?: string,
  phraseSet?: string
): Promise<FrenchPhrase> {
  const phrases = await getCachedPhrases();

  let filteredPhrases = phrases;

  if (difficulty) {
    filteredPhrases = filteredPhrases.filter(
      (p) => p.difficulty === difficulty
    );
  }

  if (category) {
    filteredPhrases = filteredPhrases.filter((p) => p.category === category);
  }

  if (phraseSet) {
    filteredPhrases = filteredPhrases.filter((p) => p.phrase_set === phraseSet);
  }

  if (filteredPhrases.length === 0) {
    throw new Error("No phrases found with the specified criteria");
  }

  const randomIndex = Math.floor(Math.random() * filteredPhrases.length);
  return filteredPhrases[randomIndex];
}

// Clear cache function for when data is updated
export function clearPhrasesCache(): void {
  cachedPhrases = null;
  cacheTimestamp = 0;
}

// Sequential phrase counter for compatibility with fallback version
let currentPhraseIndex = 0;

export async function getNextPhrase(): Promise<FrenchPhrase> {
  const phrases = await getCachedPhrases();

  if (phrases.length === 0) {
    throw new Error("No phrases found");
  }

  const phrase = phrases[currentPhraseIndex];
  currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;

  return phrase;
}

// Reset the sequence to start from the beginning
export function resetPhraseSequence(): void {
  currentPhraseIndex = 0;
}

// Get total count of phrases
export async function getTotalPhraseCount(): Promise<number> {
  const phrases = await getCachedPhrases();
  return phrases.length;
}

// Get count by difficulty
export async function getPhraseCountByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): Promise<number> {
  const phrases = await getCachedPhrases();
  return phrases.filter(
    (phrase) => phrase.difficulty === difficulty && phrase.is_active
  ).length;
}
