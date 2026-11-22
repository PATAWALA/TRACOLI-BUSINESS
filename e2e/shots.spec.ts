import { test } from "@playwright/test";

// Captures d'une page à 390, 768 et 1440 px.
// Usage : PAGES=/,/sourcer TAG=avant npx playwright test e2e/shots.spec.ts
const pages = (process.env.PAGES ?? "/").split(",");
const tag = process.env.TAG ?? "avant";
const widths = [390, 768, 1440];

for (const path of pages) {
  for (const w of widths) {
    test(`${tag} ${path} @${w}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto(path, { waitUntil: "networkidle" });
      const name = path === "/" ? "accueil" : path.replace(/^\//, "").replace(/\//g, "_");
      await page.screenshot({
        path: `e2e/shots/${tag}/${name}-${w}.png`,
        fullPage: true,
      });
    });
  }
}
