import { type ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Briefcase, Stethoscope, Newspaper, HelpCircle,
  Star, Users, Image, Inbox, Settings, Menu, LogOut, ChevronDown, ChevronLeft,
  Sun, Moon, Bell, User, Search, PanelLeftClose, PanelLeft,
} from 'lucide-react';
import { useAuth } from '@/admin/contexts/AuthContext';
import { useTheme } from '@/admin/contexts/ThemeContext';
import { canAccess } from '@/admin/constants';
import type { UserRole } from '@/admin/types';

interface NavSection {
  label: string;
  items: { to: string; label: string; icon: ReactNode; resource: string }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-[18px] w-[18px]" />, resource: 'dashboard' },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/services', label: 'Services', icon: <Briefcase className="h-[18px] w-[18px]" />, resource: 'services' },
      { to: '/admin/specialties', label: 'Specialties', icon: <Stethoscope className="h-[18px] w-[18px]" />, resource: 'specialties' },
      { to: '/admin/blogs', label: 'Blog Posts', icon: <Newspaper className="h-[18px] w-[18px]" />, resource: 'blogs' },
      { to: '/admin/faqs', label: 'FAQs', icon: <HelpCircle className="h-[18px] w-[18px]" />, resource: 'faqs' },
      { to: '/admin/testimonials', label: 'Testimonials', icon: <Star className="h-[18px] w-[18px]" />, resource: 'testimonials' },
      { to: '/admin/team', label: 'Team', icon: <Users className="h-[18px] w-[18px]" />, resource: 'team' },
    ],
  },
  {
    label: 'Assets',
    items: [
      { to: '/admin/media', label: 'Media Library', icon: <Image className="h-[18px] w-[18px]" />, resource: 'media' },
      { to: '/admin/leads', label: 'Consultation Leads', icon: <Inbox className="h-[18px] w-[18px]" />, resource: 'leads' },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { to: '/admin/navigation', label: 'Header & Footer', icon: <Menu className="h-[18px] w-[18px]" />, resource: 'navigation' },
      { to: '/admin/seo', label: 'SEO Settings', icon: <Search className="h-[18px] w-[18px]" />, resource: 'seo' },
      { to: '/admin/settings', label: 'Site Settings', icon: <Settings className="h-[18px] w-[18px]" />, resource: 'settings' },
      { to: '/admin/users', label: 'Users & Roles', icon: <User className="h-[18px] w-[18px]" />, resource: 'users' },
    ],
  },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const role = (profile?.role || 'content_editor') as UserRole;

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const isActive = (to: string) => location.pathname === to || (to !== '/admin' && location.pathname.startsWith(to));

  return (
    <div className="admin-root flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-navy-800 text-slatey-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <SidebarContent sidebarOpen={sidebarOpen} isActive={isActive} role={role} />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 flex h-full w-64 flex-col bg-navy-800 text-slatey-200">
            <SidebarContent sidebarOpen={true} isActive={isActive} role={role} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slatey-200 bg-white/90 px-4 backdrop-blur-md dark:border-white/10 dark:bg-navy-800/90">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 lg:hidden dark:hover:bg-navy-700">
              <Menu className="h-5 w-5" />
            </button>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 lg:block dark:hover:bg-navy-700">
              {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
            </button>
            <Breadcrumbs pathname={location.pathname} />
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 dark:hover:bg-navy-700" title="Toggle theme">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button className="relative rounded-lg p-2 text-slatey-500 hover:bg-slatey-100 dark:hover:bg-navy-700">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent-500" />
            </button>
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slatey-100 dark:hover:bg-navy-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {profile?.full_name?.charAt(0) || 'A'}
                </div>
                <span className="hidden text-sm font-semibold text-slatey-700 sm:block dark:text-slatey-200">{profile?.full_name || 'Admin'}</span>
                <ChevronDown className="h-4 w-4 text-slatey-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 w-56 rounded-xl bg-white shadow-premium-lg ring-1 ring-slatey-200 dark:bg-navy-800 dark:ring-white/10">
                  <div className="border-b border-slatey-100 px-4 py-3 dark:border-white/10">
                    <p className="text-sm font-semibold text-slatey-800 dark:text-white">{profile?.full_name}</p>
                    <p className="text-xs text-slatey-500">{profile?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link to="/admin/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slatey-600 hover:bg-slatey-50 dark:text-slatey-300 dark:hover:bg-navy-700">
                      <User className="h-4 w-4" /> My Profile
                    </Link>
                    <button onClick={handleSignOut} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ sidebarOpen, isActive, role, onNavigate }: { sidebarOpen: boolean; isActive: (to: string) => boolean; role: UserRole; onNavigate?: () => void }) {
  return (
    <>
      <Link to="/admin" onClick={onNavigate} className="flex h-16 items-center gap-2.5 border-b border-white/10 px-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white font-bold">L</div>
        {sidebarOpen && <span className="text-lg font-bold text-white">LeverageRCM</span>}
      </Link>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-6">
            {sidebarOpen && <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slatey-500">{section.label}</p>}
            <div className="space-y-1">
              {section.items
                .filter((item) => canAccess(role, item.resource))
                .map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive(item.to)
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'text-slatey-300 hover:bg-white/10 hover:text-white'
                    }`}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    {item.icon}
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link to="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slatey-300 hover:bg-white/10">
          <ChevronLeft className="h-[18px] w-[18px]" />
          {sidebarOpen && <span>Back to Website</span>}
        </Link>
      </div>
    </>
  );
}

function Breadcrumbs({ pathname }: { pathname: string }) {
  const parts = pathname.replace('/admin', '').split('/').filter(Boolean);
  const labels: Record<string, string> = {
    services: 'Services', specialties: 'Specialties', blogs: 'Blog Posts', faqs: 'FAQs',
    testimonials: 'Testimonials', team: 'Team', media: 'Media', leads: 'Leads',
    navigation: 'Header & Footer', seo: 'SEO', settings: 'Settings', users: 'Users',
    profile: 'Profile', 'new': 'New', 'edit': 'Edit',
  };

  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link to="/admin" className="text-slatey-400 hover:text-slatey-600 dark:hover:text-slatey-200">Dashboard</Link>
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-slatey-300">/</span>
          <span className={i === parts.length - 1 ? 'font-semibold text-slatey-700 dark:text-slatey-200' : 'text-slatey-400'}>
            {labels[part] || part}
          </span>
        </span>
      ))}
    </nav>
  );
}
