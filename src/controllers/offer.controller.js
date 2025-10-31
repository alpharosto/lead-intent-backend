import Offer from '../models/Offer.js';

export async function upsertOffer(req, res, next) {
  try {
    const { name, value_props = [], ideal_use_cases = [] } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'name is required' });

    const offer = await Offer.findOneAndUpdate(
      {},
      { name, value_props, ideal_use_cases },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: offer });
  } catch (e) { next(e); }
}
