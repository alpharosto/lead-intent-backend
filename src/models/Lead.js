import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: String,
  role: String,
  company: String,
  industry: String,
  location: String,
  linkedin_bio: String
}, { timestamps: true });

export default mongoose.model('Lead', LeadSchema);
