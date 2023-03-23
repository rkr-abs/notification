/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable consistent-this */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable id-match */

// STORAGE OF BROWSER
const cacheName = 'my-website-cache-v1';
const assetsToCache = [
	'/',
	'/index.html',
	'/css/style.css',
	'/js/main.js',
];

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(cacheName)
		.then((cache) => cache.addAll(assetsToCache))
		.then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
	event.waitUntil(caches.keys().then((cacheNames) => Promise.all(cacheNames.filter((name) => name.startsWith('my-website-cache-') && name !== cacheName).map((name) => caches.delete(name))))
		.then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
	event.respondWith(caches.match(event.request)
		.then((response) => {
			if(response)
				return response;

			return fetch(event.request);
		}));
});
