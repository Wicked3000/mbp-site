'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, User, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 500);
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden text-[#0D47A1]">
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1565C0]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FBC02D]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#2E7D32]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Login Box */}
        <div className="p-8 shadow-2xl border border-[#1565C0]/25 bg-white rounded-2xl backdrop-blur">
          <div className="mb-5 flex justify-center">
            <div className="bg-white rounded-xl p-2 inline-flex items-center justify-center shadow-lg shadow-[#0D47A1]/10 border border-[#1565C0]/20">
              <img src="/assets/logo/mbp-logo-bg-removed.png" alt="Milne Bay Province Logo" className="w-16 h-16 object-contain" />
            </div>
          </div>
          <div className="mb-6 rounded-xl bg-[#800020] px-4 py-3 text-center">
            <div className="text-sm font-semibold tracking-wide text-white">Milne Bay Province - Division of Education</div>
          </div>
          <h2 className="text-xl font-bold text-[#0D47A1] mb-6 flex items-center justify-between">
            <span>Admin Sign In</span>
            <span className="text-xs font-normal text-[#1565C0] bg-[#1565C0]/10 px-2.5 py-1 rounded-full border border-[#1565C0]/25">v2.0 Next.js</span>
          </h2>

          {error && (
            <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-start space-x-3 text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center space-x-3 text-emerald-300 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Login successful! Redirecting to dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#0D47A1] uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1565C0]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1565C0]/30 rounded-lg text-[#0a192f] placeholder-slate-400 focus:outline-none focus:border-[#0D47A1] focus:ring-1 focus:ring-[#0D47A1] transition-all text-sm"
                  placeholder="Enter administrator username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0D47A1] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1565C0]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1565C0]/30 rounded-lg text-[#0a192f] placeholder-slate-400 focus:outline-none focus:border-[#0D47A1] focus:ring-1 focus:ring-[#0D47A1] transition-all text-sm"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full btn-gold py-3 flex items-center justify-center space-x-2 text-sm font-bold shadow-lg disabled:opacity-50 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs font-medium text-white hover:text-white transition-colors">
            ← Return to MBP Division of Education Public Website
          </a>
        </div>
      </div>
    </main>
  );
}
