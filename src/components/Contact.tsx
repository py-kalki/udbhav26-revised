"use client";

import { AnimatedSection } from "./ui/AnimatedSection";
import { GlassCard } from "./ui/GlassCard";
import { Mail, Phone, ExternalLink, Network, Camera, X } from "lucide-react";

const organizers = [
  {
    name: "Dr. Sandeep Gupta",
    role: "Faculty Coordinator",
    email: "sandeep.gupta@glbitm.ac.in",
    linkedin: "#",
    image: "",
  },
  {
    name: "Aryan Sharma",
    role: "Tech Lead",
    email: "aryan.sharma@example.com",
    linkedin: "#",
    image: "",
  },
  {
    name: "Isha Verma",
    role: "Event Management",
    email: "isha.verma@example.com",
    linkedin: "#",
    image: "",
  },
];

export const Contact = () => {
  return (
    <AnimatedSection id="contact" className="bg-background/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-8 leading-tight">
              GET IN <br />
              <span className="text-gradient uppercase">TOUCH</span>
            </h2>
            <p className="text-lg text-white/50 mb-12 font-body max-w-lg">
              Have questions about the event, registration, or sponsorship? 
              Our team is here to help you around the clock.
            </p>

            <div className="space-y-6">
              <GlassCard className="flex items-center gap-6 group hover:border-primary/50">
                <div className="p-4 rounded-xl glass bg-white/5 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Email Us</p>
                  <p className="text-lg font-bold">udbhav@glbitm.ac.in</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-center gap-6 group hover:border-secondary/50">
                <div className="p-4 rounded-xl glass bg-white/5 group-hover:bg-secondary/20 transition-colors">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Call Us</p>
                  <p className="text-lg font-bold">+91 98765 43210</p>
                </div>
              </GlassCard>
            </div>

            <div className="mt-12">
              <p className="text-sm font-bold tracking-[0.2em] uppercase text-white/20 mb-6">
                Follow the journey
              </p>
              <div className="flex gap-4">
                {[Camera, X, Network].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors group">
                    <Icon className="w-5 h-5 text-white/60 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Organizers */}
          <div className="grid gap-6">
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-white/20 mb-2 md:text-right">
              Our Core Team
            </p>
            {organizers.map((person) => (
              <GlassCard key={person.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl glass bg-white/5 overflow-hidden flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <div className="text-white/10 font-black text-2xl uppercase">
                      {person.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading">{person.name}</h4>
                    <p className="text-sm text-white/50">{person.role}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/30 hover:text-white">
                    <Network className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/30 hover:text-white">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </GlassCard>
            ))}
            
            <button className="mt-4 flex items-center justify-center gap-2 text-primary font-bold tracking-widest uppercase text-sm hover:underline md:self-end">
              <span>See Full Organizing Committee</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
