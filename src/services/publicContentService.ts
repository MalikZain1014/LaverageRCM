import { supabase } from '@/lib/supabase';
import type {
  BlogPost as CmsBlogPost,
  Faq as CmsFaq,
  Service as CmsService,
  Specialty as CmsSpecialty,
  Testimonial as CmsTestimonial,
} from '@/admin/types';

async function getPublishedRows<T>(table: string, orderBy?: string, order?: { ascending?: boolean; nullsFirst?: boolean }) {
  let query = supabase.from(table).select('*').eq('status', 'published');

  if (orderBy) {
    if (order) {
      query = query.order(orderBy, order);
    } else {
      query = query.order(orderBy);
    }
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as T[];
}

export const publicContentService = {
  async listPublishedServices() {
    return getPublishedRows<CmsService>('cms_services', 'display_order');
  },

  async listPublishedSpecialties() {
    return getPublishedRows<CmsSpecialty>('cms_specialties', 'display_order');
  },

  async listPublishedBlogs() {
    return getPublishedRows<CmsBlogPost>('cms_blogs', 'published_at', { ascending: false, nullsFirst: false });
  },

  async listPublishedFaqs() {
    return getPublishedRows<CmsFaq>('cms_faqs', 'sort_order');
  },

  async listPublishedTestimonials() {
    return getPublishedRows<CmsTestimonial>('cms_testimonials', 'created_at', { ascending: false });
  },
};
