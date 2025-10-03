-- Add verb conjugation field to existing phrases table
-- This will store verb conjugations and grammar explanations

-- Add verb_conjugation column to the phrases table
ALTER TABLE language_app_french_phrases 
ADD COLUMN verb_conjugation TEXT;

-- Add some grammar explanations to existing phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "aller" (to go). Note: "comment allez-vous?" is the formal way to ask "how are you?"'
WHERE text = 'Comment allez-vous ?';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Reflexive verb "s''appeler" (to call oneself). The reflexive pronoun "me" changes to "m''" before a vowel.'
WHERE text = 'Je m''appelle Marie';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "vouloir" (to want). "Je voudrais" is the conditional form, more polite than "je veux".'
WHERE text = 'Je voudrais réserver une table pour deux personnes';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "pouvoir" (to be able to). "Pouvez-vous" is the formal question form.'
WHERE text = 'Pouvez-vous m''aider, s''il vous plaît ?';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "comprendre" (to understand). "Je ne comprends pas" is a very useful phrase for learners.'
WHERE text = 'Je ne comprends pas';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be). "Je suis désolé" is masculine, "Je suis désolée" is feminine.'
WHERE text = 'Je suis désolé, je suis en retard';

-- Add verb conjugations for key verbs
UPDATE language_app_french_phrases 
SET verb_conjugation = 'ALLER (to go): je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont'
WHERE text = 'Comment allez-vous ?';

UPDATE language_app_french_phrases 
SET verb_conjugation = 'S''APPELER (to call oneself): je m''appelle, tu t''appelles, il/elle s''appelle, nous nous appelons, vous vous appelez, ils/elles s''appellent'
WHERE text = 'Je m''appelle Marie';

UPDATE language_app_french_phrases 
SET verb_conjugation = 'VOULOIR (to want): je veux, tu veux, il/elle veut, nous voulons, vous voulez, ils/elles veulent'
WHERE text = 'Je voudrais réserver une table pour deux personnes';

UPDATE language_app_french_phrases 
SET verb_conjugation = 'POUVOIR (to be able to): je peux, tu peux, il/elle peut, nous pouvons, vous pouvez, ils/elles peuvent'
WHERE text = 'Pouvez-vous m''aider, s''il vous plaît ?';

UPDATE language_app_french_phrases 
SET verb_conjugation = 'COMPRENDRE (to understand): je comprends, tu comprends, il/elle comprend, nous comprenons, vous comprenez, ils/elles comprennent'
WHERE text = 'Je ne comprends pas';

UPDATE language_app_french_phrases 
SET verb_conjugation = 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'
WHERE text = 'Je suis désolé, je suis en retard';

-- Add some additional grammar explanations for common phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Imperative form of "excuser". "Excusez-moi" is formal, "Excuse-moi" is informal.'
WHERE text = 'Excusez-moi';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" with location. "Où est" means "where is" for singular nouns.'
WHERE text = 'Où est la gare ?';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "aimer" (to like/love). "J''aimerais" is conditional, more polite than "j''aime".'
WHERE text = 'J''aimerais discuter de cette proposition avec vous';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must). "Nous devons" means "we must" or "we have to".'
WHERE text = 'Nous devons prendre une décision rapidement';

-- Add verb conjugations for these additional phrases
UPDATE language_app_french_phrases 
SET verb_conjugation = 'EXCUSER (to excuse): j''excuse, tu excuses, il/elle excuse, nous excusons, vous excusez, ils/elles excusent'
WHERE text = 'Excusez-moi';

UPDATE language_app_french_phrases 
SET verb_conjugation = 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'
WHERE text = 'Où est la gare ?';

UPDATE language_app_french_phrases 
SET verb_conjugation = 'AIMER (to like/love): j''aime, tu aimes, il/elle aime, nous aimons, vous aimez, ils/elles aiment'
WHERE text = 'J''aimerais discuter de cette proposition avec vous';

UPDATE language_app_french_phrases 
SET verb_conjugation = 'DEVOIR (to have to): je dois, tu dois, il/elle doit, nous devons, vous devez, ils/elles doivent'
WHERE text = 'Nous devons prendre une décision rapidement';
