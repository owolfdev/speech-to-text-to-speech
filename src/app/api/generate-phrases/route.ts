import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Mark this route as dynamic to prevent static generation
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // Initialize OpenAI client here to avoid build-time issues
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const { prompt, count = 10 } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a French language teacher. Generate ${count} French phrases based on the user's request. Each phrase should be:

1. Useful for language learning
2. Include proper grammar
3. Be appropriate for beginner to intermediate learners
4. Include realistic, practical French

Return ONLY a JSON array with this exact structure:
[
  {
    "text": "French phrase here",
    "english_translation": "English translation",
    "grammar_notes": "Brief grammar explanation",
    "difficulty": "beginner|intermediate|advanced",
    "category": "appropriate category",
    "verb_conjugation": "If relevant, include verb conjugation info",
    "usage_notes": "Optional usage context"
  }
]

Focus on the topic: "${prompt}"

Examples of good phrases:
- For "avoir": "J'ai faim" (I'm hungry) with grammar notes about avoir conjugation
- For "restaurant": "Je voudrais une table pour deux" (I'd like a table for two)
- For "directions": "Excusez-moi, où est la gare ?" (Excuse me, where is the train station?)

Make sure the JSON is valid and properly formatted.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Generate ${count} French phrases about: ${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    // Parse the JSON response
    let phrases;
    try {
      phrases = JSON.parse(content);
    } catch {
      console.error("Failed to parse OpenAI response:", content);
      throw new Error("Invalid JSON response from AI");
    }

    // Validate and transform the phrases to match our schema
    interface GeneratedPhrase {
      text?: string;
      english_translation?: string;
      grammar_notes?: string;
      difficulty?: string;
      category?: string;
      verb_conjugation?: string;
      usage_notes?: string;
    }
    const validatedPhrases = (phrases as GeneratedPhrase[]).map(
      (phrase, index: number) => ({
        id: `generated-${Date.now()}-${index}`,
        text: phrase.text || "",
        english_translation: phrase.english_translation || "",
        grammar_notes: phrase.grammar_notes || "",
        difficulty: phrase.difficulty || "beginner",
        category: phrase.category || "Generated",
        verb_conjugation: phrase.verb_conjugation || null,
        usage_notes: phrase.usage_notes || null,
        phrase_set: `generated-${prompt
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")}`,
        difficulty_score:
          phrase.difficulty === "advanced"
            ? 3
            : phrase.difficulty === "intermediate"
            ? 2
            : 1,
        frequency_score: 5, // Default for generated phrases
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    );

    return NextResponse.json({
      phrases: validatedPhrases,
      phrase_set: validatedPhrases[0]?.phrase_set || `generated-${Date.now()}`,
      topic: prompt,
    });
  } catch (error) {
    console.error("Error generating phrases:", error);
    return NextResponse.json(
      { error: "Failed to generate phrases" },
      { status: 500 }
    );
  }
}
