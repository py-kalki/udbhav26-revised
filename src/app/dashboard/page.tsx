"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TeamEntry } from "@/components/dashboard/TeamEntry";
import { PSCountdown } from "@/components/dashboard/PSCountdown";
import { DashboardTimeline } from "@/components/dashboard/DashboardTimeline";
import { FeatureGrid } from "@/components/dashboard/FeatureGrid";
import { SubmissionModal } from "@/components/dashboard/SubmissionModal";
import { MentorModal } from "@/components/dashboard/MentorModal";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [teamId, setTeamId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSubmission, setActiveSubmission] = useState<string | null>(null);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);

  const [stats, setStats] = useState({ points: 1250, rank: 42 });

  useEffect(() => {
    // Check for team ID in localStorage
    const savedTeamId = localStorage.getItem("udbhav_team_id");
    if (savedTeamId) {
      setTeamId(savedTeamId);
      fetchStats(savedTeamId);
    }
    setIsLoading(false);
  }, []);

  const fetchStats = async (id: string) => {
    try {
      const res = await fetch(`/api/submissions?teamId=${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const handleJoin = (id: string) => {
    localStorage.setItem("udbhav_team_id", id);
    setTeamId(id);
    fetchStats(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("udbhav_team_id");
    setTeamId(null);
  };

  const handleFeatureAction = (id: string) => {
    if (id === "ppt-submission" || id === "project-submission") {
      setActiveSubmission(id);
    } else if (id === "mentorship") {
      setIsMentorModalOpen(true);
    } else {
      console.log("Feature action:", id);
    }
  };

  // Target date: Problem Statement Drop on April 25, 10:45 AM
  const [targetDate] = useState(() => {
    return new Date("2026-04-25T10:45:00");
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#030303] text-foreground selection:bg-primary/30 overflow-hidden">
      {/* Background Layers */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-grain pointer-events-none" />
      
      {/* Aurora Glows/Mesh Gradient */}
      <div className="fixed top-[-10%] left-[-10%] bg-glow-primary animate-pulse pointer-events-none opacity-60" />
      <div className="fixed bottom-[10%] right-[-5%] bg-glow-secondary animate-pulse pointer-events-none opacity-40" style={{ animationDelay: "2s" }} />
      <div className="fixed top-[20%] right-[10%] bg-glow-accent animate-pulse pointer-events-none opacity-30" style={{ animationDelay: "4s" }} />
      <div className="fixed bottom-[-10%] left-[20%] bg-glow-primary animate-pulse pointer-events-none opacity-20" style={{ animationDelay: "1s" }} />

      <AnimatePresence mode="wait">
        {!teamId ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <TeamEntry onJoin={handleJoin} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full max-w-7xl mx-auto"
          >
            <DashboardHeader teamId={teamId} onLogout={handleLogout} />
            
            <div className="px-6 py-8 space-y-8">
              {/* Top Section: Countdown & Hero Stats */}
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <PSCountdown targetDate={targetDate} />
              </section>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left/Middle Column: Features & Quick Links */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-black font-heading tracking-tight flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-primary"></span>
                      COMMAND CENTER
                    </h2>
                    <FeatureGrid onAction={handleFeatureAction} />
                  </div>
                </div>

                {/* Right Column: Timeline & Side Info */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-black font-heading tracking-tight flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-secondary"></span>
                      ROADMAP
                    </h2>
                    <DashboardTimeline />
                  </div>
                  
                  {/* Stats Placeholder */}
                  <div className="glass-dark border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-sm font-bold font-heading mb-4 uppercase tracking-[0.2em] text-white/40">Team Status</h3>
                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-white/60">Rank</span>
                        <span className="text-2xl font-black font-heading text-gradient">#{stats.rank}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-white/60">Points</span>
                        <span className="text-2xl font-black font-heading">{stats.points.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Modal */}
            <SubmissionModal
              isOpen={!!activeSubmission}
              onClose={() => setActiveSubmission(null)}
              type={activeSubmission || ""}
              teamId={teamId}
            />

            {/* Mentor Modal */}
            <MentorModal
              isOpen={isMentorModalOpen}
              onClose={() => setIsMentorModalOpen(false)}
              teamId={teamId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

