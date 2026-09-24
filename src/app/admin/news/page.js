'use client';

import { useState, useEffect, useRef } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { 
  Newspaper, 
  Search, 
  Trash2, 
  Pencil, 
  Plus, 
  X, 
  Calendar, 
  RefreshCw,
  Image,
  Upload,
  Link2
} from 'lucide-react';

export default function NewsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', summary: '', full_story: '', image_url: '', published_at: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news');
      if (res.ok) {
        setItems(await res.json());
      }
    } catch (err) {
      console.error('Failed to load news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchInit = async () => {
      try {
        const res = await fetch('/api/news');
        if (!ignore && res.ok) {
          setItems(await res.json());
        }
      } catch (err) {
        console.error('Failed to load news:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchInit();
    return () => { ignore = true; };
  }, []);

  const toLocalDate = (val) => {
    if (!val) return '';
    const d = new Date(val);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', summary: '', full_story: '', image_url: '', published_at: toLocalDate(new Date()) });
    setModalOpen(true);
  };

  const openEdit = (n) => {
    setEditing(n);
    setForm({
      title: n.title || '',
      summary: n.summary || n.body || '',
      full_story: n.full_story || '',
      image_url: n.image_url || '',
      published_at: toLocalDate(n.published_at)
    });
    setModalOpen(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({ ...prev, image_url: data.url }));
      } else {
        const data = await res.json();
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Check the image and try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.summary.trim()) return;
    setSaving(true);
    try {
      const method = editing ? 'PATCH' : 'POST';
      const url = editing ? `/api/news?id=${editing.id}` : '/api/news';
      const payload = {
        title: form.title,
        summary: form.summary,
        full_story: form.full_story,
        image_url: form.image_url,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : undefined
      };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setModalOpen(false);
        loadItems();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save news item');
      }
    } catch (err) {
      console.error('Error saving news item:', err);
      alert('Failed to save news item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (n) => {
    if (!confirm(`Delete news item "${n.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/news?id=${n.id}`, { method: 'DELETE' });
      if (res.ok) {
        loadItems();
      }
    } catch (err) {
      console.error('Error deleting news item:', err);
    }
  };

  const filteredItems = items.filter(n => {
    const q = search.toLowerCase();
    return (
      (n.title || '').toLowerCase().includes(q) ||
      (n.summary || n.body || '').toLowerCase().includes(q) ||
      (n.full_story || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col lg:pl-60">
      <AdminHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-[#1565C0]/40">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display flex items-center space-x-3">
              <Newspaper className="w-8 h-8 text-amber-400" />
              <span>Latest News & Announcements</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage the news stories shown on the public website home page and /news
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={loadItems}
              disabled={loading}
              className="flex items-center space-x-2 px-3.5 py-2 bg-[#0D47A1] hover:bg-[#1565C0] text-slate-200 text-xs font-medium rounded-lg border border-[#1565C0]/50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh News</span>
            </button>
            <button
              onClick={openAdd}
              className="btn-gold text-xs flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Add News Item</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass-panel p-4 mb-6 border border-[#1565C0]/40">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Filter news by title or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* News Table */}
        <div className="glass-panel border border-[#1565C0]/40 overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0D47A1]/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1565C0]/40">
                <tr>
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">Title</th>
                  <th className="px-5 py-3.5">Content</th>
                  <th className="px-5 py-3.5">Image</th>
                  <th className="px-5 py-3.5">Published</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                      Loading news items...
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                      No news items found{items.length === 0 ? '. Click "Add News Item" to create the first one.' : '.'}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((n, idx) => (
                    <tr key={n.id || idx} className="hover:bg-[#1565C0]/30 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-slate-500">{idx + 1}</td>
                      <td className="px-5 py-4 font-semibold text-white">{n.title}</td>
                      <td className="px-5 py-4 text-slate-300 max-w-xs truncate">{n.summary || n.body}</td>
                      <td className="px-5 py-4">
                        {n.image_url ? (
                          <img src={n.image_url} alt={n.title} className="w-16 h-10 object-cover rounded border border-[#1565C0]/40" />
                        ) : (
                          <span className="text-slate-500 text-xs inline-flex items-center space-x-1">
                            <Image className="w-3.5 h-3.5" />
                            <span>None</span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400">
                        {n.published_at ? (
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(n.published_at).toLocaleDateString()}</span>
                          </span>
                        ) : (
                          <span></span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => openEdit(n)}
                          className="px-2.5 py-1.5 bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded text-xs font-medium inline-flex items-center space-x-1"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(n)}
                          className="btn-danger p-1.5 inline-flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-[#0D47A1]/50 border-t border-[#1565C0]/40 flex items-center justify-between text-xs text-slate-400">
            <span>Total {filteredItems.length} news item(s)</span>
            <span>Milne Bay Province Division of Education</span>
          </div>
        </div>
      </main>

      {/* Add / Edit News Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a192f]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full p-6 border border-[#1565C0]/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#1565C0]/40">
              <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                <Newspaper className="w-5 h-5 text-amber-400" />
                <span>{editing ? 'Edit News Item' : 'Add News Item'}</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Headline
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Provincial Examinations Update"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Short Summary *
                </label>
                <textarea
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                  placeholder="Short summary shown on the news cards (2-3 sentences)..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Full Story
                </label>
                <textarea
                  value={form.full_story}
                  onChange={(e) => setForm({ ...form, full_story: e.target.value })}
                  rows={7}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                  placeholder="Full news story shown when a visitor clicks 'Read More'. Leave blank to use the summary."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Thumbnail Image
                </label>
                <div className="flex items-center space-x-3 mb-3">
                  {form.image_url ? (
                    <img src={form.image_url} alt="Thumbnail preview" className="w-24 h-16 object-cover rounded border border-[#1565C0]/40" />
                  ) : (
                    <div className="w-24 h-16 rounded border border-dashed border-[#1565C0]/40 flex items-center justify-center text-slate-500">
                      <Image className="w-5 h-5" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    disabled={uploading}
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#0D47A1] hover:bg-[#1565C0] text-slate-200 text-xs font-medium rounded-lg border border-[#1565C0]/50 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload from Computer'}</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex items-center space-x-2 mb-1">
                  <Link2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[11px] text-slate-400">or paste an image link</span>
                </div>
                <input
                  type="text"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={form.published_at}
                  onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-5 mt-5 border-t border-[#1565C0]/40">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim() || !form.summary.trim()}
                className="btn-gold text-xs px-4 py-2 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : editing ? 'Update News' : 'Publish News'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}