"use client";

import { AnimatedSection } from "./ui/AnimatedSection";
import { GlassCard } from "./ui/GlassCard";
import { 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Leaf, 
  HeartPulse, 
  Lightbulb 
} from "lucide-react";

const tracks = [
  {
    title: "AI & Machine Learning",
    description: "Build intelligent systems that solve complex problems using data and algorithms.",
    icon: Cpu,
    color: "from-blue-500/20 to-cyan-500/20",
    id: "ai-ml",
  },
  {
    title: "Web3 & Blockchain",
    description: "Revolutionize digital ownership and decentralized finance with blockchain technology.",
    icon: Globe,
    color: "from-purple-500/20 to-pink-500/20",
    id: "web3",
  },
  {
    title: "Cyber Security",
    description: "Create robust defense mechanisms to protect systems and data from cyber threats.",
    icon: ShieldCheck,
    color: "from-red-500/20 to-orange-500/20",
    id: "cyber",
  },
  {
    title: "Sustainable Tech",
    description: "Develop green solutions to combat climate change and promote environmental health.",
    icon: Leaf,
    color: "from-green-500/20 to-emerald-500/20",
    id: "green",
  },
  {
    title: "HealthTech",
    description: "Innovate the healthcare industry with tech-driven diagnostic and patient care tools.",
    icon: HeartPulse,
    color: "from-rose-500/20 to-pink-500/20",
    id: "health",
  },
  {
    title: "Open Innovation",
    description: "Have a unique idea that doesn't fit? This track is for anything revolutionary.",
    icon: Lightbulb,
    color: "from-yellow-500/20 to-amber-500/20",
    id: "open",
  },
];

export const Tracks = () => {
  return (
    <AnimatedSection id="tracks" className="bg-background/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">
            HACKATHON <span className="text-gradient">TRACKS</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Choose a challenge that excites you. Whether it's AI, Blockchain, or 
            Sustainable Tech, we have a place for your disruptive ideas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <GlassCard 
              key={track.id} 
              className={`relative overflow-hidden group border-white/5 hover:border-white/20`}
            >
              {/* Decorative Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
              
              <div className="p-4 rounded-2xl glass w-fit mb-6 bg-white/5 group-hover:bg-white/10 transition-colors">
                <track.icon className="w-8 h-8 text-white/90" />
              </div>
              
              <h3 className="text-2xl font-bold font-heading mb-4 group-hover:text-primary transition-colors">
                {track.title}
              </h3>
              <p className="text-white/50 leading-relaxed font-body">
                {track.description}
              </p>

              <div className="mt-8 flex items-center gap-2 text-white/40 text-sm font-medium">
                <span className="w-8 h-px bg-white/10" />
                <span>Learn More</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
