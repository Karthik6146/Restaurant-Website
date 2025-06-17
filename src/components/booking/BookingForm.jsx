import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    partySize: '2',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement booking submission logic
    console.log('Booking submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">Make a Reservation</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Party Size</label>
          <select
            name="partySize"
            value={formData.partySize}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Special Requests</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-accent transition-colors"
        >
          Confirm Reservation
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BookingForm; 