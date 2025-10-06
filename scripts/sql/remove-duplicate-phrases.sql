-- Remove Duplicate Phrases from language_app_french_phrases
-- This script removes duplicate phrases, keeping the best version of each

-- First, let's see what duplicates exist
SELECT 
  text,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ') as duplicate_ids,
  STRING_AGG(phrase_set, ', ') as phrase_sets
FROM language_app_french_phrases 
WHERE is_active = TRUE
GROUP BY text
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, text;

-- Remove duplicates, keeping the one with:
-- 1. Most recent updated_at
-- 2. Most complete grammar_notes
-- 3. Lowest difficulty_score (if tied)
-- 4. Lowest frequency_score (if tied)

WITH ranked_duplicates AS (
  SELECT 
    id,
    text,
    ROW_NUMBER() OVER (
      PARTITION BY text 
      ORDER BY 
        updated_at DESC,
        LENGTH(grammar_notes) DESC NULLS LAST,
        difficulty_score ASC,
        frequency_score ASC
    ) as rn
  FROM language_app_french_phrases 
  WHERE is_active = TRUE
)
DELETE FROM language_app_french_phrases 
WHERE id IN (
  SELECT id 
  FROM ranked_duplicates 
  WHERE rn > 1
);

-- Verify duplicates are removed
SELECT 
  text,
  COUNT(*) as count
FROM language_app_french_phrases 
WHERE is_active = TRUE
GROUP BY text
HAVING COUNT(*) > 1
ORDER BY count DESC, text;

-- Show final phrase count by set
SELECT 
  phrase_set,
  dl.name as difficulty,
  COUNT(*) as phrase_count
FROM language_app_french_phrases fp
JOIN language_app_difficulty_levels dl ON fp.difficulty_id = dl.id
WHERE fp.is_active = TRUE
GROUP BY phrase_set, dl.name, dl.level_order
ORDER BY phrase_set, dl.level_order;
