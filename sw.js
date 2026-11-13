// MÆZE service worker. It only passes requests through to the network (no offline cache, so updates
// are never held back); browsers need a service worker with a fetch handler to offer "Install app".
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request));
});
