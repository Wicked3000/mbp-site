'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, User, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    } catch (_err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          {/* White background box for logo */}
          <div className="bg-white rounded-xl p-2 inline-flex items-center justify-center mx-auto mb-2">
            <Image src="/assets/logo/mbp-logo-bg-removed.png" alt="Milne Bay Province Logo" width={64} height={64} className="w-16 h-16 object-contain" />
          </div>
          <div className="mt-2 text-slate-950 text-xs">Milne Bay Province</div>
        </div>

        {/* Login Box */}
        <div className="p-8 shadow-2xl border border-slate-800 bg-slate-900/90 rounded-2xl">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center justify-between">
            <span>Admin Sign In</span>
            <span className="text-xs font-normal text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">v2.0 Next.js</span>
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
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm"
                  placeholder="Enter administrator username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm"
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
          <Link href="/" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
            ← Return to MBP Division of Education Public Website
          </Link>
        </div>
      </div>
    </main>
  );
}
