import { Link, NavLink } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <Link to="/" className="brand"><MessageSquare size={24}/> ForumChat</Link>
      <div className="navlinks">
        <NavLink to="/">Dashboard</NavLink>
        {user && <NavLink to="/create">Create</NavLink>}
        {user && <NavLink to="/chat">Live Chat</NavLink>}
        {user && <NavLink to="/profile">Profile</NavLink>}
        {!user ? <NavLink to="/login">Login</NavLink> : <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}
