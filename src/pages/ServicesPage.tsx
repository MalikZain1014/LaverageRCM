import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { PageHero, Reveal, SectionHeader } from '@/components/ui';
import { usePublicContent } from '@/context/PublicContentContext';

export default function ServicesPage() {
  const { services } = usePublicContent();
  return (
    <>
      <Seo
        title="Medical Billing & RCM Services | LeverageRCM"
        description="Explore our complete revenue cycle management services — medical billing, coding, credentialing, eligibility verification, prior authorization, payment posting, AR management, denial management, and virtual medical assistants."
        path="/services"
      />
      <PageHero
        eyebrow="Our Services"
        title={<>Complete revenue cycle management services</>}
        subtitle="Every service you need to capture your full revenue — from front-end eligibility to back-end denial recovery. Each service is delivered by certified specialists and tailored to your specialty."
        breadcrumb="Home / Services"
      />

      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader
            eyebrow="Service Catalog"
            title={<>Nine services. One seamless revenue cycle.</>}
            subtitle="Select any service to see the full workflow, benefits, and process detail."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium-lg hover:ring-primary-200"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-50 transition-transform duration-500 group-hover:scale-150" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-premium transition-transform duration-300 group-hover:scale-110">
                    <s.icon className="h-7 w-7" strokeWidth={2} />
                  </span>
                  <h3 className="relative mt-5 text-xl font-bold text-navy-800 group-hover:text-primary-700 transition-colors">
                    {s.title}
                  </h3>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slatey-600">{s.short}</p>
                  <ul className="relative mt-4 space-y-1.5">
                    {s.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-slatey-500">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
