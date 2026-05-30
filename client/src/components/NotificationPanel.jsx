export default function NotificationPanel({ notifications }) {
  return (
    <aside className="card notifications">
      <h3>Live Notifications</h3>
      {notifications.length === 0 && <p>No new notifications yet.</p>}
      {notifications.slice(-5).reverse().map((n, i) => <div className="notice" key={i}>{n}</div>)}
    </aside>
  );
}
