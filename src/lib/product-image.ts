/**
 * Une photo de produit n'est affichable que si c'est une vraie adresse https
 * d'un domaine autorisé (voir next.config.ts). Les adresses temporaires du
 * navigateur (blob:, data:) et les champs vides ne marchent jamais pour un visiteur.
 */
const ALLOWED_HOSTS = (() => {
  const hosts = ["images.unsplash.com"];
  try {
    hosts.push(new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").hostname);
  } catch {
    /* pas d'URL Supabase configurée */
  }
  return hosts;
})();

export function isDisplayableImage(src: string | null | undefined): src is string {
  if (!src) return false;
  try {
    const u = new URL(src);
    return u.protocol === "https:" && ALLOWED_HOSTS.includes(u.hostname);
  } catch {
    return false;
  }
}
