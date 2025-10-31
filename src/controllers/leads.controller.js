import Lead from '../models/Lead.js';
import { parseLeadsCsv } from '../services/csv/csvService.js';

export async function uploadLeads(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ success:false, error:'CSV file is required' });
    const leads = await parseLeadsCsv(req.file.buffer);
    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ success:false, error:'CSV appears empty' });
    }
    const required = ['name','role','company','industry','location','linkedin_bio'];
    const missing = required.filter(k => leads.some(l => !(k in l)));
    if (missing.length) {
      return res.status(400).json({ success:false, error:`Missing columns: ${missing.join(', ')}` });
    }
    const created = await Lead.insertMany(leads);
    res.json({ success:true, count: created.length });
  } catch (e) { next(e); }
}
