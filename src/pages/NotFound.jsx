import { Link } from 'react-router-dom';

export default function NotFound({ message = 'That page doesn’t exist.' }) {
  return (
    <div className="empty">
      <h1>Page not found</h1>
      <p>{message}</p>
      <Link to="/" className="btn primary">Go home</Link>
    </div>
  );
}
