"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Plane,
  MapPin,
  Info,
  type LucideIcon,
} from "lucide-react";
import { BOTTOM_NAV_ITEMS } from "@/data/config/navigation";
import { useLocale } from "@/hooks/useLocale";

const ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  search: Search,
  plane: Plane,
  pin: MapPin,
  info: Info,
};

export default function MobileBottomNav() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("home");

  /* ---------- Scroll spy sur la home ---------- */
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname === "/a-propos" ? "about" : "");
      return;
    }

    const sections: { id: string; nav: string }[] = [
      { id: "top", nav: "home" },
      { id: "sourcing", nav: "source" },
      { id: "logistique", nav: "ship" },
      { id: "tracking", nav: "track" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const match = sections.find((s) => s.id === visible.target.id);
        if (match) setActiveSection(match.nav);
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  /* ---------- Helper : item actif ? ---------- */
  const isActive = (id: string): boolean => {
    if (pathname === "/a-propos") return id === "about";
    if (pathname !== "/") return false;
    return activeSection === id;
  };

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-200 bg-white/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const active = isActive(item.id);

          return (
            <li key={item.id} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="group relative flex min-h-[60px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 transition-colors active:scale-[0.96]"
              >
                {/* Indicateur actif (petit trait en haut) */}
                <span
                  className={`absolute top-0 left-1/2 h-[3px] -translate-x-1/2 rounded-b-full bg-tracoli-500 transition-all duration-300 ${
                    active ? "w-8 opacity-100" : "w-0 opacity-0"
                  }`}
                />

                {/* Icône */}
                <span
                  className={`relative grid size-6 place-items-center transition-transform ${
                    active ? "-translate-y-0.5" : ""
                  }`}
                >
                  <Icon
                    className={`size-[22px] transition-colors ${
                      active ? "text-tracoli-500" : "text-ink-400"
                    }`}
                    strokeWidth={active ? 2.4 : 2}
                  />
                </span>

                {/* Label */}
                <span
                  className={`text-[10.5px] font-semibold tracking-tight transition-colors ${
                    active ? "text-tracoli-500" : "text-ink-500"
                  }`}
                >
                  {item.label[locale]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}