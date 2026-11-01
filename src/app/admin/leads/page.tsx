"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Lead, LeadStatus } from "@/types/database.types";

const STATUS_OPTIONS: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "nouveau", label: "Nouveau" },
  { value: "contacte", label: "Contacté" },
  { value: "en_cours", label: "En cours" },
  { value: "gagne", label: "Gagné" },
  { value: "perdu", label: "Perdu" },
];

const STATUS_COLORS: Record<LeadStatus, string> = {
  nouveau: "bg-blue-100 text-blue-700",
  contacte: "bg-amber-100 text-amber-700",
  en_cours: "bg-purple-100 text-purple-700",
  gagne: "bg-emerald-100 text-emerald-700",
  perdu: "bg-ink-100 text-ink-500",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchLeads() {
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

    fetchLeads();
  }, [filter]);

  const filtered = search
    ? leads.filter(
        (l) =>
          l.full_name.toLowerCase().includes(search.toLowerCase()) ||
          l.reference.toLowerCase().includes(search.toLowerCase()) ||
          l.phone.includes(search),
      )
    : leads;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Rechercher un lead…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pr-4 pl-10 text-sm text-ink-900 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="size-4 text-ink-400" />
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setFilter(opt.value);
                setLoading(true);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                filter === opt.value
                  ? "bg-tracoli-500 text-white"
                  : "bg-white text-ink-600 hover:bg-ink-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ink-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/50">
              <th className="px-4 py-3 text-xs font-bold tracking-wider text-ink-500 uppercase">Référence</th>
              <th className="px-4 py-3 text-xs font-bold tracking-wider text-ink-500 uppercase">Nom</th>
              <th className="px-4 py-3 text-xs font-bold tracking-wider text-ink-500 uppercase">Téléphone</th>
              <th className="px-4 py-3 text-xs font-bold tracking-wider text-ink-500 uppercase">Statut</th>
              <th className="px-4 py-3 text-xs font-bold tracking-wider text-ink-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-ink-400">
                  Chargement…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-ink-400">
                  Aucun lead trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-ink-100 transition-colors last:border-0 hover:bg-ink-50/50"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-bold text-tracoli-600 hover:underline"
                    >
                      {lead.reference}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink-900">{lead.full_name}</td>
                  <td className="px-4 py-3 text-ink-600">{lead.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-bold ${STATUS_COLORS[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-500">
                    {new Date(lead.created_at).toLocaleDateString("fr-FR")}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
