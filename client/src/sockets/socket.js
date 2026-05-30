import { io } from 'socket.io-client';
export const createSocket = () => io('http://localhost:5000', { autoConnect: false });
