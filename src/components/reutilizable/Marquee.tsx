"use client";

import { motion } from "framer-motion";

export default function Marquee({ time = 8, banners }: { time?: number, banners?: string[] }) {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-black bg-marquee w-full py-2 -mt-4 animate-flashColors">
      <motion.div
        className="inline-block text-base uppercase font-roboto relative z-0"
        animate={{ x: ["0%", "-100%"] }} // va de derecha a izquierda
        transition={{
          repeat: Infinity,    // 🔁 infinito
          repeatType: "loop",
          duration: time,         // velocidad (más bajo = más rápido)
          ease: "linear",
        }}
      >
        {banners && banners.map((banner, index) => (
          <span key={index} className="mx-12">{banner}</span>
        ))}
      </motion.div>
    </div>
  );
}
