// sw.js
const CACHE_NAME = 'rm-estetica-cache-v7';
const urlsToCache = [ '/', '/index.html', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js' ];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))));
self.addEventListener('fetch', e => {
    if (e.request.url.includes('supabase.co')) { e.respondWith(fetch(e.request)); return; }
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => caches.open(CACHE_NAME).then(c => { c.put(e.request, res.clone()); return res; }))));
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); }))));
});
