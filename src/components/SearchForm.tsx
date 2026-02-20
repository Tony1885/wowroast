"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import gsap from "gsap";
import { REALMS_BY_REGION, Realm } from "@/lib/realms";

interface SearchFormProps {
  onSearch: (name: string, realm: string, region: string, ultraViolence?: boolean) => void;
  isLoading: boolean;
  lang: "fr" | "en";
}

const REGIONS = ["US", "EU", "KR", "TW"];

export default function SearchForm({ onSearch, isLoading, lang }: SearchFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [region, setRegion] = useState("");
  const [realm, setRealm] = useState<Realm | null>(null);
  const [realmQuery, setRealmQuery] = useState("");
  const [charName, setCharName]       = useState("");
  const [uvOn, setUvOn]               = useState(false);
  const [uvConfirmed, setUvConfirmed] = useState(false);

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
    setUvOn(false);
    setUvConfirmed(false);
    setStep(3);
  }

  function toggleUV() {
    const next = !uvOn;
    setUvOn(next);
    if (!next) setUvConfirmed(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!realm || !region || !charName.trim()) return;
    onSearch(charName.trim(), realm.slug, region.toLowerCase(), uvOn && uvConfirmed);
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
            className={`w-full rounded-2xl bg-white/[0.04] px-5 py-5
                       text-white text-lg placeholder-gray-600 focus:outline-none
                       hover:border-white/[0.12] transition-all duration-300 font-medium tracking-wide
                       disabled:opacity-40 border
                       ${uvConfirmed
                         ? "border-red-600/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                         : "border-white/[0.08] focus:border-blue-400/40 focus:ring-1 focus:ring-blue-400/20"
                       }`}
          />

          {/* ── Ultra Violence toggle ── */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={toggleUV}
              disabled={isLoading}
              className={`w-full flex items-center justify-between px-5 py-3 rounded-2xl border transition-all duration-300
                ${uvOn
                  ? "bg-red-950/40 border-red-600/50 shadow-[0_0_20px_rgba(220,38,38,0.15)]"
                  : "bg-white/[0.02] border-white/[0.06] hover:border-red-900/40 hover:bg-red-950/10"
                }`}
            >
              <span className={`font-black tracking-[0.15em] text-sm flex items-center gap-2 ${uvOn ? "text-red-400" : "text-gray-600"}`}>
                <span className={`text-base transition-all duration-300 ${uvOn ? "animate-pulse" : ""}`}>🩸</span>
                ULTRA VIOLENCE
              </span>
              {/* Toggle pill */}
              <div className={`relative w-10 h-5 rounded-full transition-all duration-300 ${uvOn ? "bg-red-600" : "bg-white/[0.08]"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${uvOn ? "left-5 bg-white" : "left-0.5 bg-gray-600"}`} />
              </div>
            </button>

            {/* Confirmation */}
            {uvOn && !uvConfirmed && (
              <div className="rounded-2xl border border-red-800/40 bg-red-950/20 px-5 py-4 space-y-3">
                <p className="text-red-400/90 text-xs font-mono tracking-wider text-center">
                  {lang === "fr"
                    ? "⚠️ CE ROAST N'A AUCUNE LIMITE. AUCUNE. TU ES SÛR(E) ?"
                    : "⚠️ THIS ROAST HAS ZERO LIMITS. ARE YOU SURE?"}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUvConfirmed(true)}
                    className="py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white font-black tracking-widest text-sm transition-colors"
                  >
                    {lang === "fr" ? "OUI" : "YES"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setUvOn(false); setUvConfirmed(false); }}
                    className="py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-gray-400 font-bold tracking-widest text-sm transition-colors"
                  >
                    {lang === "fr" ? "NON" : "NO"}
                  </button>
                </div>
              </div>
            )}

            {/* Confirmed state */}
            {uvOn && uvConfirmed && (
              <p className="text-red-500/60 text-[11px] font-mono tracking-wider text-center">
                {lang === "fr" ? "🩸 MODE ACTIVÉ — AUCUNE PITIÉ" : "🩸 MODE ACTIVE — NO MERCY"}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !charName.trim() || (uvOn && !uvConfirmed)}
            className={`w-full text-xl tracking-[0.15em] transition-all duration-300
              ${uvConfirmed
                ? "py-5 rounded-2xl font-black bg-red-700 hover:bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] disabled:opacity-40 disabled:cursor-not-allowed"
                : "btn-roast"
              }`}
          >
            {uvConfirmed
              ? (lang === "fr" ? "💀 DÉTRUIRE" : "💀 ANNIHILATE")
              : submitLabel
            }
          </button>
        </form>
      )}
    </div>
  );
}
