export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: '12+', label: 'Years Experience' },
  { value: '98%', label: 'Clean Claim Rate' },
  { value: '50+', label: 'Healthcare Providers' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: 'USA & UK', label: 'Healthcare Expertise' },
  { value: '24/7', label: 'Dedicated Support' },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'LeverageRCM transformed our revenue cycle. Our clean claim rate jumped and our days in AR dropped dramatically within the first quarter. They feel like a true extension of our practice.',
    name: 'Dr. Sarah Mitchell',
    role: 'Internal Medicine Physician',
    location: 'Austin, Texas',
  },
  {
    quote:
      'The denial management team recovered revenue we had written off as lost. Their attention to detail and proactive follow-up is unlike any billing partner we have worked with before.',
    name: 'Dr. James Carter',
    role: 'Cardiology Group Director',
    location: 'Manchester, UK',
  },
  {
    quote:
      'As a telehealth practice, billing rules were confusing and constantly changing. LeverageRCM navigated it all and our collections have never been stronger.',
    name: 'Dr. Priya Sharma',
    role: 'Telehealth Provider',
    location: 'San Francisco, California',
  },
  {
    quote:
      'Their certified coders caught documentation gaps our previous biller missed entirely. We are now capturing revenue we did not even know we were losing.',
    name: 'Dr. Robert Hughes',
    role: 'Orthopaedic Surgeon',
    location: 'Chicago, Illinois',
  },
  {
    quote:
      'The dedicated account manager model is fantastic. I always know who to call and they understand our specialty inside and out. Communication is transparent and consistent.',
    name: 'Dr. Emily Roberts',
    role: 'Dermatology Practice Owner',
    location: 'London, UK',
  },
  {
    quote:
      'We switched to LeverageRCM after years of in-house billing struggles. The difference is night and day — our staff can focus on patients and revenue is up 18%.',
    name: 'Dr. Michael Bennett',
    role: 'Family Medicine Physician',
    location: 'Denver, Colorado',
  },
];

export interface TimelineEvent {
  year: string;
  title: string;
  detail: string;
}

export const timeline: TimelineEvent[] = [
  { year: '2013', title: 'Founded', detail: 'LeverageRCM is founded with a mission to help independent physicians maximize revenue through expert billing.' },
  { year: '2016', title: 'Expanded Specialties', detail: 'Added specialty-specific coding teams covering cardiology, dermatology, orthopaedics, and more.' },
  { year: '2018', title: 'UK Operations', detail: 'Opened operations in the United Kingdom to serve the NHS private practice market.' },
  { year: '2020', title: 'Telehealth Expertise', detail: 'Developed dedicated telehealth billing workflows during the rapid expansion of virtual care.' },
  { year: '2022', title: '50+ Providers', detail: 'Reached 50+ healthcare providers served across the USA and UK.' },
  { year: '2024', title: 'AI-Enhanced RCM', detail: 'Integrated AI-assisted claim scrubbing and denial prediction into our revenue cycle platform.' },
  { year: '2026', title: '98% Clean Claim Rate', detail: 'Achieved a 98% clean claim rate across all clients through continuous process improvement.' },
];

export interface CoreValue {
  title: string;
  detail: string;
}

export const coreValues: CoreValue[] = [
  { title: 'Integrity', detail: 'We operate with complete transparency. No hidden fees, no surprise charges — just honest partnership.' },
  { title: 'Excellence', detail: 'Certified specialists and continuous training ensure every claim, code, and appeal meets the highest standard.' },
  { title: 'Client Focus', detail: 'Your success is our success. We align our incentives with yours and treat your practice like our own.' },
  { title: 'Innovation', detail: 'We invest in modern technology and AI-assisted tools that improve accuracy and speed across the revenue cycle.' },
  { title: 'Compliance', detail: 'HIPAA awareness and audit-ready processes protect your patients and your practice at every step.' },
  { title: 'Partnership', detail: 'Dedicated account managers and transparent communication make us a true extension of your team.' },
];

export interface Leader {
  name: string;
  role: string;
  detail: string;
}

export const leadership: Leader[] = [
  { name: 'David Thompson', role: 'Chief Executive Officer', detail: '20+ years in healthcare revenue cycle leadership across US and UK markets.' },
  { name: 'Jennifer Walsh', role: 'Chief Operating Officer', detail: 'Operations expert who scaled RCM teams for multi-specialty and institutional practices.' },
  { name: 'Dr. Anil Mehta', role: 'Chief Medical Officer', detail: 'Practicing physician advising on clinical documentation and compliance.' },
  { name: 'Rachel Green', role: 'VP of Coding Services', detail: 'AHIMA-credentialed leader overseeing certified coding across all specialties.' },
  { name: 'Marcus Bell', role: 'VP of Client Success', detail: 'Dedicated account management and client satisfaction across both regions.' },
  { name: 'Sophie Laurent', role: 'Director of UK Operations', detail: 'Leads our UK practice serving private and NHS-aligned providers.' },
];

export interface WhyChooseItem {
  title: string;
  detail: string;
}

export const whyChooseItems: WhyChooseItem[] = [
  { title: 'Experienced Professionals', detail: 'Our teams bring decades of combined healthcare revenue cycle experience across every major specialty.' },
  { title: 'Certified Billing Specialists', detail: 'Every billing specialist is trained and certified, ensuring your claims are handled by qualified experts.' },
  { title: 'Certified Medical Coders', detail: 'AAPC and AHIMA certified coders with specialty credentials translate your documentation into accurate codes.' },
  { title: 'USA & UK Expertise', detail: 'We understand the payer environments, regulations, and coding standards of both the US and UK markets.' },
  { title: 'Professional Practice Support', detail: 'Tailored RCM for independent physicians, group practices, and multi-specialty clinics of every size.' },
  { title: 'Institutional Practice Support', detail: 'Scalable billing and coding for hospitals, surgery centers, and large healthcare organizations.' },
  { title: 'HIPAA Awareness', detail: 'Workforce training, secure access, and audit-ready processes protect patient data at every step.' },
  { title: 'Revenue Optimization', detail: 'We do not just process claims — we actively find ways to increase your collections and reduce leakage.' },
  { title: 'Clean Claims', detail: 'Our 98% clean claim rate means faster payment, fewer denials, and less rework for your team.' },
  { title: 'Fast Turnaround', detail: 'Same-day payment posting and rapid claim submission keep your cash flow healthy and predictable.' },
  { title: 'Transparent Communication', detail: 'Clear reporting, monthly reviews, and a dedicated account manager keep you informed at all times.' },
  { title: 'Dedicated Account Managers', detail: 'A single point of contact who knows your specialty, your payers, and your goals.' },
  { title: 'Modern Technology', detail: 'AI-assisted claim scrubbing, denial prediction, and real-time dashboards powered by modern tools.' },
  { title: 'Data Security', detail: 'Encrypted access, role-based permissions, and activity logging keep your practice data secure.' },
];

export interface HowWeWorkStep {
  step: string;
  title: string;
  detail: string;
}

export const howWeWork: HowWeWorkStep[] = [
  { step: '01', title: 'Discovery & Audit', detail: 'We assess your current revenue cycle, identify leakage points, and build a tailored improvement plan.' },
  { step: '02', title: 'Onboarding', detail: 'We connect to your EHR, configure payer rules, and onboard your team with clear milestones.' },
  { step: '03', title: 'Daily Operations', detail: 'Certified specialists handle coding, claim submission, payment posting, and follow-up every business day.' },
  { step: '04', title: 'Denial Management', detail: 'Denials are analyzed, appealed, and prevented through root-cause process fixes.' },
  { step: '05', title: 'Reporting & Growth', detail: 'Monthly reviews and quarterly strategy sessions identify new ways to grow your revenue.' },
];
