"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Star, MessageCircle, Calendar, Briefcase, ChevronRight, Video } from "lucide-react";

interface MentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
}

// Mock Database for Mentor Status
// In a real app, this would be fetched from the backend using the teamId
const mockMentorStatus: Record<string, boolean> = {};

export const MentorModal = ({ isOpen, onClose, teamId }: MentorModalProps) => {
  const [hasOptedIn, setHasOptedIn] = useState(mockMentorStatus[teamId] || false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOptIn = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "mentorship",
          teamId,
          submissionLink: "opt-in", // Placeholder for opt-in
          description: "Mentorship program opt-in request",
          isLeader: true,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to opt-in");
      
      setHasOptedIn(true);
    } catch (error) {
      console.error("Mentorship Opt-in Error:", error);
      alert("Failed to connect to mentorship systems. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const mentorDetails = {
    name: "Dr. Aisha Rahman",
    role: "Principal Engineer @ TechCorp",
    expertise: ["System Architecture", "AI/ML", "React/Next.js"],
    availability: "Available for 1:1 until 6:00 PM",
    bio: "Specializes in scalable microservices and real-time AI inference. Previous hackathon winner.",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-dark border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Users className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-lg font-black font-heading tracking-tight">MENTORSHIP PROGRAM</h2>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Expert Guidance</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-white/40 hover:text-white" />
              </button>
            </div>

            <div className="p-8">
              {!hasOptedIn ? (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                    <Star className="w-10 h-10 text-orange-500" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-black font-heading mb-2">UNLOCK MENTORSHIP</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-6">
                      Running into roadblocks? Need architecture validation? Opt-in to get matched with an industry expert for a 1:1 technical review session.
                    </p>
                  </div>

                  <button
                    onClick={handleOptIn}
                    disabled={isProcessing}
                    className="group relative w-full h-14 bg-white text-black font-black font-heading rounded-xl overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black group-hover:border-white border-t-transparent rounded-full animate-spin" />
                          MATCHING EXPERT...
                        </>
                      ) : (
                        <>
                          OPT-IN NOW <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 p-px shadow-lg">
                      <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center font-heading font-black text-2xl">
                        AR
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-heading">{mentorDetails.name}</h3>
                      <p className="text-xs text-orange-500 font-bold flex items-center gap-1 mt-1">
                        <Briefcase className="w-3 h-3" /> {mentorDetails.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-white/60 leading-relaxed italic">
                    "{mentorDetails.bio}"
                  </p>

                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-3">Core Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentorDetails.expertise.map((skill) => (
                        <span key={skill} className="bg-white/5 border border-white/10 text-xs font-medium px-3 py-1.5 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-bold text-white">Status: <span className="text-green-500">Online</span></p>
                      <p className="text-xs text-white/50">{mentorDetails.availability}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl py-3 text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/20">
                      <Video className="w-4 h-4" /> JOIN MEET
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl py-3 text-xs flex items-center justify-center gap-2 transition-colors border border-white/5">
                      <MessageCircle className="w-4 h-4" /> SEND MESSAGE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
