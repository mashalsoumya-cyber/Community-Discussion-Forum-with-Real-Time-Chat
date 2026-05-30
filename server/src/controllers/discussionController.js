import Discussion from '../models/Discussion.js';
import Comment from '../models/Comment.js';

export const getDiscussions = async (req, res) => {
  const { search = '', category = '' } = req.query;
  const query = {
    ...(search ? { $or: [{ title: new RegExp(search, 'i') }, { content: new RegExp(search, 'i') }, { tags: new RegExp(search, 'i') }] } : {}),
    ...(category ? { category } : {})
  };
  const discussions = await Discussion.find(query).populate('author', 'name email').sort({ createdAt: -1 });
  res.json(discussions);
};

export const createDiscussion = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const discussion = await Discussion.create({ title, content, category, tags: tags || [], author: req.user._id });
    const populated = await discussion.populate('author', 'name email');
    res.status(201).json(populated);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getDiscussion = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id).populate('author', 'name email');
  if (!discussion) return res.status(404).json({ message: 'Discussion not found' });
  const comments = await Comment.find({ discussion: req.params.id }).populate('author', 'name email').sort({ createdAt: 1 });
  res.json({ discussion, comments });
};

export const voteDiscussion = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(404).json({ message: 'Discussion not found' });
  const userId = req.user._id.toString();
  const voted = discussion.votes.some(id => id.toString() === userId);
  if (voted) discussion.votes = discussion.votes.filter(id => id.toString() !== userId);
  else discussion.votes.push(req.user._id);
  await discussion.save();
  res.json({ votes: discussion.votes.length, voted: !voted });
};
