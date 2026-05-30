import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function CreateDiscussion() {
  const [form, setForm] = useState({ title:'', content:'', category:'General', tags:'' });
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean) };
    const { data } = await api.post('/discussions', payload);
    navigate(`/discussion/${data._id}`);
  };
  return <main className="page narrow"><form className="card form" onSubmit={submit}><h1>Create Discussion</h1><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Discussion title" required/><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>General</option><option>Career</option><option>Projects</option><option>College</option><option>Support</option></select><textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})} placeholder="Write your discussion details..." required/><input value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} placeholder="Tags separated by comma: react,node,mongodb"/><button>Create Discussion</button></form></main>;
}
