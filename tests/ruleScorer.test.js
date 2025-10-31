import { ruleScore } from '../src/services/scoring/ruleScorer.js';


process.env.ICP_INDUSTRIES = 'B2B SaaS mid-market,Fintech,SaaS';
process.env.DECISION_MAKER_ROLES = 'Head of Growth,VP Growth,CMO,Head of Marketing,Founder,CEO';
process.env.INFLUENCER_ROLES = 'Growth Manager,Marketing Manager,Demand Gen,Product Marketing';

const full = {
  name: 'A',
  role: 'Head of Growth',
  company: 'X',
  industry: 'B2B SaaS mid-market',
  location: 'Bengaluru',
  linkedin_bio: 'Bio'
};

test('decision maker + exact industry + complete = 50', () => {
  const s = ruleScore(full);
  expect(s).toBe(50);
});

test('influencer + adjacent industry + complete = 30', () => {
  const lead = { ...full, role: 'Growth Manager', industry: 'SaaS platform' };
  const s = ruleScore(lead);
  expect(s).toBe(30);
});

test('missing field costs 10 points', () => {
  const lead = { ...full, linkedin_bio: '' };
  const s = ruleScore(lead);
  expect(s).toBe(40);
});
