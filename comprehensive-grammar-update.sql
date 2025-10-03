-- Comprehensive Grammar Update for All 75 Phrases
-- This script adds grammar_notes and verb_conjugation to all phrases in the database

-- First, add the verb_conjugation column if it doesn't exist
ALTER TABLE language_app_french_phrases 
ADD COLUMN IF NOT EXISTS verb_conjugation TEXT;

-- BEGINNER PHRASES (Difficulty Level 1) - High Priority
-- Basic greetings and essential phrases

-- "Bonjour, comment allez-vous ?"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "aller" (to go). "Comment allez-vous?" is the formal way to ask "how are you?" Note: "Comment vas-tu?" is informal.',
    verb_conjugation = 'ALLER (to go): je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont'
WHERE text = 'Bonjour, comment allez-vous ?';

-- "Comment allez-vous ?" (duplicate)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "aller" (to go). "Comment allez-vous?" is the formal way to ask "how are you?" Note: "Comment vas-tu?" is informal.',
    verb_conjugation = 'ALLER (to go): je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont'
WHERE text = 'Comment allez-vous ?';

-- "Je m'appelle Marie"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Reflexive verb "s''appeler" (to call oneself). The reflexive pronoun "me" changes to "m''" before a vowel. Note: "Je m''appelle" is always used for names.',
    verb_conjugation = 'S''APPELER (to call oneself): je m''appelle, tu t''appelles, il/elle s''appelle, nous nous appelons, vous vous appelez, ils/elles s''appellent'
WHERE text = 'Je m''appelle Marie';

-- "Comment vous appelez-vous ?"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Reflexive verb "s''appeler" in question form. "Comment vous appelez-vous?" is formal, "Comment tu t''appelles?" is informal.',
    verb_conjugation = 'S''APPELER (to call oneself): je m''appelle, tu t''appelles, il/elle s''appelle, nous nous appelons, vous vous appelez, ils/elles s''appellent'
WHERE text = 'Comment vous appelez-vous ?';

-- "Excusez-moi"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Imperative form of "excuser". "Excusez-moi" is formal, "Excuse-moi" is informal. Used to get attention or apologize.',
    verb_conjugation = 'EXCUSER (to excuse): j''excuse, tu excuses, il/elle excuse, nous excusons, vous excusez, ils/elles excusent'
WHERE text = 'Excusez-moi';

-- "Où est la gare ?"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" with location. "Où est" means "where is" for singular nouns. "Où sont" is used for plural nouns.',
    verb_conjugation = 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'
WHERE text = 'Où est la gare ?';

-- "Où est... ?"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" with location. "Où est" means "where is" for singular nouns. "Où sont" is used for plural nouns.',
    verb_conjugation = 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'
WHERE text = 'Où est... ?';

-- "Je vais bien"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "aller" (to go). "Je vais bien" means "I am doing well" or "I am fine". Used to respond to "Comment allez-vous?"',
    verb_conjugation = 'ALLER (to go): je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont'
WHERE text = 'Je vais bien';

-- "Je voudrais..."
UPDATE language_app_french_phrases 
SET grammar_notes = 'Conditional form of "vouloir" (to want). "Je voudrais" is more polite than "je veux". Used for requests and preferences.',
    verb_conjugation = 'VOULOIR (to want): je veux, tu veux, il/elle veut, nous voulons, vous voulez, ils/elles veulent'
WHERE text = 'Je voudrais...';

-- "Je ne comprends pas" (both instances)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "comprendre" (to understand) with negation. "Je ne comprends pas" is a very useful phrase for learners.',
    verb_conjugation = 'COMPRENDRE (to understand): je comprends, tu comprends, il/elle comprend, nous comprenons, vous comprenez, ils/elles comprennent'
WHERE text = 'Je ne comprends pas';

-- INTERMEDIATE PHRASES (Difficulty Level 2) - Medium Priority
-- More complex structures and common verbs

-- "Je voudrais réserver une table pour deux personnes"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Conditional form of "vouloir" (to want). "Je voudrais" is more polite than "je veux". Note the use of "pour" (for) to indicate purpose.',
    verb_conjugation = 'VOULOIR (to want): je veux, tu veux, il/elle veut, nous voulons, vous voulez, ils/elles veulent'
WHERE text = 'Je voudrais réserver une table pour deux personnes';

-- "Pouvez-vous m'aider, s'il vous plaît ?"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "pouvoir" (to be able to) in question form. "Pouvez-vous" is formal, "Peux-tu" is informal. "S''il vous plaît" means "please".',
    verb_conjugation = 'POUVOIR (to be able to): je peux, tu peux, il/elle peut, nous pouvons, vous pouvez, ils/elles peuvent'
WHERE text = 'Pouvez-vous m''aider, s''il vous plaît ?';

-- "Je suis désolé, je suis en retard"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be). "Je suis désolé" is masculine, "Je suis désolée" is feminine. "En retard" means "late".',
    verb_conjugation = 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'
WHERE text = 'Je suis désolé, je suis en retard';

-- "Je suis vraiment désolé(e)"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be) with "vraiment" (really). "Je suis désolé" is masculine, "Je suis désolée" is feminine.',
    verb_conjugation = 'ÊTRE (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont'
WHERE text = 'Je suis vraiment désolé(e)';

-- "Parlez-vous anglais ?"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "parler" (to speak) in question form. "Parlez-vous" is formal, "Parles-tu" is informal.',
    verb_conjugation = 'PARLER (to speak): je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent'
WHERE text = 'Parlez-vous anglais ?';

-- "Je ne parle pas très bien français"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "parler" (to speak) with negation. "Très bien" means "very well". Note the placement of "pas" after the verb.',
    verb_conjugation = 'PARLER (to speak): je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent'
WHERE text = 'Je ne parle pas très bien français';

-- "Pouvez-vous répéter, s'il vous plaît ?"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "pouvoir" (to be able to) with "répéter" (to repeat). "Pouvez-vous" is formal, "Peux-tu" is informal.',
    verb_conjugation = 'POUVOIR (to be able to): je peux, tu peux, il/elle peut, nous pouvons, vous pouvez, ils/elles peuvent'
WHERE text = 'Pouvez-vous répéter, s''il vous plaît ?';

-- "Pourriez-vous parler plus lentement ?"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Conditional form of "pouvoir" (to be able to) with "parler" (to speak). "Pourriez-vous" is very polite. "Plus lentement" means "more slowly".',
    verb_conjugation = 'POUVOIR (to be able to): je peux, tu peux, il/elle peut, nous pouvons, vous pouvez, ils/elles peuvent'
WHERE text = 'Pourriez-vous parler plus lentement ?';

-- "Je me suis perdu(e)"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Reflexive verb "se perdre" (to get lost) in past tense. "Je me suis perdu" is masculine, "Je me suis perdue" is feminine.',
    verb_conjugation = 'SE PERDRE (to get lost): je me perds, tu te perds, il/elle se perd, nous nous perdons, vous vous perdez, ils/elles se perdent'
WHERE text = 'Je me suis perdu(e)';

-- "Pouvez-vous m'indiquer le chemin ?"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "pouvoir" (to be able to) with "indiquer" (to indicate/show). "Pouvez-vous" is formal, "Peux-tu" is informal.',
    verb_conjugation = 'POUVOIR (to be able to): je peux, tu peux, il/elle peut, nous pouvons, vous pouvez, ils/elles peuvent'
WHERE text = 'Pouvez-vous m''indiquer le chemin ?';

-- ADVANCED PHRASES (Difficulty Level 3) - Lower Priority
-- Complex structures and business/professional language

-- "J'aimerais discuter de cette proposition avec vous"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Conditional form of "aimer" (to like/love) with "discuter" (to discuss). "J''aimerais" is more polite than "j''aime". Note the use of "de" before "cette proposition".',
    verb_conjugation = 'AIMER (to like/love): j''aime, tu aimes, il/elle aime, nous aimons, vous aimez, ils/elles aiment'
WHERE text = 'J''aimerais discuter de cette proposition avec vous';

-- "Nous devons prendre une décision rapidement"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must) with "prendre" (to take/make). "Nous devons" means "we must" or "we have to".',
    verb_conjugation = 'DEVOIR (to have to): je dois, tu dois, il/elle doit, nous devons, vous devez, ils/elles doivent'
WHERE text = 'Nous devons prendre une décision rapidement';

-- "Il faut que je vous dise quelque chose d'important"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Subjunctive mood with "il faut que" (it is necessary that). "Que je vous dise" is the subjunctive form of "dire" (to say).',
    verb_conjugation = 'DIRE (to say): je dis, tu dis, il/elle dit, nous disons, vous dites, ils/elles disent'
WHERE text = 'Il faut que je vous dise quelque chose d''important';

-- "Malgré les difficultés, nous avons réussi"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Past tense of "réussir" (to succeed). "Nous avons réussi" uses the auxiliary verb "avoir" (to have). "Malgré" means "despite".',
    verb_conjugation = 'RÉUSSIR (to succeed): je réussis, tu réussis, il/elle réussit, nous réussissons, vous réussissez, ils/elles réussissent'
WHERE text = 'Malgré les difficultés, nous avons réussi';

-- "Il est essentiel de bien comprendre cette situation"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Impersonal construction with "il est essentiel de" (it is essential to). "Bien comprendre" means "to understand well".',
    verb_conjugation = 'COMPRENDRE (to understand): je comprends, tu comprends, il/elle comprend, nous comprenons, vous comprenez, ils/elles comprennent'
WHERE text = 'Il est essentiel de bien comprendre cette situation';

-- Add some basic grammar notes for simple phrases that don't need verb conjugations

-- "Merci beaucoup"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Simple expression of gratitude. "Merci" means "thank you" and "beaucoup" means "a lot" or "very much".'
WHERE text = 'Merci beaucoup';

-- "De rien"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Response to "merci" (thank you). "De rien" literally means "of nothing" and is equivalent to "you''re welcome".'
WHERE text = 'De rien';

-- "S'il vous plaît"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Polite expression meaning "please". "S''il vous plaît" is formal, "s''il te plaît" is informal.'
WHERE text = 'S''il vous plaît';

-- "Pardon"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Simple way to say "sorry" or "excuse me". Used for minor apologies or to get someone''s attention.'
WHERE text = 'Pardon';

-- "Oui" and "Non"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Basic affirmative and negative responses. "Oui" means "yes" and "non" means "no".'
WHERE text = 'Oui';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Basic affirmative and negative responses. "Oui" means "yes" and "non" means "no".'
WHERE text = 'Non';

-- "Salut !"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Informal greeting meaning "hi" or "bye". Used with friends and family, not in formal situations.'
WHERE text = 'Salut !';

-- "À bientôt !"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Informal way to say "see you soon". "À bientôt" is used when you expect to see someone again soon.'
WHERE text = 'À bientôt !';

-- "Enchanté(e) !"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Expression used when meeting someone for the first time. "Enchanté" is masculine, "Enchantée" is feminine.'
WHERE text = 'Enchanté(e) !';

-- "Bonne journée !"
UPDATE language_app_french_phrases 
SET grammar_notes = 'Polite way to say "have a good day". "Bonne" is feminine to agree with "journée" (day).'
WHERE text = 'Bonne journée !';

-- Direction phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Prepositional phrases for giving directions. "À droite" means "to the right" and "à gauche" means "to the left".'
WHERE text = 'À droite';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Prepositional phrases for giving directions. "À droite" means "to the right" and "à gauche" means "to the left".'
WHERE text = 'À gauche';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Directional phrase meaning "straight ahead". "Tout droit" is used when giving directions.'
WHERE text = 'Tout droit';

-- Shopping phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about price. "Combien ça coûte?" means "how much does it cost?" Note the use of "ça" (it) as a subject.'
WHERE text = 'Combien ça coûte ?';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about price. "C''est combien?" is a more informal way to ask "how much is it?"'
WHERE text = 'C''est combien ?';

-- Restaurant phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Restaurant phrase meaning "the bill, please". "L''addition" is the bill and "s''il vous plaît" means "please".'
WHERE text = 'L''addition, s''il vous plaît';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Restaurant phrase meaning "I would like to see the menu". "Voir" means "to see" and "la carte" means "the menu".'
WHERE text = 'Je voudrais voir la carte';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Restaurant phrase meaning "it''s delicious!". "C''est" means "it is" and "délicieux" means "delicious".'
WHERE text = 'C''est délicieux !';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Restaurant phrase about dietary restrictions. "Je suis végétarien" is masculine, "Je suis végétarienne" is feminine.'
WHERE text = 'Je suis végétarien(ne)';

-- Transportation phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about train departure time. "À quelle heure" means "at what time" and "part" means "leaves".'
WHERE text = 'À quelle heure part le train ?';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about where to buy tickets. "Où puis-je" means "where can I" and "acheter" means "to buy".'
WHERE text = 'Où puis-je acheter un billet ?';

-- Shopping phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about product availability. "Avez-vous" means "do you have" and "en d''autres couleurs" means "in other colors".'
WHERE text = 'Avez-vous ceci en d''autres couleurs ?';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about trying on clothes. "Puis-je" means "can I" and "essayer" means "to try on".'
WHERE text = 'Puis-je essayer ceci ?';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Expression about price. "C''est trop cher" means "it''s too expensive". "Trop" means "too" and "cher" means "expensive".'
WHERE text = 'C''est trop cher';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about payment methods. "Acceptez-vous" means "do you accept" and "les cartes de crédit" means "credit cards".'
WHERE text = 'Acceptez-vous les cartes de crédit ?';

-- Apology phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Expression about fault. "Ce n''est pas de ma faute" means "it''s not my fault". "Faute" means "fault".'
WHERE text = 'Ce n''est pas de ma faute';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Apology for being late. "Excusez-moi pour le retard" means "excuse me for being late". "Retard" means "delay" or "lateness".'
WHERE text = 'Excusez-moi pour le retard';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Explanation about not being able to come. "Je n''ai pas pu" means "I couldn''t" and "venir" means "to come".'
WHERE text = 'Je n''ai pas pu venir hier';

-- Business phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about product price. "Quel est le prix" means "what is the price" and "de ce produit" means "of this product".'
WHERE text = 'Quel est le prix de ce produit ?';

-- Add some basic grammar notes for the remaining advanced phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Complex business phrase about analyzing a situation. "Nous devons" means "we need to" and "analyser" means "to analyze".'
WHERE text = 'Nous devons analyser cette situation en détail';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase about considering a proposal. "Cette proposition mérite" means "this proposal deserves" and "d''être considérée" means "to be considered".'
WHERE text = 'Cette proposition mérite d''être considérée';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase about taking factors into account. "Nous devons prendre en compte" means "we need to take into account".'
WHERE text = 'Nous devons prendre en compte tous les facteurs';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase about maintaining competitiveness. "Il est crucial de" means "it is crucial to" and "maintenir" means "to maintain".'
WHERE text = 'Il est crucial de maintenir notre compétitivité';

-- Add some basic grammar notes for the remaining phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Complex phrase about sharing concerns. "Je tiens à" means "I would like to" and "faire part de" means "to share".'
WHERE text = 'Je tiens à vous faire part de mes préoccupations';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase about approach effectiveness. "Cette approche s''avère être" means "this approach proves to be".'
WHERE text = 'Cette approche s''avère être la plus efficace';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase about adapting to circumstances. "Nous devons nous adapter" means "we need to adapt" and "aux nouvelles circonstances" means "to new circumstances".'
WHERE text = 'Nous devons nous adapter aux nouvelles circonstances';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase about finding solutions. "Il est impératif de" means "it is imperative to" and "trouver une solution" means "to find a solution".'
WHERE text = 'Il est impératif de trouver une solution rapidement';

-- Add some basic grammar notes for the remaining academic/professional phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Academic phrase about theory validation. "Cette théorie nécessite" means "this theory requires" and "une validation empirique" means "empirical validation".'
WHERE text = 'Cette théorie nécessite une validation empirique';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Academic phrase about data correlation. "Les données suggèrent" means "the data suggests" and "une corrélation significative" means "a significant correlation".'
WHERE text = 'Les données suggèrent une corrélation significative';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Academic phrase about examining questions. "Nous devons examiner" means "we need to examine" and "sous tous les angles" means "from all angles".'
WHERE text = 'Nous devons examiner cette question sous tous les angles';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Academic phrase about testing hypotheses. "Cette hypothèse mérite" means "this hypothesis deserves" and "d''être testée rigoureusement" means "to be tested rigorously".'
WHERE text = 'Cette hypothèse mérite d''être testée rigoureusement';

-- Add some basic grammar notes for the remaining decision-making phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase about assessing risks and opportunities. "Nous devons évaluer" means "we need to assess" and "les risques et les opportunités" means "the risks and opportunities".'
WHERE text = 'Nous devons évaluer les risques et les opportunités';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase about long-term strategy. "Cette stratégie s''inscrit" means "this strategy fits" and "dans notre vision à long terme" means "into our long-term vision".'
WHERE text = 'Cette stratégie s''inscrit dans notre vision à long terme';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase about anticipating consequences. "Il faut anticiper" means "we must anticipate" and "les conséquences de nos actions" means "the consequences of our actions".'
WHERE text = 'Il faut anticiper les conséquences de nos actions';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase about decision impact. "Cette décision aura" means "this decision will have" and "un impact considérable" means "a considerable impact".'
WHERE text = 'Cette décision aura un impact considérable';

-- Add some basic grammar notes for the remaining success phrases
UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase about achieving goals. "Nous avons atteint" means "we have achieved" and "nos objectifs avec succès" means "our goals successfully".'
WHERE text = 'Nous avons atteint nos objectifs avec succès';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase about demonstrating expertise. "Cette réalisation témoigne" means "this achievement demonstrates" and "de notre expertise" means "our expertise".'
WHERE text = 'Cette réalisation témoigne de notre expertise';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase about overcoming obstacles. "Nous avons surmonté" means "we have overcome" and "tous les obstacles" means "all obstacles".'
WHERE text = 'Nous avons surmonté tous les obstacles';

UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase about perseverance. "Cette victoire est le fruit" means "this victory is the result" and "de notre persévérance" means "of our perseverance".'
WHERE text = 'Cette victoire est le fruit de notre persévérance';
