const CACHE_NAME = 'ludo-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.css',
  '/game.js',
  '/manifest.json',
  '/icon.png',
  '/dice.mp3',
  '/win.mp3',
  '/killed.mp3',
  '/step.mp3',
  '/inout.mp3',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Force install
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
