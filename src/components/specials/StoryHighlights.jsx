import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stories = [
  { id: 1, title: "Truffle Pasta", image: "/assets/images/pexels-elevate-1269025.jpg", description: "Rich truffle cream with handmade pasta." },
  { id: 2, title: "Heirloom Tomato Salad", image: "/assets/images/pexels-vincent-ma-janssen-1310777.jpg", description: "Fresh heirloom tomatoes with basil and olive oil." },
  { id: 3, title: "Chocolate Lava Cake", image: "/assets/images/pexels-ella-olsson-572949-1640772.jpg", description: "Warm chocolate cake with molten center." },
];

function StoryHighlights() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % stories.length);
  const prev = () => setActive((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {stories.map((story, idx) => (
          <button
            key={story.id}
            onClick={() => setActive(idx)}
            className={`flex flex-col items-center justify-start p-3 rounded-full border-4 ${active === idx ? "border-primary" : "border-gray-300"} overflow-hidden focus:outline-none transition-all duration-300 w-40 h-40 md:w-48 md:h-48 text-center group`}
            aria-label={`View story: ${story.title}`}
          >
            <img src={story.image} alt={story.title} className="w-full h-2/3 object-cover rounded-full group-hover:scale-105 transition-transform duration-300" />
            <span className="mt-2 text-base font-semibold text-gray-700 dark:text-gray-200 break-words px-1 line-clamp-2 leading-tight">{story.title}</span>
          </button>
        ))}
      </div>
      <div className="w-full max-w-2xl mx-auto mt-8 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stories[active].id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-matte-black rounded-lg shadow-xl p-8 text-center border border-secondary min-h-[400px] flex flex-col justify-center items-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -50) next();
              if (info.offset.x > 50) prev();
            }}
          >
            <img src={stories[active].image} alt={stories[active].title} className="w-32 h-32 mx-auto rounded-full object-cover mb-6 border-2 border-primary" />
            <h3 className="text-3xl font-serif font-bold mb-3 text-primary">{stories[active].title}</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{stories[active].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default StoryHighlights; 