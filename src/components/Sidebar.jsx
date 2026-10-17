import { NavLink, Link } from 'react-router-dom';
import { Home, Compass, PlusSquare, Bookmark, User, Pin } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/create', label: 'Create', icon: PlusSquare },
  { to: '/saved', label: 'Saved', icon: Bookmark },
  { to: '/profile', label: 'Profile', icon: User },
];
export default function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Main">
      <Link to="/" className="brand"><Pin size={24} /><span>Pinwheel</span></Link>
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} end className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <Icon size={22} /><span>{label}</span>
        </NavLink>
      ))}
      <p className="demo-note">Demo app. No accounts. Data stays in your browser.</p>
    </nav>
  );
}
