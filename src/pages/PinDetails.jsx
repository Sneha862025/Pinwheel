import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PinGrid from '../components/PinGrid';
import { usePins, useSavedPins } from '../hooks/usePins';
import { relatedPins } from '../utils/pinHelpers';
import NotFound from './NotFound';

export default function PinDetails() {
  const { id } = useParams();
  const { pins } = usePins();
  const { isSaved, toggleSave } = useSavedPins();
  const navigate = useNavigate();
  const [broken, setBroken] = useState(false);
  const pin = pins.find((p) => p.id === id);
  const related = useMemo(() => (pin ? relatedPins(pins, pin) : []), [pins, pin]);
  if (!pin) return <NotFound message="This pin doesn’t exist or was removed." />;
  const saved = isSaved(pin.id);
  return (
    <>
      <button className="link-btn" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}><ArrowLeft size={16} /> Back</button>
      <section className="detail">
        {broken ? <div className="img-fallback tall">Image unavailable</div>
          : <img src={pin.image} alt={pin.title} onError={() => setBroken(true)} />}
        <div className="detail-body">
          <button className={`save-btn static${saved ? ' saved' : ''}`} onClick={() => toggleSave(pin.id)} aria-pressed={saved}>{saved ? 'Saved' : 'Save'}</button>
          <h1>{pin.title}</h1>
          <p>{pin.description}</p>
          <Link to={`/u/${pin.creator.username}`} className="creator-row"><span className="avatar sm">{pin.creator.name.charAt(0)}</span>{pin.creator.name}</Link>
          <p><Link to={`/explore?category=${encodeURIComponent(pin.category)}`} className="chip">{pin.category}</Link></p>
          <div className="chips">{pin.tags.map((t) => <Link key={t} className="chip" to={`/explore?tag=${encodeURIComponent(t)}`}>#{t}</Link>)}</div>
        </div>
      </section>
      <h2 className="page-title sm">More like this</h2>
      <PinGrid pins={related} emptyTitle="No related pins yet" emptyText="Explore other categories for more ideas." />
    </>
  );
}
