"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap } from "lucide-react";

interface TeamEntryProps {
  onJoin: (teamId: string) => void;
}

export const TeamEntry = ({ onJoin }: TeamEntryProps) => {
  const [teamId, setTeamId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamId.trim()) {
      onJoin(teamId);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow-accent opacity-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="glass p-8 md:p-12 rounded-3xl border-white/10 relative overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-px">
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="text-center mb-10">
              <h1 className="text-3xl font-heading font-black mb-3">
                MISSION <span className="text-gradient">DASHBOARD</span>
              </h1>
              <p className="text-white/50 text-sm">
                Enter your Team ID to access the command center and track your progress.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="teamId" className="text-xs font-bold tracking-widest text-white/40 uppercase ml-1">
                  Team Identifier Code
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                  <input
                    type="text"
                    id="teamId"
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                    placeholder="e.g. UDB-00XX-XXXX"
                    className="relative w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-mono tracking-wider"
                    required
                  />
                  <Zap className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-hover:text-primary transition-colors" />
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full h-14 bg-white text-black font-black font-heading rounded-xl overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                  INITIALIZE SYSTEM <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-xs text-white/30 italic">
                Secure access protocol enabled. Your status will be tracked for the duration of UDBHAV'26.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
