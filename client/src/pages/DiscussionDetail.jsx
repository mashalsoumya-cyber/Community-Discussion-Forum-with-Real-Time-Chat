import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function DiscussionDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const load = async () => { const { data } = await api.get(`/discussions/${id}`); setDiscussion(data.discussion); setComments(data.comments); };
  useEffect(() => { load(); }, [id]);
  const addComment = async (e) => { e.preventDefault(); const { data } = await api.post('/comments', { discussionId: id, content }); setComments([...comments, data]); setContent(''); };
  const vote = async () => { const { data } = await api.post(`/discussions/${id}/vote`); setDiscussion({ ...discussion, votes: Array(data.votes).fill('x') }); };
  if (!discussion) return <main className="page"><p>Loading...</p></main>;
  return <main className="page narrow"><article className="card detail"><span className="badge">{discussion.category}</span><h1>{discussion.title}</h1><p>{discussion.content}</p><div className="tags">{discussion.tags?.map(t => <span key={t}>#{t}</span>)}</div><div className="meta"><span>By {discussion.author?.name}</span><button onClick={vote} disabled={!user}>⬆ {discussion.votes?.length || 0} Vote</button><Link to="/chat">Join Live Chat</Link></div></article><section className="card comments"><h2>Comments</h2>{comments.map(c => <div className="comment" key={c._id}><b>{c.author?.name}</b><p>{c.content}</p></div>)}{user ? <form onSubmit={addComment} className="comment-form"><textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Write a helpful comment..." required/><button>Add Comment</button></form> : <p><Link to="/login">Login</Link> to comment.</p>}</section></main>;
}
