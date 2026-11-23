// src/app/page.tsx — DOIT rester un Server Component qui importe que des composants
import HomeHero from "@/components/home/HomeHero";
import HomeSteps from "@/components/home/HomeSteps";
import HomeSourcing from "@/components/home/HomeSourcing";
import HomeShipping from "@/components/home/HomeShipping";
import HomeTracking from "@/components/home/HomeTracking";
import HomeGallery from "@/components/home/HomeGallery";
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
          <div className="grid gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
            <HomeSourcing />
            <HomeShipping />
            <HomeTracking />
          </div>
        </div>
      </section>

      <HomeGallery />
      <HomeAboutCTA />
    </main>
  );
}
