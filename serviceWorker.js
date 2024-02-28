let CACHE_NAME = "react-burger-pwa";
const urlsToCache = [
"%PUBLIC_URL%/",
"%PUBLIC_URL%/index.html",
"%PUBLIC_URL%/manifest.json",
"/static/js/main.000acb0e.js",
"/static/css/main.895bd321.css"
];
// self.addEventListener("install", function(event) {
// // Perform install steps
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(function(cache) {
//                 console.log("Opened cache");
//                 return cache.addAll(urlsToCache);
//             })
//     );
// });
self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(async (cache) => {
        let ok;

        console.log('ServiceWorker: Caching files:', urlsToCache.length, urlsToCache);
        try {
            ok = await cache.addAll(urlsToCache);
        } catch (err) {
            console.error('sw: cache.addAll');
            for (let i of urlsToCache) {
                try {
                    ok = await cache.add(i);
                } catch (err) {
                    console.warn('sw: cache.add',i);
                }
            }
        }

        return ok;
    }));

    console.log('ServiceWorker installed');
});

// self.addEventListener("fetch", function(event) {
//     event.respondWith(caches.match(event.request)
//         .then(function(response) {
//             if (response) {
//                 return response;
//             }
//             return fetch(event.request);
//         })
//     );
// });

self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            if (r) {
                return r;
            }
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
            cache.put(e.request, response.clone());
            return response;
        })(),
    );
});