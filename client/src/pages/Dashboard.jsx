import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import DiscussionCard from '../components/DiscussionCard.jsx';

export default function Dashboard() {
  const [discussions, setDiscussions] = useState([]);
  const [search, setSearch] = useState('');
  const load = async () => {
    const { data } = await api.get(`/discussions?search=${search}`);
    setDiscussions(data);
  };
  useEffect(() => { load(); }, []);
  return <main className="page"><section className="hero"><div><h1>Community Discussion Forum with Real-Time Chat</h1><p>Create discussions, comment with others, and chat instantly in live rooms.</p><Link to="/create" className="primary-link">Start a Discussion</Link></div><div className="stats"><b>{discussions.length}</b><span>active discussions</span></div></section><section className="toolbar"><input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==='Enter' && load()} placeholder="Search discussions, tags, career, projects..."/><button onClick={load}>Search</button></section><section className="grid">{discussions.map(d => <DiscussionCard key={d._id} discussion={d}/>)}</section></main>;
}
