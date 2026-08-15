import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Plus, Pencil, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Badge, StatusBadge, SearchInput, EmptyState, ConfirmDialog, Skeleton } from '@/admin/components/ui';
import { serviceService } from '@/admin/services/api';
import { useAuth } from '@/admin/contexts/AuthContext';
import type { Service } from '@/admin/types';

export default function ServicesListPage() {
  const { profile } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await serviceService.list();
      setServices(data);
    } catch { toast.error('Failed to load services'); }
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await serviceService.remove(deleteTarget.id, deleteTarget.title, profile?.email || '');
      toast.success('Service deleted');
      setDeleteTarget(null);
      load();
    } catch { toast.error('Failed to delete service'); }
    setDeleting(false);
  }

  const filtered = services.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.slug.includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <PageHeader
        title="Services"
        description="Manage your service offerings displayed on the website"
        action={<Link to="/admin/services/new"><Button icon={<Plus className="h-4 w-4" />}>Add Service</Button></Link>}
      />

      <Card className="mb-4 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search services..." /></div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="admin-input w-full sm:w-40">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={<Briefcase className="h-8 w-8" />} title="No services found" description="Get started by creating your first service." action={<Link to="/admin/services/new"><Button icon={<Plus className="h-4 w-4" />}>Add Service</Button></Link>} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slatey-100 dark:border-white/10">
                <th className="admin-th">Service</th>
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
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slatey-800 dark:text-slatey-200">{s.title}</p>
                          <p className="text-xs text-slatey-500 truncate max-w-xs">{s.short_description}</p>
                        </div>
                        {s.featured && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                      </div>
                    </td>
                    <td className="admin-td"><code className="text-xs text-slatey-500">/{s.slug}</code></td>
                    <td className="admin-td"><StatusBadge status={s.status} /></td>
                    <td className="admin-td"><Badge>{s.display_order}</Badge></td>
                    <td className="admin-td">
                      <div className="flex justify-end gap-1">
                        <Link to={`/admin/services/${s.id}/edit`}><button className="rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 dark:hover:bg-navy-700"><Pencil className="h-4 w-4" /></button></Link>
                        <button onClick={() => setDeleteTarget(s)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Service" message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`} loading={deleting} />
    </div>
  );
}
