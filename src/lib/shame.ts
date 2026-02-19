import fs from "fs";
import path from "path";

const SHAME_FILE = path.join(process.cwd(), "data", "shame.json");

export interface ShameEntry {
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

interface ShameStore {
  roasts: ShameEntry[];
}

function readStore(): ShameStore {
  try {
    const raw = fs.readFileSync(SHAME_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { roasts: [] };
  }
}

function writeStore(store: ShameStore) {
  try {
    fs.mkdirSync(path.dirname(SHAME_FILE), { recursive: true });
    fs.writeFileSync(SHAME_FILE, JSON.stringify(store, null, 2));
  } catch {
    // Silently fail in read-only environments (Vercel prod)
  }
}

export function recordRoast(entry: Omit<ShameEntry, "count" | "lastRoasted">) {
  const store = readStore();
  const key = `${entry.name.toLowerCase()}-${entry.realm.toLowerCase()}-${entry.region}`;

  const existing = store.roasts.find(
    (r) =>
      r.name.toLowerCase() === entry.name.toLowerCase() &&
      r.realm.toLowerCase() === entry.realm.toLowerCase() &&
      r.region === entry.region
  );

  if (existing) {
    existing.count++;
    existing.lastRoasted = Date.now();
    existing.ilvl = entry.ilvl;
    existing.mplusScore = entry.mplusScore;
    existing.roastTitle = entry.roastTitle;
  } else {
    store.roasts.push({ ...entry, count: 1, lastRoasted: Date.now() });
  }

  writeStore(store);
  return key;
}

export function getHallOfShame(limit = 10): ShameEntry[] {
  const store = readStore();
  return [...store.roasts]
    .sort((a, b) => b.count - a.count || b.lastRoasted - a.lastRoasted)
    .slice(0, limit);
}
