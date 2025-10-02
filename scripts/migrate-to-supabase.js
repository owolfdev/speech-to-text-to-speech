#!/usr/bin/env node

/**
 * Migration script to set up Supabase database with French phrases data
 *
 * Usage:
 * 1. Set up your Supabase project
 * 2. Set environment variables:
 *    - NEXT_PUBLIC_SUPABASE_URL
 *    - NEXT_PUBLIC_SUPABASE_ANON_KEY
 * 3. Run: node scripts/migrate-to-supabase.js
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load environment variables
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables:");
  console.error("   NEXT_PUBLIC_SUPABASE_URL");
  console.error("   NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log("🚀 Starting Supabase migration...");

  try {
    // Read the SQL schema file
    const schemaPath = path.join(__dirname, "..", "database-schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    console.log("📄 Executing database schema...");

    // Split the schema into individual statements
    const statements = schema
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"));

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`   Executing statement ${i + 1}/${statements.length}...`);

        const { error } = await supabase.rpc("exec_sql", { sql: statement });

        if (error) {
          console.error(`❌ Error executing statement ${i + 1}:`, error);
          console.error("Statement:", statement);
          throw error;
        }
      }
    }

    console.log("✅ Database schema created successfully!");

    // Verify the migration by testing some queries
    console.log("🔍 Verifying migration...");

    const { data: phrases, error: phrasesError } = await supabase
      .from("phrases_with_details")
      .select("*")
      .limit(5);

    if (phrasesError) {
      throw phrasesError;
    }

    console.log(`✅ Found ${phrases.length} phrases in database`);

    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("*");

    if (categoriesError) {
      throw categoriesError;
    }

    console.log(`✅ Found ${categories.length} categories`);

    const { data: difficulties, error: difficultiesError } = await supabase
      .from("difficulty_levels")
      .select("*");

    if (difficultiesError) {
      throw difficultiesError;
    }

    console.log(`✅ Found ${difficulties.length} difficulty levels`);

    // Test the random phrase function
    const { data: randomPhrase, error: randomError } = await supabase.rpc(
      "get_random_phrase",
      {
        difficulty_filter: "beginner",
        limit_count: 1,
      }
    );

    if (randomError) {
      throw randomError;
    }

    console.log("✅ Random phrase function working:", randomPhrase[0]?.text);

    console.log("🎉 Migration completed successfully!");
    console.log("\nNext steps:");
    console.log("1. Update your components to use the new data layer");
    console.log("2. Test the application with the new Supabase backend");
    console.log("3. Remove the old static data file");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

// Alternative approach if exec_sql doesn't work
async function runMigrationAlternative() {
  console.log("🚀 Starting Supabase migration (alternative approach)...");

  try {
    // Create categories
    console.log("📝 Creating categories...");
    const categories = [
      {
        name: "greetings",
        description: "Common greetings and salutations",
        color: "#3B82F6",
      },
      {
        name: "introductions",
        description: "Self-introduction phrases",
        color: "#10B981",
      },
      {
        name: "courtesy",
        description: "Polite expressions and courtesy phrases",
        color: "#F59E0B",
      },
      {
        name: "directions",
        description: "Asking for and giving directions",
        color: "#EF4444",
      },
      {
        name: "restaurant",
        description: "Restaurant and dining phrases",
        color: "#8B5CF6",
      },
      {
        name: "requests",
        description: "Making requests and asking for help",
        color: "#06B6D4",
      },
      {
        name: "communication",
        description: "General communication phrases",
        color: "#84CC16",
      },
      {
        name: "shopping",
        description: "Shopping and commerce phrases",
        color: "#F97316",
      },
      {
        name: "apologies",
        description: "Apologizing and expressing regret",
        color: "#EC4899",
      },
      {
        name: "business",
        description: "Business and professional phrases",
        color: "#6366F1",
      },
      {
        name: "achievements",
        description: "Expressing achievements and success",
        color: "#14B8A6",
      },
      {
        name: "analysis",
        description: "Analytical and critical thinking phrases",
        color: "#A855F7",
      },
      {
        name: "decision-making",
        description: "Decision-making and planning phrases",
        color: "#DC2626",
      },
    ];

    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .insert(categories)
      .select();

    if (categoryError) {
      console.log("Categories may already exist, continuing...");
    } else {
      console.log(`✅ Created ${categoryData.length} categories`);
    }

    // Create difficulty levels
    console.log("📝 Creating difficulty levels...");
    const difficulties = [
      {
        name: "beginner",
        level_order: 1,
        description: "Basic phrases for beginners",
        color: "#10B981",
      },
      {
        name: "intermediate",
        level_order: 2,
        description: "Intermediate phrases for developing learners",
        color: "#F59E0B",
      },
      {
        name: "advanced",
        level_order: 3,
        description: "Advanced phrases for proficient speakers",
        color: "#EF4444",
      },
    ];

    const { data: difficultyData, error: difficultyError } = await supabase
      .from("difficulty_levels")
      .insert(difficulties)
      .select();

    if (difficultyError) {
      console.log("Difficulty levels may already exist, continuing...");
    } else {
      console.log(`✅ Created ${difficultyData.length} difficulty levels`);
    }

    // Get the IDs for foreign key references
    const { data: allCategories } = await supabase
      .from("categories")
      .select("id, name");
    const { data: allDifficulties } = await supabase
      .from("difficulty_levels")
      .select("id, name");

    const categoryMap = new Map(allCategories.map((c) => [c.name, c.id]));
    const difficultyMap = new Map(allDifficulties.map((d) => [d.name, d.id]));

    // Create phrases
    console.log("📝 Creating French phrases...");
    const phrases = [
      // Beginner phrases
      {
        text: "Bonjour, comment allez-vous ?",
        english_translation: "Hello, how are you?",
        difficulty_id: difficultyMap.get("beginner"),
        category_id: categoryMap.get("greetings"),
        difficulty_score: 2,
        frequency_score: 9,
      },
      {
        text: "Je m'appelle Marie",
        english_translation: "My name is Marie",
        difficulty_id: difficultyMap.get("beginner"),
        category_id: categoryMap.get("introductions"),
        difficulty_score: 1,
        frequency_score: 8,
      },
      {
        text: "Merci beaucoup",
        english_translation: "Thank you very much",
        difficulty_id: difficultyMap.get("beginner"),
        category_id: categoryMap.get("courtesy"),
        difficulty_score: 1,
        frequency_score: 10,
      },
      {
        text: "Excusez-moi",
        english_translation: "Excuse me",
        difficulty_id: difficultyMap.get("beginner"),
        category_id: categoryMap.get("courtesy"),
        difficulty_score: 1,
        frequency_score: 9,
      },
      {
        text: "Où est la gare ?",
        english_translation: "Where is the train station?",
        difficulty_id: difficultyMap.get("beginner"),
        category_id: categoryMap.get("directions"),
        difficulty_score: 3,
        frequency_score: 6,
      },
      // Intermediate phrases
      {
        text: "Je voudrais réserver une table pour deux personnes",
        english_translation: "I would like to reserve a table for two people",
        difficulty_id: difficultyMap.get("intermediate"),
        category_id: categoryMap.get("restaurant"),
        difficulty_score: 5,
        frequency_score: 4,
      },
      {
        text: "Pouvez-vous m'aider, s'il vous plaît ?",
        english_translation: "Can you help me, please?",
        difficulty_id: difficultyMap.get("intermediate"),
        category_id: categoryMap.get("requests"),
        difficulty_score: 4,
        frequency_score: 7,
      },
      {
        text: "Je ne comprends pas",
        english_translation: "I don't understand",
        difficulty_id: difficultyMap.get("intermediate"),
        category_id: categoryMap.get("communication"),
        difficulty_score: 3,
        frequency_score: 8,
      },
      {
        text: "Quel est le prix de ce produit ?",
        english_translation: "What is the price of this product?",
        difficulty_id: difficultyMap.get("intermediate"),
        category_id: categoryMap.get("shopping"),
        difficulty_score: 4,
        frequency_score: 5,
      },
      {
        text: "Je suis désolé, je suis en retard",
        english_translation: "I'm sorry, I'm late",
        difficulty_id: difficultyMap.get("intermediate"),
        category_id: categoryMap.get("apologies"),
        difficulty_score: 4,
        frequency_score: 6,
      },
      // Advanced phrases
      {
        text: "Il faut que je vous dise quelque chose d'important",
        english_translation: "I need to tell you something important",
        difficulty_id: difficultyMap.get("advanced"),
        category_id: categoryMap.get("communication"),
        difficulty_score: 8,
        frequency_score: 3,
      },
      {
        text: "J'aimerais discuter de cette proposition avec vous",
        english_translation: "I would like to discuss this proposal with you",
        difficulty_id: difficultyMap.get("advanced"),
        category_id: categoryMap.get("business"),
        difficulty_score: 9,
        frequency_score: 2,
      },
      {
        text: "Malgré les difficultés, nous avons réussi",
        english_translation: "Despite the difficulties, we succeeded",
        difficulty_id: difficultyMap.get("advanced"),
        category_id: categoryMap.get("achievements"),
        difficulty_score: 7,
        frequency_score: 4,
      },
      {
        text: "Il est essentiel de bien comprendre cette situation",
        english_translation:
          "It is essential to understand this situation well",
        difficulty_id: difficultyMap.get("advanced"),
        category_id: categoryMap.get("analysis"),
        difficulty_score: 9,
        frequency_score: 2,
      },
      {
        text: "Nous devons prendre une décision rapidement",
        english_translation: "We need to make a decision quickly",
        difficulty_id: difficultyMap.get("advanced"),
        category_id: categoryMap.get("decision-making"),
        difficulty_score: 8,
        frequency_score: 3,
      },
    ];

    const { data: phraseData, error: phraseError } = await supabase
      .from("french_phrases")
      .insert(phrases)
      .select();

    if (phraseError) {
      console.log("Phrases may already exist, continuing...");
    } else {
      console.log(`✅ Created ${phraseData.length} French phrases`);
    }

    console.log("🎉 Migration completed successfully!");
    console.log("\nNext steps:");
    console.log("1. Update your components to use the new data layer");
    console.log("2. Test the application with the new Supabase backend");
    console.log("3. Remove the old static data file");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

// Check if we should use the alternative approach
if (process.argv.includes("--alternative")) {
  runMigrationAlternative();
} else {
  runMigration().catch(() => {
    console.log(
      "\n🔄 Primary migration failed, trying alternative approach..."
    );
    runMigrationAlternative();
  });
}
