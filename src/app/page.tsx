"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import SmoothScroll from "@/components/SmoothScroll";
import SearchForm from "@/components/SearchForm";
import RoastResult from "@/components/RoastResult";
import LoadingState from "@/components/LoadingState";
import { RoastResponse } from "@/lib/types";

type ViewState = "search" | "loading" | "result";

export default function HomePage() {
  const [view, setView] = useState<ViewState>("search");
  const [result, setResult] = useState<RoastResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

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

  async function handleSearch(name: string, realm: string, region: string) {
    setView("loading");
    setResult(null);
    setError(null);

    const startTime = Date.now();
    const MIN_LOADING_MS = 8000; // Minimum 8 seconds to enjoy the loading punchlines

    try {
      const locale = navigator.language || "en";
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, realm, region, locale }),
      });

      const data: RoastResponse = await res.json();

      // Wait remaining time if API was fast
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
      {/* Loading - Full page takeover */}
      {view === "loading" && <LoadingState />}

      {/* Search View */}
      {view === "search" && (
        <div className="min-h-screen ember-bg flex flex-col">
          {/* Ambient glow */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

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

            <p
              ref={taglineRef}
              className="text-3xl md:text-4xl text-white/90 font-cinzel font-bold mb-16 opacity-0"
            >
              Roast me !
            </p>

            <SearchForm onSearch={handleSearch} isLoading={false} />

            {error && (
              <div className="mt-8 glass-card p-5 max-w-xl w-full text-center border-red-500/20">
                <p className="text-red-400">{error}</p>
              </div>
            )}
          </div>

          <footer className="text-center py-8 text-gray-800 text-[11px] font-mono tracking-wider">
            <p>POWERED BY RAIDER.IO, WARCRAFT LOGS & AI</p>
            <p className="mt-1 text-gray-800/60">
              THIS IS SATIRE. WE DON&apos;T CARE ABOUT YOUR FEELINGS.
            </p>
          </footer>
        </div>
      )}

      {/* Result View */}
      {view === "result" && result?.data && (
        <RoastResult data={result.data} onBack={handleBack} />
      )}
    </SmoothScroll>
  );
}
