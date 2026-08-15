import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Badge, StatusBadge, SearchInput, EmptyState, ConfirmDialog, Skeleton } from '@/admin/components/ui';
import { specialtyService } from '@/admin/services/api';
import { useAuth } from '@/admin/contexts/AuthContext';
import type { Specialty } from '@/admin/types';

export default function SpecialtiesListPage() {
  const { profile } = useAuth();
  const [items, setItems] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Specialty | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setItems(await specialtyService.list()); } catch { toast.error('Failed to load specialties'); }
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await specialtyService.remove(deleteTarget.id, deleteTarget.name, profile?.email || '');
      toast.success('Specialty deleted');
      setDeleteTarget(null);
      load();
    } catch { toast.error('Failed to delete'); }
    setDeleting(false);
  }

  const filtered = items.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader title="Specialties" description="Manage healthcare specialties shown on the website" action={<Link to="/admin/specialties/new"><Button icon={<Plus className="h-4 w-4" />}>Add Specialty</Button></Link>} />
      <Card className="mb-4 p-4"><SearchInput value={search} onChange={setSearch} placeholder="Search specialties..." /></Card>
      <Card>
        {loading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={<Stethoscope className="h-8 w-8" />} title="No specialties found" description="Create your first specialty." action={<Link to="/admin/specialties/new"><Button icon={<Plus className="h-4 w-4" />}>Add Specialty</Button></Link>} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slatey-100 dark:border-white/10">
                <th className="admin-th">Specialty</th>
                <th className="admin-th">Slug</th>
                <th className="admin-th">Status</th>
                <th className="admin-th">Order</th>
                <th className="admin-th text-right">Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="admin-row">
                    <td className="admin-td">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 dark:bg-accent-500/10 text-accent-600"><Stethoscope className="h-5 w-5" /></div>
                        <div><p className="font-semibold text-slatey-800 dark:text-slatey-200">{s.name}</p><p className="text-xs text-slatey-500 truncate max-w-xs">{s.short_description}</p></div>
                      </div>
                    </td>
                    <td className="admin-td"><code className="text-xs text-slatey-500">/{s.slug}</code></td>
                    <td className="admin-td"><StatusBadge status={s.status} /></td>
                    <td className="admin-td"><Badge>{s.display_order}</Badge></td>
                    <td className="admin-td"><div className="flex justify-end gap-1">
                      <Link to={`/admin/specialties/${s.id}/edit`}><button className="rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 dark:hover:bg-navy-700"><Pencil className="h-4 w-4" /></button></Link>
                      <button onClick={() => setDeleteTarget(s)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Specialty" message={`Delete "${deleteTarget?.name}"? This cannot be undone.`} loading={deleting} />
    </div>
  );
}
