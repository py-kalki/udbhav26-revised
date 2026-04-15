"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "./ui/AnimatedSection";
import { Clock, Flag, Trophy, Rocket, Code2, Users2 } from "lucide-react";

const events = [
  {
    title: "Registration Opens",
    date: "Sept 15, 2026",
    description: "Start forming your teams and register for the first round on Unstop.",
    icon: Flag,
    status: "Completed",
  },
  {
    title: "Round 1: Idea Submission",
    date: "Oct 10, 2026",
    description: "Submit your innovative ideas and architecture blueprints for review.",
    icon: Lightbulb,
    status: "Upcoming",
  },
  {
    title: "Finalist Announcement",
    date: "Nov 01, 2026",
    description: "Top teams will be selected for the 36-hour offline hackathon.",
    icon: Trophy,
    status: "Upcoming",
  },
  {
    title: "UDBHAV'26 Hackathon Day 1",
    date: "Nov 15, 2026",
    description: "The grind begins. 36 hours of non-stop innovation at GLBITM campus.",
    icon: Code2,
    status: "Upcoming",
  },
  {
    title: "UDBHAV'26 Hackathon Day 2",
    date: "Nov 16, 2026",
    description: "Mentorship sessions, mid-point reviews, and late-night coding.",
    icon: Users2,
    status: "Upcoming",
  },
  {
    title: "Grand Finale & Prizes",
    date: "Nov 17, 2026",
    description: "Final presentations to judges followed by the mega award ceremony.",
    icon: Rocket,
    status: "Upcoming",
  },
];

import { Lightbulb } from "lucide-react"; // Re-importing just in case

export const Timeline = () => {
  return (
    <AnimatedSection id="timeline" className="bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">
            EVENT <span className="text-gradient">TIMELINE</span>
          </h2>
          <p className="text-white/50">
            Mark your calendars. Here is the roadmap to UDBHAV'26.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary opacity-30" />

          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-center justify-between md:justify-normal group ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="w-[calc(100%-40px)] md:w-[45%] pl-10 md:pl-0">
                  <div className={`glass p-6 rounded-2xl border-white/5 group-hover:border-primary/50 transition-colors ${
                    index % 2 === 0 ? "md:text-left" : "md:text-right"
                  }`}>
                    <div className={`flex items-center gap-3 mb-2 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}>
                      <span className="text-primary text-sm font-bold tracking-widest uppercase">
                        {event.date}
                      </span>
                      {event.status === "Completed" && (
                        <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-0.5 rounded-full border border-green-500/20">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold font-heading mb-2">{event.title}</h3>
                    <p className="text-white/50 text-sm font-body leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-primary z-10">
                  <event.icon className="w-5 h-5 text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
