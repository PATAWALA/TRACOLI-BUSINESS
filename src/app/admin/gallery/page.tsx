"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, ImagePlus, Trash2 } from "lucide-react";
import HelpBanner from "@/components/admin/ui/HelpBanner";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import Modal from "@/components/admin/ui/Modal";
import { adminFetch } from "@/lib/admin-fetch";

interface Photo {
  id: string;
  caption: string;
  image_url: string;
  width: number;
  height: number;
  position: number;
  published: boolean;
}

const field =
  "w-full min-h-12 rounded-xl border border-ink-200 bg-white px-3.5 text-[15px] text-ink-900 outline-none focus:border-tracoli-500 focus:ring-2 focus:ring-tracoli-500/15";

/** Réduit la photo (1600 px max, WebP) avant l'envoi : rapide sur téléphone, léger pour les visiteurs. */
async function prepare(file: File): Promise<{ blob: Blob; width: number; height: number }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, width, height);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", 0.82));
  if (!blob) throw new Error("Cette photo ne peut pas être lue.");
  return { blob, width, height };
}

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [adding, setAdding] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<Photo | null>(null);

  const load = useCallback(async () => {
    const res = await adminFetch("/api/gallery");
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(
        /gallery_photos/.test(data.error ?? "")
          ? "La table de la galerie n'existe pas encore. Exécutez le fichier 006_gallery_photos.sql dans Supabase (SQL Editor)."
          : (data.error ?? "Erreur de chargement."),
      );
      return;
    }
    setError("");
    setPhotos(data.photos);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  }

  function pick(f: File | null) {
    setFile(f);
    setFormError("");
    setPreview(f ? URL.createObjectURL(f) : "");
  }

  function closeAdd() {
    setAdding(false);
    pick(null);
    setCaption("");
    setFormError("");
  }

  async function publish() {
    if (!file) return setFormError("Choisissez d'abord une photo.");
    if (!caption.trim()) return setFormError("Écrivez une légende : elle s'affiche sous la photo agrandie.");
    setSaving(true);
    setFormError("");
    try {
      const { blob, width, height } = await prepare(file);
      const form = new FormData();
      form.append("file", new File([blob], "photo.webp", { type: "image/webp" }));
      form.append("caption", caption.trim());
      form.append("width", String(width));
      form.append("height", String(height));
      const res = await adminFetch("/api/gallery", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Publication impossible.");
      closeAdd();
      flash("Photo publiée sur le site ✓");
      await load();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Publication impossible.");
    } finally {
      setSaving(false);
    }
  }

  async function patch(body: Record<string, unknown>, okMsg: string) {
    const res = await adminFetch("/api/gallery", { method: "PATCH", body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) flash(data.error ?? "Erreur : modification non enregistrée.");
    else flash(okMsg);
    await load();
  }

  function move(i: number, d: -1 | 1) {
    if (!photos) return;
    const ids = photos.map((p) => p.id);
    [ids[i], ids[i + d]] = [ids[i + d], ids[i]];
    patch({ order: ids }, "Ordre enregistré ✓");
  }

  async function remove() {
    if (!toDelete) return;
    const res = await adminFetch("/api/gallery", { method: "DELETE", body: JSON.stringify({ id: toDelete.id }) });
    setToDelete(null);
    flash(res.ok ? "Photo supprimée ✓" : "Erreur : suppression impossible.");
    await load();
  }

  const visible = photos?.filter((p) => p.published).length ?? 0;

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Galerie du site</h1>
          <p className="mt-1 text-base text-ink-600">
            Les projets réussis que les visiteurs voient sur la page d&apos;accueil.
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-tracoli-500 px-6 text-[15px] font-bold text-white shadow-sm hover:bg-tracoli-600"
        >
          <ImagePlus className="size-5" aria-hidden /> Ajouter une photo
        </button>
      </div>

      <HelpBanner title="Comment ça marche ?">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Ajouter :</strong> cliquez sur « Ajouter une photo », choisissez-la, écrivez une légende courte, puis publiez. Elle apparaît sur le site en quelques secondes.</li>
          <li><strong>La première photo est affichée en grand.</strong> Les flèches ↑ ↓ changent l&apos;ordre.</li>
          <li><strong>Masquer</strong> retire la photo du site sans la supprimer. Vous pouvez la remettre quand vous voulez.</li>
          <li>Ne publiez que des photos de personnes qui ont accepté, et jamais de document avec un nom de client.</li>
        </ul>
      </HelpBanner>

      {error && <p className="rounded-2xl border border-red-200 bg-red-50 p-5 text-base font-semibold text-red-700">{error}</p>}

      {!error && !photos && (
        <div className="flex min-h-[30vh] items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-tracoli-200 border-t-tracoli-500" />
        </div>
      )}

      {photos && (
        <>
          <p className="text-base text-ink-700">
            <strong className="text-ink-900">{visible}</strong> photo{visible > 1 ? "s" : ""} visible{visible > 1 ? "s" : ""} sur le site
            {photos.length > visible && <> · {photos.length - visible} masquée{photos.length - visible > 1 ? "s" : ""}</>}
          </p>

          {photos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-300 bg-white p-10 text-center text-base text-ink-600">
              Aucune photo. Cliquez sur « Ajouter une photo » : la galerie n&apos;apparaît sur le site que s&apos;il y a au moins une photo visible.
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {photos.map((p, i) => (
                <li key={p.id} className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${p.published ? "border-ink-200" : "border-amber-300"}`}>
                  <div className="relative aspect-[4/3] bg-ink-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image_url} alt={p.caption} className={`size-full object-cover ${p.published ? "" : "opacity-50"}`} />
                    {i === 0 && p.published && (
                      <span className="absolute top-3 left-3 rounded-full bg-tracoli-500 px-3 py-1 text-sm font-bold text-white">Affichée en grand</span>
                    )}
                    {!p.published && (
                      <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-3 py-1 text-sm font-bold text-white">Masquée</span>
                    )}
                  </div>
                  <div className="space-y-3 p-4">
                    <label className="block">
                      <span className="text-sm font-bold text-ink-700">Légende</span>
                      <input
                        key={`${p.id}-${p.caption}`}
                        defaultValue={p.caption}
                        maxLength={120}
                        className={field}
                        onBlur={(e) => e.target.value.trim() && e.target.value !== p.caption && patch({ id: p.id, caption: e.target.value }, "Légende enregistrée ✓")}
                        onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                      />
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => move(i, -1)}
                        disabled={i === 0}
                        aria-label="Monter cette photo"
                        className="grid size-11 place-items-center rounded-xl border border-ink-200 text-ink-700 hover:bg-ink-50 disabled:opacity-30"
                      >
                        <ArrowUp className="size-5" />
                      </button>
                      <button
                        onClick={() => move(i, 1)}
                        disabled={i === photos.length - 1}
                        aria-label="Descendre cette photo"
                        className="grid size-11 place-items-center rounded-xl border border-ink-200 text-ink-700 hover:bg-ink-50 disabled:opacity-30"
                      >
                        <ArrowDown className="size-5" />
                      </button>
                      <button
                        onClick={() => patch({ id: p.id, published: !p.published }, p.published ? "Photo masquée ✓" : "Photo visible sur le site ✓")}
                        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-ink-200 px-4 text-sm font-bold text-ink-800 hover:bg-ink-50"
                      >
                        {p.published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        {p.published ? "Masquer" : "Afficher"}
                      </button>
                      <button
                        onClick={() => setToDelete(p)}
                        aria-label="Supprimer cette photo"
                        className="ml-auto grid size-11 place-items-center rounded-xl text-ink-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <Modal
        open={adding}
        onClose={closeAdd}
        title="Ajouter une photo"
        description="Choisissez la photo, donnez-lui une légende courte, puis publiez. Elle apparaît en premier sur le site."
        footer={
          <>
            <button onClick={closeAdd} className="min-h-12 rounded-xl border border-ink-200 bg-white px-5 text-[15px] font-semibold text-ink-700">Annuler</button>
            <button onClick={publish} disabled={saving} className="min-h-12 rounded-xl bg-tracoli-500 px-6 text-[15px] font-bold text-white hover:bg-tracoli-600 disabled:opacity-50">
              {saving ? "Publication…" : "Publier sur le site"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-ink-300 bg-ink-50 p-4 text-center hover:border-tracoli-400">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Aperçu de la photo choisie" className="max-h-64 rounded-xl object-contain" />
            ) : (
              <>
                <ImagePlus className="size-8 text-ink-500" aria-hidden />
                <span className="text-base font-bold text-ink-800">Choisir une photo</span>
                <span className="text-sm text-ink-600">JPG, PNG ou WebP. Elle est réduite automatiquement.</span>
              </>
            )}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
          </label>
          {preview && <p className="text-sm text-ink-600">Touchez l&apos;image pour en choisir une autre.</p>}
          <label className="block">
            <span className="text-sm font-bold text-ink-800">Légende</span>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} maxLength={120} placeholder="Ex : Chargement d'un conteneur pour Abidjan" className={field} />
          </label>
          {formError && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{formError}</p>}
        </div>
      </Modal>

      <ConfirmModal
        open={!!toDelete}
        title="Supprimer cette photo ?"
        message="Elle disparaîtra du site. Pour la retirer sans la perdre, utilisez plutôt « Masquer »."
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
