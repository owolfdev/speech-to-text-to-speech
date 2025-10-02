import { NextRequest, NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import fs from "fs";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Dynamic credential handling for different environments
    if (
      process.env.GCLOUD_TTS_KEY &&
      !process.env.GOOGLE_APPLICATION_CREDENTIALS
    ) {
      const tmpKeyPath = "/tmp/tts-key.json";
      fs.writeFileSync(tmpKeyPath, process.env.GCLOUD_TTS_KEY, "utf8");
      process.env.GOOGLE_APPLICATION_CREDENTIALS = tmpKeyPath;
    }

    // Initialize Google Cloud TTS client
    const client = new TextToSpeechClient();

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

    // Synthesize speech using Google Cloud TTS client
    const [response] = await client.synthesizeSpeech(requestPayload);

    if (!response.audioContent) {
      throw new Error("No audio content received from TTS service");
    }

    // Convert audio content to buffer
    const audioBuffer = Buffer.from(response.audioContent as Uint8Array);

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
    console.error("TTS API error:", error);
    return NextResponse.json(
      { error: "Failed to synthesize speech" },
      { status: 500 }
    );
  }
}
