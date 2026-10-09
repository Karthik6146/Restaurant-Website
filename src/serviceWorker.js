export function unregister() {
  if ("serviceWorker" in navigator) {
    const scriptURL = new URL(
      `${import.meta.env.BASE_URL}serviceWorker.js`,
      window.location.origin,
    ).href;
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) =>
        Promise.all(
          registrations
            .filter((registration) =>
              [
                registration.active,
                registration.waiting,
                registration.installing,
              ].some((worker) => worker?.scriptURL === scriptURL),
            )
            .map((registration) => registration.unregister()),
        ),
      )
      .catch(() => {
        /* The site works without service worker access. */
      });
  }
}
