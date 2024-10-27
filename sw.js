const cacheName = "checklist-cache-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  // add other files here as needed
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(assets))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
