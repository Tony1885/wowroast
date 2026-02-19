"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { getClassColor } from "@/lib/class-data";
import { RoastResponse } from "@/lib/types";

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
  const { character, mythicPlus, raidProgression, roast, roastTitle } = data;
  const classColor = getClassColor(character.class);
  const latestRaid = raidProgression[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const roastBoxRef = useRef<HTMLDivElement>(null);

  const { displayed: typedRoast, done: typingDone } = useTypewriter(roast, 8);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleShare = useCallback(async () => {
    setSharing(true);
    try {
      // Take first paragraph of roast, truncate to 280 chars
      const firstPara = roast.split("\n\n")[0] ?? roast;
      const snippet = firstPara.length > 280 ? firstPara.slice(0, 277) + "..." : firstPara;

      const params = new URLSearchParams({
        name:    character.name,
        realm:   character.realm,
        region:  character.region,
        class:   character.class,
        spec:    character.spec,
        ilvl:    String(character.ilvl),
        mplus:   String(mythicPlus.score.toFixed(0)),
        title:   roastTitle,
        snippet,
      });

      const res = await fetch(`/api/og?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to generate image");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wowroast-${character.name.toLowerCase()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // Silently fail
    } finally {
      setSharing(false);
    }
  }, [roastTitle, roast, character, mythicPlus]);

  const handleCopy = useCallback(() => {
    const textToCopy = `${roastTitle}\n\n${roast}\n\n— WoWRoast.com`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [roastTitle, roast]);

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
        {/* Character Card - horizontal */}
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

          <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-between">
            <p className="text-[11px] text-gray-800 font-mono tracking-wider">
              ROASTED BY AI &bull; DATA FROM RAIDER.IO & WCL
            </p>
            <div className="flex items-center gap-4">
              {/* Share PNG */}
              <button
                onClick={handleShare}
                disabled={!typingDone || sharing}
                className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider
                           text-blue-400/30 hover:text-blue-400 transition-colors
                           disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {sharing ? (
                  <>
                    <span className="w-3.5 h-3.5 border border-white/10 border-t-blue-400/70 rounded-full animate-spin" />
                    GENERATING...
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    SHARE PNG
                  </>
                )}
              </button>

              {/* Copy text */}
              <button
                onClick={handleCopy}
                disabled={!typingDone}
                className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider
                           text-blue-400/30 hover:text-blue-400 transition-colors
                           disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    COPIED
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    COPY ROAST
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
    </div>
  );
}
