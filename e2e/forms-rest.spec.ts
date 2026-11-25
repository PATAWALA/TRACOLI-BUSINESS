import { test, expect } from "@playwright/test";

// Vérifie que /demande et /newsletter envoient exactement les mêmes données qu'avant.
// Les appels API sont interceptés : aucune écriture réelle, aucun email envoyé.
test.use({ reducedMotion: "reduce" });

test("demande : POST /api/leads avec les mêmes champs (source: site)", async ({ page }) => {
  let body: Record<string, unknown> | null = null;
  await page.route("**/api/leads", async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ code: "TEST-0000" }),
    });
  });
  await page.route("**/api/payment-methods", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: "{}" })
  );

  await page.goto("/demande");
  await page.getByPlaceholder("Ex: Jean Ndayisaba").fill("Test Playwright");
  await page.getByPlaceholder("+257 69 XX XX XX").fill("+25700000000");
  await page.getByPlaceholder("Ex: Chaussures, Électronique…").fill("Chaussures");
  await page.locator('button[type="submit"]').first().click();

  await expect.poll(() => body).not.toBeNull();
  expect(body).toMatchObject({
    name: "Test Playwright",
    whatsapp: "+25700000000",
    productName: "Chaussures",
    source: "site",
  });
});

test("newsletter : POST /api/newsletter avec source newsletter_page", async ({ page }) => {
  let body: unknown = null;
  await page.route("**/api/newsletter", async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });
  await page.goto("/newsletter");
  await page.getByPlaceholder("Votre adresse email").fill("test@example.com");
  await page.getByRole("button", { name: "S'inscrire gratuitement" }).click();
  await expect(page.getByText("Bienvenue dans la communauté")).toBeVisible();
  expect(body).toEqual({ email: "test@example.com", source: "newsletter_page" });
});

test("newsletter : un email déjà inscrit affiche le message d'erreur", async ({ page }) => {
  await page.route("**/api/newsletter", (route) =>
    route.fulfill({ status: 409, contentType: "application/json", body: "{}" })
  );
  await page.goto("/newsletter");
  await page.getByPlaceholder("Votre adresse email").fill("deja@example.com");
  await page.getByRole("button", { name: "S'inscrire gratuitement" }).click();
  await expect(page.getByText("Cet email est déjà inscrit.")).toBeVisible();
});

test("404 : la page introuvable propose le retour à l'accueil", async ({ page }) => {
  await page.goto("/page-inexistante");
  await expect(page.getByRole("heading", { name: "Page introuvable" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Retour à l'accueil" }).first()).toHaveAttribute("href", "/");
});

test("ressources : filtres et liens WhatsApp", async ({ page }) => {
  await page.goto("/ressources");
  const wa = page.getByRole("link", { name: /Télécharger|Commander/ }).first();
  expect(await wa.getAttribute("href")).toContain("https://wa.me/25769032765?text=");
  await page.goto("/ressources/premiers-pas-import");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("service : la fiche s'affiche et pointe vers /demande", async ({ page }) => {
  await page.goto("/services/sourcing-negotiation");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.getByRole("link", { name: "Envoyer mon projet" }).getAttribute("href")).toBe("/demande");
});
