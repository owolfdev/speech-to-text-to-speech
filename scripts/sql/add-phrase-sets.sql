-- Add phrase_set column to language_app_french_phrases table
-- This allows organizing phrases into different learning sets (e.g., "french-101", "business-french", etc.)

-- Add the phrase_set column
ALTER TABLE language_app_french_phrases 
ADD COLUMN phrase_set TEXT NOT NULL DEFAULT 'french-101';

-- Update all existing phrases to use the default 'french-101' set
UPDATE language_app_french_phrases 
SET phrase_set = 'french-101'
WHERE phrase_set IS NULL OR phrase_set = '';

-- Add an index for better performance when filtering by phrase_set
CREATE INDEX idx_language_app_french_phrases_phrase_set ON language_app_french_phrases(phrase_set);

-- Update the view to include phrase_set
DROP VIEW IF EXISTS language_app_phrases_with_details;

CREATE VIEW language_app_phrases_with_details AS
SELECT 
  fp.id,
  fp.text,
  fp.english_translation,
  fp.phonetic_guide,
  fp.audio_url,
  fp.usage_notes,
  fp.grammar_notes,
  fp.verb_conjugation,
  fp.difficulty_score,
  fp.frequency_score,
  fp.phrase_set,
  fp.is_active,
  fp.created_at,
  fp.updated_at,
  dl.name as difficulty,
  dl.level_order as difficulty_level,
  dl.color as difficulty_color,
  c.name as category,
  c.description as category_description,
  c.color as category_color
FROM language_app_french_phrases fp
JOIN language_app_difficulty_levels dl ON fp.difficulty_id = dl.id
JOIN language_app_categories c ON fp.category_id = c.id
WHERE fp.is_active = TRUE;

-- Update the random phrase function to support phrase_set filtering
CREATE OR REPLACE FUNCTION language_app_get_random_phrase(
  difficulty_filter TEXT DEFAULT NULL,
  category_filter TEXT DEFAULT NULL,
  phrase_set_filter TEXT DEFAULT NULL,
  limit_count INTEGER DEFAULT 1
)
RETURNS TABLE (
  id UUID,
  text TEXT,
  english_translation TEXT,
  difficulty TEXT,
  category TEXT,
  phrase_set TEXT,
  difficulty_score INTEGER,
  frequency_score INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pwd.id,
    pwd.text,
    pwd.english_translation,
    pwd.difficulty,
    pwd.category,
    pwd.phrase_set,
    pwd.difficulty_score,
    pwd.frequency_score
  FROM language_app_phrases_with_details pwd
  WHERE 
    (difficulty_filter IS NULL OR pwd.difficulty = difficulty_filter)
    AND (category_filter IS NULL OR pwd.category = category_filter)
    AND (phrase_set_filter IS NULL OR pwd.phrase_set = phrase_set_filter)
  ORDER BY RANDOM()
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Insert some example phrase sets for future use
-- Note: We're not inserting these into a separate table yet, just documenting the concept
-- Possible future phrase sets:
-- 'french-101' (current default)
-- 'business-french'
-- 'travel-french' 
-- 'restaurant-french'
-- 'medical-french'
-- 'academic-french'

-- Verify the changes
SELECT 
  phrase_set,
  dl.name as difficulty,
  COUNT(*) as phrase_count
FROM language_app_french_phrases fp
JOIN language_app_difficulty_levels dl ON fp.difficulty_id = dl.id
WHERE fp.is_active = TRUE
GROUP BY phrase_set, dl.name, dl.level_order
ORDER BY phrase_set, dl.level_order;
