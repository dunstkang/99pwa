const CACHE_NAME = '99-pwa-v3'; // 每次大改就手動跳號 (v2 -> v3)

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://pyscript.net/releases/2024.1.1/core.css',
  'https://pyscript.net/releases/2024.1.1/core.js'
];

// 安裝階段：強制跳過等待，立刻讓新版本生效
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// 啟動階段：清除舊版快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
