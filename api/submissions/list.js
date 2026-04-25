/**
 * api/submissions/list.js
 * ─────────────────────────────────────────────────────────────────────────────
 * GET /api/submissions/list
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { connectDB } from '../lib/mongodb.js';
import { Team } from '../models/Team.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const secret = req.headers['x-admin-secret'];
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    await connectDB();

    // Find all teams that have a submittedAt timestamp in projectSubmissions
    const teams = await Team.find({
      'projectSubmissions.submittedAt': { $ne: null }
    }).sort({ 'projectSubmissions.submittedAt': -1 }).lean();

    const submissions = teams.map(t => ({
      teamId: t.code || t.teamName,
      type: 'final-project',
      status: 'Final',
      finalSubmitted: true,
      githubLink: t.projectSubmissions.github,
      projectLink: t.projectSubmissions.deployed,
      videoLink: t.projectSubmissions.video,
      createdAt: t.projectSubmissions.submittedAt,
      description: `Team: ${t.teamName}\nCollege: ${t.collegeName}`
    }));

    return res.status(200).json({
      success: true,
      submissions,
    });
  } catch (err) {
    console.error('[/api/submissions/list] Error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}
