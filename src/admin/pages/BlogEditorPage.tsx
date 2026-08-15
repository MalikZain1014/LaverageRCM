import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Card, PageHeader, Button, Input, Textarea, Select, Toggle } from '@/admin/components/ui';
import { blogService } from '@/admin/services/api';
import { useAuth } from '@/admin/contexts/AuthContext';
import { BLOG_CATEGORIES } from '@/admin/constants';
import type { BlogPost } from '@/admin/types';

const empty: Partial<BlogPost> = {
  title: '', slug: '', excerpt: '', content: [], category: BLOG_CATEGORIES[0],
  tags: [], author: '', featured_image_url: '', gallery: [], read_time: '5 min read',
  seo: { title: '', description: '' }, status: 'draft', featured: false, published_at: null,
};

export default function BlogEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const isEdit = !!id;
  const [data, setData] = useState<Partial<BlogPost>>(empty);
  const [contentHtml, setContentHtml] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    blogService.get(id).then(b => {
      if (b) { setData(b); setContentHtml((b.content as string[]).join('\n\n')); }
      setLoading(false);
    });
  }, [id]);

  function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function update<K extends keyof BlogPost>(key: K, value: BlogPost[K]) { setData(d => ({ ...d, [key]: value })); }

  function addTag() { if (!tagInput.trim()) return; update('tags', [...(data.tags || []), tagInput.trim()]); setTagInput(''); }
  function removeTag(i: number) { update('tags', (data.tags || []).filter((_, idx) => idx !== i)); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!data.title || !data.slug) { toast.error('Title and slug are required'); return; }
    const paragraphs = contentHtml.split(/\n\n+/).filter(p => p.trim());
    const payload = { ...data, content: paragraphs };
    setSaving(true);
    try {
      if (isEdit && id) { await blogService.update(id, payload, profile?.email || ''); toast.success('Blog post updated'); }
      else { await blogService.create(payload, profile?.email || ''); toast.success('Blog post created'); }
      navigate('/admin/blogs');
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Failed to save'); }
    setSaving(false);
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>;

  return (
    <div>
      <div className="mb-4"><Link to="/admin/blogs" className="inline-flex items-center gap-1 text-sm text-slatey-500 hover:text-slatey-700 dark:hover:text-slatey-300"><ArrowLeft className="h-4 w-4" /> Back to Blog</Link></div>
      <PageHeader title={isEdit ? 'Edit Blog Post' : 'New Blog Post'} description="Write and publish a blog article" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="p-6">
              <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">Article Content</h3>
              <div className="space-y-4">
                <Input label="Title" value={data.title || ''} onChange={e => { update('title', e.target.value); if (!isEdit) update('slug', slugify(e.target.value)); }} placeholder="7 Proven Strategies..." required />
                <Input label="Slug" value={data.slug || ''} onChange={e => update('slug', slugify(e.target.value))} placeholder="7-proven-strategies" required />
                <Textarea label="Excerpt" value={data.excerpt || ''} onChange={e => update('excerpt', e.target.value)} rows={2} placeholder="Short summary for blog listing" />
                <div>
                  <label className="admin-label">Content</label>
                  <ReactQuill theme="snow" value={contentHtml} onChange={setContentHtml} className="bg-white dark:bg-navy-700" modules={{ toolbar: [['bold','italic','underline'],['blockquote','code-block'],[{'list':'ordered'},{'list':'bullet'}],[{'header':[2,3,4]}],['link'],['clean']] }} style={{ minHeight: '300px' }} />
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">SEO Settings</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Meta Title" value={data.seo?.title || ''} onChange={e => update('seo', { ...data.seo, title: e.target.value })} />
                <Textarea label="Meta Description" value={data.seo?.description || ''} onChange={e => update('seo', { ...data.seo, description: e.target.value })} rows={2} />
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">Publish Settings</h3>
              <div className="space-y-4">
                <Select label="Status" value={data.status || 'draft'} onChange={e => update('status', e.target.value as BlogPost['status'])}><option value="draft">Draft</option><option value="published">Published</option></Select>
                <Input label="Publish Date" type="datetime-local" value={data.published_at ? new Date(data.published_at).toISOString().slice(0,16) : ''} onChange={e => update('published_at', e.target.value ? new Date(e.target.value).toISOString() : null)} />
                <Input label="Read Time" value={data.read_time || ''} onChange={e => update('read_time', e.target.value)} placeholder="5 min read" />
                <div><Toggle checked={data.featured || false} onChange={v => update('featured', v)} label="Featured post" /></div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="mb-4 font-bold text-slatey-800 dark:text-white">Organization</h3>
              <div className="space-y-4">
                <Select label="Category" value={data.category || ''} onChange={e => update('category', e.target.value)}>{BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</Select>
                <Input label="Author" value={data.author || ''} onChange={e => update('author', e.target.value)} placeholder="Author name" />
                <div>
                  <label className="admin-label">Tags</label>
                  <div className="flex gap-2"><input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} placeholder="Add tag..." className="admin-input flex-1" /><Button type="button" variant="outline" icon={<Plus className="h-4 w-4" />} onClick={addTag}>Add</Button></div>
                  <div className="mt-2 flex flex-wrap gap-1.5">{(data.tags || []).map((t, i) => <span key={i} className="inline-flex items-center gap-1 rounded-lg bg-slatey-100 px-2.5 py-1 text-xs text-slatey-700 dark:bg-navy-700 dark:text-slatey-200">{t}<button type="button" onClick={() => removeTag(i)}><X className="h-3 w-3" /></button></span>)}</div>
                </div>
                <Input label="Featured Image URL" value={data.featured_image_url || ''} onChange={e => update('featured_image_url', e.target.value)} placeholder="https://..." />
              </div>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Link to="/admin/blogs"><Button type="button" variant="outline">Cancel</Button></Link>
          <Button type="submit" loading={saving} icon={<Save className="h-4 w-4" />}>{isEdit ? 'Save Changes' : 'Create Post'}</Button>
        </div>
      </form>
    </div>
  );
}
