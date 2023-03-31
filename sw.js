var CACHE_NAME = 'portfolio-cache';
var urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/main.js',
  '/images/background.jpg',
  '/images/icon.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }
   
            var responseToCache = response.clone();
   
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
   
            return response;
          })
          .catch(function(error) {
            console.error('Error fetching from network:', error);
          });
        })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
    caches.match(event.request)
    .then(function(response) {
    if (response) {
    return response;
    }       var fetchRequest = event.request.clone();

    return fetch(fetchRequest)
      .then(function(response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(function(error) {
        console.error('Error fetching from network:', error);

        return caches.match('/offline.html');
      });
  })
);
});