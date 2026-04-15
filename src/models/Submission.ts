import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  teamId: string;
  submissionLink: string;
  type: string;
  description?: string;
  isLeader: boolean;
  submittedAt: Date;
}

const SubmissionSchema: Schema = new Schema({
  teamId: { 
    type: String, 
    required: [true, "Team ID is required"],
    index: true 
  },
  submissionLink: { 
    type: String, 
    required: [true, "Submission link is required"] 
  },
  type: { 
    type: String, 
    required: [true, "Submission type is required"],
    enum: ["ppt-submission", "project-submission"]
  },
  description: { 
    type: String 
  },
  isLeader: { 
    type: Boolean, 
    required: [true, "Leader verification is required"],
    default: false
  },
  submittedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Avoid model recompilation errors during Next.js hot reloads
export const Submission = mongoose.models.Submission || mongoose.model<ISubmission>("Submission", SubmissionSchema);
