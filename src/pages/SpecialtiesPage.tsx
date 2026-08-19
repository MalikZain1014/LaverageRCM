import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { PageHero, Reveal, SectionHeader } from '@/components/ui';
import { usePublicContent } from '@/context/PublicContentContext';

export default function SpecialtiesPage() {
  const { specialties } = usePublicContent();
  return (
    <>
      <Seo
        title="Healthcare Specialties | Specialty-Specific RCM | LeverageRCM"
        description="We provide specialty-specific medical billing and coding expertise for cardiology, dermatology, family medicine, psychiatry, radiology, orthopaedics, gastroenterology, and many more specialties."
        path="/specialties"
      />
      <PageHero
        eyebrow="Healthcare Specialties"
        title={<>Specialty-specific expertise for your practice</>}
        subtitle="Every specialty has unique coding, authorization, and billing challenges. Our teams are trained for yours — so your claims are clean and your revenue is maximized."
        breadcrumb="Home / Specialties"
      />

      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader
            eyebrow="Specialty Catalog"
            title={<>Billing and coding expertise for every specialty</>}
            subtitle="Select a specialty to see how LeverageRCM supports your specific billing challenges and revenue opportunities."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {specialties.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 0.06}>
                <Link
                  to={`/specialties/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium-lg hover:ring-primary-200"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent-50 transition-transform duration-500 group-hover:scale-150" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-premium transition-transform duration-300 group-hover:scale-110">
                    <s.icon className="h-7 w-7" strokeWidth={2} />
                  </span>
                  <h3 className="relative mt-5 text-lg font-bold text-navy-800 group-hover:text-primary-700 transition-colors">
                    {s.name}
                  </h3>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slatey-600 line-clamp-2">{s.short}</p>
                  <span className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Do not see your specialty listed?"
        subtitle="We support many more specialties than listed here. Contact us to discuss your specific practice needs."
        primaryLabel="Talk to a Specialist"
      />
    </>
  );
}
