# Community Discussion Forum with Real-Time Chat

A complete MERN Stack project where users can register, login, create discussion posts, comment on discussions, and chat live using Socket.IO.

## Problem Statement
Students, communities, companies, and online groups often use separate tools for discussions and instant chat. This project combines forum-style discussions with real-time messaging in one platform.

## Features
- User registration and login
- JWT authentication
- Community dashboard
- Create and view discussions
- Tags, categories, votes, and comments
- Real-time chat rooms using Socket.IO
- Typing indicator
- Online users count
- Notification panel
- User profile page
- MongoDB database integration
- Clean responsive UI

## Tech Stack
Frontend: React, Vite, React Router, Axios, Socket.IO Client, CSS

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Socket.IO

## Folder Structure
```text
Community-Discussion-Forum-RealTime-Chat/
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── sockets/
│   └── package.json
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── sockets/
│   ├── config/
│   └── package.json
├── docs/
├── README.md
├── .gitignore
└── package.json
```

## Environment Setup
Create `server/.env` from `server/.env.example`.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/community_forum_chat
JWT_SECRET=change_this_secret
CLIENT_URL=http://localhost:5173
```

## How to Run in VS Code

### 1. Open project
```bash
cd Community-Discussion-Forum-RealTime-Chat
code .
```

### 2. Install dependencies
```bash
npm install
npm run install-all
```

### 3. Start MongoDB
Use MongoDB Compass or run local MongoDB service. Database URL:
```bash
mongodb://127.0.0.1:27017/community_forum_chat
```

### 4. Add sample data
```bash
npm run seed
```

### 5. Run frontend and backend together
```bash
npm run dev
```

Open:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Demo Login
```text
Email: demo@student.com
Password: password123
```

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get logged-in user |
| GET | /api/discussions | List discussions |
| POST | /api/discussions | Create discussion |
| GET | /api/discussions/:id | Discussion details |
| POST | /api/discussions/:id/vote | Vote discussion |
| POST | /api/comments | Add comment |
| GET | /api/messages/:roomId | Get chat messages |

## Socket.IO Events
| Event | Use |
|---|---|
| room:join | Join chat room |
| message:send | Send message |
| message:new | Receive message |
| typing | Typing indicator |
| users:online | Online users count |

## Screenshots to Capture
- Register page
- Login page
- Dashboard
- Create discussion page
- Discussion detail page
- Comment section
- Real-time chat
- MongoDB Compass data
- GitHub repo preview

## Interview Explanation
This project is a full-stack community platform. Users can create forum discussions, comment on posts, and communicate instantly through Socket.IO-based real-time chat. The backend uses Express and MongoDB with JWT authentication, while the frontend uses React and Axios for API communication. It demonstrates CRUD operations, authentication, database modeling, protected routes, and real-time communication.

## Future Enhancements
- Admin moderation dashboard
- File sharing
- Emojis and reactions
- Push notifications
- AI content moderation
- Deployment on Render/Vercel
