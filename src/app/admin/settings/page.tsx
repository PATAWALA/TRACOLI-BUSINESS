"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Shield,
  Trash2,
  X,
  Eye,
  EyeOff,
  Check,
  Lock,
  Mail,
} from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
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
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  // Add account modal
  const [showAdd, setShowAdd] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addConfirm, setAddConfirm] = useState("");
  const [addRole, setAddRole] = useState("agent");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Password change
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUserId(session.user.id);
        const { data: userData } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setCurrentRole(userData?.role ?? "admin");
      }
      loadMembers();
    }
    init();
  }, []);

  async function loadMembers() {
    setLoading(true);
    const res = await fetch("/api/accounts");
    if (res.ok) {
      const data = await res.json();
      setMembers(data.members ?? []);
    }
    setLoading(false);
  }

  function resetAddForm() {
    setAddEmail("");
    setAddPassword("");
    setAddConfirm("");
    setAddRole("agent");
    setCreateError("");
    setCreateSuccess("");
    setShowPass(false);
    setShowConfirm(false);
  }

  function closeAddModal() {
    setShowAdd(false);
    resetAddForm();
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError("");
    setCreateSuccess("");

    if (addPassword.length < 6) {
      setCreateError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (addPassword !== addConfirm) {
      setCreateError("Les mots de passe ne correspondent pas.");
      return;
    }

    setCreating(true);

    const res = await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: addEmail,
        password: addPassword,
        role: addRole,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setCreateError(data.error ?? "Erreur lors de la création.");
      setCreating(false);
      return;
    }

    setCreateSuccess(`Compte créé pour ${addEmail}`);
    setCreating(false);
    loadMembers();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);

    await fetch("/api/accounts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteTarget.id }),
    });

    setDeleting(false);
    setDeleteTarget(null);
    loadMembers();
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordMsg("");

    if (newPassword.length < 6) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 6 caractères.",
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }

    setChangingPassword(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setPasswordError("Erreur : " + error.message);
    } else {
      setPasswordMsg("Mot de passe modifié avec succès.");
      setNewPassword("");
      setConfirmNewPassword("");
    }

    setChangingPassword(false);
  }

  const isAdmin = currentRole === "admin";

  return (
    <div className="space-y-8">
      <PageHeader
        title="Paramètres"
        description="Gérez votre équipe et les accès à l'espace de gestion."
      />

      {/* Delete confirm */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer ce compte ?"
        message={
          deleteTarget
            ? `Le compte ${deleteTarget.email} sera définitivement supprimé. Cette action est irréversible.`
            : ""
        }
        confirmLabel="Supprimer"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Password change section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-bold text-ink-800">
            <Lock className="size-4 text-tracoli-500" />
            Mon mot de passe
          </h2>
          {!showPasswordChange && (
            <button
              onClick={() => setShowPasswordChange(true)}
              className="rounded-xl bg-ink-50 px-4 py-2 text-xs font-bold text-ink-700 transition-all hover:bg-ink-100"
            >
              Modifier
            </button>
          )}
        </div>

        {showPasswordChange && (
          <form
            onSubmit={handlePasswordChange}
            className="mt-4 space-y-3"
          >
            {passwordError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {passwordError}
              </div>
            )}
            {passwordMsg && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {passwordMsg}
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-ink-600">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                placeholder="Minimum 6 caractères"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-600">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                placeholder="Retapez le mot de passe"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={changingPassword}
                className="rounded-xl bg-tracoli-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-tracoli-600 disabled:opacity-60"
              >
                {changingPassword ? "Modification…" : "Enregistrer"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordChange(false);
                  setNewPassword("");
                  setConfirmNewPassword("");
                  setPasswordError("");
                  setPasswordMsg("");
                }}
                className="rounded-xl border border-ink-200 bg-white px-5 py-2.5 text-xs font-bold text-ink-700 transition-all hover:bg-ink-50"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </motion.div>

      {/* Add account - admin only */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-bold text-ink-800">
              <UserPlus className="size-4 text-tracoli-500" />
              Ajouter un sous-compte
            </h2>
            <button
              onClick={() => {
                resetAddForm();
                setShowAdd(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-tracoli-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-tracoli-600"
            >
              <UserPlus className="size-3.5" />
              Nouveau compte
            </button>
          </div>
          <p className="mt-2 text-[13px] text-ink-500">
            Créez des comptes pour votre équipe. Les sous-comptes peuvent
            gérer les demandes mais ne peuvent pas ajouter d&apos;autres
            comptes.
          </p>
        </motion.div>
      )}

      {/* Add modal */}
      <AnimatePresence>
        {showAdd && (
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
              onClick={closeAddModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-2xl border border-ink-200 bg-white p-6 shadow-card-lg"
            >
              <button
                onClick={closeAddModal}
                className="absolute top-4 right-4 grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600"
              >
                <X className="size-4" />
              </button>

              {createSuccess ? (
                <div className="py-4 text-center">
                  <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100">
                    <Check className="size-7 text-emerald-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">
                    Compte créé !
                  </h3>
                  <p className="mt-2 text-sm text-ink-500">
                    {createSuccess}
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        resetAddForm();
                      }}
                      className="rounded-xl bg-tracoli-500 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-tracoli-600"
                    >
                      Créer un autre
                    </button>
                    <button
                      onClick={closeAddModal}
                      className="rounded-xl border border-ink-200 bg-white px-5 py-2.5 text-sm font-bold text-ink-700 transition-all hover:bg-ink-50"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-tracoli-50 text-tracoli-500">
                      <UserPlus className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink-900">
                        Nouveau sous-compte
                      </h3>
                      <p className="text-sm text-ink-500">
                        Accès de gestion uniquement
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handleCreate}
                    className="mt-6 space-y-4"
                  >
                    {createError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {createError}
                      </div>
                    )}

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-ink-700">
                        <Mail className="size-3.5 text-ink-400" />
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={addEmail}
                        onChange={(e) => setAddEmail(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                        placeholder="agent@tracoli-business.com"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-ink-700">
                        <Lock className="size-3.5 text-ink-400" />
                        Mot de passe
                      </label>
                      <div className="relative mt-1.5">
                        <input
                          type={showPass ? "text" : "password"}
                          required
                          value={addPassword}
                          onChange={(e) => setAddPassword(e.target.value)}
                          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 pr-11 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                          placeholder="Minimum 6 caractères"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                        >
                          {showPass ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-ink-700">
                        <Lock className="size-3.5 text-ink-400" />
                        Confirmer le mot de passe
                      </label>
                      <div className="relative mt-1.5">
                        <input
                          type={showConfirm ? "text" : "password"}
                          required
                          value={addConfirm}
                          onChange={(e) => setAddConfirm(e.target.value)}
                          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 pr-11 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                          placeholder="Retapez le mot de passe"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                        >
                          {showConfirm ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-ink-700">
                        Rôle
                      </label>
                      <select
                        value={addRole}
                        onChange={(e) => setAddRole(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 transition-all focus:border-tracoli-500 focus:ring-1 focus:ring-tracoli-500 focus:outline-none"
                      >
                        <option value="agent">
                          Agent — gestion uniquement
                        </option>
                        <option value="admin">
                          Admin — tous les droits
                        </option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={creating}
                      className="w-full rounded-xl bg-tracoli-500 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-red)] transition-all hover:bg-tracoli-600 disabled:opacity-60"
                    >
                      {creating ? "Création en cours…" : "Créer le compte"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Team list */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-ink-200 bg-white shadow-sm"
      >
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
                  {isAdmin && m.id !== currentUserId && (
                    <button
                      onClick={() => setDeleteTarget(m)}
                      className="grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Supprimer ce compte"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
