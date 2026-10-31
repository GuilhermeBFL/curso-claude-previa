// Guarda a estrutura do site para abrir sem internet. Primeiro tenta a rede; vídeos ficam de fora.
const CACHE = 'curso-preview-v1';
const BASE = ['./', 'index.html', 'estilo.css', 'app.js', 'dados/curriculo.js', 'dados/aulas.js', 'dados/videos.js', 'manifest.webmanifest', 'img/icone.svg', 'img/vila.jpg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.endsWith('.mp4')) return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        if (r.ok) {
          const copia = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, copia));
        }
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});
