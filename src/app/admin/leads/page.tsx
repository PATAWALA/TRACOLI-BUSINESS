"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import DataTable, { type Column } from "@/components/admin/ui/DataTable";
import { LeadStatusBadge } from "@/components/admin/ui/StatusBadge";
import { supabase } from "@/lib/supabase/client";
import type { Lead, LeadStatus } from "@/types/database.types";

const FILTERS: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "received", label: "Reçu" },
  { value: "researching", label: "Recherche" },
  { value: "quoted", label: "Devis" },
  { value: "validating", label: "Validation" },
  { value: "payment_confirmed", label: "Payé" },
  { value: "purchased", label: "Acheté" },
  { value: "shipping", label: "Expédition" },
  { value: "arrived", label: "Arrivé" },
  { value: "delivered", label: "Livré" },
  { value: "closed", label: "Clôturé" },
];

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      let query = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data } = await query;
      setLeads((data as Lead[]) ?? []);
      setLoading(false);
    }

    load();
  }, [filter]);

  const filtered = search
    ? leads.filter(
        (l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.reference.toLowerCase().includes(search.toLowerCase()) ||
          l.whatsapp.includes(search),
      )
    : leads;

  const columns: Column<Lead>[] = [
    {
      key: "reference",
      label: "Référence",
      render: (row) => (
        <span className="text-[13px] font-bold text-tracoli-600">
          {row.reference}
        </span>
      ),
    },
    {
      key: "name",
      label: "Client",
      render: (row) => (
        <span className="text-[13px] font-semibold text-ink-900">
          {row.name}
        </span>
      ),
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      hideOnMobile: true,
      render: (row) => (
        <span className="text-[13px] text-ink-600">{row.whatsapp}</span>
      ),
    },
    {
      key: "product_name",
      label: "Produit",
      hideOnMobile: true,
      render: (row) => (
        <span className="text-[13px] text-ink-500">
          {row.product_name ?? "—"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Statut",
      render: (row) => <LeadStatusBadge status={row.status as LeadStatus} />,
    },
    {
      key: "created_at",
      label: "Date",
      hideOnMobile: true,
      render: (row) => (
        <span className="text-[13px] text-ink-500">
          {new Date(row.created_at).toLocaleDateString("fr-FR")}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des Leads"
        description="Toutes les demandes entrantes de vos clients."
      />

      {/* Filters bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Rechercher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pr-4 pl-10 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all ${
                filter === f.value
                  ? "bg-tracoli-500 text-white shadow-sm"
                  : "bg-white text-ink-500 ring-1 ring-ink-200 hover:bg-ink-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        emptyMessage="Aucun lead trouvé."
        onRowClick={(row) => router.push(`/admin/leads/${row.id}`)}
      />
    </div>
  );
}
