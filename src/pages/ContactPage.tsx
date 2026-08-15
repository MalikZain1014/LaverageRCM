import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Globe2,
  MessageSquare,
} from 'lucide-react';
import Seo from '@/components/Seo';
import { PageHero, Reveal, SectionHeader } from '@/components/ui';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    practice: '',
    specialty: '',
    phone: '',
    email: '',
    country: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', practice: '', specialty: '', phone: '', email: '', country: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <>
      <Seo
        title="Contact LeverageRCM | Book Your Free Consultation"
        description="Contact LeverageRCM for a free consultation on medical billing, coding, and revenue cycle management. Serving healthcare providers across the USA and UK."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact Us"
        title={<>Book your free consultation</>}
        subtitle="Tell us about your practice and our RCM experts will show you how much more revenue you could be capturing. No obligation, just expert advice."
        breadcrumb="Home / Contact"
      />

      <section className="section bg-white">
        <div className="container-px grid gap-10 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="rounded-3xl bg-slatey-50 p-8 ring-1 ring-slatey-200/70 shadow-premium lg:p-10">
                <SectionHeader
                  center={false}
                  eyebrow="Get In Touch"
                  title={<>Tell us about your practice</>}
                />
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 flex flex-col items-center justify-center rounded-2xl bg-accent-50 p-10 text-center ring-1 ring-accent-200"
                  >
                    <CheckCircle2 className="h-14 w-14 text-accent-600" />
                    <h3 className="mt-4 text-xl font-bold text-navy-800">Thank you for reaching out!</h3>
                    <p className="mt-2 text-slatey-600">
                      Our team will contact you within one business day to schedule your free consultation.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                    <Field label="Practice Name" name="practice" value={form.practice} onChange={handleChange} />
                    <SelectField
                      label="Specialty"
                      name="specialty"
                      value={form.specialty}
                      onChange={handleChange}
                      options={[
                        'Cardiology', 'Dermatology', 'Family Medicine', 'Internal Medicine',
                        'Psychiatry', 'Radiology', 'Orthopaedics', 'Gastroenterology',
                        'Neurology', 'Pain Management', 'Urgent Care', 'Pediatrics',
                        'Primary Care', 'Behavioral Health', 'General Surgery', 'Other',
                      ]}
                    />
                    <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                    <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                    <SelectField
                      label="Country"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      options={['United States', 'United Kingdom', 'Other']}
                    />
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-semibold text-navy-800">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        placeholder="Tell us about your practice and what you need help with..."
                        className="w-full rounded-xl border border-slatey-200 bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <button type="submit" className="btn-primary w-full text-base py-4">
                        Book Your Free Consultation <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-navy-900 p-8 text-white">
                <h3 className="text-lg font-bold text-white">Contact Information</h3>
                <div className="mt-6 space-y-5">
                  <ContactRow icon={Phone} label="Phone" value="+92 343 2858901" href="tel:+92 343 2858901" />
                  <ContactRow icon={Mail} label="Email" value="info@leveragercm.com" href="mailto:info@leveragercm.com" />
                  <ContactRow icon={Clock} label="Business Hours" value="Mon–Fri: 8am–8pm · 24/7 Support Available" />
                  <ContactRow icon={MapPin} label="Offices" value="437G, G Block, Johar town Lahore" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl bg-white p-8 ring-1 ring-slatey-200/70 shadow-premium">
                <h3 className="text-lg font-bold text-navy-800">Why reach out?</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    { icon: Globe2, text: 'Free, no-obligation revenue cycle assessment' },
                    { icon: Building2, text: 'Specialty-specific recommendations' },
                    { icon: MessageSquare, text: 'Transparent pricing and clear next steps' },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3 text-sm text-slatey-600">
                      <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Google Map */}
            <Reveal delay={0.2}>
              <div className="overflow-hidden rounded-3xl ring-1 ring-slatey-200/70 shadow-premium">
                <iframe
                  title="LeverageRCM Office Location"
                  src="https://www.google.com/maps?q=437G%2C%20G%20Block%2C%20Johar%20Town%2C%20Lahore%2C%20Pakistan&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-400">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-slatey-400">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-80 transition-opacity">{content}</a> : content;
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy-800">
        {label} {required && <span className="text-primary-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-slatey-200 bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy-800">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slatey-200 bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
