# French Pronunciation Practice App

A Next.js web application that helps users practice French pronunciation using Google Speech-to-Text API. The app provides real-time audio recording, speech transcription, and intelligent feedback on pronunciation accuracy.

## 🎯 Features

### Core Functionality

- **Audio Recording**: Record your French pronunciation directly in the browser
- **Speech-to-Text**: Powered by Google Cloud Speech-to-Text API with French language support
- **Pronunciation Analysis**: Compare spoken text with target phrases using similarity algorithms
- **Smart Feedback**: Get detailed feedback and suggestions for improvement
- **Progress Tracking**: Track your accuracy score and attempt statistics

### Practice System

- **Difficulty Levels**: Beginner, Intermediate, and Advanced French phrases
- **Randomized Practice**: Get random phrases from curated French phrase database
- **Category-based Learning**: Phrases organized by categories (greetings, restaurant, business, etc.)
- **Real-time Scoring**: Immediate feedback with similarity percentage

### Technical Features

- **Multi-format Audio Support**: Supports WebM, MP4, MP3, WAV, FLAC, and OGG formats
- **Mobile Compatible**: Optimized for mobile devices with proper MIME type handling
- **File Upload Testing**: Upload audio files to test Google Speech-to-Text functionality
- **Responsive Design**: Modern UI with dark/light mode support

## 🏗️ Architecture

### Frontend (Next.js 15)

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks for audio recording and app state
- **Audio Processing**: Web Audio API with MediaRecorder

### Backend (API Routes)

- **Speech Processing**: Google Cloud Speech-to-Text API integration
- **Audio Format Detection**: Automatic MIME type detection and encoding
- **Error Handling**: Comprehensive error handling and logging
- **Development/Production**: Dual credential system (JSON file vs environment variables)

### Key Components

#### `PronunciationPractice.tsx`

Main component handling:

- Phrase selection and display
- Audio recording controls
- File upload functionality
- Results display and feedback
- Score tracking

#### `useAudioRecorder.ts`

Custom hook for:

- Microphone access management
- Audio recording with pause/resume
- Format detection and compatibility
- Base64 conversion for API transmission

#### `text-comparison.ts`

Text analysis utilities:

- Levenshtein distance calculation
- Text normalization (accent removal, case handling)
- Similarity scoring
- Feedback generation

#### API Route (`/api/speech-to-text/route.ts`)

Backend processing:

- Google Cloud Speech-to-Text integration
- Multi-format audio support
- Confidence scoring
- Error handling and logging

## 📊 Data Structure

### French Phrases

```typescript
interface FrenchPhrase {
  id: string;
  text: string; // French phrase
  english: string; // English translation
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string; // greetings, restaurant, business, etc.
}
```

### Pronunciation Results

```typescript
interface PronunciationResult {
  transcription: string; // What was transcribed
  similarity: number; // Similarity score (0-1)
  isAcceptable: boolean; // Above threshold (0.7)
  suggestions: string[]; // Feedback suggestions
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Google Cloud Platform account with Speech-to-Text API enabled
- Google Cloud service account with Speech-to-Text permissions

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd google-tts-stt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Google Cloud Setup**

   **Development (using JSON file):**

   - Download your service account JSON key file
   - Rename it to `text-to-speech-for-video-app-d10d2fa62487.json`
   - Place it in the project root

   **Production (using environment variables):**

   ```bash
   export GOOGLE_CLOUD_CLIENT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
   export GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
   export GOOGLE_CLOUD_PROJECT_ID="your-project-id"
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Audio Recording Settings

The app automatically detects the best audio format for your browser:

- **Chrome/Firefox**: WebM with Opus codec
- **Safari/iOS**: MP4 format
- **Fallback**: Browser default format

### Speech-to-Text Configuration

```typescript
const config = {
  languageCode: "fr-FR", // French (France)
  alternativeLanguageCodes: ["en-US"], // Fallback to English
  enableAutomaticPunctuation: true, // Auto punctuation
  encoding: "WEBM_OPUS", // Detected format
  sampleRateHertz: 48000, // Optimized sample rate
};
```

### Pronunciation Thresholds

- **Acceptable**: 70% similarity or higher
- **Good**: 80% similarity or higher
- **Excellent**: 90% similarity or higher

## 📱 Mobile Compatibility

### iOS/Safari Considerations

- Requires HTTPS for microphone access
- Uses MP4 audio format for better compatibility
- Automatic format detection and fallback

### Android/Chrome

- Full WebM Opus support
- Native microphone integration
- Optimized for mobile recording

## 🎨 UI/UX Features

### Modern Design

- Gradient backgrounds with dark/light mode
- Card-based layout with clear visual hierarchy
- Responsive design for all screen sizes
- Intuitive recording controls with visual feedback

### User Experience

- Real-time recording timer
- Audio playback before submission
- Clear success/error states
- Helpful error messages for common issues

## 🔍 Testing Mode

The app includes a testing mode for developers:

- Upload any audio file (.ogg, .mp3, .wav, .webm, etc.)
- Test Google Speech-to-Text transcription
- View raw transcription results
- Useful for debugging and API testing

## 📈 Performance Features

### Audio Optimization

- Automatic echo cancellation and noise suppression
- Optimized sample rates for different formats
- Efficient base64 encoding for API transmission
- Streaming audio processing

### Error Handling

- Comprehensive error logging
- User-friendly error messages
- Graceful fallbacks for unsupported features
- Mobile-specific error guidance

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/speech-to-text/ # API route for STT
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── PronunciationPractice.tsx
│   └── ui/                 # Reusable UI components
├── data/                   # Static data
│   └── french-phrases.ts   # Phrase database
├── hooks/                  # Custom React hooks
│   └── useAudioRecorder.ts
└── lib/                    # Utility functions
    ├── text-comparison.ts
    └── utils.ts
```

## 🔐 Security

- Service account credentials handled securely
- Environment variable support for production
- No audio data stored permanently
- HTTPS required for production deployment

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables for Production

```
GOOGLE_CLOUD_CLIENT_EMAIL
GOOGLE_CLOUD_PRIVATE_KEY
GOOGLE_CLOUD_PROJECT_ID
```

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

---

**Note**: This app requires microphone permissions and works best with HTTPS in production environments.
