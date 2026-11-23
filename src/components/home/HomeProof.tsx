import Image from "next/image";
import { PROOF_ITEMS } from "@/data/home/proof-photos";

export default function HomeProof() {
  if (PROOF_ITEMS.length === 0) return null;

  const cols = PROOF_ITEMS.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2 md:max-w-3xl";

  return (
    <section className="bg-ink-50 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
          Derrière chaque colis, une équipe que vous pouvez joindre
        </h2>

        <ul className={`mx-auto mt-12 grid gap-4 md:gap-6 ${cols}`}>
          {PROOF_ITEMS.map((item) => (
            <li
              key={item.src}
              className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 768px) 92vw, 380px"
                className="aspect-[4/3] w-full object-cover object-top md:aspect-[4/5]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
