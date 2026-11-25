"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  ImagePlus,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import HelpBanner from "@/components/admin/ui/HelpBanner";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import Modal from "@/components/admin/ui/Modal";
import { adminFetch } from "@/lib/admin-fetch";
import { supabase } from "@/lib/supabase/client";
import type { ResourceRow } from "@/lib/resources";

const MAX_PDF = 25 * 1024 * 1024;

const field =
  "w-full min-h-12 rounded-xl border border-ink-200 bg-white px-3.5 text-[15px] text-ink-900 outline-none focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/15";
const area = `${field} min-h-24 py-3 leading-relaxed`;

const TYPES = [
  { value: "ebook", label: "Ebook" },
  { value: "guide", label: "Guide" },
  { value: "formation", label: "Formation" },
  { value: "template", label: "Modèle" },
] as const;

interface Form {
  title: string;
  description: string;
  long_description: string;
  type: string;
  access: "free" | "premium";
  price: string;
  level: string;
  meta: string;
  cover_url: string;
  file_url: string;
  link_url: string;
  outcomes: string;
  audience: string;
  seller_name: string;
  seller_whatsapp: string;
}

const EMPTY: Form = {
  title: "",
  description: "",
  long_description: "",
  type: "ebook",
  access: "premium",
  price: "",
  level: "Tous niveaux",
  meta: "",
  cover_url: "",
  file_url: "",
  link_url: "",
  outcomes: "",
  audience: "",
  seller_name: "",
  seller_whatsapp: "",
};

/** Réduit la couverture (1200 px max, WebP) avant l'envoi. */
async function prepareCover(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", 0.85));
  if (!blob) throw new Error("Cette image ne peut pas être lue.");
  return new File([blob], "cover.webp", { type: "image/webp" });
}

/** Envoi direct du fichier vers le stockage (les PDF sont trop lourds pour passer par le serveur du site). */
async function uploadFile(kind: "cover" | "pdf", file: File): Promise<string> {
  const ext = kind === "pdf" ? "pdf" : (file.name.split(".").pop() ?? "webp");
  const res = await adminFetch("/api/resources/upload", { method: "POST", body: JSON.stringify({ kind, ext }) });
  const sign = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(sign.error ?? "Envoi impossible.");
  const { error } = await supabase.storage
    .from("files")
    .uploadToSignedUrl(sign.path, sign.token, file, { contentType: file.type || undefined });
  if (error) throw new Error(`Envoi impossible : ${error.message}`);
  return sign.publicUrl as string;
}

const toForm = (r: ResourceRow): Form => ({
  title: r.title,
  description: r.description,
  long_description: r.long_description ?? "",
  type: r.type,
  access: r.access,
  price: r.price ?? "",
  level: r.level,
  meta: r.meta ?? "",
  cover_url: r.cover_url ?? "",
  file_url: r.file_url ?? "",
  link_url: r.link_url ?? "",
  outcomes: (r.outcomes ?? []).join("\n"),
  audience: (r.audience ?? []).join("\n"),
  seller_name: r.seller_name ?? "",
  seller_whatsapp: r.seller_whatsapp ?? "",
});

export default function AdminShopPage() {
  const [items, setItems] = useState<ResourceRow[] | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ResourceRow | null>(null);
  const [form, setForm] = useState<Form>(EMPTY);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<ResourceRow | null>(null);

  const load = useCallback(async () => {
    const res = await adminFetch("/api/resources");
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(
        /resources/.test(data.error ?? "") && /(schema|relation|does not exist|find)/i.test(data.error ?? "")
          ? "La table de la boutique n'existe pas encore. Exécutez le fichier 007_resources_shop.sql dans Supabase (SQL Editor)."
          : (data.error ?? "Erreur de chargement."),
      );
      return;
    }
    setError("");
    setItems(data.resources);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  }

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setFormError("");
  };

  function openNew() {
    setEditing(null);
    setForm(EMPTY);
    setCoverFile(null);
    setPdfFile(null);
    setFormError("");
    setOpen(true);
  }

  function openEdit(r: ResourceRow) {
    setEditing(r);
    setForm(toForm(r));
    setCoverFile(null);
    setPdfFile(null);
    setFormError("");
    setOpen(true);
  }

  function close() {
    if (saving) return;
    setOpen(false);
  }

  async function save() {
    if (!form.title.trim()) return setFormError("Écrivez le titre du livre.");
    if (!form.description.trim()) return setFormError("Écrivez une courte description : elle s'affiche sur la carte.");
    if (form.access === "premium" && !form.price.trim()) return setFormError("Indiquez le prix (ex : 15 USD).");
    if (pdfFile && pdfFile.size > MAX_PDF) return setFormError("PDF trop lourd (25 Mo maximum).");

    setSaving(true);
    setFormError("");
    try {
      let { cover_url, file_url } = form;
      if (coverFile) cover_url = await uploadFile("cover", await prepareCover(coverFile));
      if (pdfFile && form.access === "free") file_url = await uploadFile("pdf", pdfFile);

      const body = {
        ...form,
        cover_url,
        file_url,
        outcomes: form.outcomes.split("\n"),
        audience: form.audience.split("\n"),
      };
      const res = await adminFetch("/api/resources", {
        method: editing ? "PATCH" : "POST",
        body: JSON.stringify(editing ? { id: editing.id, ...body } : body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Publication impossible.");
      setOpen(false);
      flash(editing ? "Livre mis à jour ✓" : "Livre publié dans la boutique ✓");
      await load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Publication impossible.");
    } finally {
      setSaving(false);
    }
  }

  async function patch(body: Record<string, unknown>, okMsg: string) {
    const res = await adminFetch("/api/resources", { method: "PATCH", body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    flash(res.ok ? okMsg : (data.error ?? "Erreur : modification non enregistrée."));
    await load();
  }

  function move(i: number, d: -1 | 1) {
    if (!items) return;
    const ids = items.map((p) => p.id);
    [ids[i], ids[i + d]] = [ids[i + d], ids[i]];
    patch({ order: ids }, "Ordre enregistré ✓");
  }

  async function remove() {
    if (!toDelete) return;
    const res = await adminFetch("/api/resources", { method: "DELETE", body: JSON.stringify({ id: toDelete.id }) });
    setToDelete(null);
    flash(res.ok ? "Livre supprimé ✓" : "Erreur : suppression impossible.");
    await load();
  }

  const visible = items?.filter((r) => r.published).length ?? 0;

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Boutique</h1>
          <p className="mt-1 text-base text-ink-600">Les guides gratuits et les livres payants de l&apos;onglet « Boutique » du site.</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 text-[15px] font-bold text-white shadow-sm hover:bg-tracoli-600"
        >
          <Plus className="size-5" aria-hidden /> Ajouter un livre
        </button>
      </div>

      <HelpBanner title="Comment ça marche ?">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Gratuit :</strong> le visiteur voit « Télécharger ». Il reçoit le PDF (ou le lien) tout de suite.</li>
          <li><strong>Payant :</strong> le visiteur voit « Commander ». WhatsApp s&apos;ouvre vers le <strong>numéro du vendeur</strong> avec le titre du livre. Le vendeur encaisse puis envoie le PDF sur WhatsApp : aucun PDF payant n&apos;est publié sur le site.</li>
          <li><strong>Vendeur :</strong> laissez vide pour TRACOLI, ou indiquez le nom et le WhatsApp de votre client pour que ses commandes arrivent chez lui.</li>
          <li><strong>Masquer</strong> retire le livre du site sans le supprimer. Dès qu&apos;un livre existe ici, les exemples intégrés au site disparaissent.</li>
        </ul>
      </HelpBanner>

      {error && <p className="rounded-2xl border border-red-200 bg-red-50 p-5 text-base font-semibold text-red-700">{error}</p>}

      {!error && !items && (
        <div className="flex min-h-[30vh] items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-tracoli-200 border-t-tracoli-500" />
        </div>
      )}

      {items && (
        <>
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-300 bg-white p-10 text-center">
              <BookOpen className="mx-auto size-9 text-ink-400" aria-hidden />
              <p className="mt-3 text-base font-bold text-ink-900">Aucun livre publié</p>
              <p className="mx-auto mt-1 max-w-md text-base text-ink-600">
                Le site affiche pour l&apos;instant des <strong>exemples</strong>. Dès que vous ajoutez votre premier livre, ils disparaissent et seuls vos livres s&apos;affichent.
              </p>
            </div>
          ) : (
            <>
              <p className="text-base text-ink-700">
                <strong className="text-ink-900">{visible}</strong> livre{visible > 1 ? "s" : ""} visible{visible > 1 ? "s" : ""} sur le site
                {items.length > visible && <> · {items.length - visible} masqué{items.length - visible > 1 ? "s" : ""}</>}
              </p>
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((r, i) => (
                  <li key={r.id} className={`flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm ${r.published ? "border-ink-200" : "border-amber-300"}`}>
                    <div className="relative aspect-video bg-tracoli-50">
                      {r.cover_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.cover_url} alt={r.title} className={`size-full object-cover ${r.published ? "" : "opacity-50"}`} />
                      ) : (
                        <div className="grid size-full place-items-center text-tracoli-500"><BookOpen className="size-10" aria-hidden /></div>
                      )}
                      <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-sm font-bold ${r.access === "premium" ? "bg-ink-900 text-white" : "bg-white text-ink-900"}`}>
                        {r.access === "premium" ? `Payant · ${r.price}` : "Gratuit"}
                      </span>
                      {!r.published && (
                        <span className="absolute top-3 right-3 rounded-full bg-amber-500 px-3 py-1 text-sm font-bold text-white">Masqué</span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-4">
                      <div>
                        <h2 className="text-base leading-snug font-extrabold text-ink-900">{r.title}</h2>
                        <p className="mt-1 text-sm text-ink-600">
                          {r.seller_name ? `Vendeur : ${r.seller_name}` : "Vendeur : TRACOLI"}
                          {r.access === "free" && (r.file_url || r.link_url) && (
                            <span className="ml-2 inline-flex items-center gap-1 font-semibold text-emerald-700"><FileText className="size-3.5" aria-hidden />fichier prêt</span>
                          )}
                        </p>
                      </div>
                      <div className="mt-auto flex flex-wrap items-center gap-2">
                        <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Monter ce livre" className="grid size-11 place-items-center rounded-xl border border-ink-200 text-ink-700 hover:bg-ink-50 disabled:opacity-30">
                          <ArrowUp className="size-5" />
                        </button>
                        <button onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Descendre ce livre" className="grid size-11 place-items-center rounded-xl border border-ink-200 text-ink-700 hover:bg-ink-50 disabled:opacity-30">
                          <ArrowDown className="size-5" />
                        </button>
                        <button onClick={() => openEdit(r)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-ink-200 px-4 text-sm font-bold text-ink-800 hover:bg-ink-50">
                          <Pencil className="size-4" /> Modifier
                        </button>
                        <button
                          onClick={() => patch({ id: r.id, published: !r.published }, r.published ? "Livre masqué ✓" : "Livre visible sur le site ✓")}
                          aria-label={r.published ? "Masquer ce livre" : "Afficher ce livre"}
                          className="grid size-11 place-items-center rounded-xl border border-ink-200 text-ink-700 hover:bg-ink-50"
                        >
                          {r.published ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                        </button>
                        {r.published && (
                          <a href={`/ressources/${r.slug}`} target="_blank" rel="noopener noreferrer" aria-label="Voir sur le site" className="grid size-11 place-items-center rounded-xl border border-ink-200 text-ink-700 hover:bg-ink-50">
                            <ExternalLink className="size-5" />
                          </a>
                        )}
                        <button onClick={() => setToDelete(r)} aria-label="Supprimer ce livre" className="ml-auto grid size-11 place-items-center rounded-xl text-ink-400 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      <Modal
        open={open}
        onClose={close}
        wide
        title={editing ? "Modifier le livre" : "Ajouter un livre"}
        description="Remplissez les champs : les 4 premiers suffisent. Le livre apparaît en premier dans la boutique."
        footer={
          <>
            <button onClick={close} className="min-h-12 rounded-xl border border-ink-200 bg-white px-5 text-[15px] font-semibold text-ink-700">Annuler</button>
            <button onClick={save} disabled={saving} className="min-h-12 rounded-xl bg-tracoli-500 px-6 text-[15px] font-bold text-white hover:bg-tracoli-600 disabled:opacity-50">
              {saving ? "Envoi en cours…" : editing ? "Enregistrer" : "Publier dans la boutique"}
            </button>
          </>
        }
      >
        <div className="space-y-5">
          <fieldset>
            <legend className="text-sm font-bold text-ink-800">Ce livre est…</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {([
                ["premium", "Payant", "Bouton « Commander » → WhatsApp"],
                ["free", "Gratuit", "Bouton « Télécharger »"],
              ] as const).map(([v, label, hint]) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={form.access === v}
                  onClick={() => set("access", v)}
                  className={`rounded-xl border-2 p-3 text-left transition-colors ${form.access === v ? "border-tracoli-500 bg-tracoli-50" : "border-ink-200 bg-white hover:border-ink-300"}`}
                >
                  <span className="block text-[15px] font-extrabold text-ink-900">{label}</span>
                  <span className="block text-xs text-ink-600">{hint}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="text-sm font-bold text-ink-800">Titre</span>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} maxLength={140} placeholder="Ex : Importer de Chine : le guide complet" className={field} />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-ink-800">Description courte</span>
            <span className="block text-xs text-ink-600">2 phrases, affichées sur la carte du livre.</span>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} maxLength={300} rows={3} className={area} />
          </label>

          {form.access === "premium" && (
            <label className="block">
              <span className="text-sm font-bold text-ink-800">Prix</span>
              <input value={form.price} onChange={(e) => set("price", e.target.value)} maxLength={40} placeholder="Ex : 15 USD" className={field} />
            </label>
          )}

          <div>
            <span className="text-sm font-bold text-ink-800">Couverture (facultatif)</span>
            <label className="mt-1.5 flex min-h-28 cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-ink-300 bg-ink-50 p-3 hover:border-tracoli-400">
              {coverFile || form.cover_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverFile ? URL.createObjectURL(coverFile) : form.cover_url} alt="Aperçu de la couverture" className="h-24 w-36 rounded-xl object-cover" />
              ) : (
                <ImagePlus className="size-8 shrink-0 text-ink-500" aria-hidden />
              )}
              <span className="text-sm text-ink-700">
                <strong className="block text-base text-ink-900">{coverFile || form.cover_url ? "Changer l'image" : "Choisir une image"}</strong>
                JPG, PNG ou WebP. Sans image, le site affiche une couverture rouge par défaut.
              </span>
              <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => { setCoverFile(e.target.files?.[0] ?? null); setFormError(""); }} />
            </label>
          </div>

          {form.access === "free" ? (
            <div className="space-y-3 rounded-2xl border border-ink-200 p-4">
              <p className="text-sm font-bold text-ink-800">Fichier à télécharger</p>
              <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-ink-300 bg-ink-50 px-4 hover:border-tracoli-400">
                <FileText className="size-6 shrink-0 text-ink-500" aria-hidden />
                <span className="min-w-0 text-sm text-ink-700">
                  <strong className="block truncate text-[15px] text-ink-900">
                    {pdfFile ? pdfFile.name : form.file_url ? "PDF déjà envoyé — toucher pour le remplacer" : "Choisir un PDF"}
                  </strong>
                  PDF, 25 Mo maximum.
                </span>
                <input type="file" accept="application/pdf" className="sr-only" onChange={(e) => { setPdfFile(e.target.files?.[0] ?? null); setFormError(""); }} />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-ink-800">…ou un lien (Drive, Dropbox, site)</span>
                <input value={form.link_url} onChange={(e) => set("link_url", e.target.value)} inputMode="url" placeholder="https://" className={field} />
              </label>
              <p className="text-xs text-ink-600">Sans fichier ni lien, « Télécharger » ouvre WhatsApp pour que le vendeur envoie le guide.</p>
            </div>
          ) : (
            <p className="rounded-xl bg-ink-50 px-4 py-3 text-sm leading-relaxed text-ink-700">
              <strong>Pas de PDF à envoyer ici.</strong> Un livre payant n&apos;est jamais publié sur le site : le vendeur envoie le PDF sur WhatsApp après le paiement.
            </p>
          )}

          <div className="space-y-3 rounded-2xl border border-ink-200 p-4">
            <p className="text-sm font-bold text-ink-800">Vendeur</p>
            <p className="-mt-2 text-xs text-ink-600">Laissez vide pour que les commandes arrivent sur le WhatsApp de TRACOLI.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-ink-800">Nom</span>
                <input value={form.seller_name} onChange={(e) => set("seller_name", e.target.value)} maxLength={80} placeholder="Ex : Jean Dupont" className={field} />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-ink-800">WhatsApp</span>
                <input value={form.seller_whatsapp} onChange={(e) => set("seller_whatsapp", e.target.value)} inputMode="tel" placeholder="Ex : 257 69 03 27 65" className={field} />
              </label>
            </div>
            <p className="text-xs text-ink-600">Écrivez le numéro avec l&apos;indicatif du pays (257 = Burundi), sans le +.</p>
          </div>

          <details className="rounded-2xl border border-ink-200 p-4">
            <summary className="cursor-pointer text-sm font-bold text-ink-800">Plus de détails (facultatif)</summary>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-ink-800">Présentation complète</span>
                <textarea value={form.long_description} onChange={(e) => set("long_description", e.target.value)} maxLength={4000} rows={5} className={area} />
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="block">
                  <span className="text-sm font-semibold text-ink-800">Type</span>
                  <select value={form.type} onChange={(e) => set("type", e.target.value)} className={field}>
                    {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink-800">Niveau</span>
                  <select value={form.level} onChange={(e) => set("level", e.target.value)} className={field}>
                    {["Tous niveaux", "Débutant", "Intermédiaire", "Avancé"].map((l) => <option key={l}>{l}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink-800">Format</span>
                  <input value={form.meta} onChange={(e) => set("meta", e.target.value)} maxLength={80} placeholder="28 pages · PDF" className={field} />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-ink-800">Ce que le lecteur va apprendre</span>
                <span className="block text-xs text-ink-600">Une idée par ligne.</span>
                <textarea value={form.outcomes} onChange={(e) => set("outcomes", e.target.value)} rows={4} className={area} />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-ink-800">Pour qui ?</span>
                <span className="block text-xs text-ink-600">Un public par ligne.</span>
                <textarea value={form.audience} onChange={(e) => set("audience", e.target.value)} rows={3} className={area} />
              </label>
            </div>
          </details>

          {formError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{formError}</p>}
        </div>
      </Modal>

      <ConfirmModal
        open={!!toDelete}
        title="Supprimer ce livre ?"
        message="Il disparaîtra du site. Pour le retirer sans le perdre, utilisez plutôt « Masquer »."
        confirmLabel="Supprimer"
        onConfirm={remove}
        onCancel={() => setToDelete(null)}
      />

      {toast && (
        <div className="fixed top-4 left-1/2 z-[300] -translate-x-1/2 rounded-xl bg-ink-900 px-5 py-2.5 text-sm font-bold text-white shadow-xl">{toast}</div>
      )}
    </div>
  );
}
