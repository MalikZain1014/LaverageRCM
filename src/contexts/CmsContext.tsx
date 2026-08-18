import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase as adminSupabase } from '@/admin/services/supabaseClient';
import * as Lucide from 'lucide-react';

type ServiceRow = any;
type SpecialtyRow = any;
type BlogRow = any;
type FaqRow = any;
type TestimonialRow = any;

export type CmsState = {
  services: ServiceRow[];
  specialties: SpecialtyRow[];
  blogs: BlogRow[];
  faqs: FaqRow[];
  testimonials: TestimonialRow[];
  ready: boolean;
};

const CmsContext = createContext<CmsState | undefined>(undefined);

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within CmsProvider');
  return ctx;
}

function mapIcon(iconName: string) {
  if (!iconName) return Lucide.FileText;
  // @ts-ignore
  return (Lucide as any)[iconName] || Lucide.FileText;
}

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [specialties, setSpecialties] = useState<SpecialtyRow[]>([]);
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [faqs, setFaqs] = useState<FaqRow[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialRow[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchAll() {
      try {
        const [{ data: sData }, { data: spData }, { data: bData }, { data: fData }, { data: tData }] = await Promise.all([
          adminSupabase.from('cms_services').select('*').eq('status', 'published').order('display_order', { ascending: true }),
          adminSupabase.from('cms_specialties').select('*').eq('status', 'published').order('display_order', { ascending: true }),
          adminSupabase.from('cms_blogs').select('*').eq('status', 'published').order('published_at', { ascending: false }),
          adminSupabase.from('cms_faqs').select('*').eq('status', 'published').order('sort_order', { ascending: true }),
          adminSupabase.from('cms_testimonials').select('*').eq('status', 'published').order('created_at', { ascending: false }),
        ] as any);

        if (!mounted) return;

        setServices((sData || []).map((r: any) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          short: r.short_description || r.excerpt || '',
          description: r.description || '',
          icon: mapIcon(r.icon),
          benefits: r.benefits || [],
          workflow: r.workflow || [],
          process: r.process || [],
          industries: r.industries || [],
          faqs: r.faqs || [],
          banner_image_url: r.banner_image_url || null,
          featured: r.featured || false,
          display_order: r.display_order || 0,
        })));

        setSpecialties((spData || []).map((r: any) => ({
          id: r.id,
          slug: r.slug,
          name: r.name,
          short: r.short_description || '',
          icon: mapIcon(r.icon),
          banner_image_url: r.banner_image_url || null,
          billingChallenges: r.billing_challenges || [],
          howWeHelp: r.how_we_help || [],
          codingExpertise: r.coding_expertise || [],
          claimsManagement: r.claims_management || [],
          revenueOptimization: r.revenue_optimization || [],
          compliance: r.compliance || [],
          faqs: r.faqs || [],
          data: r,
        })));

        setBlogs((bData || []).map((r: any) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          excerpt: r.excerpt,
          content: r.content,
          author: r.author,
          featured_image_url: r.featured_image_url,
          published_at: r.published_at,
          tags: r.tags || [],
        })));

        setFaqs((fData || []).map((r: any) => ({
          id: r.id,
          question: r.question,
          answer: r.answer,
          category: r.category,
          sort_order: r.sort_order,
        })));

        setTestimonials((tData || []).map((r: any) => ({
          id: r.id,
          client_name: r.client_name || r.name || '',
          role: r.role || r.title || '',
          company: r.company || '',
          quote: r.quote || r.message || '',
          photo_url: r.photo_url || null,
          featured: r.featured || false,
        })));

        setReady(true);
      } catch (err) {
        // keep defaults if fetch fails
        console.error('CMS fetch error', err);
        setReady(true);
      }
    }

    fetchAll();

    // realtime subscriptions
    const channel = adminSupabase.channel('public:cms')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_services' }, (payload) => {
        const record = payload.record;
        setServices((prev) => {
          const others = prev.filter((p) => p.id !== record.id);
          if (payload.eventType === 'DELETE') return others;
          const mapped = {
            id: record.id,
            slug: record.slug,
            title: record.title,
            short: record.short_description || record.excerpt || '',
            description: record.description || '',
            icon: mapIcon(record.icon),
            benefits: record.benefits || [],
            workflow: record.workflow || [],
            process: record.process || [],
            industries: record.industries || [],
            faqs: record.faqs || [],
            banner_image_url: record.banner_image_url || null,
            featured: record.featured || false,
            display_order: record.display_order || 0,
          };
          return [...others, mapped].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_specialties' }, (payload) => {
        const record = payload.record;
        setSpecialties((prev) => {
          const others = prev.filter((p) => p.id !== record.id);
          if (payload.eventType === 'DELETE') return others;
          const mapped = {
            id: record.id,
            slug: record.slug,
            name: record.name,
            short: record.short_description || '',
            icon: mapIcon(record.icon),
            banner_image_url: record.banner_image_url || null,
            billingChallenges: record.billing_challenges || [],
            howWeHelp: record.how_we_help || [],
            codingExpertise: record.coding_expertise || [],
            claimsManagement: record.claims_management || [],
            revenueOptimization: record.revenue_optimization || [],
            compliance: record.compliance || [],
            faqs: record.faqs || [],
            data: record,
          };
          return [...others, mapped].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_blogs' }, (payload) => {
        const record = payload.record;
        setBlogs((prev) => {
          const others = prev.filter((p) => p.id !== record.id);
          if (payload.eventType === 'DELETE') return others;
          const mapped = {
            id: record.id,
            slug: record.slug,
            title: record.title,
            excerpt: record.excerpt,
            content: record.content,
            author: record.author,
            featured_image_url: record.featured_image_url,
            published_at: record.published_at,
            tags: record.tags || [],
          };
          return [...others, mapped].sort((a, b) => (new Date(b.published_at || 0).getTime()) - (new Date(a.published_at || 0).getTime()));
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_faqs' }, (payload) => {
        const record = payload.record;
        setFaqs((prev) => {
          const others = prev.filter((p) => p.id !== record.id);
          if (payload.eventType === 'DELETE') return others;
          const mapped = {
            id: record.id,
            question: record.question,
            answer: record.answer,
            category: record.category,
            sort_order: record.sort_order,
          };
          return [...others, mapped].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_testimonials' }, (payload) => {
        const record = payload.record;
        setTestimonials((prev) => {
          const others = prev.filter((p) => p.id !== record.id);
          if (payload.eventType === 'DELETE') return others;
          const mapped = {
            id: record.id,
            client_name: record.client_name || record.name || '',
            role: record.role || record.title || '',
            company: record.company || '',
            quote: record.quote || record.message || '',
            photo_url: record.photo_url || null,
            featured: record.featured || false,
          };
          return [...others, mapped].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        });
      })
      .subscribe();

    return () => {
      mounted = false;
      try {
        channel.unsubscribe();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  const value: CmsState = {
    services,
    specialties,
    blogs,
    faqs,
    testimonials,
    ready,
  };

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
};