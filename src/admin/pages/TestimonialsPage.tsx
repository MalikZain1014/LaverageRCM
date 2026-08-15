import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Input, Textarea, Select, Modal, Badge, StatusBadge, SearchInput, EmptyState, ConfirmDialog, Skeleton, Toggle } from '@/admin/components/ui';
import { testimonialService } from '@/admin/services/api';
import { useAuth } from '@/admin/contexts/AuthContext';
import type { Testimonial } from '@/admin/types';

export default function TestimonialsPage() {
  const { profile } = useAuth();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Partial<Testimonial>>({ client_name: '', designation: '', company: '', location: '', photo_url: '', review: '', rating: 5, featured: false, status: 'published' });
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setItems(await testimonialService.list()); } catch { toast.error('Failed to load testimonials'); }
    setLoading(false);
  }

  function openNew() { setEditing(null); setForm({ client_name: '', designation: '', company: '', location: '', photo_url: '', review: '', rating: 5, featured: false, status: 'published' }); setModalOpen(true); }
  function openEdit(t: Testimonial) { setEditing(t); setForm(t); setModalOpen(true); }

  async function handleSave() {
    if (!form.client_name || !form.review) { toast.error('Name and review are required'); return; }
    setSaving(true);
    try {
      if (editing) { await testimonialService.update(editing.id, form, profile?.email || ''); toast.success('Testimonial updated'); }
      else { await testimonialService.create(form, profile?.email || ''); toast.success('Testimonial created'); }
      setModalOpen(false); load();
    } catch { toast.error('Failed to save'); }
    setSaving(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try { await testimonialService.remove(deleteTarget.id, deleteTarget.client_name, profile?.email || ''); toast.success('Testimonial deleted'); setDeleteTarget(null); load(); }
    catch { toast.error('Failed to delete'); }
    setDeleting(false);
  }

  const filtered = items.filter(t => t.client_name.toLowerCase().includes(search.toLowerCase()) || t.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader title="Testimonials" description="Manage client testimonials" action={<Button icon={<Plus className="h-4 w-4" />} onClick={openNew}>Add Testimonial</Button>} />
      <Card className="mb-4 p-4"><SearchInput value={search} onChange={setSearch} placeholder="Search testimonials..." /></Card>
      <Card>
        {loading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={<Star className="h-8 w-8" />} title="No testimonials found" description="Add your first testimonial." action={<Button icon={<Plus className="h-4 w-4" />} onClick={openNew}>Add Testimonial</Button>} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slatey-100 dark:border-white/10"><th className="admin-th">Client</th><th className="admin-th">Rating</th><th className="admin-th">Review</th><th className="admin-th">Status</th><th className="admin-th text-right">Actions</th></tr></thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} className="admin-row">
                    <td className="admin-td">
                      <div className="flex items-center gap-3">
                        {t.photo_url ? <img src={t.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" /> : <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-500/10 text-sm font-bold text-primary-600">{t.client_name.charAt(0)}</div>}
                        <div><p className="font-semibold text-slatey-800 dark:text-slatey-200">{t.client_name}{t.featured && <Star className="ml-1 inline h-3.5 w-3.5 text-amber-500 fill-amber-500" />}</p><p className="text-xs text-slatey-500">{t.designation}, {t.company}</p></div>
                      </div>
                    </td>
                    <td className="admin-td"><div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < t.rating ? 'text-amber-500 fill-amber-500' : 'text-slatey-300'}`} />)}</div></td>
                    <td className="admin-td"><p className="text-sm text-slatey-600 dark:text-slatey-300 truncate max-w-md">{t.review}</p></td>
                    <td className="admin-td"><StatusBadge status={t.status} /></td>
                    <td className="admin-td"><div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(t)} className="rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 dark:hover:bg-navy-700"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteTarget(t)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'New Testimonial'} size="lg">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Client Name" value={form.client_name || ''} onChange={e => setForm(s => ({ ...s, client_name: e.target.value }))} required />
            <Input label="Designation" value={form.designation || ''} onChange={e => setForm(s => ({ ...s, designation: e.target.value }))} placeholder="CEO" />
            <Input label="Company" value={form.company || ''} onChange={e => setForm(s => ({ ...s, company: e.target.value }))} />
            <Input label="Location" value={form.location || ''} onChange={e => setForm(s => ({ ...s, location: e.target.value }))} placeholder="Austin, TX" />
            <Input label="Photo URL" value={form.photo_url || ''} onChange={e => setForm(s => ({ ...s, photo_url: e.target.value }))} placeholder="https://..." />
            <Select label="Rating" value={String(form.rating || 5)} onChange={e => setForm(s => ({ ...s, rating: parseInt(e.target.value) }))}>{[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}</Select>
            <Select label="Status" value={form.status || 'published'} onChange={e => setForm(s => ({ ...s, status: e.target.value as Testimonial['status'] }))}><option value="published">Published</option><option value="draft">Draft</option></Select>
          </div>
          <Textarea label="Review" value={form.review || ''} onChange={e => setForm(s => ({ ...s, review: e.target.value }))} rows={4} required />
          <Toggle checked={form.featured || false} onChange={v => setForm(s => ({ ...s, featured: v }))} label="Featured testimonial" />
          <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={handleSave} loading={saving}>Save</Button></div>
        </div>
      </Modal>
      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Testimonial" message={`Delete "${deleteTarget?.client_name}"?`} loading={deleting} />
    </div>
  );
}
