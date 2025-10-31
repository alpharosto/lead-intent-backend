import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value_props: [{ type: String }],
  ideal_use_cases: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Offer', OfferSchema);
