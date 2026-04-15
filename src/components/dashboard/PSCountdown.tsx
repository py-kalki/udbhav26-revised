"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle, Terminal, Download, ExternalLink } from "lucide-react";

interface PSCountdownProps {
  targetDate: Date;
}

export const PSCountdown = ({ targetDate }: PSCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  });

  const [isReleased, setIsReleased] = useState(false);
  const [selectedPS, setSelectedPS] = useState<null | { title: string; track: string; description: string }>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, total: 0 });
        setIsReleased(true);
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds, total: distance });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Mocking the "Selection" after release
  useEffect(() => {
    if (isReleased) {
      setTimeout(() => {
        setSelectedPS({
          title: "Intelligent Traffic Management System",
          track: "Smart Cities & IoT",
          description: "Develop an AI-powered system that optimizes traffic lights in real-time based on traffic density using computer vision and edge computing."
        });
      }, 2000);
    }
  }, [isReleased]);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isReleased ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="glass-dark border-primary/20 p-8 rounded-3xl overflow-hidden relative"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px]" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Clock className="w-5 h-5 animate-pulse" />
                  <span className="text-xs font-bold tracking-[0.3em] uppercase">Deployment Countdown</span>
                </div>
                <h3 className="text-2xl font-black font-heading">PROBLEM STATEMENTS DROPPING</h3>
                <p className="text-white/40 text-sm mt-1">Get ready to choose your challenge.</p>
              </div>

              <div className="flex gap-4">
                {[
                  { label: "HRS", value: timeLeft.hours },
                  { label: "MIN", value: timeLeft.minutes },
                  { label: "SEC", value: timeLeft.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="flex flex-col items-center">
                    <div className="w-16 h-20 md:w-20 md:h-24 glass rounded-2xl flex items-center justify-center border-white/10 mb-2">
                      <span className="text-3xl md:text-4xl font-black font-heading text-gradient">
                        {unit.value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">{unit.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ps-released"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {!selectedPS ? (
              <div className="glass-dark border-accent/20 p-8 rounded-3xl flex items-center justify-center gap-4">
                <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-lg font-bold font-heading text-accent">DECRYPTING STATEMENTS...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Selected PS */}
                <div className="md:col-span-2 glass-dark border-green-500/20 p-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6">
                    <CheckCircle2 className="w-12 h-12 text-green-500/20" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-500/20">
                      SELECTED CHALLENGE
                    </div>
                    <span className="text-white/30 text-[10px] font-bold tracking-widest uppercase">{selectedPS.track}</span>
                  </div>

                  <h3 className="text-3xl font-black font-heading mb-4 text-white">
                    {selectedPS.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-8">
                    {selectedPS.description}
                  </p>

                  <div className="flex gap-3">
                    <button className="bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-primary/80 transition-all flex items-center gap-2">
                      <Download className="w-4 h-4" /> DOWNLOAD BRIEF
                    </button>
                    <button className="glass text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" /> VIEW RESOURCES
                    </button>
                  </div>
                </div>

                {/* Status Sidebar */}
                <div className="glass-dark border-white/5 p-6 rounded-3xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold font-heading mb-4 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-primary" /> SYSTEM LOGS
                    </h4>
                    <div className="space-y-3 font-mono text-[10px]">
                      <div className="text-green-500/60 flex gap-2">
                        <span className="text-white/20">[14:02]</span> PS Release protocol verified.
                      </div>
                      <div className="text-green-500/60 flex gap-2">
                        <span className="text-white/20">[14:05]</span> Team selection confirmed.
                      </div>
                      <div className="text-white/40 flex gap-2 italic">
                        <span className="text-white/20">[14:10]</span> Awaiting first commit...
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-white/30 uppercase">Submission Status</span>
                      <span className="text-[10px] font-bold text-red-500 uppercase">PENDING</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
