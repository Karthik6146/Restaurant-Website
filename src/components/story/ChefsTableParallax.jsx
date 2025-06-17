import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function ChefsTableParallax() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div className="relative h-screen overflow-hidden">
      <motion.div
        style={{
          y,
          backgroundImage: "url('/assets/images/chefs-table.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-6xl font-serif text-white">Chef's Table</h2>
      </div>
    </div>
  );
}

export default ChefsTableParallax; 