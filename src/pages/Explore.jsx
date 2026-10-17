import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';
import PinGrid from '../components/PinGrid';
import { usePins } from '../hooks/usePins';
import { filterPins } from '../utils/pinHelpers';

export default function Explore() {
  const { pins } = usePins();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const tag = params.get('tag') || '';
  const category = params.get('category') || '';
  const shown = useMemo(() => filterPins(pins, { q, tag, category }), [pins, q, tag, category]);
  const setCategory = (c) => { const n = new URLSearchParams(params); c ? n.set('category', c) : n.delete('category'); setParams(n); };
  const clear = () => setParams({});
  return (
    <>
      <h1 className="page-title">{q ? `Results for “${q}”` : tag ? `Tagged #${tag}` : 'Explore'}</h1>
      <CategoryFilter value={category} onChange={setCategory} />
      {(q || tag || category) && <button className="link-btn" onClick={clear}>Clear filters</button>}
      <PinGrid pins={shown} emptyTitle="No pins match" emptyText="Check the spelling, try a broader word, or pick another category." />
    </>
  );
}
