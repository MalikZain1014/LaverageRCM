import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Users, Loader2, Linkedin, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Input, Textarea, Select, Modal, StatusBadge, SearchInput, EmptyState, ConfirmDialog, Skeleton } from '@/admin/components/ui';
import { supabase } from '@/admin/services/supabaseClient';
import { useAuth } from '@/admin/contexts/AuthContext';
import type { TeamMember } from '@/admin/types';

export default function TeamPage() {
  const { profile } = useAuth();
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<Partial<TeamMember>>({ name: '', designation: '', department: '', photo_url: '', biography: '', social_links: {}, display_order: 0, status: 'published' });
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from('cms_team_members').select('*').order('display_order', { ascending: true });
    if (error) { toast.error('Failed to load team'); } else { setItems((data as TeamMember[]) || []); }
    setLoading(false);
  }

  function openNew() { setEditing(null); setForm({ name: '', designation: '', department: '', photo_url: '', biography: '', social_links: {}, display_order: items.length + 1, status: 'published' }); setModalOpen(true); }
  function openEdit(m: TeamMember) { setEditing(m); setForm(m); setModalOpen(true); }

  async function handleSave() {
    if (!form.name || !form.designation) { toast.error('Name and designation are required'); return; }
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase.from('cms_team_members').update({ ...form, updated_at: new Date().toISOString() }).eq('id', editing.id);
        if (error) throw error;
        toast.success('Team member updated');
      } else {
        const { error } = await supabase.from('cms_team_members').insert(form);
        if (error) throw error;
        toast.success('Team member added');
      }
      setModalOpen(false); load();
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Failed to save'); }
    setSaving(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase.from('cms_team_members').delete().eq('id', deleteTarget.id);
    if (error) { toast.error('Failed to delete'); } else { toast.success('Team member deleted'); setDeleteTarget(null); load(); }
    setDeleting(false);
  }

  const filtered = items.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.designation.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader title="Team Members" description="Manage company professionals" action={<Button icon={<Plus className="h-4 w-4" />} onClick={openNew}>Add Member</Button>} />
      <Card className="mb-4 p-4"><SearchInput value={search} onChange={setSearch} placeholder="Search team members..." /></Card>
      <Card>
        {loading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={<Users className="h-8 w-8" />} title="No team members" description="Add your first team member." action={<Button icon={<Plus className="h-4 w-4" />} onClick={openNew}>Add Member</Button>} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slatey-100 dark:border-white/10"><th className="admin-th">Member</th><th className="admin-th">Department</th><th className="admin-th">Status</th><th className="admin-th text-right">Actions</th></tr></thead>
              <tbody>
                {filtered.map(m => (
                  <tr key={m.id} className="admin-row">
                    <td className="admin-td">
                      <div className="flex items-center gap-3">
                        {m.photo_url ? <img src={m.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" /> : <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100 dark:bg-accent-500/10 text-sm font-bold text-accent-600">{m.name.charAt(0)}</div>}
                        <div><p className="font-semibold text-slatey-800 dark:text-slatey-200">{m.name}</p><p className="text-xs text-slatey-500">{m.designation}</p></div>
                      </div>
                    </td>
                    <td className="admin-td">{m.department}</td>
                    <td className="admin-td"><StatusBadge status={m.status} /></td>
                    <td className="admin-td"><div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(m)} className="rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 dark:hover:bg-navy-700"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteTarget(m)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Member' : 'New Member'} size="lg">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" value={form.name || ''} onChange={e => setForm(s => ({ ...s, name: e.target.value }))} required />
            <Input label="Designation" value={form.designation || ''} onChange={e => setForm(s => ({ ...s, designation: e.target.value }))} placeholder="Chief Medical Officer" required />
            <Input label="Department" value={form.department || ''} onChange={e => setForm(s => ({ ...s, department: e.target.value }))} placeholder="Operations" />
            <Input label="Photo URL" value={form.photo_url || ''} onChange={e => setForm(s => ({ ...s, photo_url: e.target.value }))} placeholder="https://..." />
            <Input label="LinkedIn" value={form.social_links?.linkedin || ''} onChange={e => setForm(s => ({ ...s, social_links: { ...s.social_links, linkedin: e.target.value } }))} placeholder="https://linkedin.com/in/..." />
            <Input label="Twitter" value={form.social_links?.twitter || ''} onChange={e => setForm(s => ({ ...s, social_links: { ...s.social_links, twitter: e.target.value } }))} placeholder="https://twitter.com/..." />
            <Input label="Display Order" type="number" value={form.display_order || 0} onChange={e => setForm(s => ({ ...s, display_order: parseInt(e.target.value) || 0 }))} />
            <Select label="Status" value={form.status || 'published'} onChange={e => setForm(s => ({ ...s, status: e.target.value as TeamMember['status'] }))}><option value="published">Published</option><option value="draft">Draft</option></Select>
          </div>
          <Textarea label="Biography" value={form.biography || ''} onChange={e => setForm(s => ({ ...s, biography: e.target.value }))} rows={4} />
          <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={handleSave} loading={saving}>Save</Button></div>
        </div>
      </Modal>
      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Member" message={`Delete "${deleteTarget?.name}"?`} loading={deleting} />
    </div>
  );
}
