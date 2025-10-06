-- Improve Grammar Notes to Include Verb Information
-- This script updates grammar_notes to ensure all phrases include verb tense, conjugation, and form information

-- Phrases that need verb information added to grammar_notes:

-- 1. "As-tu ceci en d'autres couleurs ?" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "avoir" (to have) in question form. "As-tu" means "do you have" and "en d''autres couleurs" means "in other colors". Informal (tu) variant converted from a "vous" form.'
WHERE text = 'As-tu ceci en d''autres couleurs ?' AND phrase_set = 'french-101';

-- 2. "Excuse-moi pour le retard" - missing verb info  
UPDATE language_app_french_phrases 
SET grammar_notes = 'Imperative form of "excuser" (to excuse). "Excuse-moi pour le retard" means "excuse me for being late". "Retard" means "delay" or "lateness". Informal (tu) variant converted from a "vous" form.'
WHERE text = 'Excuse-moi pour le retard' AND phrase_set = 'french-101';

-- 3. "L'addition, s'il te plaît" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Restaurant phrase meaning "the bill, please". "L''addition" is the bill and "s''il vous plaît" means "please". Converted "s''il vous plaît" to informal "s''il te plaît". No main verb, but includes imperative context.'
WHERE text = 'L''addition, s''il te plaît' AND phrase_set = 'french-101';

-- 4. "Oui" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Basic affirmative response. "Oui" means "yes" and "non" means "no". Not a verb but essential French responses.'
WHERE text = 'Oui' AND phrase_set = 'french-101';

-- 5. "De rien" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Response to "merci" (thank you). "De rien" literally means "of nothing" and is equivalent to "you''re welcome". No verb, but essential French politeness expression.'
WHERE text = 'De rien' AND phrase_set = 'french-101';

-- 6. "Pardon" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Simple way to say "sorry" or "excuse me". Used for minor apologies or to get someone''s attention. Not a verb but essential French politeness expression.'
WHERE text = 'Pardon' AND phrase_set = 'french-101';

-- 7. "Non" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Basic negative response. "Oui" means "yes" and "non" means "no". Not a verb but essential French responses.'
WHERE text = 'Non' AND phrase_set = 'french-101';

-- 8. "Salut !" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Informal greeting meaning "hi" or "bye". Used with friends and family, not in formal situations. Not a verb but essential French greeting.'
WHERE text = 'Salut !' AND phrase_set = 'french-101';

-- 9. "À bientôt !" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Informal way to say "see you soon". "À bientôt" is used when you expect to see someone again soon. Not a verb but essential French farewell.'
WHERE text = 'À bientôt !' AND phrase_set = 'french-101';

-- 10. "Enchanté(e) !" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Expression used when meeting someone for the first time. "Enchanté" is masculine, "Enchantée" is feminine. Past participle of "enchanter" (to enchant/delight).'
WHERE text = 'Enchanté(e) !' AND phrase_set = 'french-101';

-- 11. "Bonne journée !" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Polite way to say "have a good day". "Bonne" is feminine to agree with "journée" (day). No verb but essential French politeness expression.'
WHERE text = 'Bonne journée !' AND phrase_set = 'french-101';

-- 12. "À droite" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Prepositional phrase for giving directions. "À droite" means "to the right" and "à gauche" means "to the left". No verb but essential French directional phrase.'
WHERE text = 'À droite' AND phrase_set = 'french-101';

-- 13. "À gauche" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Prepositional phrase for giving directions. "À droite" means "to the right" and "à gauche" means "to the left". No verb but essential French directional phrase.'
WHERE text = 'À gauche' AND phrase_set = 'french-101';

-- 14. "Tout droit" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Directional phrase meaning "straight ahead". "Tout droit" is used when giving directions. No verb but essential French directional phrase.'
WHERE text = 'Tout droit' AND phrase_set = 'french-101';

-- 15. "Combien ça coûte ?" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about price using "coûter" (to cost). "Combien ça coûte?" means "how much does it cost?" Note the use of "ça" (it) as a subject.'
WHERE text = 'Combien ça coûte ?' AND phrase_set = 'french-101';

-- 16. "C'est combien ?" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about price using "être" (to be). "C''est combien?" is a more informal way to ask "how much is it?"'
WHERE text = 'C''est combien ?' AND phrase_set = 'french-101';

-- 17. "Je voudrais voir la carte" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Conditional form of "vouloir" (to want) with "voir" (to see). Restaurant phrase meaning "I would like to see the menu". "Voir" means "to see" and "la carte" means "the menu".'
WHERE text = 'Je voudrais voir la carte' AND phrase_set = 'french-101';

-- 18. "C'est délicieux !" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Restaurant phrase using "être" (to be). "C''est" means "it is" and "délicieux" means "delicious".'
WHERE text = 'C''est délicieux !' AND phrase_set = 'french-101';

-- 19. "Je suis végétarien(ne)" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be). Restaurant phrase about dietary restrictions. "Je suis végétarien" is masculine, "Je suis végétarienne" is feminine.'
WHERE text = 'Je suis végétarien(ne)' AND phrase_set = 'french-101';

-- 20. "À quelle heure part le train ?" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about train departure using "partir" (to leave). "À quelle heure" means "at what time" and "part" means "leaves".'
WHERE text = 'À quelle heure part le train ?' AND phrase_set = 'french-101';

-- 21. "Où puis-je acheter un billet ?" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question using "pouvoir" (to be able to) and "acheter" (to buy). "Où puis-je" means "where can I" and "acheter" means "to buy".'
WHERE text = 'Où puis-je acheter un billet ?' AND phrase_set = 'french-101';

-- 22. "Puis-je essayer ceci ?" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question using "pouvoir" (to be able to) and "essayer" (to try on). "Puis-je" means "can I" and "essayer" means "to try on".'
WHERE text = 'Puis-je essayer ceci ?' AND phrase_set = 'french-101';

-- 23. "C'est trop cher" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Expression using "être" (to be). "C''est trop cher" means "it''s too expensive". "Trop" means "too" and "cher" means "expensive".'
WHERE text = 'C''est trop cher' AND phrase_set = 'french-101';

-- 24. "Acceptez-vous les cartes de crédit ?" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question using "accepter" (to accept). "Acceptez-vous" means "do you accept" and "les cartes de crédit" means "credit cards".'
WHERE text = 'Acceptez-vous les cartes de crédit ?' AND phrase_set = 'french-101';

-- 25. "Ce n'est pas de ma faute" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Expression using "être" (to be) with negation. "Ce n''est pas de ma faute" means "it''s not my fault". "Faute" means "fault".'
WHERE text = 'Ce n''est pas de ma faute' AND phrase_set = 'french-101';

-- 26. "Je n'ai pas pu venir hier" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Past tense explanation using "pouvoir" (to be able to) and "venir" (to come). "Je n''ai pas pu" means "I couldn''t" and "venir" means "to come".'
WHERE text = 'Je n''ai pas pu venir hier' AND phrase_set = 'french-101';

-- 27. "Quel est le prix de ce produit ?" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question using "être" (to be). "Quel est le prix" means "what is the price" and "de ce produit" means "of this product".'
WHERE text = 'Quel est le prix de ce produit ?' AND phrase_set = 'french-101';

-- 28. "Nous devons analyser cette situation en détail" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must) with "analyser" (to analyze). Complex business phrase about analyzing a situation. "Nous devons" means "we need to" and "analyser" means "to analyze".'
WHERE text = 'Nous devons analyser cette situation en détail' AND phrase_set = 'french-101';

-- 29. "Cette proposition mérite d'être considérée" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase using "mériter" (to deserve) with infinitive construction. "Cette proposition mérite" means "this proposal deserves" and "d''être considérée" means "to be considered".'
WHERE text = 'Cette proposition mérite d''être considérée' AND phrase_set = 'french-101';

-- 30. "S'il te plaît" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Polite expression using "plaire" (to please) in subjunctive. "S''il vous plaît" is formal, "s''il te plaît" is informal. Informal (tu) variant converted from a "vous" form.'
WHERE text = 'S''il te plaît' AND phrase_set = 'french-101';

-- 31. "Nous devons prendre en compte tous les facteurs" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must) with "prendre" (to take). Business phrase about taking factors into account. "Nous devons prendre en compte" means "we need to take into account".'
WHERE text = 'Nous devons prendre en compte tous les facteurs' AND phrase_set = 'french-101';

-- 32. "Il est crucial de maintenir notre compétitivité" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Impersonal construction using "être" (to be) with infinitive. Business phrase about maintaining competitiveness. "Il est crucial de" means "it is crucial to" and "maintenir" means "to maintain".'
WHERE text = 'Il est crucial de maintenir notre compétitivité' AND phrase_set = 'french-101';

-- 33. "Je tiens à vous faire part de mes préoccupations" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Complex phrase using "tenir" (to hold) with infinitive construction. "Je tiens à" means "I would like to" and "faire part de" means "to share".'
WHERE text = 'Je tiens à vous faire part de mes préoccupations' AND phrase_set = 'french-101';

-- 34. "Cette approche s'avère être la plus efficace" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase using reflexive "s''avérer" (to prove to be). "Cette approche s''avère être" means "this approach proves to be".'
WHERE text = 'Cette approche s''avère être la plus efficace' AND phrase_set = 'french-101';

-- 35. "Nous devons nous adapter aux nouvelles circonstances" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must) with reflexive "s''adapter" (to adapt). Business phrase about adapting to circumstances. "Nous devons nous adapter" means "we need to adapt".'
WHERE text = 'Nous devons nous adapter aux nouvelles circonstances' AND phrase_set = 'french-101';

-- 36. "Il est impératif de trouver une solution rapidement" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Impersonal construction using "être" (to be) with infinitive. Business phrase about finding solutions. "Il est impératif de" means "it is imperative to" and "trouver une solution" means "to find a solution".'
WHERE text = 'Il est impératif de trouver une solution rapidement' AND phrase_set = 'french-101';

-- 37. "Cette théorie nécessite une validation empirique" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Academic phrase using "nécessiter" (to require). "Cette théorie nécessite" means "this theory requires" and "une validation empirique" means "empirical validation".'
WHERE text = 'Cette théorie nécessite une validation empirique' AND phrase_set = 'french-101';

-- 38. "Les données suggèrent une corrélation significative" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Academic phrase using "suggérer" (to suggest). "Les données suggèrent" means "the data suggests" and "une corrélation significative" means "a significant correlation".'
WHERE text = 'Les données suggèrent une corrélation significative' AND phrase_set = 'french-101';

-- 39. "Nous devons examiner cette question sous tous les angles" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must) with "examiner" (to examine). Academic phrase about examining questions. "Nous devons examiner" means "we need to examine".'
WHERE text = 'Nous devons examiner cette question sous tous les angles' AND phrase_set = 'french-101';

-- 40. "Cette hypothèse mérite d'être testée rigoureusement" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Academic phrase using "mériter" (to deserve) with infinitive construction. "Cette hypothèse mérite" means "this hypothesis deserves" and "d''être testée rigoureusement" means "to be tested rigorously".'
WHERE text = 'Cette hypothèse mérite d''être testée rigoureusement' AND phrase_set = 'french-101';

-- 41. "Nous devons évaluer les risques et les opportunités" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must) with "évaluer" (to assess). Business phrase about assessing risks and opportunities. "Nous devons évaluer" means "we need to assess".'
WHERE text = 'Nous devons évaluer les risques et les opportunités' AND phrase_set = 'french-101';

-- 42. "Cette stratégie s'inscrit dans notre vision à long terme" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase using reflexive "s''inscrire" (to fit into). "Cette stratégie s''inscrit" means "this strategy fits" and "dans notre vision à long terme" means "into our long-term vision".'
WHERE text = 'Cette stratégie s''inscrit dans notre vision à long terme' AND phrase_set = 'french-101';

-- 43. "Il faut anticiper les conséquences de nos actions" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase using "falloir" (to be necessary) with infinitive. "Il faut anticiper" means "we must anticipate" and "les conséquences de nos actions" means "the consequences of our actions".'
WHERE text = 'Il faut anticiper les conséquences de nos actions' AND phrase_set = 'french-101';

-- 44. "Cette décision aura un impact considérable" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase using "avoir" (to have) in future tense. "Cette décision aura" means "this decision will have" and "un impact considérable" means "a considerable impact".'
WHERE text = 'Cette décision aura un impact considérable' AND phrase_set = 'french-101';

-- 45. "Nous avons atteint nos objectifs avec succès" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase using "atteindre" (to achieve) in past tense. "Nous avons atteint" means "we have achieved" and "nos objectifs avec succès" means "our goals successfully".'
WHERE text = 'Nous avons atteint nos objectifs avec succès' AND phrase_set = 'french-101';

-- 46. "Cette réalisation témoigne de notre expertise" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase using "témoigner" (to demonstrate). "Cette réalisation témoigne" means "this achievement demonstrates" and "de notre expertise" means "our expertise".'
WHERE text = 'Cette réalisation témoigne de notre expertise' AND phrase_set = 'french-101';

-- 47. "Nous avons surmonté tous les obstacles" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase using "surmonter" (to overcome) in past tense. "Nous avons surmonté" means "we have overcome" and "tous les obstacles" means "all obstacles".'
WHERE text = 'Nous avons surmonté tous les obstacles' AND phrase_set = 'french-101';

-- 48. "Cette victoire est le fruit de notre persévérance" - missing verb info
UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase using "être" (to be). "Cette victoire est le fruit" means "this victory is the result" and "de notre persévérance" means "of our perseverance".'
WHERE text = 'Cette victoire est le fruit de notre persévérance' AND phrase_set = 'french-101';

-- Verify the updates
SELECT 
  text,
  grammar_notes,
  phrase_set
FROM language_app_french_phrases 
WHERE phrase_set IN ('french-101', 'verb-etre', 'french-proverbs')
ORDER BY phrase_set, text
LIMIT 10;
