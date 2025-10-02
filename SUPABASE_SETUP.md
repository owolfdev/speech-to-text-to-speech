# Supabase Setup Guide

This guide will help you migrate from the static French phrases data to a Supabase database.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. Your existing Google Cloud credentials

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `french-pronunciation-app` (or your preferred name)
   - Database Password: Generate a strong password
   - Region: Choose the closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (usually 1-2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon public key

## Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root with:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Cloud Configuration (existing)
GOOGLE_CLOUD_CLIENT_EMAIL=your_service_account_email
GOOGLE_CLOUD_PRIVATE_KEY=your_private_key
GOOGLE_CLOUD_PROJECT_ID=your_project_id
```

## Step 4: Set Up the Database Schema

### Option A: Using the Migration Script (Recommended)

1. Install dependencies:

   ```bash
   npm install dotenv
   ```

2. Run the migration script:
   ```bash
   node scripts/migrate-to-supabase.js
   ```

### Option B: Manual Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Click "Run" to execute the schema

## Step 5: Verify the Migration

1. In your Supabase dashboard, go to Table Editor
2. You should see the following tables:

   - `categories`
   - `difficulty_levels`
   - `french_phrases`
   - `phrases_with_details` (view)

3. Check that the `french_phrases` table contains 15 phrases
4. Verify the `phrases_with_details` view shows joined data

## Step 6: Update Your Application

The new data layer is ready to use. You can now:

1. Update your components to use the new Supabase data layer
2. Test the application
3. Remove the old static data file

## Database Schema Overview

### Tables

- **`categories`**: Phrase categories (greetings, restaurant, etc.)
- **`difficulty_levels`**: Difficulty levels (beginner, intermediate, advanced)
- **`french_phrases`**: Main phrases table with enhanced metadata

### Key Features

- **Enhanced Metadata**: Phonetic guides, audio URLs, usage notes, grammar notes
- **Scoring System**: Difficulty and frequency scores (1-10 scale)
- **Better Organization**: Proper foreign key relationships
- **Performance**: Indexed columns for fast queries
- **Caching**: Built-in caching for better performance

### New Capabilities

- **Fine-grained Difficulty**: 1-10 scale instead of just 3 levels
- **Frequency Scoring**: Track how common phrases are
- **Rich Metadata**: Support for audio, phonetic guides, and notes
- **Category Management**: Easy to add new categories
- **Performance**: Optimized queries with proper indexing

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**

   - Make sure `.env.local` is in the project root
   - Restart your development server after adding variables

2. **Migration Script Fails**

   - Check your Supabase credentials
   - Ensure your Supabase project is fully initialized
   - Try the alternative migration approach: `node scripts/migrate-to-supabase.js --alternative`

3. **Database Connection Issues**
   - Verify your Supabase URL and key
   - Check that your Supabase project is active
   - Ensure your database is not paused

### Getting Help

- Check the Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
- Review the migration script logs for specific error messages
- Ensure all environment variables are correctly set

## Next Steps

After successful migration:

1. Update components to use the new data layer
2. Test all functionality
3. Consider adding new features like:
   - User progress tracking
   - Custom phrase collections
   - Audio pronunciation guides
   - Advanced filtering and search
