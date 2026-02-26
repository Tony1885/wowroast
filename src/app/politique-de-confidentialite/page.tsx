import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité / Privacy Policy",
  description: "Privacy policy and data usage for WoWRoast.com",
  robots: { index: true, follow: true },
};

export default async function PolitiqueConfidentialite({
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
          {isFr ? "Politique de Confidentialité" : "Privacy Policy"}
        </h1>
        <p className="text-gray-600 text-sm font-mono mb-10">
          {isFr ? "Dernière mise à jour : février 2026" : "Last updated: February 2026"}
        </p>

        <div className="space-y-8 text-gray-400 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "1. Données collectées" : "1. Data Collected"}
            </h2>
            {isFr ? (
              <>
                <p>WoWRoast.com collecte un minimum de données pour fonctionner :</p>
                <ul className="mt-3 space-y-2 list-disc list-inside">
                  <li><strong className="text-white">Nom du personnage, royaume et région</strong> — saisis volontairement par l&apos;utilisateur, utilisés uniquement pour générer le roast via les APIs tierces.</li>
                  <li><strong className="text-white">Adresse IP</strong> — collectée temporairement pour la limitation de débit (5 requêtes/minute). Non stockée de façon permanente.</li>
                  <li><strong className="text-white">Données de navigation</strong> — collectées anonymement via Vercel Analytics (pages vues, pays d&apos;origine). Aucune donnée personnelle identifiable n&apos;est transmise.</li>
                </ul>
              </>
            ) : (
              <>
                <p>WoWRoast.com collects minimal data to operate:</p>
                <ul className="mt-3 space-y-2 list-disc list-inside">
                  <li><strong className="text-white">Character name, realm and region</strong> — voluntarily entered by the user, used solely to generate the roast via third-party APIs.</li>
                  <li><strong className="text-white">IP address</strong> — temporarily collected for rate limiting (5 requests/minute). Not stored permanently.</li>
                  <li><strong className="text-white">Navigation data</strong> — collected anonymously via Vercel Analytics (page views, country of origin). No personally identifiable data is transmitted.</li>
                </ul>
              </>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "2. Données non collectées" : "2. Data Not Collected"}
            </h2>
            {isFr ? (
              <>
                <p>WoWRoast.com <strong className="text-white">ne collecte pas</strong> :</p>
                <ul className="mt-3 space-y-2 list-disc list-inside">
                  <li>Adresses e-mail ou informations de contact</li>
                  <li>Données de compte Blizzard/Battle.net</li>
                  <li>Informations de paiement</li>
                  <li>Données permettant d&apos;identifier personnellement un utilisateur humain</li>
                </ul>
              </>
            ) : (
              <>
                <p>WoWRoast.com does <strong className="text-white">not collect</strong>:</p>
                <ul className="mt-3 space-y-2 list-disc list-inside">
                  <li>Email addresses or contact information</li>
                  <li>Blizzard/Battle.net account data</li>
                  <li>Payment information</li>
                  <li>Data that personally identifies a human user</li>
                </ul>
              </>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "3. Services tiers" : "3. Third-Party Services"}
            </h2>
            {isFr ? (
              <ul className="space-y-3 list-disc list-inside">
                <li><strong className="text-white">Blizzard Battle.net API</strong> — récupération des données de personnage. <a href="https://www.blizzard.com/fr-fr/legal/a4380ee5-5072-408e-bdb9-4e3b0f2bb8e7/politique-de-confidentialite-de-blizzard-entertainment" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Politique Blizzard →</a></li>
                <li><strong className="text-white">Raider.io API</strong> — données Mythique+ et progression. <a href="https://raider.io/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Politique Raider.io →</a></li>
                <li><strong className="text-white">Warcraft Logs API</strong> — données de parse et logs de combat. <a href="https://www.warcraftlogs.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Politique WCL →</a></li>
                <li><strong className="text-white">Groq API</strong> — génération du texte satirique par intelligence artificielle.</li>
                <li><strong className="text-white">Vercel Analytics</strong> — statistiques de navigation anonymisées. <a href="https://vercel.com/legal/privacy-policy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Politique Vercel →</a></li>
                <li><strong className="text-white">Google AdSense</strong> — publicités contextuelles. Google peut utiliser des cookies à des fins publicitaires. <a href="https://policies.google.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Politique Google →</a></li>
              </ul>
            ) : (
              <ul className="space-y-3 list-disc list-inside">
                <li><strong className="text-white">Blizzard Battle.net API</strong> — character data retrieval. <a href="https://www.blizzard.com/en-us/legal/a4380ee5-5072-408e-bdb9-4e3b0f2bb8e7/blizzard-entertainment-privacy-policy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Blizzard Privacy →</a></li>
                <li><strong className="text-white">Raider.io API</strong> — Mythic+ and progression data. <a href="https://raider.io/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Raider.io Privacy →</a></li>
                <li><strong className="text-white">Warcraft Logs API</strong> — parse and combat log data. <a href="https://www.warcraftlogs.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">WCL Privacy →</a></li>
                <li><strong className="text-white">Groq API</strong> — AI-powered satirical text generation.</li>
                <li><strong className="text-white">Vercel Analytics</strong> — anonymized navigation statistics. <a href="https://vercel.com/legal/privacy-policy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Vercel Privacy →</a></li>
                <li><strong className="text-white">Google AdSense</strong> — contextual advertising. Google may use cookies for advertising purposes. <a href="https://policies.google.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy →</a></li>
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "4. Cookies" : "4. Cookies"}
            </h2>
            {isFr ? (
              <p>Ce site utilise des cookies techniques nécessaires au fonctionnement. Google AdSense peut déposer des cookies publicitaires sur votre navigateur. Vous pouvez les désactiver via les paramètres de votre navigateur ou via <a href="https://adssettings.google.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.</p>
            ) : (
              <p>This site uses technical cookies necessary for its operation. Google AdSense may place advertising cookies in your browser. You can disable them through your browser settings or via <a href="https://adssettings.google.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "5. Vos droits (RGPD)" : "5. Your Rights (GDPR)"}
            </h2>
            {isFr ? (
              <>
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="mt-3 space-y-2 list-disc list-inside">
                  <li>Droit d&apos;accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;)</li>
                  <li>Droit d&apos;opposition au traitement</li>
                </ul>
                <p className="mt-3">Pour exercer ces droits : <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
              </>
            ) : (
              <>
                <p>Under GDPR, you have the following rights:</p>
                <ul className="mt-3 space-y-2 list-disc list-inside">
                  <li>Right of access to your data</li>
                  <li>Right of rectification</li>
                  <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
                  <li>Right to object to processing</li>
                </ul>
                <p className="mt-3">To exercise these rights: <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "6. Conservation des données" : "6. Data Retention"}
            </h2>
            {isFr ? (
              <p>Aucune donnée personnelle identifiable n&apos;est stockée de façon permanente sur nos serveurs. Les adresses IP utilisées pour le rate limiting sont effacées de la mémoire lors du redémarrage des serveurs.</p>
            ) : (
              <p>No personally identifiable data is stored permanently on our servers. IP addresses used for rate limiting are cleared from memory when servers restart.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "7. Contact" : "7. Contact"}
            </h2>
            <p><a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex gap-3 flex-wrap">
          <Link href={`/mentions-legales?lang=${lang ?? "fr"}`}
            className="px-3 py-1 rounded border border-white/[0.08] text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-mono">
            {isFr ? "Mentions légales" : "Legal Notice"}
          </Link>
          <Link href={`/a-propos?lang=${lang ?? "fr"}`}
            className="px-3 py-1 rounded border border-white/[0.08] text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-mono">
            {isFr ? "À propos" : "About"}
          </Link>
        </div>
      </div>
    </div>
  );
}
