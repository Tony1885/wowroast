import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site WoWRoast.com",
  robots: { index: true, follow: true },
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen ember-bg px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-400 transition-colors mb-10 text-sm font-mono tracking-wider"
        >
          ← RETOUR
        </Link>

        <h1 className="text-3xl font-black font-cinzel text-white mb-2">Mentions Légales</h1>
        <p className="text-gray-600 text-sm font-mono mb-10">Dernière mise à jour : février 2026</p>

        <div className="space-y-8 text-gray-400 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">1. Éditeur du site</h2>
            <p>Le site <strong className="text-white">WoWRoast.com</strong> est un service en ligne à titre personnel, non commercial dans sa forme actuelle.</p>
            <p className="mt-2">Contact : <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">2. Hébergement</h2>
            <p>Ce site est hébergé par :</p>
            <p className="mt-2"><strong className="text-white">Vercel Inc.</strong><br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
            <a href="https://vercel.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">3. Propriété intellectuelle</h2>
            <p>Le contenu généré par l&apos;IA sur ce site est produit automatiquement à des fins satiriques et humoristiques. Il ne représente pas l&apos;opinion de l&apos;éditeur du site.</p>
            <p className="mt-2">World of Warcraft® est une marque déposée de <strong className="text-white">Blizzard Entertainment, Inc.</strong> Ce site n&apos;est pas affilié, approuvé ou sponsorisé par Blizzard Entertainment.</p>
            <p className="mt-2">Les données de personnages sont récupérées via les APIs publiques de Blizzard, Raider.io et Warcraft Logs.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">4. Nature du contenu</h2>
            <p>WoWRoast.com est un site de <strong className="text-white">satire humoristique</strong>. Les roasts générés sont des textes fictifs à vocation comique, basés sur des statistiques de jeu vidéo publiquement accessibles. Ils ne constituent en aucun cas du harcèlement, une attaque personnelle ou un jugement de valeur sur les personnes réelles derrière les personnages.</p>
            <p className="mt-2">Tout contenu jugé offensant peut être signalé à : <a href="mailto:contact@wowroast.com" className="text-blue-400 hover:underline">contact@wowroast.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">5. Limitation de responsabilité</h2>
            <p>L&apos;éditeur ne saurait être tenu responsable des dommages directs ou indirects causés au matériel de l&apos;utilisateur lors de l&apos;accès au site. L&apos;éditeur se réserve le droit de modifier le contenu du site à tout moment et sans préavis.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 font-cinzel">6. Droit applicable</h2>
            <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex gap-6 text-sm font-mono text-gray-700">
          <Link href="/politique-de-confidentialite" className="hover:text-blue-400 transition-colors">Politique de confidentialité</Link>
          <Link href="/a-propos" className="hover:text-blue-400 transition-colors">À propos</Link>
        </div>
      </div>
    </div>
  );
}
