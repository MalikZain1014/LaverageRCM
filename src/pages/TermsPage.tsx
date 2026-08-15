import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { PageHero, Reveal } from '@/components/ui';

export default function TermsPage() {
  return (
    <>
      <Seo title="Terms of Service | LeverageRCM" description="The terms governing the use of LeverageRCM services and website." path="/terms" />
      <PageHero eyebrow="Legal" title="Terms of Service" subtitle="The terms governing the use of LeverageRCM services and website." breadcrumb="Home / Terms" />
      <section className="section bg-white">
        <div className="container-px mx-auto max-w-3xl space-y-6">
          {[
            { h: 'Acceptance of Terms', p: 'By engaging LeverageRCM services or using this website, you agree to the terms outlined here. These terms govern the relationship between LeverageRCM and our clients.' },
            { h: 'Services', p: 'LeverageRCM provides medical billing, coding, credentialing, and revenue cycle management services as described in your service agreement. Specific deliverables, pricing, and terms are defined in that agreement.' },
            { h: 'Client Responsibilities', p: 'Clients are responsible for providing accurate information, maintaining access to required systems, and cooperating with our teams to deliver services effectively.' },
            { h: 'Confidentiality', p: 'Both parties agree to maintain the confidentiality of all protected health information, proprietary data, and business information shared during the engagement, in accordance with HIPAA and applicable law.' },
            { h: 'Limitation of Liability', p: 'LeverageRCM provides services using reasonable care and certified expertise. Our liability is limited to the terms defined in your service agreement.' },
            { h: 'Contact', p: 'Questions about these terms can be directed to info@leveragercm.com.' },
          ].map((section, i) => (
            <Reveal key={section.h} delay={i * 0.05}>
              <div>
                <h2 className="text-xl font-bold text-navy-800">{section.h}</h2>
                <p className="mt-2 text-slatey-600 leading-relaxed">{section.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
