import { Link } from 'react-router-dom';
import { Pin } from 'lucide-react';
import SearchBar from './SearchBar';
import { usePins } from '../hooks/usePins';

export default function Navbar() {
  const { profile } = usePins();
  return (
    <header className="topbar">
      <Link to="/" className="brand mobile-brand" aria-label="Pinwheel home"><Pin size={22} /></Link>
      <SearchBar />
      <Link to="/profile" className="avatar" aria-label="Your profile">{profile.name.charAt(0).toUpperCase()}</Link>
    </header>
  );
}
