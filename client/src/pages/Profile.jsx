import { useAuth } from '../context/AuthContext.jsx';
export default function Profile() {
  const { user } = useAuth();
  return <main className="page narrow"><section className="card profile"><div className="avatar">{user.name?.[0]}</div><h1>{user.name}</h1><p>{user.email}</p><span className="badge">{user.role}</span><p>This profile proves authenticated user state is working in the MERN app.</p></section></main>;
}
