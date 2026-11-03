"use client";

import { useState } from "react";
import { X, Copy, Check, ExternalLink } from "lucide-react";
import { FaWhatsapp, FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa";

const PUBLIC_URL = "https://tracolibusiness.com/demande";

const SHARE_CHANNELS = [
  {
    label: "WhatsApp",
    icon: FaWhatsapp,
    color: "bg-green-500 hover:bg-green-600",
    getUrl: (link: string) =>
      `https://wa.me/?text=${encodeURIComponent(`Déposez votre projet d'import ici 👇\n${link}`)}`,
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500",
    getUrl: () => "",
    copyOnly: true,
  },
  {
    label: "TikTok",
    icon: FaTiktok,
    color: "bg-black hover:bg-ink-800",
    getUrl: () => "",
    copyOnly: true,
  },
  {
    label: "Facebook",
    icon: FaFacebook,
    color: "bg-blue-600 hover:bg-blue-700",
    getUrl: (link: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
  },
];

interface ShareLinkModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ShareLinkModal({ open, onClose }: ShareLinkModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  async function handleCopy() {
    await navigator.clipboard.writeText(PUBLIC_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleShare(channel: (typeof SHARE_CHANNELS)[number]) {
    if (channel.copyOnly) {
      handleCopy();
      return;
    }
    const url = channel.getUrl(PUBLIC_URL);
    if (url) window.open(url, "_blank", "noopener");
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 z-[201] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-ink-200 bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-extrabold text-ink-900">
            Partager le lien
          </h2>
          <button
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-600"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="mb-4 text-[13px] text-ink-500">
          Partagez ce lien pour que votre communauté puisse déposer leurs projets
          d&apos;import directement.
        </p>

        {/* Link display + copy */}
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-ink-200 bg-ink-50 p-2.5">
          <div className="flex-1 truncate text-[13px] font-medium text-ink-700">
            {PUBLIC_URL}
          </div>
          <button
            onClick={handleCopy}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-bold text-white transition-all ${
              copied ? "bg-emerald-500" : "bg-tracoli-500 hover:bg-tracoli-600"
            }`}
          >
            {copied ? (
              <>
                <Check className="size-3.5" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Copier
              </>
            )}
          </button>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-3">
          {SHARE_CHANNELS.map((channel) => (
            <button
              key={channel.label}
              onClick={() => handleShare(channel)}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13px] font-bold text-white transition-all shadow-sm hover:shadow-md ${channel.color}`}
            >
              <channel.icon className="size-4" />
              {channel.label}
            </button>
          ))}
        </div>

        {/* Tip */}
        <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-tracoli-50 p-3.5">
          <ExternalLink className="mt-0.5 size-4 shrink-0 text-tracoli-500" />
          <p className="text-[12px] leading-relaxed text-tracoli-700">
            <strong>Astuce :</strong> Collez ce lien dans votre bio TikTok /
            Instagram, vos stories WhatsApp, ou en commentaire pour rediriger
            votre audience vers le formulaire.
          </p>
        </div>
      </div>
    </>
  );
}
