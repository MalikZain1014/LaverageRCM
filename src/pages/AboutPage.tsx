import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  ShieldCheck,
  Award,
  Globe2,
  Building2,
  Stethoscope,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { PageHero, Reveal, SectionHeader } from '@/components/ui';
import { coreValues, timeline, leadership, stats } from '@/data/content';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About LeverageRCM | Our Story, Mission & Team"
        description="Learn about LeverageRCM — a premium medical billing and revenue cycle management company serving healthcare providers across the USA and UK with certified expertise."
        path="/about"
      />
      <PageHero
        eyebrow="About Us"
        title={<>Who we are and why practices trust us</>}
        subtitle="LeverageRCM was founded to help healthcare providers capture every dollar they earn through expert billing, coding, and complete revenue cycle management."
        breadcrumb="Home / About Us"
      />

      {/* Who We Are */}
      <section className="section bg-white">
        <div className="container-px grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              center={false}
              eyebrow="Who We Are"
              title={<>A premium RCM partner built on expertise and trust</>}
            />
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-slatey-600 leading-relaxed">
                <p>
                  LeverageRCM is a specialized medical billing and revenue cycle management company serving
                  healthcare providers across the United States and the United Kingdom. We exist to solve one of
                  the biggest challenges in modern healthcare: capturing the revenue practices earn while reducing
                  the administrative burden on clinicians.
                </p>
                <p>
                  Our teams of certified coders, billing specialists, and denial experts work as a true extension
                  of your practice — handling the complete revenue cycle so your staff can focus on what matters
                  most: patient care.
                </p>
                <p>
                  From independent physicians to large hospitals, we tailor our services to your specialty, your
                  payers, and your goals — delivering measurable revenue improvement through process excellence
                  and modern technology.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 4).map((s) => (
                <div key={s.label} className="rounded-2xl bg-gradient-to-br from-slatey-50 to-white p-6 ring-1 ring-slatey-200/70 shadow-premium text-center">
                  <p className="text-3xl font-extrabold text-gradient">{s.value}</p>
                  <p className="mt-1 text-sm font-medium text-slatey-600">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-slatey-50">
        <div className="container-px grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-white p-8 lg:p-10 ring-1 ring-slatey-200/70 shadow-premium">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                <Target className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-navy-800">Our Mission</h3>
              <p className="mt-3 text-slatey-600 leading-relaxed">
                To maximize revenue for healthcare providers through accurate, compliant, and transparent
                revenue cycle management — so clinicians can focus on patient care without worrying about
                getting paid.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl bg-white p-8 lg:p-10 ring-1 ring-slatey-200/70 shadow-premium">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-100 text-accent-700">
                <Eye className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-navy-800">Our Vision</h3>
              <p className="mt-3 text-slatey-600 leading-relaxed">
                To be the most trusted medical billing partner for healthcare providers across the USA and UK —
                recognized for certified expertise, modern technology, and an unwavering commitment to client
                success.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader
            eyebrow="Core Values"
            title={<>The principles that guide every claim we handle</>}
            subtitle="Our values shape how we work with clients, protect patient data, and pursue revenue excellence."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, i) => (
              <Reveal key={value.title} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-2xl bg-slatey-50 p-7 ring-1 ring-slatey-200/70 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-premium-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white">
                    <Award className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-navy-800">{value.title}</h3>
                  <p className="mt-2 text-sm text-slatey-600 leading-relaxed">{value.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section bg-slatey-50">
        <div className="container-px">
          <SectionHeader
            eyebrow="Leadership"
            title={<>Experienced leaders in healthcare revenue cycle</>}
            subtitle="Our leadership team brings decades of combined experience across US and UK healthcare."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((leader, i) => (
              <Reveal key={leader.name} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-2xl bg-white p-7 ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-800 to-primary-600 text-xl font-bold text-white">
                    {leader.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-navy-800">{leader.name}</h3>
                  <p className="text-sm font-semibold text-primary-700">{leader.role}</p>
                  <p className="mt-2 text-sm text-slatey-600 leading-relaxed">{leader.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USA & UK Expertise + Practice types */}
      <section className="section bg-white">
        <div className="container-px">
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 p-8 text-white">
                <Globe2 className="h-10 w-10 text-accent-400" />
                <h3 className="mt-4 text-xl font-bold">USA & UK Expertise</h3>
                <p className="mt-2 text-sm text-slatey-300 leading-relaxed">
                  We understand the payer environments, regulations, and coding standards of both the US and UK
                  markets — and tailor our approach accordingly.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl bg-white p-8 ring-1 ring-slatey-200/70 shadow-premium">
                <Stethoscope className="h-10 w-10 text-primary-600" />
                <h3 className="mt-4 text-xl font-bold text-navy-800">Professional Practice</h3>
                <p className="mt-2 text-sm text-slatey-600 leading-relaxed">
                  Tailored RCM for independent physicians, group practices, and multi-specialty clinics of every
                  size — with dedicated account management.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="h-full rounded-2xl bg-white p-8 ring-1 ring-slatey-200/70 shadow-premium">
                <Building2 className="h-10 w-10 text-primary-600" />
                <h3 className="mt-4 text-xl font-bold text-navy-800">Institutional Practice</h3>
                <p className="mt-2 text-sm text-slatey-600 leading-relaxed">
                  Scalable billing and coding for hospitals, surgery centers, and large healthcare organizations —
                  built for high volume and complex workflows.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-slatey-50">
        <div className="container-px">
          <SectionHeader
            eyebrow="Our Journey"
            title={<>A decade of revenue cycle excellence</>}
            subtitle="From our founding to serving 50+ providers, here is how LeverageRCM has grown."
          />
          <div className="relative mt-16">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 md:left-1/2" />
            <div className="space-y-8">
              {timeline.map((event, i) => (
                <Reveal key={event.year} delay={(i % 2) * 0.1}>
                  <div className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-1/2 md:px-8">
                      <div className="rounded-2xl bg-white p-6 ring-1 ring-slatey-200/70 shadow-premium">
                        <span className="text-2xl font-extrabold text-gradient">{event.year}</span>
                        <h3 className="mt-1 text-lg font-bold text-navy-800">{event.title}</h3>
                        <p className="mt-2 text-sm text-slatey-600 leading-relaxed">{event.detail}</p>
                      </div>
                    </div>
                    <span className="absolute left-4 top-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-primary-600 ring-4 ring-slatey-50 md:left-1/2" />
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader
            eyebrow="Why Clients Trust Us"
            title={<>Built for trust, designed for results</>}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: 'HIPAA Aware', detail: 'Secure, audited processes protect patient data.' },
              { icon: Award, title: 'Certified Experts', detail: 'AAPC and AHIMA credentialed teams.' },
              { icon: HeartHandshake, title: 'Dedicated Managers', detail: 'A single point of contact who knows you.' },
              { icon: CheckCircle2, title: '98% Clean Claims', detail: 'Higher first-pass acceptance and faster pay.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl bg-slatey-50 p-6 ring-1 ring-slatey-200/70 text-center transition-all hover:-translate-y-1 hover:bg-white hover:shadow-premium-lg">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-3 text-base font-bold text-navy-800">{item.title}</h3>
                  <p className="mt-1 text-xs text-slatey-600">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
