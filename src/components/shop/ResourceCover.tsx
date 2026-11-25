import Image from "next/image";
import { BookOpen } from "lucide-react";
import { isDisplayableImage } from "@/lib/product-image";
import { TYPE_LABELS } from "@/lib/resource-actions";
import type { Resource } from "@/data/shared/types";

/** Couverture du livre ; sans image (ou image illisible), un fond rouge clair avec le type du livre. */
export default function ResourceCover({
  resource,
  sizes,
  priority,
}: {
  resource: Resource;
  sizes: string;
  priority?: boolean;
}) {
  if (isDisplayableImage(resource.image)) {
    return (
      <Image
        src={resource.image}
        alt={resource.imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-tracoli-50 p-6 text-center">
      <BookOpen className="size-10 text-tracoli-500" strokeWidth={1.75} aria-hidden />
      <span className="text-sm font-bold text-tracoli-700">{TYPE_LABELS[resource.type]}</span>
    </div>
  );
}
