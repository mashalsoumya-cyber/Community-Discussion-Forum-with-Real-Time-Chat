import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../src/config/db.js';
import User from '../src/models/User.js';
import Discussion from '../src/models/Discussion.js';
import Comment from '../src/models/Comment.js';
import Message from '../src/models/Message.js';

dotenv.config();
await connectDB();
await User.deleteMany();
await Discussion.deleteMany();
await Comment.deleteMany();
await Message.deleteMany();

const password = await bcrypt.hash('password123', 10);
const demo = await User.create({ name: 'Demo Student', email: 'demo@student.com', password });
const mod = await User.create({ name: 'Community Moderator', email: 'mod@forum.com', password, role: 'moderator' });

const d1 = await Discussion.create({
  title: 'How to prepare for MERN stack interviews?',
  content: 'Share resources, roadmaps, project ideas, and interview questions for MERN stack roles.',
  category: 'Career', tags: ['mern','interview','jobs'], author: demo._id
});
const d2 = await Discussion.create({
  title: 'Best ideas for final year full-stack projects',
  content: 'Let us list useful real-world full-stack projects with authentication, database, dashboard, and deployment.',
  category: 'Projects', tags: ['final-year','github','fullstack'], author: mod._id
});
await Comment.create({ discussion: d1._id, author: mod._id, content: 'Build 2-3 complete projects and explain authentication, APIs, database, and deployment clearly.' });
await Message.create({ roomId: 'general', author: demo._id, authorName: demo.name, text: 'Hello community! Welcome to the general chat.' });
console.log('Seed data inserted');
process.exit();
