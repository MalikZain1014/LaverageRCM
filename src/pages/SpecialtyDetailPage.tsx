import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  LifeBuoy,
  Code2,
  FileText,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { PageHero, Reveal, SectionHeader, Accordion } from '@/components/ui';
import { usePublicContent } from '@/context/PublicContentContext';

export default function SpecialtyDetailPage() {
  const { slug } = useParams();
  const { specialties } = usePublicContent();
  const specialty = specialties.find((s) => s.slug === slug);

  if (!specialty) {
    return (
      <div className="container-px py-40 text-center">
        <h1 className="text-3xl font-bold text-navy-800">Specialty not found</h1>
        <Link to="/specialties" className="btn-primary mt-6">
          <ArrowLeft className="h-4 w-4" /> Back to Specialties
        </Link>
      </div>
    );
  }

  const currentIndex = specialties.findIndex((s) => s.slug === slug);
  const next = specialties[(currentIndex + 1) % specialties.length];

  return (
    <>
      <Seo
        title={`${specialty.name} Medical Billing & Coding | LeverageRCM`}
        description={`Specialty-specific medical billing and coding expertise for ${specialty.name} practices. ${specialty.short}`}
        path={`/specialties/${specialty.slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${specialty.name} Medical Billing`,
          description: specialty.short,
          provider: { '@type': 'Organization', name: 'LeverageRCM' },
          areaServed: ['United States', 'United Kingdom'],
        }}
      />
      <PageHero
        eyebrow="Healthcare Specialty"
        title={<>{specialty.name} billing & coding expertise</>}
        subtitle={specialty.short}
        breadcrumb={`Home / Specialties / ${specialty.name}`}
      />

      {/* Overview */}
      <section className="section bg-white">
        <div className="container-px grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader center={false} eyebrow="Overview" title={<>How LeverageRCM supports {specialty.name.toLowerCase()} practices</>} />
            <Reveal delay={0.1}>
              <p className="mt-6 text-slatey-600 leading-relaxed">
                {specialty.name} practices face unique billing and coding challenges that require specialty-specific
                expertise. Our certified coders and billing specialists are trained on the procedures, modifiers,
                and payer rules specific to {specialty.name.toLowerCase()} — so your claims are clean, your denials
                are fewer, and your revenue is maximized.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-accent-500 p-10 text-white shadow-premium-lg">
              <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <specialty.icon className="h-10 w-10" strokeWidth={1.8} />
              </span>
              <h3 className="relative mt-6 text-2xl font-bold">{specialty.name}</h3>
              <p className="relative mt-2 text-white/90">{specialty.short}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Billing Challenges */}
      <section className="section bg-slatey-50">
        <div className="container-px">
          <SectionHeader eyebrow="Billing Challenges" title={<>{specialty.name} billing challenges we solve</>} subtitle="These are the common revenue obstacles that cause {specialty.name.toLowerCase()} practices to lose money." />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {specialty.billingChallenges.map((challenge, i) => (
              <Reveal key={challenge} delay={(i % 3) * 0.06}>
                <div className="flex h-full items-start gap-3 rounded-2xl bg-white p-6 ring-1 ring-slatey-200/70 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg">
                  <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" />
                  <p className="text-sm font-medium text-slatey-700">{challenge}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader eyebrow="How LeverageRCM Helps" title={<>Our solution for {specialty.name.toLowerCase()} practices</>} />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {specialty.howWeHelp.map((help, i) => (
              <Reveal key={help} delay={(i % 2) * 0.08}>
                <div className="flex h-full items-start gap-3 rounded-2xl bg-slatey-50 p-6 ring-1 ring-slatey-200/70 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-premium-lg">
                  <LifeBuoy className="mt-0.5 h-6 w-6 shrink-0 text-primary-600" />
                  <p className="text-sm font-medium text-slatey-700">{help}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coding Expertise + Claims Management */}
      <section className="section bg-slatey-50">
        <div className="container-px grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-white p-8 ring-1 ring-slatey-200/70 shadow-premium">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                <Code2 className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-navy-800">Coding Expertise</h3>
              <ul className="mt-4 space-y-2.5">
                {specialty.codingExpertise.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slatey-600">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl bg-white p-8 ring-1 ring-slatey-200/70 shadow-premium">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-100 text-accent-700">
                <FileText className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-navy-800">Claims Management</h3>
              <ul className="mt-4 space-y-2.5">
                {specialty.claimsManagement.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slatey-600">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Revenue Optimization + Compliance */}
      <section className="section bg-white">
        <div className="container-px grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-gradient-to-br from-navy-800 to-navy-900 p-8 text-white">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent-400">
                <TrendingUp className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">Revenue Optimization</h3>
              <ul className="mt-4 space-y-2.5">
                {specialty.revenueOptimization.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slatey-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl bg-slatey-50 p-8 ring-1 ring-slatey-200/70 shadow-premium">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                <ShieldCheck className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-navy-800">Compliance</h3>
              <ul className="mt-4 space-y-2.5">
                {specialty.compliance.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slatey-600">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-slatey-50">
        <div className="container-px">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="FAQ" title={<>Common {specialty.name.toLowerCase()} billing questions</>} />
            <div className="mt-10">
              <Accordion items={specialty.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Next specialty */}
      <section className="bg-white pb-20">
        <div className="container-px">
          <Link
            to={`/specialties/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl bg-slatey-50 p-6 ring-1 ring-slatey-200/70 transition-all hover:bg-white hover:shadow-premium-lg"
          >
            <div className="flex items-center gap-3">
              <next.icon className="h-8 w-8 text-primary-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slatey-500">Next Specialty</p>
                <p className="mt-1 text-lg font-bold text-navy-800 group-hover:text-primary-700 transition-colors">
                  {next.name}
                </p>
              </div>
            </div>
            <ArrowRight className="h-6 w-6 text-primary-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <CtaBanner
        title={`Maximize revenue for your ${specialty.name.toLowerCase()} practice`}
        subtitle="Book a free consultation with our specialty-trained billing and coding experts."
      />
    </>
  );
}
