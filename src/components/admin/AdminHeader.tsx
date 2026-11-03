"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Share2,
} from "lucide-react";
import Avatar from "@/components/admin/ui/Avatar";
import Dropdown from "@/components/admin/ui/Dropdown";
import ShareLinkModal from "@/components/admin/ShareLinkModal";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Tableau de bord",
  "/admin/leads": "Gestion des demandes",
  "/admin/products": "Catalogue produits",
  "/admin/shipping": "Tarifs d'expédition",
  "/admin/payments": "Moyens de paiement",
  "/admin/partners": "Partenaires",
  "/admin/newsletter": "Newsletter",
  "/admin/settings": "Paramètres",
};

interface AdminHeaderProps {
  onMenuClick: () => void;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
  onLogout: () => void;
}

export default function AdminHeader({
  onMenuClick,
  onToggleSidebar,
  sidebarCollapsed,
  onLogout,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [shareOpen, setShareOpen] = useState(false);

  const title =
    PAGE_TITLES[pathname] ??
    (pathname.startsWith("/admin/leads/") ? "Détail demande" : "Gestion");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/admin/leads?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-ink-200 bg-white px-4 lg:px-6">
        {/* Mobile: burger */}
        <button
          onClick={onMenuClick}
          className="grid size-9 place-items-center rounded-lg text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-700 lg:hidden"
          aria-label="Menu"
        >
          <Menu className="size-5" />
        </button>

        {/* Desktop: sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="hidden size-9 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-700 lg:grid"
          aria-label={
            sidebarCollapsed ? "Ouvrir la sidebar" : "Réduire la sidebar"
          }
        >
          {sidebarCollapsed ? (
            <ChevronsRight className="size-[18px]" />
          ) : (
            <ChevronsLeft className="size-[18px]" />
          )}
        </button>

        <div className="hidden h-6 w-px bg-ink-200 lg:block" />

        <h1 className="text-[15px] font-bold text-ink-800 truncate">{title}</h1>

        {/* Center: search + share */}
        <div className="mx-auto hidden items-center gap-2 sm:flex">
          <form onSubmit={handleSearch} className="w-56 lg:w-72">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une demande…"
                className="w-full rounded-xl border border-ink-200 bg-ink-50/60 py-2 pr-4 pl-10 text-[13px] text-ink-900 transition-all placeholder:text-ink-400 focus:border-tracoli-500 focus:bg-white focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
              />
            </div>
          </form>

          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-tracoli-500 px-3.5 py-2 text-[12px] font-bold text-white shadow-sm transition-all hover:bg-tracoli-600 hover:shadow-md"
          >
            <Share2 className="size-3.5" />
            <span className="hidden lg:inline">Partager</span>
          </button>
        </div>

        {/* Right: share mobile + notifications + profile */}
        <div className="ml-auto flex items-center gap-1.5">
          {/* Share button mobile */}
          <button
            onClick={() => setShareOpen(true)}
            className="grid size-9 place-items-center rounded-xl text-tracoli-500 transition-colors hover:bg-tracoli-50 sm:hidden"
            aria-label="Partager le lien"
          >
            <Share2 className="size-[18px]" />
          </button>

          <button className="relative grid size-9 place-items-center rounded-xl text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-600">
            <Bell className="size-[18px]" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-tracoli-500 ring-2 ring-white" />
          </button>

          <div className="mx-1 hidden h-6 w-px bg-ink-200 sm:block" />

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

      <ShareLinkModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
