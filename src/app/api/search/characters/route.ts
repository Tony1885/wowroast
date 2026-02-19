import { NextRequest, NextResponse } from "next/server";

const TOP_REALMS: Record<string, string[]> = {
  eu: [
    "kazzak", "tarren-mill", "draenor", "sylvanas", "twisting-nether",
    "ragnaros", "ravencrest", "stormscale", "silvermoon", "frostmane",
    "archimonde", "hyjal", "ysondre", "outland", "burning-legion",
    "aggra-pt", "blackrock", "eredar", "thrall", "drak-thul",
  ],
  us: [
    "area-52", "illidan", "stormrage", "mal-ganis", "tichondrius",
    "sargeras", "bleeding-hollow", "moon-guard", "wyrmrest-accord",
    "kelthuzad", "zul-jin", "barthilas", "darkspear", "emerald-dream",
    "arthas", "mannoroth", "frostmourne", "thunderlord",
  ],
  kr: [
    "azshara", "burning-legion", "garona", "windrunner", "norgannon",
    "dalaran", "hellscream", "stormrage", "hyjal",
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

  if (query.length < 3) {
    return NextResponse.json({ results: [] });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    // Search all regions in parallel
    const searches = Object.entries(TOP_REALMS).flatMap(([region, realms]) =>
      realms.map((realm) =>
        lookupCharacter(query, realm, region, controller.signal)
      )
    );

    const settled = await Promise.allSettled(searches);
    clearTimeout(timeout);

    const results: CharacterResult[] = settled
      .filter(
        (r): r is PromiseFulfilledResult<CharacterResult> =>
          r.status === "fulfilled" && r.value !== null
      )
      .map((r) => r.value);

    return NextResponse.json({ results });
  } catch {
    clearTimeout(timeout);
    return NextResponse.json({ results: [] });
  }
}
