import { useEffect, useState } from 'react';
import { Inbox, Trash2, Mail, Phone, Building, MapPin, Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Badge, StatusBadge, SearchInput, EmptyState, ConfirmDialog, Skeleton, Select, Modal } from '@/admin/components/ui';
import { leadService } from '@/admin/services/api';
import type { Lead } from '@/admin/types';

export default function LeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [viewTarget, setViewTarget] = useState<Lead | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setItems(await leadService.list()); } catch { toast.error('Failed to load leads'); }
    setLoading(false);
  }

  async function handleStatusChange(id: string, status: string) {
    try { await leadService.update(id, { status: status as Lead['status'] }); toast.success('Status updated'); load(); }
    catch { toast.error('Failed to update'); }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try { await leadService.remove(deleteTarget.id); toast.success('Lead deleted'); setDeleteTarget(null); load(); }
    catch { toast.error('Failed to delete'); }
    setDeleting(false);
  }

  function handleExport() {
    const csv = ['Name,Email,Phone,Company,Country,Message,Status,Date'];
    items.forEach(l => {
      csv.push([l.name, l.email, l.phone || '', l.practice_name || '', l.country || '', `"${(l.message || '').replace(/"/g, '""')}"`, l.status, new Date(l.created_at).toLocaleString()].join(','));
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `consultation-leads-${new Date().toISOString().slice(0,10)}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success('Leads exported');
  }

  const filtered = items.filter(l => {
    const ms = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    const mf = statusFilter === 'all' || l.status === statusFilter;
    return ms && mf;
  });

  return (
    <div>
      <PageHeader title="Consultation Leads" description="Manage consultation requests from the website" action={<Button variant="outline" icon={<Download className="h-4 w-4" />} onClick={handleExport}>Export CSV</Button>} />
      <Card className="mb-4 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search by name or email..." /></div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="admin-input w-full sm:w-40">
            <option value="all">All Status</option><option value="unread">New</option><option value="contacted">Contacted</option><option value="in_progress">In Progress</option><option value="completed">Completed</option>
          </select>
        </div>
      </Card>
      <Card>
        {loading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={<Inbox className="h-8 w-8" />} title="No leads found" description="Consultation requests will appear here." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slatey-100 dark:border-white/10"><th className="admin-th">Name</th><th className="admin-th">Contact</th><th className="admin-th">Company</th><th className="admin-th">Status</th><th className="admin-th">Date</th><th className="admin-th text-right">Actions</th></tr></thead>
              <tbody>
                {filtered.map(l => (
                  <tr key={l.id} className="admin-row cursor-pointer" onClick={() => setViewTarget(l)}>
                    <td className="admin-td"><p className="font-semibold text-slatey-800 dark:text-slatey-200">{l.name}</p>{l.specialty && <p className="text-xs text-slatey-500">{l.specialty}</p>}</td>
                    <td className="admin-td"><p className="text-sm">{l.email}</p>{l.phone && <p className="text-xs text-slatey-500">{l.phone}</p>}</td>
                    <td className="admin-td">{l.practice_name || '—'}{l.country && <p className="text-xs text-slatey-500">{l.country}</p>}</td>
                    <td className="admin-td" onClick={e => e.stopPropagation()}>
                      <select value={l.status} onChange={e => handleStatusChange(l.id, e.target.value)} className="admin-input text-xs py-1 w-32">
                        <option value="unread">New</option><option value="contacted">Contacted</option><option value="in_progress">In Progress</option><option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="admin-td text-xs text-slatey-500">{new Date(l.created_at).toLocaleDateString()}</td>
                    <td className="admin-td" onClick={e => e.stopPropagation()}><div className="flex justify-end gap-1">
                      <button onClick={() => setViewTarget(l)} className="rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 dark:hover:bg-navy-700"><Mail className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteTarget(l)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={!!viewTarget} onClose={() => setViewTarget(null)} title="Lead Details" size="md">
        {viewTarget && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="text-lg font-bold text-slatey-800 dark:text-white">{viewTarget.name}</p><StatusBadge status={viewTarget.status} /></div>
            </div>
            <div className="space-y-3 border-t border-slatey-100 pt-4 dark:border-white/10">
              <div className="flex items-center gap-3 text-sm"><Mail className="h-4 w-4 text-slatey-400" /><span>{viewTarget.email}</span></div>
              {viewTarget.phone && <div className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-slatey-400" /><span>{viewTarget.phone}</span></div>}
              {viewTarget.practice_name && <div className="flex items-center gap-3 text-sm"><Building className="h-4 w-4 text-slatey-400" /><span>{viewTarget.practice_name}</span></div>}
              {viewTarget.country && <div className="flex items-center gap-3 text-sm"><MapPin className="h-4 w-4 text-slatey-400" /><span>{viewTarget.country}</span></div>}
              {viewTarget.specialty && <p className="text-sm"><span className="text-slatey-500">Specialty:</span> {viewTarget.specialty}</p>}
            </div>
            {viewTarget.message && (
              <div className="border-t border-slatey-100 pt-4 dark:border-white/10">
                <p className="mb-1 text-sm font-semibold text-slatey-700 dark:text-slatey-300">Message</p>
                <p className="text-sm text-slatey-600 dark:text-slatey-400">{viewTarget.message}</p>
              </div>
            )}
            <p className="text-xs text-slatey-400">Received: {new Date(viewTarget.created_at).toLocaleString()}</p>
          </div>
        )}
      </Modal>
      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Lead" message={`Delete lead from "${deleteTarget?.name}"?`} loading={deleting} />
    </div>
  );
}
