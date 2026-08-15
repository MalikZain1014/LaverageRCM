import { useEffect, useState } from 'react';
import { Plus, Trash2, GripVertical, Menu, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Input, Select, Toggle, Badge, EmptyState, ConfirmDialog, Skeleton } from '@/admin/components/ui';
import { navigationService } from '@/admin/services/api';
import type { NavItem } from '@/admin/types';

export default function NavigationPage() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<NavItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [newItem, setNewItem] = useState({ label: '', url: '', location: 'header' as 'header' | 'footer' });

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setItems(await navigationService.list()); } catch { toast.error('Failed to load navigation'); }
    setLoading(false);
  }

  async function handleAdd() {
    if (!newItem.label || !newItem.url) { toast.error('Label and URL are required'); return; }
    const maxOrder = items.filter(i => i.location === newItem.location).reduce((max, i) => Math.max(max, i.sort_order), 0);
    try {
      await navigationService.create({ ...newItem, sort_order: maxOrder + 1, is_visible: true, is_dropdown: false, parent_id: null });
      toast.success('Menu item added');
      setNewItem({ label: '', url: '', location: 'header' });
      load();
    } catch { toast.error('Failed to add item'); }
  }

  async function handleToggleVisible(item: NavItem) {
    try { await navigationService.update(item.id, { is_visible: !item.is_visible }); load(); }
    catch { toast.error('Failed to update'); }
  }

  async function handleToggleDropdown(item: NavItem) {
    try { await navigationService.update(item.id, { is_dropdown: !item.is_dropdown }); load(); }
    catch { toast.error('Failed to update'); }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try { await navigationService.remove(deleteTarget.id); toast.success('Item deleted'); setDeleteTarget(null); load(); }
    catch { toast.error('Failed to delete'); }
    setDeleting(false);
  }

  const headerItems = items.filter(i => i.location === 'header').sort((a, b) => a.sort_order - b.sort_order);
  const footerItems = items.filter(i => i.location === 'footer').sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div>
      <PageHeader title="Header & Footer" description="Manage website navigation menu items" />

      <Card className="mb-6 p-6">
        <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">Add Menu Item</h3>
        <div className="grid gap-4 sm:grid-cols-4">
          <Input label="Label" value={newItem.label} onChange={e => setNewItem(s => ({ ...s, label: e.target.value }))} placeholder="About Us" />
          <Input label="URL" value={newItem.url} onChange={e => setNewItem(s => ({ ...s, url: e.target.value }))} placeholder="/about" />
          <Select label="Location" value={newItem.location} onChange={e => setNewItem(s => ({ ...s, location: e.target.value as 'header' | 'footer' }))}><option value="header">Header</option><option value="footer">Footer</option></Select>
          <div className="flex items-end"><Button icon={<Plus className="h-4 w-4" />} onClick={handleAdd}>Add Item</Button></div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="border-b border-slatey-100 px-6 py-4 dark:border-white/10"><h3 className="flex items-center gap-2 font-bold text-slatey-800 dark:text-white"><Menu className="h-5 w-5 text-primary-600" /> Header Menu</h3></div>
          {loading ? <div className="space-y-3 p-6">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div> : headerItems.length === 0 ? <EmptyState title="No header items" /> : (
            <div className="divide-y divide-slatey-100 dark:divide-white/5">
              {headerItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 px-6 py-3">
                  <GripVertical className="h-4 w-4 text-slatey-300" />
                  <div className="flex-1"><p className="font-semibold text-slatey-800 dark:text-slatey-200">{item.label}</p><p className="text-xs text-slatey-500">{item.url}</p></div>
                  {item.is_dropdown && <Badge color="blue">Dropdown</Badge>}
                  <Toggle checked={item.is_visible} onChange={() => handleToggleVisible(item)} />
                  <button onClick={() => handleToggleDropdown(item)} className="rounded-lg px-2 py-1 text-xs font-semibold text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-500/10">{item.is_dropdown ? 'Remove Dropdown' : 'Make Dropdown'}</button>
                  <button onClick={() => setDeleteTarget(item)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="border-b border-slatey-100 px-6 py-4 dark:border-white/10"><h3 className="flex items-center gap-2 font-bold text-slatey-800 dark:text-white"><Menu className="h-5 w-5 text-accent-600" /> Footer Menu</h3></div>
          {loading ? <div className="space-y-3 p-6">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div> : footerItems.length === 0 ? <EmptyState title="No footer items" /> : (
            <div className="divide-y divide-slatey-100 dark:divide-white/5">
              {footerItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 px-6 py-3">
                  <GripVertical className="h-4 w-4 text-slatey-300" />
                  <div className="flex-1"><p className="font-semibold text-slatey-800 dark:text-slatey-200">{item.label}</p><p className="text-xs text-slatey-500">{item.url}</p></div>
                  <Toggle checked={item.is_visible} onChange={() => handleToggleVisible(item)} />
                  <button onClick={() => setDeleteTarget(item)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Menu Item" message={`Delete "${deleteTarget?.label}"?`} loading={deleting} />
    </div>
  );
}
