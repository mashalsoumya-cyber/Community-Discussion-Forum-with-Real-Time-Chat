# VS Code Execution Guide

## Step 1: Requirements
Install:
- Node.js LTS
- VS Code
- MongoDB Community Server or MongoDB Compass

## Step 2: Open terminal
```bash
cd Community-Discussion-Forum-RealTime-Chat
code .
```

## Step 3: Install packages
```bash
npm install
npm run install-all
```

## Step 4: Configure backend
Create this file: `server/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/community_forum_chat
JWT_SECRET=super_secret_key_123
CLIENT_URL=http://localhost:5173
```

## Step 5: Start MongoDB
Open MongoDB Compass and connect to:
```text
mongodb://127.0.0.1:27017
```

## Step 6: Insert demo data
```bash
npm run seed
```

## Step 7: Run project
```bash
npm run dev
```

## Step 8: Open browser
```text
http://localhost:5173
```

## Common Errors

### MongoDB connection failed
Start MongoDB service or check MONGO_URI.

### Port already in use
Change backend PORT in `server/.env` or close the app using the port.

### Blank frontend page
Run:
```bash
cd client
npm install
npm run dev
```

### API not working
Run backend separately:
```bash
cd server
npm run dev
```
