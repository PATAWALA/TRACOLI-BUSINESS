// src/app/page.tsx — DOIT rester un Server Component qui importe que des composants
import HomeHero from "@/components/home/HomeHero";
import HomeActions from "@/components/home/HomeActions";
import HomeWhatWeDo from "@/components/home/HomeWhatWeDo";
import HomeResources from "@/components/home/HomeResources";
import HomeAbout from "@/components/home/HomeAbout";
import HomeCTA from "@/components/home/HomeCTA";

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip">
      <HomeHero />
      <HomeActions />
      <HomeWhatWeDo />
      <HomeResources />
      <HomeAbout />
      <HomeCTA />
    </main>
  );
}