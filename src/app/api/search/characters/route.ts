import { NextRequest, NextResponse } from "next/server";

// Wave 1 — most populated realms, searched first (~500ms)
const PRIORITY_REALMS: Record<string, string[]> = {
  eu: [
    "kazzak", "tarren-mill", "draenor", "sylvanas", "twisting-nether",
    "ragnaros", "ravencrest", "stormscale", "silvermoon", "frostmane",
    "archimonde", "hyjal", "ysondre", "outland", "burning-legion",
    "blackrock", "eredar", "thrall", "antonidas", "blackmoore",
    "blackhand", "norgannon", "malganis", "guldan", "hellscream",
    "sargeras", "garona", "elune", "cho-gall", "darkspear",
  ],
  us: [
    "area-52", "illidan", "stormrage", "mal-ganis", "tichondrius",
    "sargeras", "bleeding-hollow", "moon-guard", "wyrmrest-accord", "kelthuzad",
    "zuljin", "darkspear", "emerald-dream", "arthas", "mannoroth",
    "frostmourne", "thunderlord", "dalaran", "proudmoore", "lightbringer",
    "muradin", "khadgar", "durotan", "windrunner", "earthen-ring",
    "aerie-peak", "alleria", "silver-hand", "moon-guard", "barthilas",
  ],
  kr: ["azshara", "burning-legion", "guldan", "malfurion", "dalaran", "hellscream"],
  tw: ["lights-hope", "skywall", "whisperwind"],
};

// Wave 2 — remaining realms, searched only if wave 1 finds nothing
const EXTENDED_REALMS: Record<string, string[]> = {
  eu: [
    "nordrassil", "drakthul", "grim-batol", "shadowsong", "dun-morogh",
    "azjolnerub", "spinebreaker", "saurfang", "chamber-of-aspects", "neptulon",
    "aggramar", "aszune", "kaelthas", "lightbringer", "emerald-dream",
    "earthen-ring", "darksorrow", "bloodfeather", "mazrigos", "boulderfist",
    "frostwhisper", "kilrogg", "chromaggus", "moonglade", "turalyon",
    "darkmoon-faire", "sporeggar", "trollbane", "dunemaul", "bloodhoof",
    "borean-tundra", "blades-edge", "bronze-dragonflight", "bronzebeard",
    "burning-blade", "dentarg", "doomhammer", "terokkar", "shattered-hand",
    "shattered-halls", "skullcrusher", "thunderhorn", "steamwheedle-cartel",
    "stormreaver", "sunstrider", "talnivarr", "terenas", "the-maelstrom",
    "the-shatar", "the-venture-co", "twilights-hammer", "wildhammer",
    "xavius", "zenedar", "ravenholdt", "runetotem", "ghostlands",
    "jaedenar", "hakkar", "executus", "eonar", "deathwing",
    "aerie-peak", "alonsus", "arathor", "argent-dawn", "bladefist",
    "bloodscalp", "dragonmaw", "durotan", "nagrand",
    "nozdormu", "nefarian", "tichondrius", "senjin", "rexxar",
    "onyxia", "madmortem", "azshara", "teldrassil", "naxxramas",
    "nerzhul", "kirin-tor", "eitrigg", "rashgarroth", "voljin",
    "dalaran", "krasus", "sanguino", "minahonda", "colinas-pardas", "tyrande",
  ],
  us: [
    "azjolnerub", "dath-remar", "nagrand", "hellscream", "turalyon",
    "blackhand", "eonar", "bronzebeard", "stormreaver", "bloodhoof",
    "skullcrusher", "altar-of-storms", "andorhal", "azgalor", "azuremyst",
    "baelgun", "black-dragonflight", "blackwater-raiders", "bladefist",
    "blades-edge", "blood-furnace", "bloodscalp", "boulderfist",
    "burning-blade", "cairne", "cenarion-circle", "cho-gall", "coilfang",
    "crushridge", "dark-iron", "darrowmere", "deathwing", "destromath",
    "doomhammer", "dragonblight", "dragonmaw", "draktharon", "dunemaul",
    "echo-isles", "exodar", "farstriders", "feathermoon", "fenris",
    "fizzcrank", "frostmane", "galakrond", "garona", "garrosh",
    "ghostlands", "gnomeregan", "gorefiend", "grizzly-hills", "icecrown",
    "jaedenar", "kargath", "kiljaeden", "kilrogg", "kirin-tor",
    "laughing-skull", "llane", "lothar", "malfurion", "malygos",
    "medivh", "nazjatar", "nerzhul", "norgannon", "perenolde",
    "queldorei", "ravenholdt", "runetotem", "scarlet-crusade", "sentinels",
    "shadow-council", "shadowmoon", "shadowsong", "shattered-hand",
    "sisters-of-elune", "skywall", "spinebreaker", "staghelm",
    "steamwheedle-cartel", "stormscale", "suramar", "terenas", "terokkar",
    "thrall", "thunderhorn", "uther", "velen", "whisperwind",
    "wildhammer", "winterhoof", "ysera", "caelestrasz", "thaurissan",
    "dreadmaul", "jubeithos",
  ],
  kr: ["durotan", "norgannon", "garona", "windrunner", "alexstrasza", "rexxar", "hyjal", "deathwing", "cenarius", "stormrage", "zuljin", "wildhammer"],
  tw: ["dragonmaw", "icecrown", "silvermoon", "crystalpine-stinger"],
};

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

async function searchRealms(
  name: string,
  realms: { realm: string; region: string }[],
  timeoutMs: number
): Promise<CharacterResult[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const settled = await Promise.allSettled(
      realms.map(({ realm, region }) =>
        lookupCharacter(name, realm, region, controller.signal)
      )
    );
    clearTimeout(timeout);
    return settled
      .filter((r): r is PromiseFulfilledResult<CharacterResult> => r.status === "fulfilled" && r.value !== null)
      .map((r) => r.value);
  } catch {
    clearTimeout(timeout);
    return [];
  }
}

export const maxDuration = 15;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 3) return NextResponse.json({ results: [] });

  const cacheKey = query.toLowerCase();
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < SEARCH_CACHE_TTL) {
    return NextResponse.json({ results: cached.results });
  }

  // Wave 1: priority realms (~80 realms, fast)
  const wave1 = Object.entries(PRIORITY_REALMS).flatMap(([region, realms]) =>
    realms.map((realm) => ({ realm, region }))
  );
  const results = await searchRealms(query, wave1, 3000);

  // Wave 2: extended realms if nothing found in wave 1
  if (results.length === 0) {
    const wave2 = Object.entries(EXTENDED_REALMS).flatMap(([region, realms]) =>
      realms.map((realm) => ({ realm, region }))
    );
    const extended = await searchRealms(query, wave2, 5000);
    results.push(...extended);
  }

  searchCache.set(cacheKey, { results, fetchedAt: Date.now() });
  return NextResponse.json({ results });
}
