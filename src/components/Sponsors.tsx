"use client";

import { AnimatedSection } from "./ui/AnimatedSection";
import { GlassCard } from "./ui/GlassCard";
import { ExternalLink } from "lucide-react";

const tiers = [
  {
    name: "Platinum",
    size: "h-32",
    sponsors: [
      { name: "Google Cloud", logo: "" },
      { name: "Postman", logo: "" },
    ],
  },
  {
    name: "Gold",
    size: "h-24",
    sponsors: [
      { name: "Snyk", logo: "" },
      { name: "GitHub", logo: "" },
      { name: "DigitalOcean", logo: "" },
    ],
  },
  {
    name: "Silver",
    size: "h-16",
    sponsors: [
      { name: "Auth0", logo: "" },
      { name: "Twilio", logo: "" },
      { name: "Devfolio", logo: "" },
      { name: "Polygon", logo: "" },
    ],
  },
];

export const Sponsors = () => {
  return (
    <AnimatedSection id="sponsors" className="bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 uppercase">
            Our <span className="text-gradient">Sponsors</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Supported by industry leaders who believe in the power of innovation 
            and the future of technology.
          </p>
        </div>

        <div className="space-y-16">
          {tiers.map((tier) => (
            <div key={tier.name} className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold tracking-[0.3em] uppercase text-white/20 whitespace-nowrap">
                  {tier.name} Partners
                </span>
                <div className="h-px w-full bg-white/5" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {tier.sponsors.map((sponsor, i) => (
                  <GlassCard 
                    key={sponsor.name} 
                    className="flex flex-col items-center justify-center group h-auto hover:border-white/20"
                  >
                    <div className={`${tier.size} w-full glass rounded-xl flex items-center justify-center mb-4 bg-white/[0.02] overflow-hidden relative`}>
                      {/* Logo Placeholder */}
                      <span className="text-white/10 font-black text-xl md:text-2xl group-hover:text-white/20 transition-colors uppercase italic">
                        {sponsor.name}
                      </span>
                      
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-grid opacity-10" />
                    </div>
                    <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-wider group-hover:text-primary transition-colors cursor-pointer">
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}

          {/* Call to action */}
          <div className="pt-12 flex justify-center">
            <GlassCard className="py-10 px-12 text-center max-w-2xl border-dashed border-2 border-white/10 hover:border-primary/50 bg-transparent">
              <h3 className="text-2xl font-bold font-heading mb-4 italic">Want to sponsor UDBHAV'26?</h3>
              <p className="text-white/50 mb-8">
                Empower the next generation of innovators and get exclusive access to top tech talent.
              </p>
              <button className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all scale-100 hover:scale-105">
                Download Brochure
              </button>
            </GlassCard>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
