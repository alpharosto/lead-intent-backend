import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  intent: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  score: { type: Number, min: 0, max: 100, required: true },
  reasoning: { type: String },
  rule_score: Number,
  ai_points: Number
}, { timestamps: true });

export default mongoose.model('Result', ResultSchema);
