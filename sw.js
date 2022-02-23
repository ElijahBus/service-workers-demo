self.addEventListener('install', event => {
  console.log("V1 installing")

  event.waitUntil(
    caches.open('V1')
      .then(cache => cache.addAll(['/assets/image-5.jpg', 'https://jsonplaceholder.typicode.com/comments']))
  );
});

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches');
})

/**
 * Fetch the resources from the cache, 
 * If the resource is not found in the caches, it will be requested online, 
 * the we will put it in the caches for next requests.
 */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
          .then(response => {
            caches.open('V1').then(cache => {
              cache.put(event.request, response.clone());
              return response;
            })
              .catch(err => {
                // This is the fallback, in case there is no network and the cache cannot resolve anything
                return caches.match('/assets/image-4.jpg');
              })
          })
      })
  );

  // DETAILED CODE OF THE ABOVE
  // const url = new URL(event.request.url);

  // if (url.origin === location.origin && url.pathname === 'https://jsonplaceholder.typicode.com/comments') {
  //   event.respondWith(caches.match('https://jsonplaceholder.typicode.com/comments'));
  // }

  // if (url.origin === location.origin && url.pathname === '/assets/image-5.jpg') {
  //   event.respondWith(caches.match('/assets/image-5.jpg'));
  // }
});