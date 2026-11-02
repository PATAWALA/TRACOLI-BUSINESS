"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Package, Settings } from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/orders", label: "Commandes", icon: Package },
  { href: "/admin/settings", label: "Plus", icon: Settings },
] as const;

export default function AdminBottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-stretch border-t border-ink-200 bg-white/95 backdrop-blur-xl lg:hidden">
      {ITEMS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors ${
              active ? "text-tracoli-500" : "text-ink-400"
            }`}
          >
            <item.icon className={`size-5 ${active ? "text-tracoli-500" : ""}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
