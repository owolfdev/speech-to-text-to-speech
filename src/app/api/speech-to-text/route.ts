import { NextRequest, NextResponse } from "next/server";
import { SpeechClient } from "@google-cloud/speech";
import path from "path";
import fs from "fs";

// Initialize the Speech client with credentials
// In production (Vercel), use environment variables
// In development, use the JSON file
let speechClient: SpeechClient;

const credentialsPath = path.join(
  process.cwd(),
  "text-to-speech-for-video-app-d10d2fa62487.json"
);

if (fs.existsSync(credentialsPath)) {
  // Development: use the JSON file
  console.log("📄 Using credentials from JSON file");
  speechClient = new SpeechClient({
    keyFilename: credentialsPath,
  });
} else {
  // Production: use environment variables
  console.log("🔐 Using credentials from environment variables");
  speechClient = new SpeechClient({
    credentials: {
      client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { audioData, mimeType } = await request.json();

    console.log("🎤 [API] Received request");
    console.log("📋 [API] MIME type:", mimeType);
    console.log("📊 [API] Audio data length:", audioData?.length);

    if (!audioData) {
      return NextResponse.json(
        { error: "No audio data provided" },
        { status: 400 }
      );
    }

    // Convert base64 audio to buffer
    const audioBytes = Buffer.from(audioData, "base64");
    console.log("📦 [API] Audio buffer size:", audioBytes.length, "bytes");

    // Determine encoding based on MIME type
    type AudioEncoding = "WEBM_OPUS" | "MP3" | "LINEAR16" | "FLAC" | "OGG_OPUS";
    let encoding: AudioEncoding = "LINEAR16";
    const config: {
      encoding?: AudioEncoding;
      sampleRateHertz?: number;
      languageCode: string;
      alternativeLanguageCodes: string[];
      enableAutomaticPunctuation: boolean;
    } = {
      languageCode: "fr-FR",
      alternativeLanguageCodes: ["en-US"],
      enableAutomaticPunctuation: true,
    };

    if (mimeType?.includes("webm")) {
      // WEBM with Opus codec (from microphone recording)
      encoding = "WEBM_OPUS";
      config.encoding = encoding;
      config.sampleRateHertz = 48000; // Standard for WebM Opus
      console.log("🔧 [API] Using WEBM_OPUS encoding @ 48000 Hz");
    } else if (mimeType?.includes("mp4") || mimeType?.includes("m4a")) {
      // MP4/M4A (Safari/iOS microphone)
      encoding = "MP3";
      config.encoding = encoding;
      config.sampleRateHertz = 44100;
      console.log("🔧 [API] Using MP3 encoding (for MP4) @ 44100 Hz");
    } else if (mimeType?.includes("mpeg") || mimeType?.includes("mp3")) {
      encoding = "MP3";
      config.encoding = encoding;
      config.sampleRateHertz = 44100;
      console.log("🔧 [API] Using MP3 encoding @ 44100 Hz");
    } else if (mimeType?.includes("wav")) {
      encoding = "LINEAR16";
      config.encoding = encoding;
      config.sampleRateHertz = 16000;
      console.log("🔧 [API] Using LINEAR16 (WAV) encoding @ 16000 Hz");
    } else if (mimeType?.includes("flac")) {
      encoding = "FLAC";
      config.encoding = encoding;
      config.sampleRateHertz = 16000;
      console.log("🔧 [API] Using FLAC encoding @ 16000 Hz");
    } else if (mimeType?.includes("ogg")) {
      console.log("⚠️ [API] OGG detected - assuming OGG_OPUS");
      encoding = "OGG_OPUS";
      config.encoding = encoding;
      config.sampleRateHertz = 48000;
    } else {
      console.log("⚠️ [API] Unknown format, defaulting to WEBM_OPUS");
      encoding = "WEBM_OPUS";
      config.encoding = encoding;
      config.sampleRateHertz = 48000;
    }

    const request_config = config;

    const audio = {
      content: audioBytes,
    };

    const request_body = {
      audio: audio,
      config: request_config,
    };

    console.log("📤 [API] Sending to Google Speech-to-Text...");
    // Perform the transcription
    const [response] = await speechClient.recognize(request_body);

    console.log("📥 [API] Google response received");
    console.log("🔍 [API] Results count:", response.results?.length || 0);

    if (response.results && response.results.length > 0) {
      console.log("✅ [API] Got results! Processing...");
      response.results.forEach((result, index) => {
        console.log(`  Result ${index}:`, result.alternatives?.[0]?.transcript);
        console.log(`  Confidence:`, result.alternatives?.[0]?.confidence);
      });
    } else {
      console.log("⚠️ [API] No results returned by Google");
      console.log("🗣️ [API] Full response:", JSON.stringify(response, null, 2));
    }

    const transcription = response.results
      ?.map((result) => result.alternatives?.[0]?.transcript)
      .join(" ")
      .trim();

    console.log("✅ [API] Final transcription:", transcription || "(empty)");

    return NextResponse.json({
      transcription: transcription || "",
      confidence: response.results?.[0]?.alternatives?.[0]?.confidence || 0,
    });
  } catch (error) {
    console.error("❌ [API] Speech-to-text error:", error);
    return NextResponse.json(
      { error: "Failed to process speech" },
      { status: 500 }
    );
  }
}
