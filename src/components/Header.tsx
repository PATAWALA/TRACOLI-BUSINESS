"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/data/config/navigation";
import { CONTACT } from "@/data/config/contact";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/demande")) return null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-200 bg-white/95 backdrop-blur-xl"
          : "border-b border-transparent bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:h-16 sm:px-6 lg:h-20 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2 sm:gap-3"
          aria-label={CONTACT.brandFull}
        >
          <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-ink-200 bg-white shadow-sm transition-all group-hover:border-tracoli-500/40 sm:size-10 lg:size-11 lg:rounded-xl">
            <Image
              src="/logo.jpg"
              alt={`Logo ${CONTACT.brand}`}
              width={88}
              height={88}
              priority
              className="size-full object-cover"
            />
          </span>
          <span className="hidden truncate text-[13px] font-extrabold tracking-tight text-tracoli-500 sm:block sm:text-[14px]">
            TRACOLI BUSINESS
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/demande"
            className="rounded-xl bg-tracoli-500 px-4 py-2.5 text-[13px] font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 active:scale-[0.98]"
          >
            Passer commande
          </Link>
        </div>
      </div>
    </header>
  );
}
