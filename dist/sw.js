// FieldCalc Lite service worker.
// Cache-first for the app shell; bump CACHE on every release.
var CACHE = "fieldcalc-v1.0.2";
var ASSETS = [
  "./", "./index.html", "./privacy.html", "./support.html",
  "./manifest.webmanifest", "./icon.svg",
  "./apple-touch-icon.png", "./icon-192.png", "./icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // cache:"reload" bypasses the HTTP cache, so a release never precaches a
      // stale copy of a file that was updated behind an unexpired cache header.
      return c.addAll(ASSETS.map(function (u) { return new Request(u, { cache: "reload" }); }));
    })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) {
          return k === CACHE ? null : caches.delete(k);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        // Only cache good same-origin responses; keep opaque/error results out.
        if (res && res.ok && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        // Offline and uncached: navigations fall back to the shell.
        return req.mode === "navigate" ? caches.match("./index.html") : Response.error();
      });
    })
  );
});
