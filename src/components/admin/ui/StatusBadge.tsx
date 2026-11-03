import type { LeadStatus, OrderStatus } from "@/types/database.types";

const LEAD_COLORS: Record<LeadStatus, string> = {
  en_attente_paiement: "bg-amber-50 text-amber-700 ring-amber-600/20",
  paiement_soumis: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
  confirme: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  recherche: "bg-blue-50 text-blue-700 ring-blue-600/20",
  devis: "bg-purple-50 text-purple-700 ring-purple-600/20",
  achat: "bg-teal-50 text-teal-700 ring-teal-600/20",
  expedition: "bg-cyan-50 text-cyan-700 ring-cyan-600/20",
  en_transit: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  douane: "bg-orange-50 text-orange-700 ring-orange-600/20",
  livre: "bg-green-50 text-green-700 ring-green-600/20",
  cloture: "bg-ink-50 text-ink-500 ring-ink-500/20",
};

const LEAD_LABELS: Record<LeadStatus, string> = {
  en_attente_paiement: "En attente de paiement",
  paiement_soumis: "Paiement soumis",
  confirme: "Confirmé",
  recherche: "Recherche fournisseur",
  devis: "Devis envoyé",
  achat: "Achat effectué",
  expedition: "Expédition",
  en_transit: "En transit",
  douane: "Dédouanement",
  livre: "Livré",
  cloture: "Clôturé",
};

const ORDER_COLORS: Record<OrderStatus, string> = {
  en_attente: "bg-ink-50 text-ink-600 ring-ink-500/20",
  confirme: "bg-blue-50 text-blue-700 ring-blue-600/20",
  en_production: "bg-amber-50 text-amber-700 ring-amber-600/20",
  expedie: "bg-cyan-50 text-cyan-700 ring-cyan-600/20",
  en_transit: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  dedouanement: "bg-purple-50 text-purple-700 ring-purple-600/20",
  livre: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

const ORDER_LABELS: Record<OrderStatus, string> = {
  en_attente: "En attente",
  confirme: "Confirmé",
  en_production: "Production",
  expedie: "Expédié",
  en_transit: "En transit",
  dedouanement: "Douane",
  livre: "Livré",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${LEAD_COLORS[status] ?? "bg-ink-50 text-ink-500 ring-ink-500/20"}`}
    >
      {LEAD_LABELS[status] ?? status}
    </span>
  );
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${ORDER_COLORS[status]}`}
    >
      {ORDER_LABELS[status]}
    </span>
  );
}
