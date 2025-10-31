import Lead from '../models/Lead.js';
import { scoreAllLeads } from '../services/scoring/scorePipeline.js';

export async function runScoring(req, res, next) {
  try {
    const results = await scoreAllLeads(Lead);
    res.json({ success: true, count: results.length });
  } catch (e) { next(e); }
}
