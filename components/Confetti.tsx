"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function Confetti() {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
  ];
  const confettiCount = 50;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {Array.from({ length: confettiCount }).map((_, i) => {
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 2 + Math.random() * 2;
        const randomRotate = Math.random() * 360;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: `${randomX}%`,
              top: "-10px",
              backgroundColor: randomColor,
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{
              y: window.innerHeight + 20,
              opacity: 0,
              rotate: randomRotate,
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: "easeIn",
            }}
          />
        );
      })}
    </div>
  );
}
