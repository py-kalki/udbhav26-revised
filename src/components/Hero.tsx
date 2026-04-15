"use client";

import { motion } from "framer-motion";
import { GradientButton } from "./ui/GradientButton";
import { MousePointer2, Calendar, MapPin } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-white/80 text-sm font-medium mb-8"
        >
          <MousePointer2 className="w-4 h-4 text-accent" />
          <span>India's Most Innovative Hackathon</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-heading font-black tracking-tighter mb-6"
        >
          CODE THE <br />
          <span className="text-gradient">FUTURE</span> WITH US
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-body"
        >
          Join 500+ developers, designers, and innovators for a 36-hour sprint 
          of creation, collaboration, and competition at UDBHAV'26.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <GradientButton size="lg">
            Register for Round 2
          </GradientButton>
          <GradientButton variant="secondary" size="lg">
            View Schedule
          </GradientButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto border-t border-white/5 pt-12"
        >
          <div className="flex items-center justify-center gap-4 group">
            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm text-white/40 uppercase tracking-widest">Date</p>
              <p className="text-xl font-bold font-heading">November 15-17, 2026</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 group">
            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <MapPin className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-left">
              <p className="text-sm text-white/40 uppercase tracking-widest">Location</p>
              <p className="text-xl font-bold font-heading">GLBITM Campus, Greater Noida</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
