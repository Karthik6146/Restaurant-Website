import React from 'react';
import { motion } from 'framer-motion';

function GroupDining() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gradient-to-br from-[#7b2f3b] via-[#f5e6e8] to-[#53354a] py-12 px-4 text-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
          Group & Private Dining
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Arevei offers exquisite settings and tailored menus for your special events, from intimate gatherings to grand celebrations. Let us craft an unforgettable experience for your guests.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl p-8 flex flex-col items-center border border-secondary text-gray-800 dark:text-gray-200"
          >
            <span className="text-6xl mb-4">🥂</span>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Special Occasions</h3>
            <p className="mb-4">Celebrate birthdays, anniversaries, and family milestones in our elegant private dining spaces.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li>✨ Customizable menus</li>
              <li>✨ Dedicated service staff</li>
              <li>✨ Intimate and grand settings</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl p-8 flex flex-col items-center border border-secondary text-gray-800 dark:text-gray-200"
          >
            <span className="text-6xl mb-4">💼</span>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Corporate Events</h3>
            <p className="mb-4">Host business dinners, client meetings, or company parties with professional flair.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li>✨ A/V capabilities</li>
              <li>✨ Flexible seating arrangements</li>
              <li>✨ Discreet and efficient service</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl p-8 text-gray-800 dark:text-gray-200 border border-secondary"
        >
          <h3 className="text-2xl font-serif font-bold text-accent mb-4">Inquire About Your Event</h3>
          <p className="mb-4">Ready to plan your next event with us? Fill out the form below or contact our events team directly.</p>
          {/* A placeholder for a form or link to a form */}
          <a
            href="mailto:events@arevei.com?subject=Group Dining Inquiry"
            className="px-8 py-3 bg-accent text-white rounded-full font-semibold shadow hover:bg-primary transition-all duration-200"
          >
            Contact Our Events Team
          </a>
          <p className="mt-4 text-sm">Or call us at: (123) 456-7890</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default GroupDining; 