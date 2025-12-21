"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ChallengeCardProps {
  title: string;
  description: string;
  imageSrc: string;
  onClick?: () => void;
}

export function ChallengeCard({
  title,
  description,
  imageSrc,
  onClick,
}: ChallengeCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-gradient-to-br from-[#d4ff00] to-[#b8e600] rounded-3xl p-5 mb-6 relative overflow-hidden cursor-pointer"
    >
      <div className="relative z-10">
        <p className="text-sm font-semibold text-black/70 mb-1">{title}</p>
        <p className="text-black font-bold text-lg">{description}</p>
      </div>
      <div className="absolute right-0 -bottom-10 w-44 h-44">
        <Image src={imageSrc} alt="Challenge" fill className="object-contain" />
      </div>
    </motion.div>
  );
}
