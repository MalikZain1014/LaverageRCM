import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Input, Textarea, Select, Toggle, Badge } from '@/admin/components/ui';
import { serviceService } from '@/admin/services/api';
import { useAuth } from '@/admin/contexts/AuthContext';
import { SERVICE_ICONS } from '@/admin/constants';
import type { Service } from '@/admin/types';

const emptyService: Partial<Service> = {
  title: '', slug: '', short_description: '', description: '', icon: 'FileText',
  banner_image_url: '', benefits: [], workflow: [], process: [], industries: [],
  faqs: [], seo: { title: '', description: '' }, status: 'draft', featured: false, display_order: 0,
};

export default function ServiceEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const isEdit = !!id;

  const [data, setData] = useState<Partial<Service>>(emptyService);
  const [benefitInput, setBenefitInput] = useState('');
  const [industryInput, setIndustryInput] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    serviceService.get(id).then(s => { if (s) setData(s); setLoading(false); });
  }, [id]);

  function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  function update<K extends keyof Service>(key: K, value: Service[K]) { setData(d => ({ ...d, [key]: value })); }

  function addBenefit() { if (!benefitInput.trim()) return; update('benefits', [...(data.benefits || []), benefitInput.trim()]); setBenefitInput(''); }
  function removeBenefit(i: number) { update('benefits', (data.benefits || []).filter((_, idx) => idx !== i)); }

  function addIndustry() { if (!industryInput.trim()) return; update('industries', [...(data.industries || []), industryInput.trim()]); setIndustryInput(''); }
  function removeIndustry(i: number) { update('industries', (data.industries || []).filter((_, idx) => idx !== i)); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!data.title || !data.slug) { toast.error('Title and slug are required'); return; }
    setSaving(true);
    try {
      if (isEdit && id) {
        await serviceService.update(id, data, profile?.email || '');
        toast.success('Service updated');
      } else {
        await serviceService.create(data, profile?.email || '');
        toast.success('Service created');
      }
      navigate('/admin/services');
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Failed to save service'); }
    setSaving(false);
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>;

  return (
    <div>
      <div className="mb-4">
        <Link to="/admin/services" className="inline-flex items-center gap-1 text-sm text-slatey-500 hover:text-slatey-700 dark:hover:text-slatey-300">
          <ArrowLeft className="h-4 w-4" /> Back to Services
        </Link>
      </div>
      <PageHeader title={isEdit ? 'Edit Service' : 'New Service'} description="Configure the service content shown on the website" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">Basic Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Title" value={data.title || ''} onChange={e => { update('title', e.target.value); if (!isEdit) update('slug', slugify(e.target.value)); }} placeholder="Medical Billing" required />
            <Input label="Slug" value={data.slug || ''} onChange={e => update('slug', slugify(e.target.value))} placeholder="medical-billing" required />
            <div className="sm:col-span-2"><Textarea label="Short Description" value={data.short_description || ''} onChange={e => update('short_description', e.target.value)} rows={2} placeholder="Brief summary shown in service cards" /></div>
            <div className="sm:col-span-2"><Textarea label="Detailed Description" value={data.description || ''} onChange={e => update('description', e.target.value)} rows={5} placeholder="Full description shown on service detail page" /></div>
            <Select label="Icon" value={data.icon || 'FileText'} onChange={e => update('icon', e.target.value)}>
              {SERVICE_ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
            </Select>
            <Input label="Banner Image URL" value={data.banner_image_url || ''} onChange={e => update('banner_image_url', e.target.value)} placeholder="https://..." />
            <Input label="Display Order" type="number" value={data.display_order || 0} onChange={e => update('display_order', parseInt(e.target.value) || 0)} />
            <Select label="Status" value={data.status || 'draft'} onChange={e => update('status', e.target.value as Service['status'])}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
          </div>
          <div className="mt-4"><Toggle checked={data.featured || false} onChange={v => update('featured', v)} label="Featured service (shown prominently)" /></div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">Benefits</h3>
          <div className="flex gap-2">
            <input value={benefitInput} onChange={e => setBenefitInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addBenefit(); } }} placeholder="Add a benefit..." className="admin-input flex-1" />
            <Button type="button" variant="outline" icon={<Plus className="h-4 w-4" />} onClick={addBenefit}>Add</Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(data.benefits || []).map((b, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-lg bg-slatey-100 px-3 py-1.5 text-sm text-slatey-700 dark:bg-navy-700 dark:text-slatey-200">
                {b}<button type="button" onClick={() => removeBenefit(i)}><X className="h-3 w-3 text-slatey-400 hover:text-red-500" /></button>
              </span>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">Industries Served</h3>
          <div className="flex gap-2">
            <input value={industryInput} onChange={e => setIndustryInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addIndustry(); } }} placeholder="Add an industry..." className="admin-input flex-1" />
            <Button type="button" variant="outline" icon={<Plus className="h-4 w-4" />} onClick={addIndustry}>Add</Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(data.industries || []).map((ind, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-lg bg-slatey-100 px-3 py-1.5 text-sm text-slatey-700 dark:bg-navy-700 dark:text-slatey-200">
                {ind}<button type="button" onClick={() => removeIndustry(i)}><X className="h-3 w-3 text-slatey-400 hover:text-red-500" /></button>
              </span>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">SEO Settings</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="SEO Title" value={data.seo?.title || ''} onChange={e => update('seo', { ...data.seo, title: e.target.value })} placeholder="SEO title for search engines" />
            <Textarea label="SEO Description" value={data.seo?.description || ''} onChange={e => update('seo', { ...data.seo, description: e.target.value })} rows={2} placeholder="Meta description" />
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Link to="/admin/services"><Button type="button" variant="outline">Cancel</Button></Link>
          <Button type="submit" loading={saving} icon={<Save className="h-4 w-4" />}>{isEdit ? 'Save Changes' : 'Create Service'}</Button>
        </div>
      </form>
    </div>
  );
}
