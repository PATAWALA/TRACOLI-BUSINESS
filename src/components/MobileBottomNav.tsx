"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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

function getActiveFromPath(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/sourcer")) return "source";
  if (pathname.startsWith("/expedier")) return "ship";
  if (pathname.startsWith("/suivre")) return "track";
  if (pathname.startsWith("/a-propos")) return "about";
  if (pathname.startsWith("/services/")) return "source";
  if (pathname.startsWith("/ressources")) return "about";
  return "";
}

export default function MobileBottomNav() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const activeId = getActiveFromPath(pathname);

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-200 bg-white/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const active = activeId === item.id;

          return (
            <li key={item.id} className="relative flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="group relative z-10 flex min-h-[60px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 transition-transform active:scale-[0.94]"
              >
                {/* Bulle de fond avec layoutId (glisse entre onglets) */}
                {active && (
                  <motion.span
                    layoutId="bottomNavActive"
                    className="absolute inset-x-1 inset-y-1 -z-10 rounded-xl bg-tracoli-50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    aria-hidden
                  />
                )}

                {/* Trait supérieur */}
                <span
                  className={`absolute top-0 left-1/2 h-[3px] -translate-x-1/2 rounded-b-full bg-tracoli-500 transition-all duration-300 ${
                    active ? "w-8 opacity-100" : "w-0 opacity-0"
                  }`}
                />

                {/* Icône */}
                <span
                  className={`relative grid size-6 place-items-center transition-transform duration-300 ${
                    active ? "-translate-y-0.5 scale-110" : ""
                  }`}
                >
                  <Icon
                    className={`size-[22px] transition-colors duration-300 ${
                      active ? "text-tracoli-500" : "text-ink-400"
                    }`}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </span>

                {/* Label */}
                <span
                  className={`relative text-[10.5px] font-semibold tracking-tight transition-colors duration-300 ${
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