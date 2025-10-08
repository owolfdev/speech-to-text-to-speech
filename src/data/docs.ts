export interface Doc {
  slug: string;
  title: string;
  category: string;
  order: number;
  excerpt: string;
  content: string;
}

export const docs: Doc[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    category: "Introduction",
    order: 1,
    excerpt: "Learn the basics of Répéter and start practicing French today.",
    content: `Welcome to Répéter! This guide will help you get started with practicing your French pronunciation.

## What is Répéter?

Répéter is a French pronunciation practice app that uses advanced speech recognition technology to provide instant feedback on your pronunciation. Whether you're a beginner or an advanced learner, Répéter helps you improve your speaking skills.

## Quick Start

1. **Choose a phrase** - Browse our library of French phrases or generate new ones
2. **Listen** - Click the speaker icon to hear the native pronunciation
3. **Record** - Click the microphone button and speak the phrase
4. **Review** - See instant feedback on your pronunciation

## System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Microphone access for recording
- Internet connection (offline mode available as PWA)

## Tips for Success

- Use headphones to avoid audio feedback
- Speak clearly and at a moderate pace
- Practice in a quiet environment
- Listen to the example multiple times before recording

Ready to start? Head to the [practice page](/) and choose your first phrase!`,
  },
  {
    slug: "how-it-works",
    title: "How It Works",
    category: "Introduction",
    order: 2,
    excerpt:
      "Understand the technology behind Répéter's pronunciation feedback.",
    content: `Répéter uses cutting-edge speech recognition and text-to-speech technology to help you improve your French pronunciation.

## Speech Recognition

Our app uses **Google Cloud Speech-to-Text API** to analyze your pronunciation. When you record yourself speaking:

1. Your audio is captured through your device's microphone
2. The audio is sent to Google's speech recognition service
3. The service transcribes what you said in French
4. We compare the transcription to the target phrase

## Text Comparison

After transcription, we use advanced text comparison algorithms to:

- Calculate similarity scores
- Identify specific differences
- Highlight areas for improvement
- Provide actionable feedback

## Text-to-Speech

The example pronunciations use **Google Cloud Text-to-Speech** with native French voices, giving you authentic pronunciation models to learn from.

## Privacy & Security

- Audio recordings are processed securely
- No audio is stored permanently
- User data is protected (see [Security](/docs/security))
- HTTPS encryption for all communications

## Accuracy

The system is highly accurate but not perfect. Factors that affect accuracy:

- Background noise
- Microphone quality
- Speaking clarity
- Regional accents
- Internet connection

For best results, practice in a quiet environment with a good microphone.`,
  },
  {
    slug: "features",
    title: "Features",
    category: "Introduction",
    order: 3,
    excerpt: "Explore all the features Répéter has to offer.",
    content: `Répéter is packed with features to make your French pronunciation practice effective and enjoyable.

## Core Features

### 🎤 Real-time Speech Recognition
Record your pronunciation and get instant feedback on accuracy.

### 🔊 Native Pronunciation Examples
Listen to authentic French pronunciation powered by Google's text-to-speech technology.

### 📚 Extensive Phrase Library
Access hundreds of common French phrases, expressions, and proverbs organized by category:

- Greetings and introductions
- Common expressions
- Questions and responses
- French proverbs
- Grammar examples

### 🤖 AI Phrase Generation
Generate custom practice phrases based on:
- Specific topics
- Grammar patterns
- Difficulty levels
- Your learning goals

### 📊 Visual Feedback
See your transcribed text compared with the target phrase to identify specific areas for improvement.

## Progressive Web App (PWA)

### Install on Any Device
- Add to home screen on mobile devices
- Install as desktop app
- Works offline once installed
- Fast, app-like experience

### Offline Capability
Some features work without internet:
- Browse cached phrases
- Review previous practice sessions
- Access documentation

## User Features

### 🔐 Authentication
- Secure login with Supabase
- Save your progress
- Track your practice history
- Personalized experience

### 📱 Mobile-First Design
- Responsive layout
- Touch-optimized controls
- Works on any screen size
- Native app-like feel

## Coming Soon

- Progress tracking and statistics
- Custom phrase collections
- Difficulty levels
- Practice streaks and goals
- Community features`,
  },
  {
    slug: "phrase-library",
    title: "Phrase Library",
    category: "Using Répéter",
    order: 4,
    excerpt:
      "Learn how to browse and practice from our extensive French phrase library.",
    content: `The phrase library contains hundreds of authentic French expressions organized for effective learning.

## Browsing Phrases

On the main practice page, you'll see phrase categories including:

- **Basic Expressions** - Common everyday phrases
- **Greetings** - Formal and informal greetings
- **Questions** - Essential question patterns
- **Proverbs** - Traditional French sayings
- **Grammar Examples** - Specific grammar patterns

## Phrase Information

Each phrase includes:

- **French text** - The phrase to practice
- **English translation** - Meaning in English
- **Grammar notes** - Relevant grammar points (when applicable)
- **Usage context** - When to use the phrase
- **Difficulty level** - Beginner, intermediate, or advanced

## Filtering and Search

### By Category
Select a category to see related phrases.

### By Difficulty
Filter by your skill level to find appropriate challenges.

### By Grammar Pattern
Focus on specific grammar topics you want to practice.

## Practice Tips

1. **Start with familiar phrases** - Build confidence with easier content
2. **Focus on one category** - Master related expressions together
3. **Repeat regularly** - Return to the same phrases to track improvement
4. **Mix it up** - Variety keeps practice engaging

## Random Practice

Click the shuffle/random button to get a random phrase - great for varied practice!

## Favorites (Coming Soon)

Mark phrases as favorites to create your personal practice collection.`,
  },
  {
    slug: "ai-phrase-generation",
    title: "AI Phrase Generation",
    category: "Using Répéter",
    order: 5,
    excerpt: "Generate custom French phrases tailored to your learning needs.",
    content: `Use AI to create personalized practice phrases based on your specific learning goals.

## How to Generate Phrases

1. Click the **"Generate Phrases"** button
2. Enter a topic, theme, or grammar pattern
3. Specify the number of phrases you want
4. Click generate and wait for AI to create them

## What You Can Request

### By Topic
- "Travel phrases for visiting Paris"
- "Restaurant and food vocabulary"
- "Business French expressions"

### By Grammar Pattern
- "Phrases using the subjunctive mood"
- "Examples of passé composé vs imparfait"
- "Conditional sentences"

### By Situation
- "Introducing yourself at a party"
- "Making a doctor's appointment"
- "Asking for directions"

### By Difficulty
- "Beginner phrases about daily routine"
- "Advanced expressions for debate"
- "Intermediate conversational phrases"

## AI Technology

Powered by **OpenAI's GPT models**, the phrase generator:

- Creates grammatically correct French
- Provides accurate English translations
- Suggests relevant grammar notes
- Considers context and usage
- Adapts to your requests

## Tips for Best Results

- **Be specific** - "Phrases about ordering coffee" works better than "food"
- **Include context** - "Formal business greetings" vs just "greetings"
- **Specify level** - Mention if you want beginner, intermediate, or advanced
- **Request grammar** - Ask for specific tenses or structures

## Example Prompts

- "10 polite phrases for asking for help in French"
- "Phrases using 'y' and 'en' pronouns"
- "Common expressions with être vs avoir"
- "Questions using est-ce que and inversion"

## Limitations

- Requires internet connection
- Generation may take a few seconds
- Quality depends on prompt clarity
- Review generated content for learning

The AI generator is a powerful tool for targeted practice on exactly what you need to learn!`,
  },
  {
    slug: "pwa-installation",
    title: "PWA Installation",
    category: "Using Répéter",
    order: 6,
    excerpt: "Install Répéter as a Progressive Web App on your device.",
    content: `Install Répéter as an app on your phone, tablet, or desktop for the best experience.

## What is a PWA?

A Progressive Web App (PWA) is a website that works like a native app:

- Installs to your device
- Works offline (limited features)
- Faster loading
- Full-screen experience
- No app store required

## Installation Instructions

### On iPhone/iPad

1. Open Répéter in **Safari** (must use Safari, not Chrome)
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it "Répéter" and tap **Add**
5. Find the app icon on your home screen

### On Android

1. Open Répéter in **Chrome**
2. Tap the **menu** (three dots)
3. Tap **"Add to Home Screen"** or **"Install App"**
4. Follow the prompts
5. Find the app icon in your app drawer

### On Desktop (Chrome/Edge)

1. Open Répéter in Chrome or Edge
2. Look for the **install icon** (⊕) in the address bar
3. Click it and select **Install**
4. The app opens in its own window
5. Access from your desktop or taskbar

### On Desktop (Safari/macOS)

1. Open Répéter in Safari
2. Go to **File** → **Add to Dock**
3. Access from your Mac dock

## Benefits of Installation

- **Faster** - App files cached locally
- **Convenient** - Launch from home screen/desktop
- **Offline** - Browse cached phrases without internet
- **Focused** - Full-screen, distraction-free
- **Updates** - Automatically updates in background

## Offline Features

When installed and offline, you can:

- Browse previously loaded phrases
- View documentation
- Review your practice history

**Note:** Recording and speech recognition require internet connection.

## Troubleshooting

**Don't see install option?**
- Make sure you're using HTTPS
- Try refreshing the page
- Check browser support (use Chrome/Safari)

**App not working offline?**
- Visit while online first to cache content
- Check your service worker in browser settings
- Clear cache and reinstall if needed

## Uninstallation

- **iOS:** Long-press icon → Remove App
- **Android:** Long-press icon → Uninstall
- **Desktop:** Right-click icon → Uninstall

Enjoy the native app experience! 📱`,
  },
  {
    slug: "security",
    title: "Security & Privacy",
    category: "Reference",
    order: 7,
    excerpt: "Learn how we protect your data and ensure your privacy.",
    content: `Your privacy and security are our top priorities. Here's how we protect your data.

## Data Protection

### What We Collect

- **Account information** - Email, username (if you create an account)
- **Practice data** - Phrases you practice, timestamps
- **Audio data** - Temporarily processed, not stored

### What We Don't Collect

- Permanent audio recordings
- Personal conversations
- Location data
- Contact information

## Audio Processing

1. **Recording** - Audio captured in your browser
2. **Processing** - Sent to Google Cloud Speech API
3. **Deletion** - Audio deleted immediately after transcription
4. **No storage** - We never save your voice recordings

## Secure Communication

- **HTTPS encryption** - All data encrypted in transit
- **Secure APIs** - Google Cloud services with enterprise security
- **Authentication** - Supabase secure authentication
- **No third-party tracking** - No analytics or tracking cookies

## User Authentication

Powered by **Supabase Auth**:

- Industry-standard security
- Encrypted password storage
- Secure session management
- Optional social login
- Email verification

## Data Storage

- **Database** - Supabase PostgreSQL (encrypted at rest)
- **Location** - Secure cloud infrastructure
- **Backups** - Regular encrypted backups
- **Access** - Restricted to authorized personnel only

## Your Rights

You have the right to:

- **Access** your data
- **Export** your data
- **Delete** your account
- **Opt out** of data collection

## Compliance

- GDPR compliant (EU users)
- Privacy-first design
- Minimal data collection
- Transparent policies

## Third-Party Services

We use trusted services:

- **Google Cloud** - Speech recognition and text-to-speech
- **Supabase** - Authentication and database
- **Vercel/Your Host** - Application hosting

Each follows industry security standards.

## Best Practices

To protect yourself:

- Use a strong, unique password
- Don't share your account
- Log out on shared devices
- Keep your browser updated
- Use HTTPS (always enabled)

## Reporting Issues

If you discover a security issue:

- Email: security@repeter.app
- Don't disclose publicly until resolved
- We'll respond within 48 hours

## Updates

This security policy may be updated. We'll notify users of significant changes.

**Last updated:** October 8, 2025

Your trust is important to us. We're committed to protecting your privacy while helping you learn French! 🔒`,
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    category: "Reference",
    order: 8,
    excerpt: "Common issues and how to solve them.",
    content: `Having trouble? Here are solutions to common issues.

## Microphone Issues

### Microphone Not Working

**Problem:** Recording button doesn't work or no sound detected

**Solutions:**
1. **Check permissions** - Allow microphone access in browser
2. **Check device** - Make sure microphone isn't muted
3. **Try different browser** - Chrome works best
4. **Check system settings** - Verify mic permissions in OS settings
5. **Test mic** - Use system tools to verify mic works

### Browser Permission Denied

1. Click the **lock icon** in address bar
2. Find **Microphone** permission
3. Select **Allow**
4. Refresh the page

## Audio Issues

### Can't Hear Pronunciation

**Problem:** Speaker icon doesn't play sound

**Solutions:**
1. **Check volume** - System and browser volume not muted
2. **Check device** - Speakers/headphones connected
3. **Try different browser**
4. **Check internet** - TTS requires connection

### Echo or Feedback

Use headphones to prevent the mic from picking up speaker output.

## Speech Recognition Issues

### Transcription Inaccurate

**Problem:** System doesn't recognize what you said correctly

**Causes & Solutions:**
1. **Background noise** - Practice in quiet environment
2. **Speaking too fast/slow** - Speak at moderate pace
3. **Poor pronunciation** - Keep practicing!
4. **Microphone quality** - Use better mic if possible
5. **Accent** - System trained on standard French

### "No speech detected"

1. Speak louder and clearer
2. Check mic is working
3. Reduce background noise
4. Hold mic closer (if external)

## Login Issues

### Can't Sign In

1. **Check email/password** - Verify credentials
2. **Reset password** - Use forgot password link
3. **Verify email** - Check for verification email
4. **Clear cache** - Try incognito/private mode
5. **Different browser** - Test another browser

### Email Not Received

1. Check spam/junk folder
2. Wait a few minutes
3. Request new email
4. Verify email address correct
5. Check email provider isn't blocking

## Performance Issues

### App Slow or Laggy

1. **Close other tabs** - Free up browser resources
2. **Clear cache** - Remove old cached data
3. **Update browser** - Use latest version
4. **Check internet** - Verify good connection
5. **Restart browser**

### Page Won't Load

1. Refresh the page (Ctrl+R / Cmd+R)
2. Clear browser cache
3. Check internet connection
4. Try different network
5. Disable browser extensions

## PWA Installation Issues

### Can't Install App

1. **Use supported browser** - Chrome, Safari, Edge
2. **Check HTTPS** - Must be secure connection
3. **Try different method** - Different installation path
4. **Clear cache** - Remove old service worker
5. **Update browser** - Must be recent version

### App Not Working Offline

1. **Load while online first** - Cache content
2. **Check service worker** - May need to reinstall
3. **Some features require internet** - Recording needs connection

## Known Limitations

- **Speech recognition** - Requires internet
- **TTS audio** - Requires internet  
- **Browser support** - Works best in Chrome/Safari
- **Microphone required** - Can't practice without mic

## Still Having Issues?

If none of these solutions work:

1. Note the specific error message
2. Note what you were doing when it happened
3. Try reproducing the issue
4. Contact support with details

**Contact:** support@repeter.app

We're here to help! 💪`,
  },
];

export function getDoc(slug: string): Doc | undefined {
  return docs.find((doc) => doc.slug === slug);
}

export function getAllDocSlugs(): string[] {
  return docs.map((doc) => doc.slug);
}

export function getDocsByCategory(): Record<string, Doc[]> {
  const categorized: Record<string, Doc[]> = {};

  docs.forEach((doc) => {
    if (!categorized[doc.category]) {
      categorized[doc.category] = [];
    }
    categorized[doc.category].push(doc);
  });

  // Sort docs within each category by order
  Object.keys(categorized).forEach((category) => {
    categorized[category].sort((a, b) => a.order - b.order);
  });

  return categorized;
}
