import { useMemo, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import PinGrid from '../components/PinGrid';
import { usePins } from '../hooks/usePins';
import { filterPins } from '../utils/pinHelpers';

export default function Home() {
  const { pins } = usePins();
  const [category, setCategory] = useState('');
  const shown = useMemo(() => filterPins(pins, { category }), [pins, category]);
  return (
    <>
      <CategoryFilter value={category} onChange={setCategory} />
      <PinGrid pins={shown} emptyTitle="Nothing here yet" emptyText="No pins in this category. Create the first one." />
    </>
  );
}
