import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Google Cloud Text-to-Speech API configuration
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error("Google API key not found - falling back to native TTS");
      return NextResponse.json(
        { error: "Google API key not configured - please use native TTS" },
        { status: 503 } // Service unavailable, not internal error
      );
    }

    const ttsRequest = {
      input: { text },
      voice: {
        languageCode: "fr-FR",
        name: "fr-FR-Wavenet-A", // High-quality French voice
        ssmlGender: "NEUTRAL",
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 0.9,
        pitch: 0.0,
      },
    };

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ttsRequest),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Google TTS API error:", errorData);
      return NextResponse.json(
        { error: "Failed to synthesize speech" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the base64 audio data
    return NextResponse.json({
      audioContent: data.audioContent,
      mimeType: "audio/mp3",
    });
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
