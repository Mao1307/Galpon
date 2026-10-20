// Mi Galpón — service worker: permite usar la app sin internet.
// Cuando subas una versión nueva, cambia el número (v2 → v3…).
const VERSION = 'mi-galpon-v2';
const CORE = [
  './',
  './index.html',
  './firebase-config.js',
  './manifest.webmanifest',
  './academia/ponedoras.html',
  './academia/engorde.html',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './vendor/jspdf.umd.min.js',
  './vendor/jspdf.plugin.autotable.min.js'
];
const FB_SDK = 'https://www.gstatic.com/firebasejs/';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(req, key) {
  return fetch(req)
    .then((res) => { if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(key || req, copy)); } return res; })
    .catch(() => caches.match(key || req));
}
function cacheFirst(req) {
  return caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
    return res;
  }));
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // La página y la configuración: primero internet (para tomar cambios), si no hay señal la copia guardada.
  if (req.mode === 'navigate') {
    const key = url.pathname.includes('/academia/') ? './academia/' + url.pathname.split('/academia/')[1] : './index.html';
    e.respondWith(networkFirst(req, key)); return;
  }
  if (url.origin === self.location.origin && url.pathname.endsWith('/firebase-config.js')) { e.respondWith(networkFirst(req)); return; }

  // Programas de Firebase, tipografías y archivos propios: copia guardada primero.
  const isFont = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
  if (req.url.startsWith(FB_SDK) || isFont || url.origin === self.location.origin) {
    e.respondWith(cacheFirst(req));
  }
  // Todo lo demás (la base de datos de Firebase) va directo a internet.
});
