import type { LeadStatus, OrderStatus } from "@/types/database.types";

const LEAD_COLORS: Record<LeadStatus, string> = {
  nouveau: "bg-blue-50 text-blue-700 ring-blue-600/20",
  contacte: "bg-amber-50 text-amber-700 ring-amber-600/20",
  en_cours: "bg-purple-50 text-purple-700 ring-purple-600/20",
  gagne: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  perdu: "bg-ink-50 text-ink-500 ring-ink-500/20",
};

const LEAD_LABELS: Record<LeadStatus, string> = {
  nouveau: "Nouveau",
  contacte: "Contacté",
  en_cours: "En cours",
  gagne: "Gagné",
  perdu: "Perdu",
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
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${LEAD_COLORS[status]}`}
    >
      {LEAD_LABELS[status]}
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
