const CACHE_NAME = '99-pwa-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://pyscript.net/releases/2024.1.1/core.css',
  'https://pyscript.net/releases/2024.1.1/core.js'
];

// 安裝時快取檔案
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 攔截請求，優先從快取抓取
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
