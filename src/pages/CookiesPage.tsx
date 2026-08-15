import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { PageHero, Reveal } from '@/components/ui';

export default function CookiesPage() {
  return (
    <>
      <Seo title="Cookie Policy | LeverageRCM" description="How LeverageRCM uses cookies on this website." path="/cookies" />
      <PageHero eyebrow="Legal" title="Cookie Policy" subtitle="How LeverageRCM uses cookies on this website." breadcrumb="Home / Cookies" />
      <section className="section bg-white">
        <div className="container-px mx-auto max-w-3xl space-y-6">
          {[
            { h: 'What Are Cookies', p: 'Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your experience.' },
            { h: 'How We Use Cookies', p: 'LeverageRCM uses essential cookies to ensure the website functions correctly, and analytics cookies to understand how visitors use the site so we can improve it.' },
            { h: 'Managing Cookies', p: 'You can control or delete cookies through your browser settings. Disabling certain cookies may affect website functionality.' },
            { h: 'Third-Party Services', p: 'We may use third-party analytics tools that set their own cookies. These providers have their own privacy and cookie policies.' },
            { h: 'Contact', p: 'Questions about our cookie policy can be sent to info@leveragercm.com.' },
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
