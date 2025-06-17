import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/assets/images/pexels-mali-64208.jpg",
  "/assets/images/pexels-victorfreitas-744780.jpg",
  "/assets/images/pexels-chanwalrus-958545.jpg",
  "/assets/images/pexels-reneterp-1581384.jpg",
  "/assets/images/pexels-pixabay-260922.jpg",
  "/assets/images/pexels-pixabay-262978.jpg",
];

const placeholder = "https://via.placeholder.com/1200x600?text=Restaurant+Image";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setImgError(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setImgError(false);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex + (imgError ? "-error" : "")}
          src={imgError ? placeholder : images[currentIndex]}
          onError={() => setImgError(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        →
      </button>
    </div>
  );
}

export default Carousel; 