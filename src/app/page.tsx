// src/app/page.tsx — DOIT rester un Server Component qui importe que des composants
import HomeHero from "@/components/home/HomeHero";
import HomeSteps from "@/components/home/HomeSteps";
import HomeSourcing from "@/components/home/HomeSourcing";
import HomeShipping from "@/components/home/HomeShipping";
import HomeTracking from "@/components/home/HomeTracking";
import HomeProof from "@/components/home/HomeProof";
import HomeAboutCTA from "@/components/home/HomeAboutCTA";

export const metadata = {
  alternates: { canonical: "https://www.tracolibusiness.com" },
};

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip">
      <HomeHero />
      <HomeSteps />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            Un seul interlocuteur, de la Chine jusqu&apos;à votre porte.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
            Recherche des fournisseurs, achat sécurisé, transport et livraison :
            la même équipe s&apos;occupe de tout.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
            <HomeSourcing />
            <HomeShipping />
            <HomeTracking />
          </div>
        </div>
      </section>

      <HomeProof />
      <HomeAboutCTA />
    </main>
  );
}
