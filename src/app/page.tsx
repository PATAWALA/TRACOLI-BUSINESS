// src/app/page.tsx — DOIT rester un Server Component qui importe que des composants
import HomeHero from "@/components/home/HomeHero";
import HomeSourcing from "@/components/home/HomeSourcing";
import HomeShipping from "@/components/home/HomeShipping";
import HomeTracking from "@/components/home/HomeTracking";
import HomeAboutCTA from "@/components/home/HomeAboutCTA";

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip">
      <HomeHero />
      <HomeSourcing />
      <HomeShipping />
      <HomeTracking />
      <HomeAboutCTA />
    </main>
  );
}
