import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales / Legal Notice",
  description: "Mentions légales du site WoWRoast.com — Legal Notice for WoWRoast.com",
  robots: { index: true, follow: true },
};

export default async function MentionsLegales({
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
          {isFr ? "Mentions Légales" : "Legal Notice"}
        </h1>
        <p className="text-gray-600 text-sm font-mono mb-10">
          {isFr ? "Dernière mise à jour : février 2026" : "Last updated: February 2026"}
        </p>

        <div className="space-y-8 text-gray-400 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "1. Éditeur du site" : "1. Site Publisher"}
            </h2>
            {isFr ? (
              <>
                <p>Le site <strong className="text-white">WoWRoast.com</strong> est un service en ligne à titre personnel, non commercial dans sa forme actuelle.</p>
                <p className="mt-2">Contact : <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
              </>
            ) : (
              <>
                <p>The website <strong className="text-white">WoWRoast.com</strong> is a personal, non-commercial online service in its current form.</p>
                <p className="mt-2">Contact: <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "2. Hébergement" : "2. Hosting"}
            </h2>
            {isFr ? (
              <p>Ce site est hébergé par : <strong className="text-white">Vercel Inc.</strong><br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              <a href="https://vercel.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
            ) : (
              <p>This site is hosted by: <strong className="text-white">Vercel Inc.</strong><br />
              440 N Barranca Ave #4133, Covina, CA 91723, United States<br />
              <a href="https://vercel.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "3. Propriété intellectuelle" : "3. Intellectual Property"}
            </h2>
            {isFr ? (
              <>
                <p>Le contenu généré par l&apos;IA sur ce site est produit automatiquement à des fins satiriques et humoristiques. Il ne représente pas l&apos;opinion de l&apos;éditeur du site.</p>
                <p className="mt-2">World of Warcraft® est une marque déposée de <strong className="text-white">Blizzard Entertainment, Inc.</strong> Ce site n&apos;est pas affilié, approuvé ou sponsorisé par Blizzard Entertainment.</p>
                <p className="mt-2">Les données de personnages sont récupérées via les APIs publiques de Blizzard, Raider.io et Warcraft Logs.</p>
              </>
            ) : (
              <>
                <p>AI-generated content on this site is produced automatically for satirical and humorous purposes. It does not represent the opinion of the site publisher.</p>
                <p className="mt-2">World of Warcraft® is a registered trademark of <strong className="text-white">Blizzard Entertainment, Inc.</strong> This site is not affiliated with, endorsed by, or sponsored by Blizzard Entertainment.</p>
                <p className="mt-2">Character data is retrieved via the public APIs of Blizzard, Raider.io, and Warcraft Logs.</p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "4. Nature du contenu" : "4. Content Nature"}
            </h2>
            {isFr ? (
              <>
                <p>WoWRoast.com est un site de <strong className="text-white">satire humoristique</strong>. Les roasts générés sont des textes fictifs à vocation comique, basés sur des statistiques de jeu vidéo publiquement accessibles. Ils ne constituent en aucun cas du harcèlement, une attaque personnelle ou un jugement de valeur sur les personnes réelles derrière les personnages.</p>
                <p className="mt-2">Tout contenu jugé offensant peut être signalé à : <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
              </>
            ) : (
              <>
                <p>WoWRoast.com is a <strong className="text-white">satirical humor</strong> website. The generated roasts are fictional comic texts based on publicly available video game statistics. They do not constitute harassment, personal attacks, or value judgments about the real people behind the characters.</p>
                <p className="mt-2">Any content deemed offensive may be reported to: <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "5. Limitation de responsabilité" : "5. Limitation of Liability"}
            </h2>
            {isFr ? (
              <p>L&apos;éditeur ne saurait être tenu responsable des dommages directs ou indirects causés au matériel de l&apos;utilisateur lors de l&apos;accès au site. L&apos;éditeur se réserve le droit de modifier le contenu du site à tout moment et sans préavis.</p>
            ) : (
              <p>The publisher cannot be held liable for any direct or indirect damage caused to the user&apos;s equipment when accessing the site. The publisher reserves the right to modify the site content at any time without prior notice.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">
              {isFr ? "6. Droit applicable" : "6. Applicable Law"}
            </h2>
            {isFr ? (
              <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
            ) : (
              <p>These legal notices are governed by French law. In case of dispute, French courts shall have sole jurisdiction.</p>
            )}
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex gap-3 flex-wrap">
          <Link href={`/politique-de-confidentialite?lang=${lang ?? "fr"}`}
            className="px-3 py-1 rounded border border-white/[0.08] text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-mono">
            {isFr ? "Confidentialité" : "Privacy Policy"}
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
