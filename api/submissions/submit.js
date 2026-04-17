/**
 * api/submissions/submit.js
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /api/submissions/submit
 * Body: { teamCode, pptLink, liveLink }
 *
 * Verifies the team exists + payment is confirmed, then upserts the submission.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { connectDB }   from '../lib/mongodb.js';
import { Team }        from '../models/Team.js';
import { Submission }  from '../models/Submission.js';

const URL_RE = /^https?:\/\/.+/i;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const { teamCode, pptLink, liveLink } = req.body || {};

  if (!teamCode) return res.status(400).json({ error: 'team_code_required', message: 'Team code is required.' });
  if (!pptLink && !liveLink) return res.status(400).json({ error: 'no_links', message: 'At least one link required.' });
  if (pptLink  && !URL_RE.test(pptLink))  return res.status(400).json({ error: 'invalid_ppt_link',  message: 'PPT link must start with http:// or https://' });
  if (liveLink && !URL_RE.test(liveLink)) return res.status(400).json({ error: 'invalid_live_link', message: 'Live link must start with http:// or https://' });

  const code = String(teamCode).trim().toUpperCase();

  try {
    await connectDB();

    // Verify team exists
    const team = await Team.findOne({ code }).lean();
    if (!team) return res.status(404).json({ error: 'team_not_found', message: 'Team not found. Check your team code.' });

    // Verify payment done — check Team record (same source as team-dashboard API)
    if (team.paymentStatus !== 'paid') {
      return res.status(403).json({ error: 'payment_pending', message: 'Payment not confirmed. Complete registration first.' });
    }

    // Upsert submission
    const doc = await Submission.findOneAndUpdate(
      { teamCode: code },
      {
        $set: {
          teamCode:    code,
          teamName:    team.teamName || code,
          pptLink:     pptLink  ? pptLink.trim()  : undefined,
          liveLink:    liveLink ? liveLink.trim()  : undefined,
          submittedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Submission saved!',
      submission: {
        teamCode:  doc.teamCode,
        teamName:  doc.teamName,
        pptLink:   doc.pptLink,
        liveLink:  doc.liveLink,
        submittedAt: doc.submittedAt,
      },
    });

  } catch (err) {
    console.error('[submissions/submit]', err);
    return res.status(500).json({ error: 'server_error', message: 'Server error. Please try again.' });
  }
}
