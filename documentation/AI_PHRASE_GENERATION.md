# AI Phrase Generation Feature

## Overview

This feature allows users to generate custom French phrase sets on-demand using OpenAI's GPT-4 model. Generated phrases are stored locally in the browser and integrate seamlessly with the existing phrase management system.

## How It Works

### User Flow

1. Click the "Generate Custom Phrases" button (purple button with sparkles icon)
2. Enter a topic (e.g., "avoir verb", "restaurant vocabulary", "asking for directions")
3. Choose how many phrases to generate (1-20, default: 10)
4. Click "Generate Phrases"
5. AI generates phrases tailored to the topic
6. Phrases are saved to browser's localStorage
7. New phrase set appears in the phrase set filter menu
8. User can immediately start practicing the generated phrases
9. Generated phrase sets show a trash icon for deletion
10. Click trash icon → confirmation dialog → delete permanently

### Technical Implementation

#### Files Created/Modified

**New Files:**

- `/src/app/api/generate-phrases/route.ts` - API endpoint for OpenAI integration
- `/src/components/PhraseGenerator.tsx` - Modal UI component for phrase generation
- `/src/lib/local-phrases.ts` - Local storage management utilities

**Modified Files:**

- `/src/lib/phrases.ts` - Merged local and database phrases
- `/src/components/PronunciationPracticeSimple.tsx` - Integrated phrase generator UI

#### Architecture

1. **API Endpoint** (`/api/generate-phrases`)

   - Receives: `{ prompt: string, count: number }`
   - Uses OpenAI GPT-4 to generate structured French phrases
   - Returns: Array of phrases with translations, grammar notes, etc.

2. **Local Storage**

   - Phrases stored in `localStorage` under key: `generated-phrases`
   - Phrase set metadata stored under key: `generated-phrase-sets`
   - Persists across sessions (until browser data cleared)

3. **Integration**
   - `getCachedPhrases()` merges database + local phrases
   - `getAvailablePhraseSets()` includes local phrase sets
   - Generated phrases work with all existing filters (difficulty, category)

#### Data Structure

Generated phrases follow the same schema as database phrases:

```typescript
{
  id: string; // "generated-<timestamp>-<index>"
  text: string; // French phrase
  english_translation: string;
  grammar_notes: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  verb_conjugation: string | null;
  usage_notes: string | null;
  phrase_set: string; // "generated-<topic-slug>"
  difficulty_score: number;
  frequency_score: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

## Setup Requirements

### Environment Variables

Add your OpenAI API key to `.env.local`:

```bash
OPENAI_API_KEY=sk-proj-...
```

### Dependencies

```bash
npm install openai
```

## Usage Examples

### Example Prompts

- "avoir verb" - Generates phrases demonstrating avoir conjugation
- "restaurant vocabulary" - Common restaurant phrases
- "asking for directions" - Direction-related phrases
- "shopping phrases" - Shopping vocabulary
- "weather expressions" - Weather-related phrases
- "past tense verbs" - Past tense practice

### Generated Phrase Set Naming

- Prompt: "avoir verb" → Phrase Set: "generated-avoir-verb"
- Display Name: "AI: avoir verb"

## Features

### Current Capabilities

✅ Generate 1-20 phrases per request
✅ Custom topics via natural language prompts
✅ AI-powered grammar notes and translations
✅ Automatic difficulty assessment
✅ Verb conjugation information
✅ Local storage persistence
✅ Seamless integration with existing UI
✅ Filter by generated phrase sets
✅ Practice immediately after generation
✅ Delete generated phrase sets with confirmation dialog

### Future Enhancements

- Export/share generated phrase sets
- Regenerate/modify existing sets
- Save favorite generated sets to database
- Customize AI parameters (temperature, model)
- Generate phrases based on specific grammar rules

## Limitations

1. **Local Storage Only**: Generated phrases exist only in the user's browser

   - Clearing browser data will delete all generated phrases
   - Not synced across devices

2. **AI Quality**: Phrase quality depends on OpenAI's output

   - May occasionally generate incorrect grammar
   - Users should verify accuracy

3. **API Costs**: Each generation uses OpenAI API credits

   - Consider rate limiting in production
   - Monitor API usage

4. **Storage Limits**: localStorage typically has 5-10MB limit
   - ~2000-5000 generated phrases max (rough estimate)

## Development Notes

### Why Local Storage?

- Fast, no database schema changes needed
- Instant persistence
- Good for "experimental" phrases
- Users can try without commitment
- Easy to implement delete functionality later

### Build Configuration

The API route uses `export const dynamic = 'force-dynamic'` to prevent static generation during build time, which would fail without the API key.

## Testing

To test the feature:

1. Ensure `OPENAI_API_KEY` is set in `.env.local`
2. Run `npm run dev`
3. Click "Generate Custom Phrases"
4. Enter a topic and generate
5. Verify phrases appear in phrase set filter
6. Practice generated phrases
7. Reload page and verify persistence

## Troubleshooting

**Build fails with OpenAI error:**

- Make sure API key is in `.env.local`, not `.env`
- Verify `export const dynamic = 'force-dynamic'` is in route.ts

**Generated phrases don't appear:**

- Check browser console for errors
- Verify localStorage isn't disabled
- Check if phrase set filter is set to "All Sets"

**Phrases disappear after reload:**

- Check if browser is in private/incognito mode
- Verify localStorage persistence in DevTools
