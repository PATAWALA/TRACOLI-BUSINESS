import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceCards from "@/components/ServiceCards";
import SimulatorSection from "@/components/SimulatorSection";
import ProcessSection from "@/components/ProcessSection";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="relative overflow-x-clip">
        <HeroSection />
        <ServiceCards />
        <SimulatorSection />
        <ProcessSection />
        <QuoteForm />

        {/* ---------- Bandeau CTA final ---------- */}
        <section className="relative px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-gold-500/20 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 px-6 py-14 text-center sm:px-12 lg:py-16">
              <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[520px] -translate-x-1/2 rounded-full bg-gold-600/15 blur-[110px]" />
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

              <div className="relative">
                <h2 className="text-2xl font-extrabold tracking-tight text-white text-balance sm:text-3xl lg:text-4xl">
                  Prêt à importer sans stress depuis la Chine ?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-slate-400">
                  Obtenez votre cotation personnalisée en moins de 2 heures. Notre équipe vous
                  accompagne de l&apos;usine jusqu&apos;à Kinshasa, Goma ou Bujumbura.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="#devis"
                    className="rounded-xl bg-gradient-to-b from-gold-500 to-gold-600 px-7 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-gold-600/25 transition-all hover:shadow-glow-gold hover:brightness-110 active:scale-[0.98]"
                  >
                    Obtenir mon devis gratuit
                  </a>
                  <a
                    href="#simulateur"
                    className="rounded-xl border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/30 hover:bg-white/[0.07] active:scale-[0.98]"
                  >
                    Estimer mon fret
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}