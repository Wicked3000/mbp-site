'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import Link from 'next/link';
import { 
  Users, 
  Mail, 
  School, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  FileText, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';

export default function DashboardPage() {
  const [studentCount, setStudentCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [studentsRes, contactsRes] = await Promise.all([
        fetch('/api/students'),
        fetch('/api/contacts')
      ]);
      if (studentsRes.ok) {
        const studentsData = await studentsRes.json();
        setStudentCount(studentsData.length || 0);
      }
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setContactCount(contactsData.length || 0);
        setRecentContacts(contactsData.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to load dashboard metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchInit = async () => {
      try {
        const [studentsRes, contactsRes] = await Promise.all([
          fetch('/api/students'),
          fetch('/api/contacts')
        ]);
        if (ignore) return;
        if (studentsRes.ok) {
          const studentsData = await studentsRes.json();
          setStudentCount(studentsData.length || 0);
        }
        if (contactsRes.ok) {
          const contactsData = await contactsRes.json();
          setContactCount(contactsData.length || 0);
          setRecentContacts(contactsData.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to load dashboard metrics:', error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchInit();
    return () => { ignore = true; };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AdminHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              Administration Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Milne Bay Province Division of Education • Official Portal
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={loadDashboardData}
              disabled={loading}
              className="flex items-center space-x-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Metrics</span>
            </button>
            <Link
              href="/admin/students"
              className="btn-gold text-xs flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Manage Student Lists</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-5 border border-slate-800 bg-slate-900/60 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Students</span>
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline">
              <span className="text-3xl font-bold text-white font-display">
                {loading ? '...' : studentCount}
              </span>
              <span className="ml-2 text-xs text-emerald-400 font-medium">Selected 2026</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Grade 9 & Grade 11 lists</p>
          </div>

          <div className="p-5 border border-slate-800 bg-slate-900/60 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact Messages</span>
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg">
                <Mail className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline">
              <span className="text-3xl font-bold text-white font-display">
                {loading ? '...' : contactCount}
              </span>
              <span className="ml-2 text-xs text-slate-400">Received</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Inquiries & submissions</p>
          </div>

          <div className="p-5 border border-slate-800 bg-slate-900/60 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Schools</span>
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <School className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline">
              <span className="text-3xl font-bold text-white font-display">18</span>
              <span className="ml-2 text-xs text-emerald-400 font-medium">Secondary & High</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Across Milne Bay Province</p>
          </div>

          <div className="p-5 border border-slate-800 bg-slate-900/60 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Status</span>
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-lg font-bold text-white font-display">Operational</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Next.js 16 + Railway DB API</p>
          </div>
        </div>

        {/* Management Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Management Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>Administration Modules</span>
            </h2>

            <Link
              href="/admin/students"
              className="block p-5 border border-slate-800 bg-slate-900/60 rounded-xl hover:border-amber-400/50 group transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl group-hover:bg-blue-600/30 transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                      Student Selection Lists
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Manage Grade 9 and Grade 11 intake lists for 18 secondary and high schools. Add candidates, edit records, filter by school/grade, and export selection files.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transform group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </div>
            </Link>

            <Link
              href="/admin/contacts"
              className="block p-5 border border-slate-800 bg-slate-900/60 rounded-xl hover:border-amber-400/50 group transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl group-hover:bg-amber-500/30 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                      Contact Form Submissions
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Read, filter, and respond to incoming inquiries submitted through the official contact form on the public website.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transform group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </div>
            </Link>
          </div>

          {/* Recent Messages Preview */}
          <div className="p-6 border border-slate-800 bg-slate-900/90 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <h2 className="text-base font-bold text-white flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Recent Inquiries</span>
                </h2>
                <Link href="/admin/contacts" className="text-xs text-amber-400 hover:underline">
                  View All ({contactCount})
                </Link>
              </div>

              {recentContacts.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No contact messages received yet. Messages submitted via the contact page will appear here.
                </div>
              ) : (
                <div className="space-y-3">
                  {recentContacts.map((c) => (
                    <div key={c.id} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-200">{c.name}</span>
                        <span className="text-slate-500">{new Date(c.created_at).toLocaleDateString()}</span>
                      </div>
                      <span className="text-amber-400/90 font-mono block mb-1">{c.email}</span>
                      <p className="text-slate-400 line-clamp-2">{c.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>API Connection Active</span>
              </span>
              <a href="/" className="text-amber-400 hover:underline">
                View Public Site →
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
