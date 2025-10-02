// Fallback data layer that works without Supabase
// This provides the same interface as the Supabase version but uses static data

export interface FrenchPhrase {
  id: string;
  text: string;
  english_translation: string;
  phonetic_guide: string | null;
  audio_url: string | null;
  usage_notes: string | null;
  grammar_notes: string | null;
  difficulty_score: number;
  frequency_score: number;
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

// Static data with all 15 phrases
const frenchPhrases: FrenchPhrase[] = [
  // Beginner phrases
  {
    id: "1",
    text: "Bonjour, comment allez-vous ?",
    english_translation: "Hello, how are you?",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 2,
    frequency_score: 9,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "beginner",
    difficulty_level: 1,
    difficulty_color: "#10B981",
    category: "greetings",
    category_description: "Common greetings and salutations",
    category_color: "#3B82F6",
  },
  {
    id: "2",
    text: "Je m'appelle Marie",
    english_translation: "My name is Marie",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 1,
    frequency_score: 8,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "beginner",
    difficulty_level: 1,
    difficulty_color: "#10B981",
    category: "introductions",
    category_description: "Self-introduction phrases",
    category_color: "#10B981",
  },
  {
    id: "3",
    text: "Merci beaucoup",
    english_translation: "Thank you very much",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 1,
    frequency_score: 10,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "beginner",
    difficulty_level: 1,
    difficulty_color: "#10B981",
    category: "courtesy",
    category_description: "Polite expressions and courtesy phrases",
    category_color: "#F59E0B",
  },
  {
    id: "4",
    text: "Excusez-moi",
    english_translation: "Excuse me",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 1,
    frequency_score: 9,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "beginner",
    difficulty_level: 1,
    difficulty_color: "#10B981",
    category: "courtesy",
    category_description: "Polite expressions and courtesy phrases",
    category_color: "#F59E0B",
  },
  {
    id: "5",
    text: "Où est la gare ?",
    english_translation: "Where is the train station?",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 3,
    frequency_score: 6,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "beginner",
    difficulty_level: 1,
    difficulty_color: "#10B981",
    category: "directions",
    category_description: "Asking for and giving directions",
    category_color: "#EF4444",
  },
  // Intermediate phrases
  {
    id: "6",
    text: "Je voudrais réserver une table pour deux personnes",
    english_translation: "I would like to reserve a table for two people",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 5,
    frequency_score: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "intermediate",
    difficulty_level: 2,
    difficulty_color: "#F59E0B",
    category: "restaurant",
    category_description: "Restaurant and dining phrases",
    category_color: "#8B5CF6",
  },
  {
    id: "7",
    text: "Pouvez-vous m'aider, s'il vous plaît ?",
    english_translation: "Can you help me, please?",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 4,
    frequency_score: 7,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "intermediate",
    difficulty_level: 2,
    difficulty_color: "#F59E0B",
    category: "requests",
    category_description: "Making requests and asking for help",
    category_color: "#06B6D4",
  },
  {
    id: "8",
    text: "Je ne comprends pas",
    english_translation: "I don't understand",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 3,
    frequency_score: 8,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "intermediate",
    difficulty_level: 2,
    difficulty_color: "#F59E0B",
    category: "communication",
    category_description: "General communication phrases",
    category_color: "#84CC16",
  },
  {
    id: "9",
    text: "Quel est le prix de ce produit ?",
    english_translation: "What is the price of this product?",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 4,
    frequency_score: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "intermediate",
    difficulty_level: 2,
    difficulty_color: "#F59E0B",
    category: "shopping",
    category_description: "Shopping and commerce phrases",
    category_color: "#F97316",
  },
  {
    id: "10",
    text: "Je suis désolé, je suis en retard",
    english_translation: "I'm sorry, I'm late",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 4,
    frequency_score: 6,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "intermediate",
    difficulty_level: 2,
    difficulty_color: "#F59E0B",
    category: "apologies",
    category_description: "Apologizing and expressing regret",
    category_color: "#EC4899",
  },
  // Advanced phrases
  {
    id: "11",
    text: "Il faut que je vous dise quelque chose d'important",
    english_translation: "I need to tell you something important",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 8,
    frequency_score: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "advanced",
    difficulty_level: 3,
    difficulty_color: "#EF4444",
    category: "communication",
    category_description: "General communication phrases",
    category_color: "#84CC16",
  },
  {
    id: "12",
    text: "J'aimerais discuter de cette proposition avec vous",
    english_translation: "I would like to discuss this proposal with you",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 9,
    frequency_score: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "advanced",
    difficulty_level: 3,
    difficulty_color: "#EF4444",
    category: "business",
    category_description: "Business and professional phrases",
    category_color: "#6366F1",
  },
  {
    id: "13",
    text: "Malgré les difficultés, nous avons réussi",
    english_translation: "Despite the difficulties, we succeeded",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 7,
    frequency_score: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "advanced",
    difficulty_level: 3,
    difficulty_color: "#EF4444",
    category: "achievements",
    category_description: "Expressing achievements and success",
    category_color: "#14B8A6",
  },
  {
    id: "14",
    text: "Il est essentiel de bien comprendre cette situation",
    english_translation: "It is essential to understand this situation well",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 9,
    frequency_score: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "advanced",
    difficulty_level: 3,
    difficulty_color: "#EF4444",
    category: "analysis",
    category_description: "Analytical and critical thinking phrases",
    category_color: "#A855F7",
  },
  {
    id: "15",
    text: "Nous devons prendre une décision rapidement",
    english_translation: "We need to make a decision quickly",
    phonetic_guide: null,
    audio_url: null,
    usage_notes: null,
    grammar_notes: null,
    difficulty_score: 8,
    frequency_score: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    difficulty: "advanced",
    difficulty_level: 3,
    difficulty_color: "#EF4444",
    category: "decision-making",
    category_description: "Decision-making and planning phrases",
    category_color: "#DC2626",
  },
];

// Data access functions
export async function getAllPhrases(): Promise<FrenchPhrase[]> {
  return frenchPhrases.filter((phrase) => phrase.is_active);
}

export async function getPhrasesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): Promise<FrenchPhrase[]> {
  return frenchPhrases.filter(
    (phrase) => phrase.difficulty === difficulty && phrase.is_active
  );
}

export async function getPhrasesByCategory(
  category: string
): Promise<FrenchPhrase[]> {
  return frenchPhrases.filter(
    (phrase) => phrase.category === category && phrase.is_active
  );
}

// Sequential phrase counter
let currentPhraseIndex = 0;

export async function getNextPhrase(): Promise<FrenchPhrase> {
  const activePhrases = frenchPhrases.filter((phrase) => phrase.is_active);

  if (activePhrases.length === 0) {
    throw new Error("No phrases found");
  }

  const phrase = activePhrases[currentPhraseIndex];
  currentPhraseIndex = (currentPhraseIndex + 1) % activePhrases.length;

  return phrase;
}

// Keep the old function for backward compatibility but make it sequential
export async function getRandomPhrase(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _difficulty?: "beginner" | "intermediate" | "advanced",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _category?: string
): Promise<FrenchPhrase> {
  return getNextPhrase();
}

// Reset the sequence to start from the beginning
export function resetPhraseSequence(): void {
  currentPhraseIndex = 0;
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

// Get total count of phrases
export function getTotalPhraseCount(): number {
  return frenchPhrases.filter((phrase) => phrase.is_active).length;
}

// Get count by difficulty
export function getPhraseCountByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): number {
  return frenchPhrases.filter(
    (phrase) => phrase.difficulty === difficulty && phrase.is_active
  ).length;
}
