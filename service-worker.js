// Han Yu Learning — offline service worker.
//
// Bump CACHE_VERSION whenever index.html changes, otherwise returning visitors keep
// getting the old cached copy. That is the single most common way to ship an update
// that nobody receives.
// Format: hanyu-YYYY-MM-DD-V{n} — date stays the same all day, just increment V
// each time you push again that day (V1, V2, V3...). Start a new date at V1 when
// the day changes. Never reuse a full string, and never go backwards.
const CACHE_VERSION = 'hanyu-2026-08-17-V5';

// Same-origin app shell. These must all exist or the install step fails silently.
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Cross-origin libraries. Cached opportunistically rather than at install: if a CDN is
// slow or blocked, install must still succeed, or the app never becomes installable.
// Stroke-order data is fetched per character on demand, so it accumulates as you use
// the app — practise a word once while online and it works offline afterwards.
const RUNTIME_HOSTS = ['cdn.jsdelivr.net'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isRuntime = RUNTIME_HOSTS.some((h) => url.hostname.endsWith(h));
  if (!sameOrigin && !isRuntime) return;   // let translation/API calls go straight to the network

  // App shell: network-first, so an update is picked up as soon as you're online,
  // falling back to cache when you're not.
  if (sameOrigin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  // CDN libraries and stroke data: cache-first. These are versioned URLs that never
  // change contents, so serving a stale copy is correct and keeps startup fast.
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        // Opaque cross-origin responses are cacheable and replay fine offline.
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit);
    })
  );
});
