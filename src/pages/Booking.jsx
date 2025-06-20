import React from 'react';
import { motion } from 'framer-motion';
import BookingForm from '../components/booking/BookingForm';

const Booking = () => {
  return (
    <div className="min-h-screen relative overflow-hidden py-12 px-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/images/pexels-kaboompics-6267.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-white/10 to-primary/30 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative flex justify-center"
        >
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="bg-black/60 rounded-2xl w-full h-full" />
          </div>
          <div className="relative z-10 py-8 px-4 w-full">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Reserve Your Table
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
              Experience the finest dining at Arevei Restaurant. Book your table now and prepare for an unforgettable culinary journey.
            </p>
          </div>
        </motion.div>

        <BookingForm />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-white/80"
        >
          <p className="mb-4">For parties larger than 10 or special events, please contact us directly:</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="tel:+1234567890" className="hover:text-white transition-colors">
              📞 (123) 456-7890
            </a>
            <a href="mailto:reservations@arevei.com" className="hover:text-white transition-colors">
              ✉️ reservations@arevei.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking; 