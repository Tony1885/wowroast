import { NextRequest, NextResponse } from "next/server";

// Curated list of active realms — covers ~95% of the active player base
// Ordered by population (most populated first per region)
const REALMS: Record<string, string[]> = {
  eu: [
    // Top EN realms
    "kazzak", "tarren-mill", "draenor", "sylvanas", "twisting-nether",
    "ragnaros", "ravencrest", "stormscale", "silvermoon", "frostmane",
    "outland", "burning-legion", "blackrock", "nordrassil", "drakthul",
    "grim-batol", "shadowsong", "dun-morogh", "azjolnerub", "spinebreaker",
    "saurfang", "chamber-of-aspects", "neptulon", "aggramar", "aszune",
    "kaelthas", "lightbringer", "emerald-dream", "earthen-ring", "darksorrow",
    "bloodfeather", "mazrigos", "boulderfist", "frostwhisper", "kilrogg",
    "chromaggus", "moonglade", "turalyon", "darkmoon-faire", "sporeggar",
    "trollbane", "dunemaul", "bloodhoof", "borean-tundra", "blades-edge",
    "bronze-dragonflight", "bronzebeard", "burningblade", "dentarg", "doomhammer",
    "terokkar", "shattered-hand", "shattered-halls", "skullcrusher", "thunderhorn",
    "steamwheedle-cartel", "stormreaver", "sunstrider", "talnivarr", "terenas",
    "the-maelstrom", "the-shatar", "the-venture-co", "twilights-hammer", "wildhammer",
    "xavius", "zenedar", "ravenholdt", "runetotem", "ghostlands",
    "jaedenar", "hakkar", "executus", "eonar", "deathwing",
    // Top DE realms
    "antonidas", "blackmoore", "blackhand", "norgannon", "malganis",
    "guldan", "hellscream", "eredar", "thrall", "baelgun",
    "nozdormu", "nefarian", "tichondrius", "senjin", "rexxar",
    "onyxia", "madmortem", "azshara", "blackrock", "teldrassil",
    // Top FR realms
    "archimonde", "hyjal", "ysondre", "sargeras", "garona",
    "elune", "cho-gall", "kirin-tor", "naxxramas", "nerzhul",
    "eitrigg", "rashgarroth", "voljin", "dalaran", "krasus",
    // Top ES/PT realms
    "aggra-portugu%C3%AAs", "sanguino", "minahonda", "colinas-pardas", "tyrande",
  ],
  us: [
    // Top EN realms
    "area-52", "illidan", "stormrage", "mal-ganis", "tichondrius",
    "sargeras", "bleeding-hollow", "moon-guard", "wyrmrest-accord", "kelthuzad",
    "zuljin", "barthilas", "darkspear", "emerald-dream", "arthas",
    "mannoroth", "frostmourne", "thunderlord", "dalaran", "proudmoore",
    "lightbringer", "muradin", "khadgar", "durotan", "windrunner",
    "earthen-ring", "aerie-peak", "alleria", "silver-hand", "azjolnerub",
    "dath-remar", "nagrand", "hellscream", "turalyon", "blackhand",
    "eonar", "bronzebeard", "stormreaver", "bloodhoof", "skullcrusher",
    "altar-of-storms", "andorhal", "azgalor", "azuremyst", "baelgun",
    "black-dragonflight", "blackwater-raiders", "bladefist", "blades-edge",
    "blood-furnace", "bloodscalp", "boulderfist", "burning-blade", "cairne",
    "cenarion-circle", "cho-gall", "coilfang", "crushridge", "dark-iron",
    "darrowmere", "deathwing", "destromath", "doomhammer", "dragonblight",
    "dragonmaw", "draktharon", "dunemaul", "echo-isles", "exodar",
    "farstriders", "feathermoon", "fenris", "fizzcrank", "frostmane",
    "galakrond", "garona", "garrosh", "ghostlands", "gnomeregan",
    "gorefiend", "grizzly-hills", "icecrown", "jaedenar", "kargath",
    "kiljaeden", "kilrogg", "kirin-tor", "laughing-skull", "llane",
    "lothar", "malfurion", "malygos", "medivh", "moon-guard",
    "nazjatar", "nerzhul", "norgannon", "perenolde", "queldorei",
    "ravenholdt", "runetotem", "scarlet-crusade", "sentinels", "shadow-council",
    "shadowmoon", "shadowsong", "shattered-hand", "sisters-of-elune", "skywall",
    "spinebreaker", "staghelm", "steamwheedle-cartel", "stormscale", "suramar",
    "terenas", "terokkar", "thrall", "thunderhorn", "uther",
    "velen", "whisperwind", "wildhammer", "winterhoof", "ysera",
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

interface CharacterResult {
  name: string;
  realm: string;
  realmSlug: string;
  region: string;
  class: string;
  spec: string;
  faction: string;
}

// Search result cache (5min TTL)
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 3) return NextResponse.json({ results: [] });

  const cacheKey = query.toLowerCase();
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < SEARCH_CACHE_TTL) {
    return NextResponse.json({ results: cached.results });
  }

  const allRealms = Object.entries(REALMS).flatMap(([region, realms]) =>
    realms.map((realm) => ({ realm, region }))
  );

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

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
