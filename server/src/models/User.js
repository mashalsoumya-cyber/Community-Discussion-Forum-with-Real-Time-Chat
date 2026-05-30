import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin','moderator','member'], default: 'member' },
  bio: { type: String, default: 'Community member' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
