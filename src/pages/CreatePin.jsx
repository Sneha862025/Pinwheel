import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { usePins } from '../hooks/usePins';
import { isValidImageUrl } from '../utils/pinHelpers';

const empty = { image: '', title: '', description: '', category: '', tags: '' };

export default function CreatePin() {
  const { addPin } = usePins();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [imgOk, setImgOk] = useState(true);
  const [created, setCreated] = useState(null);
  const set = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); if (k === 'image') setImgOk(true); };

  useEffect(() => {
    if (!created) return undefined;
    const t = setTimeout(() => navigate(`/pin/${created}`), 1200);
    return () => clearTimeout(t);
  }, [created, navigate]);

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.image.trim()) err.image = 'Enter an image URL.';
    else if (!isValidImageUrl(form.image.trim())) err.image = 'Enter a valid URL starting with http:// or https://.';
    else if (!imgOk) err.image = 'This image could not be loaded. Check the URL.';
    if (!form.title.trim()) err.title = 'Add a title.';
    if (!form.category) err.category = 'Choose a category.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const tags = [...new Set(form.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean))];
    const pin = addPin({ image: form.image.trim(), title: form.title.trim(), description: form.description.trim(), category: form.category, tags });
    setCreated(pin.id);
  };
  const previewUrl = isValidImageUrl(form.image.trim()) ? form.image.trim() : '';

  return (
    <form className="form" onSubmit={submit} noValidate>
      <h1 className="page-title">Create pin</h1>
      {created && <p className="success" role="status">Pin created. Opening it now…</p>}
      <label>Image URL
        <input value={form.image} onChange={set('image')} placeholder="https://…" aria-invalid={!!errors.image} />
        {errors.image && <span className="error">{errors.image}</span>}
      </label>
      {previewUrl && (imgOk
        ? <img className="preview" src={previewUrl} alt="Pin preview" onError={() => setImgOk(false)} />
        : <p className="error">Preview failed. This URL isn’t a loadable image.</p>)}
      <label>Title
        <input value={form.title} onChange={set('title')} maxLength={80} aria-invalid={!!errors.title} />
        {errors.title && <span className="error">{errors.title}</span>}
      </label>
      <label>Description
        <textarea rows={3} value={form.description} onChange={set('description')} maxLength={300} />
      </label>
      <label>Category
        <select value={form.category} onChange={set('category')} aria-invalid={!!errors.category}>
          <option value="">Select a category</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </label>
      <label>Tags <small>(comma separated)</small>
        <input value={form.tags} onChange={set('tags')} placeholder="minimal, oak, warm" />
      </label>
      <div className="row">
        <button type="button" className="btn" onClick={() => navigate(-1)}>Cancel</button>
        <button type="submit" className="btn primary" disabled={!!created}>Save pin</button>
      </div>
    </form>
  );
}
