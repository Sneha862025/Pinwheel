import { Link } from 'react-router-dom';
import PinGrid from '../components/PinGrid';
import { useSavedPins } from '../hooks/usePins';

export default function SavedPins() {
  const { savedPins } = useSavedPins();
  return (
    <>
      <h1 className="page-title">Saved pins</h1>
      <PinGrid pins={savedPins} emptyTitle="You haven’t saved any pins" emptyText="Tap Save on a pin to keep it here." />
      {!savedPins.length && <p className="center"><Link to="/explore" className="btn primary">Browse pins</Link></p>}
    </>
  );
}
