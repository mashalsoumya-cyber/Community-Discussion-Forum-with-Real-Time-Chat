import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  try {
    const { discussionId, content } = req.body;
    const comment = await Comment.create({ discussion: discussionId, content, author: req.user._id });
    const populated = await comment.populate('author', 'name email');
    res.status(201).json(populated);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
