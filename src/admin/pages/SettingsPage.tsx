import { useEffect, useState, type FormEvent } from 'react';
import { Save, Loader2, Building, Search, Palette, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, PageHeader, Button, Input, Textarea, Toggle } from '@/admin/components/ui';
import { settingsService } from '@/admin/services/api';
import { useAuth } from '@/admin/contexts/AuthContext';

export default function SettingsPage() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [company, setCompany] = useState({ name: '', tagline: '', phone: '', email: '', address: '' });
  const [seo, setSeo] = useState({ metaTitle: '', metaDescription: '', keywords: '', googleAnalyticsId: '' });
  const [header, setHeader] = useState({ phoneNumber: '', ctaButtonText: '', ctaButtonLink: '' });
  const [footer, setFooter] = useState({ description: '', copyrightText: '', linkedin: '', twitter: '', facebook: '', instagram: '' });
  const [maintenance, setMaintenance] = useState({ enabled: false, message: '' });

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const settings = await settingsService.list();
      for (const s of settings) {
        const v = s.value as Record<string, unknown>;
        if (s.key === 'company_info') setCompany({ name: String(v.name || ''), tagline: String(v.tagline || ''), phone: String(v.phone || ''), email: String(v.email || ''), address: String(v.address || '') });
        if (s.key === 'seo_defaults') setSeo({ metaTitle: String(v.metaTitle || ''), metaDescription: String(v.metaDescription || ''), keywords: Array.isArray(v.keywords) ? (v.keywords as string[]).join(', ') : '', googleAnalyticsId: String(v.googleAnalyticsId || '') });
        if (s.key === 'header_config') setHeader({ phoneNumber: String(v.phoneNumber || ''), ctaButtonText: String(v.ctaButtonText || ''), ctaButtonLink: String(v.ctaButtonLink || '') });
        if (s.key === 'footer_config') setFooter({ description: String(v.description || ''), copyrightText: String(v.copyrightText || ''), linkedin: String(v.socialLinks && (v.socialLinks as Record<string,string>).linkedin || ''), twitter: String(v.socialLinks && (v.socialLinks as Record<string,string>).twitter || ''), facebook: String(v.socialLinks && (v.socialLinks as Record<string,string>).facebook || ''), instagram: String(v.socialLinks && (v.socialLinks as Record<string,string>).instagram || '') });
        if (s.key === 'maintenance_mode') setMaintenance({ enabled: Boolean(v.enabled), message: String(v.message || '') });
      }
    } catch { toast.error('Failed to load settings'); }
    setLoading(false);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all([
        settingsService.upsert('company_info', company as unknown as Record<string, unknown>, 'Company Information', 'general'),
        settingsService.upsert('seo_defaults', { ...seo, keywords: seo.keywords.split(',').map(k => k.trim()).filter(Boolean) }, 'SEO Defaults', 'seo'),
        settingsService.upsert('header_config', header, 'Header Configuration', 'navigation'),
        settingsService.upsert('footer_config', { description: footer.description, copyrightText: footer.copyrightText, socialLinks: { linkedin: footer.linkedin, twitter: footer.twitter, facebook: footer.facebook, instagram: footer.instagram } }, 'Footer Configuration', 'navigation'),
        settingsService.upsert('maintenance_mode', maintenance, 'Maintenance Mode', 'general'),
      ]);
      toast.success('Settings saved');
    } catch { toast.error('Failed to save settings'); }
    setSaving(false);
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>;

  return (
    <div>
      <PageHeader title="Website Settings" description="Manage company information, SEO, header, footer, and more" />
      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-slatey-800 dark:text-white"><Building className="h-5 w-5 text-primary-600" /> Company Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Company Name" value={company.name} onChange={e => setCompany(s => ({ ...s, name: e.target.value }))} />
            <Input label="Tagline" value={company.tagline} onChange={e => setCompany(s => ({ ...s, tagline: e.target.value }))} />
            <Input label="Phone Number" value={company.phone} onChange={e => setCompany(s => ({ ...s, phone: e.target.value }))} />
            <Input label="Email" value={company.email} onChange={e => setCompany(s => ({ ...s, email: e.target.value }))} />
            <div className="sm:col-span-2"><Textarea label="Address" value={company.address} onChange={e => setCompany(s => ({ ...s, address: e.target.value }))} rows={2} /></div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-slatey-800 dark:text-white"><Search className="h-5 w-5 text-primary-600" /> SEO Defaults</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Default Meta Title" value={seo.metaTitle} onChange={e => setSeo(s => ({ ...s, metaTitle: e.target.value }))} />
            <Input label="Google Analytics ID" value={seo.googleAnalyticsId} onChange={e => setSeo(s => ({ ...s, googleAnalyticsId: e.target.value }))} placeholder="G-XXXXXXX" />
            <div className="sm:col-span-2"><Textarea label="Default Meta Description" value={seo.metaDescription} onChange={e => setSeo(s => ({ ...s, metaDescription: e.target.value }))} rows={2} /></div>
            <div className="sm:col-span-2"><Input label="Keywords (comma-separated)" value={seo.keywords} onChange={e => setSeo(s => ({ ...s, keywords: e.target.value }))} placeholder="medical billing, RCM, healthcare" /></div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-slatey-800 dark:text-white"><Palette className="h-5 w-5 text-primary-600" /> Header Configuration</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Phone Number" value={header.phoneNumber} onChange={e => setHeader(s => ({ ...s, phoneNumber: e.target.value }))} />
            <Input label="CTA Button Text" value={header.ctaButtonText} onChange={e => setHeader(s => ({ ...s, ctaButtonText: e.target.value }))} />
            <Input label="CTA Button Link" value={header.ctaButtonLink} onChange={e => setHeader(s => ({ ...s, ctaButtonLink: e.target.value }))} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-slatey-800 dark:text-white"><Mail className="h-5 w-5 text-primary-600" /> Footer Configuration</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><Textarea label="Description" value={footer.description} onChange={e => setFooter(s => ({ ...s, description: e.target.value }))} rows={2} /></div>
            <div className="sm:col-span-2"><Input label="Copyright Text" value={footer.copyrightText} onChange={e => setFooter(s => ({ ...s, copyrightText: e.target.value }))} /></div>
            <Input label="LinkedIn URL" value={footer.linkedin} onChange={e => setFooter(s => ({ ...s, linkedin: e.target.value }))} />
            <Input label="Twitter URL" value={footer.twitter} onChange={e => setFooter(s => ({ ...s, twitter: e.target.value }))} />
            <Input label="Facebook URL" value={footer.facebook} onChange={e => setFooter(s => ({ ...s, facebook: e.target.value }))} />
            <Input label="Instagram URL" value={footer.instagram} onChange={e => setFooter(s => ({ ...s, instagram: e.target.value }))} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">Maintenance Mode</h3>
          <div className="space-y-4">
            <Toggle checked={maintenance.enabled} onChange={v => setMaintenance(s => ({ ...s, enabled: v }))} label="Enable maintenance mode" />
            <Textarea label="Maintenance Message" value={maintenance.message} onChange={e => setMaintenance(s => ({ ...s, message: e.target.value }))} rows={2} />
          </div>
        </Card>

        <div className="flex justify-end"><Button type="submit" loading={saving} icon={<Save className="h-4 w-4" />}>Save All Settings</Button></div>
      </form>
    </div>
  );
}
