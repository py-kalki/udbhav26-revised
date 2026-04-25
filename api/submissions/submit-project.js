/**
 * api/submissions/submit-project.js
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /api/submissions/submit-project
 *
 * Saves unified project submissions (GitHub, Deployed, Video) to the Team object.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { connectDB } from '../lib/mongodb.js';
import { Team } from '../models/Team.js';
import { ScheduleConfig } from '../models/ScheduleConfig.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { teamId, github, deployed, video } = req.body || {};

  if (!teamId) {
    return res.status(400).json({ success: false, error: 'Team ID is required' });
  }
  
  if (!github || !deployed || !video) {
    return res.status(400).json({ success: false, error: 'All three submission links are required' });
  }

  try {
    await connectDB();

    // Verify submissions are open
    const config = await ScheduleConfig.findOne({ _id: 'singleton' });
    if (!config || !config.submissionsOpen) {
      return res.status(403).json({ success: false, error: 'Submissions are currently closed' });
    }

    const team = await Team.findOne({ code: teamId.toUpperCase() });
    
    if (!team) {
      return res.status(404).json({ success: false, error: 'Team not found' });
    }

    // Check if already submitted
    if (team.projectSubmissions && team.projectSubmissions.submittedAt) {
      return res.status(400).json({
        success: false,
        error: 'Project submissions have already been finalized. No further changes allowed.',
      });
    }

    // Update team with submissions
    team.projectSubmissions = {
      github: github || null,
      deployed: deployed || null,
      video: video || null,
      submittedAt: new Date()
    };

    await team.save();

    return res.status(200).json({
      success: true,
      team,
      message: 'Final project submissions recorded successfully!',
    });
  } catch (err) {
    console.error('[/api/submissions/submit-project] Error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}
