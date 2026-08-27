import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  Activity, AlertTriangle, BadgeCheck, Bone, Brain, ClipboardCheck, Code2, FileText,
  Headset, HeartPulse, Pill, ReceiptText, Scan, Settings, ShieldCheck, Sparkles,
  Stethoscope, TrendingUp, type LucideIcon,
} from 'lucide-react';
import type { BlogPost as CmsBlogPost, Faq as CmsFaq, Service as CmsService, Specialty as CmsSpecialty, Testimonial as CmsTestimonial } from '@/admin/types';
import type { ServiceDetail } from '@/data/services';
import type { SpecialtyDetail } from '@/data/specialties';
import { publicContentService } from '@/services/publicContentService';
import { publicSupabase } from '@/lib/publicSupabase';
import { blogContentToHtml } from '@/utils/blogContent';

const iconMap: Record<string, LucideIcon> = {
  Activity, AlertTriangle, BadgeCheck, Bone, Brain, ClipboardCheck, Code2, FileText,
  Headset, HeartPulse, Pill, ReceiptText, Scan, Settings, ShieldCheck, Sparkles,
  Stethoscope, TrendingUp,
};

export interface PublicBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  content: string;
}

export interface PublicFaq { id: string; category: string; question: string; answer: string; }
export interface PublicTestimonial { id: string; quote: string; name: string; role: string; location: string; rating: number; }

interface PublicContent {
  services: ServiceDetail[];
  specialties: SpecialtyDetail[];
  blogPosts: PublicBlogPost[];
  faqs: PublicFaq[];
  testimonials: PublicTestimonial[];
}

const PublicContentContext = createContext<PublicContent>({ services: [], specialties: [], blogPosts: [], faqs: [], testimonials: [] });

function mapService(row: CmsService): ServiceDetail {
  return {
    slug: row.slug, title: row.title, short: row.short_description, description: row.description,
    icon: iconMap[row.icon] || FileText, whyItMatters: row.description, benefits: row.benefits || [],
    workflow: row.workflow || [], process: row.process || [], industries: row.industries || [], faqs: row.faqs || [],
  };
}

function mapSpecialty(row: CmsSpecialty): SpecialtyDetail {
  return {
    slug: row.slug, name: row.name, short: row.short_description, icon: iconMap[row.icon] || Stethoscope,
    billingChallenges: row.billing_challenges || [], howWeHelp: row.how_we_help || [], codingExpertise: row.coding_expertise || [],
    claimsManagement: row.claims_management || [], revenueOptimization: row.revenue_optimization || [],
    compliance: row.compliance || [], faqs: row.faqs || [],
  };
}

function mapBlog(row: CmsBlogPost): PublicBlogPost {
  return {
    id: row.id, slug: row.slug, title: row.title, excerpt: row.excerpt, category: row.category, author: row.author,
    date: (row.published_at || row.created_at).slice(0, 10), readTime: row.read_time, featured: row.featured, content: blogContentToHtml(row.content),
  };
}

function mapTestimonial(row: CmsTestimonial): PublicTestimonial {
  return { id: row.id, quote: row.review, name: row.client_name, role: row.designation, location: row.location, rating: row.rating };
}

export function PublicContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PublicContent>({ services: [], specialties: [], blogPosts: [], faqs: [], testimonials: [] });

  useEffect(() => {
    let active = true;
    const reportError = (contentType: string, error: unknown) => {
      console.error(`Failed to load public ${contentType}:`, error);
    };

    const load = async () => {
      const loadServices = async () => {
        try {
          const data = await publicContentService.listPublishedServices();
          if (active) setContent((current) => ({ ...current, services: data.map(mapService) }));
        } catch (error) { reportError('services', error); }
      };

      const loadSpecialties = async () => {
        try {
          const data = await publicContentService.listPublishedSpecialties();
          if (active) setContent((current) => ({ ...current, specialties: data.map(mapSpecialty) }));
        } catch (error) { reportError('specialties', error); }
      };

      const loadBlogs = async () => {
        try {
          const data = await publicContentService.listPublishedBlogs();
          if (active) setContent((current) => ({ ...current, blogPosts: data.map(mapBlog) }));
        } catch (error) { reportError('blogs', error); }
      };

      const loadFaqs = async () => {
        try {
          const data = await publicContentService.listPublishedFaqs();
          if (active) setContent((current) => ({
            ...current,
            faqs: data.map((row) => ({ id: row.id, category: row.category, question: row.question, answer: row.answer })),
          }));
        } catch (error) { reportError('faqs', error); }
      };

      const loadTestimonials = async () => {
        try {
          const data = await publicContentService.listPublishedTestimonials();
          if (active) setContent((current) => ({ ...current, testimonials: data.map(mapTestimonial) }));
        } catch (error) { reportError('testimonials', error); }
      };

      await Promise.all([loadServices(), loadSpecialties(), loadBlogs(), loadFaqs(), loadTestimonials()]);
    };
    load();
    const channel = publicSupabase.channel('public-content-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_services' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_specialties' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_blogs' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_faqs' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_testimonials' }, load)
      .subscribe();
    return () => { active = false; publicSupabase.removeChannel(channel); };
  }, []);

  return <PublicContentContext.Provider value={content}>{children}</PublicContentContext.Provider>;
}

export function usePublicContent() { return useContext(PublicContentContext); }