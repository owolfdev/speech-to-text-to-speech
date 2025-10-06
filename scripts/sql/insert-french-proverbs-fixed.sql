-- Insert French Proverbs, Aphorisms, Adages, Maxims, and Epigrams
-- These are culturally rich expressions that will help learners understand French culture and wisdom
-- 
-- ATTRIBUTION NOTES:
-- - Famous quotes include author names, birth/death years, and source works with publication dates
-- - Traditional proverbs are marked as "French proverb" or include cultural context
-- - Biblical/Latin origins are noted where applicable
-- - All attributions are included in the usage_notes field for educational context

-- Insert French Proverbs and Wise Sayings
-- Using subqueries to get the correct UUID values for difficulty and category
INSERT INTO language_app_french_phrases (
  text, 
  english_translation, 
  phonetic_guide, 
  usage_notes, 
  grammar_notes, 
  difficulty_id, 
  category_id, 
  phrase_set,
  difficulty_score, 
  frequency_score, 
  is_active
) VALUES

-- BEGINNER LEVEL - Simple, commonly used proverbs
-- Present tense, basic vocabulary, straightforward meaning

('Petit à petit, l''oiseau fait son nid.', 'Little by little, the bird builds its nest.', 'puh-tee ah puh-tee, lwah-zoh fay son nee', 'Used to encourage patience and gradual progress in any endeavor.', 'Present tense with reflexive construction. "Petit à petit" is a common French expression meaning "gradually".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 3, 9, true),

('Qui ne risque rien n''a rien.', 'Nothing ventured, nothing gained.', 'kee nuh reesk reeng nah reeng', 'Encourages taking calculated risks to achieve success.', 'Present tense with negation. "Qui" means "he who" or "the one who".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 4, 8, true),

('Il vaut mieux tard que jamais.', 'Better late than never.', 'eel voh mee-uh tar kuh zha-may', 'Used to express that it''s better to do something late than not at all.', 'Present tense with comparative structure. "Il vaut mieux" means "it is better".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 3, 8, true),

('Rien ne sert de courir, il faut partir à point.', 'There''s no point in rushing, you must start on time.', 'ree-ang nuh sair duh koo-reer, eel foh par-teer ah pwahn', 'Emphasizes the importance of proper timing over speed.', 'Present tense with infinitive construction. "Il faut" means "it is necessary".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 4, 7, true),

('Qui vivra verra.', 'Time will tell. / We shall see.', 'kee vee-vrah vuh-rah', 'Expresses uncertainty about the future with philosophical acceptance.', 'Future tense construction. Literally means "he who lives will see".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 3, 8, true),

('Mieux vaut prévenir que guérir.', 'Prevention is better than cure.', 'mee-uh voh pray-vuh-neer kuh gay-reer', 'Advocates for proactive measures over reactive solutions.', 'Present tense with comparative. "Mieux vaut" means "it is better to".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 4, 7, true),

('L''habit ne fait pas le moine.', 'The habit doesn''t make the monk. / Don''t judge a book by its cover.', 'lah-bee nuh fay pah luh mwahn', 'Warns against judging people by their appearance.', 'Present tense with negation. "Ne fait pas" means "doesn''t make".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 3, 8, true),

('Chaque jour amène son pain.', 'Each day brings its bread. / Tomorrow is another day.', 'shahk zhoor ah-men sun pan', 'Expresses hope and the cyclical nature of life.', 'Present tense. "Amène" comes from "amener" meaning "to bring".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 2, 7, true),

('À bon chat, bon rat.', 'A good cat deserves a good rat. / It takes two to tango.', 'ah bon shah, bon rah', 'Suggests that opponents should be well-matched.', 'Simple present tense with adjective agreement.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 2, 6, true),

('L''appétit vient en mangeant.', 'Appetite comes with eating.', 'lah-pay-tee vee-ang ahn mon-zhahn', 'Means that interest or desire grows with practice or experience.', 'Present tense with present participle. "En mangeant" means "while eating".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 4, 8, true),

-- INTERMEDIATE LEVEL - More complex proverbs with cultural context
-- Past/future tenses, more sophisticated vocabulary, deeper cultural meaning

('L''homme propose et Dieu dispose.', 'Man proposes and God disposes.', 'lohm proh-pohz ay dyuh dee-spohz', 'Expresses the idea that humans can plan but fate decides the outcome.', 'Present tense with religious context. Shows French Catholic cultural influence.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 6, 8, true),

('Qui se ressemble s''assemble.', 'Birds of a feather flock together.', 'kee suh ruh-sahmbl sah-sahmbl', 'People with similar characteristics tend to group together.', 'Present tense with reflexive verbs. "Se ressembler" means "to resemble each other".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 5, 7, true),

('La fin justifie les moyens.', 'The end justifies the means.', 'lah fan zhoo-stee-fee lay mwah-zyahn', 'Controversial saying suggesting that achieving a good goal excuses bad methods. Often attributed to Machiavelli''s "The Prince" (1513).', 'Present tense with philosophical implications. Often attributed to Machiavelli.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 7, 8, true),

('On n''est jamais si bien servi que par soi-même.', 'You''re never served as well as by yourself.', 'on nay zha-may see bee-ang sair-vee kuh par swah-mem', 'Emphasizes self-reliance and the reliability of doing things yourself.', 'Present tense with negation and comparative. "Soi-même" means "oneself".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 6, 7, true),

('Il faut tourner sept fois sa langue dans sa bouche avant de parler.', 'You should turn your tongue seven times in your mouth before speaking.', 'eel foh toor-nay set fwah sah lahng dahn sah boosh ah-vahn duh par-lay', 'Advises thinking carefully before speaking.', 'Present tense with infinitive construction. Emphasizes prudence in speech.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 5, 6, true),

('Qui court deux lièvres n''en prend aucun.', 'He who chases two rabbits catches neither.', 'kee koor duh lee-ehv rahn prahn oh-kuhn', 'Warns against trying to do too many things at once.', 'Present tense with negation. "Lièvre" means "hare" or "rabbit".', (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 6, 7, true),

('L''erreur est humaine.', 'To err is human.', 'leh-ruhr ay oo-men', 'Expresses forgiveness for human mistakes.', 'Present tense with philosophical meaning. Shows French stoic philosophy.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 4, 8, true),

('Qui sème le vent récolte la tempête.', 'He who sows the wind reaps the whirlwind.', 'kee sem luh vahn ray-kolt lah tahm-pet', 'Warns that actions have consequences, often negative ones.', 'Present tense with agricultural metaphor. Biblical origin but widely used in French.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 7, 8, true),

('La parole est d''argent, mais le silence est d''or.', 'Speech is silver, but silence is golden.', 'lah pah-rol ay dar-zhahn, may luh see-lahns ay dor', 'Emphasizes the value of silence over speaking.', 'Present tense with comparative. Shows French appreciation for discretion.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 6, 7, true),

('Il ne faut pas mettre la charrue avant les bœufs.', 'Don''t put the cart before the horse.', 'eel nuh foh pah met-truh lah sha-roo ah-vahn lay buhf', 'Warns against doing things in the wrong order.', 'Present tense with negation and infinitive. Agricultural metaphor common in French culture.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 5, 6, true),

-- ADVANCED LEVEL - Complex aphorisms and philosophical maxims
-- Conditional/subjunctive moods, sophisticated vocabulary, deep cultural wisdom

('L''homme est un loup pour l''homme.', 'Man is a wolf to man.', 'lohm ay uhn loo poor lohm', 'Expresses the idea that humans can be cruel to each other. From Thomas Hobbes'' "Leviathan" (1651) via Latin "homo homini lupus".', 'Present tense with philosophical depth. Shows French engagement with classical philosophy.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 8, 8, true),

('Je pense, donc je suis.', 'I think, therefore I am.', 'zhuh pahns, donk zhuh swee', 'Famous philosophical statement by René Descartes (1596-1650), foundational to modern philosophy. From "Discourse on Method" (1637).', 'Present tense with philosophical significance. Essential French philosophical heritage.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 9, 9, true),

('La vie est un songe.', 'Life is a dream.', 'lah vee ay uhn sonzh', 'Philosophical reflection on the ephemeral nature of existence.', 'Present tense with poetic metaphor. Common theme in French literature and philosophy.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 8, 7, true),

('L''homme naît libre et partout il est dans les fers.', 'Man is born free, and everywhere he is in chains.', 'lohm nay lee-bruh ay par-too eel ay dahn lay fair', 'Opening line from Jean-Jacques Rousseau''s "The Social Contract" (1762), foundational to French revolutionary thought.', 'Present tense with philosophical and political implications. Key French Enlightenment idea.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 9, 8, true),

('L''enfer, c''est les autres.', 'Hell is other people.', 'lahn-fair, say lay zoh-truh', 'Famous quote from Jean-Paul Sartre''s play "No Exit" ("Huis Clos", 1944).', 'Present tense with existential philosophy. Essential French existentialist thought.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 9, 8, true),

('La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui.', 'Liberty consists in being able to do anything that does not harm others.', 'lah lee-bayr-tay kon-seest ah poo-vwar fair too suh kee nuh nwee pah zoh-twee', 'Definition of liberty from the Declaration of the Rights of Man and of the Citizen (1789), French Revolution.', 'Present tense with complex infinitive construction. Foundational French political philosophy.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 10, 9, true),

('Il faut cultiver son jardin.', 'We must cultivate our garden.', 'eel foh kool-tee-vay son zhar-dan', 'Final line of Voltaire''s "Candide" (1759), advocating practical action over philosophical speculation.', 'Present tense with imperative meaning. Key French Enlightenment wisdom.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 8, 8, true),

('L''homme est condamné à être libre.', 'Man is condemned to be free.', 'lohm ay kon-dam-nay ah eht-ruh lee-bruh', 'Jean-Paul Sartre''s existentialist view that freedom is both a blessing and a burden. From "Being and Nothingness" (1943).', 'Present tense with passive construction. Advanced French existential philosophy.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 9, 7, true),

('La vérité sort de la bouche des enfants.', 'Truth comes from the mouths of children.', 'lah vay-ree-tay sor duh lah boosh day zahn-fahn', 'Expresses the idea that children speak honestly and see things clearly.', 'Present tense with philosophical insight. Common French wisdom about innocence.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 6, 7, true),

('L''amour est aveugle, mais l''amitié clairvoyante.', 'Love is blind, but friendship is clear-sighted.', 'lah-moor ay ah-vuh-gluh, may lah-mee-tyay klair-vwah-yahn-tuh', 'Compares the nature of romantic love with friendship.', 'Present tense with comparative structure. Shows French understanding of different types of love.', (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'), (SELECT id FROM language_app_categories WHERE name = 'greetings'), 'french-proverbs', 8, 7, true);

-- Verification query to check our inserts
SELECT 
  phrase_set,
  dl.name as difficulty,
  COUNT(*) as count
FROM language_app_french_phrases fp
JOIN language_app_difficulty_levels dl ON fp.difficulty_id = dl.id
WHERE phrase_set = 'french-proverbs'
GROUP BY phrase_set, dl.name, dl.level_order
ORDER BY dl.level_order;

-- Show some examples
SELECT 
  text,
  english_translation,
  dl.name as difficulty,
  usage_notes
FROM language_app_french_phrases fp
JOIN language_app_difficulty_levels dl ON fp.difficulty_id = dl.id
WHERE phrase_set = 'french-proverbs'
ORDER BY dl.level_order, fp.difficulty_score DESC
LIMIT 5;
