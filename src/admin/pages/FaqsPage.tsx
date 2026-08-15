import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, HelpCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Input, Textarea, Select, Modal, Badge, StatusBadge, SearchInput, EmptyState, ConfirmDialog, Skeleton } from '@/admin/components/ui';
import { faqService } from '@/admin/services/api';
import { useAuth } from '@/admin/contexts/AuthContext';
import { FAQ_CATEGORIES } from '@/admin/constants';
import type { Faq } from '@/admin/types';

export default function FaqsPage() {
  const { profile } = useAuth();
  const [items, setItems] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [form, setForm] = useState<Partial<Faq>>({ question: '', answer: '', category: FAQ_CATEGORIES[0], sort_order: 0, status: 'published' });
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Faq | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setItems(await faqService.list()); } catch { toast.error('Failed to load FAQs'); }
    setLoading(false);
  }

  function openNew() { setEditing(null); setForm({ question: '', answer: '', category: FAQ_CATEGORIES[0], sort_order: items.length + 1, status: 'published' }); setModalOpen(true); }
  function openEdit(f: Faq) { setEditing(f); setForm(f); setModalOpen(true); }

  async function handleSave() {
    if (!form.question || !form.answer) { toast.error('Question and answer are required'); return; }
    setSaving(true);
    try {
      if (editing) { await faqService.update(editing.id, form, profile?.email || ''); toast.success('FAQ updated'); }
      else { await faqService.create(form, profile?.email || ''); toast.success('FAQ created'); }
      setModalOpen(false); load();
    } catch { toast.error('Failed to save'); }
    setSaving(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try { await faqService.remove(deleteTarget.id, deleteTarget.question, profile?.email || ''); toast.success('FAQ deleted'); setDeleteTarget(null); load(); }
    catch { toast.error('Failed to delete'); }
    setDeleting(false);
  }

  const filtered = items.filter(f => {
    const ms = f.question.toLowerCase().includes(search.toLowerCase());
    const mc = catFilter === 'all' || f.category === catFilter;
    return ms && mc;
  });

  return (
    <div>
      <PageHeader title="FAQs" description="Manage frequently asked questions" action={<Button icon={<Plus className="h-4 w-4" />} onClick={openNew}>Add FAQ</Button>} />
      <Card className="mb-4 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search FAQs..." /></div>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="admin-input w-full sm:w-48"><option value="all">All Categories</option>{FAQ_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select>
        </div>
      </Card>
      <Card>
        {loading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={<HelpCircle className="h-8 w-8" />} title="No FAQs found" description="Add your first FAQ." action={<Button icon={<Plus className="h-4 w-4" />} onClick={openNew}>Add FAQ</Button>} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slatey-100 dark:border-white/10"><th className="admin-th">Question</th><th className="admin-th">Category</th><th className="admin-th">Order</th><th className="admin-th">Status</th><th className="admin-th text-right">Actions</th></tr></thead>
              <tbody>
                {filtered.map(f => (
                  <tr key={f.id} className="admin-row">
                    <td className="admin-td"><p className="font-semibold text-slatey-800 dark:text-slatey-200">{f.question}</p><p className="text-xs text-slatey-500 truncate max-w-md">{f.answer}</p></td>
                    <td className="admin-td"><Badge color="blue">{f.category}</Badge></td>
                    <td className="admin-td">{f.sort_order}</td>
                    <td className="admin-td"><StatusBadge status={f.status} /></td>
                    <td className="admin-td"><div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(f)} className="rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 dark:hover:bg-navy-700"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteTarget(f)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit FAQ' : 'New FAQ'} size="lg">
        <div className="space-y-4">
          <Input label="Question" value={form.question || ''} onChange={e => setForm(s => ({ ...s, question: e.target.value }))} placeholder="What is revenue cycle management?" />
          <Textarea label="Answer" value={form.answer || ''} onChange={e => setForm(s => ({ ...s, answer: e.target.value }))} rows={4} placeholder="Detailed answer..." />
          <div className="grid grid-cols-3 gap-4">
            <Select label="Category" value={form.category || ''} onChange={e => setForm(s => ({ ...s, category: e.target.value }))}>{FAQ_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</Select>
            <Input label="Order" type="number" value={form.sort_order || 0} onChange={e => setForm(s => ({ ...s, sort_order: parseInt(e.target.value) || 0 }))} />
            <Select label="Status" value={form.status || 'published'} onChange={e => setForm(s => ({ ...s, status: e.target.value as Faq['status'] }))}><option value="published">Published</option><option value="draft">Draft</option></Select>
          </div>
          <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={handleSave} loading={saving}>Save</Button></div>
        </div>
      </Modal>
      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete FAQ" message={`Delete "${deleteTarget?.question}"?`} loading={deleting} />
    </div>
  );
}
