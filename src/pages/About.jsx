import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import ChefsTableParallax from "../components/story/ChefsTableParallax"; // Keeping it in mind for re-integration if needed
// import IngredientTimeline from "../components/story/IngredientTimeline"; // Keeping it in mind for re-integration if needed

function About() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen font-sans bg-gradient-to-br from-[#f5e6e8] to-[#e0b0c0] dark:from-matte-black dark:to-matte-black"
    >
      {/* Hero Section */}
      <section
        className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white overflow-hidden"
      >
        <img
          src="/assets/images/pexels-victorfreitas-744780.jpg" // Replace with a suitable about us hero image
          alt="About Us Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 text-center px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-serif font-bold mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto"
          >
            Crafting Culinary Excellence Since 1998
          </motion.p>
        </div>
      </section>

      {/* Welcome Message / Our Philosophy */}
      <section className="max-w-6xl mx-auto py-16 px-4 md:px-8 text-center">
        <motion.h2
          className="text-4xl font-serif font-bold text-primary mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          A Culinary Legacy Built on Passion
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          At Arevei, we believe that memorable dining experiences transcend routine. Our philosophy embraces the delightful variety of culinary desires, offering a space that is both welcoming and effortlessly elegant. Our dedicated team is thoughtful, engaging, and attuned to each guest's rhythm, ensuring every visit is special. Rooted in modern American cuisine, our daily menus honor the season's finest ingredients through careful preparation and artistic presentation. We find joy in our guests returning for a dish that lingered in memory, and equal pleasure in helping mark life's most meaningful celebrations.
        </motion.p>
        <motion.button
          onClick={() => navigate("/menu")}
          className="px-8 py-4 bg-primary text-white rounded-full shadow-lg text-lg font-bold transition-all duration-300 hover:bg-accent hover:scale-105"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore Our Menu
        </motion.button>
      </section>

      {/* Our Vision / Values Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/assets/images/pexels-ella-olsson-572949-1640772.jpg" // Replace with an image representing vision/values
              alt="Our Vision"
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-serif font-bold text-primary">Our Vision</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To be the premier destination for discerning palates, where culinary artistry meets unparalleled hospitality. We strive to create not just meals, but cherished memories that bring people back, time and again.
            </p>
            <h3 className="text-3xl font-serif font-bold text-primary">Our Values</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Passion for Food: Dedication to exquisite taste and quality ingredients.</li>
              <li>Exceptional Service: Anticipating needs and exceeding expectations.</li>
              <li>Creative Innovation: Constantly evolving our menu and dining experience.</li>
              <li>Community & Connection: Fostering a welcoming environment for all.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Awards & Recognitions Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 md:px-8 bg-white/90 dark:bg-matte-black/90 rounded-2xl shadow-xl mb-12">
        <motion.h2
          className="text-4xl font-serif font-bold text-primary mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Recognized for Excellence
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[    
            "Outstanding Hospitality Semifinalist 2024 – James Beard Foundation",
            "50 Best Wine Restaurants in America - Wine Enthusiast Magazine",
            "Best Restaurants in [Your City] - Local Magazine",
            "Outstanding Service Semifinalist 2017 – James Beard Foundation",
            "Time-Tested Restaurant - Local Critic",
            "AAA's Four Diamond rating for 5 consecutive years",
          ].map((award, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-secondary transition-transform duration-200 hover:scale-105 flex items-center space-x-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <svg className="w-8 h-8 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-gray-800 dark:text-gray-200 text-lg font-semibold">{award}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action - Visit Us */}
      <section className="relative bg-primary text-white py-20 px-4 text-center overflow-hidden">
        <img
          src="/assets/images/pexels-pixabay-260922.jpg" // Background image for CTA
          alt="Dine with Us"
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />
        <div className="relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold mb-6 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            Experience Arevei
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Join us for an unforgettable culinary journey. We look forward to welcoming you.
          </motion.p>
          <motion.button
            onClick={() => navigate("/reservation")}
            className="px-10 py-5 bg-white text-primary rounded-full shadow-lg text-xl font-bold transition-all duration-300 hover:bg-gray-200 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Make a Reservation
          </motion.button>
        </div>
      </section>
    </motion.div>
  );
}

export default About; 