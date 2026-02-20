"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const PUNCHLINES = [
  "Pulling up your armory... this might hurt.",
  "Checking your parses... oh no.",
  "Your guild leader is watching.",
  "Inspecting your gear... interesting choices.",
  "Reading your combat logs... yikes.",
  "Counting your depleted keys...",
  "Your healer just left the chat.",
  "Even the target dummy is disappointed.",
  "Loading maximum brutality...",
  "Asking your raid leader for comments...",
  "Grey parse detected. Generating insults...",
  "Your DPS makes the tank cry.",
  "Checking if you've ever timed a key...",
  "Your rotation called. It wants a divorce.",
  "We found your logs. We wish we hadn't.",
  "Calculating exactly how bad you are...",
  "Cross-referencing your shame with Raider.io...",
  "Even LFR groups would decline you.",
  "Your pet does more damage than you.",
  "Preparing emotional damage...",
];

interface LoadingProps {
  lang: "fr" | "en";
}

const PUNCHLINES_FR = [
  "On fouille ton armurerie... ca va piquer.",
  "On regarde tes parses... oh non.",
  "Ton GM est en train de regarder.",
  "Inspection de ton stuff... choix interessants.",
  "Lecture de tes logs... aie.",
  "On compte tes cles depletees...",
  "Ton heal vient de quitter le groupe.",
  "Meme le mannequin d'entrainement est decu.",
  "Chargement de la brutalite maximale...",
  "On demande l'avis de ton RL...",
  "Parse gris detecte. Generation d'insultes...",
  "Ton DPS fait pleurer le tank.",
  "On verifie si t'as deja time une cle...",
  "Ta rotation a demande le divorce.",
  "On a trouve tes logs. On regrette.",
  "Calcul precis de ta nullite...",
  "Meme les groupes LFR te refuseraient.",
  "Ton pet fait plus de degats que toi.",
  "Preparation des degats emotionnels...",
  "Cross-reference de ta honte avec Raider.io...",
];

export default function LoadingState({ lang }: LoadingProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );
    }
  }, []);

  useEffect(() => {
    const source = lang === "fr" ? PUNCHLINES_FR : PUNCHLINES;
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    let index = 0;

    // Show first line immediately
    setDisplayedLines([shuffled[0]]);
    index = 1;

    const interval = setInterval(() => {
      if (index >= shuffled.length) {
        index = 0;
      }
      setDisplayedLines((prev) => {
        const next = [...prev, shuffled[index]];
        return next.slice(-8);
      });
      index++;
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  // Animate new lines
  useEffect(() => {
    if (linesRef.current) {
      const lastLine = linesRef.current.lastElementChild;
      if (lastLine) {
        gsap.fromTo(
          lastLine,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    }
  }, [displayedLines]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 fixed inset-0 bg-[#07070a] z-50"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Orb */}
      <div className="relative mb-14">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 animate-pulse blur-sm" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/80 to-blue-400 animate-pulse" />
        <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-blue-300 animate-spin" />
      </div>

      {/* Terminal lines */}
      <div ref={linesRef} className="max-w-xl w-full space-y-3">
        {displayedLines.map((line, i) => {
          const isLast = i === displayedLines.length - 1;
          return (
            <div
              key={`${line}-${i}`}
              className={`font-mono text-sm flex items-center justify-center gap-3 transition-opacity duration-500 ${
                isLast ? "text-blue-300" : "text-gray-700"
              }`}
            >
              <span className={isLast ? "text-blue-400" : "text-gray-800"}>
                &gt;
              </span>
              <span className={isLast ? "cursor-blink" : ""}>{line}</span>
            </div>
          );
        })}
      </div>

      <p className="text-gray-800 text-xs mt-14 font-mono tracking-[0.25em]">
        {lang === "fr" ? "ANALYSE DU PERSONNAGE EN COURS..." : "ANALYZING CHARACTER DATA..."}
      </p>
    </div>
  );
}
