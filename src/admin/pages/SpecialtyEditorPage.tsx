import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Input, Textarea, Select, Toggle } from '@/admin/components/ui';
import { specialtyService } from '@/admin/services/api';
import { useAuth } from '@/admin/contexts/AuthContext';
import { SPECIALTY_ICONS } from '@/admin/constants';
import type { Specialty } from '@/admin/types';

const empty: Partial<Specialty> = {
  name: '', slug: '', short_description: '', icon: 'Stethoscope', banner_image_url: '',
  billing_challenges: [], how_we_help: [], coding_expertise: [], claims_management: [],
  revenue_optimization: [], compliance: [], faqs: [], seo: { title: '', description: '' },
  status: 'draft', display_order: 0,
};

const LIST_FIELDS: { key: keyof Specialty; label: string }[] = [
  { key: 'billing_challenges', label: 'Billing Challenges' },
  { key: 'how_we_help', label: 'How We Help' },
  { key: 'coding_expertise', label: 'Coding Expertise' },
  { key: 'claims_management', label: 'Claims Management' },
  { key: 'revenue_optimization', label: 'Revenue Optimization' },
  { key: 'compliance', label: 'Compliance' },
];

export default function SpecialtyEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const isEdit = !!id;
  const [data, setData] = useState<Partial<Specialty>>(empty);
  const [listInputs, setListInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    specialtyService.get(id).then(s => { if (s) setData(s); setLoading(false); });
  }, [id]);

  function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function update<K extends keyof Specialty>(key: K, value: Specialty[K]) { setData(d => ({ ...d, [key]: value })); }

  function addItem(field: keyof Specialty) {
    const val = listInputs[field]?.trim();
    if (!val) return;
    update(field, [...((data[field] as string[]) || []), val]);
    setListInputs(s => ({ ...s, [field]: '' }));
  }
  function removeItem(field: keyof Specialty, i: number) {
    update(field, ((data[field] as string[]) || []).filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!data.name || !data.slug) { toast.error('Name and slug are required'); return; }
    setSaving(true);
    try {
      if (isEdit && id) { await specialtyService.update(id, data, profile?.email || ''); toast.success('Specialty updated'); }
      else { await specialtyService.create(data, profile?.email || ''); toast.success('Specialty created'); }
      navigate('/admin/specialties');
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Failed to save'); }
    setSaving(false);
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>;

  return (
    <div>
      <div className="mb-4"><Link to="/admin/specialties" className="inline-flex items-center gap-1 text-sm text-slatey-500 hover:text-slatey-700 dark:hover:text-slatey-300"><ArrowLeft className="h-4 w-4" /> Back to Specialties</Link></div>
      <PageHeader title={isEdit ? 'Edit Specialty' : 'New Specialty'} description="Configure specialty content for the website" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">Basic Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" value={data.name || ''} onChange={e => { update('name', e.target.value); if (!isEdit) update('slug', slugify(e.target.value)); }} placeholder="Cardiology" required />
            <Input label="Slug" value={data.slug || ''} onChange={e => update('slug', slugify(e.target.value))} placeholder="cardiology" required />
            <div className="sm:col-span-2"><Textarea label="Short Description" value={data.short_description || ''} onChange={e => update('short_description', e.target.value)} rows={2} /></div>
            <Select label="Icon" value={data.icon || 'Stethoscope'} onChange={e => update('icon', e.target.value)}>{SPECIALTY_ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}</Select>
            <Input label="Banner Image URL" value={data.banner_image_url || ''} onChange={e => update('banner_image_url', e.target.value)} placeholder="https://..." />
            <Input label="Display Order" type="number" value={data.display_order || 0} onChange={e => update('display_order', parseInt(e.target.value) || 0)} />
            <Select label="Status" value={data.status || 'draft'} onChange={e => update('status', e.target.value as Specialty['status'])}><option value="draft">Draft</option><option value="published">Published</option></Select>
          </div>
        </Card>

        {LIST_FIELDS.map(({ key, label }) => (
          <Card key={key} className="p-6">
            <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">{label}</h3>
            <div className="flex gap-2">
              <input value={listInputs[key] || ''} onChange={e => setListInputs(s => ({ ...s, [key]: e.target.value }))} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addItem(key); } }} placeholder={`Add ${label.toLowerCase()}...`} className="admin-input flex-1" />
              <Button type="button" variant="outline" icon={<Plus className="h-4 w-4" />} onClick={() => addItem(key)}>Add</Button>
            </div>
            <div className="mt-3 space-y-2">
              {((data[key] as string[]) || []).map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-slatey-50 px-3 py-2 text-sm text-slatey-700 dark:bg-navy-700 dark:text-slatey-200">
                  <span>{item}</span><button type="button" onClick={() => removeItem(key, i)}><X className="h-4 w-4 text-slatey-400 hover:text-red-500" /></button>
                </div>
              ))}
            </div>
          </Card>
        ))}

        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">SEO Settings</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="SEO Title" value={data.seo?.title || ''} onChange={e => update('seo', { ...data.seo, title: e.target.value })} />
            <Textarea label="SEO Description" value={data.seo?.description || ''} onChange={e => update('seo', { ...data.seo, description: e.target.value })} rows={2} />
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Link to="/admin/specialties"><Button type="button" variant="outline">Cancel</Button></Link>
          <Button type="submit" loading={saving} icon={<Save className="h-4 w-4" />}>{isEdit ? 'Save Changes' : 'Create Specialty'}</Button>
        </div>
      </form>
    </div>
  );
}
