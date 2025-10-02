import { NextRequest, NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import path from "path";
import fs from "fs";

// Initialize the Text-to-Speech client with credentials
// In production (Vercel), use environment variables
// In development, use the JSON file
let ttsClient: TextToSpeechClient;

const credentialsPath = path.join(
  process.cwd(),
  "text-to-speech-for-video-app-d10d2fa62487.json"
);

if (fs.existsSync(credentialsPath)) {
  // Development: use the JSON file
  console.log("📄 [TTS] Using credentials from JSON file");
  ttsClient = new TextToSpeechClient({
    keyFilename: credentialsPath,
  });
} else {
  // Production: use environment variables
  console.log("🔐 [TTS] Using credentials from environment variables");
  ttsClient = new TextToSpeechClient({
    credentials: {
      client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    console.log(
      "🎵 [TTS] Received request for text:",
      text?.substring(0, 50) + "..."
    );

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // TTS Request Configuration
    const requestPayload = {
      input: { text },
      voice: {
        languageCode: "fr-FR",
        name: "fr-FR-Neural2-D", // High-quality Neural2 voice for French
      },
      audioConfig: {
        audioEncoding: "MP3" as const,
        speakingRate: 0.9,
        pitch: 0.0,
      },
    };

    console.log("📤 [TTS] Sending to Google Text-to-Speech...");
    console.log("🔧 [TTS] Voice config:", requestPayload.voice);
    console.log("🔧 [TTS] Audio config:", requestPayload.audioConfig);

    // Synthesize speech using Google Cloud TTS client
    const [response] = await ttsClient.synthesizeSpeech(requestPayload);

    console.log("📥 [TTS] Google response received");
    console.log(
      "🎵 [TTS] Audio content size:",
      response.audioContent?.length || 0,
      "bytes"
    );

    if (!response.audioContent) {
      throw new Error("No audio content received from TTS service");
    }

    // Convert audio content to buffer
    const audioBuffer = Buffer.from(response.audioContent as Uint8Array);

    console.log(
      "✅ [TTS] Audio buffer created, size:",
      audioBuffer.length,
      "bytes"
    );

    // Return audio as MP3 binary data with appropriate headers
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mp3",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("❌ [TTS] API error:", error);
    console.error("❌ [TTS] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: "Failed to synthesize speech",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
