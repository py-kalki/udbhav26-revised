"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Link as LinkIcon, Send, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string; // 'ppt-submission' | 'project-submission'
  teamId: string;
}

export const SubmissionModal = ({ isOpen, onClose, type, teamId }: SubmissionModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    submissionLink: "",
    description: "",
    isLeader: false,
  });

  const isPpt = type === "ppt-submission";
  const title = isPpt ? "PPT SUBMISSION" : "PROJECT SUBMISSION";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isLeader) {
      setError("Only the Team Leader can submit the project.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type,
          teamId,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ submissionLink: "", description: "", isLeader: false });
      }, 3000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
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
            {/* Success Overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-20 bg-background/95 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black font-heading mb-2">SUBMISSION RECEIVED</h3>
                  <p className="text-white/50 text-sm">
                    Your {isPpt ? "PPT" : "Project"} has been securely uploaded to our servers.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isPpt ? "bg-blue-500/20" : "bg-green-500/20"}`}>
                  <Upload className={`w-5 h-5 ${isPpt ? "text-blue-500" : "text-green-500"}`} />
                </div>
                <div>
                  <h2 className="text-lg font-black font-heading tracking-tight">{title}</h2>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Team: {teamId}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-white/40 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-1 flex items-center gap-2">
                  <LinkIcon className="w-3 h-3" /> Submission URL (Google Drive / GitHub)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formData.submissionLink}
                  onChange={(e) => setFormData({ ...formData, submissionLink: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase ml-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Any specific instructions for the judges..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all text-sm resize-none"
                />
              </div>

              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    id="isLeader"
                    checked={formData.isLeader}
                    onChange={(e) => setFormData({ ...formData, isLeader: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 accent-primary cursor-pointer"
                  />
                </div>
                <label htmlFor="isLeader" className="text-xs text-white/60 leading-relaxed cursor-pointer select-none">
                  <span className="font-bold text-white block mb-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-primary" /> Authority Check
                  </span>
                  I confirm that I am the **Team Leader** and have the authority to submit on behalf of the team.
                </label>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold"
                >
                  <AlertCircle className="w-4 h-4" /> {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full h-14 bg-white text-black font-black font-heading rounded-xl overflow-hidden hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black group-hover:border-white border-t-transparent rounded-full animate-spin" />
                      UPLOADING...
                    </>
                  ) : (
                    <>
                      FINAL SUBMIT <Send className="w-5 h-5" />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="px-8 pb-8 text-center">
              <p className="text-[10px] text-white/20 uppercase font-medium">
                Note: You can re-submit before the deadline. Only the latest submission will be considered.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
