"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Package, Mail, TrendingUp, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface Stats {
  leads: number;
  orders: number;
  emails: number;
  newLeads: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    leads: 0,
    orders: 0,
    emails: 0,
    newLeads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [leadsRes, ordersRes, emailsRes, newRes] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("email_captures").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "nouveau"),
      ]);

      setStats({
        leads: leadsRes.count ?? 0,
        orders: ordersRes.count ?? 0,
        emails: emailsRes.count ?? 0,
        newLeads: newRes.count ?? 0,
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  const cards = [
    { label: "Total Leads", value: stats.leads, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Nouveaux Leads", value: stats.newLeads, icon: TrendingUp, color: "text-tracoli-600 bg-tracoli-50" },
    { label: "Commandes", value: stats.orders, icon: Package, color: "text-emerald-600 bg-emerald-50" },
    { label: "Emails captés", value: stats.emails, icon: Mail, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold tracking-wider text-ink-500 uppercase">{card.label}</p>
              <div className={`grid size-9 place-items-center rounded-xl ${card.color}`}>
                <card.icon className="size-4" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900">
              {loading ? "—" : card.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/leads"
          className="group flex items-center justify-between rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-all hover:border-tracoli-300 hover:shadow-md"
        >
          <div>
            <p className="text-sm font-bold text-ink-900">Voir tous les leads</p>
            <p className="mt-1 text-xs text-ink-500">Gérer les demandes entrantes</p>
          </div>
          <ArrowRight className="size-5 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-tracoli-500" />
        </Link>

        <Link
          href="/demande"
          className="group flex items-center justify-between rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-all hover:border-tracoli-300 hover:shadow-md"
        >
          <div>
            <p className="text-sm font-bold text-ink-900">Formulaire client</p>
            <p className="mt-1 text-xs text-ink-500">Voir le formulaire public</p>
          </div>
          <ArrowRight className="size-5 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-tracoli-500" />
        </Link>
      </div>
    </div>
  );
}
