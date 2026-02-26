import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité et utilisation des données sur WoWRoast.com",
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen ember-bg px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-400 transition-colors mb-10 text-sm font-mono tracking-wider"
        >
          ← RETOUR
        </Link>

        <h1 className="text-3xl font-black font-cinzel text-white mb-2">Politique de Confidentialité</h1>
        <p className="text-gray-600 text-sm font-mono mb-10">Dernière mise à jour : février 2026</p>

        <div className="space-y-8 text-gray-400 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">1. Données collectées</h2>
            <p>WoWRoast.com collecte un minimum de données pour fonctionner :</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><strong className="text-white">Nom du personnage, royaume et région</strong> — saisis volontairement par l&apos;utilisateur, utilisés uniquement pour générer le roast via les APIs de jeu tierces.</li>
              <li><strong className="text-white">Adresse IP</strong> — collectée temporairement pour la limitation de débit (rate limiting, 5 requêtes/minute). Non stockée de façon permanente.</li>
              <li><strong className="text-white">Données de navigation</strong> — collectées anonymement via Vercel Analytics (pages vues, pays d&apos;origine). Aucune donnée personnelle identifiable n&apos;est transmise.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">2. Données non collectées</h2>
            <p>WoWRoast.com <strong className="text-white">ne collecte pas</strong> :</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Adresses e-mail ou informations de contact</li>
              <li>Données de compte Blizzard/Battle.net</li>
              <li>Informations de paiement</li>
              <li>Données permettant d&apos;identifier personnellement un utilisateur humain</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">3. Services tiers</h2>
            <p>Pour fonctionner, ce site utilise les services suivants :</p>
            <ul className="mt-3 space-y-3 list-disc list-inside">
              <li>
                <strong className="text-white">Blizzard Battle.net API</strong> — récupération des données de personnage.{" "}
                <a href="https://www.blizzard.com/fr-fr/legal/a4380ee5-5072-408e-bdb9-4e3b0f2bb8e7/politique-de-confidentialite-de-blizzard-entertainment" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Politique Blizzard →</a>
              </li>
              <li>
                <strong className="text-white">Raider.io API</strong> — données Mythique+ et progression.{" "}
                <a href="https://raider.io/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Politique Raider.io →</a>
              </li>
              <li>
                <strong className="text-white">Warcraft Logs API</strong> — données de parse et logs de combat.{" "}
                <a href="https://www.warcraftlogs.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Politique WCL →</a>
              </li>
              <li>
                <strong className="text-white">Groq API</strong> — génération du texte satirique par intelligence artificielle.
              </li>
              <li>
                <strong className="text-white">Vercel Analytics</strong> — statistiques de navigation anonymisées.{" "}
                <a href="https://vercel.com/legal/privacy-policy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Politique Vercel →</a>
              </li>
              <li>
                <strong className="text-white">Google AdSense</strong> — publicités contextuelles. Google peut utiliser des cookies à des fins publicitaires.{" "}
                <a href="https://policies.google.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Politique Google →</a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">4. Cookies</h2>
            <p>Ce site utilise des cookies techniques nécessaires au fonctionnement (langue, préférences). Google AdSense peut déposer des cookies publicitaires sur votre navigateur. Vous pouvez les désactiver via les paramètres de votre navigateur ou via <a href="https://adssettings.google.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">5. Vos droits (RGPD)</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement ("droit à l&apos;oubli")</li>
              <li>Droit d&apos;opposition au traitement</li>
            </ul>
            <p className="mt-3">Pour exercer ces droits : <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">6. Conservation des données</h2>
            <p>Aucune donnée personnelle identifiable n&apos;est stockée de façon permanente sur nos serveurs. Les adresses IP utilisées pour le rate limiting sont effacées de la mémoire lors du redémarrage des serveurs.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">7. Contact</h2>
            <p>Pour toute question relative à cette politique : <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex gap-6 text-sm font-mono text-gray-700">
          <Link href="/mentions-legales" className="hover:text-blue-400 transition-colors">Mentions légales</Link>
          <Link href="/a-propos" className="hover:text-blue-400 transition-colors">À propos</Link>
        </div>
      </div>
    </div>
  );
}
