import express from 'express';
import { createDiscussion, getDiscussion, getDiscussions, voteDiscussion } from '../controllers/discussionController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', getDiscussions);
router.post('/', protect, createDiscussion);
router.get('/:id', getDiscussion);
router.post('/:id/vote', protect, voteDiscussion);
export default router;
