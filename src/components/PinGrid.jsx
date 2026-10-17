import PinCard from './PinCard';
import { usePins } from '../hooks/usePins';

export default function PinGrid({ pins, emptyTitle = 'No pins found', emptyText = 'Try a different search or category.' }) {
  const { loading } = usePins();
  if (loading) {
    return <div className="masonry" aria-busy="true">{[260, 340, 220, 300, 380, 240, 320, 280].map((h, i) => <div key={i} className="skeleton" style={{ height: h }} />)}</div>;
  }
  if (!pins.length) return <div className="empty"><h2>{emptyTitle}</h2><p>{emptyText}</p></div>;
  return <div className="masonry">{pins.map((p) => <PinCard key={p.id} pin={p} />)}</div>;
}
