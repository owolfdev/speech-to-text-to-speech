-- Update French Proverbs with Complete Attribution
-- This script updates existing proverb records to include full attribution information

-- Update Sartre's "No Exit" quote with full attribution
UPDATE language_app_french_phrases 
SET usage_notes = 'Famous quote from Jean-Paul Sartre''s play "No Exit" ("Huis Clos", 1944).'
WHERE text = 'L''enfer, c''est les autres.' AND phrase_set = 'french-proverbs';

-- Update Descartes' "Cogito ergo sum" with full attribution
UPDATE language_app_french_phrases 
SET usage_notes = 'Famous philosophical statement by René Descartes (1596-1650), foundational to modern philosophy. From "Discourse on Method" (1637).'
WHERE text = 'Je pense, donc je suis.' AND phrase_set = 'french-proverbs';

-- Update Rousseau's "Social Contract" with full attribution
UPDATE language_app_french_phrases 
SET usage_notes = 'Opening line from Jean-Jacques Rousseau''s "The Social Contract" (1762), foundational to French revolutionary thought.'
WHERE text = 'L''homme naît libre et partout il est dans les fers.' AND phrase_set = 'french-proverbs';

-- Update Declaration of Rights of Man with full attribution
UPDATE language_app_french_phrases 
SET usage_notes = 'Definition of liberty from the Declaration of the Rights of Man and of the Citizen (1789), French Revolution.'
WHERE text = 'La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui.' AND phrase_set = 'french-proverbs';

-- Update Voltaire's "Candide" with full attribution
UPDATE language_app_french_phrases 
SET usage_notes = 'Final line of Voltaire''s "Candide" (1759), advocating practical action over philosophical speculation.'
WHERE text = 'Il faut cultiver son jardin.' AND phrase_set = 'french-proverbs';

-- Update Sartre's "Being and Nothingness" with full attribution
UPDATE language_app_french_phrases 
SET usage_notes = 'Jean-Paul Sartre''s existentialist view that freedom is both a blessing and a burden. From "Being and Nothingness" (1943).'
WHERE text = 'L''homme est condamné à être libre.' AND phrase_set = 'french-proverbs';

-- Update Hobbes' "Leviathan" with full attribution
UPDATE language_app_french_phrases 
SET usage_notes = 'Expresses the idea that humans can be cruel to each other. From Thomas Hobbes'' "Leviathan" (1651) via Latin "homo homini lupus".'
WHERE text = 'L''homme est un loup pour l''homme.' AND phrase_set = 'french-proverbs';

-- Update Machiavelli's "The Prince" with full attribution
UPDATE language_app_french_phrases 
SET usage_notes = 'Controversial saying suggesting that achieving a good goal excuses bad methods. Often attributed to Machiavelli''s "The Prince" (1513).'
WHERE text = 'La fin justifie les moyens.' AND phrase_set = 'french-proverbs';

-- Verify the updates
SELECT 
  text,
  usage_notes,
  difficulty_score,
  frequency_score
FROM language_app_french_phrases 
WHERE phrase_set = 'french-proverbs'
ORDER BY difficulty_score DESC, frequency_score DESC
LIMIT 10;
