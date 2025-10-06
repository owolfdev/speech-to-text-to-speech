-- Improve Grammar Notes to Include Verb Information (Version 2)
-- This script ONLY updates phrases that actually contain verbs but are missing verb information

-- Phrases with verbs that need verb information added:

-- 1. "As-tu ceci en d'autres couleurs ?" - verb: avoir
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "avoir" (to have) in question form. "As-tu" means "do you have" and "en d''autres couleurs" means "in other colors". Informal (tu) variant converted from a "vous" form.'
WHERE text = 'As-tu ceci en d''autres couleurs ?' AND phrase_set = 'french-101';

-- 2. "Excuse-moi pour le retard" - verb: excuser
UPDATE language_app_french_phrases 
SET grammar_notes = 'Imperative form of "excuser" (to excuse). "Excuse-moi pour le retard" means "excuse me for being late". "Retard" means "delay" or "lateness". Informal (tu) variant converted from a "vous" form.'
WHERE text = 'Excuse-moi pour le retard' AND phrase_set = 'french-101';

-- 3. "Combien ça coûte ?" - verb: coûter
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about price using "coûter" (to cost). "Combien ça coûte?" means "how much does it cost?" Note the use of "ça" (it) as a subject.'
WHERE text = 'Combien ça coûte ?' AND phrase_set = 'french-101';

-- 4. "C'est combien ?" - verb: être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about price using "être" (to be). "C''est combien?" is a more informal way to ask "how much is it?"'
WHERE text = 'C''est combien ?' AND phrase_set = 'french-101';

-- 5. "Je voudrais voir la carte" - verbs: vouloir + voir
UPDATE language_app_french_phrases 
SET grammar_notes = 'Conditional form of "vouloir" (to want) with "voir" (to see). Restaurant phrase meaning "I would like to see the menu". "Voir" means "to see" and "la carte" means "the menu".'
WHERE text = 'Je voudrais voir la carte' AND phrase_set = 'french-101';

-- 6. "C'est délicieux !" - verb: être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Restaurant phrase using "être" (to be). "C''est" means "it is" and "délicieux" means "delicious".'
WHERE text = 'C''est délicieux !' AND phrase_set = 'french-101';

-- 7. "À quelle heure part le train ?" - verb: partir
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question about train departure using "partir" (to leave). "À quelle heure" means "at what time" and "part" means "leaves".'
WHERE text = 'À quelle heure part le train ?' AND phrase_set = 'french-101';

-- 8. "Où puis-je acheter un billet ?" - verbs: pouvoir + acheter
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question using "pouvoir" (to be able to) and "acheter" (to buy). "Où puis-je" means "where can I" and "acheter" means "to buy".'
WHERE text = 'Où puis-je acheter un billet ?' AND phrase_set = 'french-101';

-- 9. "Puis-je essayer ceci ?" - verbs: pouvoir + essayer
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question using "pouvoir" (to be able to) and "essayer" (to try on). "Puis-je" means "can I" and "essayer" means "to try on".'
WHERE text = 'Puis-je essayer ceci ?' AND phrase_set = 'french-101';

-- 10. "C'est trop cher" - verb: être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Expression using "être" (to be). "C''est trop cher" means "it''s too expensive". "Trop" means "too" and "cher" means "expensive".'
WHERE text = 'C''est trop cher' AND phrase_set = 'french-101';

-- 11. "Acceptez-vous les cartes de crédit ?" - verb: accepter
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question using "accepter" (to accept). "Acceptez-vous" means "do you accept" and "les cartes de crédit" means "credit cards".'
WHERE text = 'Acceptez-vous les cartes de crédit ?' AND phrase_set = 'french-101';

-- 12. "Ce n'est pas de ma faute" - verb: être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Expression using "être" (to be) with negation. "Ce n''est pas de ma faute" means "it''s not my fault". "Faute" means "fault".'
WHERE text = 'Ce n''est pas de ma faute' AND phrase_set = 'french-101';

-- 13. "Je n'ai pas pu venir hier" - verbs: avoir + pouvoir + venir
UPDATE language_app_french_phrases 
SET grammar_notes = 'Past tense explanation using "pouvoir" (to be able to) and "venir" (to come). "Je n''ai pas pu" means "I couldn''t" and "venir" means "to come".'
WHERE text = 'Je n''ai pas pu venir hier' AND phrase_set = 'french-101';

-- 14. "Quel est le prix de ce produit ?" - verb: être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Question using "être" (to be). "Quel est le prix" means "what is the price" and "de ce produit" means "of this product".'
WHERE text = 'Quel est le prix de ce produit ?' AND phrase_set = 'french-101';

-- 15. "Nous devons analyser cette situation en détail" - verb: devoir + analyser
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must) with "analyser" (to analyze). Complex business phrase about analyzing a situation. "Nous devons" means "we need to" and "analyser" means "to analyze".'
WHERE text = 'Nous devons analyser cette situation en détail' AND phrase_set = 'french-101';

-- 16. "Cette proposition mérite d'être considérée" - verb: mériter + être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase using "mériter" (to deserve) with infinitive construction. "Cette proposition mérite" means "this proposal deserves" and "d''être considérée" means "to be considered".'
WHERE text = 'Cette proposition mérite d''être considérée' AND phrase_set = 'french-101';

-- 17. "S'il te plaît" - verb: plaire (subjunctive)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Polite expression using "plaire" (to please) in subjunctive. "S''il vous plaît" is formal, "s''il te plaît" is informal. Informal (tu) variant converted from a "vous" form.'
WHERE text = 'S''il te plaît' AND phrase_set = 'french-101';

-- 18. "Nous devons prendre en compte tous les facteurs" - verb: devoir + prendre
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must) with "prendre" (to take). Business phrase about taking factors into account. "Nous devons prendre en compte" means "we need to take into account".'
WHERE text = 'Nous devons prendre en compte tous les facteurs' AND phrase_set = 'french-101';

-- 19. "Il est crucial de maintenir notre compétitivité" - verb: être + maintenir
UPDATE language_app_french_phrases 
SET grammar_notes = 'Impersonal construction using "être" (to be) with infinitive. Business phrase about maintaining competitiveness. "Il est crucial de" means "it is crucial to" and "maintenir" means "to maintain".'
WHERE text = 'Il est crucial de maintenir notre compétitivité' AND phrase_set = 'french-101';

-- 20. "Je tiens à vous faire part de mes préoccupations" - verb: tenir + faire
UPDATE language_app_french_phrases 
SET grammar_notes = 'Complex phrase using "tenir" (to hold) with infinitive construction. "Je tiens à" means "I would like to" and "faire part de" means "to share".'
WHERE text = 'Je tiens à vous faire part de mes préoccupations' AND phrase_set = 'french-101';

-- 21. "Cette approche s'avère être la plus efficace" - verb: s'avérer + être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase using reflexive "s''avérer" (to prove to be). "Cette approche s''avère être" means "this approach proves to be".'
WHERE text = 'Cette approche s''avère être la plus efficace' AND phrase_set = 'french-101';

-- 22. "Nous devons nous adapter aux nouvelles circonstances" - verb: devoir + s'adapter
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must) with reflexive "s''adapter" (to adapt). Business phrase about adapting to circumstances. "Nous devons nous adapter" means "we need to adapt".'
WHERE text = 'Nous devons nous adapter aux nouvelles circonstances' AND phrase_set = 'french-101';

-- 23. "Il est impératif de trouver une solution rapidement" - verb: être + trouver
UPDATE language_app_french_phrases 
SET grammar_notes = 'Impersonal construction using "être" (to be) with infinitive. Business phrase about finding solutions. "Il est impératif de" means "it is imperative to" and "trouver une solution" means "to find a solution".'
WHERE text = 'Il est impératif de trouver une solution rapidement' AND phrase_set = 'french-101';

-- 24. "Cette théorie nécessite une validation empirique" - verb: nécessiter
UPDATE language_app_french_phrases 
SET grammar_notes = 'Academic phrase using "nécessiter" (to require). "Cette théorie nécessite" means "this theory requires" and "une validation empirique" means "empirical validation".'
WHERE text = 'Cette théorie nécessite une validation empirique' AND phrase_set = 'french-101';

-- 25. "Les données suggèrent une corrélation significative" - verb: suggérer
UPDATE language_app_french_phrases 
SET grammar_notes = 'Academic phrase using "suggérer" (to suggest). "Les données suggèrent" means "the data suggests" and "une corrélation significative" means "a significant correlation".'
WHERE text = 'Les données suggèrent une corrélation significative' AND phrase_set = 'french-101';

-- 26. "Nous devons examiner cette question sous tous les angles" - verb: devoir + examiner
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must) with "examiner" (to examine). Academic phrase about examining questions. "Nous devons examiner" means "we need to examine".'
WHERE text = 'Nous devons examiner cette question sous tous les angles' AND phrase_set = 'french-101';

-- 27. "Cette hypothèse mérite d'être testée rigoureusement" - verb: mériter + être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Academic phrase using "mériter" (to deserve) with infinitive construction. "Cette hypothèse mérite" means "this hypothesis deserves" and "d''être testée rigoureusement" means "to be tested rigorously".'
WHERE text = 'Cette hypothèse mérite d''être testée rigoureusement' AND phrase_set = 'french-101';

-- 28. "Nous devons évaluer les risques et les opportunités" - verb: devoir + évaluer
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "devoir" (to have to/must) with "évaluer" (to assess). Business phrase about assessing risks and opportunities. "Nous devons évaluer" means "we need to assess".'
WHERE text = 'Nous devons évaluer les risques et les opportunités' AND phrase_set = 'french-101';

-- 29. "Cette stratégie s'inscrit dans notre vision à long terme" - verb: s'inscrire
UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase using reflexive "s''inscrire" (to fit into). "Cette stratégie s''inscrit" means "this strategy fits" and "dans notre vision à long terme" means "into our long-term vision".'
WHERE text = 'Cette stratégie s''inscrit dans notre vision à long terme' AND phrase_set = 'french-101';

-- 30. "Il faut anticiper les conséquences de nos actions" - verb: falloir + anticiper
UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase using "falloir" (to be necessary) with infinitive. "Il faut anticiper" means "we must anticipate" and "les conséquences de nos actions" means "the consequences of our actions".'
WHERE text = 'Il faut anticiper les conséquences de nos actions' AND phrase_set = 'french-101';

-- 31. "Cette décision aura un impact considérable" - verb: avoir (future)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Business phrase using "avoir" (to have) in future tense. "Cette décision aura" means "this decision will have" and "un impact considérable" means "a considerable impact".'
WHERE text = 'Cette décision aura un impact considérable' AND phrase_set = 'french-101';

-- 32. "Nous avons atteint nos objectifs avec succès" - verb: atteindre (past)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase using "atteindre" (to achieve) in past tense. "Nous avons atteint" means "we have achieved" and "nos objectifs avec succès" means "our goals successfully".'
WHERE text = 'Nous avons atteint nos objectifs avec succès' AND phrase_set = 'french-101';

-- 33. "Cette réalisation témoigne de notre expertise" - verb: témoigner
UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase using "témoigner" (to demonstrate). "Cette réalisation témoigne" means "this achievement demonstrates" and "de notre expertise" means "our expertise".'
WHERE text = 'Cette réalisation témoigne de notre expertise' AND phrase_set = 'french-101';

-- 34. "Nous avons surmonté tous les obstacles" - verb: surmonter (past)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase using "surmonter" (to overcome) in past tense. "Nous avons surmonté" means "we have overcome" and "tous les obstacles" means "all obstacles".'
WHERE text = 'Nous avons surmonté tous les obstacles' AND phrase_set = 'french-101';

-- 35. "Cette victoire est le fruit de notre persévérance" - verb: être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Success phrase using "être" (to be). "Cette victoire est le fruit" means "this victory is the result" and "de notre persévérance" means "of our perseverance".'
WHERE text = 'Cette victoire est le fruit de notre persévérance' AND phrase_set = 'french-101';

-- PROVERBS - These are the ones you mentioned that I missed:

-- 36. "Petit à petit, l'oiseau fait son nid." - verb: faire
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "faire" (to make/do). "Petit à petit" is a common French expression meaning "gradually". "L''oiseau fait son nid" means "the bird makes its nest".'
WHERE text = 'Petit à petit, l''oiseau fait son nid.' AND phrase_set = 'french-proverbs';

-- 37. "Qui ne risque rien n'a rien." - verb: avoir
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "avoir" (to have) with negation. "Qui ne risque rien n''a rien" means "he who risks nothing has nothing". "Qui" means "he who" or "the one who".'
WHERE text = 'Qui ne risque rien n''a rien.' AND phrase_set = 'french-proverbs';

-- 38. "Il vaut mieux tard que jamais." - verb: valoir
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "valoir" (to be worth) with comparative. "Il vaut mieux" means "it is better" and "tard que jamais" means "late than never".'
WHERE text = 'Il vaut mieux tard que jamais.' AND phrase_set = 'french-proverbs';

-- 39. "Rien ne sert de courir, il faut partir à point." - verbs: servir + falloir + partir
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense with "servir" (to be useful), "falloir" (to be necessary), and "partir" (to leave). "Rien ne sert de courir" means "there''s no use in running" and "il faut partir à point" means "you must start on time".'
WHERE text = 'Rien ne sert de courir, il faut partir à point.' AND phrase_set = 'french-proverbs';

-- 40. "Qui vivra verra." - verbs: vivre + voir (future)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Future tense of "vivre" (to live) and "voir" (to see). "Qui vivra verra" literally means "he who lives will see" or "time will tell".'
WHERE text = 'Qui vivra verra.' AND phrase_set = 'french-proverbs';

-- 41. "Mieux vaut prévenir que guérir." - verb: valoir
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "valoir" (to be worth) with comparative. "Mieux vaut" means "it is better to" and "prévenir que guérir" means "prevent than cure".'
WHERE text = 'Mieux vaut prévenir que guérir.' AND phrase_set = 'french-proverbs';

-- 42. "L'habit ne fait pas le moine." - verb: faire
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "faire" (to make/do) with negation. "L''habit ne fait pas le moine" means "the habit doesn''t make the monk" or "don''t judge a book by its cover".'
WHERE text = 'L''habit ne fait pas le moine.' AND phrase_set = 'french-proverbs';

-- 43. "Chaque jour amène son pain." - verb: amener
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "amener" (to bring). "Chaque jour amène son pain" means "each day brings its bread" or "tomorrow is another day".'
WHERE text = 'Chaque jour amène son pain.' AND phrase_set = 'french-proverbs';

-- 44. "À bon chat, bon rat." - verb: être (implied)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Simple present tense with adjective agreement (verb "être" is implied). "À bon chat, bon rat" means "a good cat deserves a good rat" or "it takes two to tango".'
WHERE text = 'À bon chat, bon rat.' AND phrase_set = 'french-proverbs';

-- 45. "L'appétit vient en mangeant." - verb: venir + manger (present participle)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "venir" (to come) with present participle "mangeant" (eating). "L''appétit vient en mangeant" means "appetite comes with eating".'
WHERE text = 'L''appétit vient en mangeant.' AND phrase_set = 'french-proverbs';

-- 46. "L'homme propose et Dieu dispose." - verb: proposer + disposer
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "proposer" (to propose) and "disposer" (to dispose). "L''homme propose et Dieu dispose" means "man proposes and God disposes".'
WHERE text = 'L''homme propose et Dieu dispose.' AND phrase_set = 'french-proverbs';

-- 47. "Qui se ressemble s'assemble." - verbs: se ressembler + s'assembler
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of reflexive verbs "se ressembler" (to resemble each other) and "s''assembler" (to assemble). "Qui se ressemble s''assemble" means "birds of a feather flock together".'
WHERE text = 'Qui se ressemble s''assemble.' AND phrase_set = 'french-proverbs';

-- 48. "La fin justifie les moyens." - verb: justifier
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "justifier" (to justify). "La fin justifie les moyens" means "the end justifies the means". Often attributed to Machiavelli''s "The Prince" (1513).'
WHERE text = 'La fin justifie les moyens.' AND phrase_set = 'french-proverbs';

-- 49. "On n'est jamais si bien servi que par soi-même." - verb: être + servir
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be) with past participle "servi" (served). "On n''est jamais si bien servi que par soi-même" means "you''re never served as well as by yourself".'
WHERE text = 'On n''est jamais si bien servi que par soi-même.' AND phrase_set = 'french-proverbs';

-- 50. "Il faut tourner sept fois sa langue dans sa bouche avant de parler." - verbs: falloir + tourner + parler
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense with "falloir" (to be necessary), "tourner" (to turn), and "parler" (to speak). "Il faut tourner sept fois sa langue" means "you should turn your tongue seven times" before speaking.'
WHERE text = 'Il faut tourner sept fois sa langue dans sa bouche avant de parler.' AND phrase_set = 'french-proverbs';

-- 51. "Qui court deux lièvres n'en prend aucun." - verb: courir + prendre
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "courir" (to run) and "prendre" (to take). "Qui court deux lièvres n''en prend aucun" means "he who chases two rabbits catches neither".'
WHERE text = 'Qui court deux lièvres n''en prend aucun.' AND phrase_set = 'french-proverbs';

-- 52. "L'erreur est humaine." - verb: être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be). "L''erreur est humaine" means "to err is human" or "error is human".'
WHERE text = 'L''erreur est humaine.' AND phrase_set = 'french-proverbs';

-- 53. "Qui sème le vent récolte la tempête." - verb: semer + récolter
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "semer" (to sow) and "récolter" (to reap). "Qui sème le vent récolte la tempête" means "he who sows the wind reaps the whirlwind".'
WHERE text = 'Qui sème le vent récolte la tempête.' AND phrase_set = 'french-proverbs';

-- 54. "La parole est d'argent, mais le silence est d'or." - verb: être (x2)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be) with comparative. "La parole est d''argent" means "speech is silver" and "le silence est d''or" means "silence is golden".'
WHERE text = 'La parole est d''argent, mais le silence est d''or.' AND phrase_set = 'french-proverbs';

-- 55. "Il ne faut pas mettre la charrue avant les bœufs." - verbs: falloir + mettre
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense with "falloir" (to be necessary) and "mettre" (to put). "Il ne faut pas mettre la charrue avant les bœufs" means "don''t put the cart before the horse".'
WHERE text = 'Il ne faut pas mettre la charrue avant les bœufs.' AND phrase_set = 'french-proverbs';

-- 56. "L'homme est un loup pour l'homme." - verb: être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be). "L''homme est un loup pour l''homme" means "man is a wolf to man". From Thomas Hobbes'' "Leviathan" (1651).'
WHERE text = 'L''homme est un loup pour l''homme.' AND phrase_set = 'french-proverbs';

-- 57. "Je pense, donc je suis." - verb: penser + être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "penser" (to think) and "être" (to be). "Je pense, donc je suis" means "I think, therefore I am". Famous quote by René Descartes (1596-1650).'
WHERE text = 'Je pense, donc je suis.' AND phrase_set = 'french-proverbs';

-- 58. "La vie est un songe." - verb: être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be). "La vie est un songe" means "life is a dream". Philosophical reflection on existence.'
WHERE text = 'La vie est un songe.' AND phrase_set = 'french-proverbs';

-- 59. "L'homme naît libre et partout il est dans les fers." - verb: naître + être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "naître" (to be born) and "être" (to be). "L''homme naît libre et partout il est dans les fers" means "man is born free, and everywhere he is in chains". From Rousseau''s "The Social Contract" (1762).'
WHERE text = 'L''homme naît libre et partout il est dans les fers.' AND phrase_set = 'french-proverbs';

-- 60. "L'enfer, c'est les autres." - verb: être
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be). "L''enfer, c''est les autres" means "hell is other people". Famous quote from Jean-Paul Sartre''s "No Exit" (1944).'
WHERE text = 'L''enfer, c''est les autres.' AND phrase_set = 'french-proverbs';

-- 61. "La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui." - verbs: consister + pouvoir + faire + nuire
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "consister" (to consist), "pouvoir" (to be able to), "faire" (to do), and "nuire" (to harm). "La liberté consiste à pouvoir faire" means "liberty consists in being able to do".'
WHERE text = 'La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui.' AND phrase_set = 'french-proverbs';

-- 62. "Il faut cultiver son jardin." - verb: falloir + cultiver
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense with "falloir" (to be necessary) and "cultiver" (to cultivate). "Il faut cultiver son jardin" means "we must cultivate our garden". Final line of Voltaire''s "Candide" (1759).'
WHERE text = 'Il faut cultiver son jardin.' AND phrase_set = 'french-proverbs';

-- 63. "L'homme est condamné à être libre." - verb: être + être (infinitive)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be) with infinitive. "L''homme est condamné à être libre" means "man is condemned to be free". From Jean-Paul Sartre''s "Being and Nothingness" (1943).'
WHERE text = 'L''homme est condamné à être libre.' AND phrase_set = 'french-proverbs';

-- 64. "La vérité sort de la bouche des enfants." - verb: sortir
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "sortir" (to come out/emerge). "La vérité sort de la bouche des enfants" means "truth comes from the mouths of children".'
WHERE text = 'La vérité sort de la bouche des enfants.' AND phrase_set = 'french-proverbs';

-- 65. "L'amour est aveugle, mais l'amitié clairvoyante." - verb: être (x2)
UPDATE language_app_french_phrases 
SET grammar_notes = 'Present tense of "être" (to be) with comparative. "L''amour est aveugle" means "love is blind" and "l''amitié clairvoyante" means "friendship is clear-sighted".'
WHERE text = 'L''amour est aveugle, mais l''amitié clairvoyante.' AND phrase_set = 'french-proverbs';

-- Verify the updates
SELECT 
  text,
  grammar_notes,
  phrase_set
FROM language_app_french_phrases 
WHERE phrase_set IN ('french-101', 'verb-etre', 'french-proverbs')
ORDER BY phrase_set, text
LIMIT 10;
