"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}

/** Fenêtre centrée sur ordinateur, panneau plein bas sur mobile. */
export default function Modal({
  open,
  title,
  description,
  onClose,
  children,
  footer,
  wide,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.2 }}
            className={`relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl ${
              wide ? "sm:max-w-2xl" : "sm:max-w-lg"
            }`}
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink-100 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <h2 className="text-base font-extrabold text-ink-900 sm:text-lg">{title}</h2>
                {description && (
                  <p className="mt-0.5 text-[13px] leading-snug text-ink-500">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="grid size-9 shrink-0 place-items-center rounded-xl text-ink-400 hover:bg-ink-100 hover:text-ink-700"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
            {footer && (
              <div className="flex flex-col-reverse gap-2 border-t border-ink-100 bg-ink-50/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
