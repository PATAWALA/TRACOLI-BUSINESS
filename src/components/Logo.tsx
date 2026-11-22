import Link from "next/link";

type Tone = "light" | "dark";

/** Icône TRACOLI : tuile rouge arrondie + flèche blanche en « T » (SVG pur, net à toutes les tailles). */
export function LogoMark({
  className = "size-11",
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="40 40 320 320"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id="tracoli-tile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff1a1a" />
          <stop offset="1" stopColor="#c40000" />
        </linearGradient>
      </defs>
      <rect x="40" y="40" width="320" height="320" rx="72" fill="url(#tracoli-tile)" />
      <path
        fill="#fff"
        stroke="#fff"
        strokeWidth="6"
        strokeLinejoin="round"
        d="M72 180 L224 110 L219 70 L326 94 L284 192 L266 166 L286 332 L200 202 L110 240 Z"      />
    </svg>
  );
}

/**
 * Logo complet : icône + « TRACOLI » + « SUPPLY CHAIN ».
 * tone="light" pour fond clair, tone="dark" pour fond sombre.
 */
export default function Logo({
  tone = "light",
  href = "/",
  size = "lg",
}: {
  tone?: Tone;
  href?: string | null;
  size?: "md" | "lg";
}) {
  const big = size === "lg";
  const word = tone === "light" ? "text-ink-900" : "text-white";
  const sub = tone === "light" ? "text-ink-500" : "text-white/70";
  const rule = tone === "light" ? "bg-tracoli-500" : "bg-white/50";

  const content = (
    <span className="group flex items-center gap-2.5 sm:gap-3.5">
      <LogoMark
        className={
          big
            ? "size-12 shrink-0 drop-shadow-[0_8px_16px_rgba(230,0,0,0.35)] transition-transform duration-300 group-hover:scale-105 sm:size-14 lg:size-16"
            : "size-10 shrink-0 drop-shadow-[0_6px_12px_rgba(230,0,0,0.3)]"
        }
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-black tracking-[-0.04em] ${word} ${
            big ? "text-[26px] sm:text-[30px] lg:text-[36px]" : "text-[22px]"
          }`}
        >
          TRACOLI
        </span>
        <span className="mt-1.5 flex items-center gap-1.5 sm:gap-2">
          <span className={`h-[2px] w-3 rounded-full sm:w-4 ${rule}`} />
          <span
            className={`font-semibold uppercase ${sub} ${
              big
                ? "text-[8.5px] tracking-[0.2em] sm:text-[9.5px] sm:tracking-[0.26em] lg:text-[10.5px]"
                : "text-[8.5px] tracking-[0.22em]"
            }`}
          >
            Supply Chain
          </span>
          <span className={`h-[2px] w-3 rounded-full sm:w-4 ${rule}`} />
        </span>
      </span>
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="TRACOLI Supply Chain — Accueil" className="min-w-0">
      {content}
    </Link>
  );
}
