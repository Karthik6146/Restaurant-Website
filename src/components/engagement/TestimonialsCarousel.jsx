import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Sophia L.",
    text: "Absolutely the best dining experience! The flavors were incredible and the staff made us feel like family.",
  },
  {
    name: "James K.",
    text: "The chef's tasting menu was a journey of taste and creativity. Highly recommend for food lovers!",
  },
  {
    name: "Priya S.",
    text: "Beautiful ambiance, delicious food, and wonderful service. We'll be back for sure!",
  },
];

function TestimonialsCarousel() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg p-8 text-center border border-secondary min-h-[180px] flex flex-col justify-center"
          aria-live="polite"
        >
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">"{testimonials[active].text}"</p>
          <span className="font-bold text-primary">— {testimonials[active].name}</span>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center shadow hover:bg-primary hover:text-white transition"
        >
          &#8592;
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center shadow hover:bg-primary hover:text-white transition"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default TestimonialsCarousel; 