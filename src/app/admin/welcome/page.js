'use client';

import { useState, useEffect, useRef } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Sparkles, Image, RefreshCw, Upload, Save } from 'lucide-react';

export default function WelcomeMessagePage() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ kicker: '', title: '', message: '', image_url: '', active: true });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const loadMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/welcome');
      if (res.ok) {
        const data = await res.json();
        setMessage(data);
        setForm({
          kicker: data.kicker || '',
          title: data.title || '',
          message: data.message || '',
          image_url: data.image_url || '',
          active: Number(data.active) === 1
        });
      }
    } catch (err) {
      console.error('Failed to load welcome message:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessage();
  }, []);

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
    if (!message || !form.title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/welcome?id=${message.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kicker: form.kicker,
          title: form.title,
          message: form.message,
          image_url: form.image_url,
          active: form.active ? 1 : 0
        })
      });
      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
        alert('Welcome message saved successfully.');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save welcome message');
      }
    } catch (err) {
      console.error('Error saving welcome message:', err);
      alert('Failed to save welcome message');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col lg:pl-60">
      <AdminHeader />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-[#1565C0]/40">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <span>Welcome Message</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              The greeting card shown at the top of the public homepage, beneath the hero slider
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={loadMessage}
              disabled={loading}
              className="flex items-center space-x-2 px-3.5 py-2 bg-[#0D47A1] hover:bg-[#1565C0] text-slate-200 text-xs font-medium rounded-lg border border-[#1565C0]/50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Reload</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.title.trim()}
              className="btn-gold text-xs px-4 py-2 rounded-lg font-bold inline-flex items-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Welcome Message'}</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="glass-panel border border-[#1565C0]/40 rounded-xl p-10 text-center text-slate-500">
            Loading welcome message...
          </div>
        ) : (
          <div className="glass-panel border border-[#1565C0]/40 rounded-xl p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Welcome Image
              </label>
              <div className="flex items-center space-x-3 mb-3">
                {form.image_url ? (
                  <img src={form.image_url} alt="Welcome preview" className="w-40 h-28 object-cover rounded border border-[#1565C0]/40" />
                ) : (
                  <div className="w-40 h-28 rounded border border-dashed border-[#1565C0]/40 flex items-center justify-center text-slate-500">
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
                <span className="text-[11px] text-slate-400">Or paste an image link (leave empty for text-only)</span>
              </div>
              <input
                type="text"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                placeholder="e.g. assets/about/img1.png"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Kicker / Eyebrow
              </label>
              <input
                type="text"
                value={form.kicker}
                onChange={(e) => setForm({ ...form, kicker: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                placeholder="e.g. Milne Bay Province Division of Education"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Heading
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                placeholder="e.g. Welcome to Our Province"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Welcome Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={8}
                className="w-full px-3.5 py-2.5 bg-[#0a192f] border border-[#1565C0]/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
                placeholder="Write the welcome message. Separate paragraphs with a blank line."
              />
              <p className="text-[11px] text-slate-500 mt-1">Blank lines create separate paragraphs on the homepage.</p>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="rounded border-slate-600 bg-[#0a192f] text-amber-400 focus:ring-amber-400"
                />
                <span>Show on the homepage</span>
              </label>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-[#1565C0]/40">
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim()}
                className="btn-gold text-xs px-5 py-2.5 rounded-lg font-bold inline-flex items-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Welcome Message'}</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}