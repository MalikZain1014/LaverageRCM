import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Stethoscope, Newspaper, HelpCircle, Inbox, FileText,
  TrendingUp, Clock, ArrowRight, Plus, Star, Users,
} from 'lucide-react';
import { Card, PageHeader, Skeleton, Badge } from '@/admin/components/ui';
import { supabase } from '@/admin/services/supabaseClient';
import type { ActivityLog } from '@/admin/types';

interface Stats {
  services: number;
  specialties: number;
  blogs: number;
  faqs: number;
  leads: number;
  testimonials: number;
  team: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [s, sp, b, f, l, t, team, act] = await Promise.all([
        supabase.from('cms_services').select('*', { count: 'exact', head: true }),
        supabase.from('cms_specialties').select('*', { count: 'exact', head: true }),
        supabase.from('cms_blogs').select('*', { count: 'exact', head: true }),
        supabase.from('cms_faqs').select('*', { count: 'exact', head: true }),
        supabase.from('cms_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('cms_testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('cms_team_members').select('*', { count: 'exact', head: true }),
        supabase.from('cms_activity').select('*').order('created_at', { ascending: false }).limit(8),
      ]);

      setStats({
        services: s.count || 0,
        specialties: sp.count || 0,
        blogs: b.count || 0,
        faqs: f.count || 0,
        leads: l.count || 0,
        testimonials: t.count || 0,
        team: team.count || 0,
      });
      setActivity((act.data as ActivityLog[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: 'Services', value: stats?.services, icon: <Briefcase className="h-6 w-6" />, to: '/admin/services', color: 'blue' },
    { label: 'Specialties', value: stats?.specialties, icon: <Stethoscope className="h-6 w-6" />, to: '/admin/specialties', color: 'teal' },
    { label: 'Blog Posts', value: stats?.blogs, icon: <Newspaper className="h-6 w-6" />, to: '/admin/blogs', color: 'amber' },
    { label: 'FAQs', value: stats?.faqs, icon: <HelpCircle className="h-6 w-6" />, to: '/admin/faqs', color: 'slate' },
    { label: 'Consultation Leads', value: stats?.leads, icon: <Inbox className="h-6 w-6" />, to: '/admin/leads', color: 'red' },
    { label: 'Testimonials', value: stats?.testimonials, icon: <Star className="h-6 w-6" />, to: '/admin/testimonials', color: 'green' },
    { label: 'Team Members', value: stats?.team, icon: <Users className="h-6 w-6" />, to: '/admin/team', color: 'blue' },
    { label: 'Pages', value: 7, icon: <FileText className="h-6 w-6" />, to: '/admin/navigation', color: 'slate' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    teal: 'bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    slate: 'bg-slatey-100 text-slatey-600 dark:bg-navy-700 dark:text-slatey-300',
  };

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your website content and activity" />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {loading || !stats
          ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-28" />)
          : cards.map((card) => (
              <Link key={card.label} to={card.to}>
                <Card className="p-5 transition-shadow hover:shadow-premium-lg">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorMap[card.color]}`}>
                      {card.icon}
                    </div>
                    <ArrowRight className="h-4 w-4 text-slatey-300" />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-slatey-800 dark:text-white">{card.value}</p>
                  <p className="text-sm text-slatey-500">{card.label}</p>
                </Card>
              </Link>
            ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slatey-100 px-6 py-4 dark:border-white/10">
            <h3 className="font-bold text-slatey-800 dark:text-white">Recent Activity</h3>
            <Badge color="blue"><Clock className="h-3 w-3" /> Live</Badge>
          </div>
          <div className="divide-y divide-slatey-100 dark:divide-white/5">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <div key={i} className="px-6 py-4"><Skeleton className="h-10" /></div>)
            ) : activity.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-slatey-500">No recent activity</div>
            ) : (
              activity.map((log) => (
                <div key={log.id} className="flex items-center gap-3 px-6 py-3.5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-500/10">
                    <TrendingUp className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slatey-700 dark:text-slatey-200">
                      <span className="font-semibold capitalize">{log.action}</span> {log.entity_type} <span className="text-slatey-500">"{log.entity_label}"</span>
                    </p>
                    <p className="text-xs text-slatey-400">{log.user_email} · {new Date(log.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="border-b border-slatey-100 px-6 py-4 dark:border-white/10">
            <h3 className="font-bold text-slatey-800 dark:text-white">Quick Actions</h3>
          </div>
          <div className="space-y-2 p-4">
            {[
              { label: 'New Blog Post', to: '/admin/blogs/new', icon: <Newspaper className="h-4 w-4" /> },
              { label: 'Add Service', to: '/admin/services/new', icon: <Briefcase className="h-4 w-4" /> },
              { label: 'Add FAQ', to: '/admin/faqs/new', icon: <HelpCircle className="h-4 w-4" /> },
              { label: 'Add Testimonial', to: '/admin/testimonials/new', icon: <Star className="h-4 w-4" /> },
              { label: 'View Leads', to: '/admin/leads', icon: <Inbox className="h-4 w-4" /> },
              { label: 'Site Settings', to: '/admin/settings', icon: <FileText className="h-4 w-4" /> },
            ].map((action) => (
              <Link key={action.label} to={action.to} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slatey-700 transition-colors hover:bg-slatey-50 dark:text-slatey-300 dark:hover:bg-navy-700">
                <span className="flex items-center gap-3">{action.icon} {action.label}</span>
                <Plus className="h-4 w-4 text-slatey-300" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
