import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  const messages = await Message.find({ roomId: req.params.roomId }).populate('author', 'name email').sort({ createdAt: 1 }).limit(100);
  res.json(messages);
};
