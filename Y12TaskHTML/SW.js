if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/' });
}

const CACHE_NAME = `Mediterranean Kitchen`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
        '/',
        '/db.js',
        '/BtnScroll.js',
        '/DRecipes.html',
        '/SRecipes.html',
        '/Suggestions.html',
        '/Pizza.html',
        '/KiwiCake.html',
        '/indexCSS.css'
    ]);
    })());
});

self.addEventListener('fetch', event => {
    if (!(event.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        // Only handle GET requests
        if (event.request.method !== 'GET') {
            return fetch(event.request);
        }

        // Get the resource from the cache.
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                // If the resource was not in the cache, try the network.
                const fetchResponse = await fetch(event.request);

                // Save the resource in the cache and return it.
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                // Handle network failure or other errors
                console.error('Fetch failed; returning offline page instead.', e);
                throw e;
            }
        }
    })());
});

