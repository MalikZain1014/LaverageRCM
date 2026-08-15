import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Plus, Pencil, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, StatusBadge, SearchInput, EmptyState, ConfirmDialog, Skeleton, Badge } from '@/admin/components/ui';
import { blogService } from '@/admin/services/api';
import { useAuth } from '@/admin/contexts/AuthContext';
import type { BlogPost } from '@/admin/types';

export default function BlogsListPage() {
  const { profile } = useAuth();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setItems(await blogService.list()); } catch { toast.error('Failed to load blog posts'); }
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try { await blogService.remove(deleteTarget.id, deleteTarget.title, profile?.email || ''); toast.success('Blog post deleted'); setDeleteTarget(null); load(); }
    catch { toast.error('Failed to delete'); }
    setDeleting(false);
  }

  const filtered = items.filter(b => {
    const ms = b.title.toLowerCase().includes(search.toLowerCase());
    const mf = statusFilter === 'all' || b.status === statusFilter;
    return ms && mf;
  });

  return (
    <div>
      <PageHeader title="Blog Posts" description="Create and manage blog articles" action={<Link to="/admin/blogs/new"><Button icon={<Plus className="h-4 w-4" />}>New Post</Button></Link>} />
      <Card className="mb-4 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search posts..." /></div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="admin-input w-full sm:w-40">
            <option value="all">All Status</option><option value="published">Published</option><option value="draft">Draft</option>
          </select>
        </div>
      </Card>
      <Card>
        {loading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={<Newspaper className="h-8 w-8" />} title="No blog posts found" description="Write your first blog post." action={<Link to="/admin/blogs/new"><Button icon={<Plus className="h-4 w-4" />}>New Post</Button></Link>} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slatey-100 dark:border-white/10">
                <th className="admin-th">Title</th><th className="admin-th">Category</th><th className="admin-th">Author</th><th className="admin-th">Status</th><th className="admin-th">Date</th><th className="admin-th text-right">Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id} className="admin-row">
                    <td className="admin-td">
                      <div className="flex items-center gap-3">
                        {b.featured_image_url ? <img src={b.featured_image_url} alt="" className="h-10 w-10 rounded-lg object-cover" /> : <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600"><Newspaper className="h-5 w-5" /></div>}
                        <div><p className="font-semibold text-slatey-800 dark:text-slatey-200 flex items-center gap-1.5">{b.title}{b.featured && <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />}</p><p className="text-xs text-slatey-500 truncate max-w-xs">{b.excerpt}</p></div>
                      </div>
                    </td>
                    <td className="admin-td"><Badge color="blue">{b.category}</Badge></td>
                    <td className="admin-td">{b.author}</td>
                    <td className="admin-td"><StatusBadge status={b.status} /></td>
                    <td className="admin-td text-xs text-slatey-500">{b.published_at ? new Date(b.published_at).toLocaleDateString() : '—'}</td>
                    <td className="admin-td"><div className="flex justify-end gap-1">
                      <Link to={`/admin/blogs/${b.id}/edit`}><button className="rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 dark:hover:bg-navy-700"><Pencil className="h-4 w-4" /></button></Link>
                      <button onClick={() => setDeleteTarget(b)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Blog Post" message={`Delete "${deleteTarget?.title}"? This cannot be undone.`} loading={deleting} />
    </div>
  );
}
