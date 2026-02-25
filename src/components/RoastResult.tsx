"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { getClassColor } from "@/lib/class-data";
import { RoastResponse } from "@/lib/types";

// ── Nettoie + expand abréviations avant TTS ───────────────────────────────────
function cleanForTTS(raw: string, lang: "fr" | "en"): string {
  const isFr = lang === "fr";

  const ABBR_FR: [RegExp, string][] = [
    [/\bWoW\b/g,        "World of Warcraft"],
    [/\bM\+\+?\b/g,     "Mythique Plus"],
    [/\biLvl\b/gi,      "niveau d'objet"],
    [/\bilvl\b/gi,      "niveau d'objet"],
    [/\bRL\b/g,         "chef de raid"],
    [/\bGM\b/g,         "chef de guilde"],
    [/\bLFR\b/g,        "cherche raid"],
    [/\bMDI\b/g,        "Mythic Dungeon Invitational"],
    [/\bDPS\b/g,        "dégâts par seconde"],
    [/\bHPS\b/g,        "soins par seconde"],
    [/\bAoE\b/gi,       "zone de dégâts"],
    [/\bCD\b/g,         "temps de recharge"],
    [/\bGCD\b/g,        "temps de recharge global"],
    [/(\d+)\/(\d+)M\b/g, "$1 sur $2 en Mythique"],
    [/(\d+)\/(\d+)H\b/g, "$1 sur $2 en Héroïque"],
    [/(\d+)\/(\d+)N\b/g, "$1 sur $2 en Normal"],
    [/\+(\d+)\b/g,      "plus $1"],
  ];

  const ABBR_EN: [RegExp, string][] = [
    [/\bWoW\b/g,        "World of Warcraft"],
    [/\bM\+\+?\b/g,     "Mythic Plus"],
    [/\biLvl\b/gi,      "item level"],
    [/\bilvl\b/gi,      "item level"],
    [/\bRL\b/g,         "raid leader"],
    [/\bGM\b/g,         "guild master"],
    [/\bLFR\b/g,        "looking for raid"],
    [/\bMDI\b/g,        "Mythic Dungeon Invitational"],
    [/\bHPS\b/g,        "healing per second"],
    [/\bAoE\b/gi,       "area of effect"],
    [/\bCD\b/g,         "cooldown"],
    [/\bGCD\b/g,        "global cooldown"],
    [/(\d+)\/(\d+)M\b/g, "$1 out of $2 Mythic"],
    [/(\d+)\/(\d+)H\b/g, "$1 out of $2 Heroic"],
    [/(\d+)\/(\d+)N\b/g, "$1 out of $2 Normal"],
    [/\+(\d+)\b/g,      "plus $1"],
  ];

  let text = raw
    // Strip emojis
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, "")
    .replace(/[\u2600-\u27BF]/gu, "")
    .replace(/[\u{1F300}-\u{1FBFF}]/gu, "")
    // Strip markdown
    .replace(/\*+/g, "").replace(/_+/g, "").replace(/#{1,6}\s/g, "")
    .replace(/\n{3,}/g, "\n\n");

  const abbrs = isFr ? ABBR_FR : ABBR_EN;
  for (const [pattern, replacement] of abbrs) {
    text = text.replace(pattern, replacement);
  }

  return text.trim();
}

// ── Web Speech API fallback ───────────────────────────────────────────────────
function speakWebSpeech(
  text: string,
  lang: "fr" | "en",
  volume: number,
  onStart: () => void,
  onEnd: () => void
): () => void {
  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang   = lang === "fr" ? "fr-FR" : "en-US";
  utterance.rate   = 1.05;
  utterance.volume = volume;

  const pickVoice = () => {
    const voices = synth.getVoices();
    const code = lang === "fr" ? "fr" : "en";
    const pool = voices.filter((v) => v.lang.toLowerCase().startsWith(code));
    return (
      pool.find((v) => /natural|neural|enhanced|premium/i.test(v.name)) ||
      pool.find((v) => !v.localService) ||
      pool[0] || null
    );
  };

  const start = () => {
    const v = pickVoice();
    if (v) utterance.voice = v;
    utterance.onstart = onStart;
    utterance.onend   = onEnd;
    utterance.onerror = onEnd;
    synth.speak(utterance);
    // Chrome cuts off after ~15s — keepalive
    const ka = setInterval(() => {
      if (synth.speaking) { synth.pause(); synth.resume(); }
      else clearInterval(ka);
    }, 10000);
  };

  if (synth.getVoices().length > 0) start();
  else { synth.onvoiceschanged = () => { synth.onvoiceschanged = null; start(); }; }

  return () => synth.cancel();
}

// ── Text-to-Speech hook ───────────────────────────────────────────────────────
function useTTS(text: string, lang: "fr" | "en") {
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [volume, setVolume]     = useState(1);
  const audioRef   = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const stopWSRef  = useRef<(() => void) | null>(null);
  const volumeRef  = useRef(1);

  useEffect(() => {
    volumeRef.current = volume;
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    if (stopWSRef.current) { stopWSRef.current(); stopWSRef.current = null; }
    setSpeaking(false);
  }, []);

  const speak = useCallback(async () => {
    if (speaking) { stop(); return; }
    if (loading) return;

    const cleaned = cleanForTTS(text, lang);
    setLoading(true);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleaned, lang, gender: "female" }),
      });

      // Quota épuisé ou erreur → fallback Web Speech
      if (!res.ok) {
        setLoading(false);
        if (typeof window !== "undefined" && window.speechSynthesis) {
          setSpeaking(true);
          stopWSRef.current = speakWebSpeech(
            cleaned, lang, volumeRef.current,
            () => setSpeaking(true),
            () => { stopWSRef.current = null; setSpeaking(false); }
          );
        }
        return;
      }

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      blobUrlRef.current = url;

      const audio = new Audio(url);
      audio.volume = volumeRef.current;
      audioRef.current = audio;
      audio.onended = stop;
      audio.onerror = stop;
      await audio.play();
      setSpeaking(true);
    } catch {
      // Fallback Web Speech sur toute erreur réseau
      if (typeof window !== "undefined" && window.speechSynthesis) {
        setSpeaking(true);
        stopWSRef.current = speakWebSpeech(
          cleaned, lang, volumeRef.current,
          () => setSpeaking(true),
          () => { stopWSRef.current = null; setSpeaking(false); }
        );
      } else {
        stop();
      }
    } finally {
      setLoading(false);
    }
  }, [text, lang, speaking, loading, stop]);

  useEffect(() => () => stop(), [stop]);

  return { speaking, loading, volume, setVolume, speak };
}

interface RoastResultProps {
  data: NonNullable<RoastResponse["data"]>;
  onBack: () => void;
  lang: "fr" | "en";
}

function useTypewriter(text: string, speed: number = 8) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

export default function RoastResult({ data, onBack, lang }: RoastResultProps) {
  const { character, mythicPlus, raidProgression, roast, roastTitle, punchline } = data;
  const classColor = getClassColor(character.class);
  const latestRaid = raidProgression[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const roastBoxRef = useRef<HTMLDivElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const { displayed: typedRoast, done: typingDone } = useTypewriter(roast, 8);
  const [sharing, setSharing] = useState(false);

  // TTS — read the full roast + punchline
  const ttsText = [roastTitle, roast, punchline].filter(Boolean).join("\n\n");
  const { speaking, loading: ttsLoading, volume, setVolume, speak } = useTTS(ttsText, lang);

  const handleShare = useCallback(async () => {
    if (!shareCardRef.current) return;
    setSharing(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0a0a0f",
        logging: false,
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `wowroast-${character.name.toLowerCase()}.png`;
      a.click();
    } catch {
      // Silently fail
    } finally {
      setSharing(false);
    }
  }, [character, roast, roastTitle, punchline]);


  // Entry animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
      .fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        "-=0.3"
      )
      .fromTo(
        roastBoxRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );
  }, []);

  // Title gradient animation
  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        backgroundPosition: "200% center",
        duration: 3,
        repeat: -1,
        ease: "none",
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center px-4 pt-8 pb-12 ember-bg"
    >
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Back button */}
      <button
        onClick={onBack}
        className="self-start mb-6 flex items-center gap-2 text-gray-700 hover:text-blue-400 transition-colors duration-300 group"
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-sm font-mono tracking-wider">
          {lang === "fr" ? "RETOUR" : "BACK"}
        </span>
      </button>

      {/* Main content - wide layout */}
      <div className="w-full max-w-5xl">
        {/* Character Card */}
        <div
          ref={cardRef}
          className="glass-card p-6 flex flex-col md:flex-row items-center gap-6 mb-8"
        >
          {character.thumbnailUrl && (
            <div
              className="relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0"
              style={{ borderColor: classColor }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={character.thumbnailUrl}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex-1 text-center md:text-left">
            <h2
              className="text-2xl font-bold font-cinzel tracking-wide"
              style={{ color: classColor }}
            >
              {character.name}
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              {character.race} {character.spec} {character.class} &bull;{" "}
              {character.realm} ({character.region.toUpperCase()}) &bull;{" "}
              {character.faction}
            </p>
          </div>

          <div className="flex gap-8 shrink-0 items-center">
            <div className="text-center">
              <p
                className="text-2xl font-bold font-cinzel"
                style={{ color: classColor }}
              >
                {character.ilvl}
              </p>
              <p className="text-[10px] text-gray-700 uppercase tracking-[0.2em] font-mono">
                iLvl
              </p>
            </div>
            <div className="w-px h-8 bg-white/[0.06]" />
            <div className="text-center">
              <p className="text-2xl font-bold font-cinzel text-blue-400">
                {mythicPlus.score.toFixed(0)}
              </p>
              <p className="text-[10px] text-gray-700 uppercase tracking-[0.2em] font-mono">
                M+ Score
              </p>
            </div>
            {latestRaid && (
              <>
                <div className="w-px h-8 bg-white/[0.06]" />
                <div className="text-center">
                  <p className="text-lg font-bold font-cinzel text-blue-400">
                    {latestRaid.summary}
                  </p>
                  <p className="text-[10px] text-gray-700 uppercase tracking-[0.2em] font-mono">
                    {latestRaid.raidName.split(" ").slice(0, 2).join(" ")}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Roast Title */}
        <h3
          ref={titleRef}
          className="text-3xl md:text-5xl font-black font-cinzel text-center mb-8 leading-tight"
          style={{
            background:
              "linear-gradient(90deg, #e2e8f0, #60a5fa, #818cf8, #60a5fa, #e2e8f0)",
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {roastTitle}
        </h3>

        {/* Roast Text */}
        <div
          ref={roastBoxRef}
          className="glass-card p-10 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

          <div
            className={`text-gray-300 leading-[2] text-lg whitespace-pre-line ${
              !typingDone ? "cursor-blink" : ""
            }`}
          >
            {typedRoast}
          </div>

          {/* Punchline — shown after typing is done */}
          {typingDone && punchline && (
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <p className="text-base md:text-lg font-semibold text-blue-300 leading-relaxed">
                {punchline}
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-between">
            <p className="text-[11px] text-gray-800 font-mono tracking-wider">
              ROASTED BY AI &bull; DATA FROM RAIDER.IO & WCL
            </p>
            <div className="flex items-center gap-4">

              {/* TTS — speaker + volume */}
              {typingDone && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={speak}
                    disabled={ttsLoading}
                    title={speaking
                      ? (lang === "fr" ? "Arrêter" : "Stop")
                      : (lang === "fr" ? "Écouter le roast" : "Listen to roast")}
                    className={`flex items-center gap-1.5 text-[11px] font-mono tracking-wider transition-colors disabled:cursor-wait
                      ${speaking
                        ? "text-blue-400 hover:text-red-400"
                        : ttsLoading
                          ? "text-blue-400/50"
                          : "text-blue-400/30 hover:text-blue-400"
                      }`}
                  >
                    {ttsLoading ? (
                      <>
                        <span className="w-3.5 h-3.5 border border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                        {lang === "fr" ? "GÉNÉRATION..." : "GENERATING..."}
                      </>
                    ) : speaking ? (
                      <>
                        <span className="relative flex items-center">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                          </svg>
                          <span className="ml-1 flex items-end gap-[2px]" style={{height:"12px"}}>
                            {[0, 0.15, 0.3, 0.45].map((delay, i) => (
                              <span key={i} style={{width:"2px",backgroundColor:"#60a5fa",borderRadius:"1px",animation:`tts-bar 0.8s ease-in-out ${delay}s infinite`,height:"100%"}} />
                            ))}
                          </span>
                        </span>
                        STOP
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                        </svg>
                        {lang === "fr" ? "ÉCOUTER" : "LISTEN"}
                      </>
                    )}
                  </button>

                  {/* Volume slider — toujours visible */}
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-16 h-[2px] accent-blue-400 cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
                    title={lang === "fr" ? "Volume" : "Volume"}
                  />
                </div>
              )}

              {/* Share PNG */}
              <button
                onClick={handleShare}
                disabled={!typingDone || sharing}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-400/20 bg-blue-400/[0.04]
                           text-[12px] font-mono tracking-wider text-blue-400/50 hover:text-blue-400
                           hover:border-blue-400/40 hover:bg-blue-400/[0.08] transition-all duration-200
                           disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {sharing ? (
                  <>
                    <span className="w-4 h-4 border border-white/10 border-t-blue-400/70 rounded-full animate-spin" />
                    GENERATING...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    SCREENSHOT
                  </>
                )}
              </button>
              <a
                href={character.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-400/30 hover:text-blue-400 transition-colors font-mono tracking-wider"
              >
                RAIDER.IO
              </a>
            </div>
          </div>
        </div>

        {/* Roast Another button */}
        <div className="text-center mt-10">
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-gray-600
                       hover:text-blue-400 hover:border-blue-400/20 transition-all duration-300
                       text-sm font-mono tracking-[0.15em] uppercase"
          >
            {lang === "fr" ? "Roast un autre" : "Roast Another"}
          </button>
        </div>
      </div>

      {/* ── Hidden share card captured by html2canvas ── */}
      <div
        ref={shareCardRef}
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "800px",
          background: "#0a0a0f",
          padding: "48px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <span style={{ color: "#374151", fontSize: "11px", letterSpacing: "0.2em" }}>WOWROAST.COM</span>
          <span style={{ color: classColor, fontSize: "11px", letterSpacing: "0.15em" }}>
            {character.spec.toUpperCase()} {character.class.toUpperCase()}
          </span>
        </div>

        {/* Character info */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{ color: classColor, fontSize: "22px", fontWeight: "bold", marginBottom: "6px" }}>
            {character.name}
          </p>
          <p style={{ color: "#6b7280", fontSize: "13px" }}>
            {character.realm} ({character.region.toUpperCase()}) &nbsp;·&nbsp; iLvl {character.ilvl} &nbsp;·&nbsp; M+ {mythicPlus.score.toFixed(0)}
          </p>
        </div>

        {/* Roast title */}
        <p style={{ color: "#818cf8", fontSize: "24px", fontWeight: "900", marginBottom: "28px", lineHeight: "1.3" }}>
          {roastTitle}
        </p>

        {/* Separator */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "28px" }} />

        {/* Roast text */}
        <p style={{ color: "#d1d5db", fontSize: "15px", lineHeight: "1.9", whiteSpace: "pre-line" }}>
          {roast}
        </p>

        {/* Punchline */}
        {punchline && (
          <>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "28px 0" }} />
            <p style={{ color: "#60a5fa", fontSize: "17px", fontWeight: "600", lineHeight: "1.6" }}>
              {punchline}
            </p>
          </>
        )}

        {/* Footer */}
        <p style={{ color: "#1f2937", fontSize: "11px", marginTop: "32px", letterSpacing: "0.15em" }}>
          ROASTED BY AI · DATA FROM RAIDER.IO & WCL · WOWROAST.COM
        </p>
      </div>
    </div>
  );
}
