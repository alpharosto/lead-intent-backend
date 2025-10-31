import Result from '../models/Result.js';
import { Parser } from 'json2csv';

export async function listResults(req, res, next) {
  try {
    const results = await Result.find().populate('leadId').sort({ createdAt: -1 }).lean();
    const rows = results.map(r => ({
      name: r.leadId?.name,
      role: r.leadId?.role,
      company: r.leadId?.company,
      industry: r.leadId?.industry,
      location: r.leadId?.location,
      intent: r.intent,
      score: r.score,
      reasoning: r.reasoning
    }));

    if ((req.query.format || '').toLowerCase() === 'csv') {
      const parser = new Parser();
      const csv = parser.parse(rows);
      res.header('Content-Type', 'text/csv');
      res.attachment('results.csv');
      return res.send(csv);
    }

    res.json(rows);
  } catch (e) { next(e); }
}
