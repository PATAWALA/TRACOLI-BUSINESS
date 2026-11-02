"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Download, Trash2, RefreshCw } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import type { EmailCapture } from "@/types/database.types";

export default function AdminNewsletterPage() {
  const [emails, setEmails] = useState<EmailCapture[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<EmailCapture | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadEmails();
  }, []);

  async function loadEmails() {
    setLoading(true);
    const res = await fetch("/api/newsletter");
    if (res.ok) {
      const data = await res.json();
      setEmails(data.emails ?? []);
    }
    setLoading(false);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/newsletter?id=${deleteTarget.id}`, { method: "DELETE" });
    setEmails((prev) => prev.filter((e) => e.id !== deleteTarget.id));
    setDeleting(false);
    setDeleteTarget(null);
  }

  function exportCSV() {
    const header = "Email,Source,Date\n";
    const rows = emails
      .map(
        (e) =>
          `${e.email},${e.source ?? "—"},${new Date(e.created_at).toLocaleDateString("fr-FR")}`,
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-emails-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer cet email ?"
        message={
          deleteTarget
            ? `L'email « ${deleteTarget.email} » sera supprimé définitivement de la liste newsletter.`
            : ""
        }
        confirmLabel="Supprimer"
        variant="danger"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Newsletter"
          description={`${emails.length} email${emails.length > 1 ? "s" : ""} capturé${emails.length > 1 ? "s" : ""}`}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={loadEmails}
            className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-bold text-ink-600 transition-all hover:bg-ink-50"
          >
            <RefreshCw className="size-4" />
            Actualiser
          </button>
          {emails.length > 0 && (
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-tracoli-600"
            >
              <Download className="size-4" />
              Exporter CSV
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-ink-200 bg-white py-16">
          <div className="size-7 animate-spin rounded-full border-[3px] border-ink-200 border-t-tracoli-500" />
        </div>
      ) : emails.length === 0 ? (
        <div className="rounded-2xl border border-ink-200 bg-white px-6 py-16 text-center">
          <Mail className="mx-auto size-10 text-ink-300" />
          <p className="mt-3 text-base font-semibold text-ink-600">
            Aucun email capturé.
          </p>
          <p className="mt-1 text-sm text-ink-400">
            Les inscriptions à la newsletter apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50/60">
                <th className="px-5 py-3.5 text-[11px] font-bold tracking-wider text-ink-400 uppercase">
                  Email
                </th>
                <th className="hidden px-5 py-3.5 text-[11px] font-bold tracking-wider text-ink-400 uppercase sm:table-cell">
                  Source
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold tracking-wider text-ink-400 uppercase">
                  Date
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {emails.map((email, i) => (
                <motion.tr
                  key={email.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50"
                >
                  <td className="px-5 py-3.5 text-[13px] font-semibold text-ink-900">
                    {email.email}
                  </td>
                  <td className="hidden px-5 py-3.5 text-[13px] text-ink-500 sm:table-cell">
                    {email.source ?? "—"}
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-ink-500">
                    {new Date(email.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setDeleteTarget(email)}
                      className="grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
