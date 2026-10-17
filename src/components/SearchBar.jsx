import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { usePins } from '../hooks/usePins';
import { getSuggestions } from '../utils/pinHelpers';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const { pins } = usePins();
  const navigate = useNavigate();
  const suggestions = getSuggestions(pins, q);
  const go = (term) => {
    setQ(term);
    setOpen(false);
    navigate(`/explore?q=${encodeURIComponent(term.trim())}`);
  };
  return (
    <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); go(q); }}>
      <Search size={18} aria-hidden="true" />
      <input
        type="search" aria-label="Search pins" placeholder="Search pins, tags, categories"
        value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((s) => (
            <li key={s}><button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => go(s)}>{s}</button></li>
          ))}
        </ul>
      )}
    </form>
  );
}
