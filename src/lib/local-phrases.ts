import type { FrenchPhrase } from "./phrases";

const LOCAL_PHRASES_KEY = "generated-phrases";
const LOCAL_PHRASE_SETS_KEY = "generated-phrase-sets";

export interface LocalPhraseSet {
  id: string;
  name: string;
  topic: string;
  created_at: string;
  phrase_count: number;
}

export function saveGeneratedPhrases(
  phrases: FrenchPhrase[],
  phraseSet: string,
  topic: string
): void {
  try {
    // Save phrases
    const existingPhrases = getLocalPhrases();
    const updatedPhrases = [...existingPhrases, ...phrases];
    localStorage.setItem(LOCAL_PHRASES_KEY, JSON.stringify(updatedPhrases));

    // Save phrase set metadata
    const existingSets = getLocalPhraseSets();
    const newSet: LocalPhraseSet = {
      id: phraseSet,
      name: `AI: ${topic}`,
      topic,
      created_at: new Date().toISOString(),
      phrase_count: phrases.length,
    };

    // Check if set already exists and update or add
    const existingSetIndex = existingSets.findIndex(
      (set) => set.id === phraseSet
    );
    if (existingSetIndex >= 0) {
      existingSets[existingSetIndex] = newSet;
    } else {
      existingSets.push(newSet);
    }

    localStorage.setItem(LOCAL_PHRASE_SETS_KEY, JSON.stringify(existingSets));
  } catch (error) {
    console.error("Failed to save generated phrases:", error);
  }
}

export function getLocalPhrases(): FrenchPhrase[] {
  try {
    const stored = localStorage.getItem(LOCAL_PHRASES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load local phrases:", error);
    return [];
  }
}

export function getLocalPhraseSets(): LocalPhraseSet[] {
  try {
    const stored = localStorage.getItem(LOCAL_PHRASE_SETS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load local phrase sets:", error);
    return [];
  }
}

export function deleteLocalPhraseSet(phraseSetId: string): void {
  try {
    // Remove phrases from this set
    const existingPhrases = getLocalPhrases();
    const updatedPhrases = existingPhrases.filter(
      (phrase) => phrase.phrase_set !== phraseSetId
    );
    localStorage.setItem(LOCAL_PHRASES_KEY, JSON.stringify(updatedPhrases));

    // Remove phrase set metadata
    const existingSets = getLocalPhraseSets();
    const updatedSets = existingSets.filter((set) => set.id !== phraseSetId);
    localStorage.setItem(LOCAL_PHRASE_SETS_KEY, JSON.stringify(updatedSets));
  } catch (error) {
    console.error("Failed to delete local phrase set:", error);
  }
}

export function getAllLocalPhraseSets(): string[] {
  return getLocalPhraseSets().map((set) => set.id);
}

export function getLocalPhraseSetInfo(
  phraseSetId: string
): LocalPhraseSet | null {
  const sets = getLocalPhraseSets();
  return sets.find((set) => set.id === phraseSetId) || null;
}

export function clearAllGeneratedPhrases(): void {
  try {
    localStorage.removeItem(LOCAL_PHRASES_KEY);
    localStorage.removeItem(LOCAL_PHRASE_SETS_KEY);
  } catch (error) {
    console.error("Failed to clear generated phrases:", error);
  }
}
