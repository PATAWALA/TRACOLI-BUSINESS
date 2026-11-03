"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Plus,
  X,
  Copy,
  Check,
  RefreshCw,
  Search,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/admin/ui/PageHeader";
import { OrderStatusBadge } from "@/components/admin/ui/StatusBadge";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import type { Order, OrderStatus } from "@/types/database.types";

const STATUS_FLOW: { value: OrderStatus; label: string }[] = [
  { value: "en_attente", label: "En attente" },
  { value: "confirme", label: "Confirmé" },
  { value: "en_production", label: "Production" },
  { value: "expedie", label: "Expédié" },
  { value: "en_transit", label: "En transit" },
  { value: "dedouanement", label: "Douane" },
  { value: "livre", label: "Livré" },
];

interface NewOrderForm {
  description: string;
  quantity: string;
  unit_price: string;
  total_price: string;
  currency: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // New order modal
  const [showNew, setShowNew] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newForm, setNewForm] = useState<NewOrderForm>({
    description: "",
    quantity: "",
    unit_price: "",
    total_price: "",
    currency: "USD",
  });
  const [createError, setCreateError] = useState("");

  // Status change confirm
  const [statusChange, setStatusChange] = useState<{
    orderId: string;
    orderRef: string;
    newStatus: OrderStatus;
    label: string;
  } | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    const res = await fetch("/api/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders ?? []);
    }
    setLoading(false);
  }

  async function confirmStatusChange() {
    if (!statusChange) return;
    setUpdating(statusChange.orderId);
    await fetch(`/api/orders/${statusChange.orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: statusChange.newStatus }),
    });
    setOrders((prev) =>
      prev.map((o) =>
        o.id === statusChange.orderId
          ? { ...o, status: statusChange.newStatus }
          : o,
      ),
    );
    setUpdating(null);
    setStatusChange(null);
  }

  async function createOrder(e: React.FormEvent) {
    e.preventDefault();
    setCreateError("");
    setCreating(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: newForm.description,
        quantity: newForm.quantity ? Number(newForm.quantity) : undefined,
        unit_price: newForm.unit_price ? Number(newForm.unit_price) : undefined,
        total_price: newForm.total_price
          ? Number(newForm.total_price)
          : undefined,
        currency: newForm.currency,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setCreateError(data.error ?? "Erreur lors de la création.");
      setCreating(false);
      return;
    }

    const order = await res.json();
    setOrders((prev) => [order, ...prev]);
    setShowNew(false);
    setCreating(false);
    setNewForm({
      description: "",
      quantity: "",
      unit_price: "",
      total_price: "",
      currency: "USD",
    });
  }

  function copyRef(ref: string) {
    navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 1500);
  }

  const filtered = search
    ? orders.filter(
        (o) =>
          o.reference.toLowerCase().includes(search.toLowerCase()) ||
          o.description?.toLowerCase().includes(search.toLowerCase()),
      )
    : orders;

  return (
    <div className="space-y-6">
      {/* Status change confirm */}
      <ConfirmModal
        open={!!statusChange}
        title="Changer le statut ?"
        message={
          statusChange
            ? `Passer la commande ${statusChange.orderRef} au statut « ${statusChange.label} » ?`
            : ""
        }
        confirmLabel="Confirmer"
        variant="warning"
        loading={updating === statusChange?.orderId}
        onConfirm={confirmStatusChange}
        onCancel={() => setStatusChange(null)}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Commandes"
          description={`${orders.length} commande${orders.length > 1 ? "s" : ""} au total`}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={loadOrders}
            className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-bold text-ink-600 transition-all hover:bg-ink-50"
          >
            <RefreshCw className="size-4" />
            Actualiser
          </button>
          <button
            onClick={() => setShowNew(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-tracoli-600"
          >
            <Plus className="size-4" />
            Nouvelle commande
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" />
        <input
          type="text"
          placeholder="Rechercher une commande…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pr-4 pl-10 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
        />
      </div>

      {/* New order modal */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
              onClick={() => setShowNew(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-2xl border border-ink-200 bg-white p-6 shadow-card-lg"
            >
              <button
                onClick={() => setShowNew(false)}
                className="absolute top-4 right-4 grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600"
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500">
                  <Package className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink-900">
                    Nouvelle commande
                  </h3>
                  <p className="text-sm text-ink-500">
                    Le code sera généré automatiquement
                  </p>
                </div>
              </div>

              <form onSubmit={createOrder} className="mt-6 space-y-4">
                {createError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {createError}
                  </div>
                )}

                <div>
                  <label className="text-sm font-bold text-ink-700">
                    Description
                  </label>
                  <input
                    type="text"
                    required
                    value={newForm.description}
                    onChange={(e) =>
                      setNewForm({ ...newForm, description: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                    placeholder="Ex: 500 paires chaussures Nike Air"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-bold text-ink-700">
                      Quantité
                    </label>
                    <input
                      type="number"
                      value={newForm.quantity}
                      onChange={(e) =>
                        setNewForm({ ...newForm, quantity: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-ink-700">
                      Prix unitaire
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newForm.unit_price}
                      onChange={(e) =>
                        setNewForm({ ...newForm, unit_price: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                      placeholder="12.50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-bold text-ink-700">
                      Prix total
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newForm.total_price}
                      onChange={(e) =>
                        setNewForm({ ...newForm, total_price: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                      placeholder="6250.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-ink-700">
                      Devise
                    </label>
                    <select
                      value={newForm.currency}
                      onChange={(e) =>
                        setNewForm({ ...newForm, currency: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="CNY">CNY (¥)</option>
                      <option value="BIF">BIF</option>
                      <option value="CDF">CDF</option>
                      <option value="XOF">XOF</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={creating}
                  className="w-full rounded-xl bg-tracoli-500 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 disabled:opacity-60"
                >
                  {creating ? "Création…" : "Créer la commande"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orders list */}
      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-ink-200 bg-white py-16">
          <div className="size-7 animate-spin rounded-full border-[3px] border-ink-200 border-t-tracoli-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-ink-200 bg-white px-6 py-16 text-center">
          <Package className="mx-auto size-10 text-ink-300" />
          <p className="mt-3 text-base font-semibold text-ink-600">
            {search ? "Aucune commande trouvée." : "Aucune commande pour le moment."}
          </p>
          <p className="mt-1 text-sm text-ink-400">
            {search
              ? "Essayez un autre terme de recherche."
              : 'Cliquez sur "Nouvelle commande" pour en créer une.'}
          </p>
          {!search && (
            <button
              onClick={() => setShowNew(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-tracoli-600"
            >
              <Plus className="size-4" />
              Créer une commande
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm font-bold text-tracoli-600">
                      {order.reference}
                    </p>
                    <button
                      onClick={() => copyRef(order.reference)}
                      className="grid size-6 place-items-center rounded-md text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600"
                      title="Copier la référence"
                    >
                      {copiedRef === order.reference ? (
                        <Check className="size-3 text-emerald-500" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </button>
                    {order.lead_id && (
                      <Link
                        href={`/admin/leads/${order.lead_id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 transition-colors hover:bg-blue-100"
                      >
                        <ExternalLink className="size-2.5" />
                        Voir la demande
                      </Link>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-ink-700">
                    {order.description || "—"}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-[12px] text-ink-400">
                    <span>
                      {new Date(order.created_at).toLocaleDateString("fr-FR")}
                    </span>
                    {order.quantity != null && (
                      <span>Qté: {order.quantity}</span>
                    )}
                    {order.total_price != null && (
                      <span className="font-semibold text-ink-600">
                        {order.total_price} {order.currency}
                      </span>
                    )}
                    {order.tracking_number && (
                      <span>Tracking: {order.tracking_number}</span>
                    )}
                  </div>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {STATUS_FLOW.map((s) => (
                  <button
                    key={s.value}
                    onClick={() =>
                      setStatusChange({
                        orderId: order.id,
                        orderRef: order.reference,
                        newStatus: s.value,
                        label: s.label,
                      })
                    }
                    disabled={updating === order.id || order.status === s.value}
                    className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold transition-all ${
                      order.status === s.value
                        ? "bg-tracoli-500 text-white ring-2 ring-tracoli-300"
                        : "bg-ink-50 text-ink-500 hover:bg-ink-100"
                    } disabled:opacity-50`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
