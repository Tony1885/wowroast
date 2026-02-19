export interface Realm {
  slug: string;
  name: string;
}

function slugToName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function buildRealms(slugs: string[]): Realm[] {
  const seen = new Set<string>();
  const list: Realm[] = [];
  for (const slug of slugs) {
    if (!seen.has(slug)) {
      seen.add(slug);
      list.push({ slug, name: slugToName(slug) });
    }
  }
  list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

const EU_SLUGS = [
  // Priority
  "kazzak", "tarren-mill", "draenor", "sylvanas", "twisting-nether",
  "ragnaros", "ravencrest", "stormscale", "silvermoon", "frostmane",
  "archimonde", "hyjal", "ysondre", "outland", "burning-legion",
  "blackrock", "eredar", "thrall", "antonidas", "blackmoore",
  "blackhand", "norgannon", "malganis", "guldan", "hellscream",
  "sargeras", "garona", "elune", "cho-gall", "darkspear",
  // Extended
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
];

const US_SLUGS = [
  // Priority
  "area-52", "illidan", "stormrage", "mal-ganis", "tichondrius",
  "sargeras", "bleeding-hollow", "moon-guard", "wyrmrest-accord", "kelthuzad",
  "zuljin", "darkspear", "emerald-dream", "arthas", "mannoroth",
  "frostmourne", "thunderlord", "dalaran", "proudmoore", "lightbringer",
  "muradin", "khadgar", "durotan", "windrunner", "earthen-ring",
  "aerie-peak", "alleria", "silver-hand", "barthilas",
  // Extended
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
];

const KR_SLUGS = [
  "azshara", "burning-legion", "guldan", "malfurion", "dalaran", "hellscream",
  "durotan", "norgannon", "garona", "windrunner", "alexstrasza", "rexxar",
  "hyjal", "deathwing", "cenarius", "stormrage", "zuljin", "wildhammer",
];

const TW_SLUGS = [
  "lights-hope", "skywall", "whisperwind",
  "dragonmaw", "icecrown", "silvermoon", "crystalpine-stinger",
];

export const REALMS_BY_REGION: Record<string, Realm[]> = {
  eu: buildRealms(EU_SLUGS),
  us: buildRealms(US_SLUGS),
  kr: buildRealms(KR_SLUGS),
  tw: buildRealms(TW_SLUGS),
};
