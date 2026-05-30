import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  roomId: { type: String, default: 'general' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: { type: String, default: 'Guest' },
  text: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
