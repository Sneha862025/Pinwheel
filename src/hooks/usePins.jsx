import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { samplePins } from '../data/pins';
import { readStorage, writeStorage } from '../utils/storage';
import { makeId } from '../utils/pinHelpers';

const DEFAULT_PROFILE = { name: 'Guest Creator', username: 'guest', bio: 'Demo profile. Edit me. Data stays in this browser only.' };
const Ctx = createContext(null);
const arr = (v) => (Array.isArray(v) ? v : []);

export function PinsProvider({ children }) {
  const [created, setCreated] = useState(() => arr(readStorage('pw_created', [])).filter((p) => p && p.id && p.image && p.title && Array.isArray(p.tags) && p.creator));
  const [savedIds, setSavedIds] = useState(() => arr(readStorage('pw_saved', [])).filter((x) => typeof x === 'string'));
  const [profile, setProfile] = useState(() => ({ ...DEFAULT_PROFILE, ...(readStorage('pw_profile', {}) || {}) }));
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, []);
  useEffect(() => writeStorage('pw_created', created), [created]);
  useEffect(() => writeStorage('pw_saved', savedIds), [savedIds]);
  useEffect(() => writeStorage('pw_profile', profile), [profile]);

  const pins = useMemo(() => [...created, ...samplePins], [created]);
  const toggleSave = useCallback((id) => setSavedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [id, ...s])), []);
  const addPin = useCallback((data) => {
    const pin = { ...data, id: makeId(), createdAt: new Date().toISOString(), creator: { name: profile.name, username: profile.username } };
    setCreated((c) => [pin, ...c]);
    return pin;
  }, [profile]);

  const value = { pins, created, savedIds, profile, setProfile, loading, toggleSave, addPin };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function usePins() {
  const c = useContext(Ctx);
  if (!c) throw new Error('usePins must be used inside PinsProvider');
  const { pins, created, profile, setProfile, loading, addPin } = c;
  return { pins, created, profile, setProfile, loading, addPin };
}
export function useSavedPins() {
  const { pins, savedIds, toggleSave } = useContext(Ctx);
  const savedPins = useMemo(() => savedIds.map((id) => pins.find((p) => p.id === id)).filter(Boolean), [pins, savedIds]);
  return { savedIds, savedPins, toggleSave, isSaved: (id) => savedIds.includes(id) };
}
