import {
  Award,
  BadgeCheck,
  Code2,
  Globe2,
  Stethoscope,
  Building2,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Clock,
  MessageSquare,
  UserCog,
  Cpu,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { PageHero, Reveal, SectionHeader } from '@/components/ui';
import { whyChooseItems } from '@/data/content';

const icons = [
  Award, BadgeCheck, Code2, Globe2, Stethoscope, Building2,
  ShieldCheck, TrendingUp, FileCheck, Clock, MessageSquare, UserCog,
  Cpu, Lock,
];

export default function WhyChooseUsPage() {
  return (
    <>
      <Seo
        title="Why Choose LeverageRCM | Certified Billing & Coding Experts"
        description="Discover why healthcare providers across the USA and UK choose LeverageRCM for medical billing, coding, and revenue cycle management — certified experts, modern technology, and dedicated support."
        path="/why-choose-us"
      />
      <PageHero
        eyebrow="Why Choose Us"
        title={<>The difference is in the details</>}
        subtitle="We combine certified expertise, modern technology, and dedicated account management to deliver revenue improvement you can measure."
        breadcrumb="Home / Why Choose Us"
      />

      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader
            eyebrow="Our Advantages"
            title={<>14 reasons practices choose LeverageRCM</>}
            subtitle="Every advantage below translates directly into more revenue collected and fewer headaches for your team."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseItems.map((item, i) => {
              const Icon = icons[i] || CheckCircle2;
              return (
                <Reveal key={item.title} delay={(i % 3) * 0.08}>
                  <div className="group h-full rounded-2xl bg-white p-7 ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium-lg hover:ring-primary-200">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-premium transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-navy-800">{item.title}</h3>
                    <p className="mt-2 text-sm text-slatey-600 leading-relaxed">{item.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison band */}
      <section className="section bg-slatey-50">
        <div className="container-px">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl bg-white p-8 ring-1 ring-slatey-200/70 shadow-premium">
                <h3 className="text-xl font-bold text-navy-800">With LeverageRCM</h3>
                <ul className="mt-5 space-y-3">
                  {[
                    'Certified, specialty-trained coders and billers',
                    '98% clean claim rate and faster reimbursement',
                    'Dedicated account manager who knows your practice',
                    'Transparent pricing based on net collections',
                    'Proactive denial management and root-cause fixes',
                    'Modern technology with AI-assisted claim scrubbing',
                    'HIPAA-aware processes and secure access',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-slatey-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl bg-navy-900 p-8 text-white">
                <h3 className="text-xl font-bold text-white">Without a specialist partner</h3>
                <ul className="mt-5 space-y-3">
                  {[
                    'Rising denial rates and delayed cash flow',
                    'Staff turnover and growing administrative burden',
                    'Unworked AR and silent revenue leakage',
                    'No visibility into denial trends or root causes',
                    'Coding errors causing downcoding and audits',
                    'Credentialing lapses interrupting billable status',
                    'Limited technology and manual processes',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-slatey-300">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Experience the LeverageRCM difference"
        subtitle="Join 500+ providers who trust us with their revenue cycle. Book your free consultation today."
      />
    </>
  );
}
