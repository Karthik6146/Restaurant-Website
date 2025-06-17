/* eslint-disable no-restricted-globals */

// This optional code is used to register a service worker.
// register() is not called by default.

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
          // Registration successful
        })
        .catch(error => {
          // Registration failed
          console.error('Error during service worker registration:', error);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
} 