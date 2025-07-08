const cacheName = 'ludo-pwa-v1';
const assets = [
  '/',
  '/index.html',
  '/main.css',
  '/game.js',
  '/manifest.json',
  '/icon.png',
  '/dice.mp3',
  '/win.mp3',
  '/step.mp3',
  '/killed.mp3',
  '/inout.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
