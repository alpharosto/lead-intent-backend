import OpenAI from 'openai';
import { env } from '../../config/env.js';

const openai = new OpenAI({ apiKey: env.openAiKey });

function parseIntent(text) {
  const t = (text || '').toLowerCase();
  if (t.includes('high')) return 'High';
  if (t.includes('medium')) return 'Medium';
  return 'Low';
}

function pointsFor(intent) {
  if (intent === 'High') return 50;
  if (intent === 'Medium') return 30;
  return 10;
}

export async function aiScore(lead, offer) {
  const system = `You are a B2B sales analyst. Be concise.`;
  const user = `
Offer:
- name: ${offer?.name}
- value_props: ${offer?.value_props?.join(', ') || 'N/A'}
- ideal_use_cases: ${offer?.ideal_use_cases?.join(', ') || 'N/A'}

Prospect:
- name: ${lead.name}
- role: ${lead.role}
- company: ${lead.company}
- industry: ${lead.industry}
- location: ${lead.location}
- linkedin_bio: ${lead.linkedin_bio}

Task:
Classify intent as one of: High, Medium, Low.
Then explain in 1–2 sentences why. Output JSON:
{"intent":"High|Medium|Low","reason":"..."}
`.trim();

  const resp = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
    temperature: 0.2
  });

  const content = resp.choices?.[0]?.message?.content || '';
  try {
    const parsed = JSON.parse(content);
    const intent = parsed.intent || parseIntent(content);
    return { intent, ai_points: pointsFor(intent), reasoning: parsed.reason || content };
  } catch {
    const intent = parseIntent(content);
    return { intent, ai_points: pointsFor(intent), reasoning: content };
  }
}
