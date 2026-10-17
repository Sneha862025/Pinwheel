import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Share2 } from 'lucide-react';
import { useSavedPins } from '../hooks/usePins';

export default function PinCard({ pin }) {
  const { isSaved, toggleSave } = useSavedPins();
  const [broken, setBroken] = useState(false);
  const [copied, setCopied] = useState(false);
  const saved = isSaved(pin.id);
  const share = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}/pin/${pin.id}`); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard unavailable */ }
  };
  return (
    <article className="card">
      <div className="card-media">
        <Link to={`/pin/${pin.id}`} aria-label={`Open ${pin.title}`}>
          {broken ? <div className="img-fallback">Image unavailable</div>
            : <img src={pin.image} alt={pin.title} loading="lazy" onError={() => setBroken(true)} />}
        </Link>
        <button className={`save-btn${saved ? ' saved' : ''}`} onClick={() => toggleSave(pin.id)} aria-pressed={saved}>
          {saved ? 'Saved' : 'Save'}
        </button>
        <button className="icon-btn share-btn" onClick={share} aria-label="Copy link to pin">
          {copied ? <BookmarkCheck size={16} /> : <Share2 size={16} />}
        </button>
      </div>
      <div className="card-info">
        <Link to={`/pin/${pin.id}`} className="card-title">{pin.title}</Link>
        <Link to={`/u/${pin.creator.username}`} className="card-creator">{pin.creator.name}</Link>
      </div>
    </article>
  );
}
