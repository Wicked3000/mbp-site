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
  RefreshCw,
  TrendingUp,
  PieChart 
} from 'lucide-react';

const GRADES = [
  { grade: 9, label: 'Grade 9', color: '#FBC02D' },
  { grade: 11, label: 'Grade 11', color: '#1565C0' }
];

function VerticalBars({ data, height = 160 }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const plotHeight = height - 46;
  return (
    <div className="relative w-full" style={{ height }}>
      {data.map((d, i) => {
        const barH = Math.max(Math.round((d.value / max) * plotHeight), d.value ? 8 : 2);
        return (
          <div
            key={i}
            className="absolute bottom-0 flex flex-col items-center"
            style={{ left: `${((i + 0.5) / data.length) * 100}%`, transform: 'translateX(-50%)', width: `${100 / data.length}%` }}
          >
            <span className="text-xs font-bold text-white mb-1 leading-none">{d.value || ''}</span>
            <div
              className="w-full max-w-[46px] rounded-t-md transition-all duration-500"
              style={{ height: `${barH}px`, background: d.color }}
              title={`${d.label}: ${d.value}`}
            ></div>
            <span className="text-[10px] text-slate-400 mt-1 truncate w-full text-center leading-none">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function HorizontalBars({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-2.5">
      {data.map((d, i) => (
        <div key={i}>
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-slate-300 truncate pr-2">{d.label}</span>
            <span className="text-slate-400 font-semibold">{d.value}</span>
          </div>
          <div className="h-2 rounded-full bg-[#1565C0]/20 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round((d.value / max) * 100)}%`, background: 'linear-gradient(90deg, #1565C0, #2E7D32)' }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Donut({ male, female, unspecified }) {
  const total = male + female + unspecified;
  const mPct = total ? (male / total) * 360 : 0;
  const fPct = total ? (female / total) * 360 : 0;
  return (
    <div className="flex items-center justify-center gap-6">
      <div
        className="w-28 h-28 rounded-full relative shrink-0"
        style={{ background: `conic-gradient(#0D47A1 0deg ${mPct}deg, #2E7D32 ${mPct}deg ${mPct + fPct}deg, #0a192f ${mPct + fPct}deg 360deg)` }}
      >
        <div className="absolute inset-3 rounded-full bg-[#0a192f] flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-white font-display leading-none">{total}</span>
          <span className="text-[9px] uppercase tracking-wider text-slate-500 mt-1">Students</span>
        </div>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-sm bg-[#0D47A1]"></span>
          <span className="text-slate-300">Male</span>
          <span className="font-bold text-white">{male}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-sm bg-[#2E7D32]"></span>
          <span className="text-slate-300">Female</span>
          <span className="font-bold text-white">{female}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-sm bg-[#0a192f]"></span>
          <span className="text-slate-300">Unspecified</span>
          <span className="font-bold text-white">{unspecified}</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const applyData = (studentsData, contactsData) => {
    const list = studentsData || [];
    const msg = contactsData || [];
    setStudents(list);
    setContacts(msg);
    setStudentCount(list.length || 0);
    setContactCount(msg.length || 0);
    setRecentContacts(msg.slice(0, 3));
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [studentsRes, contactsRes] = await Promise.all([
        fetch('/api/students'),
        fetch('/api/contacts')
      ]);
      if (studentsRes.ok) {
        const studentsData = await studentsRes.json();
        applyData(studentsData, contactsRes.ok ? await contactsRes.json() : contacts);
      } else if (contactsRes.ok) {
        applyData(students, await contactsRes.json());
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
        const studentsData = studentsRes.ok ? await studentsRes.json() : [];
        const contactsData = contactsRes.ok ? await contactsRes.json() : [];
        applyData(studentsData, contactsData);
      } catch (error) {
        console.error('Failed to load dashboard metrics:', error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchInit();
    return () => { ignore = true; };
  }, []);

  const gradeData = GRADES.map((g) => ({
    ...g,
    value: students.filter((s) => Number(s.grade) === g.grade).length
  }));

  const maleCount = students.filter((s) => (s.gender || '').toUpperCase() === 'M').length;
  const femaleCount = students.filter((s) => (s.gender || '').toUpperCase() === 'F').length;

  const schoolMap = {};
  students.forEach((s) => {
    const name = (s.destination_school || s.school || 'Unknown').trim();
    schoolMap[name] = (schoolMap[name] || 0) + 1;
  });
  const schoolData = Object.entries(schoolMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, value]) => ({ label, value }));

  const monthKeys = [];
  const monthLabels = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthKeys.push(`${d.getFullYear()}-${d.getMonth()}`);
    monthLabels.push(d.toLocaleDateString('en-US', { month: 'short' }));
  }
  const monthlyData = monthKeys.map((key, i) => {
    const count = contacts.filter((c) => {
      const d = new Date(c.created_at);
      return `${d.getFullYear()}-${d.getMonth()}` === key;
    }).length;
    return { label: monthLabels[i], value: count, color: '#2E7D32' };
  });

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col lg:pl-60">
      <AdminHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-[#1565C0]/40">
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
              className="flex items-center space-x-2 px-3.5 py-2 bg-[#0D47A1] hover:bg-[#1565C0] text-slate-200 text-xs font-medium rounded-lg border border-[#1565C0]/50 transition-colors cursor-pointer"
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
          <div className="p-5 border border-[#1565C0]/40 bg-[#0D47A1]/50 rounded-xl">
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

          <div className="p-5 border border-[#1565C0]/40 bg-[#0D47A1]/50 rounded-xl">
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

          <div className="p-5 border border-[#1565C0]/40 bg-[#0D47A1]/50 rounded-xl">
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

          <div className="p-5 border border-[#1565C0]/40 bg-[#0D47A1]/50 rounded-xl">
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
            <p className="text-xs text-slate-400 mt-2">In-Memory Data Store</p>
          </div>
        </div>

        {/* Monitoring & Trends */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <span>Monitoring & Trends</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 border border-[#1565C0]/40 bg-[#0a192f]/90 rounded-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1565C0]/40">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#1565C0]" />
                  <h3 className="text-sm font-bold text-white">Selections by Grade</h3>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">2026 Intake</span>
              </div>
              {loading ? (
                <div className="h-[160px] flex items-center justify-center text-slate-500 text-sm">Loading…</div>
              ) : (
                <VerticalBars data={gradeData} />
              )}
              <p className="text-[11px] text-slate-500 mt-3">Breaks down the selection lists between Grade 9 and Grade 11.</p>
            </div>

            <div className="p-5 border border-[#1565C0]/40 bg-[#0a192f]/90 rounded-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1565C0]/40">
                <div className="flex items-center space-x-2">
                  <PieChart className="w-4 h-4 text-[#2E7D32]" />
                  <h3 className="text-sm font-bold text-white">Gender Composition</h3>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{students.length} Students</span>
              </div>
              {loading ? (
                <div className="h-[160px] flex items-center justify-center text-slate-500 text-sm">Loading…</div>
              ) : (
                <Donut male={maleCount} female={femaleCount} unspecified={students.length - maleCount - femaleCount} />
              )}
              <p className="text-[11px] text-slate-500 mt-3">Male / female split across all selected candidates.</p>
            </div>

            <div className="p-5 border border-[#1565C0]/40 bg-[#0a192f]/90 rounded-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1565C0]/40">
                <div className="flex items-center space-x-2">
                  <School className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">Top 10 Schools by Selections</h3>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{schoolData.length} Schools</span>
              </div>
              {loading ? (
                <div className="h-[160px] flex items-center justify-center text-slate-500 text-sm">Loading…</div>
              ) : (
                <HorizontalBars data={schoolData} />
              )}
              <p className="text-[11px] text-slate-500 mt-3">Where selections are heaviest, monitor intake distribution.</p>
            </div>

            <div className="p-5 border border-[#1565C0]/40 bg-[#0a192f]/90 rounded-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1565C0]/40">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#2E7D32]" />
                  <h3 className="text-sm font-bold text-white">Contact Messages: Last 6 Months</h3>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{contactCount} Total</span>
              </div>
              {loading ? (
                <div className="h-[160px] flex items-center justify-center text-slate-500 text-sm">Loading…</div>
              ) : (
                <VerticalBars data={monthlyData} />
              )}
              <p className="text-[11px] text-slate-500 mt-3">Monthly volume of inquiries received via the contact form.</p>
            </div>
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
              className="block p-5 border border-[#1565C0]/40 bg-[#0D47A1]/50 rounded-xl hover:border-amber-400/50 group transition-all"
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
              className="block p-5 border border-[#1565C0]/40 bg-[#0D47A1]/50 rounded-xl hover:border-amber-400/50 group transition-all"
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
          <div className="p-6 border border-[#1565C0]/40 bg-[#0a192f]/90 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1565C0]/40">
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
                    <div key={c.id} className="p-3 bg-[#0D47A1]/50 rounded-lg border border-[#1565C0]/40 text-xs">
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

            <div className="mt-6 pt-4 border-t border-[#1565C0]/40 flex items-center justify-between text-xs text-slate-400">
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
