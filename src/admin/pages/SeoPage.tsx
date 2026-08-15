import { useEffect, useState } from 'react';
import { Save, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Input, Textarea } from '@/admin/components/ui';
import { seoService } from '@/admin/services/api';
import type { SeoRecord } from '@/admin/types';

export default function SeoPage() {
  const [items, setItems] = useState<SeoRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<Set<string>>(new Set());

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setItems(await seoService.list()); } catch { toast.error('Failed to load SEO settings'); }
    setLoading(false);
  }

  function updateField(id: string, field: keyof SeoRecord, value: unknown) {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value as never } : i));
  }

  async function handleSave(item: SeoRecord) {
    setSaving(s => new Set(s).add(item.id));
    try {
      await seoService.upsert(item.page_key, {
        meta_title: item.meta_title, meta_description: item.meta_description,
        keywords: item.keywords, canonical_url: item.canonical_url,
        og_title: item.og_title, og_description: item.og_description,
        twitter_card: item.twitter_card, robots: item.robots,
      });
      toast.success(`${item.page_name} SEO saved`);
    } catch { toast.error('Failed to save'); }
    setSaving(s => { const n = new Set(s); n.delete(item.id); return n; });
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>;

  return (
    <div>
      <PageHeader title="SEO Settings" description="Manage meta tags and SEO data for each page" />
      <div className="space-y-6">
        {items.map(item => (
          <Card key={item.id} className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-bold text-slatey-800 dark:text-white"><Search className="h-5 w-5 text-primary-600" /> {item.page_name}</h3>
              <Button size="sm" icon={<Save className="h-4 w-4" />} loading={saving.has(item.id)} onClick={() => handleSave(item)}>Save</Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Meta Title" value={item.meta_title} onChange={e => updateField(item.id, 'meta_title', e.target.value)} />
              <Input label="Canonical URL" value={item.canonical_url || ''} onChange={e => updateField(item.id, 'canonical_url', e.target.value)} />
              <div className="sm:col-span-2"><Textarea label="Meta Description" value={item.meta_description} onChange={e => updateField(item.id, 'meta_description', e.target.value)} rows={2} /></div>
              <Input label="Keywords (comma-separated)" value={Array.isArray(item.keywords) ? item.keywords.join(', ') : ''} onChange={e => updateField(item.id, 'keywords', e.target.value.split(',').map(k => k.trim()))} />
              <Input label="Twitter Card Type" value={item.twitter_card} onChange={e => updateField(item.id, 'twitter_card', e.target.value)} />
              <Input label="OG Title" value={item.og_title || ''} onChange={e => updateField(item.id, 'og_title', e.target.value)} />
              <Textarea label="OG Description" value={item.og_description || ''} onChange={e => updateField(item.id, 'og_description', e.target.value)} rows={2} />
              <Input label="Robots Directive" value={item.robots} onChange={e => updateField(item.id, 'robots', e.target.value)} placeholder="index, follow" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
