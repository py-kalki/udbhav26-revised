"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Coffee, Code, Presentation, Rocket, CheckCircle2, Circle } from "lucide-react";

const hackathonStagesRaw = [
  { time: "8:00–9:30 AM", title: "Doors Open", description: "Check-in & On-boarding", timestamp: "2026-04-25T08:00:00" },
  { time: "10:00 AM", title: "Kickoff", description: "Orientation Session", timestamp: "2026-04-25T10:00:00" },
  { time: "10:45 AM", title: "PS Drop", description: "Problem Statement Live — Teams Choose PS", timestamp: "2026-04-25T10:45:00" },
  { time: "11:00 AM–1:00 PM", title: "Build Sprint 1", description: "Hacking Begins — Thinking & Planning Phase (2H)", timestamp: "2026-04-25T11:00:00" },
  { time: "1:00–2:00 PM", title: "Lunch Break", description: "Meal Break", timestamp: "2026-04-25T13:00:00" },
  { time: "2:00–5:00 PM", title: "Build Sprint 2", description: "Deep Work Mode (3H)", timestamp: "2026-04-25T14:00:00" },
  { time: "5:00–6:00 PM", title: "Strategy Pivot", description: "Mentor Interaction + Snacks & Activity", timestamp: "2026-04-25T17:00:00" },
  { time: "6:00–8:00 PM", title: "Build Sprint 3", description: "Grind Mode (2H)", timestamp: "2026-04-25T18:00:00" },
  { time: "8:00 PM", title: "Power Dinner", description: "Dinner Break", timestamp: "2026-04-25T20:00:00" },
  { time: "9:00 PM–2:00 AM", title: "Build Sprint 4", description: "Midnight Push (5H) + Optional Midnight Snack", timestamp: "2026-04-25T21:00:00" },
  { time: "2:00 AM", title: "Demo Pitch", description: "Pitch Round + GitHub Submission Deadline", timestamp: "2026-04-26T02:00:00" },
  { time: "3:00–7:00 AM", title: "Final Sprint", description: "Last Stand — Final Build Phase (4H)", timestamp: "2026-04-26T03:00:00" },
  { time: "7:00–8:00 AM", title: "Final Pitch", description: "GitHub + Deck + Live Link Submission", timestamp: "2026-04-26T07:00:00" },
  { time: "8:00 AM", title: "Breakfast", description: "Recharge Before the Verdict", timestamp: "2026-04-26T08:00:00" },
  { time: "8:30 AM", title: "Results Drop", description: "Results Announced — Eliminated Teams Dismissed", timestamp: "2026-04-26T08:30:00" },
  { time: "9:00–10:00 AM", title: "Grand Presentation", description: "Final PPT Presentation Round", timestamp: "2026-04-26T09:00:00" },
  { time: "10:30–11:00 AM", title: "Closing Ceremony", description: "Prize Distribution & Grand Finale", timestamp: "2026-04-26T10:30:00" },
];

export const DashboardTimeline = () => {
  const [stages, setStages] = useState(hackathonStagesRaw.map(s => ({ ...s, status: "upcoming" })));
  const [nextPhase, setNextPhase] = useState<{title: string, time: string} | null>(null);

  useEffect(() => {
    const updateTimeline = () => {
      // Use real current time
      const now = new Date().getTime();

      const updatedStages = hackathonStagesRaw.map((stage, idx) => {
        const stageTime = new Date(stage.timestamp).getTime();
        const nextStageTime = idx < hackathonStagesRaw.length - 1 ? new Date(hackathonStagesRaw[idx + 1].timestamp).getTime() : Infinity;
        
        let status = "upcoming";
        if (now >= stageTime && now < nextStageTime) {
          status = "current";
        } else if (now >= nextStageTime) {
          status = "completed";
        }

        return { ...stage, status };
      });

      setStages(updatedStages);

      const upcomingStage = updatedStages.find(s => s.status === "upcoming");
      if (upcomingStage) {
        setNextPhase({ title: upcomingStage.title, time: upcomingStage.time });
      }
    };

    updateTimeline();
    const interval = setInterval(updateTimeline, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-dark border-white/5 p-6 rounded-3xl h-full flex flex-col max-h-[600px]">
      <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2 shrink-0">
        <Rocket className="w-5 h-5 text-secondary" /> EVENT TIMELINE
      </h3>

      <div className="space-y-6 relative overflow-y-auto pr-4 flex-1 custom-scrollbar">
        {/* Continuous Line */}
        <div className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent" />

        {stages.map((stage, index) => (
          <motion.div
            key={stage.title + index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex gap-4 relative"
          >
            <div className="relative z-10 flex items-start pt-0.5 justify-center bg-background shrink-0">
              {stage.status === "completed" ? (
                <CheckCircle2 className="w-[26px] h-[26px] text-green-500 bg-background rounded-full" />
              ) : stage.status === "current" ? (
                <div className="w-[26px] h-[26px] rounded-full border-2 border-primary flex items-center justify-center bg-background">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                </div>
              ) : (
                <Circle className="w-[26px] h-[26px] text-white/20 bg-background rounded-full" />
              )}
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between mb-1 gap-2">
                <span className={`text-[10px] font-bold tracking-widest shrink-0 ${
                  stage.status === "current" ? "text-primary" : "text-white/30"
                }`}>
                  {stage.time}
                </span>
                {stage.status === "current" && (
                  <span className="text-[9px] font-black text-primary animate-pulse shrink-0">LIVE</span>
                )}
              </div>
              <h4 className={`text-sm font-bold ${
                stage.status === "upcoming" ? "text-white/40" : "text-white"
              }`}>
                {stage.title}
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${
                stage.status === "upcoming" ? "text-white/20" : "text-white/60"
              }`}>
                {stage.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Coffee className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Next Phase</p>
            <p className="text-xs font-bold text-white">
              {nextPhase ? `${nextPhase.title} @ ${nextPhase.time}` : "Hackathon Completed"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
