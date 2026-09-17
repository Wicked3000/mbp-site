'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { 
  Mail, 
  Search, 
  Trash2, 
  Eye, 
  X, 
  Calendar, 
  User, 
  MessageSquare,
  RefreshCw
} from 'lucide-react';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error('Failed to load contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchInit = async () => {
      try {
        const res = await fetch('/api/contacts');
        if (!ignore && res.ok) {
          const data = await res.json();
          setContacts(data);
        }
      } catch (err) {
        console.error('Failed to load contacts:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchInit();
    return () => { ignore = true; };
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this contact message?')) return;

    try {
      const res = await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
        loadContacts();
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  const filteredContacts = contacts.filter(c => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AdminHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display flex items-center space-x-3">
              <Mail className="w-8 h-8 text-amber-400" />
              <span>Contact Messages</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Public inquiries submitted via the Milne Bay Province Division of Education website
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={loadContacts}
              disabled={loading}
              className="flex items-center space-x-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Messages</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass-panel p-4 mb-6 border border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Filter messages by sender name, email, or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Contacts Table */}
        <div className="glass-panel border border-slate-800 overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">Sender Name</th>
                  <th className="px-5 py-3.5">Email Address</th>
                  <th className="px-5 py-3.5">Message Content</th>
                  <th className="px-5 py-3.5">Date Received</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                      Loading contact messages...
                    </td>
                  </tr>
                ) : filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                      No contact messages found.
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((c, idx) => (
                    <tr key={c.id || idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-slate-500">{idx + 1}</td>
                      <td className="px-5 py-4 font-semibold text-white">
                        {c.name}
                      </td>
                      <td className="px-5 py-4 text-amber-300/90 font-mono text-xs">
                        {c.email}
                      </td>
                      <td className="px-5 py-4 text-slate-300 max-w-xs truncate">
                        {c.message}
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400">
                        {new Date(c.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedContact(c)}
                          className="px-2.5 py-1.5 bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded text-xs font-medium inline-flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
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
          <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Total {filteredContacts.length} message(s)</span>
            <span>Milne Bay Province Division of Education</span>
          </div>
        </div>
      </main>

      {/* View Message Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full p-6 border border-slate-800 shadow-2xl relative">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                <span>Contact Message Detail</span>
              </h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Sender</span>
                  <span className="text-xs text-slate-400 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(selectedContact.created_at).toLocaleString()}</span>
                  </span>
                </div>
                <div className="font-bold text-white text-base flex items-center space-x-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>{selectedContact.name}</span>
                </div>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="text-amber-400 hover:underline text-xs font-mono block"
                >
                  {selectedContact.email}
                </a>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-2">Message Content</label>
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-lg text-slate-200 leading-relaxed text-sm whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="btn-danger text-xs px-3.5 py-2 flex items-center space-x-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Message</span>
                </button>
                <a
                  href={`mailto:${selectedContact.email}?subject=RE: Milne Bay Education Inquiry`}
                  className="btn-gold text-xs px-4 py-2 flex items-center space-x-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
