'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { 
  Bell, 
  Search, 
  Trash2, 
  Pencil, 
  Plus, 
  X, 
  Calendar, 
  RefreshCw,
  FileText 
} from 'lucide-react';

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', body: '' });
  const [saving, setSaving] = useState(false);

  const loadNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notices');
      if (res.ok) {
        setNotices(await res.json());
      }
    } catch (err) {
      console.error('Failed to load notices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchInit = async () => {
      try {
        const res = await fetch('/api/notices');
        if (!ignore && res.ok) {
          setNotices(await res.json());
        }
      } catch (err) {
        console.error('Failed to load notices:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchInit();
    return () => { ignore = true; };
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', body: '' });
    setModalOpen(true);
  };

  const openEdit = (n) => {
    setEditing(n);
    setForm({ title: n.title || '', body: n.body || '' });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.body.trim()) return;
    setSaving(true);
    try {
      const method = editing ? 'PATCH' : 'POST';
      const url = editing ? `/api/notices?id=${editing.id}` : '/api/notices';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title, body: form.body })
      });
      if (res.ok) {
        setModalOpen(false);
        loadNotices();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save notice');
      }
    } catch (err) {
      console.error('Error saving notice:', err);
      alert('Failed to save notice');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (n) => {
    if (!confirm(`Delete notice "${n.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/notices?id=${n.id}`, { method: 'DELETE' });
      if (res.ok) {
        loadNotices();
      }
    } catch (err) {
      console.error('Error deleting notice:', err);
    }
  };

  const filteredNotices = notices.filter(n => {
    const q = search.toLowerCase();
    return (
      (n.title || '').toLowerCase().includes(q) ||
      (n.body || '').toLowerCase().includes(q)
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
              <Bell className="w-8 h-8 text-amber-400" />
              <span>Official Notice Board</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage the notices displayed on the public website home page
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={loadNotices}
              disabled={loading}
              className="flex items-center space-x-2 px-3.5 py-2 bg-[#0D47A1] hover:bg-[#1565C0] text-slate-200 text-xs font-medium rounded-lg border border-[#1565C0]/50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Notices</span>
            </button>
            <button
              onClick={openAdd}
              className="btn-gold text-xs flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Add Notice</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass-panel p-4 mb-6 border border-[#1565C0]/40">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Filter notices by title or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Notices Table */}
        <div className="glass-panel border border-[#1565C0]/40 overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0D47A1]/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1565C0]/40">
                <tr>
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">Notice Title</th>
                  <th className="px-5 py-3.5">Content</th>
                  <th className="px-5 py-3.5">Date Published</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-slate-500">
                      Loading notices...
                    </td>
                  </tr>
                ) : filteredNotices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-slate-500">
                      No notices found{notices.length === 0 ? '. Click "Add Notice" to create the first one.' : '.'}
                    </td>
                  </tr>
                ) : (
                  filteredNotices.map((n, idx) => (
                    <tr key={n.id || idx} className="hover:bg-[#1565C0]/30 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-slate-500">{idx + 1}</td>
                      <td className="px-5 py-4 font-semibold text-white flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{n.title}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-300 max-w-xs truncate">
                        {n.body}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400">
                        {n.created_at ? (
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(n.created_at).toLocaleDateString()}</span>
                          </span>
                        ) : (
                          <span>—</span>
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
            <span>Total {filteredNotices.length} notice(s)</span>
            <span>Milne Bay Province Division of Education</span>
          </div>
        </div>
      </main>

      {/* Add / Edit Notice Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a192f]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full p-6 border border-[#1565C0]/40 shadow-2xl relative">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#1565C0]/40">
              <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                <Bell className="w-5 h-5 text-amber-400" />
                <span>{editing ? 'Edit Notice' : 'Add New Notice'}</span>
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
                  Notice Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Important Update: Term 4 Dates"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Notice Content
                </label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  rows={5}
                  className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                  placeholder="Write the notice body shown on the home page..."
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
                disabled={saving || !form.title.trim() || !form.body.trim()}
                className="btn-gold text-xs px-4 py-2 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : editing ? 'Update Notice' : 'Publish Notice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}