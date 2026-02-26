import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À Propos / About",
  description: "WoWRoast.com — the AI that roasts your World of Warcraft stats without mercy.",
  robots: { index: true, follow: true },
};

export default async function APropos({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const isFr = lang !== "en";

  return (
    <div className="min-h-screen ember-bg px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/?lang=${lang ?? "fr"}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-400 transition-colors mb-10 text-sm font-mono tracking-wider"
        >
          ← {isFr ? "RETOUR" : "BACK"}
        </Link>

        <h1 className="text-3xl font-black font-cinzel text-white mb-2">
          {isFr ? "À Propos" : "About"}
        </h1>
        <p className="text-gray-600 text-sm font-mono mb-10">WoWRoast.com</p>

        <div className="space-y-8 text-gray-400 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "C'est quoi WoWRoast ?" : "What is WoWRoast?"}
            </h2>
            {isFr ? (
              <>
                <p><strong className="text-white">WoWRoast.com</strong> est un générateur de satire humoristique pour joueurs de World of Warcraft. Entre le nom de ton personnage, ton royaume et ta région — l&apos;IA analyse tes statistiques de jeu (niveau d&apos;objet, score Mythique+, progression de raid) et génère un texte comique et mordant basé sur tes vraies données.</p>
                <p className="mt-3">C&apos;est de la satire. C&apos;est fait pour rire. Si tes stats sont catastrophiques, c&apos;est encore mieux.</p>
              </>
            ) : (
              <>
                <p><strong className="text-white">WoWRoast.com</strong> is an AI-powered satirical roast generator for World of Warcraft players. Enter your character name, realm and region — the AI analyzes your in-game stats (item level, Mythic+ score, raid progression) and generates a sharp, comic text based on your real data.</p>
                <p className="mt-3">It&apos;s satire. It&apos;s meant to be funny. If your stats are catastrophic, even better.</p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "Comment ça marche ?" : "How does it work?"}
            </h2>
            {isFr ? (
              <ul className="space-y-3 list-disc list-inside">
                <li>Tes stats sont récupérées via les APIs publiques de <strong className="text-white">Blizzard</strong>, <strong className="text-white">Raider.io</strong> et <strong className="text-white">Warcraft Logs</strong></li>
                <li>Un modèle d&apos;IA génère un texte satirique unique basé sur ces données</li>
                <li>Le résultat est affiché immédiatement — aucune donnée n&apos;est stockée de façon permanente</li>
                <li>Chaque roast est différent grâce à des angles d&apos;humour variés (commentateur sportif, chef cuisinier, philosophe antique...)</li>
              </ul>
            ) : (
              <ul className="space-y-3 list-disc list-inside">
                <li>Your stats are retrieved via the public APIs of <strong className="text-white">Blizzard</strong>, <strong className="text-white">Raider.io</strong> and <strong className="text-white">Warcraft Logs</strong></li>
                <li>An AI model generates a unique satirical text based on that data</li>
                <li>The result is displayed immediately — no data is stored permanently</li>
                <li>Every roast is different thanks to varied humor angles (sports commentator, chef, ancient philosopher...)</li>
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "C'est gratuit ?" : "Is it free?"}
            </h2>
            {isFr ? (
              <p>Oui, entièrement gratuit. Le site est limité à 5 requêtes par minute par adresse IP pour éviter les abus.</p>
            ) : (
              <p>Yes, completely free. The site is limited to 5 requests per minute per IP address to prevent abuse.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "Est-ce affilié à Blizzard ?" : "Is this affiliated with Blizzard?"}
            </h2>
            {isFr ? (
              <p>Non. WoWRoast.com est un projet indépendant, non officiel, non affilié et non approuvé par <strong className="text-white">Blizzard Entertainment</strong>. World of Warcraft® est une marque déposée de Blizzard Entertainment, Inc.</p>
            ) : (
              <p>No. WoWRoast.com is an independent, unofficial, fan-made project. It is not affiliated with, endorsed by, or approved by <strong className="text-white">Blizzard Entertainment</strong>. World of Warcraft® is a registered trademark of Blizzard Entertainment, Inc.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "Mon roast est offensant / inexact" : "My roast is offensive / inaccurate"}
            </h2>
            {isFr ? (
              <p>Le contenu est généré automatiquement par une IA et peut parfois être imprécis ou maladroit. Si tu estimes qu&apos;un roast dépasse les limites de la satire acceptable, contacte-nous à <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a>.</p>
            ) : (
              <p>Content is automatically generated by an AI and may sometimes be inaccurate or clumsy. If you feel a roast crosses the line of acceptable satire, contact us at <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a>.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">Contact</h2>
            <p><a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex gap-3 flex-wrap">
          <Link href={`/mentions-legales?lang=${lang ?? "fr"}`}
            className="px-3 py-1 rounded border border-white/[0.08] text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-mono">
            {isFr ? "Mentions légales" : "Legal Notice"}
          </Link>
          <Link href={`/politique-de-confidentialite?lang=${lang ?? "fr"}`}
            className="px-3 py-1 rounded border border-white/[0.08] text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-mono">
            {isFr ? "Confidentialité" : "Privacy Policy"}
          </Link>
        </div>
      </div>
    </div>
  );
}
