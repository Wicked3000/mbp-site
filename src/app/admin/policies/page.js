'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { FileText, Plus, Trash2, CheckCircle2, AlertCircle, Edit2, X } from 'lucide-react';

export default function PoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    category_id: '1',
    category_name: 'Governance & Administration',
    title: '',
    description: '',
    document_url: '',
    thumbnail_url: '',
    file_type: 'PDF',
    file_size: '',
    order_index: 0,
    active: 1,
    published_at: new Date().toISOString().split('T')[0]
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [polRes, catRes] = await Promise.all([
        fetch('/api/policies'),
        fetch('/api/policies?type=categories')
      ]);
      if (polRes.ok) setPolicies(await polRes.json());
      if (catRes.ok) setCategories(await catRes.json());
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    const cat = categories.find(c => Number(c.id) === Number(catId));
    setFormData({
      ...formData,
      category_id: catId,
      category_name: cat ? cat.name : ''
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const isEditing = editingId !== null;
      const url = '/api/policies';
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing ? { ...formData, id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setMessage({ type: 'success', text: isEditing ? 'Policy updated successfully!' : 'Policy added successfully!' });
        setShowAddModal(false);
        setEditingId(null);
        setFormData({
          category_id: '1',
          category_name: 'Governance & Administration',
          title: '',
          description: '',
          document_url: '',
          thumbnail_url: '',
          file_type: 'PDF',
          file_size: '',
          order_index: 0,
          active: 1,
          published_at: new Date().toISOString().split('T')[0]
        });
        loadData();
      } else {
        setMessage({ type: 'error', text: data.error || 'Operation failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (field === 'document_url') setUploadingDoc(true);
    if (field === 'thumbnail_url') setUploadingThumb(true);

    const form = new FormData();
    form.append('file', file);
    form.append('folder', 'policies');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormData(prev => {
          const newData = { ...prev, [field]: data.url };
          if (field === 'document_url') {
            const mb = (file.size / (1024 * 1024)).toFixed(1);
            const ext = file.name.split('.').pop().toUpperCase();
            newData.file_size = mb > 0 ? `${mb} MB` : `${(file.size / 1024).toFixed(0)} KB`;
            newData.file_type = ext;
          }
          return newData;
        });
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      if (field === 'document_url') setUploadingDoc(false);
      if (field === 'thumbnail_url') setUploadingThumb(false);
    }
  };

  const openEdit = (policy) => {
    setEditingId(policy.id);
    setFormData({
      category_id: policy.category_id,
      category_name: policy.category_name,
      title: policy.title,
      description: policy.description || '',
      document_url: policy.document_url || '',
      thumbnail_url: policy.thumbnail_url || '',
      file_type: policy.file_type || 'PDF',
      file_size: policy.file_size || '',
      order_index: policy.order_index || 0,
      active: policy.active,
      published_at: policy.published_at ? new Date(policy.published_at).toISOString().split('T')[0] : ''
    });
    setShowAddModal(true);
  };

  const deletePolicy = async (id) => {
    if (!confirm('Are you sure you want to delete this policy document?')) return;
    try {
      const res = await fetch(`/api/policies?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPolicies(policies.filter(p => p.id !== id));
      } else {
        alert('Failed to delete policy');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting policy');
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col lg:pl-60">
      <AdminHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-[#1565C0]/40">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center space-x-3">
              <FileText className="w-8 h-8 text-[#1565C0]" />
              <span>Policy Documents</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">Manage official policies and guidelines.</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({
                  category_id: categories.length > 0 ? categories[0].id : '1',
                  category_name: categories.length > 0 ? categories[0].name : 'Governance & Administration',
                  title: '',
                  description: '',
                  document_url: '',
                  thumbnail_url: '',
                  file_type: 'PDF',
                  file_size: '',
                  order_index: 0,
                  active: 1,
                  published_at: new Date().toISOString().split('T')[0]
                });
                setShowAddModal(true);
              }}
              className="btn-gold flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Policy Document</span>
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
            message.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
          }`}>
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-medium text-sm">{message.text}</span>
            <button onClick={() => setMessage('')} className="ml-auto opacity-70 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="bg-[#0a192f]/90 border border-[#1565C0]/30 rounded-xl overflow-hidden backdrop-blur">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#0D47A1]/50 border-b border-[#1565C0]/40 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Active</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1565C0]/20">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                      Loading policies...
                    </td>
                  </tr>
                ) : policies.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                      No policy documents found.
                    </td>
                  </tr>
                ) : (
                  policies.map((p) => (
                    <tr key={p.id} className="hover:bg-[#1565C0]/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{p.title}</div>
                        <div className="text-xs text-slate-400 mt-1 truncate max-w-xs">{p.description}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{p.category_name}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase ${p.active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'}`}>
                          {p.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-md transition-colors"
                          title="Edit Policy"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePolicy(p.id)}
                          className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-md transition-colors"
                          title="Delete Policy"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/80 backdrop-blur-sm">
            <div className="bg-[#0D47A1] w-full max-w-lg rounded-2xl border border-[#1565C0]/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 border-b border-[#1565C0]/50 flex items-center justify-between bg-gradient-to-r from-[#0D47A1] to-[#1565C0]">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>{editingId ? 'Edit Policy Document' : 'Add Policy Document'}</span>
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-300 hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <form id="policyForm" onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Category</label>
                    <select
                      value={formData.category_id}
                      onChange={handleCategoryChange}
                      className="w-full bg-[#0a192f]/50 border border-[#1565C0]/40 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-[#0a192f]/50 border border-[#1565C0]/40 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="e.g. Provincial School Governance Framework"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Description</label>
                    <textarea
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-[#0a192f]/50 border border-[#1565C0]/40 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="Short description of the policy..."
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Document File</label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e, 'document_url')}
                        className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {uploadingDoc && <p className="text-xs text-amber-400 mt-1">Uploading...</p>}
                      {formData.document_url && <p className="text-xs text-emerald-400 mt-1 truncate">Uploaded: {formData.document_url.split('/').pop()}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Thumbnail Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'thumbnail_url')}
                        className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {uploadingThumb && <p className="text-xs text-amber-400 mt-1">Uploading...</p>}
                      {formData.thumbnail_url && <p className="text-xs text-emerald-400 mt-1 truncate">Uploaded: {formData.thumbnail_url.split('/').pop()}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">File Type</label>
                      <input
                        type="text"
                        value={formData.file_type}
                        onChange={(e) => setFormData({ ...formData, file_type: e.target.value })}
                        className="w-full bg-[#0a192f]/50 border border-[#1565C0]/40 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">File Size</label>
                      <input
                        type="text"
                        value={formData.file_size}
                        onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                        className="w-full bg-[#0a192f]/50 border border-[#1565C0]/40 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        placeholder="e.g. 2.4 MB"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Order</label>
                      <input
                        type="number"
                        value={formData.order_index}
                        onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#0a192f]/50 border border-[#1565C0]/40 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Published At</label>
                      <input
                        type="date"
                        value={formData.published_at}
                        onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                        className="w-full bg-[#0a192f]/50 border border-[#1565C0]/40 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Status</label>
                      <select
                        value={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: parseInt(e.target.value) })}
                        className="w-full bg-[#0a192f]/50 border border-[#1565C0]/40 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="px-6 py-4 border-t border-[#1565C0]/50 bg-[#0a192f]/30 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-[#1565C0]/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="policyForm"
                  disabled={submitting}
                  className="btn-gold flex items-center space-x-2 px-5 py-2 rounded-lg font-bold text-sm"
                >
                  {submitting ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </span>
                  ) : (
                    <span>{editingId ? 'Update Policy' : 'Save Policy'}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
