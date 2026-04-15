"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Users,
  BookOpen,
  Presentation,
  Rocket,
  HelpCircle,
  Sparkles,
  Lock
} from "lucide-react";

interface FeatureGridProps {
  onAction: (type: string) => void;
}

export const FeatureGrid = ({ onAction }: FeatureGridProps) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      id: "leaderboard",
      title: "Leaderboard",
      icon: Trophy,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      status: "active",
      description: "Real-time rankings"
    },
    {
      id: "ppt-submission",
      title: "PPT Submission",
      icon: Presentation,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      status: currentTime >= new Date("2026-04-25T21:00:00").getTime() ? "active" : "coming-soon",
      description: "Round 1 Milestone"
    },
    {
      id: "project-submission",
      title: "Project Submission",
      icon: Rocket,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      status: currentTime >= new Date("2026-04-26T02:00:00").getTime() ? "active" : "coming-soon",
      description: "Final Project Link"
    },
    {
      id: "resources",
      title: "Resources",
      icon: BookOpen,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      status: "active",
      description: "APIs & Documentation"
    },
    {
      id: "mentorship",
      title: "Mentorship",
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      status: currentTime >= new Date("2026-04-25T17:00:00").getTime() ? "active" : "coming-soon",
      description: "Book a 1:1 session"
    },
    {
      id: "ai-assistant",
      title: "AI Assistant",
      icon: Sparkles,
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/20",
      status: "coming-soon",
      description: "Hackathon Copilot"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => feature.status === "active" && onAction(feature.id)}
          className={`group relative glass-dark border-white/5 p-6 rounded-2xl cursor-pointer hover:border-white/20 transition-all ${feature.status === "coming-soon" ? "opacity-60 grayscale cursor-not-allowed" : ""
            }`}
        >
          {feature.status === "coming-soon" && (
            <div className="absolute top-3 right-3">
              <Lock className="w-3 h-3 text-white/30" />
            </div>
          )}

          <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
            <feature.icon className={`w-5 h-5 ${feature.color}`} />
          </div>

          <h4 className="text-sm font-bold font-heading mb-1">{feature.title}</h4>
          <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{feature.description}</p>

          {feature.status === "coming-soon" && (
            <div className="mt-3">
              <div className="inline-block px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold text-white/30">
                COMING SOON
              </div>
            </div>
          )}
        </motion.div>
      ))}

      {/* Help Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="col-span-2 md:col-span-3 glass border-dashed border-primary/30 p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">Stuck on something?</h5>
            <p className="text-[10px] text-white/50">Our tech support team is available 24/7 on Discord.</p>
          </div>
        </div>
        <div className="bg-primary px-3 py-1 rounded-lg text-[10px] font-bold text-white group-hover:bg-primary/80 transition-colors">
          GET HELP
        </div>
      </motion.div>
    </div>
  );
};
