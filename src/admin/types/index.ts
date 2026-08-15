export type UserRole = 'super_admin' | 'administrator' | 'content_editor' | 'marketing_manager';

export type ContentStatus = 'draft' | 'published';

export interface CmsUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  banner_image_url: string | null;
  benefits: string[];
  workflow: { step: string; detail: string }[];
  process: { title: string; detail: string }[];
  industries: string[];
  faqs: { q: string; a: string }[];
  seo: { title?: string; description?: string };
  status: ContentStatus;
  featured: boolean;
  display_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Specialty {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  icon: string;
  banner_image_url: string | null;
  billing_challenges: string[];
  how_we_help: string[];
  coding_expertise: string[];
  claims_management: string[];
  revenue_optimization: string[];
  compliance: string[];
  faqs: { q: string; a: string }[];
  seo: { title?: string; description?: string };
  status: ContentStatus;
  display_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  category: string;
  tags: string[];
  author: string;
  featured_image_url: string | null;
  gallery: string[];
  read_time: string;
  seo: { title?: string; description?: string };
  status: ContentStatus;
  featured: boolean;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  status: ContentStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  designation: string;
  company: string;
  location: string;
  photo_url: string | null;
  review: string;
  rating: number;
  featured: boolean;
  status: ContentStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  photo_url: string | null;
  biography: string;
  social_links: Record<string, string>;
  display_order: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  folder: string;
  alt_text: string;
  file_size: number;
  width: number | null;
  height: number | null;
  mime_type: string;
  created_by: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  practice_name: string | null;
  specialty: string | null;
  country: string | null;
  message: string | null;
  status: 'unread' | 'contacted' | 'in_progress' | 'completed';
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  label: string;
  category: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface NavItem {
  id: string;
  label: string;
  url: string;
  location: 'header' | 'footer';
  parent_id: string | null;
  sort_order: number;
  is_visible: boolean;
  is_dropdown: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SeoRecord {
  id: string;
  page_key: string;
  page_name: string;
  meta_title: string;
  meta_description: string;
  keywords: string[];
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_card: string;
  schema_markup: Record<string, unknown>;
  robots: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  entity_label: string;
  user_email: string;
  created_by: string | null;
  created_at: string;
}
