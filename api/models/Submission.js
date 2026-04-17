/**
 * api/models/Submission.js
 * ─────────────────────────────────────────────────────────────────────────────
 * One submission per team (upsert by teamCode).
 * Stores PPT link and live demo link submitted via the Team Dashboard.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema(
  {
    teamCode:  { type: String, required: true, trim: true, uppercase: true, unique: true, index: true },
    teamName:  { type: String, trim: true, default: '' },
    pptLink:   { type: String, trim: true, default: '' },
    liveLink:  { type: String, trim: true, default: '' },
    submittedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: 'submissions',
  }
);

export const Submission =
  mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
