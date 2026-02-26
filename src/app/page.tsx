"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import SearchForm from "@/components/SearchForm";
import RoastResult from "@/components/RoastResult";
import LoadingState from "@/components/LoadingState";
import { RoastResponse } from "@/lib/types";

type ViewState = "search" | "loading" | "result";
type Lang = "fr" | "en";

export default function HomePage() {
  const [view, setView] = useState<ViewState>("search");
  const [result, setResult] = useState<RoastResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  // Detect browser language on mount
  useEffect(() => {
    if (navigator.language?.startsWith("fr")) {
      setLang("fr");
    }
  }, []);

  // Hero entrance animation
  useEffect(() => {
    if (view !== "search") return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );
  }, [view]);

  async function handleSearch(name: string, realm: string, region: string, ultraViolence = false) {
    setView("loading");
    setResult(null);
    setError(null);

    const startTime = Date.now();
    const MIN_LOADING_MS = 8000;

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, realm, region, locale: lang, ultraViolence }),
      });

      const data: RoastResponse = await res.json();

      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((r) => setTimeout(r, MIN_LOADING_MS - elapsed));
      }

      if (!data.success) {
        setError(data.error || "Something went wrong.");
        setView("search");
      } else {
        setResult(data);
        setView("result");
      }
    } catch {
      setError("Failed to connect to the server. Please try again.");
      setView("search");
    }
  }

  function handleBack() {
    setView("search");
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0 });
  }

  return (
    <SmoothScroll>
      {/* Loading */}
      {view === "loading" && <LoadingState lang={lang} />}

      {/* Search View */}
      {view === "search" && (
        <div className="min-h-screen ember-bg flex flex-col">
          {/* Ambient glow */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

          {/* Language toggle - top right */}
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02]
                         text-gray-500 hover:text-white hover:border-white/[0.12] transition-all duration-300
                         text-sm font-mono tracking-wider"
            >
              <span className={lang === "fr" ? "text-white" : "text-gray-600"}>
                FR
              </span>
              <span className="text-gray-700">/</span>
              <span className={lang === "en" ? "text-white" : "text-gray-600"}>
                EN
              </span>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl lg:text-9xl font-black font-cinzel text-flame tracking-tight mb-4 opacity-0"
            >
              WoWRoast
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-blue-400/30 font-mono tracking-[0.3em] uppercase mb-6 opacity-0"
            >
              .com
            </p>

            <SearchForm onSearch={handleSearch} isLoading={false} lang={lang} />

            {error && (
              <div className="mt-8 glass-card p-5 max-w-xl w-full text-center border-red-500/20">
                <p className="text-red-400">{error}</p>
              </div>
            )}
          </div>

          <footer className="text-center py-8 text-gray-800 text-[11px] font-mono tracking-wider space-y-2">
            <p className="text-gray-800/60">
              {lang === "fr"
                ? "C'EST DE LA SATIRE. VOS SENTIMENTS NE NOUS CONCERNENT PAS."
                : "THIS IS SATIRE. WE DON'T CARE ABOUT YOUR FEELINGS."}
            </p>
            <div className="flex items-center justify-center gap-3 mt-1">
              <Link href={`/mentions-legales?lang=${lang}`}
                className="px-3 py-1 rounded border border-white/[0.08] text-gray-500
                           hover:text-white hover:border-white/20 transition-all duration-200">
                {lang === "fr" ? "Mentions légales" : "Legal Notice"}
              </Link>
              <Link href={`/politique-de-confidentialite?lang=${lang}`}
                className="px-3 py-1 rounded border border-white/[0.08] text-gray-500
                           hover:text-white hover:border-white/20 transition-all duration-200">
                {lang === "fr" ? "Confidentialité" : "Privacy Policy"}
              </Link>
              <Link href={`/a-propos?lang=${lang}`}
                className="px-3 py-1 rounded border border-white/[0.08] text-gray-500
                           hover:text-white hover:border-white/20 transition-all duration-200">
                {lang === "fr" ? "À propos" : "About"}
              </Link>
            </div>
          </footer>
        </div>
      )}

      {/* Result View */}
      {view === "result" && result?.data && (
        <RoastResult data={result.data} onBack={handleBack} lang={lang} />
      )}
    </SmoothScroll>
  );
}
