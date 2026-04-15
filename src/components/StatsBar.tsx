"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GlassCard } from "./ui/GlassCard";

const stats = [
  { label: "Prize Pool", value: 100000, suffix: "+", prefix: "₹" },
  { label: "Participants", value: 500, suffix: "+" },
  { label: "Hours of Hacking", value: 36, suffix: "" },
  { label: "Tracks", value: 6, suffix: "" },
];

const Counter = ({ value, duration = 2, prefix = "", suffix = "" }: { value: number; duration?: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalFrames = duration * 60;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setCount(Math.floor(end * progress));

        if (frame === totalFrames) {
          clearInterval(timer);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

export const StatsBar = () => {
  return (
    <div className="container mx-auto px-6 -mt-10 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="text-center py-8">
              <h3 className="text-3xl md:text-4xl font-heading font-black text-gradient mb-2">
                <Counter 
                  value={stat.value} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                />
              </h3>
              <p className="text-sm font-medium text-white/50 uppercase tracking-widest">
                {stat.label}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
