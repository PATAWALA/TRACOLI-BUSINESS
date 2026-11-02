"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  Package,
  Mail,
  ArrowRight,
  UserPlus,
  FileText,
  Handshake,
  Download,
} from "lucide-react";
import StatCard from "@/components/admin/ui/StatCard";
import DataTable, { type Column } from "@/components/admin/ui/DataTable";
import { LeadStatusBadge } from "@/components/admin/ui/StatusBadge";
import { supabase } from "@/lib/supabase/client";
import type { Lead, LeadStatus } from "@/types/database.types";

interface Stats {
  totalLeads: number;
  newLeads: number;
  orders: number;
  emails: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    newLeads: 0,
    orders: 0,
    emails: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [leadsRes, newRes, ordersRes, emailsRes, recentRes] =
        await Promise.all([
          supabase.from("leads").select("id", { count: "exact", head: true }),
          supabase
            .from("leads")
            .select("id", { count: "exact", head: true })
            .eq("status", "received"),
          supabase.from("orders").select("id", { count: "exact", head: true }),
          supabase
            .from("email_captures")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("leads")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

      setStats({
        totalLeads: leadsRes.count ?? 0,
        newLeads: newRes.count ?? 0,
        orders: ordersRes.count ?? 0,
        emails: emailsRes.count ?? 0,
      });
      setRecentLeads((recentRes.data as Lead[]) ?? []);
      setLoading(false);
    }

    load();
  }, []);

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
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Leads"
          value={loading ? "—" : stats.totalLeads}
          icon={Users}
          color="bg-blue-50 text-blue-600"
          delay={0}
        />
        <StatCard
          label="Nouveaux Leads"
          value={loading ? "—" : stats.newLeads}
          icon={TrendingUp}
          color="bg-tracoli-50 text-tracoli-600"
          delay={0.05}
        />
        <StatCard
          label="Commandes"
          value={loading ? "—" : stats.orders}
          icon={Package}
          color="bg-emerald-50 text-emerald-600"
          delay={0.1}
        />
        <StatCard
          label="Emails captés"
          value={loading ? "—" : stats.emails}
          icon={Mail}
          color="bg-amber-50 text-amber-600"
          delay={0.15}
        />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-sm font-bold text-ink-800">
          Actions rapides
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Voir les leads",
              icon: UserPlus,
              href: "/admin/leads",
              color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
            },
            {
              label: "Gérer les commandes",
              icon: FileText,
              href: "/admin/orders",
              color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
            },
            {
              label: "Partenaires",
              icon: Handshake,
              href: "/admin/partners",
              color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
            },
            {
              label: "Exporter newsletter",
              icon: Download,
              href: "/admin/newsletter",
              color: "bg-amber-50 text-amber-600 hover:bg-amber-100",
            },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`flex items-center gap-3 rounded-2xl border border-ink-100 bg-white px-4 py-3.5 text-[13px] font-semibold shadow-sm transition-all hover:shadow-md ${action.color}`}
            >
              <div
                className={`grid size-9 shrink-0 place-items-center rounded-xl ${action.color.split(" ").slice(0, 1).join("")}`}
              >
                <action.icon className="size-[18px]" />
              </div>
              <span className="text-ink-800">{action.label}</span>
              <ArrowRight className="ml-auto size-4 text-ink-300" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent leads */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-ink-800">Derniers leads</h2>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-tracoli-500 transition-colors hover:text-tracoli-600"
          >
            Voir tous
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={recentLeads}
          loading={loading}
          emptyMessage="Aucun lead pour le moment."
          onRowClick={(row) => router.push(`/admin/leads/${row.id}`)}
        />
      </div>
    </div>
  );
}
