import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PageHeroProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Photo affichée à droite à partir de lg (rien sur mobile, pour rester léger). */
  image?: { src: string; alt: string; blend?: boolean };
};

export default function PageHero({
  title,
  description,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  image,
}: PageHeroProps) {
  return (
    <section className="border-b border-ink-200 bg-white py-12 sm:py-16 lg:py-20">
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          image ? "grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]" : ""
        }`}
      >
        <div className={image ? "" : "max-w-3xl"}>
          <h1 className="text-4xl leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-700 lg:text-lg">
            {description}
          </p>

          {(ctaLabel || secondaryLabel) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {ctaLabel && ctaHref && (
                <a
                  href={ctaHref}
                  className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-tracoli-500 px-8 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-red)] transition-colors duration-200 hover:bg-tracoli-600 active:scale-[0.98]"
                >
                  {ctaLabel}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              )}
              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className="inline-flex min-h-[56px] items-center justify-center rounded-2xl border-2 border-ink-200 bg-white px-8 py-4 text-[15px] font-bold text-ink-800 transition-colors duration-200 hover:border-tracoli-300 active:scale-[0.98]"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          )}
        </div>

        {image && (
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl bg-tracoli-50 lg:block">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="40vw"
              className={`object-cover ${image.blend ? "mix-blend-multiply" : ""}`}
            />
          </div>
        )}
      </div>
    </section>
  );
}
