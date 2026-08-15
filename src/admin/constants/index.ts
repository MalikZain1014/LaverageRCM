import type { UserRole } from '@/admin/types';

export const ROLES: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  administrator: 'Administrator',
  content_editor: 'Content Editor',
  marketing_manager: 'Marketing Manager',
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: ['*'],
  administrator: ['dashboard', 'services', 'specialties', 'blogs', 'faqs', 'testimonials', 'team', 'media', 'leads', 'settings', 'navigation', 'seo', 'users', 'pages'],
  content_editor: ['dashboard', 'services', 'specialties', 'blogs', 'faqs', 'testimonials', 'team', 'media', 'pages'],
  marketing_manager: ['dashboard', 'blogs', 'testimonials', 'leads', 'media'],
};

export function canAccess(role: UserRole, resource: string): boolean {
  const perms = ROLE_PERMISSIONS[role] || [];
  return perms.includes('*') || perms.includes(resource);
}

export const BLOG_CATEGORIES = [
  'Medical Billing',
  'Medical Coding',
  'Healthcare News',
  'Revenue Cycle Management',
  'Credentialing',
  'Practice Management',
  'Insurance Updates',
];

export const FAQ_CATEGORIES = [
  'General',
  'Onboarding',
  'Pricing',
  'Compliance',
  'Services',
  'Reporting',
  'Support',
];

export const SERVICE_ICONS = [
  'FileText', 'Code2', 'BadgeCheck', 'ShieldCheck', 'ClipboardCheck',
  'ReceiptText', 'TrendingUp', 'AlertTriangle', 'Headset',
  'Activity', 'Stethoscope', 'HeartPulse', 'Brain', 'Scan',
  'Bone', 'Pill', 'Sparkles',
];

export const SPECIALTY_ICONS = [
  'HeartPulse', 'Sparkles', 'Stethoscope', 'Activity', 'Brain',
  'Scan', 'Bone', 'Pill',
];

export const LEAD_STATUSES = ['unread', 'contacted', 'in_progress', 'completed'] as const;
export const CONTENT_STATUSES = ['draft', 'published'] as const;
