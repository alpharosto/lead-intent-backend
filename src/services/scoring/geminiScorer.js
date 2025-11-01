import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../config/env.js";

const genAI = new GoogleGenerativeAI(env.geminiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function parseIntent(text) {
  const t = (text || "").toLowerCase();
  if (t.includes("high")) return "High";
  if (t.includes("medium")) return "Medium";
  return "Low";
}

function pointsFor(intent) {
  if (intent === "High") return 50;
  if (intent === "Medium") return 30;
  return 10;
}

export async function geminiScore(lead, offer) {
  try {
    const prompt = `
You are a B2B sales analyst. Be concise.
Classify lead intent for the given offer.

Offer:
- name: ${offer?.name}
- value_props: ${offer?.value_props?.join(", ")}
- ideal_use_cases: ${offer?.ideal_use_cases?.join(", ")}

Lead:
- name: ${lead.name}
- role: ${lead.role}
- company: ${lead.company}
- industry: ${lead.industry}
- location: ${lead.location}
- bio: ${lead.linkedin_bio}

Respond ONLY in JSON:
{"intent":"High|Medium|Low","reason":"1–2 short sentences explaining why"}
    `.trim();

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    try {
      const parsed = JSON.parse(responseText);
      const intent = parsed.intent || parseIntent(responseText);
      return { intent, ai_points: pointsFor(intent), reasoning: parsed.reason };
    } catch {
      const intent = parseIntent(responseText);
      return { intent, ai_points: pointsFor(intent), reasoning: responseText };
    }
  } catch (err) {
    console.error("⚠️ Gemini API error:", err.message);
    const role = (lead.role || "").toLowerCase();
    const intent = role.includes("head") || role.includes("vp")
      ? "High"
      : role.includes("manager")
      ? "Medium"
      : "Low";
    return {
      intent,
      ai_points: pointsFor(intent),
      reasoning: "Fallback: Gemini error, inferred from role.",
    };
  }
}
