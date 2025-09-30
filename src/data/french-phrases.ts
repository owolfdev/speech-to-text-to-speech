export interface FrenchPhrase {
  id: string;
  text: string;
  english: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
}

export const frenchPhrases: FrenchPhrase[] = [
  // Beginner phrases
  {
    id: "1",
    text: "Bonjour, comment allez-vous ?",
    english: "Hello, how are you?",
    difficulty: "beginner",
    category: "greetings",
  },
  {
    id: "2",
    text: "Je m'appelle Marie",
    english: "My name is Marie",
    difficulty: "beginner",
    category: "introductions",
  },
  {
    id: "3",
    text: "Merci beaucoup",
    english: "Thank you very much",
    difficulty: "beginner",
    category: "courtesy",
  },
  {
    id: "4",
    text: "Excusez-moi",
    english: "Excuse me",
    difficulty: "beginner",
    category: "courtesy",
  },
  {
    id: "5",
    text: "Où est la gare ?",
    english: "Where is the train station?",
    difficulty: "beginner",
    category: "directions",
  },

  // Intermediate phrases
  {
    id: "6",
    text: "Je voudrais réserver une table pour deux personnes",
    english: "I would like to reserve a table for two people",
    difficulty: "intermediate",
    category: "restaurant",
  },
  {
    id: "7",
    text: "Pouvez-vous m'aider, s'il vous plaît ?",
    english: "Can you help me, please?",
    difficulty: "intermediate",
    category: "requests",
  },
  {
    id: "8",
    text: "Je ne comprends pas",
    english: "I don't understand",
    difficulty: "intermediate",
    category: "communication",
  },
  {
    id: "9",
    text: "Quel est le prix de ce produit ?",
    english: "What is the price of this product?",
    difficulty: "intermediate",
    category: "shopping",
  },
  {
    id: "10",
    text: "Je suis désolé, je suis en retard",
    english: "I'm sorry, I'm late",
    difficulty: "intermediate",
    category: "apologies",
  },

  // Advanced phrases
  {
    id: "11",
    text: "Il faut que je vous dise quelque chose d'important",
    english: "I need to tell you something important",
    difficulty: "advanced",
    category: "communication",
  },
  {
    id: "12",
    text: "J'aimerais discuter de cette proposition avec vous",
    english: "I would like to discuss this proposal with you",
    difficulty: "advanced",
    category: "business",
  },
  {
    id: "13",
    text: "Malgré les difficultés, nous avons réussi",
    english: "Despite the difficulties, we succeeded",
    difficulty: "advanced",
    category: "achievements",
  },
  {
    id: "14",
    text: "Il est essentiel de bien comprendre cette situation",
    english: "It is essential to understand this situation well",
    difficulty: "advanced",
    category: "analysis",
  },
  {
    id: "15",
    text: "Nous devons prendre une décision rapidement",
    english: "We need to make a decision quickly",
    difficulty: "advanced",
    category: "decision-making",
  },
];

export function getPhrasesByDifficulty(
  difficulty: FrenchPhrase["difficulty"]
): FrenchPhrase[] {
  return frenchPhrases.filter((phrase) => phrase.difficulty === difficulty);
}

export function getPhrasesByCategory(category: string): FrenchPhrase[] {
  return frenchPhrases.filter((phrase) => phrase.category === category);
}

export function getRandomPhrase(
  difficulty?: FrenchPhrase["difficulty"]
): FrenchPhrase {
  const phrases = difficulty
    ? getPhrasesByDifficulty(difficulty)
    : frenchPhrases;
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}
