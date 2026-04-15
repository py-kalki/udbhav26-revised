"use client";

import { motion } from "framer-motion";
import { LogOut, User, LayoutDashboard, Settings } from "lucide-react";

interface DashboardHeaderProps {
  teamId: string;
  onLogout: () => void;
}

export const DashboardHeader = ({ teamId, onLogout }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-4 z-50 px-6 mt-4">
      <div className="glass-dark border-white/5 md:px-8 px-4 py-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
            <User className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              {teamId}
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold font-heading leading-tight">UDBHAV'26 Dashboard</h2>
            <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Control Center Active</p>
          </div>
        </div>

        <nav className="flex items-center gap-2 md:gap-6">
          <button className="p-2 text-white/50 hover:text-white transition-colors md:hidden">
            <LayoutDashboard className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Overview</a>
            <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Team</a>
            <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Project</a>
          </div>

          <div className="w-px h-6 bg-white/10 mx-2 hidden md:block" />

          <div className="flex items-center gap-3">
            <button className="p-2 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-3 py-2 rounded-xl transition-all text-xs font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">EXIT</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
