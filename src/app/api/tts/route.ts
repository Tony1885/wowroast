import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

// Voices — eleven_flash_v2_5 (low latency, speed param, multilingual)
const VOICE = {
  female: {
    fr: "XB0fDUnXU5powFXDhCwa", // Charlotte — naturelle, excellente en FR
    en: "9BWtsMINqrJLrRacOk9x", // Aria      — expressive en EN
  },
  male: {
    fr: "N2lVS1w4EtoT3dr4eOWO", // Callum — grave, authoritative en FR
    en: "pNInz6obpgDQGcFmaJgB", // Adam   — commanding en EN
  },
};

export async function POST(request: NextRequest) {
  try {
    const { text, lang, gender } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "TTS not configured" }, { status: 500 });
    }

    const g = gender === "male" ? "male" : "female";
    const voiceId = VOICE[g][lang === "fr" ? "fr" : "en"];

    // /stream endpoint — audio starts flowing before full generation
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: text.substring(0, 3000),
          model_id: "eleven_flash_v2_5", // latence minimale + param speed
          speed: 1.15,                   // légèrement plus rapide, naturel
          voice_settings: {
            stability: 0.38,
            similarity_boost: 0.78,
            style: 0.45,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("[TTS] ElevenLabs error:", res.status, err);
      // Signal quota exceeded specifically so client can fall back
      if (res.status === 401 || err.includes("quota_exceeded")) {
        return NextResponse.json({ error: "quota_exceeded" }, { status: 429 });
      }
      return NextResponse.json({ error: "TTS service error" }, { status: 500 });
    }

    // Pipe le stream directement au client sans tout bufferiser
    return new NextResponse(res.body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("[TTS] Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
