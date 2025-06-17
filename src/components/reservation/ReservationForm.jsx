import React, { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "reservations"), formData);
      alert("Reservation submitted successfully!");
      setFormData({ name: "", email: "", date: "", time: "" });
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("Failed to submit reservation. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        type="submit"
        className="w-full p-2 bg-primary text-white rounded"
      >
        Book Now
      </motion.button>
    </form>
  );
}

export default ReservationForm; 