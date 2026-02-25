// Roasts de secours utilisés quand Groq est indisponible.
// Les placeholders {name}, {class}, {spec}, {ilvl}, {score}, {realm} sont remplacés
// dynamiquement par les vraies données du personnage.

export interface FallbackRoast {
  roastTitle: string;
  roast: string;
  punchline: string;
}

interface RoastVars {
  name: string;
  cls: string;
  spec: string;
  ilvl: number;
  score: number;
  realm: string;
  region: string;
  raidSummary: string;
}

function fill(template: string, v: RoastVars): string {
  return template
    .replace(/{name}/g, v.name)
    .replace(/{class}/g, v.cls)
    .replace(/{spec}/g, v.spec)
    .replace(/{ilvl}/g, String(v.ilvl))
    .replace(/{score}/g, String(v.score))
    .replace(/{realm}/g, v.realm)
    .replace(/{region}/g, v.region.toUpperCase())
    .replace(/{raid}/g, v.raidSummary);
}

// ─── ENGLISH FALLBACKS ────────────────────────────────────────────────────────
const FALLBACKS_EN: Array<{ roastTitle: string; roast: string; punchline: string }> = [
  {
    roastTitle: "The Ghost of Patch 8.3",
    roast: `A {ilvl} item level {spec} {class} on {realm}-{region}. Let that sink in. While the rest of the server is parsing orange and clearing mythic, {name} is somewhere out there, fully committed to a gear level that screams "I log in twice a month to check my garrison." That {ilvl} isn't a number — it's a eulogy for a player who gave up before they even started.

The Mythic+ score of {score} is the kind of number that makes dungeon group finders go quiet. Not the good kind of quiet. The kind where everyone collectively decides they'd rather sit in queue for 25 minutes than invite a {spec} sitting at {score}. That score isn't a floor — it's a grave marker.

The raid progression of {raid} tells a story that no one asked to read. A story about someone who looked at a raid entrance, thought "maybe next week," and then repeated that exact sentence for six months straight. The bosses don't even know {name} exists. They've never been inconvenienced by this player. Not once.

Here's the beautiful tragedy: {name} is paying a monthly subscription to be irrelevant. Every month, the billing cycle comes around, the money leaves the account, and in exchange, a {ilvl} {class} exists somewhere on {realm} doing absolutely nothing for anyone, including themselves.`,
    punchline: "The game has an offline mode. It's called unsubscribing. You should try it.",
  },
  {
    roastTitle: "Carried by Loading Screens",
    roast: `Let's talk about {name}. {ilvl} item level, {score} Mythic+ score. Those aren't stats — that's a formal complaint filed by the game itself. Azeroth has been trying to tell {name} something for months and the message is not being received. The message is: log off.

A {score} M+ score in {region} means {name} is currently sitting in the bottom percentile of people who even bothered to try. Not fail — try. The people below {score} didn't even queue. {name} queued, ran the key, and somehow ended up with a score that suggests the dungeon fought back and won.

{raid} raid progression. That's the progression of someone who heard there was a raid in the game, Googled the entrance location, and then decided the walk was too long. Meanwhile, every other player on {realm} is farming Heroic, getting cutting edges, and wondering why their guild's loot table occasionally shows a {ilvl} item that's been rotting in someone's bags.

Being a {spec} {class} at {ilvl} isn't a playstyle. It's a cautionary tale they tell in LFR to make people feel better about themselves. And it's working. You're genuinely helping people. Just not in the way you intended.`,
    punchline: "At {ilvl} item level, you're not playing the game. You're haunting it.",
  },
  {
    roastTitle: "LFR Hero, Mythic Zero",
    roast: `{name}. {spec} {class}. {realm}-{region}. A {ilvl} item level that hasn't moved since before the last major patch. Either {name} has been in a medically induced coma, or they've been logging in every day, staring at their character, and actively choosing to remain exactly as irrelevant as they were last week.

A Mythic+ score of {score} is a score that happens when you queue for a key, zone in, and then contribute the approximate value of a decoration. Not a load-bearing decoration. A decorative candle. On the back wall. That no one looks at. The tank kept wiping on trash because the {spec} was doing numbers that belong in a solo shuffle, not a dungeon.

{raid} on the progression front. There are NPCs in Stormwind with more kills than {name}. Innkeeper Allison has seen more boss corpses than this {class}. The progression sheet looks like someone submitted a blank exam and expected partial credit for showing up.

The truly devastating part? {name} could fix all of this. Queue for keys. Clear the raid. Upgrade the gear. It takes effort, sure, but the alternative is a permanent record of {score} M+ score sitting in the Raider.io database for all eternity, being pulled up at moments exactly like this one.`,
    punchline: "Your character sheet isn't a story of failure. It's a story of consistent effort to avoid success.",
  },
  {
    roastTitle: "Paid Subscription, Unpaid Performance",
    roast: `Every month, {name} the {spec} {class} sends money to Blizzard. In return, Blizzard maintains a server on {realm}-{region} where a {ilvl} item level character exists, commits to a {score} Mythic+ score, and does {raid} in the current raid tier. This is the transaction. Both parties have agreed to it. Only one party should be embarrassed.

The M+ score of {score} is a number that filters happen around, not a number that gets through filters. Every GroupFinder listing with a score requirement is a locked door that {score} cannot open. Those aren't doors keeping {name} out. Those are doors keeping the other nine players safe from having a {score} in their key.

Raid progression: {raid}. In a tier where the community has collectively cleared the content, reset it, cleared it again, speed-ran it, cleared it on alts, and started doing mount runs, {name} is working with {raid}. The bosses aren't practicing their enrage timers for {name}. The bosses have retired. {name} is still waiting for an invite.

There's a version of {name} that fixes this. Gets the score up, upgrades to a respectable item level, actually commits to progression. That version of {name} is not on {realm}-{region}. That version might not exist yet.`,
    punchline: "Somewhere in Blizzard's database is a flag that says 'at risk of unsubscribing.' It's been on your account for two years.",
  },
  {
    roastTitle: "The Eternal Application",
    roast: `{name} is a {ilvl} {spec} {class} from {realm}-{region} with a Mythic+ score of {score} and a raid progression of {raid}. This isn't a roast. This is a missing person report filed by the game's progression systems, which have been searching for evidence of {name}'s engagement for several patches now and found almost nothing.

The {score} M+ score means that every purist who opens Raider.io before inviting, sees {score}, and quietly moves on has made the correct decision. They didn't make it cruelly. They made it logically. A {score} has certain implications for what happens in a +15 when the last boss is at 10% health. Those implications are well-documented. They live in the raid log now.

{raid} is the story of someone who installed a game, created a character, spent real money on a subscription, and then made the binary choice to not engage with the content that subscription was funding. Not couldn't. Chose not to. There's a dungeon finder button that has been staring at {name} for months. Unclicked. Lonely. Disappointed.

The {ilvl} item level is the part that hurts the most. Because that's not a starting player's item level. That's the item level of someone who KNOWS where the upgrades come from and has DECIDED not to get them. That's informed inaction. That's premeditated mediocrity.`,
    punchline: "The game didn't fail {name}. {name} outsourced that job to themselves and did it exceptionally well.",
  },
  {
    roastTitle: "A Spec Choice as a Cry for Help",
    roast: `{name} chose to be a {spec} {class}. On {realm}-{region}. At {ilvl} item level. With a {score} Mythic+ score. Every single one of those decisions was a choice, and together they form a portrait of someone who looked at the wide, expansive world of Azeroth and said "I want to experience as little of it as possible, but in a very specific and identifiable way."

The {score} M+ score isn't a number — it's a statement. It says: "I have been in dungeons. I have contributed to dungeons in the way that furniture contributes to a house fire. I was there. I was technically present. The logs will show that I cast spells." The logs do show that, {name}. The logs show everything. That's the problem.

{raid} raid progression at this point in the tier. The content is on farm. The community has mastered it. Speedrun records are being broken. And {name} is sitting at {raid}, fully equipped with {ilvl} gear and {score} score, explaining in the group chat that they're "still learning the fights." You've been learning the fights since the patch dropped. At some point the learning has to become doing.

A {ilvl} {spec} {class} with a {score} M+ score on {realm} is the gaming equivalent of a gym membership that gets used twice a year. The equipment is there. The access is there. The intention is there, somewhere, in a drawer, next to the motivation that also hasn't been used recently.`,
    punchline: "The real M+ score was the friends we didn't make along the way.",
  },
  {
    roastTitle: "iLvl {ilvl}: A Tragedy in Four Acts",
    roast: `Act One: {name} exists as a {spec} {class} on {realm}-{region}. They have {ilvl} item level. They have {score} Mythic+ score. They have {raid} raid progression. The curtain rises on someone who has all the tools to be a functioning WoW player and has done a remarkable job of not using any of them.

Act Two: The dungeons. A {score} Mythic+ score is the kind of score that makes key holders physically back away from the GroupFinder. It's not that {score} is unimpressive. It's that {score} comes with context. The context is: every key this player has touched has probably been hurt. Keys don't just get depleted. They get traumatized. They need recovery time.

Act Three: The raid. {raid}. The bosses are standing there, waiting. The gear is sitting in the lockout. The progression is available, right there, behind a raid entrance that {name} knows the location of. And yet. {raid}. The bosses have started to feel abandoned. Some of them have started looking for other players to engage with. Players who show up.

Act Four: The reckoning. At {ilvl} gear, with {score} M+ and {raid}, {name} has assembled a complete picture of someone who treats World of Warcraft as a place they exist rather than a game they play. The subscription continues. The game launches. The character logs in. And then: nothing of consequence happens.`,
    punchline: "This has been a story about choices. Every single one of them was the wrong one.",
  },
  {
    roastTitle: "Carried Harder Than a Weekly Reset",
    roast: `{name}. {spec} {class}. {ilvl} ilvl. {score} M+ score. {realm}-{region}. Normally at this point in a roast, you'd search for something redeeming to twist into an insult. With {name}, the search comes up empty. There is nothing to twist. The stats are already the insult, presented without irony, just sitting there asking to be read aloud at a guild meeting.

The Mythic+ situation is genuinely something. A {score} score on {region} in the current season means that when {name} joins a key, the entire group subtly recalibrates their expectations downward. Not all the way to zero — that would be unfair. To approximately {score}. Which is where the key ends up: depleted, demoralized, and looking for a replacement healer who was not originally part of the plan.

{raid} progression is a number that belongs in a museum exhibit titled "What Would Have Happened If They Just Tried Slightly More." The bosses are defeated, weekly, by players who commit half as much time and return twice the results. {name} is funding a subscription to watch other people clear content while personally contributing {raid} to the effort.

The beautiful thing about a {ilvl} {spec} {class} in {region} is that the game wants to help. There are catch-up mechanics. There are weekly caps. There are upgrade systems specifically designed to bring players from {ilvl} to relevance. {name} looked at all of those systems, understood them, and chose {ilvl}.`,
    punchline: "Not all heroes wear capes. Some of them wear {ilvl} gear and call it endgame.",
  },
];

// ─── FRENCH FALLBACKS ─────────────────────────────────────────────────────────
const FALLBACKS_FR: Array<{ roastTitle: string; roast: string; punchline: string }> = [
  {
    roastTitle: "Le Fantôme du Patch Précédent",
    roast: `{name}. {spec} {class}. {ilvl} de niveau d'objet sur {realm}-{region}. Prends le temps d'y réfléchir. Pendant que le reste du serveur farm en mythique et parse orange, {name} se balade avec un ilvl qui crie "je me connecte deux fois par mois pour vérifier que mon personnage n'a pas été supprimé". Ce {ilvl}, c'est pas un nombre. C'est une oraison funèbre pour un joueur qui a abandonné avant même d'avoir commencé.

Un score Mythique+ de {score}, c'est le genre de score qui fait se taire les chercheurs de groupe. Pas le bon silence. Le silence de quelqu'un qui voit {score}, ferme la fenêtre, et décide qu'il préfère attendre 30 minutes en file d'attente plutôt que d'inviter ça. Ce score, c'est pas un plancher. C'est une pierre tombale avec "{score} M+" gravé dessus et rien d'autre parce qu'il n'y avait rien d'autre à mettre.

{raid} côté progression en incursion. Il y a des PNJ à Orgrimmar qui ont plus de kills que {name}. L'aubergiste voit passer plus de cadavres de boss dans une semaine que ce {class} n'en a jamais produit en plusieurs tiers de contenu. La feuille de progression ressemble à quelqu'un qui a rendu un devoir vierge en espérant des points pour l'écriture de son nom en haut.

La vraie beauté de la situation, c'est que {name} paie un abonnement mensuel pour être insignifiant. Chaque mois, l'argent part. En échange, un {class} de {ilvl} existe quelque part sur {realm}, fait {score} en Mythique+, avance à {raid} dans le raid, et continue d'exister sans jamais déranger qui que ce soit — ni les boss, ni les joueurs, ni l'économie du serveur.`,
    punchline: "💀 Le jeu a un mode hors ligne. Ça s'appelle se désabonner. Essaie, tu verras — les deux expériences sont identiques.",
  },
  {
    roastTitle: "Porté par les Écrans de Chargement",
    roast: `Parlons de {name}, le {spec} {class} de {realm}-{region} avec ses {ilvl} d'ilvl et son score M+ de {score}. Ces statistiques ne sont pas des données de jeu. C'est une lettre de réclamation formelle déposée par le jeu lui-même auprès du joueur, qui refuse visiblement d'en accuser réception depuis plusieurs patchs.

Un score de {score} en Mythique+ sur {region}, ça veut dire que {name} se retrouve en bas du classement de ceux qui ont ESSAYÉ. Pas échoué — essayé. Les gens en dessous de {score} n'ont pas queué. {name} a queué, a fait la clé, et s'est retrouvé avec un score qui laisse entendre que le donjon s'est défendu et a gagné. Le chrono tournait. Les boss aussi. Le résultat était prévisible.

{raid} de progression en incursion. Dans un tier où les joueurs farm le mythique, font des speed runs, recommencent sur des alts et collectionnent les montures, {name} affiche {raid}. Les boss n'ont pas besoin de réviser leurs enrages pour {name}. Ils sont partis à la retraite. C'est {name} qui attend encore une invitation qui ne viendra pas.

Il existe une version de {name} qui corrige tout ça. Qui monte le score, qui upgrade les pièces, qui s'engage dans la progression. Cette version de {name} n'est pas sur {realm}-{region}. Elle n'existe peut-être pas encore. Ou elle existe, mais elle a décidé que {ilvl} et {score}, c'était suffisant. Ce n'est pas suffisant.`,
    punchline: "💀 À {ilvl} de niveau d'objet, tu joues pas au jeu. Tu le hantes.",
  },
  {
    roastTitle: "Héros du LFR, Zéro en Mythique",
    roast: `{name} est un {spec} {class} de {ilvl} de niveau d'objet avec un score Mythique+ de {score} et {raid} en progression de raid. Si tu lis ça à voix haute, tu remarqueras que chaque chiffre est une gifle consécutive. Ce n'est pas un profil de joueur. C'est un rapport d'incident avec trois annexes.

Le {score} M+, c'est un score qui existe dans les statistiques, mais pas vraiment dans les groupes. Quand un chef de groupe ouvre Raider.io, voit {score}, et passe à la candidature suivante, ce n'est pas de la cruauté. C'est de la logique de préservation. Un {score} a des implications sur ce qui se passe dans un +15 quand le dernier boss est à 10%. Ces implications sont documentées. Elles vivent dans les logs maintenant. Elles y sont à l'aise.

{raid} de progression dans le contenu actuel. Il y a des joueurs qui ont farmé ce raid tellement de fois qu'ils font le guide sans regarder l'écran. Et {name} est à {raid}. Pas parce que le contenu est trop dur. Parce que y aller demande de quitter sa zone de confort, ce qui représente manifestement un effort disproportionné pour un personnage de {ilvl} avec un score de {score}.

L'ilvl de {ilvl} est la partie qui fait le plus mal. Parce que c'est pas l'ilvl d'un joueur qui débute. C'est l'ilvl de quelqu'un qui SAIT où sont les upgrades et qui a décidé de ne pas aller les chercher. C'est de l'inaction informée. C'est de la médiocrité prémédités.`,
    punchline: "💀 Le jeu n'a pas abandonné {name}. {name} a sous-traité ce boulot à lui-même et l'a fait à la perfection.",
  },
  {
    roastTitle: "Abonnement Payé, Performances Impayées",
    roast: `Chaque mois, {name} le {spec} {class} envoie de l'argent à Blizzard. En échange, Blizzard maintient un serveur sur {realm}-{region} où un personnage de {ilvl} de niveau d'objet existe, valide un score M+ de {score}, et affiche {raid} dans le tier en cours. C'est la transaction. Les deux parties l'ont acceptée. Une seule devrait avoir honte.

Un score de {score} en Mythique+ ne filtre pas les groupes — il se fait filtrer par eux. Chaque annonce avec un minimum de score requis est une porte fermée que {score} ne peut pas ouvrir. Ces portes ne tiennent pas {name} dehors par cruauté. Elles protègent les neuf autres joueurs contre les conséquences de la présence d'un {score} dans leur clé. C'est de la protection civile, pas du gatekeeping.

{raid} de progression en incursion. À ce stade du tier, le contenu est en farm. La communauté l'a maîtrisé, réinitialisé, recommencé, speed-run, et certains font des runs pour les montures. {name} est à {raid}. Les boss attendent. Ils ont de la patience. Eux. Pas les autres joueurs qui ont candidaté avant {name} et obtenu l'invitation à leur place.

Il existe une version de ce joueur qui règle tous ces problèmes. Monte le score. Upgrade les pièces. S'engage dans la progression. Cette version ne vit pas sur {realm}-{region}. Cette version est une hypothèse, un contre-factuel, une pensée qui traverse parfois l'esprit pendant la connexion et disparaît avant que le premier clic soit fait.`,
    punchline: "💀 Quelque part dans la base de données de Blizzard, il y a un flag 'risque de désabonnement'. Il est activé sur ton compte depuis deux tiers de contenu.",
  },
  {
    roastTitle: "Un Choix de Spé Comme Appel à l'Aide",
    roast: `{name} a choisi d'être {spec} {class}. Sur {realm}-{region}. À {ilvl} de niveau d'objet. Avec un score M+ de {score}. Chacune de ces décisions était un choix, et ensemble elles forment le portrait de quelqu'un qui a regardé le vaste monde d'Azeroth et s'est dit "je veux en vivre le minimum possible, mais d'une façon très précise et identifiable."

Le score de {score} en M+, c'est pas un chiffre. C'est une déclaration. Elle dit : "J'ai été dans des donjons. J'y ai contribué de la manière dont un meuble contribue à un incendie de maison. J'étais là. J'étais techniquement présent. Les logs montreront que j'ai lancé des sorts." Les logs montrent tout ça, {name}. Les logs montrent tout. C'est ça le problème avec les logs.

{raid} de progression de raid à ce point du tier. Le contenu est débloqué. Les boss sont accessibles. Les invitations de guilde tombent chaque semaine. Et {name} est assis à {raid}, équipé de {ilvl} et armé de {score}, en train d'expliquer dans le chat qu'il "apprend encore les combats". Tu apprends les combats depuis l'ouverture du tier. À un moment, l'apprentissage doit se transformer en exécution.

Un {spec} {class} de {ilvl} avec {score} de score sur {realm}, c'est l'équivalent gaming d'un abonnement de salle de sport utilisé deux fois par an. Le matériel est là. L'accès est là. L'intention est là, quelque part, dans un tiroir, à côté de la motivation qui n'a pas non plus été utilisée récemment.`,
    punchline: "💀 Le vrai score Mythique+, c'était les amis qu'on n'a pas faits en chemin.",
  },
  {
    roastTitle: "iLvl {ilvl} : Une Tragédie en Quatre Actes",
    roast: `Acte I : {name} existe en tant que {spec} {class} sur {realm}-{region}. Il possède {ilvl} de niveau d'objet. Il possède {score} de score Mythique+. Il possède {raid} de progression en incursion. Le rideau se lève sur quelqu'un qui a tous les outils pour être un joueur WoW fonctionnel, et qui a fait un travail remarquable pour n'en utiliser aucun.

Acte II : Les donjons. Un score de {score} en Mythique+, c'est le genre de score qui fait reculer les détenteurs de clé dans le chercheur de groupe. Ce n'est pas que {score} soit sans signification. C'est que {score} vient avec un contexte. Le contexte : chaque clé que ce joueur a touchée a probablement souffert. Les clés ne sont pas juste dépletées. Elles sont traumatisées. Elles ont besoin de temps pour se remettre.

Acte III : Le raid. {raid}. Les boss sont là, debout, à attendre. L'équipement est dans le lockout. La progression est disponible, juste là, derrière une entrée de raid dont {name} connaît l'emplacement. Et pourtant. {raid}. Les boss ont commencé à se sentir abandonnés. Certains ont commencé à chercher d'autres joueurs. Des joueurs qui viennent.

Acte IV : Le bilan. À {ilvl} d'équipement, avec {score} de score M+ et {raid} de progression, {name} a assemblé le tableau complet de quelqu'un qui traite World of Warcraft comme un endroit où il existe plutôt qu'un jeu auquel il joue. L'abonnement continue. Le jeu se lance. Le personnage se connecte. Et ensuite : rien de conséquent n'arrive.`,
    punchline: "💀 C'était une histoire de choix. Chacun d'entre eux était le mauvais.",
  },
  {
    roastTitle: "Porté Plus Fort qu'une Remise Hebdomadaire",
    roast: `{name}. {spec} {class}. {ilvl} ilvl. {score} de score M+. {realm}-{region}. Normalement à ce stade d'un roast, on cherche quelque chose de positif à retourner en insulte. Avec {name}, la recherche revient bredouille. Il n'y a rien à retourner. Les stats sont déjà l'insulte, présentées sans ironie, posées là à demander à être lues à voix haute lors d'une réunion de guilde.

La situation Mythique+, c'est vraiment quelque chose. Un score de {score} en {region} dans la saison actuelle signifie que quand {name} rejoint une clé, tout le groupe recalibre ses attentes vers le bas. Pas jusqu'à zéro — ce serait injuste. Jusqu'à environ {score}. C'est là que finit la clé : dépletée, démoralisée, et en train de chercher un remplacement qui ne faisait pas partie du plan initial.

{raid} de progression en incursion, c'est un chiffre qui appartient à un musée dans une exposition intitulée "Ce Qui Aurait Pu Se Passer S'ils Avaient Juste Essayé Un Peu Plus". Les boss sont vaincus chaque semaine par des joueurs qui investissent deux fois moins de temps et retournent deux fois plus de résultats. {name} finance un abonnement pour regarder les autres clear le contenu tout en contribuant personnellement {raid} à l'effort.

La beauté d'un {spec} {class} de {ilvl} en {region}, c'est que le jeu veut aider. Il y a des mécaniques de rattrapage. Des caps hebdomadaires. Des systèmes d'upgrade conçus pour amener les joueurs de {ilvl} à la pertinence. {name} a regardé tout ça, l'a compris, et a choisi {ilvl}.`,
    punchline: "💀 Tous les héros ne portent pas de cape. Certains portent {ilvl} d'ilvl et appellent ça le endgame.",
  },
  {
    roastTitle: "La Candidature Éternelle",
    roast: `{name} est un {spec} {class} de {ilvl} de niveau d'objet depuis {realm}-{region} avec un score Mythique+ de {score} et une progression de raid de {raid}. C'est pas un roast. C'est un avis de recherche déposé par les systèmes de progression du jeu, qui cherchent des preuves d'implication de {name} depuis plusieurs patchs et n'en trouvent presque pas.

Le {score} de score M+ signifie que chaque puriste qui ouvre Raider.io avant d'inviter, voit {score}, et passe tranquillement à la candidature suivante, a fait le bon choix. Pas un choix cruel. Un choix logique. Un {score} a certaines implications pour ce qui se passe dans un +15 quand le dernier boss est à 10% de vie. Ces implications sont bien documentées. Elles vivent dans les logs de combat maintenant.

{raid} raconte l'histoire de quelqu'un qui a installé un jeu, créé un personnage, dépensé de l'argent réel en abonnement, et fait le choix binaire de ne pas s'engager dans le contenu qui finance cet abonnement. Pas ne pouvait pas. A choisi de ne pas. Il y a un bouton chercheur de donjon qui regarde {name} depuis des mois. Non cliqué. Seul. Déçu.

Le {ilvl} de niveau d'objet est la partie qui fait le plus mal. Parce que c'est pas l'ilvl d'un joueur qui commence. C'est l'ilvl de quelqu'un qui SAIT d'où viennent les upgrades et qui a DÉCIDÉ de ne pas les aller chercher. C'est de l'inaction éclairée. C'est de la médiocrité prémédités avec pleine connaissance de cause.`,
    punchline: "💀 Azeroth ne t'a pas abandonné, {name}. C'est toi qui as sous-traité ce boulot et tu l'as fait exceptionnellement bien.",
  },
];

// ─── Public API ───────────────────────────────────────────────────────────────

export function getFallbackRoast(lang: "fr" | "en", vars: RoastVars): FallbackRoast {
  const pool = lang === "fr" ? FALLBACKS_FR : FALLBACKS_EN;
  const raw = pool[Math.floor(Math.random() * pool.length)];
  return {
    roastTitle: fill(raw.roastTitle, vars),
    roast:      fill(raw.roast,      vars),
    punchline:  fill(raw.punchline,  vars),
  };
}
