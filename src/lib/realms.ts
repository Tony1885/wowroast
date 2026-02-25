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

// ─── US ───────────────────────────────────────────────────────────────────────
const US_SLUGS = [
  "aegwynn","agamaggan","aggramar","akama","alexstrasza","alleria",
  "altar-of-storms","alterac-mountains","andorhal","anetheron","antonidas",
  "anubarak","anvilmar","arathor","archimonde","area-52","argent-dawn",
  "arthas","arygos","auchindoun","azgalor","azjolnerub","azralon","azshara",
  "azuremyst","baelgun","balnazzar","barthilas","black-dragonflight",
  "blackhand","blackrock","blackwater-raiders","blackwing-lair","bladefist",
  "blades-edge","bleeding-hollow","blood-furnace","bloodhoof","bloodscalp",
  "bonechewer","borean-tundra","boulderfist","bronzebeard","burning-blade",
  "burning-legion","caelestrasz","cairne","cenarion-circle",
  "cenarion-expedition","cho-gall","chromaggus","coilfang","crushridge",
  "daggerspine","dalaran","dalvengyr","dark-iron","darrowmere","dath-remar",
  "dawnbringer","deathwing","demon-soul","dentarg","destromath","dethecus",
  "detheroc","doomhammer","draenor","dragonblight","dragonmaw","drak-tharon",
  "drekthar","dreadmaul","drenden","dunemaul","durotan","earthen-ring",
  "echo-isles","eitrigg","eldrethalas","elune","emerald-dream","eonar",
  "eredar","exodar","farstriders","feathermoon","fenris","firetree",
  "fizzcrank","flintlocke","frostmane","frostmourne","frostwolf","galakrond",
  "garona","garrosh","ghostlands","gnomeregan","gorefiend","greymane",
  "grizzly-hills","guldan","gurubashi","hakkar","haomarush","hellscream",
  "hydraxis","hyjal","icecrown","illidan","jaedenar","kaelthas","kalecgos",
  "kargath","kelthuzad","khadgar","khaz-modan","khazgoroth","kiljaeden",
  "kilrogg","kirin-tor","korgath","korialstrasz","kul-tiras","laughing-skull",
  "lethon","lightbringer","lightnings-blade","llane","lothar","madoran",
  "maelstrom","malfurion","malorne","malygos","mannoroth","medivh","misha",
  "moknathal","moon-guard","moonrunner","mugthol","muradin","nathrezim",
  "nazgrel","nazjatar","nefarian","nerzhul","norgannon","perenolde",
  "proudmoore","queldorei","quelthalas","ragnaros","ravencrest","ravenholdt",
  "rexxar","rivendare","runetotem","scarlet-crusade","sentinels",
  "shadow-council","shadowfang","shadowmoon","shadowsong","shattered-halls",
  "shattered-hand","shuhalo","silver-hand","silvermoon","sisters-of-elune",
  "skullcrusher","skywall","smolderthorn","spinebreaker","spirestone",
  "staghelm","steamwheedle-cartel","stonemaul","stormrage","stormreaver",
  "stormscale","suramar","tanaris","terenas","terokkar","thrall","thunderhorn",
  "thunderlord","tichondrius","trollbane","turalyon","twisting-nether",
  "undermine","uther","vashj","velen","venture-co","voljin","whisperwind",
  "wildhammer","windrunner","winterhoof","wyrmrest-accord","ysera","ysondre",
  "zangarmarsh","zuljin","zuluhed","mal-ganis","sargeras","bleeding-hollow",
];

// ─── EU — English ──────────────────────────────────────────────────────────────
const EU_EN_SLUGS = [
  "aerie-peak","aggramar","alonsus","aman-thul","ambossar","anachronos",
  "antonidas","anubarak","arathor","argent-dawn","aszune","azjolnerub",
  "azuremyst","bloodfeather","bloodhoof","bloodscalp","blades-edge",
  "bladefist","bronze-dragonflight","bronzebeard","burning-blade",
  "burning-legion","chamber-of-aspects","chromaggus","daggerspine","dalaran",
  "darkmoon-faire","darksorrow","darkspear","deathwing","dentarg","doomhammer",
  "dragonmaw","drak-thul","draenor","dunemaul","dun-morogh","durotan",
  "earthen-ring","emerald-dream","eonar","eredar","executus","frostmane",
  "frostwhisper","ghostlands","grim-batol","hakkar","hellscream","hyjal",
  "jaedenar","kaelthas","kazzak","kilrogg","kirin-tor","lightbringer",
  "madmortem","magtheridon","mazrigos","moonglade","nagrand","neptulon",
  "nordrassil","nozdormu","onyxia","outland","purple-nightmare","quelthalas",
  "ragnaros","ravencrest","ravenholdt","rexxar","runetotem","saurfang",
  "shadowsong","shattered-hand","shattered-halls","silvermoon","skullcrusher",
  "spinebreaker","sporeggar","steamwheedle-cartel","stormreaver","stormscale",
  "sunstrider","sylvanas","talnivarr","tarren-mill","teldrassil","terenas",
  "the-maelstrom","the-shatar","the-venture-co","thrall","thunderhorn",
  "tichondrius","turalyon","twilights-hammer","twisting-nether","wildhammer",
  "xavius","zenedar","boulderfist","auchindoun","azshara","emerald-dream",
  "bloodhoof","terokkar","spinebreaker","kaelthas","lightbringer",
];

// ─── EU — German ───────────────────────────────────────────────────────────────
const EU_DE_SLUGS = [
  "aegwynn","anetheron","area-52","arthas","azshara","baelgun","blackmoore",
  "blackrock","burning-blade","cho-gall","deathguard","dun-morogh",
  "eldrethalas","eredar","festung-der-sturme","fordragon","gilneas",
  "gorgonnash","guldan","gurubashi","kargath","kelthuzad","khaz-modan",
  "lothar","malganis","nathrezim","nefarian","nerzhul","norgannon","rajaxx",
  "razuvious","sargeras","shattrath","thrall","tichondrius","wrathbringer",
  "ysera","zuljin","antonidas","quel-thalas","norgannon","perenolde",
  "destromath","dethecus","detheroc","doomhammer","hellscream",
];

// ─── EU — French ───────────────────────────────────────────────────────────────
const EU_FR_SLUGS = [
  "archimonde","chants-eternels","cho-gall","confrerieduThorium",
  "conseil-des-ombres","culte-de-la-rive-noire","dalaran","eitrigg","elune",
  "garona","hyjal","khaz-modan","kirin-tor","krasus","la-croisade-ecarlate",
  "les-clairvoyants","les-sentinelles","marche-de-lombre","medivh","naxxramas",
  "nerzhul","roc-noir","runetotem","sargeras","sinstralis","temple-noir",
  "theradras","thorridas","tyrande","voljin","ysondre","rashgarroth",
  "dalaran","ner-zhul",
];

// ─── EU — Spanish ──────────────────────────────────────────────────────────────
const EU_ES_SLUGS = [
  "colinas-pardas","minahonda","sanguino","tyrande","zul-jin",
  "sargeras","dun-morogh","lightbringer","exodar","aggra",
];

// ─── EU — Russian ──────────────────────────────────────────────────────────────
const EU_RU_SLUGS = [
  "borean-tundra","deathguard","gordunni","howling-fjord","razuvious",
  "soulflayer","shattrath","thermaplugg","galakrond","deepholm",
  "azuregos","fordragon","undermine","blackscar",
];

// ─── KR ───────────────────────────────────────────────────────────────────────
const KR_SLUGS = [
  "azshara","burning-legion","guldan","malfurion","dalaran","hellscream",
  "durotan","norgannon","garona","windrunner","alexstrasza","rexxar",
  "hyjal","deathwing","cenarius","stormrage","zuljin","wildhammer",
  "arthas","blackmoore","silvermoon","nefarian","gorefiend",
];

// ─── TW ───────────────────────────────────────────────────────────────────────
const TW_SLUGS = [
  "lights-hope","skywall","whisperwind","dragonmaw","icecrown","silvermoon",
  "crystalpine-stinger","arthas","hellscream","bleeding-hollow","shadowmoon",
  "zealot-blade","order-of-the-cloud-serpent","chillwind-point","sundown-marsh",
  "wrathbringer","arygos","world-tree",
];

export const REALMS_BY_REGION: Record<string, Realm[]> = {
  eu: buildRealms([...EU_EN_SLUGS, ...EU_DE_SLUGS, ...EU_FR_SLUGS, ...EU_ES_SLUGS, ...EU_RU_SLUGS]),
  us: buildRealms(US_SLUGS),
  kr: buildRealms(KR_SLUGS),
  tw: buildRealms(TW_SLUGS),
};
