import React, { useState } from "react";
import { motion } from "framer-motion";

function LazyImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`relative ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${isLoaded ? "blur-none" : "blur-lg"}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </motion.div>
  );
}

export default LazyImage; 