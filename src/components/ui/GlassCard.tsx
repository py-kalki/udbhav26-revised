"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        hover && "hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
