import { Link } from 'react-router-dom';
export default function DiscussionCard({ discussion }) {
  return (
    <Link to={`/discussion/${discussion._id}`} className="card discussion-card">
      <div className="badge">{discussion.category}</div>
      <h3>{discussion.title}</h3>
      <p>{discussion.content.slice(0, 130)}...</p>
      <div className="meta">
        <span>By {discussion.author?.name || 'Unknown'}</span>
        <span>{discussion.votes?.length || 0} votes</span>
      </div>
      <div className="tags">{discussion.tags?.map(t => <span key={t}>#{t}</span>)}</div>
    </Link>
  );
}
