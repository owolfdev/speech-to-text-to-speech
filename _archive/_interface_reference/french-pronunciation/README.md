# Répéter - French Pronunciation Practice App

A Next.js-based web application designed to help users improve their French pronunciation through repetition-based learning and real-time speech recognition feedback.

## Overview

Répéter (French for "to repeat") is an interactive language learning tool that uses Google Cloud Speech-to-Text API to evaluate pronunciation accuracy. The app requires users to successfully pronounce each French phrase five times before progressing, reinforcing proper pronunciation through deliberate practice.

## Key Features

### 🎯 Repetition-Based Learning

- Each phrase must be repeated successfully **5 times** before moving to the next
- Visual progress bar with emotional feedback icons that evolve as you progress
- Celebration animation upon completing all 5 repetitions

### 🎤 Speech Recognition

- Real-time audio recording and pronunciation evaluation
- Integration with Google Cloud Speech-to-Text API
- Accuracy scoring based on transcription matching

### 🔊 Audio Pronunciation Guide

- Text-to-Speech pronunciation playback for each phrase
- Native French (fr-FR) voice synthesis
- Visual feedback while audio is playing

### 💡 Translation Support

- Toggle English translations for each French phrase
- Helps learners understand context and meaning
- Smooth animation for showing/hiding translations

### 📊 Progress Tracking

- Current phrase counter (e.g., "Current Phrase 2/40")
- Visual progress indicators for repetitions
- Emotional progression icons: 😊 → 😃 → 😄 → 🤩 → 🎉

### ⏭️ Flexible Navigation

- Skip button to move to next phrase at any time
- Automatic progression after completing 5 successful repetitions
- Progress resets when moving to a new phrase

## User Interface

### Header

- **Logo**: Small French gentleman icon (48px) integrated into the header
- **Title**: "Répéter" branding
- **Phrase Counter**: Shows current position in the phrase set

### Main Card

The central white card contains:

1. **Audio Button** (left): Speaker icon to hear correct pronunciation
2. **French Phrase**: Large, centered text displaying the current phrase
3. **Info Button** (right): Circle info icon to toggle English translation
4. **Translation**: Expandable English translation below the phrase

### Progress Section

- **Progress Bar**: Five segments representing the 5 required repetitions
- **Emotion Icons**: Visual feedback above each segment showing progression
- **Completion Indicator**: Checkmarks appear as repetitions are completed

### Control Buttons

- **Record Button**: Primary blue button to start/stop recording
  - Shows "Recording..." state with red styling during capture
  - Disabled during audio playback
- **Skip Button**: Secondary button to move to next phrase
  - Changes to "Next Phrase" after completing all repetitions
  - Disabled during recording

### Feedback Display

- **Success Messages**: Green alerts for correct pronunciations
- **Error Messages**: Red alerts for incorrect attempts or errors
- **Celebration**: Confetti animation and success message after 5 completions

## Technical Implementation

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: Lucide React
- **Speech Recognition**: Google Cloud Speech-to-Text API
- **Text-to-Speech**: Web Speech API (browser native)

### Key Components

#### `pronunciation-practice.tsx`

Main component handling:

- Audio recording and blob creation
- API communication with Google Cloud Speech-to-Text
- Repetition tracking and progress management
- UI state management (recording, playing audio, showing translations)
- Phrase navigation and completion logic

#### API Route: `/api/speech-to-text`

Server-side endpoint that:

- Receives audio blob from client
- Converts to base64 for Google Cloud API
- Sends to Speech-to-Text API with French language config
- Returns transcription and confidence score

### State Management

- `currentPhraseIndex`: Tracks position in phrase array
- `repetitionCount`: Counts successful repetitions (0-5)
- `isRecording`: Recording state
- `isPlaying`: Audio playback state
- `showTranslation`: Translation visibility toggle
- `feedback`: Success/error message display

### Audio Processing

1. User clicks Record button
2. Browser MediaRecorder API captures audio
3. Audio converted to blob format
4. Sent to API route as base64
5. Google Cloud processes and returns transcription
6. App compares transcription to expected phrase
7. Feedback provided and progress updated if successful

## Design System

### Color Palette

- **Primary Blue**: `#5BA3E8` (from app icon)
- **Background**: Solid blue (`#5BA3E8`)
- **Cards**: White with subtle shadows
- **Accents**: Blue for interactive elements
- **Success**: Green (`#10b981`)
- **Error**: Red (`#ef4444`)

### Typography

- **Headings**: Geist Sans, bold weights
- **Body**: Geist Sans, regular weight
- **Phrase Display**: Large, prominent sizing for readability

### Responsive Design

- Mobile-first approach
- Compact spacing on small screens
- Scales up for tablets and desktops
- Touch-friendly button sizes

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Google Cloud account with Speech-to-Text API enabled
- API credentials configured

### Environment Variables

Create a `.env.local` file with:
\`\`\`
GOOGLE_CLOUD_API_KEY=your_api_key_here
\`\`\`

### Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000` to use the app.

## Usage Guide

1. **Start Practice**: The first phrase appears automatically
2. **Listen**: Click the speaker icon to hear correct pronunciation
3. **Check Translation**: Click the info icon to see English meaning
4. **Record**: Click "Record" and speak the French phrase clearly
5. **Review Feedback**: See if your pronunciation was accepted
6. **Repeat**: Continue until you've successfully repeated 5 times
7. **Progress**: Automatically moves to next phrase or click "Skip"
8. **Complete Set**: Work through all phrases in the set

## Learning Methodology

The app implements spaced repetition and deliberate practice principles:

- **Repetition**: 5 successful attempts reinforce muscle memory
- **Immediate Feedback**: Real-time evaluation helps correct mistakes
- **Audio Modeling**: Hear correct pronunciation before attempting
- **Context**: Translations provide meaning and context
- **Progress Visualization**: Emotional feedback maintains motivation

## Future Enhancements

Potential features for future development:

- User accounts and progress persistence
- Multiple phrase sets and difficulty levels
- Detailed pronunciation analytics
- Offline mode with pre-recorded audio
- Social features and leaderboards
- Custom phrase set creation

## License

This project is for educational purposes.
