import { getPublishedGallery } from "@/lib/gallery";
import GalleryGrid from "@/components/home/GalleryGrid";

export default async function HomeGallery() {
  const photos = await getPublishedGallery();
  if (photos.length === 0) return null;

  return (
    <section className="bg-ink-50 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
          Notre travail au quotidien
        </h2>
        <div className="mt-8 lg:mt-10">
          <GalleryGrid photos={photos} />
        </div>
      </div>
    </section>
  );
}
