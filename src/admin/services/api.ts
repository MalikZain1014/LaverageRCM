import { supabase } from '@/admin/services/supabaseClient';
import type {
  Service, Specialty, BlogPost, Faq, Testimonial, Lead, SiteSetting, NavItem, SeoRecord, ActivityLog, MediaItem, CmsUser,
} from '@/admin/types';

function logActivity(action: string, entityType: string, entityLabel: string, userEmail: string) {
  supabase.from('cms_activity').insert({
    action,
    entity_type: entityType,
    entity_label: entityLabel,
    user_email: userEmail,
  }).then(() => {});
}

export const activityService = {
  async list(limit = 10) {
    const { data, error } = await supabase
      .from('cms_activity')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data as ActivityLog[];
  },
  log: logActivity,
};

export const serviceService = {
  async list() {
    const { data, error } = await supabase
      .from('cms_services')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data as Service[];
  },
  async get(id: string) {
    const { data, error } = await supabase
      .from('cms_services')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data as Service | null;
  },
  async create(s: Partial<Service>, userEmail: string) {
    const { data, error } = await supabase
      .from('cms_services')
      .insert({ ...s, created_by: undefined })
      .select()
      .single();
    if (error) throw error;
    logActivity('created', 'service', s.title || '', userEmail);
    return data as Service;
  },
  async update(id: string, updates: Partial<Service>, userEmail: string) {
    const { data, error } = await supabase
      .from('cms_services')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    logActivity('updated', 'service', updates.title || id, userEmail);
    return data as Service;
  },
  async remove(id: string, label: string, userEmail: string) {
    const { error } = await supabase.from('cms_services').delete().eq('id', id);
    if (error) throw error;
    logActivity('deleted', 'service', label, userEmail);
  },
};

export const specialtyService = {
  async list() {
    const { data, error } = await supabase
      .from('cms_specialties')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data as Specialty[];
  },
  async get(id: string) {
    const { data, error } = await supabase
      .from('cms_specialties')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data as Specialty | null;
  },
  async create(s: Partial<Specialty>, userEmail: string) {
    const { data, error } = await supabase
      .from('cms_specialties')
      .insert({ ...s, created_by: undefined })
      .select()
      .single();
    if (error) throw error;
    logActivity('created', 'specialty', s.name || '', userEmail);
    return data as Specialty;
  },
  async update(id: string, updates: Partial<Specialty>, userEmail: string) {
    const { data, error } = await supabase
      .from('cms_specialties')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    logActivity('updated', 'specialty', updates.name || id, userEmail);
    return data as Specialty;
  },
  async remove(id: string, label: string, userEmail: string) {
    const { error } = await supabase.from('cms_specialties').delete().eq('id', id);
    if (error) throw error;
    logActivity('deleted', 'specialty', label, userEmail);
  },
};

export const blogService = {
  async list() {
    const { data, error } = await supabase
      .from('cms_blogs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as BlogPost[];
  },
  async get(id: string) {
    const { data, error } = await supabase
      .from('cms_blogs')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data as BlogPost | null;
  },
  async create(b: Partial<BlogPost>, userEmail: string) {
    const { data, error } = await supabase
      .from('cms_blogs')
      .insert({ ...b, created_by: undefined })
      .select()
      .single();
    if (error) throw error;
    logActivity('created', 'blog', b.title || '', userEmail);
    return data as BlogPost;
  },
  async update(id: string, updates: Partial<BlogPost>, userEmail: string) {
    const { data, error } = await supabase
      .from('cms_blogs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    logActivity('updated', 'blog', updates.title || id, userEmail);
    return data as BlogPost;
  },
  async remove(id: string, label: string, userEmail: string) {
    const { error } = await supabase.from('cms_blogs').delete().eq('id', id);
    if (error) throw error;
    logActivity('deleted', 'blog', label, userEmail);
  },
};

export const faqService = {
  async list() {
    const { data, error } = await supabase
      .from('cms_faqs')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data as Faq[];
  },
  async create(f: Partial<Faq>, userEmail: string) {
    const { data, error } = await supabase
      .from('cms_faqs')
      .insert({ ...f, created_by: undefined })
      .select()
      .single();
    if (error) throw error;
    logActivity('created', 'faq', f.question || '', userEmail);
    return data as Faq;
  },
  async update(id: string, updates: Partial<Faq>, userEmail: string) {
    const { data, error } = await supabase
      .from('cms_faqs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Faq;
  },
  async remove(id: string, label: string, userEmail: string) {
    const { error } = await supabase.from('cms_faqs').delete().eq('id', id);
    if (error) throw error;
    logActivity('deleted', 'faq', label, userEmail);
  },
};

export const testimonialService = {
  async list() {
    const { data, error } = await supabase
      .from('cms_testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Testimonial[];
  },
  async create(t: Partial<Testimonial>, userEmail: string) {
    const { data, error } = await supabase
      .from('cms_testimonials')
      .insert({ ...t, created_by: undefined })
      .select()
      .single();
    if (error) throw error;
    logActivity('created', 'testimonial', t.client_name || '', userEmail);
    return data as Testimonial;
  },
  async update(id: string, updates: Partial<Testimonial>, userEmail: string) {
    const { data, error } = await supabase
      .from('cms_testimonials')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Testimonial;
  },
  async remove(id: string, label: string, userEmail: string) {
    const { error } = await supabase.from('cms_testimonials').delete().eq('id', id);
    if (error) throw error;
    logActivity('deleted', 'testimonial', label, userEmail);
  },
};

export const leadService = {
  async list() {
    const { data, error } = await supabase
      .from('cms_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Lead[];
  },
  async update(id: string, updates: Partial<Lead>) {
    const { data, error } = await supabase
      .from('cms_submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Lead;
  },
  async remove(id: string) {
    const { error } = await supabase.from('cms_submissions').delete().eq('id', id);
    if (error) throw error;
  },
};

export const settingsService = {
  async list() {
    const { data, error } = await supabase
      .from('cms_settings')
      .select('*')
      .order('category', { ascending: true });
    if (error) throw error;
    return data as SiteSetting[];
  },
  async getByKey(key: string) {
    const { data, error } = await supabase
      .from('cms_settings')
      .select('*')
      .eq('key', key)
      .maybeSingle();
    if (error) throw error;
    return data as SiteSetting | null;
  },
  async upsert(key: string, value: Record<string, unknown>, label: string, category: string) {
    const { data: existing } = await supabase
      .from('cms_settings')
      .select('id')
      .eq('key', key)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from('cms_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      return data as SiteSetting;
    } else {
      const { data, error } = await supabase
        .from('cms_settings')
        .insert({ key, value, label, category })
        .select()
        .single();
      if (error) throw error;
      return data as SiteSetting;
    }
  },
};

export const navigationService = {
  async list() {
    const { data, error } = await supabase
      .from('cms_navigation')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data as NavItem[];
  },
  async create(n: Partial<NavItem>) {
    const { data, error } = await supabase
      .from('cms_navigation')
      .insert({ ...n, created_by: undefined })
      .select()
      .single();
    if (error) throw error;
    return data as NavItem;
  },
  async update(id: string, updates: Partial<NavItem>) {
    const { data, error } = await supabase
      .from('cms_navigation')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as NavItem;
  },
  async remove(id: string) {
    const { error } = await supabase.from('cms_navigation').delete().eq('id', id);
    if (error) throw error;
  },
};

export const seoService = {
  async list() {
    const { data, error } = await supabase
      .from('cms_seo')
      .select('*')
      .order('page_name', { ascending: true });
    if (error) throw error;
    return data as SeoRecord[];
  },
  async upsert(pageKey: string, updates: Partial<SeoRecord>) {
    const { data: existing } = await supabase
      .from('cms_seo')
      .select('id')
      .eq('page_key', pageKey)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from('cms_seo')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      return data as SeoRecord;
    } else {
      const { data, error } = await supabase
        .from('cms_seo')
        .insert({ page_key: pageKey, ...updates })
        .select()
        .single();
      if (error) throw error;
      return data as SeoRecord;
    }
  },
};

export const mediaService = {
  async list(folder?: string) {
    let query = supabase.from('cms_media').select('*').order('created_at', { ascending: false });
    if (folder) query = query.eq('folder', folder);
    const { data, error } = await query;
    if (error) throw error;
    return data as MediaItem[];
  },
  async create(m: Partial<MediaItem>) {
    const { data, error } = await supabase
      .from('cms_media')
      .insert({ ...m, created_by: undefined })
      .select()
      .single();
    if (error) throw error;
    return data as MediaItem;
  },
  async remove(id: string) {
    const { error } = await supabase.from('cms_media').delete().eq('id', id);
    if (error) throw error;
  },
};

export const userService = {
  async list() {
    const { data, error } = await supabase
      .from('cms_users')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data as CmsUser[];
  },
  async updateProfile(id: string, updates: { full_name?: string; avatar_url?: string | null }) {
    const { data, error } = await supabase
      .from('cms_users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as CmsUser;
  },
  async updateRole(targetUserId: string, role: string, isActive: boolean) {
    const { error } = await supabase.rpc('cms_update_user_role', {
      target_user_id: targetUserId,
      new_role: role,
      new_is_active: isActive,
    });
    if (error) throw error;
  },
};
