// 每次程式碼大改後，手動把 v1 改成 v2, v3...
const CACHE_NAME = '99-pwa-v2'; 

const ASSETS = [
  'index.html',
  'manifest.json',
  'https://pyscript.net/releases/2024.1.1/core.css',
  'https://pyscript.net/releases/2024.1.1/core.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
