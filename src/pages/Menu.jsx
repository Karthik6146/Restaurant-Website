import React, { useState } from "react";
import { motion } from "framer-motion";
import MenuCarousel from "../components/menu/MenuCarousel";
import FilterChips from "../components/menu/FilterChips";
import LazyImage from "../components/common/LazyImage";

function Menu() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen p-4 pb-20 bg-gradient-to-br from-[#7b2f3b] via-[#f5e6e8] to-[#53354a]"
    >
      <h1 className="text-4xl font-serif text-center mb-12 text-white">Our Exquisite Menu</h1>

      {/* Dinner & Dessert Section */}
      <section className="max-w-6xl mx-auto mb-16 bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row items-center gap-8 p-8 border border-secondary/50">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full"
        >
          <h2 className="text-3xl font-serif font-bold text-primary mb-4 lg:text-left text-center">Dinner & Dessert</h2>
          <p className="text-gray-700 dark:text-gray-200 text-lg mb-6 lg:text-left text-center">
            Explore our thoughtfully curated dinner menu, featuring seasonal ingredients and innovative culinary techniques. Conclude your journey with our exquisite dessert creations, a perfect symphony of flavors and artistry.
          </p>
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={() => setActiveFilter("main")}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold shadow hover:bg-accent transition text-lg mr-4"
            >
              View Dinner
            </button>
            <button
              onClick={() => setActiveFilter("dessert")}
              className="px-6 py-3 bg-accent text-white rounded-full font-semibold shadow hover:bg-primary transition text-lg"
            >
              View Dessert
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 w-full h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg flex-shrink-0"
        >
          <LazyImage
            src="/assets/images/pexels-ella-olsson-572949-1640772.jpg"
            alt="Dinner and Dessert menu showcase"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      </section>

      {/* Drinks Section */}
      <section className="max-w-6xl mx-auto mb-16 bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row-reverse items-center gap-8 p-8 border border-secondary/50">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full"
        >
          <h2 className="text-3xl font-serif font-bold text-primary mb-4 lg:text-left text-center">Drinks Menu</h2>
          <p className="text-gray-700 dark:text-gray-200 text-lg mb-6 lg:text-left text-center">
            Complement your meal with a selection from our extensive beverage menu. From exquisite wines and craft cocktails to refreshing non-alcoholic options, we have the perfect pairing for every palate.
          </p>
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={() => setActiveFilter("drinks")}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold shadow hover:bg-accent transition text-lg"
            >
              View Drinks
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 w-full h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg flex-shrink-0"
        >
          <LazyImage
            src="/assets/images/pexels-pixabay-262978.jpg"
            alt="Drinks menu showcase"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      </section>

      {/* Explore Our Full Menu Section */}
      <section className="max-w-6xl mx-auto mt-20 px-4">
        <h2 className="text-3xl font-serif text-center mb-8 text-white">Explore Our Full Menu</h2>
        <FilterChips activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <MenuCarousel filter={activeFilter} />
      </section>
    </motion.div>
  );
}

export default Menu; 