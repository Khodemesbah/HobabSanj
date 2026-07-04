/* با هر انتشار، نام کش را همراه ?v= عوض کن تا نسخهٔ جدید جایگزین شود */
const CACHE = "hobabsanj-v0.8.1";
const ASSETS = ["./", "./index.html", "./styles.css?v=0.8.1", "./app.js?v=0.8.1", "./manifest.json", "./icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  if(e.request.method !== "GET") return;
  if(new URL(e.request.url).origin !== self.location.origin) return; // API و CDN همیشه از شبکه
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
