import React from "react";
import { motion } from "framer-motion";

function Button({ children, onClick, className, ariaLabel, type = "button" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-full ${className}`}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

export default Button; 