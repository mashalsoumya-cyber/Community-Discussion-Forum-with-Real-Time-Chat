import Message from '../models/Message.js';

const onlineByRoom = new Map();

export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    socket.on('room:join', ({ roomId = 'general', user }) => {
      socket.join(roomId);
      socket.data.roomId = roomId;
      socket.data.user = user;
      const users = onlineByRoom.get(roomId) || new Set();
      users.add(socket.id);
      onlineByRoom.set(roomId, users);
      io.to(roomId).emit('users:online', users.size);
      socket.to(roomId).emit('notification:new', `${user?.name || 'Someone'} joined the room`);
    });

    socket.on('typing', ({ roomId = 'general', userName }) => {
      socket.to(roomId).emit('typing', `${userName} is typing...`);
    });

    socket.on('message:send', async ({ roomId = 'general', text, user }) => {
      if (!text?.trim()) return;
      const message = await Message.create({ roomId, text, author: user?.id, authorName: user?.name || 'Guest' });
      io.to(roomId).emit('message:new', message);
      io.to(roomId).emit('notification:new', `New message from ${message.authorName}`);
    });

    socket.on('disconnect', () => {
      const roomId = socket.data.roomId;
      if (!roomId) return;
      const users = onlineByRoom.get(roomId);
      if (users) {
        users.delete(socket.id);
        io.to(roomId).emit('users:online', users.size);
      }
    });
  });
};
