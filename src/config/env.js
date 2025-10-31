import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGODB_URI,
  openAiKey: process.env.OPENAI_API_KEY || '',
  icpIndustries: (process.env.ICP_INDUSTRIES || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean),
  decisionMakerRoles: (process.env.DECISION_MAKER_ROLES || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean),
  influencerRoles: (process.env.INFLUENCER_ROLES || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
};
