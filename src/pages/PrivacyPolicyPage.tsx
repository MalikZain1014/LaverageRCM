import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { PageHero, Reveal } from '@/components/ui';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Seo title="Privacy Policy | LeverageRCM" description="How LeverageRCM collects, uses, and protects your information." path="/privacy-policy" />
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="How LeverageRCM collects, uses, and protects your information." breadcrumb="Home / Privacy Policy" />
      <section className="section bg-white">
        <div className="container-px mx-auto max-w-3xl space-y-6">
          {[
            { h: 'Introduction', p: 'LeverageRCM is committed to protecting the privacy of healthcare providers and patients we serve. This policy describes how we handle information in the course of providing revenue cycle management services.' },
            { h: 'Information We Collect', p: 'We collect information necessary to provide billing, coding, and RCM services, including provider credentials, patient billing data, and contact information. All patient health information is handled in accordance with HIPAA requirements.' },
            { h: 'How We Use Information', p: 'Information is used solely for the purpose of delivering our services — processing claims, posting payments, managing denials, and communicating with your practice. We never sell or share your information with third parties for marketing purposes.' },
            { h: 'Data Security', p: 'We employ encrypted access channels, role-based permissions, activity logging, and secure infrastructure to protect all information. Our workforce completes HIPAA training and access is restricted to authorized personnel.' },
            { h: 'Your Rights', p: 'You retain ownership of your data at all times. You may request access to, correction of, or deletion of your information subject to applicable legal requirements and retention obligations.' },
            { h: 'Contact Us', p: 'If you have questions about this privacy policy or how we handle your information, please contact us at info@leveragercm.com.' },
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
