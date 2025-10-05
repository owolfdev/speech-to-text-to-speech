-- Insert Verb Être Phrases Set
-- This script adds a new phrase set focused on the verb "être" (to be)
-- with progressive difficulty levels: present, past/future, conditional/subjunctive

-- BEGINNER LEVEL - Present Tense (10+ phrases)
INSERT INTO language_app_french_phrases (text, english_translation, difficulty_id, category_id, phrase_set, difficulty_score, frequency_score, grammar_notes, verb_conjugation) VALUES

-- Basic present tense conjugations
('Je suis étudiant', 'I am a student',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'introductions'), 
 'verb-etre', 1, 8,
 'Present tense of "être" (to be). "Je suis" is the first person singular form.',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'),

('Tu es professeur', 'You are a teacher',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'introductions'), 
 'verb-etre', 1, 7,
 'Present tense of "être" (to be). "Tu es" is the second person singular form.',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'),

('Il est français', 'He is French',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'introductions'), 
 'verb-etre', 1, 8,
 'Present tense of "être" (to be). "Il est" is the third person masculine singular form.',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'),

('Elle est américaine', 'She is American',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'introductions'), 
 'verb-etre', 1, 8,
 'Present tense of "être" (to be). "Elle est" is the third person feminine singular form.',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'),

('Nous sommes heureux', 'We are happy',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 2, 7,
 'Present tense of "être" (to be). "Nous sommes" is the first person plural form.',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'),

('Vous êtes fatigués', 'You are tired',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 2, 7,
 'Present tense of "être" (to be). "Vous êtes" is the second person plural form.',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'),

('Ils sont étudiants', 'They are students',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'introductions'), 
 'verb-etre', 2, 7,
 'Present tense of "être" (to be). "Ils sont" is the third person masculine plural form.',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'),

('Elles sont contentes', 'They are happy',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 2, 7,
 'Present tense of "être" (to be). "Elles sont" is the third person feminine plural form.',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'),

('Je suis en retard', 'I am late',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'apologies'), 
 'verb-etre', 2, 8,
 'Present tense of "être" (to be) with "en retard" (late). Very common expression.',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'),

('Tu es d''où ?', 'Where are you from?',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'introductions'), 
 'verb-etre', 3, 8,
 'Present tense of "être" (to be) in question form. "D''où" means "from where".',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'),

('Il est comment ?', 'How is he?',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 3, 6,
 'Present tense of "être" (to be) in question form asking about someone''s condition or character.',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'),

('Nous sommes amis', 'We are friends',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 2, 7,
 'Present tense of "être" (to be). "Amis" means "friends" (masculine plural).',
 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont');

-- INTERMEDIATE LEVEL - Past & Future Tenses (10+ phrases)
INSERT INTO language_app_french_phrases (text, english_translation, difficulty_id, category_id, phrase_set, difficulty_score, frequency_score, grammar_notes, verb_conjugation) VALUES

-- Past tense (imparfait)
('J''étais malade hier', 'I was sick yesterday',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 4, 6,
 'Imperfect tense of "être" (to be). "J''étais" indicates a past state or condition.',
 'ÊTRE (imperfect): j''étais, tu étais, il/elle était, nous étions, vous étiez, ils/elles étaient'),

('Tu étais en vacances', 'You were on vacation',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 4, 5,
 'Imperfect tense of "être" (to be). "En vacances" means "on vacation".',
 'ÊTRE (imperfect): j''étais, tu étais, il/elle était, nous étions, vous étiez, ils/elles étaient'),

('Il était content de vous voir', 'He was happy to see you',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 5, 5,
 'Imperfect tense of "être" (to be) with "content de" (happy to).',
 'ÊTRE (imperfect): j''étais, tu étais, il/elle était, nous étions, vous étiez, ils/elles étaient'),

('Nous étions en retard', 'We were late',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'apologies'), 
 'verb-etre', 4, 6,
 'Imperfect tense of "être" (to be). "En retard" means "late".',
 'ÊTRE (imperfect): j''étais, tu étais, il/elle était, nous étions, vous étiez, ils/elles étaient'),

('Vous étiez très gentils', 'You were very kind',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'courtesy'), 
 'verb-etre', 4, 6,
 'Imperfect tense of "être" (to be) with "gentils" (kind, masculine plural).',
 'ÊTRE (imperfect): j''étais, tu étais, il/elle était, nous étions, vous étiez, ils/elles étaient'),

-- Future tense
('Je serai là demain', 'I will be there tomorrow',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 5, 7,
 'Future tense of "être" (to be). "Je serai" indicates a future state.',
 'ÊTRE (future): je serai, tu seras, il/elle sera, nous serons, vous serez, ils/elles seront'),

('Tu seras médecin', 'You will be a doctor',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'introductions'), 
 'verb-etre', 5, 5,
 'Future tense of "être" (to be) talking about future profession.',
 'ÊTRE (future): je serai, tu seras, il/elle sera, nous serons, vous serez, ils/elles seront'),

('Il sera en France', 'He will be in France',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'directions'), 
 'verb-etre', 5, 6,
 'Future tense of "être" (to be) indicating future location.',
 'ÊTRE (future): je serai, tu seras, il/elle sera, nous serons, vous serez, ils/elles seront'),

('Nous serons heureux de vous aider', 'We will be happy to help you',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'requests'), 
 'verb-etre', 6, 6,
 'Future tense of "être" (to be) with "heureux de" (happy to).',
 'ÊTRE (future): je serai, tu seras, il/elle sera, nous serons, vous serez, ils/elles seront'),

('Vous serez en vacances', 'You will be on vacation',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 5, 5,
 'Future tense of "être" (to be) talking about future plans.',
 'ÊTRE (future): je serai, tu seras, il/elle sera, nous serons, vous serez, ils/elles seront'),

('Ils seront contents', 'They will be happy',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 5, 6,
 'Future tense of "être" (to be) with "contents" (happy, masculine plural).',
 'ÊTRE (future): je serai, tu seras, il/elle sera, nous serons, vous serez, ils/elles seront'),

('Elles seront là à huit heures', 'They will be there at eight o''clock',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 6, 5,
 'Future tense of "être" (to be) with time expression.',
 'ÊTRE (future): je serai, tu seras, il/elle sera, nous serons, vous serez, ils/elles seront');

-- ADVANCED LEVEL - Conditional & Subjunctive (10+ phrases)
INSERT INTO language_app_french_phrases (text, english_translation, difficulty_id, category_id, phrase_set, difficulty_score, frequency_score, grammar_notes, verb_conjugation) VALUES

-- Conditional tense
('Je serais heureux si tu venais', 'I would be happy if you came',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 8, 4,
 'Conditional tense of "être" (to be). "Je serais" expresses a hypothetical situation.',
 'ÊTRE (conditional): je serais, tu serais, il/elle serait, nous serions, vous seriez, ils/elles seraient'),

('Tu serais plus content', 'You would be happier',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 8, 4,
 'Conditional tense of "être" (to be) with comparative "plus content" (happier).',
 'ÊTRE (conditional): je serais, tu serais, il/elle serait, nous serions, vous seriez, ils/elles seraient'),

('Il serait mieux ici', 'He would be better here',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 8, 3,
 'Conditional tense of "être" (to be) expressing an opinion or suggestion.',
 'ÊTRE (conditional): je serais, tu serais, il/elle serait, nous serions, vous seriez, ils/elles seraient'),

('Nous serions ravis de vous accueillir', 'We would be delighted to welcome you',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'courtesy'), 
 'verb-etre', 9, 3,
 'Conditional tense of "être" (to be) with "ravis de" (delighted to). Very polite expression.',
 'ÊTRE (conditional): je serais, tu serais, il/elle serait, nous serions, vous seriez, ils/elles seraient'),

('Vous seriez plus à l''aise', 'You would be more comfortable',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'courtesy'), 
 'verb-etre', 8, 3,
 'Conditional tense of "être" (to be) with "à l''aise" (comfortable).',
 'ÊTRE (conditional): je serais, tu serais, il/elle serait, nous serions, vous seriez, ils/elles seraient'),

-- Subjunctive mood
('Il faut que tu sois patient', 'You need to be patient',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 9, 4,
 'Subjunctive mood of "être" (to be). "Il faut que" requires the subjunctive.',
 'ÊTRE (subjunctive): que je sois, que tu sois, qu''il/elle soit, que nous soyons, que vous soyez, qu''ils/elles soient'),

('Je veux que vous soyez là', 'I want you to be there',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'requests'), 
 'verb-etre', 8, 4,
 'Subjunctive mood of "être" (to be). "Je veux que" requires the subjunctive.',
 'ÊTRE (subjunctive): que je sois, que tu sois, qu''il/elle soit, que nous soyons, que vous soyez, qu''ils/elles soient'),

('Il est important que nous soyons ponctuels', 'It is important that we be punctual',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'business'), 
 'verb-etre', 9, 3,
 'Subjunctive mood of "être" (to be). "Il est important que" requires the subjunctive.',
 'ÊTRE (subjunctive): que je sois, que tu sois, qu''il/elle soit, que nous soyons, que vous soyez, qu''ils/elles soient'),

('Je préfère que vous soyez honnêtes', 'I prefer that you be honest',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 8, 3,
 'Subjunctive mood of "être" (to be). "Je préfère que" requires the subjunctive.',
 'ÊTRE (subjunctive): que je sois, que tu sois, qu''il/elle soit, que nous soyons, que vous soyez, qu''ils/elles soient'),

('Il vaut mieux qu''elle soit prudente', 'It''s better that she be careful',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'communication'), 
 'verb-etre', 9, 3,
 'Subjunctive mood of "être" (to be). "Il vaut mieux que" requires the subjunctive.',
 'ÊTRE (subjunctive): que je sois, que tu sois, qu''il/elle soit, que nous soyons, que vous soyez, qu''ils/elles soient'),

('Nous souhaitons qu''ils soient satisfaits', 'We hope they are satisfied',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'business'), 
 'verb-etre', 8, 3,
 'Subjunctive mood of "être" (to be). "Nous souhaitons que" requires the subjunctive.',
 'ÊTRE (subjunctive): que je sois, que tu sois, qu''il/elle soit, que nous soyons, que vous soyez, qu''ils/elles soient'),

('Il est essentiel que vous soyez présents', 'It is essential that you be present',
 (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
 (SELECT id FROM language_app_categories WHERE name = 'business'), 
 'verb-etre', 9, 3,
 'Subjunctive mood of "être" (to be). "Il est essentiel que" requires the subjunctive.',
 'ÊTRE (subjunctive): que je sois, que tu sois, qu''il/elle soit, que nous soyons, que vous soyez, qu''ils/elles soient');

-- Verify the insertion
SELECT 
  dl.name as difficulty,
  COUNT(*) as phrase_count,
  'verb-etre' as phrase_set
FROM language_app_french_phrases fp
JOIN language_app_difficulty_levels dl ON fp.difficulty_id = dl.id
WHERE fp.phrase_set = 'verb-etre'
GROUP BY dl.name, dl.level_order
ORDER BY dl.level_order;
