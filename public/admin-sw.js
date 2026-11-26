// Service worker minimal de l'espace admin : rend l'app installable. Aucune mise en cache (les données admin restent toujours fraîches).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
