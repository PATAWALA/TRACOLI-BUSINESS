"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/leads": "Gestion des Leads",
  "/admin/orders": "Commandes",
  "/admin/partners": "Partenaires",
  "/admin/newsletter": "Newsletter",
  "/admin/settings": "Paramètres",
};

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();

  const title =
    PAGE_TITLES[pathname] ??
    (pathname.startsWith("/admin/leads/") ? "Détail Lead" : "Admin");

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="grid size-9 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-700 lg:hidden"
        >
          <Menu className="size-5" />
        </button>
        <h1 className="text-[15px] font-bold text-ink-800">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative grid size-9 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-600">
          <Bell className="size-[18px]" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-tracoli-500" />
        </button>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="grid size-8 place-items-center rounded-lg bg-tracoli-500 text-[11px] font-bold text-white">
            T
          </div>
          <span className="text-[13px] font-semibold text-ink-700">
            TRACOLI Business
          </span>
        </div>
      </div>
    </header>
  );
}
