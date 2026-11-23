import Link from "next/link";
import Image from "next/image";

/**
 * Logo officiel TRACOLI SUPPLY CHAIN : le fichier fourni par le client
 * (public/logo.jpg), recadré sur sa bande utile dans
 * public/images/logo-tracoli.webp. Fond rouge de marque, pictogramme
 * et nom en blanc. Ne pas le redessiner ni le recolorer.
 *
 * `tone` est conservé pour compatibilité : le logo est identique sur fond
 * clair ou sombre.
 */
export default function Logo({
  href = "/",
  size = "lg",
}: {
  tone?: "light" | "dark";
  href?: string | null;
  size?: "md" | "lg";
}) {
  const big = size === "lg";

  const content = (
    <Image
      src="/images/logo-tracoli.webp"
      alt="TRACOLI Supply Chain"
      width={1120}
      height={420}
      priority={big}
      sizes="(max-width: 640px) 120px, 160px"
      className={
        big
          ? "h-11 w-auto rounded-xl sm:h-12 lg:h-14"
          : "h-10 w-auto rounded-xl"
      }
    />
  );

  if (!href) return content;
  return (
    <Link
      href={href}
      aria-label="TRACOLI Supply Chain — Accueil"
      className="inline-block min-w-0"
    >
      {content}
    </Link>
  );
}
