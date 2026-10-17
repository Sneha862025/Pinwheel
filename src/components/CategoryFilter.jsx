import { categories } from '../data/categories';

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="chips" role="group" aria-label="Filter by category">
      <button className={`chip${!value ? ' active' : ''}`} onClick={() => onChange('')} aria-pressed={!value}>All</button>
      {categories.map((c) => (
        <button key={c} className={`chip${value === c ? ' active' : ''}`} onClick={() => onChange(c)} aria-pressed={value === c}>{c}</button>
      ))}
    </div>
  );
}
