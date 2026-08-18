import { Link } from 'react-router-dom';
import {
  Activity,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { services as defaultServices } from '@/data/services';
import { specialties as defaultSpecialties } from '@/data/specialties';
import { useCms } from '@/contexts/CmsContext';
import { useState } from 'react';

export default function Footer() {
  const cms = useCms();
  const services = (cms?.services && cms.services.length > 0) ? cms.services : defaultServices;
  const specialties = (cms?.specialties && cms.specialties.length > 0) ? cms.specialties : defaultSpecialties;

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-slatey-300">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.04]" />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="relative container-px py-16">
        {/* Newsletter */}
        <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-center rounded-3xl bg-gradient-to-br from-navy-800 to-navy-900 ring-1 ring-white/10 p-8 lg:p-10">
          <div>
            <h3 className="text-2xl font-bold text-white">Stay informed on RCM best practices</h3>
            <p className="mt-2 text-slatey-400 max-w-md">
              Get healthcare billing insights, coding updates, and revenue cycle tips delivered to your inbox.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm text-white placeholder:text-slatey-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button type="submit" className="btn-primary shrink-0">
              {subscribed ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Subscribed
                </>
              ) : (
                <>
                  Subscribe <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Main footer grid */}
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white">
                <Activity className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-extrabold text-white">
                Leverage<span className="text-primary-500">RCM</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slatey-400 max-w-sm">
              Your trusted medical billing and revenue cycle management partner, helping healthcare providers
              across the USA and UK maximize revenue through accurate billing, coding, and complete RCM services.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a href="tel:+18005551234" className="flex items-center gap-3 text-slatey-400 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-primary-500" /> +1 800 555 1234
              </a>
              <a href="mailto:info@leveragercm.com" className="flex items-center gap-3 text-slatey-400 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-primary-500" /> info@leveragercm.com
              </a>
              <div className="flex items-center gap-3 text-slatey-400">
                <MapPin className="h-4 w-4 text-primary-500" /> USA & UK Operations
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-slatey-400 hover:bg-primary-600 hover:text-white hover:ring-primary-600 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <FooterLink to="/about" label="About" />
              <FooterLink to="/services" label="Services" />
              <FooterLink to="/specialties" label="Specialties" />
              <FooterLink to="/blog" label="Blog" />
              <FooterLink to="/faq" label="FAQ" />
              <FooterLink to="/contact" label="Contact" />
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 6).map((s) => (
                <FooterLink key={s.slug} to={`/services/${s.slug}`} label={s.title} />
              ))}
              <FooterLink to="/services" label="View all services" highlight />
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Specialties</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {specialties.slice(0, 6).map((s) => (
                <FooterLink key={s.slug} to={`/specialties/${s.slug}`} label={s.name} />
              ))}
              <FooterLink to="/specialties" label="View all specialties" highlight />
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slatey-500">
            © {new Date().getFullYear()} LeverageRCM. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <Link to="/privacy-policy" className="text-slatey-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slatey-400 hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="text-slatey-400 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label, highlight }: { to: string; label: string; highlight?: boolean }) {
  return (
    <li>
      <Link
        to={to}
        className={`transition-colors ${
          highlight
            ? 'font-semibold text-primary-400 hover:text-primary-300'
            : 'text-slatey-400 hover:text-white'
        }`}
      >
        {label}
      </Link>
    </li>
  );
}
