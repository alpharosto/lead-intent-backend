import Offer from '../../models/Offer.js';
import Result from '../../models/Result.js';
import { ruleScore } from './ruleScorer.js';
import { aiScore } from './aiScorer.js';

export async function scoreAllLeads(LeadModel) {
  const offer = await Offer.findOne();
  if (!offer) {
    const err = new Error('Offer not set. Use POST /offer first.');
    err.status = 400;
    throw err;
  }

  const leads = await LeadModel.find().lean();
  const results = [];

  // For big lists: consider concurrency limiting (p-limit) and retries
  for (const lead of leads) {
    const rScore = ruleScore(lead);
    const { intent, ai_points, reasoning } = await aiScore(lead, offer);
    const finalScore = Math.min(rScore + ai_points, 100);

    const saved = await Result.create({
      leadId: lead._id,
      intent,
      score: finalScore,
      reasoning,
      rule_score: rScore,
      ai_points
    });
    results.push(saved);
  }
  return results;
}
