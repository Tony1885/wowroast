"use client";

import { useEffect, useState } from "react";
import { getClassColor } from "@/lib/class-data";

interface ShameEntry {
  name: string;
  realm: string;
  region: string;
  class: string;
  ilvl: number;
  mplusScore: number;
  roastTitle: string;
  count: number;
  lastRoasted: number;
}

interface HallOfShameProps {
  lang: "fr" | "en";
}

const RANK_COLORS = ["#fbbf24", "#9ca3af", "#c2783c"];

export default function HallOfShame({ lang }: HallOfShameProps) {
  const [entries, setEntries] = useState<ShameEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/hall-of-shame")
      .then((r) => r.json())
      .then((data) => {
        setEntries(data.entries ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  if (!loaded || entries.length === 0) return null;

  const title = lang === "fr" ? "Hall of Shame" : "Hall of Shame";
  const subtitle =
    lang === "fr"
      ? "Les personnages les plus roastés"
      : "Most roasted characters";

  return (
    <div className="w-full max-w-2xl mt-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black font-cinzel text-flame tracking-tight">
          {title}
        </h2>
        <p className="text-gray-700 text-xs font-mono tracking-[0.25em] uppercase mt-1">
          {subtitle}
        </p>
      </div>

      {/* List */}
      <div className="glass-card overflow-hidden divide-y divide-white/[0.03]">
        {entries.map((entry, i) => {
          const classColor = getClassColor(entry.class);
          const rankColor = RANK_COLORS[i] ?? "#4b5563";
          const timeAgo = formatTimeAgo(entry.lastRoasted, lang);

          return (
            <div
              key={`${entry.name}-${entry.realm}-${entry.region}`}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
            >
              {/* Rank */}
              <span
                className="text-lg font-black font-mono w-6 shrink-0 text-center"
                style={{ color: rankColor }}
              >
                {i + 1}
              </span>

              {/* Character info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-bold font-cinzel truncate"
                    style={{ color: classColor }}
                  >
                    {entry.name}
                  </span>
                  <span className="text-gray-700 text-xs font-mono shrink-0">
                    {entry.realm} · {entry.region.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 text-xs truncate mt-0.5 italic">
                  &ldquo;{entry.roastTitle}&rdquo;
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 shrink-0 text-right">
                <div className="hidden sm:block">
                  <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">
                    {lang === "fr" ? "dernier" : "last"}
                  </p>
                  <p className="text-gray-700 text-xs font-mono">{timeAgo}</p>
                </div>
                <div>
                  <p
                    className="text-xl font-black font-cinzel"
                    style={{ color: classColor }}
                  >
                    ×{entry.count}
                  </p>
                  <p className="text-[10px] text-gray-700 font-mono uppercase tracking-widest">
                    roasts
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-gray-800 text-[10px] font-mono tracking-wider mt-4">
        {lang === "fr"
          ? "DONNÉES LOCALES — NON PERSISTÉES EN PRODUCTION"
          : "LOCAL DATA — NOT PERSISTED IN PRODUCTION"}
      </p>
    </div>
  );
}

function formatTimeAgo(ts: number, lang: "fr" | "en"): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (lang === "fr") {
    if (days > 0) return `il y a ${days}j`;
    if (hours > 0) return `il y a ${hours}h`;
    if (mins > 0) return `il y a ${mins}min`;
    return "à l'instant";
  } else {
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return "just now";
  }
}
