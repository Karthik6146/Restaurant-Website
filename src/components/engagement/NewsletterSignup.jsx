import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LazyImage from "../common/LazyImage";

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [sms, setSms] = useState("");
  const [optIn, setOptIn] = useState("email");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (optIn === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (optIn === "sms" && !/^\+?\d{10,15}$/.test(sms)) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setEmail("");
    setSms("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto my-20 p-4 lg:p-8 bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-3xl overflow-hidden flex flex-col lg:flex-row items-center gap-8 border border-secondary/50"
    >
      <div className="lg:w-1/2 w-full h-64 lg:h-auto rounded-xl overflow-hidden shadow-lg flex-shrink-0">
        <LazyImage
          src="/assets/images/pexels-chanwalrus-958545.jpg"
          alt="Fine dining table setting"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="lg:w-1/2 w-full p-4 lg:p-0">
        <h2 className="text-4xl font-serif mb-6 text-center lg:text-left text-primary font-bold tracking-tight leading-tight">
          Stay in Touch
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-8 text-center lg:text-left text-lg">
          Join our newsletter for exclusive offers, new menu updates, and special event invitations.
        </p>
        <form onSubmit={handleSubmit} aria-label="Newsletter Signup" className="space-y-6">
          <div className="relative mb-6">
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${optIn === "email" ? "border-primary focus:border-accent" : "border-gray-300"}`}
              placeholder="Email Address"
              aria-label="Email address"
              required={optIn === "email"}
              disabled={optIn !== "email"}
              autoComplete="email"
            />
          </div>
          <div className="relative mb-6">
            <input
              id="sms-input"
              type="tel"
              value={sms}
              onChange={(e) => setSms(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${optIn === "sms" ? "border-primary focus:border-accent" : "border-gray-300"}`}
              placeholder="Phone Number"
              aria-label="Phone number"
              required={optIn === "sms"}
              disabled={optIn !== "sms"}
              autoComplete="tel"
            />
          </div>
          <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
            <motion.button
              type="button"
              aria-pressed={optIn === "email"}
              onClick={() => setOptIn("email")}
              className={`px-8 py-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary text-lg font-bold shadow-md ${
                optIn === "email" ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Email
            </motion.button>
            <motion.button
              type="button"
              aria-pressed={optIn === "sms"}
              onClick={() => setOptIn("sms")}
              className={`px-8 py-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary text-lg font-bold shadow-md ${
                optIn === "sms" ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              SMS
            </motion.button>
          </div>
          {error && <div className="text-center text-red-600 text-sm mb-4">{error}</div>}
          <motion.button
            type="submit"
            className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold text-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-primary hover:from-accent hover:to-primary transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Subscribe Now
          </motion.button>
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-center text-green-600 mt-4 text-lg font-semibold"
                role="status"
              >
                Thank you for subscribing!
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
}

export default NewsletterSignup; 