-- Additional French Phrases for Language Learning App
-- 20 phrases per difficulty level (60 total new phrases)
-- All phrases use the language_app_ prefixed table names
-- Fixed single quote escaping for PostgreSQL

-- Insert 20 additional beginner phrases
INSERT INTO language_app_french_phrases (text, english_translation, difficulty_id, category_id, difficulty_score, frequency_score) VALUES
  -- Basic greetings and introductions
  ('Salut !', 'Hi!', 
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'greetings'), 1, 10),
  
  ('À bientôt !', 'See you soon!',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'greetings'), 1, 9),
  
  ('Comment vous appelez-vous ?', 'What is your name?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'introductions'), 2, 8),
  
  ('Enchanté(e) !', 'Nice to meet you!',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'introductions'), 1, 7),
  
  -- Basic courtesy and politeness
  ('De rien', 'You''re welcome',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'courtesy'), 1, 10),
  
  ('S''il vous plaît', 'Please',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'courtesy'), 1, 10),
  
  ('Pardon', 'Sorry/Excuse me',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'courtesy'), 1, 9),
  
  ('Bonne journée !', 'Have a good day!',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'courtesy'), 2, 8),
  
  -- Basic questions and needs
  ('Comment allez-vous ?', 'How are you?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'greetings'), 2, 9),
  
  ('Je vais bien', 'I''m doing well',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'greetings'), 2, 8),
  
  ('Oui', 'Yes',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'communication'), 1, 10),
  
  ('Non', 'No',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'communication'), 1, 10),
  
  -- Basic directions and locations
  ('Où est... ?', 'Where is...?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'directions'), 2, 8),
  
  ('À droite', 'To the right',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'directions'), 2, 7),
  
  ('À gauche', 'To the left',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'directions'), 2, 7),
  
  ('Tout droit', 'Straight ahead',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'directions'), 2, 7),
  
  -- Basic shopping and numbers
  ('Combien ça coûte ?', 'How much does it cost?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'shopping'), 3, 6),
  
  ('Je voudrais...', 'I would like...',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'shopping'), 2, 8),
  
  ('C''est combien ?', 'How much is it?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'shopping'), 2, 7),
  
  ('Je ne comprends pas', 'I don''t understand',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'beginner'),
   (SELECT id FROM language_app_categories WHERE name = 'communication'), 3, 8);

-- Insert 20 additional intermediate phrases
INSERT INTO language_app_french_phrases (text, english_translation, difficulty_id, category_id, difficulty_score, frequency_score) VALUES
  -- Restaurant and dining
  ('L''addition, s''il vous plaît', 'The bill, please',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'restaurant'), 4, 6),
  
  ('Je voudrais voir la carte', 'I would like to see the menu',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'restaurant'), 4, 5),
  
  ('C''est délicieux !', 'It''s delicious!',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'restaurant'), 3, 6),
  
  ('Je suis végétarien(ne)', 'I am vegetarian',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'restaurant'), 4, 4),
  
  -- Travel and transportation
  ('À quelle heure part le train ?', 'What time does the train leave?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'directions'), 5, 5),
  
  ('Où puis-je acheter un billet ?', 'Where can I buy a ticket?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'directions'), 4, 5),
  
  ('Je me suis perdu(e)', 'I am lost',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'directions'), 4, 6),
  
  ('Pouvez-vous m''indiquer le chemin ?', 'Can you show me the way?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'requests'), 5, 6),
  
  -- Shopping and services
  ('Avez-vous ceci en d''autres couleurs ?', 'Do you have this in other colors?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'shopping'), 5, 4),
  
  ('Puis-je essayer ceci ?', 'Can I try this on?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'shopping'), 4, 5),
  
  ('C''est trop cher', 'It''s too expensive',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'shopping'), 3, 6),
  
  ('Acceptez-vous les cartes de crédit ?', 'Do you accept credit cards?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'shopping'), 5, 5),
  
  -- Communication and requests
  ('Pourriez-vous parler plus lentement ?', 'Could you speak more slowly?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'communication'), 5, 7),
  
  ('Pouvez-vous répéter, s''il vous plaît ?', 'Can you repeat, please?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'communication'), 4, 8),
  
  ('Je ne parle pas très bien français', 'I don''t speak French very well',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'communication'), 4, 7),
  
  ('Parlez-vous anglais ?', 'Do you speak English?',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'communication'), 3, 8),
  
  -- Apologies and problems
  ('Je suis vraiment désolé(e)', 'I am really sorry',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'apologies'), 4, 6),
  
  ('Ce n''est pas de ma faute', 'It''s not my fault',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'apologies'), 4, 4),
  
  ('Excusez-moi pour le retard', 'Excuse me for being late',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'apologies'), 4, 5),
  
  ('Je n''ai pas pu venir hier', 'I couldn''t come yesterday',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'intermediate'),
   (SELECT id FROM language_app_categories WHERE name = 'apologies'), 4, 5);

-- Insert 20 additional advanced phrases
INSERT INTO language_app_french_phrases (text, english_translation, difficulty_id, category_id, difficulty_score, frequency_score) VALUES
  -- Business and professional
  ('Nous devons analyser cette situation en détail', 'We need to analyze this situation in detail',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'business'), 8, 3),
  
  ('Cette proposition mérite d''être considérée', 'This proposal deserves to be considered',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'business'), 7, 3),
  
  ('Nous devons prendre en compte tous les facteurs', 'We need to take into account all factors',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'business'), 8, 2),
  
  ('Il est crucial de maintenir notre compétitivité', 'It is crucial to maintain our competitiveness',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'business'), 9, 2),
  
  -- Complex communication
  ('Je tiens à vous faire part de mes préoccupations', 'I would like to share my concerns with you',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'communication'), 8, 3),
  
  ('Cette approche s''avère être la plus efficace', 'This approach proves to be the most effective',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'communication'), 9, 2),
  
  ('Nous devons nous adapter aux nouvelles circonstances', 'We need to adapt to new circumstances',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'communication'), 8, 3),
  
  ('Il est impératif de trouver une solution rapidement', 'It is imperative to find a solution quickly',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'communication'), 9, 2),
  
  -- Analysis and critical thinking
  ('Cette théorie nécessite une validation empirique', 'This theory requires empirical validation',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'analysis'), 9, 1),
  
  ('Les données suggèrent une corrélation significative', 'The data suggests a significant correlation',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'analysis'), 8, 2),
  
  ('Nous devons examiner cette question sous tous les angles', 'We need to examine this question from all angles',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'analysis'), 8, 2),
  
  ('Cette hypothèse mérite d''être testée rigoureusement', 'This hypothesis deserves to be tested rigorously',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'analysis'), 9, 1),
  
  -- Decision making and planning
  ('Nous devons évaluer les risques et les opportunités', 'We need to assess the risks and opportunities',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'decision-making'), 8, 3),
  
  ('Cette stratégie s''inscrit dans notre vision à long terme', 'This strategy fits into our long-term vision',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'decision-making'), 9, 2),
  
  ('Il faut anticiper les conséquences de nos actions', 'We must anticipate the consequences of our actions',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'decision-making'), 8, 2),
  
  ('Cette décision aura un impact considérable', 'This decision will have a considerable impact',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'decision-making'), 7, 3),
  
  -- Achievements and success
  ('Nous avons atteint nos objectifs avec succès', 'We have successfully achieved our goals',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'achievements'), 7, 3),
  
  ('Cette réalisation témoigne de notre expertise', 'This achievement demonstrates our expertise',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'achievements'), 8, 2),
  
  ('Nous avons surmonté tous les obstacles', 'We have overcome all obstacles',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'achievements'), 7, 3),
  
  ('Cette victoire est le fruit de notre persévérance', 'This victory is the result of our perseverance',
   (SELECT id FROM language_app_difficulty_levels WHERE name = 'advanced'),
   (SELECT id FROM language_app_categories WHERE name = 'achievements'), 8, 2);

-- Verify the insertions
SELECT 
  dl.name as difficulty,
  COUNT(*) as phrase_count
FROM language_app_french_phrases fp
JOIN language_app_difficulty_levels dl ON fp.difficulty_id = dl.id
WHERE fp.is_active = TRUE
GROUP BY dl.name, dl.level_order
ORDER BY dl.level_order;
