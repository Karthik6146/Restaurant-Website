import React, { useEffect, useRef } from "react";

export default function RestaurantFilm() {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopForReducedMotion = () => {
      if (motion.matches) video.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.4 || motion.matches) return;
        // Start once; a visitor's later pause must remain in effect.
        observer.disconnect();
        video.play().catch(() => {
          /* Native controls remain available if autoplay is blocked. */
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    motion.addEventListener("change", stopForReducedMotion);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", stopForReducedMotion);
      video.pause();
    };
  }, []);
  return (
    <figure className="restaurant-film">
      <video
        ref={videoRef}
        controls
        playsInline
        muted
        loop
        preload="none"
        poster="/assets/videos/restaurant-poster.jpg"
        width="1280"
        height="720"
        aria-label="A moment at the table: steaming food, tea, and a carefully arranged place setting"
      >
        <source src="/assets/videos/restaurant-film.mp4" type="video/mp4" />
        <a href="/assets/videos/restaurant-film.mp4">
          Watch the restaurant film
        </a>
      </video>
      <figcaption>
        A moment at the table — a steaming dish and tea, ready to share. Silent
        film.
      </figcaption>
    </figure>
  );
}
