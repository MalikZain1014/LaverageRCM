import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Workflow,
  Settings,
  Building2,
  HelpCircle,
  Target,
  Sparkles,
} from 'lucide-react';
import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { PageHero, Reveal, SectionHeader, Accordion } from '@/components/ui';
import { usePublicContent } from '@/context/PublicContentContext';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { services } = usePublicContent();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="container-px py-40 text-center">
        <h1 className="text-3xl font-bold text-navy-800">Service not found</h1>
        <Link to="/services" className="btn-primary mt-6">
          <ArrowLeft className="h-4 w-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const currentIndex = services.findIndex((s) => s.slug === slug);
  const next = services[(currentIndex + 1) % services.length];

  return (
    <>
      <Seo
        title={`${service.title} | LeverageRCM Services`}
        description={service.description}
        path={`/services/${service.slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.description,
          provider: { '@type': 'Organization', name: 'LeverageRCM' },
          areaServed: ['United States', 'United Kingdom'],
        }}
      />
      <PageHero
        eyebrow="Service"
        title={service.title}
        subtitle={service.short}
        breadcrumb={`Home / Services / ${service.title}`}
      />

      {/* Overview */}
      <section className="section bg-white">
        <div className="container-px grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader center={false} eyebrow="Service Overview" title={<>What is {service.title.toLowerCase()}?</>} />
            <Reveal delay={0.1}>
              <p className="mt-6 text-slatey-600 leading-relaxed">{service.description}</p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-accent-500 p-10 text-white shadow-premium-lg">
              <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <service.icon className="h-10 w-10" strokeWidth={1.8} />
              </span>
              <h3 className="relative mt-6 text-2xl font-bold">{service.title}</h3>
              <p className="relative mt-2 text-white/90">{service.short}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="section bg-slatey-50">
        <div className="container-px">
          <div className="mx-auto max-w-3xl">
            <SectionHeader center eyebrow="Why It Matters" title={<>The revenue impact of {service.title.toLowerCase()}</>} />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-slatey-600 leading-relaxed">{service.whyItMatters}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader eyebrow="Benefits" title={<>What you gain with our {service.title.toLowerCase()}</>} />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit, i) => (
              <Reveal key={benefit} delay={(i % 3) * 0.06}>
                <div className="flex h-full items-start gap-3 rounded-2xl bg-slatey-50 p-6 ring-1 ring-slatey-200/70 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-premium-lg">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-accent-500" />
                  <p className="text-sm font-medium text-slatey-700">{benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="section bg-slatey-50">
        <div className="container-px">
          <SectionHeader eyebrow="Complete Workflow" title={<>Our {service.title.toLowerCase()} workflow</>} subtitle="A structured, step-by-step process that ensures nothing falls through the cracks." />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {service.workflow.map((step, i) => (
              <Reveal key={step.step} delay={(i % 3) * 0.06}>
                <div className="relative h-full rounded-2xl bg-white p-6 ring-1 ring-slatey-200/70 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700 text-sm font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-navy-800">{step.step}</h3>
                  <p className="mt-1.5 text-sm text-slatey-600 leading-relaxed">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader eyebrow="Our Process" title={<>How we deliver results</>} subtitle="From onboarding to ongoing optimization, our process is built for measurable revenue improvement." />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl bg-gradient-to-br from-slatey-50 to-white p-7 ring-1 ring-slatey-200/70">
                  <span className="text-4xl font-extrabold text-gradient">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 text-lg font-bold text-navy-800">{p.title}</h3>
                  <p className="mt-2 text-sm text-slatey-600 leading-relaxed">{p.detail}</p>
                  {i < service.process.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary-300 lg:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section bg-slatey-50">
        <div className="container-px">
          <SectionHeader eyebrow="Industries Served" title={<>Who we serve with {service.title.toLowerCase()}</>} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.industries.map((industry, i) => (
              <Reveal key={industry} delay={(i % 3) * 0.06}>
                <div className="flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-slatey-200/70 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-navy-800">{industry}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose LeverageRCM */}
      <section className="section bg-white">
        <div className="container-px">
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 p-8 lg:p-14">
            <div className="absolute inset-0 bg-hero-radial opacity-60" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow-accent">Why LeverageRCM</span>
                <h2 className="mt-4 text-3xl font-extrabold text-white">Specialty expertise you can measure</h2>
                <p className="mt-4 text-slatey-300">
                  Our certified specialists deliver a 98% clean claim rate, faster reimbursement, and transparent
                  reporting — so you see exactly how our {service.title.toLowerCase()} service improves your revenue.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Target, label: '98% Clean Claim Rate' },
                  { icon: Sparkles, label: 'Certified Specialists' },
                  { icon: Workflow, label: 'Structured Workflow' },
                  { icon: Settings, label: 'Modern Technology' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl glass-dark p-5">
                    <item.icon className="h-7 w-7 text-accent-400" />
                    <p className="mt-2 text-sm font-semibold text-white">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-slatey-50">
        <div className="container-px">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="FAQ" title={<>Common questions about {service.title.toLowerCase()}</>} />
            <div className="mt-10">
              <Accordion items={service.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Next service */}
      <section className="bg-white pb-20">
        <div className="container-px">
          <Link
            to={`/services/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl bg-slatey-50 p-6 ring-1 ring-slatey-200/70 transition-all hover:bg-white hover:shadow-premium-lg"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slatey-500">Next Service</p>
              <p className="mt-1 text-lg font-bold text-navy-800 group-hover:text-primary-700 transition-colors">
                {next.title}
              </p>
            </div>
            <ArrowRight className="h-6 w-6 text-primary-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <CtaBanner
        title={`Ready to improve your ${service.title.toLowerCase()}?`}
        subtitle="Book a free consultation and let our certified specialists show you how much more you could be collecting."
      />
    </>
  );
}
