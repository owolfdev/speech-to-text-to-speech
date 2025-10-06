-- Insert French Proverbs, Aphorisms, Adages, Maxims, and Epigrams
-- These are culturally rich expressions that will help learners understand French culture and wisdom

-- First, let's verify our categories and difficulty levels exist
-- (These should already exist from previous migrations)

-- Insert French Proverbs and Wise Sayings
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

('Petit à petit, l\'oiseau fait son nid.', 'Little by little, the bird builds its nest.', 'puh-tee ah puh-tee, lwah-zoh fay son nee', 'Used to encourage patience and gradual progress in any endeavor.', 'Present tense with reflexive construction. "Petit à petit" is a common French expression meaning "gradually".', 1, 1, 'french-proverbs', 85, 95, true),

('Qui ne risque rien n\'a rien.', 'Nothing ventured, nothing gained.', 'kee nuh reesk reeng nah reeng', 'Encourages taking calculated risks to achieve success.', 'Present tense with negation. "Qui" means "he who" or "the one who".', 1, 1, 'french-proverbs', 90, 90, true),

('Il vaut mieux tard que jamais.', 'Better late than never.', 'eel voh mee-uh tar kuh zha-may', 'Used to express that it\'s better to do something late than not at all.', 'Present tense with comparative structure. "Il vaut mieux" means "it is better".', 1, 1, 'french-proverbs', 85, 85, true),

('Rien ne sert de courir, il faut partir à point.', 'There\'s no point in rushing, you must start on time.', 'ree-ang nuh sair duh koo-reer, eel foh par-teer ah pwahn', 'Emphasizes the importance of proper timing over speed.', 'Present tense with infinitive construction. "Il faut" means "it is necessary".', 1, 1, 'french-proverbs', 80, 80, true),

('Qui vivra verra.', 'Time will tell. / We shall see.', 'kee vee-vrah vuh-rah', 'Expresses uncertainty about the future with philosophical acceptance.', 'Future tense construction. Literally means "he who lives will see".', 1, 1, 'french-proverbs', 85, 85, true),

('Mieux vaut prévenir que guérir.', 'Prevention is better than cure.', 'mee-uh voh pray-vuh-neer kuh gay-reer', 'Advocates for proactive measures over reactive solutions.', 'Present tense with comparative. "Mieux vaut" means "it is better to".', 1, 1, 'french-proverbs', 90, 85, true),

('L\'habit ne fait pas le moine.', 'The habit doesn\'t make the monk. / Don\'t judge a book by its cover.', 'lah-bee nuh fay pah luh mwahn', 'Warns against judging people by their appearance.', 'Present tense with negation. "Ne fait pas" means "doesn\'t make".', 1, 1, 'french-proverbs', 85, 90, true),

('Chaque jour amène son pain.', 'Each day brings its bread. / Tomorrow is another day.', 'shahk zhoor ah-men sun pan', 'Expresses hope and the cyclical nature of life.', 'Present tense. "Amène" comes from "amener" meaning "to bring".', 1, 1, 'french-proverbs', 80, 80, true),

('À bon chat, bon rat.', 'A good cat deserves a good rat. / It takes two to tango.', 'ah bon shah, bon rah', 'Suggests that opponents should be well-matched.', 'Simple present tense with adjective agreement.', 1, 1, 'french-proverbs', 75, 75, true),

('L\'appétit vient en mangeant.', 'Appetite comes with eating.', 'lah-pay-tee vee-ang ahn mon-zhahn', 'Means that interest or desire grows with practice or experience.', 'Present tense with present participle. "En mangeant" means "while eating".', 1, 1, 'french-proverbs', 90, 85, true),

-- INTERMEDIATE LEVEL - More complex proverbs with cultural context
-- Past/future tenses, more sophisticated vocabulary, deeper cultural meaning

('L\'homme propose et Dieu dispose.', 'Man proposes and God disposes.', 'lohm proh-pohz ay dyuh dee-spohz', 'Expresses the idea that humans can plan but fate decides the outcome.', 'Present tense with religious context. Shows French Catholic cultural influence.', 2, 1, 'french-proverbs', 95, 90, true),

('Qui se ressemble s\'assemble.', 'Birds of a feather flock together.', 'kee suh ruh-sahmbl sah-sahmbl', 'People with similar characteristics tend to group together.', 'Present tense with reflexive verbs. "Se ressembler" means "to resemble each other".', 2, 1, 'french-proverbs', 90, 85, true),

('La fin justifie les moyens.', 'The end justifies the means.', 'lah fan zhoo-stee-fee lay mwah-zyahn', 'Controversial saying suggesting that achieving a good goal excuses bad methods.', 'Present tense with philosophical implications. Often attributed to Machiavelli.', 2, 1, 'french-proverbs', 95, 90, true),

('On n\'est jamais si bien servi que par soi-même.', 'You\'re never served as well as by yourself.', 'on nay zha-may see bee-ang sair-vee kuh par swah-mem', 'Emphasizes self-reliance and the reliability of doing things yourself.', 'Present tense with negation and comparative. "Soi-même" means "oneself".', 2, 1, 'french-proverbs', 90, 85, true),

('Il faut tourner sept fois sa langue dans sa bouche avant de parler.', 'You should turn your tongue seven times in your mouth before speaking.', 'eel foh toor-nay set fwah sah lahng dahn sah boosh ah-vahn duh par-lay', 'Advises thinking carefully before speaking.', 'Present tense with infinitive construction. Emphasizes prudence in speech.', 2, 1, 'french-proverbs', 85, 80, true),

('Qui court deux lièvres n\'en prend aucun.', 'He who chases two rabbits catches neither.', 'kee koor duh lee-ehv rahn prahn oh-kuhn', 'Warns against trying to do too many things at once.', 'Present tense with negation. "Lièvre" means "hare" or "rabbit".', 2, 1, 'french-proverbs', 90, 85, true),

('L\'erreur est humaine.', 'To err is human.', 'leh-ruhr ay oo-men', 'Expresses forgiveness for human mistakes.', 'Present tense with philosophical meaning. Shows French stoic philosophy.', 2, 1, 'french-proverbs', 85, 90, true),

('Qui sème le vent récolte la tempête.', 'He who sows the wind reaps the whirlwind.', 'kee sem luh vahn ray-kolt lah tahm-pet', 'Warns that actions have consequences, often negative ones.', 'Present tense with agricultural metaphor. Biblical origin but widely used in French.', 2, 1, 'french-proverbs', 95, 90, true),

('La parole est d\'argent, mais le silence est d\'or.', 'Speech is silver, but silence is golden.', 'lah pah-rol ay dar-zhahn, may luh see-lahns ay dor', 'Emphasizes the value of silence over speaking.', 'Present tense with comparative. Shows French appreciation for discretion.', 2, 1, 'french-proverbs', 90, 85, true),

('Il ne faut pas mettre la charrue avant les bœufs.', 'Don\'t put the cart before the horse.', 'eel nuh foh pah met-truh lah sha-roo ah-vahn lay buhf', 'Warns against doing things in the wrong order.', 'Present tense with negation and infinitive. Agricultural metaphor common in French culture.', 2, 1, 'french-proverbs', 85, 80, true),

-- ADVANCED LEVEL - Complex aphorisms and philosophical maxims
-- Conditional/subjunctive moods, sophisticated vocabulary, deep cultural wisdom

('L\'homme est un loup pour l\'homme.', 'Man is a wolf to man.', 'lohm ay uhn loo poor lohm', 'Expresses the idea that humans can be cruel to each other. From Hobbes via Latin.', 'Present tense with philosophical depth. Shows French engagement with classical philosophy.', 3, 1, 'french-proverbs', 95, 90, true),

('Je pense, donc je suis.', 'I think, therefore I am.', 'zhuh pahns, donk zhuh swee', 'Famous philosophical statement by René Descartes, foundational to modern philosophy.', 'Present tense with philosophical significance. Essential French philosophical heritage.', 3, 1, 'french-proverbs', 100, 95, true),

('La vie est un songe.', 'Life is a dream.', 'lah vee ay uhn sonzh', 'Philosophical reflection on the ephemeral nature of existence.', 'Present tense with poetic metaphor. Common theme in French literature and philosophy.', 3, 1, 'french-proverbs', 95, 85, true),

('L\'homme naît libre et partout il est dans les fers.', 'Man is born free, and everywhere he is in chains.', 'lohm nay lee-bruh ay par-too eel ay dahn lay fair', 'Opening of Rousseau\'s "The Social Contract", foundational to French revolutionary thought.', 'Present tense with philosophical and political implications. Key French Enlightenment idea.', 3, 1, 'french-proverbs', 100, 90, true),

('L\'enfer, c\'est les autres.', 'Hell is other people.', 'lahn-fair, say lay zoh-truh', 'Famous quote from Jean-Paul Sartre\'s play "No Exit".', 'Present tense with existential philosophy. Essential French existentialist thought.', 3, 1, 'french-proverbs', 100, 90, true),

('La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui.', 'Liberty consists in being able to do anything that does not harm others.', 'lah lee-bayr-tay kon-seest ah poo-vwar fair too suh kee nuh nwee pah zoh-twee', 'Definition of liberty from the Declaration of the Rights of Man (French Revolution).', 'Present tense with complex infinitive construction. Foundational French political philosophy.', 3, 1, 'french-proverbs', 100, 95, true),

('Il faut cultiver son jardin.', 'We must cultivate our garden.', 'eel foh kool-tee-vay son zhar-dan', 'Final line of Voltaire\'s "Candide", advocating practical action over philosophical speculation.', 'Present tense with imperative meaning. Key French Enlightenment wisdom.', 3, 1, 'french-proverbs', 95, 90, true),

('L\'homme est condamné à être libre.', 'Man is condemned to be free.', 'lohm ay kon-dam-nay ah eht-ruh lee-bruh', 'Sartre\'s existentialist view that freedom is both a blessing and a burden.', 'Present tense with passive construction. Advanced French existential philosophy.', 3, 1, 'french-proverbs', 100, 85, true),

('La vérité sort de la bouche des enfants.', 'Truth comes from the mouths of children.', 'lah vay-ree-tay sor duh lah boosh day zahn-fahn', 'Expresses the idea that children speak honestly and see things clearly.', 'Present tense with philosophical insight. Common French wisdom about innocence.', 3, 1, 'french-proverbs', 90, 85, true),

('L\'amour est aveugle, mais l\'amitié clairvoyante.', 'Love is blind, but friendship is clear-sighted.', 'lah-moor ay ah-vuh-gluh, may lah-mee-tyay klair-vwah-yahn-tuh', 'Compares the nature of romantic love with friendship.', 'Present tense with comparative structure. Shows French understanding of different types of love.', 3, 1, 'french-proverbs', 95, 85, true);

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
