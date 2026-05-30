import { useEffect, useRef, useState } from 'react';
import api from '../services/api.js';
import { createSocket } from '../sockets/socket.js';
import { useAuth } from '../context/AuthContext.jsx';
import NotificationPanel from '../components/NotificationPanel.jsx';

export default function Chat() {
  const { user } = useAuth();
  const [roomId, setRoomId] = useState('general');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState('');
  const [online, setOnline] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    api.get(`/messages/${roomId}`).then(({data}) => setMessages(data));
    const socket = createSocket();
    socketRef.current = socket;
    socket.connect();
    socket.emit('room:join', { roomId, user });
    socket.on('message:new', msg => setMessages(prev => [...prev, msg]));
    socket.on('typing', msg => { setTyping(msg); setTimeout(()=>setTyping(''), 1500); });
    socket.on('users:online', setOnline);
    socket.on('notification:new', n => setNotifications(prev => [...prev, n]));
    return () => socket.disconnect();
  }, [roomId]);

  const send = (e) => {
    e.preventDefault();
    socketRef.current.emit('message:send', { roomId, text, user });
    setText('');
  };
  const handleTyping = (e) => {
    setText(e.target.value);
    socketRef.current?.emit('typing', { roomId, userName: user.name });
  };
  return <main className="page chat-layout"><section className="card chat-card"><div className="chat-head"><div><h1>#{roomId}</h1><p>{online} users online</p></div><select value={roomId} onChange={e=>setRoomId(e.target.value)}><option value="general">general</option><option value="mern-stack">mern-stack</option><option value="project-help">project-help</option><option value="career">career</option></select></div><div className="messages">{messages.map(m => <div className="message" key={m._id || m.createdAt}><b>{m.authorName || m.author?.name || 'User'}</b><p>{m.text}</p></div>)}</div><div className="typing">{typing}</div><form onSubmit={send} className="send-box"><input value={text} onChange={handleTyping} placeholder="Type your message..."/><button>Send</button></form></section><NotificationPanel notifications={notifications}/></main>;
}
