import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PinGrid from '../components/PinGrid';
import { usePins, useSavedPins } from '../hooks/usePins';
import NotFound from './NotFound';

export default function Profile() {
  const { username } = useParams();
  const { pins, profile, setProfile, created } = usePins();
  const { savedIds } = useSavedPins();
  const own = !username || username === profile.username;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [error, setError] = useState('');

  const person = useMemo(() => (own ? profile : pins.find((p) => p.creator.username === username)?.creator), [own, profile, pins, username]);
  const theirPins = own ? created : pins.filter((p) => p.creator.username === username);
  if (!person) return <NotFound message="We couldn’t find that creator." />;

  const save = (e) => {
    e.preventDefault();
    const name = draft.name.trim();
    const user = draft.username.trim().replace(/^@/, '').toLowerCase();
    if (!name || !/^[a-z0-9_]{3,20}$/.test(user)) { setError('Enter a name and a 3–20 character username (letters, numbers, underscore).'); return; }
    setProfile({ name, username: user, bio: draft.bio.trim() });
    setError(''); setEditing(false);
  };

  return (
    <>
      <section className="profile">
        <span className="avatar lg">{person.name.charAt(0).toUpperCase()}</span>
        {editing ? (
          <form className="form" onSubmit={save}>
            <label>Display name<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></label>
            <label>Username<input value={draft.username} onChange={(e) => setDraft({ ...draft, username: e.target.value })} /></label>
            <label>Bio<textarea rows={3} value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} /></label>
            {error && <span className="error">{error}</span>}
            <div className="row"><button type="button" className="btn" onClick={() => { setEditing(false); setDraft(profile); }}>Cancel</button><button className="btn primary">Save profile</button></div>
          </form>
        ) : (
          <>
            <h1>{person.name}</h1>
            <p className="muted">@{person.username}</p>
            {own && <p>{profile.bio}</p>}
            <p className="muted">{theirPins.length} created{own ? ` · ${savedIds.length} saved` : ''}</p>
            {own && <button className="btn" onClick={() => { setDraft(profile); setEditing(true); }}>Edit profile</button>}
          </>
        )}
      </section>
      <h2 className="page-title sm">Created pins</h2>
      <PinGrid pins={theirPins} emptyTitle="No created pins yet" emptyText={own ? 'Use Create to add your first pin.' : 'This creator has no pins.'} />
    </>
  );
}
