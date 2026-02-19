"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import gsap from "gsap";
import { REALMS_BY_REGION, Realm } from "@/lib/realms";

interface SearchFormProps {
  onSearch: (name: string, realm: string, region: string) => void;
  isLoading: boolean;
  lang: "fr" | "en";
}

const REGIONS = ["US", "EU", "KR", "TW"];

export default function SearchForm({ onSearch, isLoading, lang }: SearchFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [region, setRegion] = useState("");
  const [realm, setRealm] = useState<Realm | null>(null);
  const [realmQuery, setRealmQuery] = useState("");
  const [charName, setCharName] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const realmInputRef = useRef<HTMLInputElement>(null);
  const charInputRef = useRef<HTMLInputElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    if (wrapperRef.current) {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  // Autofocus realm filter when reaching step 2
  useEffect(() => {
    if (step === 2) {
      setTimeout(() => realmInputRef.current?.focus(), 50);
    }
  }, [step]);

  // Autofocus char name when reaching step 3
  useEffect(() => {
    if (step === 3) {
      setTimeout(() => charInputRef.current?.focus(), 50);
    }
  }, [step]);

  function pickRegion(r: string) {
    setRegion(r);
    setRealm(null);
    setRealmQuery("");
    setStep(2);
  }

  function pickRealm(r: Realm) {
    setRealm(r);
    setCharName("");
    setStep(3);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!realm || !region || !charName.trim()) return;
    onSearch(charName.trim(), realm.slug, region.toLowerCase());
  }

  const realmList = region
    ? (REALMS_BY_REGION[region.toLowerCase()] ?? []).filter((r) =>
        r.name.toLowerCase().includes(realmQuery.toLowerCase())
      )
    : [];

  const submitLabel = lang === "fr" ? "Roast Me !" : "Roast Me!";
  const realmPlaceholder = lang === "fr" ? "Filtrer les royaumes..." : "Filter realms...";
  const charPlaceholder = lang === "fr" ? "Nom du personnage..." : "Character name...";

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl space-y-4 opacity-0">

      {/* ── Step 1: Region ── */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-gray-400 text-sm text-center font-mono tracking-wider uppercase">
            {lang === "fr" ? "Choisis ta région" : "Select your region"}
          </p>
          <div className="grid grid-cols-4 gap-3">
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => pickRegion(r)}
                disabled={isLoading}
                className="rounded-2xl bg-white/[0.04] border border-white/[0.08] py-5
                           text-white text-xl font-bold tracking-widest
                           hover:bg-white/[0.08] hover:border-white/[0.18]
                           transition-all duration-200 disabled:opacity-40"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2: Realm ── */}
      {step === 2 && (
        <div className="space-y-3">
          {/* Breadcrumb */}
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm font-mono transition-colors"
          >
            <span>←</span>
            <span>{region}</span>
          </button>

          {/* Filter input */}
          <input
            ref={realmInputRef}
            type="text"
            placeholder={realmPlaceholder}
            value={realmQuery}
            onChange={(e) => setRealmQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.08] px-5 py-4
                       text-white text-base placeholder-gray-600 focus:outline-none
                       focus:border-blue-400/40 focus:ring-1 focus:ring-blue-400/20
                       transition-all duration-300 font-medium"
          />

          {/* Realm list */}
          <div className="rounded-xl border border-white/[0.07] bg-[#0c0c10] overflow-y-auto max-h-80">
            {realmList.length === 0 ? (
              <p className="px-4 py-3 text-gray-600 text-sm font-mono">
                {lang === "fr" ? "Aucun royaume trouvé" : "No realms found"}
              </p>
            ) : (
              realmList.map((r, i) => (
                <button
                  key={r.slug}
                  type="button"
                  onClick={() => pickRealm(r)}
                  className={`w-full text-left px-4 py-3 text-white text-sm font-medium
                    hover:bg-white/[0.06] transition-colors duration-75
                    ${i < realmList.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                >
                  {r.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── Step 3: Character name ── */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Breadcrumb */}
          <button
            type="button"
            onClick={() => setStep(2)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm font-mono transition-colors"
          >
            <span>←</span>
            <span>{realm?.name} · {region}</span>
          </button>

          {/* Character name input */}
          <input
            ref={charInputRef}
            type="text"
            placeholder={charPlaceholder}
            value={charName}
            onChange={(e) => setCharName(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            disabled={isLoading}
            className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.08] px-5 py-5
                       text-white text-lg placeholder-gray-600 focus:outline-none
                       focus:border-blue-400/40 focus:ring-1 focus:ring-blue-400/20
                       hover:border-white/[0.12] transition-all duration-300 font-medium tracking-wide
                       disabled:opacity-40"
          />

          <button
            type="submit"
            disabled={isLoading || !charName.trim()}
            className="w-full btn-roast text-xl tracking-[0.15em]"
          >
            {submitLabel}
          </button>
        </form>
      )}
    </div>
  );
}
