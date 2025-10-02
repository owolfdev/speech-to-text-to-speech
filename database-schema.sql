-- French Phrases Database Schema for Supabase
-- This schema improves upon the original structure with better organization and additional metadata

-- Create categories table for better organization
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT, -- For UI theming
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create difficulty levels table for better management
CREATE TABLE difficulty_levels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  level_order INTEGER NOT NULL, -- 1 for beginner, 2 for intermediate, 3 for advanced
  description TEXT,
  color TEXT, -- For UI theming
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Main phrases table with improved structure
CREATE TABLE french_phrases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  difficulty_id UUID REFERENCES difficulty_levels(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  
  -- Additional metadata for better learning experience
  phonetic_guide TEXT, -- IPA or simplified phonetic guide
  audio_url TEXT, -- URL to audio file for pronunciation
  usage_notes TEXT, -- Context or usage information
  grammar_notes TEXT, -- Grammar explanations
  
  -- Learning progress tracking
  difficulty_score INTEGER DEFAULT 1, -- 1-10 scale for fine-grained difficulty
  frequency_score INTEGER DEFAULT 1, -- 1-10 scale for how common the phrase is
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID, -- For future user management
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Constraints
  CONSTRAINT valid_difficulty_score CHECK (difficulty_score >= 1 AND difficulty_score <= 10),
  CONSTRAINT valid_frequency_score CHECK (frequency_score >= 1 AND frequency_score <= 10)
);

-- Create indexes for better performance
CREATE INDEX idx_french_phrases_difficulty ON french_phrases(difficulty_id);
CREATE INDEX idx_french_phrases_category ON french_phrases(category_id);
CREATE INDEX idx_french_phrases_active ON french_phrases(is_active);
CREATE INDEX idx_french_phrases_difficulty_score ON french_phrases(difficulty_score);
CREATE INDEX idx_french_phrases_frequency_score ON french_phrases(frequency_score);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_difficulty_levels_updated_at BEFORE UPDATE ON difficulty_levels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_french_phrases_updated_at BEFORE UPDATE ON french_phrases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO categories (name, description, color) VALUES
  ('greetings', 'Common greetings and salutations', '#3B82F6'),
  ('introductions', 'Self-introduction phrases', '#10B981'),
  ('courtesy', 'Polite expressions and courtesy phrases', '#F59E0B'),
  ('directions', 'Asking for and giving directions', '#EF4444'),
  ('restaurant', 'Restaurant and dining phrases', '#8B5CF6'),
  ('requests', 'Making requests and asking for help', '#06B6D4'),
  ('communication', 'General communication phrases', '#84CC16'),
  ('shopping', 'Shopping and commerce phrases', '#F97316'),
  ('apologies', 'Apologizing and expressing regret', '#EC4899'),
  ('business', 'Business and professional phrases', '#6366F1'),
  ('achievements', 'Expressing achievements and success', '#14B8A6'),
  ('analysis', 'Analytical and critical thinking phrases', '#A855F7'),
  ('decision-making', 'Decision-making and planning phrases', '#DC2626');

INSERT INTO difficulty_levels (name, level_order, description, color) VALUES
  ('beginner', 1, 'Basic phrases for beginners', '#10B981'),
  ('intermediate', 2, 'Intermediate phrases for developing learners', '#F59E0B'),
  ('advanced', 3, 'Advanced phrases for proficient speakers', '#EF4444');

-- Insert the existing French phrases data
INSERT INTO french_phrases (text, english_translation, difficulty_id, category_id, difficulty_score, frequency_score) VALUES
  -- Beginner phrases
  ('Bonjour, comment allez-vous ?', 'Hello, how are you?', 
   (SELECT id FROM difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM categories WHERE name = 'greetings'), 2, 9),
  
  ('Je m''appelle Marie', 'My name is Marie',
   (SELECT id FROM difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM categories WHERE name = 'introductions'), 1, 8),
  
  ('Merci beaucoup', 'Thank you very much',
   (SELECT id FROM difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM categories WHERE name = 'courtesy'), 1, 10),
  
  ('Excusez-moi', 'Excuse me',
   (SELECT id FROM difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM categories WHERE name = 'courtesy'), 1, 9),
  
  ('Où est la gare ?', 'Where is the train station?',
   (SELECT id FROM difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM categories WHERE name = 'directions'), 3, 6),
  
  -- Intermediate phrases
  ('Je voudrais réserver une table pour deux personnes', 'I would like to reserve a table for two people',
   (SELECT id FROM difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM categories WHERE name = 'restaurant'), 5, 4),
  
  ('Pouvez-vous m''aider, s''il vous plaît ?', 'Can you help me, please?',
   (SELECT id FROM difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM categories WHERE name = 'requests'), 4, 7),
  
  ('Je ne comprends pas', 'I don''t understand',
   (SELECT id FROM difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM categories WHERE name = 'communication'), 3, 8),
  
  ('Quel est le prix de ce produit ?', 'What is the price of this product?',
   (SELECT id FROM difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM categories WHERE name = 'shopping'), 4, 5),
  
  ('Je suis désolé, je suis en retard', 'I''m sorry, I''m late',
   (SELECT id FROM difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM categories WHERE name = 'apologies'), 4, 6),
  
  -- Advanced phrases
  ('Il faut que je vous dise quelque chose d''important', 'I need to tell you something important',
   (SELECT id FROM difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM categories WHERE name = 'communication'), 8, 3),
  
  ('J''aimerais discuter de cette proposition avec vous', 'I would like to discuss this proposal with you',
   (SELECT id FROM difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM categories WHERE name = 'business'), 9, 2),
  
  ('Malgré les difficultés, nous avons réussi', 'Despite the difficulties, we succeeded',
   (SELECT id FROM difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM categories WHERE name = 'achievements'), 7, 4),
  
  ('Il est essentiel de bien comprendre cette situation', 'It is essential to understand this situation well',
   (SELECT id FROM difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM categories WHERE name = 'analysis'), 9, 2),
  
  ('Nous devons prendre une décision rapidement', 'We need to make a decision quickly',
   (SELECT id FROM difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM categories WHERE name = 'decision-making'), 8, 3);

-- Create a view for easy querying with joined data
CREATE VIEW phrases_with_details AS
SELECT 
  fp.id,
  fp.text,
  fp.english_translation,
  fp.phonetic_guide,
  fp.audio_url,
  fp.usage_notes,
  fp.grammar_notes,
  fp.difficulty_score,
  fp.frequency_score,
  fp.is_active,
  fp.created_at,
  fp.updated_at,
  dl.name as difficulty,
  dl.level_order as difficulty_level,
  dl.color as difficulty_color,
  c.name as category,
  c.description as category_description,
  c.color as category_color
FROM french_phrases fp
JOIN difficulty_levels dl ON fp.difficulty_id = dl.id
JOIN categories c ON fp.category_id = c.id
WHERE fp.is_active = TRUE;

-- Create a function to get random phrases with optional filtering
CREATE OR REPLACE FUNCTION get_random_phrase(
  difficulty_filter TEXT DEFAULT NULL,
  category_filter TEXT DEFAULT NULL,
  limit_count INTEGER DEFAULT 1
)
RETURNS TABLE (
  id UUID,
  text TEXT,
  english_translation TEXT,
  difficulty TEXT,
  category TEXT,
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
    pwd.difficulty_score,
    pwd.frequency_score
  FROM phrases_with_details pwd
  WHERE 
    (difficulty_filter IS NULL OR pwd.difficulty = difficulty_filter)
    AND (category_filter IS NULL OR pwd.category = category_filter)
  ORDER BY RANDOM()
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
