import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Activity,
  ShieldCheck,
  Clock,
  Globe2,
  CheckCircle2,
  Star,
  Quote,
  FileText,
  Code2,
  BadgeCheck,
  ClipboardCheck,
  ReceiptText,
  TrendingUp,
  AlertTriangle,
  Headset,
  HeartPulse,
  Sparkles,
  Stethoscope,
  Brain,
  Scan,
  Bone,
  Pill,
  Phone,
} from 'lucide-react';
import Seo from '@/components/Seo';
import CtaBanner from '@/components/CtaBanner';
import { Reveal, SectionHeader } from '@/components/ui';
import { stats, howWeWork, whyChooseItems } from '@/data/content';
import { usePublicContent } from '@/context/PublicContentContext';

const floatingIcons = [
  { Icon: HeartPulse, className: 'top-[18%] left-[8%]', delay: '0s' },
  { Icon: Activity, className: 'top-[28%] right-[12%]', delay: '1s' },
  { Icon: ShieldCheck, className: 'bottom-[24%] left-[14%]', delay: '2s' },
  { Icon: Stethoscope, className: 'bottom-[18%] right-[16%]', delay: '0.5s' },
  { Icon: Brain, className: 'top-[48%] left-[4%]', delay: '1.5s' },
  { Icon: Pill, className: 'top-[60%] right-[6%]', delay: '2.5s' },
];

export default function HomePage() {
  return (
    <>
      <Seo
        title="LeverageRCM | Medical Billing & Revenue Cycle Management"
        description="Helping healthcare providers across the USA maximize revenue through accurate medical billing, coding, credentialing, and complete revenue cycle management."
      />
      <Hero />
      <Stats />
      <ServicesOverview />
      <WhyChoosePreview />
      <SpecialtiesPreview />
      <HowWeWork />
      <Testimonials />
      <BlogPreview />
      <FaqPreview />
      <CtaBanner />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-900 pt-20">
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.05]" />
      {/* Floating icons */}
      {floatingIcons.map(({ Icon, className, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${className} hidden md:block`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2, duration: 0.8 }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass-dark text-accent-300 animate-float" style={{ animationDelay: delay }}>
            <Icon className="h-7 w-7" />
          </div>
        </motion.div>
      ))}

      <div className="relative container-px flex min-h-[calc(10vh-5rem)] items-center py-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent-300 ring-1 ring-white/15"
          >
            <span className="relative flex h-2 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            Trusted by 50+ Healthcare Providers
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 text-4xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            Medical Billing &{' '}
            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-accent-500 bg-clip-text text-transparent">
              Revenue Cycle Management
            </span>{' '}
            That Keeps Your Practice Moving
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto max-w-3xl mt-6 text-sm leading-relaxed text-slatey-300"
          >
            LeverageRCM offers end-to-end medical billing and management of revenue to healthcare professionals across the USA. From 
             <Link to="/services/medical-billing" className="text-sm text-primary-400 transition-colors hover:text-accent-500">
              {' '}Medical Billing {' '}
            </Link>
            and claim submittal to the process of credentialing, denial administration, and follow-up on accounts receivable LeverageRCM helps practices cut down on collection delays and billing errors, boost collection rates, and ensure the health of their revenue cycle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/contact" className="btn-primary text-base px-7 py-4">
              Get Free Consultation <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/services" className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 px-7 py-4 text-base">
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slatey-400"
          >
            {['HIPAA Aware', 'Certified Coders', 'USA Expertise', '98% Clean Claims'].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent-400" /> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="container-px -mt-2 py-16 lg:py-20">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <div className="card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
              <p className="text-3xl font-extrabold text-gradient lg:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-slatey-600">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServicesOverview() {
  const { services } = usePublicContent();

  return (
    <section className="section bg-white">
      <div className="container-px">
         <SectionHeader
          eyebrow="Our Services"
          title={<>Full revenue cycle solutions to your business</>}
          subtitle={
            <>
              From billing and coding, to credentials and{" "}
              <Link
                to="/services/denial-management"
                className="text-lg text-primary-400 transition-colors hover:text-accent-500"
              >
                Denial Management
              </Link>{" "}
              we'll cover each step of the revenue process so that you are able
              to concentrate on providing care to patients.
            </>
          }
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <Link
                to={`/services/${s.slug}`}
                className="group relative flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium-lg hover:ring-primary-200"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-premium transition-transform duration-300 group-hover:scale-110">
                  <s.icon className="h-7 w-7" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy-800 group-hover:text-primary-700 transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slatey-600">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link to="/services" className="btn-outline">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChoosePreview() {
  const featured = whyChooseItems.slice(0, 6);
  return (
    <section className="section bg-slatey-50">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              center={false}
              eyebrow="Why LeverageRCM"
              title={<>Less Billing Stress More Control Over Your Revenue.</>}
              subtitle="We provide expert billing support with smarter workflows and efficient account management. We assist your practice to collect money effectively and keep your finances efficient and organized."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/why-choose-us" className="btn-primary">
                  Why Choose Us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/about" className="btn-outline">
                  About Our Company
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.08}>
                <div className="h-full rounded-2xl bg-white p-6 ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                  <CheckCircle2 className="h-7 w-7 text-accent-500" />
                  <h3 className="mt-3 text-base font-bold text-navy-800">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-slatey-600 leading-relaxed">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecialtiesPreview() {
  const { specialties } = usePublicContent();

  return (
    <section className="section bg-white">
      <div className="container-px">
        <SectionHeader
          eyebrow="Healthcare Specialties"
          title={<>Billing Expertise Built Around Your Specialty</>}
          subtitle="Each medical field has its own codes, requirements for payers for authorization, as well as the challenges of reimbursement. LeverageRCM assists U.S. physicians and healthcare practices with specialized billing processes designed to increase quality of the claim and keep revenue in the flow."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {specialties.slice(0, 8).map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.06}>
              <Link
                to={`/specialties/${s.slug}`}
                className="group flex h-full flex-col items-start rounded-2xl bg-gradient-to-br from-slatey-50 to-white p-6 ring-1 ring-slatey-200/70 transition-all duration-300 hover:-translate-y-1 hover:ring-primary-200 hover:shadow-premium-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-bold text-navy-800 group-hover:text-primary-700 transition-colors">
                  {s.name}
                </h3>
                <p className="mt-1 text-xs text-slatey-500 line-clamp-2">{s.short}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link to="/specialties" className="btn-outline">
              View All Specialties <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowWeWork() {
  return (
    <section className="section relative overflow-hidden bg-navy-900">
      <div className="absolute inset-0 bg-hero-radial opacity-60" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.04]" />
      <div className="relative container-px">
        <SectionHeader
          eyebrow="How We Work"
          title={<span className="text-white">A Proven Process for Revenue Growth</span>}
          subtitle={<span className="text-slatey-300">Beginning with your initial billing review until ongoing claims follow-up the process we use is designed to minimize the leakage of revenue, increase collection rates, and provide the practice more control over your income cycle.</span>}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {howWeWork.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl glass-dark p-6 transition-all duration-300 hover:-translate-y-1.5">
                <span className="text-4xl font-extrabold text-gradient">{step.step}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slatey-400 leading-relaxed">{step.detail}</p>
                {i < howWeWork.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary-500/50 lg:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { testimonials } = usePublicContent();

  return (
    <section className="section bg-slatey-50">
      <div className="container-px">
        <SectionHeader
          eyebrow="Client Testimonials"
          title={<>Trusted by Healthcare Providers Across the USA</>}
          subtitle="Get advice from practicing physicians and managers who use LeverageRCM because of precise billing, better A/R follow-up, less prone to denials and reliable assistance with revenue cycle based around US payer requirements."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                <Quote className="h-8 w-8 text-primary-200" />
                <p className="mt-3 flex-1 text-slatey-700 leading-relaxed">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-slatey-100 pt-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-sm font-bold text-white">
                    {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-800">{t.name}</p>
                    <p className="text-xs text-slatey-500">{t.role} · {t.location}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  const { blogPosts } = usePublicContent();

  const featured = blogPosts.filter((p) => p.featured).slice(0, 2);
  const recent = blogPosts.filter((p) => !p.featured).slice(0, 3);
  return (
    <section className="section bg-white">
      <div className="container-px">
        <SectionHeader
          eyebrow="Latest Insights"
          title={<>Expert perspectives on medical billing & RCM</>}
          subtitle="Stay current with the latest in coding, billing, and revenue cycle management."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {featured.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
              >
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary-600 to-accent-500">
                  <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="h-16 w-16 text-white/40" />
                  </div>
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-700">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-slatey-500">{post.date} · {post.readTime}</p>
                  <h3 className="mt-2 text-xl font-bold text-navy-800 group-hover:text-primary-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slatey-600 line-clamp-2">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                    Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {recent.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl bg-slatey-50 p-5 ring-1 ring-slatey-200/60 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-premium-lg"
              >
                <span className="text-xs font-semibold text-accent-600">{post.category}</span>
                <h3 className="mt-2 text-base font-bold text-navy-800 group-hover:text-primary-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-xs text-slatey-500">{post.readTime}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link to="/blog" className="btn-outline">
              Read All Articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqPreview() {
  const { faqs } = usePublicContent();

  const previewFaqs = faqs.slice(0, 6);
  return (
    <section className="section bg-slatey-50">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              center={false}
              eyebrow="FAQ"
              title={<>Answers to common questions</>}
              subtitle="Everything you need to know about working with LeverageRCM."
            />
            <Reveal delay={0.15}>
              <div className="mt-8">
                <Link to="/faq" className="btn-primary">
                  View All FAQs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="space-y-3">
            {previewFaqs.map((item, i) => (
              <Reveal key={i} delay={(i % 3) * 0.06}>
                <div className="card p-5">
                  <p className="text-base font-semibold text-navy-800">{item.question}</p>
                  <p className="mt-2 text-sm text-slatey-600 leading-relaxed">{item.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}







// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   ArrowRight,
//   Activity,
//   ShieldCheck,
//   Clock,
//   Globe2,
//   CheckCircle2,
//   Star,
//   Quote,
//   FileText,
//   Code2,
//   BadgeCheck,
//   ClipboardCheck,
//   ReceiptText,
//   TrendingUp,
//   AlertTriangle,
//   Headset,
//   HeartPulse,
//   Sparkles,
//   Stethoscope,
//   Brain,
//   Scan,
//   Bone,
//   Pill,
//   Phone,
// } from 'lucide-react';
// import Seo from '@/components/Seo';
// import CtaBanner from '@/components/CtaBanner';
// import { Reveal, SectionHeader } from '@/components/ui';
// import { stats, howWeWork, whyChooseItems } from '@/data/content';
// import { usePublicContent } from '@/context/PublicContentContext';

// const floatingIcons = [
//   { Icon: HeartPulse, className: 'top-[18%] left-[8%]', delay: '0s' },
//   { Icon: Activity, className: 'top-[28%] right-[12%]', delay: '1s' },
//   { Icon: ShieldCheck, className: 'bottom-[24%] left-[14%]', delay: '2s' },
//   { Icon: Stethoscope, className: 'bottom-[18%] right-[16%]', delay: '0.5s' },
//   { Icon: Brain, className: 'top-[48%] left-[4%]', delay: '1.5s' },
//   { Icon: Pill, className: 'top-[60%] right-[6%]', delay: '2.5s' },
// ];

// export default function HomePage() {
//   return (
//     <>
//       <Seo
//         title="LeverageRCM | Medical Billing & Revenue Cycle Management"
//         description="Helping healthcare providers across the USA maximize revenue through accurate medical billing, coding, credentialing, and complete revenue cycle management."
//       />
//       <Hero />
//       <Stats />
//       <ServicesOverview />
//       <WhyChoosePreview />
//       <SpecialtiesPreview />
//       <HowWeWork />
//       <Testimonials />
//       <BlogPreview />
//       <FaqPreview />
//       <CtaBanner />
//     </>
//   );
// }

// function Hero() {
//   return (
//     <section className="relative min-h-screen overflow-hidden bg-navy-900 pt-20">
//       <div className="absolute inset-0 bg-hero-radial" />
//       <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.05]" />
//       {/* Floating icons */}
//       {floatingIcons.map(({ Icon, className, delay }, i) => (
//         <motion.div
//           key={i}
//           className={`absolute ${className} hidden md:block`}
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: i * 0.2, duration: 0.8 }}
//         >
//           <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass-dark text-accent-300 animate-float" style={{ animationDelay: delay }}>
//             <Icon className="h-7 w-7" />
//           </div>
//         </motion.div>
//       ))}

//       <div className="relative container-px flex min-h-[calc(100vh-5rem)] items-center py-16">
//         <div className="mx-auto max-w-4xl text-center">
//           <motion.span
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent-300 ring-1 ring-white/15"
//           >
//             <span className="relative flex h-2 w-2">
//               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
//               <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
//             </span>
//             Trusted by 50+ Healthcare Providers
//           </motion.span>

//           <motion.h1
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1, duration: 0.6 }}
//             className="mt-6 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
//           >
//             Your Trusted Medical Billing &{' '}
//             <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-accent-500 bg-clip-text text-transparent">
//               Revenue Cycle Management
//             </span>{' '}
//             Partner
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             className="mx-auto mt-6 max-w-2xl text-lg text-slatey-300 sm:text-xl"
//           >
//             Helping healthcare providers across the USA maximize revenue through accurate medical billing,
//             coding, credentialing, and complete revenue cycle management.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
//           >
//             <Link to="/contact" className="btn-primary text-base px-7 py-4">
//               Get Free Consultation <ArrowRight className="h-5 w-5" />
//             </Link>
//             <Link to="/services" className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 px-7 py-4 text-base">
//               Explore Services
//             </Link>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.6 }}
//             className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slatey-400"
//           >
//             {['HIPAA Aware', 'Certified Coders', 'USA Expertise', '98% Clean Claims'].map((t) => (
//               <span key={t} className="flex items-center gap-2">
//                 <CheckCircle2 className="h-4 w-4 text-accent-400" /> {t}
//               </span>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       {/* Wave divider */}
//       <div className="absolute bottom-0 left-0 right-0">
//         <svg viewBox="0 0 1440 80" className="w-full h-auto" preserveAspectRatio="none">
//           <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFC" />
//         </svg>
//       </div>
//     </section>
//   );
// }

// function Stats() {
//   return (
//     <section className="container-px -mt-2 py-16 lg:py-20">
//       <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
//         {stats.map((stat, i) => (
//           <Reveal key={stat.label} delay={i * 0.06}>
//             <div className="card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
//               <p className="text-3xl font-extrabold text-gradient lg:text-4xl">{stat.value}</p>
//               <p className="mt-2 text-sm font-medium text-slatey-600">{stat.label}</p>
//             </div>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   );
// }

// function ServicesOverview() {
//   const { services } = usePublicContent();

//   return (
//     <section className="section bg-white">
//       <div className="container-px">
//         <SectionHeader
//           eyebrow="Our Services"
//           title={<>Complete revenue cycle solutions for your practice</>}
//           subtitle="From billing and coding to credentialing and denial management, we cover every step of the revenue cycle so you can focus on patient care."
//         />
//         <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {services.map((s, i) => (
//             <Reveal key={s.slug} delay={(i % 3) * 0.08}>
//               <Link
//                 to={`/services/${s.slug}`}
//                 className="group relative flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium-lg hover:ring-primary-200"
//               >
//                 <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-premium transition-transform duration-300 group-hover:scale-110">
//                   <s.icon className="h-7 w-7" strokeWidth={2} />
//                 </span>
//                 <h3 className="mt-5 text-xl font-bold text-navy-800 group-hover:text-primary-700 transition-colors">
//                   {s.title}
//                 </h3>
//                 <p className="mt-2 flex-1 text-sm leading-relaxed text-slatey-600">{s.short}</p>
//                 <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
//                   Learn More
//                   <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                 </span>
//               </Link>
//             </Reveal>
//           ))}
//         </div>
//         <Reveal delay={0.2}>
//           <div className="mt-12 text-center">
//             <Link to="/services" className="btn-outline">
//               View All Services <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// function WhyChoosePreview() {
//   const featured = whyChooseItems.slice(0, 6);
//   return (
//     <section className="section bg-slatey-50">
//       <div className="container-px">
//         <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
//           <div>
//             <SectionHeader
//               center={false}
//               eyebrow="Why LeverageRCM"
//               title={<>The partner practices trust with their revenue</>}
//               subtitle="We combine certified expertise, modern technology, and dedicated account management to deliver measurable revenue improvement."
//             />
//             <Reveal delay={0.15}>
//               <div className="mt-8 flex flex-col gap-4 sm:flex-row">
//                 <Link to="/why-choose-us" className="btn-primary">
//                   Why Choose Us <ArrowRight className="h-4 w-4" />
//                 </Link>
//                 <Link to="/about" className="btn-outline">
//                   About Our Company
//                 </Link>
//               </div>
//             </Reveal>
//           </div>
//           <div className="grid gap-4 sm:grid-cols-2">
//             {featured.map((item, i) => (
//               <Reveal key={item.title} delay={(i % 2) * 0.08}>
//                 <div className="h-full rounded-2xl bg-white p-6 ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
//                   <CheckCircle2 className="h-7 w-7 text-accent-500" />
//                   <h3 className="mt-3 text-base font-bold text-navy-800">{item.title}</h3>
//                   <p className="mt-1.5 text-sm text-slatey-600 leading-relaxed">{item.detail}</p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function SpecialtiesPreview() {
//   const { specialties } = usePublicContent();

//   return (
//     <section className="section bg-white">
//       <div className="container-px">
//         <SectionHeader
//           eyebrow="Healthcare Specialties"
//           title={<>Specialty-specific expertise across every practice type</>}
//           subtitle="We understand that every specialty has unique coding, authorization, and billing challenges. Our teams are trained for yours."
//         />
//         <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
//           {specialties.slice(0, 8).map((s, i) => (
//             <Reveal key={s.slug} delay={(i % 4) * 0.06}>
//               <Link
//                 to={`/specialties/${s.slug}`}
//                 className="group flex h-full flex-col items-start rounded-2xl bg-gradient-to-br from-slatey-50 to-white p-6 ring-1 ring-slatey-200/70 transition-all duration-300 hover:-translate-y-1 hover:ring-primary-200 hover:shadow-premium-lg"
//               >
//                 <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white">
//                   <s.icon className="h-6 w-6" />
//                 </span>
//                 <h3 className="mt-4 text-base font-bold text-navy-800 group-hover:text-primary-700 transition-colors">
//                   {s.name}
//                 </h3>
//                 <p className="mt-1 text-xs text-slatey-500 line-clamp-2">{s.short}</p>
//               </Link>
//             </Reveal>
//           ))}
//         </div>
//         <Reveal delay={0.2}>
//           <div className="mt-12 text-center">
//             <Link to="/specialties" className="btn-outline">
//               View All Specialties <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// function HowWeWork() {
//   return (
//     <section className="section relative overflow-hidden bg-navy-900">
//       <div className="absolute inset-0 bg-hero-radial opacity-60" />
//       <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.04]" />
//       <div className="relative container-px">
//         <SectionHeader
//           eyebrow="How We Work"
//           title={<span className="text-white">A proven process for revenue growth</span>}
//           subtitle={<span className="text-slatey-300">From discovery to daily operations, our process is built to maximize your collections and minimize your headaches.</span>}
//         />
//         <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
//           {howWeWork.map((step, i) => (
//             <Reveal key={step.step} delay={i * 0.08}>
//               <div className="relative h-full rounded-2xl glass-dark p-6 transition-all duration-300 hover:-translate-y-1.5">
//                 <span className="text-4xl font-extrabold text-gradient">{step.step}</span>
//                 <h3 className="mt-3 text-lg font-bold text-white">{step.title}</h3>
//                 <p className="mt-2 text-sm text-slatey-400 leading-relaxed">{step.detail}</p>
//                 {i < howWeWork.length - 1 && (
//                   <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary-500/50 lg:block" />
//                 )}
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function Testimonials() {
//   const { testimonials } = usePublicContent();

//   return (
//     <section className="section bg-slatey-50">
//       <div className="container-px">
//         <SectionHeader
//           eyebrow="Client Testimonials"
//           title={<>Trusted by providers across the USA & UK</>}
//           subtitle="Our clients see real results — higher collections, lower denials, and more time for patient care."
//         />
//         <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {testimonials.map((t, i) => (
//             <Reveal key={i} delay={(i % 3) * 0.08}>
//               <div className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
//                 <Quote className="h-8 w-8 text-primary-200" />
//                 <p className="mt-3 flex-1 text-slatey-700 leading-relaxed">{t.quote}</p>
//                 <div className="mt-5 flex items-center gap-3 border-t border-slatey-100 pt-4">
//                   <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-sm font-bold text-white">
//                     {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
//                   </span>
//                   <div>
//                     <p className="text-sm font-bold text-navy-800">{t.name}</p>
//                     <p className="text-xs text-slatey-500">{t.role} · {t.location}</p>
//                   </div>
//                   <div className="ml-auto flex gap-0.5">
//                     {Array.from({ length: 5 }).map((_, s) => (
//                       <Star key={s} className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function BlogPreview() {
//   const { blogPosts } = usePublicContent();

//   const featured = blogPosts.filter((p) => p.featured).slice(0, 2);
//   const recent = blogPosts.filter((p) => !p.featured).slice(0, 3);
//   return (
//     <section className="section bg-white">
//       <div className="container-px">
//         <SectionHeader
//           eyebrow="Latest Insights"
//           title={<>Expert perspectives on medical billing & RCM</>}
//           subtitle="Stay current with the latest in coding, billing, and revenue cycle management."
//         />
//         <div className="mt-14 grid gap-6 lg:grid-cols-2">
//           {featured.map((post, i) => (
//             <Reveal key={post.slug} delay={i * 0.1}>
//               <Link
//                 to={`/blog/${post.slug}`}
//                 className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slatey-200/70 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
//               >
//                 <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary-600 to-accent-500">
//                   <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <FileText className="h-16 w-16 text-white/40" />
//                   </div>
//                   <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-700">
//                     {post.category}
//                   </span>
//                 </div>
//                 <div className="flex flex-1 flex-col p-6">
//                   <p className="text-xs text-slatey-500">{post.date} · {post.readTime}</p>
//                   <h3 className="mt-2 text-xl font-bold text-navy-800 group-hover:text-primary-700 transition-colors">
//                     {post.title}
//                   </h3>
//                   <p className="mt-2 flex-1 text-sm text-slatey-600 line-clamp-2">{post.excerpt}</p>
//                   <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
//                     Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </span>
//                 </div>
//               </Link>
//             </Reveal>
//           ))}
//         </div>
//         <div className="mt-6 grid gap-4 md:grid-cols-3">
//           {recent.map((post, i) => (
//             <Reveal key={post.slug} delay={i * 0.08}>
//               <Link
//                 to={`/blog/${post.slug}`}
//                 className="group flex h-full flex-col rounded-2xl bg-slatey-50 p-5 ring-1 ring-slatey-200/60 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-premium-lg"
//               >
//                 <span className="text-xs font-semibold text-accent-600">{post.category}</span>
//                 <h3 className="mt-2 text-base font-bold text-navy-800 group-hover:text-primary-700 transition-colors line-clamp-2">
//                   {post.title}
//                 </h3>
//                 <p className="mt-1.5 text-xs text-slatey-500">{post.readTime}</p>
//               </Link>
//             </Reveal>
//           ))}
//         </div>
//         <Reveal delay={0.2}>
//           <div className="mt-12 text-center">
//             <Link to="/blog" className="btn-outline">
//               Read All Articles <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// function FaqPreview() {
//   const { faqs } = usePublicContent();

//   const previewFaqs = faqs.slice(0, 6);
//   return (
//     <section className="section bg-slatey-50">
//       <div className="container-px">
//         <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
//           <div className="lg:sticky lg:top-28">
//             <SectionHeader
//               center={false}
//               eyebrow="FAQ"
//               title={<>Answers to common questions</>}
//               subtitle="Everything you need to know about working with LeverageRCM."
//             />
//             <Reveal delay={0.15}>
//               <div className="mt-8">
//                 <Link to="/faq" className="btn-primary">
//                   View All FAQs <ArrowRight className="h-4 w-4" />
//                 </Link>
//               </div>
//             </Reveal>
//           </div>
//           <div className="space-y-3">
//             {previewFaqs.map((item, i) => (
//               <Reveal key={i} delay={(i % 3) * 0.06}>
//                 <div className="card p-5">
//                   <p className="text-base font-semibold text-navy-800">{item.question}</p>
//                   <p className="mt-2 text-sm text-slatey-600 leading-relaxed">{item.answer}</p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
