import { useEffect, useState, useCallback } from 'react';
import { Image as ImageIcon, Trash2, Upload, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, SearchInput, EmptyState, ConfirmDialog, Skeleton } from '@/admin/components/ui';
import { mediaService } from '@/admin/services/api';
import { useAuth } from '@/admin/contexts/AuthContext';
import type { MediaItem } from '@/admin/types';

export default function MediaPage() {
  const { profile } = useAuth();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await mediaService.list()); } catch { toast.error('Failed to load media'); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleUpload(files: FileList) {
    setUploading(true);
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      const reader = new FileReader();
      const url = await new Promise<string>(resolve => { reader.onload = () => resolve(reader.result as string); reader.readAsDataURL(file); });
      try {
        await mediaService.create({ name: file.name, url, folder: 'general', alt_text: file.name.replace(/\.[^.]+$/, ''), file_size: file.size, mime_type: file.type, width: null, height: null });
      } catch { toast.error(`Failed to upload ${file.name}`); }
    }
    toast.success('Upload complete');
    setUploading(false);
    load();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try { await mediaService.remove(deleteTarget.id); toast.success('Media deleted'); setDeleteTarget(null); load(); }
    catch { toast.error('Failed to delete'); }
    setDeleting(false);
  }

  function copyUrl(url: string) { navigator.clipboard.writeText(url); toast.success('URL copied'); }

  const filtered = items.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Media Library"
        description="Upload and manage images for your website"
        action={
          <label>
            <input type="file" multiple accept="image/*" className="hidden" onChange={e => e.target.files && handleUpload(e.target.files)} />
            <Button icon={uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} disabled={uploading} as="span">{uploading ? 'Uploading...' : 'Upload Images'}</Button>
          </label>
        }
      />
      <Card className="mb-4 p-4"><SearchInput value={search} onChange={setSearch} placeholder="Search media..." /></Card>
      <Card>
        {loading ? (
          <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="aspect-square" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={<ImageIcon className="h-8 w-8" />} title="No media found" description="Upload images to use across your website." />
        ) : (
          <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map(m => (
              <div key={m.id} className="group relative overflow-hidden rounded-xl border border-slatey-200 dark:border-white/10">
                <img src={m.url} alt={m.alt_text} className="aspect-square w-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-between bg-navy-900/0 p-2 opacity-0 transition-all group-hover:bg-navy-900/60 group-hover:opacity-100">
                  <button onClick={() => setDeleteTarget(m)} className="self-end rounded-lg bg-red-600 p-1.5 text-white"><Trash2 className="h-4 w-4" /></button>
                  <div>
                    <p className="truncate text-xs font-semibold text-white">{m.name}</p>
                    <button onClick={() => copyUrl(m.url)} className="mt-1 w-full rounded-lg bg-white/20 py-1 text-xs text-white hover:bg-white/30">Copy URL</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Media" message={`Delete "${deleteTarget?.name}"?`} loading={deleting} />
    </div>
  );
}
