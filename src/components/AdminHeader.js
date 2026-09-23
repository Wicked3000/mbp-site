'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Mail, LogOut, ArrowLeft, Bell, Newspaper, Rss, Image, FileText } from 'lucide-react';

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      document.cookie = 'mbp_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } catch {
      // ignore
    }
    router.push('/admin');
  };

  if (pathname === '/admin' || pathname === '/login') {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Student Selection Lists', href: '/admin/students', icon: Users },
    { name: 'Contact Messages', href: '/admin/contacts', icon: Mail },
    { name: 'News & Announcements', href: '/admin/news', icon: Newspaper },
    { name: 'Latest News Ticker', href: '/admin/latest-news', icon: Rss },
    { name: 'Official Notice Board', href: '/admin/notices', icon: Bell },
    { name: 'Policy Documents', href: '/admin/policies', icon: FileText },
    { name: 'News Page Banner', href: '/admin/banners', icon: Image },
  ];

  return (
    <>
      {/* Mobile top header (< lg) */}
      <header className="lg:hidden sticky top-0 z-50 bg-gradient-to-r from-[#0a192f] via-[#0D47A1] to-[#1565C0] backdrop-blur-md border-b border-[#0a192f]/60 shadow-lg shadow-[#0a192f]/40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-lg p-1.5 flex items-center justify-center shadow-md shadow-amber-500/10">
                <img src="/assets/logo/mbp-logo-bg-removed.png" alt="MBP Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <span className="font-bold text-base text-white tracking-tight font-display">MBP Education</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="/"
                className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white transition-colors bg-slate-800/60 px-3 py-1.5 rounded-md border border-slate-700/60"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Public Site</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-3 py-1.5 rounded-md transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation bar */}
          <div className="flex border-t border-slate-800/70 py-2 space-x-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium shrink-0 ${
                    isActive
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Desktop sidebar (lg+) */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-50 w-60 flex-col bg-gradient-to-b from-[#0a192f] via-[#0D47A1] to-[#0a192f] border-r border-[#0a192f]/60 shadow-xl shadow-[#0a192f]/40">
        <div className="px-4 h-16 flex items-center space-x-3 border-b border-white/10 shrink-0">
          <div className="bg-white rounded-lg p-1.5 flex items-center justify-center shadow-md shadow-amber-500/10">
            <img src="/assets/logo/mbp-logo-bg-removed.png" alt="MBP Logo" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <span className="font-bold text-base text-white tracking-tight font-display leading-tight">MBP Education</span>
          </div>
        </div>

        <span className="px-4 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400/80">Navigation</span>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1565C0]/40 text-amber-300 border border-[#1565C0]/60'
                    : 'text-slate-300 hover:bg-[#1565C0]/25 hover:text-white border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-2 shrink-0">
          <a
            href="/"
            className="flex items-center space-x-2.5 text-xs text-slate-300 hover:text-white transition-colors bg-[#1565C0]/25 hover:bg-[#1565C0]/40 px-3 py-2 rounded-lg border border-[#1565C0]/40"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Site</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-3 py-2 rounded-lg transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}