import React from 'react';
import { motion } from 'framer-motion';

function Careers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gradient-to-br from-[#7b2f3b] via-[#f5e6e8] to-[#53354a] py-12 px-4 text-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
          Join Our Team
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Arevei Restaurant is always looking for passionate and talented individuals to join our culinary family. If you share our dedication to exquisite dining and exceptional service, we invite you to explore career opportunities with us.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl p-8 flex flex-col items-center border border-secondary text-gray-800 dark:text-gray-200"
          >
            <span className="text-6xl mb-4">🍽️</span>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Front of House</h3>
            <p className="mb-4">Join our vibrant team of hosts, servers, and bartenders who create unforgettable guest experiences.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li>✨ Engaging and dynamic atmosphere</li>
              <li>✨ Opportunities for growth</li>
              <li>✨ Focus on guest satisfaction</li>
            </ul>
            <a href="mailto:careers@arevei.com?subject=Front of House Application" className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow hover:bg-accent transition-all duration-200">Apply Now</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl p-8 flex flex-col items-center border border-secondary text-gray-800 dark:text-gray-200"
          >
            <span className="text-6xl mb-4">👨‍🍳</span>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Back of House</h3>
            <p className="mb-4">Be part of the culinary magic! We're seeking talented chefs, pastry chefs, and kitchen staff.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li>✨ Innovative and creative environment</li>
              <li>✨ Work with premium ingredients</li>
              <li>✨ Collaborative kitchen team</li>
            </ul>
            <a href="mailto:careers@arevei.com?subject=Back of House Application" className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow hover:bg-accent transition-all duration-200">Apply Now</a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl p-8 text-gray-800 dark:text-gray-200 border border-secondary"
        >
          <h3 className="text-2xl font-serif font-bold text-accent mb-4">General Inquiries</h3>
          <p className="mb-4">Don't see a role that fits your expertise? Send us your resume and let's connect!</p>
          <a href="mailto:careers@arevei.com?subject=General Career Inquiry" className="px-8 py-3 bg-accent text-white rounded-full font-semibold shadow hover:bg-primary transition-all duration-200">Submit General Application</a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Careers; 