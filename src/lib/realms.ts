// Source: Blizzard Battle.net API — realm/index — données officielles
// Slugs internes Blizzard (inst/account-realm/auxiliary/rdb/gmsupport) exclus

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

// ─── US (244 realms) ──────────────────────────────────────────────────────────
const US_SLUGS = [
  "aegwynn","aerie-peak","agamaggan","aggramar","akama","alexstrasza",
  "alleria","altar-of-storms","alterac-mountains","amanthul","andorhal",
  "anetheron","antonidas","anubarak","anvilmar","arathor","archimonde",
  "area-52","argent-dawn","arthas","arygos","auchindoun","azgalor",
  "azjolnerub","azralon","azshara","azuremyst","baelgun","balnazzar",
  "barthilas","black-dragonflight","blackhand","blackrock",
  "blackwater-raiders","blackwing-lair","bladefist","blades-edge",
  "bleeding-hollow","blood-furnace","bloodhoof","bloodscalp","bonechewer",
  "borean-tundra","boulderfist","bronzebeard","burning-blade",
  "burning-legion","caelestrasz","cairne","cenarion-circle","cenarius",
  "chogall","chromaggus","coilfang","crushridge","daggerspine","dalaran",
  "dalvengyr","dark-iron","darkspear","darrowmere","dathremar","dawnbringer",
  "deathwing","demon-soul","dentarg","destromath","dethecus","detheroc",
  "doomhammer","draenor","dragonblight","dragonmaw","draka","drakkari",
  "draktharon","drakthul","dreadmaul","drenden","dunemaul","durotan",
  "duskwood","earthen-ring","echo-isles","eitrigg","eldrethalas","elune",
  "emerald-dream","eonar","eredar","executus","exodar","farstriders",
  "feathermoon","fenris","firetree","fizzcrank","frostmane","frostmourne",
  "frostwolf","galakrond","gallywix","garithos","garona","garrosh",
  "ghostlands","gilneas","gnomeregan","goldrinn","gorefiend","gorgonnash",
  "greymane","grizzly-hills","guldan","gundrak","gurubashi","hakkar",
  "haomarush","hellscream","hydraxis","hyjal","icecrown","illidan",
  "jaedenar","jubeithos","kaelthas","kalecgos","kargath","kelthuzad",
  "khadgar","khaz-modan","khazgoroth","kiljaeden","kilrogg","kirin-tor",
  "korgath","korialstrasz","kul-tiras","laughing-skull","lethon",
  "lightbringer","lightninghoof","lightnings-blade","llane","lothar",
  "madoran","maelstrom","magtheridon","maiev","malfurion","malganis",
  "malorne","malygos","mannoroth","medivh","misha","moknathal","moon-guard",
  "moonrunner","mugthol","muradin","nagrand","nathrezim","nazgrel","nazjatar",
  "nemesis","nerzhul","nesingwary","nordrassil","norgannon","onyxia",
  "perenolde","proudmoore","queldorei","quelthalas","ragnaros","ravencrest",
  "ravenholdt","rexxar","rivendare","runetotem","sargeras","saurfang",
  "scarlet-crusade","scilla","senjin","sentinels","shadow-council",
  "shadowmoon","shadowsong","shandris","shattered-halls","shattered-hand",
  "shuhalo","silver-hand","silvermoon","sisters-of-elune","skullcrusher",
  "skywall","smolderthorn","spinebreaker","spirestone","staghelm",
  "steamwheedle-cartel","stonemaul","stormrage","stormreaver","stormscale",
  "suramar","tanaris","terenas","terokkar","thaurissan","the-forgotten-coast",
  "the-scryers","the-underbog","the-venture-co","thorium-brotherhood","thrall",
  "thunderhorn","thunderlord","tichondrius","tol-barad","tortheldrin",
  "trollbane","turalyon","twisting-nether","uldaman","uldum","undermine",
  "ursin","uther","vashj","veknilash","velen","warsong","whisperwind",
  "wildhammer","windrunner","winterhoof","wyrmrest-accord","ysera","ysondre",
  "zangarmarsh","zuljin","zuluhed",
];

// ─── EU (240 realms) ──────────────────────────────────────────────────────────
const EU_SLUGS = [
  // English
  "aegwynn","aerie-peak","agamaggan","aggramar","ahnqiraj","alakir",
  "alexstrasza","alleria","alonsus","amanthul","ambossar","anachronos",
  "anetheron","antonidas","anubarak","arakarahm","arathi","arathor",
  "archimonde","area-52","argent-dawn","arthas","arygos","ashenvale",
  "aszune","auchindoun","azjolnerub","azshara","azuregos","azuremyst",
  "baelgun","balnazzar","blackhand","blackrock","bladefist","blades-edge",
  "bloodfeather","bloodhoof","bloodscalp","borean-tundra","boulderfist",
  "bronze-dragonflight","bronzebeard","burning-blade","burning-legion",
  "burning-steppes","chamber-of-aspects","chogall","chromaggus",
  "crushridge","daggerspine","dalaran","dalvengyr","darkmoon-faire",
  "darksorrow","darkspear","deathwing","doomhammer","draenor","dragonblight",
  "dragonmaw","drakthul","drekthar","dun-morogh","dunemaul","durotan",
  "earthen-ring","eitrigg","eldrethalas","elune","emerald-dream","emeriss",
  "eonar","eredar","eversong","executus","exodar","frostmane","frostmourne",
  "frostwhisper","frostwolf","galakrond","garona","garrosh","ghostlands",
  "gilneas","goldrinn","gordunni","gorgonnash","greymane","grim-batol",
  "grom","guldan","hakkar","haomarush","hellscream","howling-fjord","hyjal",
  "illidan","jaedenar","kaelthas","karazhan","kargath","kazzak","kelthuzad",
  "khadgar","khaz-modan","khazgoroth","kiljaeden","kilrogg","kirin-tor",
  "korgall","kragjin","kul-tiras","laughing-skull","lightbringer",
  "lightnings-blade","lordaeron","lothar","madmortem","magtheridon",
  "malfurion","malganis","malorne","malygos","mannoroth","mazrigos","medivh",
  "moonglade","mugthol","nagrand","nathrezim","naxxramas","nazjatar",
  "nefarian","nemesis","neptulon","nerathor","nerzhul","nordrassil",
  "norgannon","nozdormu","onyxia","outland","perenolde","proudmoore",
  "quelthalas","ragnaros","rajaxx","ravencrest","ravenholdt","rexxar",
  "runetotem","sargeras","saurfang","scarshield-legion","senjin","shadowsong",
  "shattered-halls","shattered-hand","silvermoon","skullcrusher","spinebreaker",
  "sporeggar","steamwheedle-cartel","stormrage","stormreaver","stormscale",
  "sunstrider","suramar","sylvanas","taerar","talnivarr","tarren-mill",
  "teldrassil","terenas","terokkar","terrordar","the-maelstrom","the-shatar",
  "the-venture-co","thrall","thunderhorn","tichondrius","tirion","trollbane",
  "turalyon","twilights-hammer","twisting-nether","uldaman","ulduar","uldum",
  "varimathras","vashj","veklor","veknilash","wildhammer","xavius","ysera",
  "ysondre","zenedar","zuljin","zuluhed",
  // German (DE)
  "blackmoore","blackscar","blutkessel","das-konsortium","das-syndikat",
  "deathguard","deathweaver","deepholm","defias-brotherhood",
  "der-abyssische-rat","der-mithrilorden","der-rat-von-dalaran","destromath",
  "dethecus","die-aldor","die-arguswacht","die-ewige-wacht","die-nachtwache",
  "die-silberne-hand","die-todeskrallen","dun-modr","echsenkessel",
  "festung-der-stürme","fordragon","forscherliga","genjuros","gordunni",
  "hellfire","kult-der-verdammten","lich-king","nethersturm","razuvious",
  "shendralar","shattrath","soulflayer","taerar","thermaplugg","throkferoth",
  "todeswache","ungoro","wrathbringer","zirkel-des-cenarius",
  // French (FR)
  "chants-éternels","confrérie-du-thorium","conseil-des-ombres",
  "culte-de-la-rive-noire","krasus","la-croisade-écarlate","les-clairvoyants",
  "les-sentinelles","marécage-de-zangar","naxxramas","rashgarroth",
  "sinstralis","temple-noir","theradras","tyrande","voljin",
  // Spanish (ES)
  "colinas-pardas","los-errantes","minahonda","sanguino",
  // Portuguese (PT)
  "aggra-português",
  // Italian (IT)
  "pozzo-delleternità",
  // Russian (RU)
  "booty-bay",
];

// ─── KR (18 realms) ───────────────────────────────────────────────────────────
const KR_SLUGS = [
  "alexstrasza","azshara","burning-legion","cenarius","dalaran","deathwing",
  "durotan","garona","guldan","hellscream","hyjal","malfurion","norgannon",
  "rexxar","stormrage","wildhammer","windrunner","zuljin",
];

// ─── TW (27 realms) ───────────────────────────────────────────────────────────
const TW_SLUGS = [
  "arthas","arygos","bleeding-hollow","chillwind-point","crystalpine-stinger",
  "demon-fall-canyon","dragonmaw","frostmane","hellscream","icecrown",
  "krol-blade","lights-hope","menethil","nightsong","old-blanchy",
  "order-of-the-cloud-serpent","queldorei","shadowmoon","silverwing-hold",
  "skywall","spirestone","stormscale","sundown-marsh","whisperwind",
  "world-tree","wrathbringer","zealot-blade",
];

export const REALMS_BY_REGION: Record<string, Realm[]> = {
  eu: buildRealms(EU_SLUGS),
  us: buildRealms(US_SLUGS),
  kr: buildRealms(KR_SLUGS),
  tw: buildRealms(TW_SLUGS),
};
