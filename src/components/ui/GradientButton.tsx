"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const GradientButton = ({
  children,
  variant = "primary",
  className,
  size = "md",
  ...props
}: GradientButtonProps) => {
  // Omit motion-conflicting props from the spread
  const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...buttonProps } = props as any;

  const variants = {
    primary: "bg-gradient-to-r from-primary via-accent to-secondary text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-bold",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full transition-all duration-300",
        variants[variant],
        sizes[size],
        className
      )}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
};
