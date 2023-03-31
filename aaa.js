var CACHE_NAME = 'portfolio-cache';
var urlsToCache = [
'./index.html',
    './about.html',
    './blog.html',
    './contact.html',
    './portfolio-example01.html',
    './style.css',
    './js/app.js',
    './images/about-header.jpg',
    './images/contact-image.jpg',
    './images/example-blog01.jpg',
    './images/example-blog02.jpg',
    './images/example-blog03.jpg',
    './images/example-blog04.jpg',
    './images/example-blog05.jpg',
    './images/example-blog06.jpg',
    './images/example-blog07.jpg',
    './images/example-work01.jpg',
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