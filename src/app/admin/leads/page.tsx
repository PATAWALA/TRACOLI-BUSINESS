"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Copy,
  Check,
  Plus,
  X,
  User,
  Phone,
  Mail,
  Package,
  MapPin,
  MessageSquare,
} from "lucide-react";
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

interface NewLeadForm {
  name: string;
  whatsapp: string;
  email: string;
  productName: string;
  destinationCity: string;
  message: string;
}

const EMPTY_FORM: NewLeadForm = {
  name: "",
  whatsapp: "",
  email: "",
  productName: "",
  destinationCity: "",
  message: "",
};

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  // New lead modal
  const [showNew, setShowNew] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newForm, setNewForm] = useState<NewLeadForm>(EMPTY_FORM);
  const [createError, setCreateError] = useState("");
  const [createdRef, setCreatedRef] = useState<string | null>(null);

  useEffect(() => {
    loadLeads();
  }, [filter]);

  async function loadLeads() {
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

  async function createLead(e: React.FormEvent) {
    e.preventDefault();
    setCreateError("");
    setCreating(true);

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newForm.name,
        whatsapp: newForm.whatsapp,
        email: newForm.email || undefined,
        productName: newForm.productName || undefined,
        destinationCity: newForm.destinationCity || undefined,
        message: newForm.message || undefined,
        source: "admin",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setCreateError(data.error ?? "Erreur lors de la création.");
      setCreating(false);
      return;
    }

    setCreatedRef(data.reference);
    setCreating(false);
    loadLeads();
  }

  function closeModal() {
    setShowNew(false);
    setCreatedRef(null);
    setNewForm(EMPTY_FORM);
    setCreateError("");
  }

  function copyRef(ref: string, e?: React.MouseEvent) {
    e?.stopPropagation();
    navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 1500);
  }

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
        <span className="inline-flex items-center gap-1.5">
          <span className="font-mono text-[13px] font-bold text-tracoli-600">
            {row.reference}
          </span>
          <button
            onClick={(e) => copyRef(row.reference, e)}
            className="grid size-6 shrink-0 place-items-center rounded-md text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600"
            title="Copier la référence"
          >
            {copiedRef === row.reference ? (
              <Check className="size-3 text-emerald-500" />
            ) : (
              <Copy className="size-3" />
            )}
          </button>
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
      {/* New lead modal */}
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
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-ink-200 bg-white p-6 shadow-card-lg sm:p-8"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600"
              >
                <X className="size-4" />
              </button>

              {createdRef ? (
                /* Success screen */
                <div className="text-center py-4">
                  <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100">
                    <Check className="size-7 text-emerald-600" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-ink-900">
                    Demande créée !
                  </h3>
                  <div className="mx-auto mt-4 max-w-xs rounded-xl border-2 border-tracoli-200 bg-tracoli-50 px-5 py-4">
                    <p className="font-mono text-2xl font-extrabold tracking-wider text-tracoli-500">
                      {createdRef}
                    </p>
                    <button
                      onClick={() => copyRef(createdRef)}
                      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-ink-700 shadow-sm ring-1 ring-ink-200 transition-all hover:bg-ink-50"
                    >
                      {copiedRef === createdRef ? (
                        <>
                          <Check className="size-3.5 text-emerald-500" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          Copier le code
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-ink-500">
                    Envoyez ce code au client sur WhatsApp pour qu&apos;il puisse suivre sa demande.
                  </p>
                  <div className="mt-6 flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        setCreatedRef(null);
                        setNewForm(EMPTY_FORM);
                      }}
                      className="rounded-xl bg-tracoli-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-tracoli-600"
                    >
                      Créer une autre
                    </button>
                    <button
                      onClick={closeModal}
                      className="rounded-xl border border-ink-200 bg-white px-5 py-2.5 text-sm font-bold text-ink-700 transition-all hover:bg-ink-50"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              ) : (
                /* Form */
                <>
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500">
                      <Plus className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink-900">
                        Nouvelle demande
                      </h3>
                      <p className="text-sm text-ink-500">
                        Le code TRC-XXXX sera généré automatiquement
                      </p>
                    </div>
                  </div>

                  <form onSubmit={createLead} className="mt-6 space-y-4">
                    {createError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {createError}
                      </div>
                    )}

                    {/* Required */}
                    <div className="rounded-xl border border-ink-200 bg-ink-50/50 p-4">
                      <p className="text-[10px] font-bold tracking-widest text-tracoli-500 uppercase">
                        Obligatoire
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-ink-700">
                            <User className="size-3.5 text-ink-400" />
                            Nom complet
                          </label>
                          <input
                            type="text"
                            required
                            value={newForm.name}
                            onChange={(e) =>
                              setNewForm({ ...newForm, name: e.target.value })
                            }
                            className="mt-1.5 w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                            placeholder="Jean Ndayisaba"
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-ink-700">
                            <Phone className="size-3.5 text-ink-400" />
                            WhatsApp
                          </label>
                          <input
                            type="tel"
                            required
                            value={newForm.whatsapp}
                            onChange={(e) =>
                              setNewForm({
                                ...newForm,
                                whatsapp: e.target.value,
                              })
                            }
                            className="mt-1.5 w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                            placeholder="+257 69 XX XX XX"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Optional */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-ink-600">
                          <Mail className="size-3.5 text-ink-400" />
                          Email
                          <span className="text-[10px] font-normal text-ink-400">
                            — optionnel
                          </span>
                        </label>
                        <input
                          type="email"
                          value={newForm.email}
                          onChange={(e) =>
                            setNewForm({ ...newForm, email: e.target.value })
                          }
                          className="mt-1.5 w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                          placeholder="client@email.com"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-ink-600">
                          <Package className="size-3.5 text-ink-400" />
                          Produit
                          <span className="text-[10px] font-normal text-ink-400">
                            — optionnel
                          </span>
                        </label>
                        <input
                          type="text"
                          value={newForm.productName}
                          onChange={(e) =>
                            setNewForm({
                              ...newForm,
                              productName: e.target.value,
                            })
                          }
                          className="mt-1.5 w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                          placeholder="Chaussures, Électronique…"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-ink-600">
                        <MapPin className="size-3.5 text-ink-400" />
                        Ville de destination
                        <span className="text-[10px] font-normal text-ink-400">
                          — optionnel
                        </span>
                      </label>
                      <input
                        type="text"
                        value={newForm.destinationCity}
                        onChange={(e) =>
                          setNewForm({
                            ...newForm,
                            destinationCity: e.target.value,
                          })
                        }
                        className="mt-1.5 w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                        placeholder="Bujumbura, Kinshasa…"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-ink-600">
                        <MessageSquare className="size-3.5 text-ink-400" />
                        Notes
                        <span className="text-[10px] font-normal text-ink-400">
                          — optionnel
                        </span>
                      </label>
                      <textarea
                        rows={2}
                        value={newForm.message}
                        onChange={(e) =>
                          setNewForm({ ...newForm, message: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                        placeholder="Détails, quantité souhaitée…"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={creating}
                      className="w-full rounded-xl bg-tracoli-500 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 disabled:opacity-60"
                    >
                      {creating ? "Création en cours…" : "Créer la demande"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Gestion des Demandes"
          description={`${leads.length} demande${leads.length > 1 ? "s" : ""} au total`}
        />
        <button
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-tracoli-600"
        >
          <Plus className="size-4" />
          Nouvelle demande
        </button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Rechercher nom, référence, WhatsApp…"
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
        emptyMessage="Aucune demande trouvée."
        onRowClick={(row) => router.push(`/admin/leads/${row.id}`)}
      />
    </div>
  );
}
