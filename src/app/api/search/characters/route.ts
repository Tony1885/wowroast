import { NextRequest, NextResponse } from "next/server";

// ─── Blizzard token cache (per region) ────────────────────────────────────────
const tokenCache = new Map<string, { token: string; expiresAt: number }>();

async function getBlizzardToken(region: string): Promise<string | null> {
  const cached = tokenCache.get(region);
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;

  const clientId = process.env.BLIZZARD_CLIENT_ID;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  try {
    const res = await fetch(`https://${region}.battle.net/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });
    if (!res.ok) return null;
    const data = await res.json();
    tokenCache.set(region, { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 });
    return data.access_token;
  } catch {
    return null;
  }
}

// ─── Realm list cache (per region, 24h TTL) ───────────────────────────────────
const realmCache = new Map<string, { slugs: string[]; fetchedAt: number }>();
const REALM_CACHE_TTL = 24 * 60 * 60 * 1000;
const INTERNAL_REALM_RE = /inst|account-realm|arena-pass|auxiliary|rdb-|zzz/;

// Fallback lists if Blizzard API is unavailable
const FALLBACK_REALMS: Record<string, string[]> = {
  eu: [
    "kazzak", "tarren-mill", "draenor", "sylvanas", "twisting-nether",
    "ragnaros", "ravencrest", "stormscale", "silvermoon", "frostmane",
    "archimonde", "hyjal", "ysondre", "outland", "burning-legion",
    "aggra-portugu%C3%AAs", "blackrock", "eredar", "thrall", "drakthul",
    "antonidas", "blackmoore", "blackhand", "norgannon", "malganis",
    "guldan", "hellscream", "sargeras", "garona", "elune",
  ],
  us: [
    "area-52", "illidan", "stormrage", "mal-ganis", "tichondrius",
    "sargeras", "bleeding-hollow", "moon-guard", "wyrmrest-accord",
    "kelthuzad", "zuljin", "barthilas", "darkspear", "emerald-dream",
    "arthas", "mannoroth", "frostmourne", "thunderlord",
  ],
  kr: [
    "azshara", "burning-legion", "guldan", "malfurion", "dalaran",
    "durotan", "norgannon", "garona", "windrunner", "hellscream",
    "alexstrasza", "rexxar", "hyjal", "deathwing", "cenarius",
    "stormrage", "zuljin", "wildhammer",
  ],
  tw: [
    "lights-hope", "skywall", "whisperwind", "dragonmaw", "icecrown",
    "silvermoon", "crystalpine-stinger",
  ],
};

async function getRealmSlugs(region: string): Promise<string[]> {
  // KR and TW: use hardcoded (TW credentials don't work, KR has 18 realms already complete)
  if (region === "kr" || region === "tw") return FALLBACK_REALMS[region];

  const cached = realmCache.get(region);
  if (cached && Date.now() - cached.fetchedAt < REALM_CACHE_TTL) return cached.slugs;

  const token = await getBlizzardToken(region);
  if (!token) return FALLBACK_REALMS[region] ?? [];

  try {
    const res = await fetch(
      `https://${region}.api.blizzard.com/data/wow/realm/index?namespace=dynamic-${region}&locale=en_US`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) return FALLBACK_REALMS[region] ?? [];

    const data = await res.json();
    const slugs: string[] = (data.realms ?? [])
      .map((r: { slug?: string }) => r.slug ?? "")
      .filter((s: string) => s && !INTERNAL_REALM_RE.test(s));

    realmCache.set(region, { slugs, fetchedAt: Date.now() });
    return slugs;
  } catch {
    return FALLBACK_REALMS[region] ?? [];
  }
}

// ─── Search result cache (by name, 5min TTL) ──────────────────────────────────
interface CharacterResult {
  name: string;
  realm: string;
  realmSlug: string;
  region: string;
  class: string;
  spec: string;
  faction: string;
}

const searchCache = new Map<string, { results: CharacterResult[]; fetchedAt: number }>();
const SEARCH_CACHE_TTL = 5 * 60 * 1000;

// ─── Raider.io single realm lookup ────────────────────────────────────────────
async function lookupCharacter(
  name: string,
  realmSlug: string,
  region: string,
  signal: AbortSignal
): Promise<CharacterResult | null> {
  try {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realmSlug}&name=${encodeURIComponent(capitalized)}`;
    const res = await fetch(url, { signal });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.name) return null;
    return {
      name: data.name,
      realm: data.realm,
      realmSlug,
      region,
      class: data.class ?? "",
      spec: data.active_spec_name ?? "",
      faction: data.faction ?? "",
    };
  } catch {
    return null;
  }
}

// ─── Route handler ─────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 3) return NextResponse.json({ results: [] });

  // Check search cache
  const cacheKey = query.toLowerCase();
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < SEARCH_CACHE_TTL) {
    return NextResponse.json({ results: cached.results });
  }

  // Fetch realm lists for all regions in parallel
  const [euRealms, usRealms, krRealms, twRealms] = await Promise.all([
    getRealmSlugs("eu"),
    getRealmSlugs("us"),
    getRealmSlugs("kr"),
    getRealmSlugs("tw"),
  ]);

  const allRealms: { realm: string; region: string }[] = [
    ...euRealms.map((r) => ({ realm: r, region: "eu" })),
    ...usRealms.map((r) => ({ realm: r, region: "us" })),
    ...krRealms.map((r) => ({ realm: r, region: "kr" })),
    ...twRealms.map((r) => ({ realm: r, region: "tw" })),
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const settled = await Promise.allSettled(
      allRealms.map(({ realm, region }) =>
        lookupCharacter(query, realm, region, controller.signal)
      )
    );
    clearTimeout(timeout);

    const results: CharacterResult[] = settled
      .filter(
        (r): r is PromiseFulfilledResult<CharacterResult> =>
          r.status === "fulfilled" && r.value !== null
      )
      .map((r) => r.value);

    searchCache.set(cacheKey, { results, fetchedAt: Date.now() });
    return NextResponse.json({ results });
  } catch {
    clearTimeout(timeout);
    return NextResponse.json({ results: [] });
  }
}
