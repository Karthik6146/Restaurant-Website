import React from 'react';
import { motion } from 'framer-motion';

function GiftCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gradient-to-br from-[#7b2f3b] via-[#f5e6e8] to-[#53354a] py-12 px-4 text-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
          Gift the Arevei Experience
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          A perfect present for any occasion, an Arevei Gift Card offers a journey through exquisite flavors and unforgettable dining moments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl p-8 flex flex-col items-center border border-secondary text-gray-800 dark:text-gray-200"
          >
            <span className="text-6xl mb-4">✉️</span>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">E-Gift Cards</h3>
            <p className="mb-4">Instantly delivered to your inbox or directly to your recipient. Perfect for last-minute gifts!</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li>✨ Choose your desired amount</li>
              <li>✨ Personalize with a message</li>
              <li>✨ Delivered via email</li>
            </ul>
            <button className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow hover:bg-accent transition-all duration-200">Purchase E-Gift Card</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl p-8 flex flex-col items-center border border-secondary text-gray-800 dark:text-gray-200"
          >
            <span className="text-6xl mb-4">💳</span>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Physical Gift Cards</h3>
            <p className="mb-4">Elegantly packaged and mailed directly. A tangible token of appreciation for a special someone.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li>✨ Choose your desired amount</li>
              <li>✨ Beautifully packaged</li>
              <li>✨ Shipped to any address</li>
            </ul>
            <button className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow hover:bg-accent transition-all duration-200">Order Physical Card</button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl p-8 text-gray-800 dark:text-gray-200 border border-secondary"
        >
          <h3 className="text-2xl font-serif font-bold text-accent mb-4">Need Assistance?</h3>
          <p className="mb-4">If you have any questions regarding gift card purchases or redemption, please don't hesitate to contact our team.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="tel:+1234567890" className="hover:text-primary transition-colors">
              📞 (123) 456-7890
            </a>
            <a href="mailto:info@arevei.com" className="hover:text-primary transition-colors">
              ✉️ info@arevei.com
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default GiftCards; 