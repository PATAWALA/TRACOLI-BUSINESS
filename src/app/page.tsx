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
      <HomeSourcing />
      <HomeShipping />
      <HomeTracking />
      <HomeProof />
      <HomeAboutCTA />
    </main>
  );
}
