'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import {
  MessageCircle,
  Search,
  Trash2,
  RefreshCw,
  Phone,
  User,
  Calendar,
  Globe
} from 'lucide-react';

export default function WhatsappPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/whatsapp-subscribers');
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data);
      }
    } catch (err) {
      console.error('Failed to load WhatsApp subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchInit = async () => {
      try {
        const res = await fetch('/api/whatsapp-subscribers');
        if (!ignore && res.ok) {
          const data = await res.json();
          setSubscribers(data);
        }
      } catch (err) {
        console.error('Failed to load WhatsApp subscribers:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchInit();
    return () => { ignore = true; };
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this subscriber?')) return;

    try {
      const res = await fetch(`/api/whatsapp-subscribers?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadSubscribers();
      }
    } catch (err) {
      console.error('Error deleting subscriber:', err);
    }
  };

  const filteredSubscribers = subscribers.filter(s => {
    const q = search.toLowerCase();
    return (
      (s.name || '').toLowerCase().includes(q) ||
      (s.phone || '').toLowerCase().includes(q) ||
      (s.source || '').toLowerCase().includes(q)
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
              <MessageCircle className="w-8 h-8 text-green-400" />
              <span>WhatsApp Subscribers</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Users who have subscribed to WhatsApp updates from the Division of Education
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={loadSubscribers}
              disabled={loading}
              className="flex items-center space-x-2 px-3.5 py-2 bg-[#0D47A1] hover:bg-[#1565C0] text-slate-200 text-xs font-medium rounded-lg border border-[#1565C0]/50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass-panel p-4 mb-6 border border-[#1565C0]/40">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Filter subscribers by name, phone, or source..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="glass-panel border border-[#1565C0]/40 overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0D47A1]/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1565C0]/40">
                <tr>
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">Phone Number</th>
                  <th className="px-5 py-3.5">Source</th>
                  <th className="px-5 py-3.5">Subscribed On</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                      Loading WhatsApp subscribers...
                    </td>
                  </tr>
                ) : filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                      No WhatsApp subscribers found.
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((s, idx) => (
                    <tr key={s.id || idx} className="hover:bg-[#1565C0]/30 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-slate-500">{idx + 1}</td>
                      <td className="px-5 py-4 font-semibold text-white">
                        {s.name || '—'}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-green-300/90">
                        {s.phone || '—'}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400">
                        {s.source || '—'}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400">
                        {s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-5 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleDelete(s.id)}
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
            <span>Total {filteredSubscribers.length} subscriber(s)</span>
            <span>Milne Bay Province Division of Education</span>
          </div>
        </div>
      </main>
    </div>
  );
}
