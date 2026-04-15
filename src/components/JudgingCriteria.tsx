"use client";

import { AnimatedSection } from "./ui/AnimatedSection";
import { GlassCard } from "./ui/GlassCard";
import { 
  Target, 
  Lightbulb, 
  Code2, 
  Presentation, 
  Zap,
  Layers
} from "lucide-react";

const criteria = [
  {
    title: "Technological Complexity",
    description: "Quality of code, architectural design, and effective use of advanced technologies.",
    icon: Code2,
    percent: "30%",
  },
  {
    title: "Innovation & Originality",
    description: "How unique and creative is the solution compared to existing market products?",
    icon: Lightbulb,
    percent: "25%",
  },
  {
    title: "Impact & Feasibility",
    description: "Potential impact on the target audience and the practicality of the solution.",
    icon: Target,
    percent: "20%",
  },
  {
    title: "User Experience",
    description: "Design aesthetics, intuitiveness, and the overall feel of the product.",
    icon: Layers,
    percent: "15%",
  },
  {
    title: "Pitch & Presentation",
    description: "Ability of the team to clearly communicate their vision and project value.",
    icon: Presentation,
    percent: "10%",
  },
];

export const JudgingCriteria = () => {
  return (
    <AnimatedSection id="judging" className="bg-background/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 uppercase">
            Judging <span className="text-gradient">Criteria</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            What are our judges looking for? Here are the key metrics used to evaluate your hard work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {criteria.map((item, index) => (
            <GlassCard key={item.title} className="group hover:border-accent/50">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-lg glass bg-white/5 group-hover:bg-accent/10 transition-colors">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <span className="text-2xl font-black font-heading text-white/10 group-hover:text-accent/20 transition-colors">
                  {item.percent}
                </span>
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed font-body">
                {item.description}
              </p>
            </GlassCard>
          ))}
          
          <GlassCard className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 p-8">
            <Zap className="w-12 h-12 text-primary mb-4 animate-float" />
            <h3 className="text-xl font-bold font-heading mb-2">Ready to Impress?</h3>
            <p className="text-white/60 text-sm mb-6">
              Final projects will be pitched directly to a panel of expert judges.
            </p>
            <button className="text-primary font-bold text-sm tracking-widest uppercase hover:underline">
              Download Full Rubric
            </button>
          </GlassCard>
        </div>
      </div>
    </AnimatedSection>
  );
};
