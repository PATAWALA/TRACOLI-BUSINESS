import { defineConfig } from "@playwright/test";

// Utilise le Chrome installé sur la machine (aucun téléchargement de navigateur).
export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    channel: "chrome",
  },
});
