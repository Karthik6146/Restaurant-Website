import React, { useState } from "react";

const slides = [
  {
    image: "pexels-reneterp-1581384.jpg",
    alt: "Warm restaurant interior with wooden tables and leafy details",
    title: "Your seat at our table.",
  },
  {
    image: "pexels-pixabay-262978.jpg",
    alt: "Freshly prepared plates being served at a restaurant",
    title: "A little taste of the season.",
  },
  {
    image: "pexels-elevate-1269025.jpg",
    alt: "Friends raising a toast over dinner",
    title: "Good company. Great evenings.",
  },
];

export default function AtmosphereSlider() {
  const [current, setCurrent] = useState(0);
  const move = (direction) =>
    setCurrent((index) => (index + direction + slides.length) % slides.length);
  return (
    <section
      className="hero-visual"
      aria-label="The Arevei experience"
      aria-roledescription="carousel"
    >
      <div className="slider-window">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              className="slider-slide"
              key={slide.image}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={index !== current}
            >
              <img
                className="hero-image"
                src={`/assets/images/web/${slide.image}`}
                alt={slide.alt}
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                width="640"
                height="560"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="image-caption">
        <div aria-live="polite" aria-atomic="true">
          <small>WELCOME TO AREVEI</small>
          <p>{slides[current].title}</p>
        </div>
      </div>
      <div className="slider-controls">
        <button
          type="button"
          className="slider-arrow"
          aria-label="Previous photo"
          onClick={() => move(-1)}
        >
          ←
        </button>
        <div className="slider-dots">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.image}
              aria-label={`Show photo ${index + 1}: ${slide.title}`}
              aria-pressed={current === index}
              onClick={() => setCurrent(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="slider-arrow"
          aria-label="Next photo"
          onClick={() => move(1)}
        >
          →
        </button>
      </div>
    </section>
  );
}
