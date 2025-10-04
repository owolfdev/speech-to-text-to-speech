# French Pronunciation Practice App Setup

This app uses Google Cloud Speech-to-Text API to help users practice French pronunciation.

## Prerequisites

1. **Google Cloud Account**: You need a Google Cloud account with billing enabled
2. **Google Cloud Project**: Create a new project or use an existing one
3. **Speech-to-Text API**: Enable the Speech-to-Text API in your project

## Google Cloud Setup

### 1. Enable Speech-to-Text API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Library"
4. Search for "Speech-to-Text API"
5. Click "Enable"

### 2. Create Service Account

1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name: `french-pronunciation-app`
4. Description: `Service account for French pronunciation practice app`
5. Click "Create and Continue"
6. Grant roles: `Speech-to-Text API User`
7. Click "Done"

### 3. Generate Service Account Key

1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the key file
6. **Keep this file secure and never commit it to version control**

## Environment Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Google Cloud Credentials

**Option A: Service Account Key (Recommended for development)**

1. Place your downloaded JSON key file in the project root
2. Create a `.env.local` file:

```bash
GOOGLE_APPLICATION_CREDENTIALS=./path-to-your-key.json
```

**Option B: Environment Variables**
Create a `.env.local` file with:

```bash
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_CLOUD_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
```

### 3. Run the Development Server

```bash
npm run dev
```

## Features

- **Audio Recording**: Uses Web Audio API to record user speech
- **Speech-to-Text**: Converts audio to text using Google Cloud Speech-to-Text
- **Text Comparison**: Compares user pronunciation with target French phrases
- **Difficulty Levels**: Beginner, Intermediate, and Advanced phrases
- **Real-time Feedback**: Provides similarity scores and suggestions
- **Progress Tracking**: Tracks user's pronunciation accuracy over time

## Usage

1. Select a difficulty level (Beginner, Intermediate, Advanced)
2. Read the displayed French phrase
3. Click "Start Recording" and speak the phrase
4. Click "Stop" when finished
5. Click "Submit for Review" to get AI feedback
6. Review your pronunciation accuracy and suggestions
7. Move to the next phrase or practice the same one again

## Troubleshooting

### Microphone Access

- Make sure to allow microphone access when prompted
- Check your browser's microphone permissions
- Try refreshing the page if microphone access is denied

### Google Cloud API Issues

- Verify your service account has the correct permissions
- Check that the Speech-to-Text API is enabled
- Ensure your billing account is active
- Verify your credentials are correctly set up

### Audio Recording Issues

- Use a modern browser (Chrome, Firefox, Safari, Edge)
- Ensure you have a working microphone
- Try speaking closer to the microphone
- Check for background noise that might interfere

## Production Deployment

For production deployment:

1. **Use Google Cloud's default credentials** instead of service account keys
2. **Set up proper environment variables** in your hosting platform
3. **Enable CORS** if needed for your domain
4. **Consider rate limiting** for the Speech-to-Text API
5. **Monitor API usage** and costs

## Cost Considerations

Google Cloud Speech-to-Text pricing (as of 2024):

- First 60 minutes per month: Free
- After that: ~$0.006 per 15 seconds of audio
- Consider implementing usage limits for production

## Security Notes

- Never commit service account keys to version control
- Use environment variables for sensitive data
- Regularly rotate service account keys
- Monitor API usage for unusual activity
