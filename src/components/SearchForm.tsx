"use client";

import { useState, FormEvent, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface CharacterResult {
  name: string;
  realm: string;
  realmSlug: string;
  region: string;
  class: string;
  spec: string;
  faction: string;
}

interface SearchFormProps {
  onSearch: (name: string, realm: string, region: string) => void;
  isLoading: boolean;
  lang: "fr" | "en";
}

const CLASS_COLORS: Record<string, string> = {
  "Death Knight": "text-red-400",
  "Demon Hunter": "text-purple-400",
  "Druid": "text-orange-400",
  "Evoker": "text-teal-400",
  "Hunter": "text-green-400",
  "Mage": "text-sky-400",
  "Monk": "text-emerald-400",
  "Paladin": "text-yellow-400",
  "Priest": "text-gray-200",
  "Rogue": "text-yellow-500",
  "Shaman": "text-blue-400",
  "Warlock": "text-violet-400",
  "Warrior": "text-amber-600",
};

export default function SearchForm({ onSearch, isLoading, lang }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CharacterResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [error, setError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const searchCharacters = useCallback(async (q: string) => {
    if (q.length < 3) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/search/characters?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      const list: CharacterResult[] = data.results ?? [];
      setResults(list);
      setShowDropdown(list.length > 0);
      setActiveIndex(-1);
    } catch {
      setResults([]);
      setShowDropdown(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  function handleQueryChange(value: string) {
    setQuery(value);
    setError("");
    setActiveIndex(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchCharacters(value), 300);
  }

  function selectCharacter(char: CharacterResult) {
    setShowDropdown(false);
    setResults([]);
    setQuery(`${char.name} - ${char.realm}`);
    onSearch(char.name, char.realmSlug, char.region);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectCharacter(results[activeIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (activeIndex >= 0 && results[activeIndex]) {
      selectCharacter(results[activeIndex]);
      return;
    }

    setError(
      lang === "fr"
        ? "Sélectionne un personnage dans la liste"
        : "Select a character from the list"
    );
  }

  const placeholder = lang === "fr" ? "Nom du personnage..." : "Character name...";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl space-y-4 opacity-0"
    >
      <div className="relative" ref={wrapperRef}>
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            autoComplete="off"
            spellCheck={false}
            className={`w-full rounded-2xl bg-white/[0.04] border pl-5 pr-5 py-5 text-white text-lg
                       placeholder-gray-600 focus:outline-none transition-all duration-300
                       hover:border-white/[0.12] font-medium tracking-wide
                       ${isSearching
                         ? "border-blue-400/30 focus:border-blue-400/30"
                         : "border-white/[0.08] focus:border-blue-400/40 focus:ring-1 focus:ring-blue-400/20"
                       }`}
            disabled={isLoading}
          />

          {isSearching && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-400/20 border-t-blue-400/60 rounded-full animate-spin pointer-events-none" />
          )}
        </div>

        {/* Autocomplete dropdown */}
        {showDropdown && results.length > 0 && (
          <div className="absolute z-50 w-full mt-1.5 rounded-xl bg-[#0c0c10] border border-white/[0.07] shadow-2xl overflow-hidden">
            {results.map((char, i) => (
              <button
                key={`${char.name}-${char.realmSlug}-${char.region}-${i}`}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectCharacter(char)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-75
                  ${i === activeIndex ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"}
                  ${i < results.length - 1 ? "border-b border-white/[0.04]" : ""}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`shrink-0 w-1.5 h-1.5 rounded-full ${
                      char.faction === "alliance"
                        ? "bg-blue-400"
                        : char.faction === "horde"
                        ? "bg-red-500"
                        : "bg-gray-600"
                    }`}
                  />
                  <span className="text-white font-semibold truncate">{char.name}</span>
                  <span className="text-gray-600 text-sm shrink-0">—</span>
                  <span className="text-gray-400 text-sm truncate">{char.realm}</span>
                </div>
                <div className="flex items-center gap-2 ml-3 shrink-0">
                  {char.spec && (
                    <span className="text-gray-600 text-xs">{char.spec}</span>
                  )}
                  <span className={`text-xs font-mono ${CLASS_COLORS[char.class] ?? "text-gray-500"}`}>
                    {char.class}
                  </span>
                  <span className="text-gray-700 text-[10px] font-mono uppercase">
                    {char.region}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
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
