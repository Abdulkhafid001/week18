var cacheName = "petstore-v1";
var cacheFiles = [
    'index.html',
    'product.js',
    'petstore.webmanifest',
    'images/yarn.jpg',
    'images/cat_food.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // download the file if it is not in the cache
            return r || fetch(e.request).then(function (response) {
                // add new file to the cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});