import { env } from '../../config/env.js';

function includesAny(hay = '', needles = []) {
  const h = (hay || '').toLowerCase();
  return needles.some(n => h.includes(n.toLowerCase()));
}

export function ruleScore(lead) {
  let score = 0;

  
  const role = (lead.role || '').toLowerCase();
  if (includesAny(role, env.decisionMakerRoles)) score += 20;
  else if (includesAny(role, env.influencerRoles)) score += 10;

  
  const industry = (lead.industry || '').toLowerCase();
  const icp = env.icpIndustries.map(s => s.toLowerCase());
  if (icp.some(i => i === industry)) score += 20;
  else if (includesAny(industry, icp)) score += 10;


  const required = ['name','role','company','industry','location','linkedin_bio'];
  const complete = required.every(k => (lead[k] ?? '').toString().trim().length > 0);
  if (complete) score += 10;

  return Math.min(score, 50);
}
