"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value?: string | number;
  subtitle?: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
  children?: ReactNode;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  delay = 0,
  children,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ delay, type: "spring" }}
      className={`bg-gradient-to-br ${gradient} p-5 rounded-3xl relative overflow-hidden`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-black/80 mb-1">{title}</p>
          {value && (
            <>
              <p className="text-3xl font-black text-black">{value}</p>
              {subtitle && <p className="text-xs text-black/70">{subtitle}</p>}
            </>
          )}
        </div>
        <Icon className="w-8 h-8 text-black/50" />
      </div>
      {children}
    </motion.div>
  );
}
