"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import gsap from "gsap";

interface SearchFormProps {
  onSearch: (name: string, realm: string, region: string) => void;
  isLoading: boolean;
  lang: "fr" | "en";
}

const REGIONS = ["EU", "US", "KR", "TW"] as const;

export default function SearchForm({ onSearch, isLoading, lang }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>("EU");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const trimmed = query.trim();
    if (!trimmed) return;

    // Parse "Name - Realm" or "Name Realm" format
    let name = "";
    let realm = "";

    if (trimmed.includes("-")) {
      const parts = trimmed.split("-").map((s) => s.trim());
      name = parts[0];
      realm = parts.slice(1).join("-"); // Handle realms with hyphens
    } else if (trimmed.includes(" ")) {
      const parts = trimmed.split(/\s+/);
      name = parts[0];
      realm = parts.slice(1).join(" ");
    } else {
      setError(
        lang === "fr"
          ? "Format : Nom - Serveur (ex: Moussman - Ysondre)"
          : "Format: Name - Realm (e.g. Moussman - Ysondre)"
      );
      return;
    }

    if (!name || !realm) {
      setError(
        lang === "fr"
          ? "Format : Nom - Serveur (ex: Moussman - Ysondre)"
          : "Format: Name - Realm (e.g. Moussman - Ysondre)"
      );
      return;
    }

    onSearch(name, realm, region.toLowerCase());
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl space-y-4 opacity-0"
    >
      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder={
            lang === "fr"
              ? "Nom - Serveur (ex: Moussman - Ysondre)"
              : "Name - Realm (e.g. Moussman - Ysondre)"
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError("");
          }}
          className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.08] pl-5 pr-28 py-5 text-white text-lg
                     placeholder-gray-600 focus:outline-none focus:border-blue-400/40
                     focus:ring-1 focus:ring-blue-400/20 transition-all duration-300
                     hover:border-white/[0.12] font-medium tracking-wide"
          disabled={isLoading}
          required
        />
        {/* Region selector inside the input */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          {REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-200 ${
                region === r
                  ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                  : "text-gray-600 hover:text-gray-400 border border-transparent"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-red-400/80 text-sm text-center font-mono">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="w-full btn-roast text-xl tracking-[0.15em]"
      >
        Roast Me !
      </button>
    </form>
  );
}
