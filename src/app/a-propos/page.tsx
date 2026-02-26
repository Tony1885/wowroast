import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À Propos",
  description: "WoWRoast.com — l'IA qui roaste tes stats World of Warcraft sans pitié.",
  robots: { index: true, follow: true },
};

export default function APropos() {
  return (
    <div className="min-h-screen ember-bg px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-400 transition-colors mb-10 text-sm font-mono tracking-wider"
        >
          ← RETOUR
        </Link>

        <h1 className="text-3xl font-black font-cinzel text-white mb-2">À Propos</h1>
        <p className="text-gray-600 text-sm font-mono mb-10">WoWRoast.com</p>

        <div className="space-y-8 text-gray-400 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">C&apos;est quoi WoWRoast ?</h2>
            <p>
              <strong className="text-white">WoWRoast.com</strong> est un générateur de satire humoristique pour joueurs de World of Warcraft. Entre le nom de ton personnage, ton royaume et ta région — l&apos;IA analyse tes statistiques de jeu (niveau d&apos;objet, score Mythique+, progression de raid) et génère un texte comique et mordant basé sur tes vraies données.
            </p>
            <p className="mt-3">
              C&apos;est de la satire. C&apos;est fait pour rire. Si tes stats sont catastrophiques, c&apos;est encore mieux.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">Comment ça marche ?</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>Tes stats sont récupérées via les APIs publiques de <strong className="text-white">Blizzard</strong>, <strong className="text-white">Raider.io</strong> et <strong className="text-white">Warcraft Logs</strong></li>
              <li>Un modèle d&apos;IA génère un texte satirique unique basé sur ces données</li>
              <li>Le résultat est affiché immédiatement — aucune donnée n&apos;est stockée de façon permanente</li>
              <li>Chaque roast est différent grâce à des angles d&apos;humour variés (commentateur sportif, chef cuisinier, philosophe antique...)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">C&apos;est gratuit ?</h2>
            <p>Oui, entièrement gratuit. Le site est limité à 5 requêtes par minute par adresse IP pour éviter les abus.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">Est-ce affilié à Blizzard ?</h2>
            <p>
              Non. WoWRoast.com est un projet indépendant, non officiel, non affilié et non approuvé par <strong className="text-white">Blizzard Entertainment</strong>. World of Warcraft® est une marque déposée de Blizzard Entertainment, Inc.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">Mon roast est offensant / inexact</h2>
            <p>
              Le contenu est généré automatiquement par une IA et peut parfois être imprécis ou maladroit. Si tu estimes qu&apos;un roast dépasse les limites de la satire acceptable, contacte-nous à{" "}
              <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">Contact</h2>
            <p>
              Pour toute question, signalement ou suggestion :{" "}
              <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a>
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex gap-6 text-sm font-mono text-gray-700">
          <Link href="/mentions-legales" className="hover:text-blue-400 transition-colors">Mentions légales</Link>
          <Link href="/politique-de-confidentialite" className="hover:text-blue-400 transition-colors">Politique de confidentialité</Link>
        </div>
      </div>
    </div>
  );
}
