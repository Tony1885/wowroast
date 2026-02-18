import { RaiderIOProfile } from "./types";

// Only allow alphanumeric, spaces, hyphens, apostrophes, accented chars
function sanitizeInput(str: string): string {
  return str.replace(/[^\w\s'-àâäéèêëïîôùûüÿçæœ]/gi, "").trim();
}

export async function fetchRaiderIOProfile(
  region: string,
  realm: string,
  name: string
): Promise<RaiderIOProfile | null> {
  const r = sanitizeInput(region).toLowerCase().substring(0, 2);
  const rl = sanitizeInput(realm).toLowerCase();

  if (!r || !rl) return null;

  // Handle accented names with NFC normalization
  let n = name;
  try {
    n = decodeURIComponent(name);
  } catch {}
  n = n.normalize("NFC").trim();

  const namesToTry = [
    encodeURIComponent(n),
    encodeURIComponent(
      n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
    ),
  ];

  const fields = [
    "gear",
    "mythic_plus_scores_by_season:current",
    "mythic_plus_best_runs",
    "mythic_plus_recent_runs",
    "raid_progression",
    "honorable_kills",
  ].join(",");

  for (const encodedName of namesToTry) {
    try {
      const url = new URL("https://raider.io/api/v1/characters/profile");
      url.searchParams.set("region", r);
      url.searchParams.set("realm", rl);
      url.searchParams.set("name", decodeURIComponent(encodedName));
      url.searchParams.set("fields", fields);

      const response = await fetch(url.toString());
      if (response.ok) {
        const data = await response.json();
        if (data && data.name) return data as RaiderIOProfile;
      }
    } catch (error) {
      console.error("[Raider.io] Fetch error:", error);
    }
  }

  return null;
}

export function slugifyServer(server: string): string {
  return server
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}
