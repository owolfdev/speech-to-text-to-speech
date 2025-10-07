const CACHE_NAME = "repetere-pwa-v3";
const urlsToCache = [
  "/",
  "/protected",
  "/auth/login",
  "/auth/sign-up",
  "/auth/error",
  "/manifest.json",
  "/app-icon.png",
  "/_next/static/css/",
  "/_next/static/js/",
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  // Skip waiting to activate the new service worker immediately
  self.skipWaiting();
});

// Fetch event
self.addEventListener("fetch", (event) => {
  // Skip caching for API auth requests but allow page caching
  if (event.request.url.includes("/api/auth/")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all clients immediately
        return self.clients.claim();
      })
  );
});
