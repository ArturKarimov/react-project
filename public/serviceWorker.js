let CACHE_NAME = "react-burger-pwa";
const urlsToCache = [
"%PUBLIC_URL%/",
"%PUBLIC_URL%/index.html",
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

self.addEventListener("fetch", function(event) {
    event.respondWith(caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});