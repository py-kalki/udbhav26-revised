"use client";

import { AnimatedSection } from "./ui/AnimatedSection";
import { GlassCard } from "./ui/GlassCard";
import { CheckCircle2, Trophy, Users, Zap } from "lucide-react";

const features = [
  {
    title: "Innovate",
    description: "Build cutting-edge solutions for real-world problems.",
    icon: Zap,
    color: "text-primary",
  },
  {
    title: "Network",
    description: "Connect with industry leaders and fellow developers.",
    icon: Users,
    color: "text-secondary",
  },
  {
    title: "Compete",
    description: "Battle it out for the grand prize pool of ₹1,00,000+.",
    icon: Trophy,
    color: "text-accent",
  },
];

export const About = () => {
  return (
    <AnimatedSection id="about" className="bg-background relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-8 leading-tight">
              WHAT IS <br />
              <span className="text-gradient uppercase tracking-tighter">UDBHAV'26?</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed font-body">
              UDBHAV'26 is the flagship national-level hackathon organized by G.L. Bajaj Institute of Technology and Management. 
              It's a platform where innovation meets execution, bringing together the brightest minds from across the country 
              to solve complex challenges and push the boundaries of technology.
            </p>
            
            <div className="space-y-4">
              {[
                "36 Hours of Non-stop Hacking",
                "Mentorship from Industry Experts",
                "Grand Prize Pool & Swags",
                "Internship Opportunities",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/80 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {features.map((feature, index) => (
              <GlassCard key={feature.title} className="flex items-start gap-6 group">
                <div className={`p-4 rounded-xl glass ${feature.color} group-hover:bg-white/10 transition-colors`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
