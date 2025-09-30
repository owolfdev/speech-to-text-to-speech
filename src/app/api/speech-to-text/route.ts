import { NextRequest, NextResponse } from "next/server";
import { SpeechClient } from "@google-cloud/speech";

// Initialize the Speech client
const speechClient = new SpeechClient({
  // In production, use environment variables for credentials
  // For now, we'll use the default credentials
});

export async function POST(request: NextRequest) {
  try {
    const { audioData, mimeType } = await request.json();

    if (!audioData) {
      return NextResponse.json(
        { error: "No audio data provided" },
        { status: 400 }
      );
    }

    // Convert base64 audio to buffer
    const audioBytes = Buffer.from(audioData, "base64");

    // Determine encoding based on MIME type
    let encoding: any = "WEBM_OPUS";
    let sampleRate = 48000;

    if (mimeType?.includes("mp4") || mimeType?.includes("m4a")) {
      encoding = "MP3"; // Google Cloud accepts MP3 for MP4 audio
      sampleRate = 44100;
    } else if (mimeType?.includes("ogg")) {
      encoding = "OGG_OPUS";
      sampleRate = 48000;
    }

    // Configure the request
    const request_config = {
      encoding,
      sampleRateHertz: sampleRate,
      languageCode: "fr-FR", // French language
      alternativeLanguageCodes: ["en-US"], // Fallback to English
      enableAutomaticPunctuation: true,
      model: "latest_long", // Use the latest model for better accuracy
    };

    const audio = {
      content: audioBytes,
    };

    const request_body = {
      audio: audio,
      config: request_config,
    };

    // Perform the transcription
    const [response] = await speechClient.recognize(request_body);
    const transcription = response.results
      ?.map((result) => result.alternatives?.[0]?.transcript)
      .join(" ")
      .trim();

    return NextResponse.json({
      transcription: transcription || "",
      confidence: response.results?.[0]?.alternatives?.[0]?.confidence || 0,
    });
  } catch (error) {
    console.error("Speech-to-text error:", error);
    return NextResponse.json(
      { error: "Failed to process speech" },
      { status: 500 }
    );
  }
}
