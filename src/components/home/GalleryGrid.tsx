"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryPhoto } from "@/data/home/gallery-photos";

/** Au-delà de cette limite, les photos suivantes sont repliées derrière un bouton. */
const MOSAIC = 5;

const roundBtn =
  "grid size-12 place-items-center rounded-full border border-white/40 bg-ink-900/60 text-white transition-colors hover:bg-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function Tile({
  photo,
  i,
  big,
  onOpen,
}: {
  photo: GalleryPhoto;
  i: number;
  big: boolean;
  onOpen: (i: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(i)}
      aria-label={`Agrandir la photo : ${photo.caption}`}
      className="group relative block size-full overflow-hidden rounded-2xl border border-ink-200 bg-ink-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tracoli-500"
    >
      <Image
        src={photo.src}
        alt={photo.caption}
        width={photo.width}
        height={photo.height}
        sizes={big ? "(max-width: 768px) 92vw, 46vw" : "(max-width: 768px) 46vw, 23vw"}
        className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </button>
  );
}

/**
 * Mosaïque de photos : une grande, quatre petites. Au toucher, la photo s'ouvre
 * en plein écran (fenêtre native : Échap pour fermer, focus gardé dedans).
 */
export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const open = (i: number) => {
    setActive(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (d: number) =>
      setActive((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  const current = active === null ? null : photos[active];

  return (
    <>
      {photos.length >= MOSAIC ? (
        <ul className="grid grid-cols-2 gap-2 md:aspect-[3/2] md:grid-cols-4 md:grid-rows-2 md:gap-3">
          {photos.slice(0, MOSAIC).map((photo, i) => (
            <li
              key={photo.src}
              className={
                i === 0
                  ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto"
                  : "aspect-[3/4] md:aspect-auto"
              }
            >
              <Tile photo={photo} i={i} big={i === 0} onOpen={open} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {photos.map((photo, i) => (
            <li key={photo.src} className="aspect-[4/3]">
              <Tile photo={photo} i={i} big={false} onOpen={open} />
            </li>
          ))}
        </ul>
      )}

      {photos.length > MOSAIC && (
        <>
          {showAll && (
            <ul className="mt-2 grid grid-cols-2 gap-2 md:mt-3 md:grid-cols-4 md:gap-3">
              {photos.slice(MOSAIC).map((photo, k) => (
                <li key={photo.src} className="aspect-[3/4]">
                  <Tile photo={photo} i={MOSAIC + k} big={false} onOpen={open} />
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="mt-6 inline-flex min-h-[56px] w-full items-center justify-center rounded-2xl border-2 border-ink-200 bg-white px-7 text-base font-bold text-ink-800 transition-colors hover:border-tracoli-300 sm:w-auto"
          >
            {showAll ? "Réduire la galerie" : `Voir les ${photos.length - MOSAIC} autres photos`}
          </button>
        </>
      )}

      <dialog
        ref={dialogRef}
        aria-label="Photo agrandie"
        onClose={() => setActive(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink-900/95"
      >
        {current && (
          <div
            className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-10"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div className="relative min-h-0 w-full flex-1">
              <Image
                key={current.src}
                src={current.src}
                alt={current.caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <p className="text-center text-base font-semibold text-white">
              {current.caption}
              <span className="ml-3 font-normal text-white/80 tabular-nums">
                {(active ?? 0) + 1} / {photos.length}
              </span>
            </p>

            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className={`${roundBtn} absolute top-4 right-4 sm:top-6 sm:right-6`}
            >
              <X className="size-5" aria-hidden />
            </button>
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Photo précédente"
                  className={`${roundBtn} absolute top-1/2 left-3 -translate-y-1/2 sm:left-6`}
                >
                  <ChevronLeft className="size-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Photo suivante"
                  className={`${roundBtn} absolute top-1/2 right-3 -translate-y-1/2 sm:right-6`}
                >
                  <ChevronRight className="size-6" aria-hidden />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
