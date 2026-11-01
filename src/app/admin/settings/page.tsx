"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Shield, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { supabase } from "@/lib/supabase/client";

interface TeamMember {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

export default function AdminSettingsPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("agent");
  const [inviting, setInviting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: true });

      setMembers((data as TeamMember[]) ?? []);
      setLoading(false);
    }

    load();
  }, []);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setInviting(true);

    const { error } = await supabase.from("users").insert({
      email: inviteEmail,
      role: inviteRole,
    });

    if (error) {
      setMessage("Erreur : " + (error.message ?? "impossible d'ajouter."));
    } else {
      setMessage("Utilisateur ajouté avec succès.");
      setInviteEmail("");
      const { data } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: true });
      setMembers((data as TeamMember[]) ?? []);
    }

    setInviting(false);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Paramètres"
        description="Gérez votre équipe et les accès à l'espace admin."
      />

      {/* Invite form */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm"
      >
        <h2 className="flex items-center gap-2 text-sm font-bold text-ink-800">
          <UserPlus className="size-4 text-tracoli-500" />
          Inviter un membre
        </h2>
        <form onSubmit={handleInvite} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="Email du nouveau membre"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
          />
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            className="rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
          >
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={inviting}
            className="rounded-xl bg-tracoli-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-tracoli-600 disabled:opacity-60"
          >
            {inviting ? "Ajout…" : "Ajouter"}
          </button>
        </form>
        {message && (
          <p className="mt-3 text-sm text-ink-600">{message}</p>
        )}
      </motion.div>

      {/* Team list */}
      <div className="rounded-2xl border border-ink-200 bg-white shadow-sm">
        <div className="border-b border-ink-100 px-6 py-4">
          <h2 className="text-sm font-bold text-ink-800">Équipe actuelle</h2>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="size-7 animate-spin rounded-full border-[3px] border-ink-200 border-t-tracoli-500" />
          </div>
        ) : members.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-ink-400">
            Aucun membre trouvé.
          </p>
        ) : (
          <ul className="divide-y divide-ink-100">
            {members.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-ink-100 text-[11px] font-bold text-ink-600">
                    {(m.full_name ?? m.email).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-ink-900">
                      {m.full_name ?? m.email}
                    </p>
                    <p className="text-[11px] text-ink-500">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold ${
                      m.role === "admin"
                        ? "bg-tracoli-50 text-tracoli-600"
                        : "bg-ink-50 text-ink-600"
                    }`}
                  >
                    <Shield className="size-3" />
                    {m.role === "admin" ? "Admin" : "Agent"}
                  </span>
                  <button className="grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
