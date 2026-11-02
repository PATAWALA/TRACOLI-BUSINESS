"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Bell, User, Settings, LogOut } from "lucide-react";
import Avatar from "@/components/admin/ui/Avatar";
import Dropdown from "@/components/admin/ui/Dropdown";

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
  onLogout: () => void;
}

export default function AdminHeader({
  onMenuClick,
  onLogout,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const title =
    PAGE_TITLES[pathname] ??
    (pathname.startsWith("/admin/leads/") ? "Détail Lead" : "Admin");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/admin/leads?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-ink-200 bg-white px-4 lg:px-6">
      {/* Left: burger + title */}
      <button
        onClick={onMenuClick}
        className="grid size-9 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-700 lg:hidden"
      >
        <Menu className="size-5" />
      </button>
      <h1 className="hidden text-[15px] font-bold text-ink-800 sm:block">
        {title}
      </h1>

      {/* Center: search */}
      <form
        onSubmit={handleSearch}
        className="mx-auto hidden max-w-xs flex-1 sm:block lg:max-w-sm"
      >
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un lead…"
            className="w-full rounded-xl border border-ink-200 bg-ink-50/60 py-2 pr-4 pl-10 text-[13px] text-ink-900 transition-all placeholder:text-ink-400 focus:border-tracoli-500 focus:bg-white focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
          />
        </div>
      </form>

      {/* Right: notifications + profile */}
      <div className="ml-auto flex items-center gap-2">
        <button className="relative grid size-9 place-items-center rounded-xl text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-600">
          <Bell className="size-[18px]" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-tracoli-500 ring-2 ring-white" />
        </button>

        <Dropdown
          trigger={
            <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-ink-50">
              <Avatar name="TRACOLI Business" size="sm" />
              <div className="hidden text-left lg:block">
                <p className="text-[12px] font-semibold leading-tight text-ink-800">
                  TRACOLI Business
                </p>
                <p className="text-[10px] text-ink-400">Administrateur</p>
              </div>
            </div>
          }
          items={[
            {
              label: "Mon profil",
              icon: User,
              onClick: () => router.push("/admin/settings"),
            },
            {
              label: "Paramètres",
              icon: Settings,
              onClick: () => router.push("/admin/settings"),
            },
            {
              label: "Déconnexion",
              icon: LogOut,
              onClick: onLogout,
              danger: true,
            },
          ]}
        />
      </div>
    </header>
  );
}
