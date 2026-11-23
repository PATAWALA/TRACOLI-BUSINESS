import { test, expect } from "@playwright/test";

// Vérifie que les envois des pages /sourcer et /suivre n'ont pas changé.
// Les appels API sont interceptés : aucune écriture réelle, aucun email envoyé.
test.use({ reducedMotion: "reduce" });

test("suivi : /suivre appelle /api/track?code=CODE (majuscules)", async ({ page }) => {
  let url = "";
  await page.route("**/api/track**", async (route) => {
    url = route.request().url();
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ type: "none" }) });
  });
  await page.goto("/suivre");
  await page.getByPlaceholder("Code de votre colis").fill("trc-2026-9999");
  await page.getByRole("button", { name: "Tracer" }).click();
  await expect.poll(() => url).toContain("/api/track?code=TRC-2026-9999");
});

test("sourcing : POST /api/leads avec les mêmes champs", async ({ page }) => {
  let body: Record<string, unknown> | null = null;
  await page.route("**/api/leads", async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ code: "TEST-0000" }) });
  });
  await page.goto("/sourcer");
  await page.getByPlaceholder("https://www.alibaba.com/...").fill("https://example.com/produit");
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByPlaceholder("ex : Jean Mukendi").fill("Test Playwright");
  await page.getByPlaceholder("+257 69 03 27 65").fill("+25700000000");
  await page.getByRole("button", { name: /Demander une cotation/ }).last().click();
  await expect.poll(() => body).not.toBeNull();
  expect(body).toMatchObject({
    name: "Test Playwright",
    whatsapp: "+25700000000",
    productUrl: "https://example.com/produit",
    source: "sourcer",
  });
});

test("liens des pages : Passer commande mène à /demande", async ({ page }) => {
  for (const path of ["/sourcer", "/expedier", "/suivre"]) {
    await page.goto(path);
    const links = page.getByRole("link", { name: "Passer commande" });
    expect(await links.last().getAttribute("href")).toBe("/demande");
  }
});
