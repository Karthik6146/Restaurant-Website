/* eslint-disable no-restricted-globals */
// Retire the previous worker and its cache so returning guests receive current files.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => {
  event.waitUntil(caches.delete("restaurant-cache-v1").then(() => self.registration.unregister()));
});
