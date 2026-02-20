import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

// ElevenLabs voice IDs — multilingual_v2 model handles FR natively
const VOICE = {
  fr: "N2lVS1w4EtoT3dr4eOWO", // Callum — deep, authoritative, great in French
  en: "pNInz6obpgDQGcFmaJgB", // Adam   — deep, commanding
};

export async function POST(request: NextRequest) {
  try {
    const { text, lang } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "TTS not configured" }, { status: 500 });
    }

    const voiceId = lang === "fr" ? VOICE.fr : VOICE.en;

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: text.substring(0, 3000),
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.35,         // plus expressif, moins monotone
            similarity_boost: 0.78,
            style: 0.42,             // accent sur le style / attitude
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("[TTS] ElevenLabs error:", res.status, err);
      return NextResponse.json({ error: "TTS service error" }, { status: 500 });
    }

    const audioBuffer = await res.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[TTS] Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
