'use client';

import { useState, useEffect, useRef } from 'react';
import AdminHeader from '@/components/AdminHeader';
import {
  Image,
  Search,
  Trash2,
  Pencil,
  Plus,
  X,
  RefreshCw,
  Upload
} from 'lucide-react';

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ image_url: '', title: '', subtitle: '', order_index: 0, active: true });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const loadBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/banners');
      if (res.ok) {
        setBanners(await res.json());
      }
    } catch (err) {
      console.error('Failed to load banners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchInit = async () => {
      try {
        const res = await fetch('/api/banners');
        if (!ignore && res.ok) {
          setBanners(await res.json());
        }
      } catch (err) {
        console.error('Failed to load banners:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchInit();
    return () => { ignore = true; };
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ image_url: '', title: '', subtitle: '', order_index: 0, active: true });
    setModalOpen(true);
  };

  const openEdit = (n) => {
    setEditing(n);
    setForm({
      image_url: n.image_url || '',
      title: n.title || '',
      subtitle: n.subtitle || '',
      order_index: n.order_index != null ? Number(n.order_index) : 0,
      active: Number(n.active) === 1
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
    if (!form.image_url.trim()) return;
    setSaving(true);
    try {
      const method = editing ? 'PATCH' : 'POST';
      const url = editing ? `/api/banners?id=${editing.id}` : '/api/banners';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: form.image_url,
          title: form.title,
          subtitle: form.subtitle,
          order_index: form.order_index,
          active: form.active ? 1 : 0
        })
      });
      if (res.ok) {
        setModalOpen(false);
        loadBanners();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save banner');
      }
    } catch (err) {
      console.error('Error saving banner:', err);
      alert('Failed to save banner');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (n) => {
    if (!confirm(`Delete banner "${n.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/banners?id=${n.id}`, { method: 'DELETE' });
      if (res.ok) {
        loadBanners();
      }
    } catch (err) {
      console.error('Error deleting banner:', err);
    }
  };

  const filteredBanners = banners.filter(b => {
    const q = search.toLowerCase();
    return (
      (b.title || '').toLowerCase().includes(q) ||
      (b.subtitle || '').toLowerCase().includes(q)
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
              <Image className="w-8 h-8 text-amber-400" />
              <span>News Page Banner Manager</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage the sliding banner images shown on the /news page
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={loadBanners}
              disabled={loading}
              className="flex items-center space-x-2 px-3.5 py-2 bg-[#0D47A1] hover:bg-[#1565C0] text-slate-200 text-xs font-medium rounded-lg border border-[#1565C0]/50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Banners</span>
            </button>
            <button
              onClick={openAdd}
              className="btn-gold text-xs flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Add Banner</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass-panel p-4 mb-6 border border-[#1565C0]/40">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Filter banners by title or subtitle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Banners Table */}
        <div className="glass-panel border border-[#1565C0]/40 overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0D47A1]/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1565C0]/40">
                <tr>
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">Banner Title</th>
                  <th className="px-5 py-3.5">Subtitle</th>
                  <th className="px-5 py-3.5">Order</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                      Loading banners...
                    </td>
                  </tr>
                ) : filteredBanners.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                      No banners found{banners.length === 0 ? '. Click "Add Banner" to create the first one.' : '.'}
                    </td>
                  </tr>
                ) : (
                  filteredBanners.map((n, idx) => (
                    <tr key={n.id || idx} className="hover:bg-[#1565C0]/30 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-slate-500">{idx + 1}</td>
                      <td className="px-5 py-4 font-semibold text-white flex items-center space-x-2">
                        <Image className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{n.title}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-300 max-w-xs truncate">
                        {n.subtitle}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400">{n.order_index}</td>
                      <td className="px-5 py-4 text-xs">
                        {n.active === 1 ? (
                          <span className="px-2 py-0.5 bg-green-500/15 text-green-400 rounded border border-green-500/30">Active</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-500/15 text-slate-400 rounded border border-slate-500/30">Inactive</span>
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
            <span>Total {filteredBanners.length} banner(s)</span>
            <span>Milne Bay Province Division of Education</span>
          </div>
        </div>
      </main>

      {/* Add / Edit Banner Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a192f]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full p-6 border border-[#1565C0]/40 shadow-2xl relative">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#1565C0]/40">
              <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                <Image className="w-5 h-5 text-amber-400" />
                <span>{editing ? 'Edit Banner' : 'Add New Banner'}</span>
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
                  Banner Image
                </label>
                <div className="flex items-center space-x-3 mb-3">
                  {form.image_url ? (
                    <img src={form.image_url} alt="Banner preview" className="w-24 h-16 object-cover rounded border border-[#1565C0]/40" />
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
                  <span className="text-[11px] text-slate-400">Or paste an image link</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Banner Image URL
                </label>
                <input
                  type="text"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  placeholder="e.g. https://example.com/banner.jpg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Term 3 Commences Soon"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Subtitle / Description
                </label>
                <textarea
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                  placeholder="Short description shown on the banner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Order Index
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.order_index}
                  onChange={(e) => setForm({ ...form, order_index: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="rounded border-slate-600 bg-[#0a192f] text-amber-400 focus:ring-amber-400"
                  />
                  <span>Active (shown on the news page)</span>
                </label>
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
                disabled={saving || !form.image_url.trim() || !form.title.trim()}
                className="btn-gold text-xs px-4 py-2 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : editing ? 'Update Banner' : 'Publish Banner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
