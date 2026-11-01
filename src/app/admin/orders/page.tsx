"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { OrderStatusBadge } from "@/components/admin/ui/StatusBadge";
import { supabase } from "@/lib/supabase/client";
import type { Order, OrderStatus } from "@/types/database.types";

const STATUS_FLOW: OrderStatus[] = [
  "en_attente",
  "confirme",
  "en_production",
  "expedie",
  "en_transit",
  "dedouanement",
  "livre",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders((data as Order[]) ?? []);
    setLoading(false);
  }

  async function changeStatus(orderId: string, newStatus: OrderStatus) {
    setUpdating(orderId);
    await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
    setUpdating(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Commandes"
        description="Suivi et gestion des commandes en cours."
        actionLabel="Actualiser"
        actionHref="#"
        actionIcon={Package}
      />

      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-ink-200 bg-white py-16">
          <div className="size-7 animate-spin rounded-full border-[3px] border-ink-200 border-t-tracoli-500" />
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-ink-200 bg-white px-6 py-16 text-center">
          <Package className="mx-auto size-10 text-ink-300" />
          <p className="mt-3 text-sm font-semibold text-ink-600">Aucune commande pour le moment.</p>
          <p className="mt-1 text-xs text-ink-400">Les commandes apparaîtront ici quand un lead sera converti.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-sm font-bold text-tracoli-600">{order.reference}</p>
                  <p className="mt-1 text-xs text-ink-500">{order.description}</p>
                  <p className="mt-0.5 text-[11px] text-ink-400">
                    {new Date(order.created_at).toLocaleDateString("fr-FR")}
                    {order.total_price != null && ` — ${order.total_price} ${order.currency}`}
                  </p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {STATUS_FLOW.map((s) => (
                  <button
                    key={s}
                    onClick={() => changeStatus(order.id, s)}
                    disabled={updating === order.id || order.status === s}
                    className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold transition-all ${
                      order.status === s
                        ? "bg-tracoli-500 text-white ring-2 ring-tracoli-300"
                        : "bg-ink-50 text-ink-500 hover:bg-ink-100"
                    } disabled:opacity-50`}
                  >
                    {s.replace(/_/g, " ")}
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
