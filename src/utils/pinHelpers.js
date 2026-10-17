const norm = (s) => String(s || '').toLowerCase();

export function filterPins(pins, { q = '', category = '', tag = '' } = {}) {
  const query = norm(q).trim();
  return pins.filter((p) => {
    if (category && p.category !== category) return false;
    if (tag && !p.tags.some((t) => norm(t) === norm(tag))) return false;
    if (!query) return true;
    return [p.title, p.description, p.category, p.creator.name, ...p.tags].some((f) => norm(f).includes(query));
  });
}
export function relatedPins(pins, pin, limit = 8) {
  return pins
    .filter((p) => p.id !== pin.id)
    .map((p) => ({ p, score: (p.category === pin.category ? 2 : 0) + p.tags.filter((t) => pin.tags.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
export function getSuggestions(pins, q, limit = 6) {
  const query = norm(q).trim();
  if (!query) return [];
  const set = new Set();
  pins.forEach((p) => [p.title, p.category, ...p.tags].forEach((t) => norm(t).includes(query) && set.add(t)));
  return [...set].slice(0, limit);
}
export function isValidImageUrl(value) {
  try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; }
}
export const makeId = () => `user-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
