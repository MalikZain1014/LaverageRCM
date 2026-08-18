import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { services as defaultServices } from '@/data/services';
import { specialties as defaultSpecialties } from '@/data/specialties';
import { useCms } from '@/contexts/CmsContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Why Choose Us', to: '/why-choose-us' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const solid = scrolled || location.pathname !== '/';

  const cms = useCms();
  const services = (cms?.services && cms.services.length > 0) ? cms.services : defaultServices;
  const specialties = (cms?.specialties && cms.specialties.length > 0) ? cms.specialties : defaultSpecialties;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-white/90 backdrop-blur-xl shadow-premium border-b border-slatey-200/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex h-20 items-center justify-between gap-4">
        <Logo dark={solid} />

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          <NavItem to="/" label="Home" dark={solid} />

          <NavItem to="/about" label="About Us" dark={solid} />

          <Dropdown
            label="Services"
            dark={solid}
            open={servicesOpen}
            onToggle={() => {
              setServicesOpen((v) => !v);
              setSpecialtiesOpen(false);
            }}
            onHover={() => {
              setServicesOpen(true);
              setSpecialtiesOpen(false);
            }}
            onLeave={() => setServicesOpen(false)}
          >
            <div className="grid grid-cols-2 gap-1 p-2 w-[640px]">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group flex items-start gap-3 rounded-xl p-3 hover:bg-primary-50 transition-colors"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <s.icon className="h-4.5 w-4.5" strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slatey-800 group-hover:text-primary-700">
                      {s.title}
                    </span>
                    <span className="block text-xs text-slatey-500 line-clamp-1">
                      {s.short}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </Dropdown>

          <Dropdown
            label="Specialties"
            dark={solid}
            open={specialtiesOpen}
            onToggle={() => {
              setSpecialtiesOpen((v) => !v);
              setServicesOpen(false);
            }}
            onHover={() => {
              setSpecialtiesOpen(true);
              setServicesOpen(false);
            }}
            onLeave={() => setSpecialtiesOpen(false)}
          >
            <div className="grid grid-cols-3 gap-1 p-2 w-[520px]">
              {specialties.slice(0, 12).map((s) => (
                <Link
                  key={s.slug}
                  to={`/specialties/${s.slug}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slatey-700 hover:bg-accent-50 hover:text-accent-700 transition-colors"
                >
                  <s.icon className="h-4 w-4 shrink-0" />
                  {s.name}
                </Link>
              ))}
              <Link
                to="/specialties"
                className="flex items-center gap-2 rounded-lg bg-slatey-50 px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
                More Specialties
              </Link>
            </div>
          </Dropdown>

          <NavItem to="/why-choose-us" label="Why Choose Us" dark={solid} />
          <NavItem to="/blog" label="Blog" dark={solid} />
          <NavItem to="/faq" label="FAQ" dark={solid} />
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+18005551234"
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              solid ? 'text-slatey-700 hover:text-primary-700' : 'text-white hover:text-accent-300'
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white">
              <Phone className="h-4 w-4" />
            </span>
            +1 800 555 1234
          </a>
          <Link to="/contact" className="btn-primary">
            Get Free Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
            solid ? 'text-slatey-800 hover:bg-slatey-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white overflow-y-auto no-scrollbar"
          >
            <div className="container-px py-6 space-y-1">
              <MobileLink to="/" label="Home" />
              <MobileLink to="/about" label="About Us" />

              <MobileSection
                label="Services"
                open={mobileSection === 'services'}
                onToggle={() =>
                  setMobileSection((s) => (s === 'services' ? null : 'services'))
                }
                items={services.map((s) => ({ to: `/services/${s.slug}`, label: s.title }))}
              />
              <MobileSection
                label="Specialties"
                open={mobileSection === 'specialties'}
                onToggle={() =>
                  setMobileSection((s) => (s === 'specialties' ? null : 'specialties'))
                }
                items={[
                  ...specialties.slice(0, 12).map((s) => ({
                    to: `/specialties/${s.slug}`,
                    label: s.name,
                  })),
                  { to: '/specialties', label: 'More Specialties' },
                ]}
              />

              <MobileLink to="/why-choose-us" label="Why Choose Us" />
              <MobileLink to="/blog" label="Blog" />
              <MobileLink to="/faq" label="FAQ" />
              <MobileLink to="/contact" label="Contact" />

              <div className="pt-4 space-y-3">
                <a
                  href="tel:+18005551234"
                  className="flex items-center justify-center gap-2 rounded-full bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-700"
                >
                  <Phone className="h-4 w-4" />
                  +1 800 555 1234
                </a>
                <Link to="/contact" className="btn-primary w-full">
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Logo({ dark }: { dark: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-premium">
        <Activity className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className={`text-lg font-extrabold tracking-tight ${dark ? 'text-navy-800' : 'text-white'}`}>
        Leverage<span className="text-primary-600">RCM</span>
      </span>
    </Link>
  );
}

function NavItem({ to, label, dark }: { to: string; label: string; dark: boolean }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-3.5 py-2 text-sm font-semibold transition-colors link-underline ${
          isActive
            ? 'text-primary-600'
            : dark
            ? 'text-slatey-700 hover:text-primary-700'
            : 'text-white/90 hover:text-white'
        }`
      }
    >
      {label}
    </NavLink>
  );
}

interface DropdownProps {
  label: string;
  dark: boolean;
  open: boolean;
  onToggle: () => void;
  onHover: () => void;
  onLeave: () => void;
  children: React.ReactNode;
}

function Dropdown({ label, dark, open, onToggle, onHover, onLeave, children }: DropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <button
        onClick={onToggle}
        className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold transition-colors ${
          dark ? 'text-slatey-700 hover:text-primary-700' : 'text-white/90 hover:text-white'
        }`}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full -translate-x-1/2 pt-2"
          >
            <div className="card rounded-2xl shadow-premium-lg overflow-hidden">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
          isActive
            ? 'bg-primary-50 text-primary-700'
            : 'text-slatey-800 hover:bg-slatey-50'
        }`
      }
    >
      {label}
    </NavLink>
  );
}

function MobileSection({
  label,
  open,
  onToggle,
  items,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  items: { to: string; label: string }[];
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-slatey-800 hover:bg-slatey-50"
      >
        {label}
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 space-y-0.5 pb-2">
              {items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slatey-600 hover:bg-primary-50 hover:text-primary-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
