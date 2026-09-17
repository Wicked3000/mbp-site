'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { 
  Users, 
  Search, 
  Plus, 
  Trash2, 
  Download, 
  Filter, 
  X, 
  CheckCircle2, 
  AlertCircle,
  GraduationCap
} from 'lucide-react';

const SCHOOL_LIST = [
  'Cameron Secondary School',
  'Cape Vogel High School',
  'Duau High School',
  'Holy Name Secondary School',
  'Hagita Secondary School',
  'Kiriwina High School',
  'Kuiaro High School',
  'Misima High School',
  'Santa Maria Secondary School',
  'Suau High School',
  'Wesley Secondary School',
  'Woodlark Junior School',
  'Yeleyamba Junior High School'
];

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('0');

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    candidate_name: '',
    primary_school: '',
    grade: '9',
    destination_school: 'Cameron Secondary School',
    gender: 'M',
    status: 'Selected'
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkFile, setBulkFile] = useState(null);

  const loadStudents = async () => {
    setLoading(true);
    try {
      let url = `/api/students?school=${encodeURIComponent(selectedSchool)}&grade=${selectedGrade}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchInit = async () => {
      setLoading(true);
      try {
        let url = `/api/students?school=${encodeURIComponent(selectedSchool)}&grade=${selectedGrade}`;
        const res = await fetch(url);
        if (!ignore && res.ok) {
          const data = await res.json();
          setStudents(data);
        }
      } catch (err) {
        console.error('Failed to load students:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchInit();
    return () => { ignore = true; };
  }, [selectedSchool, selectedGrade]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessage('Student added successfully!');
        setFormData({
          candidate_name: '',
          primary_school: '',
          grade: '9',
          destination_school: 'Cameron Secondary School',
          gender: 'M',
          status: 'Selected'
        });
        setShowAddModal(false);
        loadStudents();
      } else {
        setMessage('Failed to add student: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      setMessage('Error connecting to server.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this student from the selection list?')) return;

    try {
      const res = await fetch(`/api/students?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadStudents();
      }
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  const handleExportTextFile = () => {
    const schoolName = selectedSchool || 'All_Schools';
    const gradeName = selectedGrade !== '0' ? `Grade_${selectedGrade}` : 'All_Grades';

    let fileContent = `MILNE BAY PROVINCE DIVISION OF EDUCATION\n`;
    fileContent += `OFFICIAL 2026 SELECTION LIST (${gradeName.toUpperCase()})\n`;
    fileContent += `===========================================================\n\n`;
    fileContent += `School: ${selectedSchool || 'All Milne Bay Province Secondary & High Schools'}\n`;
    fileContent += `Total Candidates: ${filteredStudents.length}\n\n`;
    fileContent += `No. | Candidate Name             | Primary School             | Grd | Destination School          | Status\n`;
    fileContent += `---------------------------------------------------------------------------------------------------------\n`;

    filteredStudents.forEach((s, idx) => {
      const name = (s.candidate_name || s.name || '').padEnd(26);
      const prev = (s.primary_school || s.prev || '').padEnd(26);
      const grd = String(s.grade).padEnd(3);
      const dest = (s.destination_school || '').padEnd(27);
      const stat = s.status || 'Selected';
      fileContent += `${String(idx + 1).padEnd(3)} | ${name} | ${prev} | ${grd} | ${dest} | ${stat}\n`;
    });

    fileContent += `\nExported on: ${new Date().toLocaleString()}\nEnd of Selection List.\n`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MBP_Selection_List_${schoolName.replace(/\s+/g, '_')}_${gradeName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    
    if (!bulkFile) {
      setMessage('Please select a CSV file');
      return;
    }
    
    setBulkUploading(true);
    setMessage('');
    
    // Parse CSV
    const file = bulkFile;
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const text = reader.result;
      const rows = text.split('\n').filter(row => row.trim());
      
      // Skip header if configured
      const hasHeader = document.querySelector('input[value="yes"]');
      let rowsToProcess = rows;
      if (hasHeader && document.querySelector('input[value="yes"]').checked) {
        rowsToProcess = rows.slice(1);
      }
      
      // Skip empty rows
      const skipEmpty = document.querySelector('input[value="no"]') === null;
      const filteredRows = rowsToProcess.filter(row => row.trim().length > 0);
      
      // Parse CSV - simple CSV parsing (comma-separated)
      const studentsData = filteredRows.map(row => {
        const columns = row.split(',');
        return {
          candidate_name: columns[0] ? columns[0].trim() : '',
          primary_school: columns[1] ? columns[1].trim() : '',
          grade: columns[2] ? parseInt(columns[2].trim(), 10) : 9,
          destination_school: columns[3] ? columns[3].trim() : 'Cameron Secondary School',
          status: columns[4] ? columns[4].trim() : 'Selected',
          gender: columns[5] ? columns[5].trim() : 'M'
        };
      });
      
      // Call bulk add function
      const result = await addStudentsBulk(studentsData);
      
      setBulkUploading(false);
      setMessage(`Successfully added ${result.addedStudents.length} students. ${
        result.failedStudents.length > 0 ? ` ${result.failedStudents.length} failed.` : ''
      }`);
      
      setShowBulkUpload(false);
      loadStudents();
    };
    
    reader.readAsText(bulkFile);
  };

  const addStudentsBulk = async (studentsData) => {
    const addedStudents = [];
    const failedStudents = [];

    for (const student of studentsData) {
      try {
        const res = await fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          addedStudents.push(student);
        } else {
          failedStudents.push({ student, error: data.error || 'Unknown error' });
        }
      } catch (err) {
        failedStudents.push({ student, error: 'Network error' });
      }
    }

    return { addedStudents, failedStudents };
  };

  const filteredStudents = students.filter(s => {
    const candidate = (s.candidate_name || s.name || '').toLowerCase();
    const primary = (s.primary_school || s.prev || '').toLowerCase();
    const dest = (s.destination_school || '').toLowerCase();
    const q = search.toLowerCase();
    return candidate.includes(q) || primary.includes(q) || dest.includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AdminHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-amber-400" />
              <span>Student Selection Lists</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Grade 9 and Grade 11 intake records management across Milne Bay Province
            </p>
          </div>
<div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={handleExportTextFile}
              disabled={filteredStudents.length === 0}
              className="flex items-center space-x-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Selection List (.TXT)</span>
            </button>
            <button
              onClick={() => setShowBulkUpload(true)}
              className="btn-gold text-xs font-medium w-full px-4 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/15 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Bulk Upload Students
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-gold text-xs font-medium w-full px-4 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/15 transition-colors"
            >
              Add Candidate
            </button>
          </div>
        </div>

        {/* Bulk Upload Modal */}
        {showBulkUpload && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-panel max-w-lg w-full p-6 border border-slate-800 shadow-2xl relative">
              <div className="flex items-end justify-end mb-4">
                <button
                  onClick={() => setShowBulkUpload(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <i data-lucide="x" className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleBulkUpload} className="space-y-4">
                <p className="text-sm text-slate-500 mb-4">
                  Upload a CSV file to add multiple students to the selection list.
                  <br className="hidden md:block" />
                  <span className="text-xs text-slate-500">
                    Format: candidate_name,primary_school,grade,destination_school,status,gender
                  </span>
                </p>
                <div>
                  <label
                    className="block text-sm font-medium text-slate-500 mb-2"
                  >
                    CSV File
                  </label>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setBulkFile(e.target.files[0])}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-slate-500 mb-2"
                  >
                    Skip header row?
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="header"
                      value="yes"
                      checked
                      className="rounded-md p-1"
                    />
                    <span className="text-sm text-slate-500">Yes</span>
                    <input
                      type="radio"
                      name="header"
                      value="no"
                      className="rounded-md p-1 ml-2"
                    />
                    <span className="text-sm text-slate-500">No</span>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-slate-500 mb-2"
                  >
                    Skip empty rows?
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="empty"
                      value="yes"
                      checked
                      className="rounded-md p-1"
                    />
                    <span className="text-sm text-slate-500">Yes</span>
                    <input
                      type="radio"
                      name="empty"
                      value="no"
                      className="rounded-md p-1 ml-2"
                    />
                    <span className="text-sm text-slate-500">No</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">
                    Maximum {students.length} students currently in system. Uploaded
                    students will be added to the existing list.
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setShowBulkUpload(false)}
                    className="btn-gold w-full text-xs font-medium py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={bulkUploading}
                    className="btn-gold w-full text-xs font-medium py-2"
                  >
                    {bulkUploading ? 'Uploading...' : 'Upload Students'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 mb-6 border border-slate-800 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name, primary school..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="">All Secondary & High Schools</option>
                {SCHOOL_LIST.map((sch) => (
                  <option key={sch} value={sch}>{sch}</option>
                ))}
              </select>
            </div>

            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="0">All Grades</option>
              <option value="9">Grade 9</option>
              <option value="11">Grade 11</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="glass-panel border border-slate-800 overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">Candidate Name</th>
                  <th className="px-5 py-3.5">Primary / Lower Sec</th>
                  <th className="px-5 py-3.5">Grade</th>
                  <th className="px-5 py-3.5">Destination School</th>
                  <th className="px-5 py-3.5">Gender</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-5 py-8 text-center text-slate-500">
                      Loading selection lists...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-5 py-8 text-center text-slate-500">
                      No student records found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s, idx) => (
                    <tr key={s.id || idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-slate-500">{idx + 1}</td>
                      <td className="px-5 py-4 font-semibold text-white">
                        {s.candidate_name || s.name}
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        {s.primary_school || s.prev}
                      </td>
                      <td className="px-5 py-4">
                        <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs px-2 py-0.5 rounded font-mono font-semibold">
                          Grd {s.grade}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-amber-300/90 font-medium">
                        {s.destination_school}
                      </td>
                      <td className="px-5 py-4 text-xs font-semibold text-slate-400">
                        {s.gender || 'M'}
                      </td>
                      <td className="px-5 py-4">
                        <span className="badge-green">
                          {s.status || 'Selected'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="btn-danger p-1.5 inline-flex items-center space-x-1"
                          title="Delete candidate"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Showing {filteredStudents.length} candidate(s)</span>
            <span>Milne Bay Province Division of Education</span>
          </div>
        </div>
      </main>

      {/* Add Candidate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full p-6 border border-slate-800 shadow-2xl relative">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white">Add Candidate to Selection List</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Candidate Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.candidate_name}
                  onChange={(e) => setFormData({ ...formData, candidate_name: e.target.value })}
                  placeholder="e.g. Samuel Kila"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary / Previous School *</label>
                <input
                  type="text"
                  required
                  value={formData.primary_school}
                  onChange={(e) => setFormData({ ...formData, primary_school: e.target.value })}
                  placeholder="e.g. Alotau Primary School"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Grade Level *</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="9">Grade 9</option>
                    <option value="11">Grade 11</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="M">Male (M)</option>
                    <option value="F">Female (F)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Destination School *</label>
                <select
                  value={formData.destination_school}
                  onChange={(e) => setFormData({ ...formData, destination_school: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {SCHOOL_LIST.map((sch) => (
                    <option key={sch} value={sch}>{sch}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold text-xs px-5 py-2"
                >
                  {submitting ? 'Saving...' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
