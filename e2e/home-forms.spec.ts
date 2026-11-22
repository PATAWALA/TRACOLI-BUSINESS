import { test, expect } from "@playwright/test";

// Vérifie que les formulaires de l'accueil envoient exactement ce qu'ils envoyaient avant.
// Les appels à l'API sont interceptés : aucun email ni aucune écriture réelle.
test.use({ reducedMotion: "reduce" });

test("suivi : le formulaire mène à /suivre?ref=CODE", async ({ page }) => {
  await page.goto("/");
  await page.locator("#home-track-code").fill("TEST123");
  await page.getByRole("button", { name: "Suivre", exact: true }).click();
  await expect(page).toHaveURL(/\/suivre\?ref=TEST123/);
});

test("newsletter : POST /api/newsletter avec email + source", async ({ page }) => {
  let body: unknown = null;
  await page.route("**/api/newsletter", async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });
  await page.goto("/");
  await page.getByPlaceholder("Votre email").fill("test@example.com");
  await page.getByRole("button", { name: "S'inscrire" }).click();
  await expect(page.getByText("Inscription confirmée")).toBeVisible();
  expect(body).toEqual({ email: "test@example.com", source: "homepage" });
});

test("WhatsApp mobile : lien wa.me vers le bon numéro", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const href = await page.getByRole("link", { name: /WhatsApp/ }).first().getAttribute("href");
  expect(href).toContain("https://wa.me/25769032765?text=");
});

test("liens principaux de l'accueil", async ({ page }) => {
  await page.goto("/");
  for (const [name, href] of [
    ["Trouver un produit", "/sourcer"],
    ["Suivre ma commande", "/suivre"],
    ["Estimer mon fret", "/expedier"],
    ["Passer commande", "/demande"],
  ] as const) {
    expect(await page.getByRole("link", { name }).first().getAttribute("href")).toBe(href);
  }
});
