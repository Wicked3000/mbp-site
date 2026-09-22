'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import {
  Rss,
  Search,
  Trash2,
  Pencil,
  Plus,
  X,
  Globe,
  Newspaper,
  RefreshCw,
  Link2
} from 'lucide-react';

export default function LatestNewsPage() {
  const [items, setItems] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', is_external: false, external_url: '', news_id: '' });
  const [saving, setSaving] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/latest-news');
      if (res.ok) setItems(await res.json());
    } catch (err) {
      console.error('Failed to load latest news:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadNewsList = async () => {
    try {
      const res = await fetch('/api/news');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setNewsList(data);
      }
    } catch (err) {
      console.error('Failed to load news list:', err);
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchInit = async () => {
      try {
        const [lnRes, newsRes] = await Promise.all([fetch('/api/latest-news'), fetch('/api/news')]);
        if (!ignore && lnRes.ok) setItems(await lnRes.json());
        if (!ignore && newsRes.ok) {
          const data = await newsRes.json();
          if (Array.isArray(data)) setNewsList(data);
        }
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchInit();
    return () => { ignore = true; };
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', is_external: false, external_url: '', news_id: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title || '',
      is_external: Number(item.is_external) === 1,
      external_url: item.external_url || '',
      news_id: item.news_id ? String(item.news_id) : ''
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    if (form.is_external && !form.external_url.trim()) {
      alert('Enter a link URL for external news.');
      return;
    }
    if (!form.is_external && !form.news_id) {
      alert('Select the news story to link to.');
      return;
    }
    setSaving(true);
    try {
      const method = editing ? 'PATCH' : 'POST';
      const url = editing ? `/api/latest-news?id=${editing.id}` : '/api/latest-news';
      const payload = {
        title: form.title,
        is_external: form.is_external ? 1 : 0,
        external_url: form.external_url,
        news_id: form.is_external ? null : Number(form.news_id)
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
        alert(data.error || 'Failed to save latest news item');
      }
    } catch (err) {
      console.error('Error saving latest news:', err);
      alert('Failed to save latest news item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete latest news item "${item.title}"?`)) return;
    try {
      const res = await fetch(`/api/latest-news?id=${item.id}`, { method: 'DELETE' });
      if (res.ok) loadItems();
    } catch (err) {
      console.error('Error deleting latest news:', err);
    }
  };

  const filteredItems = items.filter((item) => {
    const q = search.toLowerCase();
    return (
      (item.title || '').toLowerCase().includes(q) ||
      (item.external_url || '').toLowerCase().includes(q)
    );
  });

  const targetText = (item) => {
    if (Number(item.is_external) === 1) return item.external_url;
    const linked = newsList.find((n) => Number(n.id) === Number(item.news_id));
    return linked ? linked.title : `News #${item.news_id}`;
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col lg:pl-60">
      <AdminHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-[#1565C0]/40">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display flex items-center space-x-3">
              <Rss className="w-8 h-8 text-amber-400" />
              <span>Latest News Ticker</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage the scrolling news ticker on the public site (max 4). Link to external sites or internal news stories.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={() => { loadItems(); loadNewsList(); }}
              disabled={loading}
              className="flex items-center space-x-2 px-3.5 py-2 bg-[#0D47A1] hover:bg-[#1565C0] text-slate-200 text-xs font-medium rounded-lg border border-[#1565C0]/50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={openAdd}
              className="btn-gold text-xs flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Add Ticker Item</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass-panel p-4 mb-6 border border-[#1565C0]/40">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Filter ticker items by title or URL..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Ticker Items Table */}
        <div className="glass-panel border border-[#1565C0]/40 overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0D47A1]/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1565C0]/40">
                <tr>
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">Title</th>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">Target</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-slate-500">
                      Loading ticker items...
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-slate-500">
                      No ticker items found{items.length === 0 ? '. Click "Add Ticker Item" to add the first one.' : '.'}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-[#1565C0]/30 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-slate-500">{idx + 1}</td>
                      <td className="px-5 py-4 font-semibold text-white">{item.title}</td>
                      <td className="px-5 py-4">
                        {Number(item.is_external) === 1 ? (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-blue-500/15 text-blue-300 border border-blue-500/40 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            <Globe className="w-3 h-3" />
                            <span>External Link</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-green-500/15 text-green-300 border border-green-500/40 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            <Newspaper className="w-3 h-3" />
                            <span>Internal News</span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400 max-w-xs truncate">
                        <span className="flex items-center space-x-1.5">
                          <Link2 className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                          <span>{targetText(item)}</span>
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => openEdit(item)}
                          className="px-2.5 py-1.5 bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded text-xs font-medium inline-flex items-center space-x-1"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
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
            <span>
              Total {filteredItems.length} ticker item(s) ·{' '}
              <span className={items.length === 4 ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
                {items.length}/4 shown on the public site
              </span>
            </span>
            <span>Milne Bay Province Division of Education</span>
          </div>
        </div>
      </main>

      {/* Add / Edit Ticker Item Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a192f]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full p-6 border border-[#1565C0]/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#1565C0]/40">
              <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                <Rss className="w-5 h-5 text-amber-400" />
                <span>{editing ? 'Edit Ticker Item' : 'Add Ticker Item'}</span>
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Ticker Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  placeholder="e.g. National Education Week 2026"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Link Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, is_external: false })}
                    className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition-colors ${!form.is_external
                      ? 'bg-[#2E7D32]/25 text-green-300 border-[#2E7D32]/60'
                      : 'bg-[#0a192f] text-slate-400 border-[#1565C0]/50'}`}
                  >
                    Internal News
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, is_external: true })}
                    className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition-colors ${form.is_external
                      ? 'bg-[#1565C0]/25 text-blue-300 border-[#1565C0]/60'
                      : 'bg-[#0a192f] text-slate-400 border-[#1565C0]/50'}`}
                  >
                    External Link
                  </button>
                </div>
              </div>

              {form.is_external ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    External Link URL *
                  </label>
                  <div className="flex items-center space-x-2 mb-1">
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[11px] text-slate-400">Opens in a new tab for visitors</span>
                  </div>
                  <input
                    type="url"
                    value={form.external_url}
                    onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    placeholder="https://example.com/article"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Link to News Story *
                  </label>
                  <div className="flex items-center space-x-2 mb-1">
                    <Newspaper className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[11px] text-slate-400">Select a story from News &amp; Announcements</span>
                  </div>
                  <select
                    value={form.news_id}
                    onChange={(e) => setForm({ ...form, news_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">Select a news story...</option>
                    {newsList.map((n) => (
                      <option key={n.id} value={String(n.id)}>
                        {n.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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
                disabled={saving || !form.title.trim()}
                className="btn-gold text-xs px-4 py-2 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : editing ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}