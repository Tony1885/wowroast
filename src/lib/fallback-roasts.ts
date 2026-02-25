// Roasts de secours utilisés quand Groq est indisponible.
// Les placeholders {name}, {class}, {spec}, {ilvl}, {score}, {realm}, {region}, {raid}
// sont remplacés dynamiquement par les vraies données du personnage.

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
  // 1 — The economist angle
  {
    roastTitle: "Negative Return on Investment",
    roast: `Let's do the math. A WoW subscription costs roughly $15 a month. {name} is a {spec} {class} with {ilvl} item level and a {score} Mythic+ score on {realm}-{region}. Divide the subscription cost by the number of boss kills, dungeon completions, and meaningful gameplay moments produced, and you get a cost-per-achievement that economists would classify as a financial disaster.

The {score} M+ score represents the total output of someone who looked at Blizzard's endgame systems and decided to engage with approximately none of them. Mythic+ scoring rewards effort, consistency, and improvement. {score} rewards showing up once, looking confused, and then logging out to watch someone else clear content on Twitch.

{raid} raid progression in the current tier. The guild recruitment Discord channels have a minimum filter that automatically hides applications with stats like these. Not because the filters are cruel — because the filters have experienced what happens when a {score} joins a progression raid and explains they'll "try their best." The best has been documented. It is {score}.

There is a version of WoW where {ilvl} and {score} make sense. It's called the free trial. The free trial has a level cap. {name} has exceeded the level cap and somehow brought the free trial performance along anyway. That takes a kind of commitment that is, in its own way, impressive.`,
    punchline: "The sub pays for the servers. The servers are doing more work than you are.",
  },
  // 2 — The sports commentator angle
  {
    roastTitle: "Benched for the Entire Season",
    roast: `Good evening and welcome to the {realm}-{region} arena. Tonight's featured player is {name}, a {spec} {class} sitting at {ilvl} item level with a Mythic+ score of {score}. Our analysts have been studying the tape. The tape is not good. In fact, our senior analyst has filed for emotional compensation after reviewing the logs.

The M+ segment of tonight's analysis is brief. {score}. That's the score. We had a longer segment planned but there wasn't enough content to fill it. The team reviewed every dungeon run, every key push, every depleted +something, and produced a highlight reel that runs thirty-seven seconds including the loading screens. {score}. Moving on.

{raid} in the current raid tier. The coaching staff has concerns. Specifically, the concern is that the coaching staff doesn't appear to exist for this player, because a coach would have seen {raid} happening and intervened months ago. At some point in the progression window, {name} made a decision — possibly several — that resulted in the current standings. The standings are {raid}.

Final analysis: {name} the {spec} {class} at {ilvl} item level is the kind of player that makes scouts close their notebooks. Not in despair. In self-preservation. You do not build a franchise around {score}. You do not put {ilvl} on a playoff roster. You have a very polite conversation and suggest recreational leagues.`,
    punchline: "You're not on the bench. You're in the stands, watching your own potential play without you.",
  },
  // 3 — The documentary narrator angle
  {
    roastTitle: "A Species Observed in Its Natural Habitat",
    roast: `In the wild expanses of {realm}-{region}, we observe a rare specimen: the {ilvl} {spec} {class}, known in academic circles as the "perma-casual subscriptus." Unlike its more evolved cousins who have developed Mythic+ scores above four digits, this particular individual has adapted to life at {score}, developing a remarkable immunity to progression pressure and group finder filters.

What makes the {score} M+ score particularly fascinating is the evolutionary dead-end it represents. The species possesses all the biological equipment required to push higher keys — the class, the spec, the game client — but has developed behavioral patterns that prevent it from using them. Scientists theorize this is a defense mechanism. Against what, exactly, remains unclear.

The {raid} raid progression tells us this specimen has encountered raid content. Perhaps looked at it through the entrance. Possibly ran LFR once and called it research. The raid bosses, interviewed separately, have no memory of {name}. The bosses have very good memories. They remember every player who has significantly inconvenienced them. {name} did not make the list.

The specimen continues to pay its subscription, log in at irregular intervals, and exist at {ilvl} — a behavioral loop that researchers have termed "engaged disengagement." The specimen is technically playing. The game, however, is not technically being played.`,
    punchline: "Sir David Attenborough could narrate your raid progression in a single, sympathetic exhale.",
  },
  // 4 — The customer service complaint angle
  {
    roastTitle: "We're Sorry for Your Experience",
    roast: `Dear {name}, thank you for contacting Azeroth Customer Support. We have reviewed your account and can confirm that your {spec} {class} on {realm}-{region} currently holds a {ilvl} item level and a Mythic+ score of {score}. We have reviewed your ticket, which asks why you aren't progressing. Our investigation is complete.

The first issue identified is your Mythic+ engagement. A {score} M+ score suggests that either dungeons are not being attempted, or they are being attempted in a way that produces {score}. Both outcomes have the same result: {score}. Our support team recommends attempting dungeons in a way that does not produce {score}. Specific techniques are available in our knowledge base under "trying."

Regarding raid progression: {raid}. Our records indicate that raid content exists, has been available for the current tier, and has raid entrances that are accessible via in-game map. We cannot locate any record of {name} successfully inconveniencing a mythic boss. We have checked twice. We are sorry for your experience.

We want to assure {name} that the game is working correctly. The dungeons are there. The raids are there. The upgrade systems are there. The {ilvl} gear and {score} score are the result of choices made by the account holder, and we support your right to make those choices. We do not support the choices themselves, but we respect the process.`,
    punchline: "This ticket has been escalated to a department called 'Please Just Try.' Estimated resolution: never.",
  },
  // 5 — The obituary angle
  {
    roastTitle: "In Loving Memory of Your Potential",
    roast: `We gather today to mourn the potential of {name}, a {spec} {class} of {realm}-{region}, who passed from "promising player" to "{ilvl} and {score}" somewhere between the beginning of the expansion and now. The cause of death was determined to be a combination of logging in, doing nothing of consequence, and logging out — repeated at irregular intervals until the outcome was finalized.

{name} is survived by a Mythic+ score of {score}, which has been described by those closest to it as "technically a number." The {score} had a brief but uneventful career in the dungeon finder, appearing occasionally in group listings marked "any score" and contributing to runs in ways that witnesses have struggled to specifically recall. "They were there," said one survivor. "I think."

The raid progression of {raid} precedes {name} in death. It passed quietly at the start of the tier, when the decision was made to not engage with mythic content in any meaningful capacity. The bosses were not notified. They have moved on. They are currently being farmed by players who did not share {name}'s commitment to {raid}.

In lieu of flowers, the family requests that mourners log into WoW, queue for a Mythic+ dungeon, and actually complete it. This would have been {name}'s final wish, had {name} been the type of player to have such wishes.`,
    punchline: "The funeral potluck is LFR. You'd fit right in. Unfortunately.",
  },
  // 6 — The job interview angle
  {
    roastTitle: "Application Declined: See Notes",
    roast: `Position: Raid Member. Applicant: {name}, {spec} {class}, {realm}-{region}. Review status: Complete. Decision: No.

The candidate presents with {ilvl} item level, which falls below the position's requirement of "geared enough that we don't have to explain what item level is." The hiring team spent eleven minutes discussing whether to proceed with the application and used ten of those minutes explaining to a new team member why {ilvl} is the number it is. The remaining minute was used to vote. The vote was unanimous.

Mythic+ score: {score}. The role requires a demonstrable ability to complete timed content without single-handedly converting a key into a character-building experience for the other nine participants. {score} does not demonstrate this ability. {score} raises questions about whether timed content has been attempted, and if so, whether a different definition of "timed" was being used. We wish the candidate well. We wish this on their own time.

Raid progression: {raid}. The role involves killing bosses. {raid} indicates a familiarity with the concept of raid bosses that is primarily theoretical. The interview panel has killed bosses. They did not want to use the interview to explain what bosses are to someone at {raid}. They did use the interview for exactly that. It did not go well for anyone involved.

The position will remain open.`,
    punchline: "We've filed your application under 'Do Not Call.' The folder is large. You're in good company.",
  },
  // 7 — The therapist angle
  {
    roastTitle: "Let's Talk About What's Really Going On",
    roast: `{name}, I want you to know that this is a safe space. We can talk about the {ilvl}. We can talk about the {score}. We can explore, together, the chain of decisions that led a {spec} {class} on {realm}-{region} to arrive at a point in their WoW journey where {raid} represents the current state of raid engagement. I'm not here to judge. I'm here to be confused alongside you.

Let's start with the M+ score. {score}. When you see that number, what comes up for you? Is it a reflection of time available? A comment on how you prioritize gaming? Or is it a number that you've made peace with, the way some people make peace with chronic back pain — not because it's acceptable, but because addressing it would require effort that currently isn't available? We're not judging. We're observing.

The raid progression — {raid} — speaks to a relationship with end-game content that I'd describe as "complicated." Not absent. Complicated. You know the raid exists. You may have watched videos. You might have cleared LFR and experienced something that felt like raiding the way a greeting card store feels like a library. The bosses, though, remain unkilled at the level that would register in anyone's memory. That gap between knowing and doing — let's sit with that.

Where do you see yourself in six months? Still at {ilvl}? Still at {score}? Or is there a version of this where a {spec} {class} on {realm} actually engages with the game they're paying for? We can work toward that. It starts with one queued dungeon. One. Today.`,
    punchline: "Homework for next session: queue for something. Don't cancel it. Show up. We'll debrief.",
  },
  // 8 — The cooking show angle
  {
    roastTitle: "This Dish Is Not Ready to Be Served",
    roast: `Welcome to the Kitchen, {name}. Today you've brought us a {spec} {class} from {realm}-{region}, seasoned with {ilvl} item level and a Mythic+ score reduction of {score}. The presentation is... functional. The character exists. It has loaded into the game. These are the baseline requirements met. Beyond baseline, the dish has several significant issues that prevent it from advancing to the next round.

The M+ score — {score} — is underseasoned. A well-developed endgame player would have a score with depth, complexity, layers of dungeon completions that build on each other to create something with genuine flavor. {score} tastes like a dish where the chef looked at the recipe, nodded thoughtfully, and then made something completely different for no identifiable reason. There is a recipe for a good M+ score. It is widely available. {score} is not following it.

The raid progression, {raid}, is what happens when a dish is pulled from the oven too early. The raw potential is visible. The structure is there. With another six to eight weeks in the content, this could develop into something. But {raid} is what happens when patience runs out before the content does, and someone decides "this is fine" when fine is clearly not the word that fits.

The judges have deliberated. The {ilvl} is not a finishing item level. The {score} requires fundamentals that are not currently present. {raid} leaves the tasting panel uncertain whether the chef has engaged with the source ingredients. The dish is sent back to the kitchen.`,
    punchline: "The secret ingredient was effort. It was not included in this recipe.",
  },
  // 9 — The real estate agent angle
  {
    roastTitle: "Fixer-Upper: Priced to Move",
    roast: `Welcome to today's property showing. The listing: {name}, a {spec} {class} currently located on {realm}-{region}. Asking price: one group finder slot. Condition: as-is. Disclosures: several. The seller has asked us to highlight the {ilvl} item level as a "feature." We are contractually obligated to list it. We are not contractually obligated to agree with the framing.

The Mythic+ score of {score} is what appraisers call a "needs work" number. It is not the floor — there is theoretically a floor below {score}, though we have never personally seen it. It is, however, the kind of number that causes other players to slow down when passing the listing, shake their heads slightly, and drive on. "{score} is a lot to take on," they say. "We'd have to start from scratch." They are not wrong.

The raid progression disclosure: {raid}. We are required by law to inform prospective group members that {raid} is the current state of the property. This has not been updated recently. The raid bosses in question have moved on, been killed by other groups, and are now on farm rotation. The property's relationship with those bosses remains {raid}. This is a known condition of the listing.

The {spec} {class} designation adds character. "Character" is a real estate term for "things we cannot call problems for legal reasons." A well-maintained {spec} at {ilvl} with a {score} M+ score tells a story. It is a fixer-upper story. It requires significant investment to bring to neighborhood standard. The neighborhood standard is considerably higher than {score}.`,
    punchline: "Motivated seller. Very motivated. Please take this key slot off our hands.",
  },
  // 10 — The ancient philosopher angle
  {
    roastTitle: "The Allegory of the {ilvl} Gear",
    roast: `Plato wrote of prisoners in a cave, watching shadows on a wall and mistaking them for reality. {name}, a {spec} {class} on {realm}-{region} with {ilvl} item level and a {score} Mythic+ score, is the shadows. Other players are watching {name}'s performance and using it as a benchmark for what not to do. In this way, {name} contributes to the philosophical education of {realm}. This is, perhaps, the greatest contribution yet made.

The Stoics taught that suffering comes from attachment to things outside one's control. A {score} M+ score is, philosophically speaking, within one's control. The queue button exists. The dungeons exist. The upgrade vendors exist with their systems of advancement that have been specifically designed to move a player from {ilvl} to something more respectable. The Stoics would say: do the dungeon. The Stoics would be disappointed with {score}.

Aristotle believed in eudaimonia — human flourishing through the exercise of one's highest capacities. The highest capacity of a {spec} {class} involves optimized rotations, proper positioning, and progression through escalating content. {raid} raid progression and {score} M+ score represent, in Aristotelian terms, the flourishing of someone who has read the description of flourishing and decided to think about it further before actually flourishing.

Nietzsche would look at {name}'s character sheet and say "what doesn't kill you makes you stronger." What has not killed {name} is mediocrity, chronic underperformance, and {ilvl} gear. {name} has survived all of it. Nietzsche would follow up: "but did it make you stronger?" The answer is sitting at {score} in the Raider.io database, not getting stronger.`,
    punchline: "Socrates said the unexamined life is not worth living. He had not yet encountered the unplayed game.",
  },
  // 11 — The wildlife conservation angle
  {
    roastTitle: "An Endangered Playstyle",
    roast: `The {ilvl} {spec} {class} of {realm}-{region} is a creature of remarkable consistency. In a world that has moved on to higher Mythic+ scores, more advanced raid progressions, and item levels that reflect genuine engagement, {name} has maintained {ilvl} and {score} with a dedication that naturalists are calling "aggressive stasis." Some species evolve. {name} has chosen to become a conservation exhibit.

The Mythic+ score of {score} is a protected number. Not by law — by the group finder, which has constructed invisible barriers that prevent {score} from accessing content that might threaten its stability. These barriers exist not to harm {score}, but to preserve the experience of the other nine players in the key who have come expecting a dungeon run and not a rescue mission. The key is the ecosystem. {score} is an invasive species in that ecosystem.

{raid} raid progression is what happens when a creature encounters its natural habitat and decides to observe rather than participate. The habitat is the raid. The bosses are the environmental features. Other players are the fauna. {name} is a visitor who bought a park pass, drove to the gate, looked at the map, and then went home. The park is still there. The bosses are still inside. The map is still accurate. {name} went home.

Conservation efforts for the {ilvl} {spec} {class} continue. Researchers have identified possible intervention strategies: queuing for a dungeon, watching a class guide, speaking to an in-game vendor about upgrades. The subject has shown no interest in any of these interventions. The subject is thriving in its current environment. The current environment is {realm}-{region}, at {ilvl} and {score}, doing {raid} and calling it a life.`,
    punchline: "The IUCN has listed your performance as 'Extinct in the Wild.' Only seen in captivity now.",
  },
  // 12 — The museum curator angle
  {
    roastTitle: "Exhibit 7B: The Casual Player Preserved in Amber",
    roast: `Visitors to our exhibit today will find {name}, a remarkably preserved specimen of the genre known as "paying customer who has unlocked nothing." The {spec} {class} of {realm}-{region} stands frozen at {ilvl} item level, a timestamp preserved in gear that hasn't been meaningfully upgraded since an era archaeologists are beginning to call "before {name} tried."

The Mythic+ display case contains a score of {score}, presented beneath archival lighting. Note the craftsmanship — this is not a score achieved through recklessness or speed. This is a score built slowly, carefully, over multiple seasons of careful avoidance. The curators have attempted to reconstruct the method by which {score} was obtained. Working theories include: running very few keys, running keys in ways that produce negative results, or encountering keys and deciding that this week wasn't a good week.

The Raid Progression Room — third door on your left — features {raid} displayed alongside a timeline of what other players on {realm} were doing at the same time. The contrast is educational. While {name} was maintaining {raid}, other players were progressing, clearing, farming, and eventually mount-running content that {name} has not yet mechanically encountered. The timeline is not flattering. The museum presents it without editorial comment. The comment is implied.

Gift shop closes at six. The gift shop sells a {ilvl} item level that requires no effort to obtain, which is coincidentally {ilvl}. {name} has apparently been shopping at the gift shop exclusively for several patches. The gift shop thanks {name} for the business.`,
    punchline: "Admission is free. The exhibit is a mirror. You're welcome.",
  },
];

// ─── FRENCH FALLBACKS ─────────────────────────────────────────────────────────
const FALLBACKS_FR: Array<{ roastTitle: string; roast: string; punchline: string }> = [
  // 1 — L'économiste
  {
    roastTitle: "Retour sur Investissement Négatif",
    roast: `Faisons le calcul. Un abonnement WoW coûte environ 13€ par mois. {name} est un {spec} {class} avec {ilvl} de niveau d'objet et un score Mythique+ de {score} sur {realm}-{region}. Divise le coût de l'abonnement par le nombre de kills de boss, de donjons complétés, et de moments de gameplay significatifs produits, et tu obtiens un coût par accomplissement que les économistes classeraient dans la catégorie "catastrophe financière documentée."

Le score {score} en Mythique+ représente le rendement total de quelqu'un qui a regardé les systèmes endgame de Blizzard et décidé de s'engager avec exactement aucun d'entre eux. Le Mythique+ récompense l'effort, la constance et la progression. {score} récompense le fait de se pointer une fois, d'avoir l'air perdu, et de se déconnecter pour regarder quelqu'un d'autre clear le contenu sur Twitch.

{raid} de progression en incursion dans le tier actuel. Les canaux de recrutement de guilde ont un filtre automatique qui masque les candidatures avec des statistiques comme celles-là. Pas parce que les filtres sont cruels — parce que les filtres ont vécu ce qui se passe quand un {score} rejoint une raid de progression et explique qu'il va "faire de son mieux." Le mieux a été documenté. C'est {score}.

Il existe une version de WoW où {ilvl} et {score} ont du sens. Elle s'appelle l'essai gratuit. L'essai gratuit a un cap de niveau. {name} a dépassé ce cap et a réussi, d'une façon ou d'une autre, à amener les performances de l'essai gratuit avec lui dans l'endgame. Ça demande une forme d'engagement qui est, en soi, impressionnante.`,
    punchline: "💀 L'abonnement finance les serveurs. Les serveurs travaillent plus que toi.",
  },
  // 2 — Le commentateur sportif
  {
    roastTitle: "Sur le Banc pour Toute la Saison",
    roast: `Bonsoir et bienvenue dans l'arène de {realm}-{region}. Le joueur vedette de ce soir est {name}, un {spec} {class} positionné à {ilvl} de niveau d'objet avec un score Mythique+ de {score}. Nos analystes ont étudié les replays. Les replays ne sont pas bons. Notre analyste senior a déposé une demande d'indemnisation émotionnelle après avoir visionné les logs.

Le segment Mythique+ de notre analyse de ce soir sera bref. {score}. C'est le score. Nous avions prévu un segment plus long mais il n'y avait pas assez de contenu pour le remplir. L'équipe a passé en revue chaque run de donjon, chaque pousse de clé, chaque clé dépletée, et a produit un highlight reel qui dure trente-sept secondes écrans de chargement inclus. {score}. On passe à la suite.

{raid} dans le tier de raid actuel. Le staff d'entraîneurs s'inquiète. Plus précisément, le staff d'entraîneurs semble ne pas exister pour ce joueur, parce qu'un coach qui aurait vu {raid} se produire serait intervenu il y a des mois. À un moment dans la fenêtre de progression, {name} a pris des décisions — plusieurs peut-être — qui ont abouti au classement actuel. Le classement, c'est {raid}.

Analyse finale : {name} le {spec} {class} à {ilvl} de niveau d'objet est le genre de joueur qui fait fermer les carnets de notes aux recruteurs. Pas de désespoir — de préservation instinctive. On ne construit pas une équipe autour de {score}. On ne met pas {ilvl} sur un roster de playoffs. On a une conversation très polie et on suggère les ligues récréatives.`,
    punchline: "💀 T'es pas sur le banc. T'es dans les tribunes, à regarder ton propre potentiel jouer sans toi.",
  },
  // 3 — La voix off documentaire
  {
    roastTitle: "Une Espèce Observée dans Son Habitat Naturel",
    roast: `Dans les vastes étendues de {realm}-{region}, nous observons un spécimen rare : le {spec} {class} de {ilvl} de niveau d'objet, connu dans les cercles académiques sous le nom de "casual permanentus subscriptus." Contrairement à ses cousins mieux évolutiés qui ont développé des scores Mythique+ à quatre chiffres, cet individu particulier s'est adapté à la vie à {score}, développant une remarquable immunité à la pression de progression et aux filtres du chercheur de groupe.

Ce qui rend le score M+ de {score} particulièrement fascinant, c'est l'impasse évolutive qu'il représente. Le spécimen possède tout l'équipement biologique nécessaire pour pousser des clés plus élevées — la classe, la spécialisation, le client du jeu — mais a développé des schémas comportementaux qui l'empêchent de les utiliser. Les scientifiques théorisent que c'est un mécanisme de défense. Contre quoi, exactement, reste à élucider.

La progression de raid {raid} nous dit que ce spécimen a rencontré du contenu de raid. Peut-être l'a-t-il regardé depuis l'entrée. A peut-être fait le LFR une fois et appelé ça de la recherche. Les boss de raid, interrogés séparément, n'ont aucun souvenir de {name}. Les boss ont d'excellentes mémoires. Ils se souviennent de chaque joueur qui les a significativement contrariés. {name} ne figure pas sur la liste.

Le spécimen continue de payer son abonnement, de se connecter à des intervalles irréguliers, et d'exister à {ilvl} — une boucle comportementale que les chercheurs ont baptisée "désengagement engagé." Le spécimen joue techniquement. Le jeu, cependant, n'est techniquement pas joué.`,
    punchline: "💀 David Attenborough pourrait narrer ta progression de raid en un seul soupir compatissant.",
  },
  // 4 — Le service client
  {
    roastTitle: "Nous Sommes Désolés pour Votre Expérience",
    roast: `Cher {name}, merci de contacter le Support Client d'Azeroth. Nous avons examiné votre compte et pouvons confirmer que votre {spec} {class} sur {realm}-{region} possède actuellement {ilvl} de niveau d'objet et un score Mythique+ de {score}. Nous avons examiné votre ticket, qui demande pourquoi vous ne progressez pas. Notre enquête est terminée.

Le premier problème identifié est votre engagement en Mythique+. Un score de {score} en M+ suggère que soit les donjons ne sont pas tentés, soit ils sont tentés d'une manière qui produit {score}. Les deux résultats ont le même effet : {score}. Notre équipe de support recommande de tenter les donjons d'une manière qui ne produit pas {score}. Des techniques spécifiques sont disponibles dans notre base de connaissances sous la rubrique "essayer."

Concernant la progression en raid : {raid}. Nos registres indiquent que le contenu de raid existe, a été disponible pendant le tier actuel, et possède des entrées accessibles via la carte du jeu. Nous ne pouvons pas localiser de trace montrant que {name} ait significativement contrarié un boss mythique. Nous avons vérifié deux fois. Nous sommes désolés pour votre expérience.

Nous voulons assurer {name} que le jeu fonctionne correctement. Les donjons sont là. Les raids sont là. Les systèmes d'upgrade sont là. Le {ilvl} d'équipement et le score {score} résultent de choix effectués par le titulaire du compte, et nous soutenons votre droit à faire ces choix. Nous ne soutenons pas les choix eux-mêmes, mais nous respectons le processus.`,
    punchline: "💀 Ce ticket a été escaladé à un département appelé 'Essaie Juste'. Délai de résolution estimé : jamais.",
  },
  // 5 — L'annonce immobilière
  {
    roastTitle: "À Rénover : Prix à Débattre",
    roast: `Bienvenue pour la visite de ce soir. Le bien en question : {name}, un {spec} {class} actuellement localisé sur {realm}-{region}. Prix demandé : une place dans le groupe. État : vendu en l'état. Déclarations obligatoires : plusieurs. Le vendeur nous a demandé de présenter le {ilvl} de niveau d'objet comme une "caractéristique." Nous sommes contractuellement obligés de le lister. Nous ne sommes pas contractuellement obligés d'être d'accord avec le cadrage.

Le score Mythique+ de {score} est ce que les experts appellent un chiffre "qui nécessite des travaux." Ce n'est pas le plancher — il existe théoriquement un plancher en dessous de {score}, bien que nous ne l'ayons jamais personnellement observé. C'est cependant le genre de chiffre qui fait ralentir les autres joueurs devant l'annonce, hocher légèrement la tête, et continuer à rouler. "{score}, c'est beaucoup à assumer," disent-ils. "Il faudrait repartir de zéro." Ils n'ont pas tort.

La déclaration sur la progression de raid : {raid}. Nous sommes légalement tenus d'informer les candidats potentiels au groupe que {raid} est l'état actuel du bien. Cela n'a pas été mis à jour récemment. Les boss de raid en question sont passés à autre chose, ont été tués par d'autres groupes, et sont maintenant en farm. La relation du bien avec ces boss reste {raid}. C'est une condition connue de l'annonce.

La désignation {spec} {class} ajoute du caractère. "Caractère" est un terme immobilier pour "choses que nous ne pouvons pas appeler des problèmes pour des raisons juridiques." Un {spec} bien entretenu à {ilvl} avec un score M+ de {score} raconte une histoire. C'est une histoire de rénovation. Elle nécessite un investissement significatif pour atteindre le standard du quartier. Le standard du quartier est considérablement plus élevé que {score}.`,
    punchline: "💀 Vendeur très motivé. Très. Prenez cette place de groupe, on vous en supplie.",
  },
  // 6 — L'entretien d'embauche
  {
    roastTitle: "Candidature Refusée — Voir les Notes",
    roast: `Poste : Membre de Raid. Candidat : {name}, {spec} {class}, {realm}-{region}. Statut de l'examen : Terminé. Décision : Non.

Le candidat se présente avec {ilvl} de niveau d'objet, ce qui est en dessous des exigences du poste, définies comme "équipé suffisamment pour qu'on n'ait pas à expliquer ce qu'est un niveau d'objet." L'équipe de recrutement a passé onze minutes à débattre de la suite à donner à la candidature et en a utilisé dix pour expliquer à un nouveau membre d'équipe pourquoi {ilvl} est le chiffre qu'il est. La minute restante a été utilisée pour voter. Le vote a été unanime.

Score Mythique+ : {score}. Le poste nécessite une capacité démontrée à compléter du contenu chronométré sans transformer une clé en expérience de croissance personnelle pour les neuf autres participants. {score} ne démontre pas cette capacité. {score} soulève des questions sur la question de savoir si le contenu chronométré a été tenté, et si oui, si une définition différente de "chronométré" était utilisée. Nous souhaitons bonne chance au candidat. Nous lui souhaitons ça en dehors de nos keys.

Progression de raid : {raid}. Le poste implique de tuer des boss. {raid} indique une familiarité avec le concept de boss de raid qui est principalement théorique. Le jury a tué des boss. Il ne voulait pas utiliser l'entretien pour expliquer ce que sont les boss à quelqu'un à {raid}. Il l'a quand même utilisé à cette fin. Ça ne s'est bien passé pour personne.

Le poste reste ouvert.`,
    punchline: "💀 Votre candidature a été classée sous 'Ne Pas Rappeler'. Le dossier est épais. Vous êtes en bonne compagnie.",
  },
  // 7 — Le cuisinier
  {
    roastTitle: "Ce Plat N'est Pas Prêt à Être Servi",
    roast: `Bienvenue dans la cuisine, {name}. Aujourd'hui tu nous as apporté un {spec} {class} de {realm}-{region}, assaisonné de {ilvl} de niveau d'objet et d'une réduction de score Mythique+ à {score}. La présentation est... fonctionnelle. Le personnage existe. Il s'est chargé dans le jeu. Ce sont les exigences minimales satisfaites. Au-delà du minimum, le plat présente plusieurs problèmes significatifs qui l'empêchent de passer au tour suivant.

Le score M+ — {score} — manque d'assaisonnement. Un joueur endgame bien développé aurait un score avec de la profondeur, de la complexité, des couches de complétion de donjons qui se construisent les unes sur les autres pour créer quelque chose avec une vraie saveur. {score} a le goût d'un plat où le chef a regardé la recette, hoché la tête pensivement, et fait ensuite quelque chose de complètement différent sans raison identifiable. Il existe une recette pour un bon score M+. Elle est largement disponible. {score} ne la suit pas.

La progression de raid, {raid}, c'est ce qui se passe quand on retire un plat du four trop tôt. Le potentiel brut est visible. La structure est là. Avec encore six à huit semaines dans le contenu, ça pourrait se développer en quelque chose. Mais {raid}, c'est ce qui arrive quand la patience s'épuise avant que le contenu le fasse, et que quelqu'un décide que "c'est suffisant" alors que "suffisant" est clairement un mot qui ne s'applique pas.

Les juges ont délibéré. Le {ilvl} n'est pas un niveau d'objet final. Le {score} nécessite des bases qui ne sont pas actuellement présentes. {raid} laisse le jury d'évaluation incertain quant à la question de savoir si le chef a travaillé avec les ingrédients sources. Le plat est renvoyé en cuisine.`,
    punchline: "💀 L'ingrédient secret, c'était l'effort. Il ne figurait pas dans cette recette.",
  },
  // 8 — Le philosophe antique
  {
    roastTitle: "L'Allégorie de l'Équipement {ilvl}",
    roast: `Platon parlait de prisonniers dans une caverne, regardant des ombres sur un mur et les confondant avec la réalité. {name}, un {spec} {class} sur {realm}-{region} avec {ilvl} de niveau d'objet et un score M+ de {score}, est les ombres. D'autres joueurs regardent la performance de {name} et l'utilisent comme référence de ce qu'il ne faut pas faire. De cette manière, {name} contribue à l'éducation philosophique de {realm}. C'est peut-être la plus grande contribution faite jusqu'ici.

Les Stoïciens enseignaient que la souffrance vient de l'attachement aux choses hors de notre contrôle. Un score M+ de {score} est, philosophiquement parlant, dans notre contrôle. Le bouton de file d'attente existe. Les donjons existent. Les vendeurs d'amélioration existent avec leurs systèmes conçus pour faire passer un joueur de {ilvl} à quelque chose de plus respectable. Les Stoïciens diraient : fais le donjon. Les Stoïciens seraient déçus par {score}.

Aristote croyait en l'eudaimonia — l'épanouissement humain par l'exercice de ses capacités les plus hautes. La capacité la plus haute d'un {spec} {class} implique des rotations optimisées, un positionnement correct, et une progression à travers du contenu escaladant. {raid} de progression et {score} de score M+ représentent, en termes aristotéliciens, l'épanouissement de quelqu'un qui a lu la description de l'épanouissement et a décidé d'y réfléchir encore avant de réellement s'épanouir.

Nietzsche dirait que ce qui ne tue pas rend plus fort. Ce qui n'a pas tué {name}, c'est la médiocrité, la sous-performance chronique, et {ilvl} d'équipement. {name} a survécu à tout ça. Nietzsche demanderait en suivi : "mais est-ce que ça t'a rendu plus fort ?" La réponse est assise à {score} dans la base de données de Raider.io, sans se renforcer.`,
    punchline: "💀 Socrate disait que la vie non examinée ne vaut pas la peine d'être vécue. Il n'avait pas encore rencontré le jeu non joué.",
  },
  // 9 — Le musée
  {
    roastTitle: "Exposition 7B : Le Joueur Casual Conservé dans l'Ambre",
    roast: `Les visiteurs de notre exposition trouveront aujourd'hui {name}, un spécimen remarquablement conservé du genre connu sous le nom de "client payant qui n'a rien débloqué." Le {spec} {class} de {realm}-{region} se tient figé à {ilvl} de niveau d'objet, un horodatage préservé dans un équipement qui n'a pas été significativement amélioré depuis une ère que les archéologues commencent à appeler "avant que {name} essaie."

La vitrine Mythique+ contient un score de {score}, présenté sous un éclairage d'archives. Notez l'artisanat — ce n'est pas un score obtenu par imprudence ou vitesse. C'est un score construit lentement, soigneusement, au fil de plusieurs saisons d'évitement minutieux. Les conservateurs ont tenté de reconstituer la méthode par laquelle {score} a été obtenu. Les théories de travail incluent : faire très peu de clés, faire des clés d'une manière qui produit des résultats négatifs, ou rencontrer des clés et décider que cette semaine n'était pas une bonne semaine.

La Salle de Progression de Raid — troisième porte à gauche — présente {raid} aux côtés d'une chronologie de ce que les autres joueurs de {realm} faisaient au même moment. Le contraste est instructif. Pendant que {name} maintenait {raid}, d'autres joueurs progressaient, clearaient, farmaient, et finissaient par faire des runs pour les montures dans du contenu que {name} n'a pas encore mécaniquement rencontré. La chronologie n'est pas flatteuse. Le musée la présente sans commentaire éditorial. Le commentaire est implicite.

La boutique du musée ferme à dix-huit heures. La boutique vend un niveau d'objet {ilvl} qui ne nécessite aucun effort à obtenir, ce qui est par coïncidence {ilvl}. {name} semble avoir fait ses achats exclusivement à la boutique pendant plusieurs tiers. La boutique remercie {name} pour le commerce.`,
    punchline: "💀 L'entrée est gratuite. L'exposition est un miroir. De rien.",
  },
  // 10 — Le conservateur de la nature
  {
    roastTitle: "Une Espèce en Voie de Disparition",
    roast: `Le {spec} {class} de {ilvl} de {realm}-{region} est une créature d'une cohérence remarquable. Dans un monde qui a évolué vers des scores Mythique+ plus élevés, des progressions de raid plus avancées, et des niveaux d'objet qui reflètent un vrai engagement, {name} a maintenu {ilvl} et {score} avec un dévouement que les naturalistes qualifient de "stase agressive." Certaines espèces évoluent. {name} a choisi de devenir une exposition de conservation.

Le score Mythique+ de {score} est un nombre protégé. Pas par la loi — par le chercheur de groupe, qui a construit des barrières invisibles empêchant {score} d'accéder au contenu qui pourrait menacer sa stabilité. Ces barrières n'existent pas pour nuire à {score}, mais pour préserver l'expérience des neuf autres joueurs dans la clé qui sont venus s'attendre à un donjon et non à une mission de sauvetage. La clé est l'écosystème. {score} est une espèce invasive dans cet écosystème.

{raid} de progression de raid, c'est ce qui se passe quand une créature rencontre son habitat naturel et décide d'observer plutôt que de participer. L'habitat, c'est le raid. Les boss, ce sont les éléments environnementaux. Les autres joueurs, c'est la faune. {name} est un visiteur qui a acheté un pass, est allé jusqu'à l'entrée, a regardé la carte, et est rentré chez lui. Le parc est toujours là. Les boss sont toujours à l'intérieur. La carte est toujours exacte. {name} est rentré chez lui.

Les efforts de conservation pour le {spec} {class} de {ilvl} se poursuivent. Des chercheurs ont identifié des stratégies d'intervention possibles : faire la file pour un donjon, regarder un guide de classe, parler à un vendeur in-game sur les améliorations. Le sujet n'a montré aucun intérêt pour aucune de ces interventions. Le sujet prospère dans son environnement actuel. L'environnement actuel, c'est {realm}-{region}, à {ilvl} et {score}, faisant {raid} et appelant ça une vie.`,
    punchline: "💀 L'UICN a classé tes performances comme 'Éteint à l'État Sauvage'. Observé uniquement en captivité désormais.",
  },
  // 11 — Le thérapeute
  {
    roastTitle: "Parlons de Ce Qui Se Passe Vraiment",
    roast: `{name}, je veux que tu saches que c'est un espace sûr. On peut parler des {ilvl}. On peut parler du {score}. On peut explorer ensemble la chaîne de décisions qui a conduit un {spec} {class} sur {realm}-{region} à arriver à un point de son parcours WoW où {raid} représente l'état actuel de l'engagement en raid. Je ne suis pas là pour juger. Je suis là pour être confus à tes côtés.

Commençons par le score M+. {score}. Quand tu vois ce nombre, qu'est-ce qui se passe en toi ? Est-ce que ça reflète le temps disponible ? Un commentaire sur ta façon de prioriser le gaming ? Ou est-ce un nombre avec lequel tu as fait la paix, comme certaines personnes font la paix avec des douleurs chroniques — pas parce que c'est acceptable, mais parce que s'en occuper demanderait un effort qui n'est pas actuellement disponible ? On ne juge pas. On observe.

La progression de raid — {raid} — témoigne d'une relation avec le contenu endgame que je décrirais comme "compliquée". Pas absente. Compliquée. Tu sais que le raid existe. Tu as peut-être regardé des vidéos. Tu as peut-être fait le LFR et vécu quelque chose qui ressemblait à du raiding comme une librairie Relay ressemble à une bibliothèque. Les boss, pourtant, restent non tués au niveau qui s'enregistrerait dans la mémoire de quiconque. Cet écart entre savoir et faire — asseyons-nous avec ça.

Où tu te vois dans six mois ? Toujours à {ilvl} ? Toujours à {score} ? Ou y a-t-il une version de ça où un {spec} {class} sur {realm} s'engage réellement avec le jeu pour lequel il paie ? On peut travailler vers ça. Ça commence par un donjon en file d'attente. Un. Aujourd'hui.`,
    punchline: "💀 Devoir pour la prochaine séance : faire la file pour quelque chose. Ne pas annuler. Te présenter. On en reparlera.",
  },
  // 12 — L'avis nécrologue
  {
    roastTitle: "À la Mémoire de Ton Potentiel",
    roast: `Nous nous rassemblons aujourd'hui pour pleurer le potentiel de {name}, un {spec} {class} de {realm}-{region}, qui a trépassé de "joueur prometteur" à "{ilvl} et {score}" quelque part entre le début de l'extension et maintenant. La cause du décès a été déterminée comme étant une combinaison de se connecter, ne rien faire de conséquent, et se déconnecter — répétée à intervalles irréguliers jusqu'à ce que l'issue soit finalisée.

{name} est survivé par un score Mythique+ de {score}, décrit par ceux qui l'ont côtoyé comme "techniquement un nombre." Le {score} a eu une carrière brève mais insignifiante dans le chercheur de donjons, apparaissant occasionnellement dans des annonces marquées "n'importe quel score" et contribuant aux runs d'une manière que les témoins ont eu du mal à rappeler spécifiquement. "Il était là," a déclaré un survivant. "Je crois."

La progression de raid {raid} a précédé {name} dans la mort. Elle a trépassé tranquillement au début du tier, quand la décision a été prise de ne pas s'engager avec le contenu mythique de façon significative. Les boss n'ont pas été notifiés. Ils sont passés à autre chose. Ils sont actuellement farmés par des joueurs qui ne partageaient pas l'engagement de {name} envers {raid}.

En lieu de fleurs, la famille demande aux personnes en deuil de se connecter à WoW, de faire la file pour un donjon Mythique+, et de le compléter. C'était le dernier vœu de {name}, si {name} avait été le type de joueur à avoir de tels vœux.`,
    punchline: "💀 Le buffet funèbre, c'est le LFR. Tu t'y intégrerais parfaitement. Malheureusement.",
  },
];

// ─── Public API ───────────────────────────────────────────────────────────────

export function getFallbackRoast(lang: "fr" | "en", vars: RoastVars): FallbackRoast {
  const pool = lang === "fr" ? FALLBACKS_FR : FALLBACKS_EN;
  // Use character name chars + current time for better entropy
  const nameEntropy = vars.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const idx = (Math.floor(Math.random() * pool.length) + nameEntropy) % pool.length;
  const raw = pool[idx];
  return {
    roastTitle: fill(raw.roastTitle, vars),
    roast:      fill(raw.roast,      vars),
    punchline:  fill(raw.punchline,  vars),
  };
}
