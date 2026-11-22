import { test } from "@playwright/test";

// Captures d'une page à 390, 768 et 1440 px.
// Usage : PAGES=/,/sourcer TAG=avant npx playwright test e2e/shots.spec.ts
test.use({ reducedMotion: "reduce" });
const pages = (process.env.PAGES ?? "/").split(",");
const tag = process.env.TAG ?? "avant";
const widths = [390, 768, 1440];

for (const path of pages) {
  for (const w of widths) {
    test(`${tag} ${path} @${w}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto(path, { waitUntil: "networkidle" });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo({ top: y, behavior: "instant" }); await new Promise(r => setTimeout(r, 120)); } window.scrollTo({ top: 0, behavior: "instant" }); });
      await page.waitForTimeout(400);
      const name = path === "/" ? "accueil" : path.replace(/^\//, "").replace(/\//g, "_");
      await page.screenshot({ path: `e2e/shots/${tag}/${name}-${w}-fold.png` });
      await page.screenshot({
        path: `e2e/shots/${tag}/${name}-${w}.png`,
        fullPage: true,
      });
    });
  }
}
