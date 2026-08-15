export interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    category: 'General',
    question: 'What is revenue cycle management (RCM)?',
    answer:
      'Revenue cycle management is the end-to-end financial process that healthcare practices use to track a patient encounter from registration and eligibility verification through claim submission, payment posting, denial resolution, and final collection. A well-run RCM process maximizes revenue, reduces denials, and keeps cash flow healthy.',
  },
  {
    category: 'General',
    question: 'What services does LeverageRCM offer?',
    answer:
      'We offer complete revenue cycle management including medical billing, medical coding, credentialing, eligibility verification, prior authorization, payment posting, accounts receivable management, denial management, and virtual medical assistant services — covering the full lifecycle of your practice revenue.',
  },
  {
    category: 'General',
    question: 'Which countries does LeverageRCM serve?',
    answer:
      'We serve healthcare providers across the United States and the United Kingdom, with expertise in the payer environments, regulations, and coding standards of both markets.',
  },
  {
    category: 'General',
    question: 'What types of practices do you work with?',
    answer:
      'We work with independent physicians, medical clinics, group practices, hospitals, healthcare organizations, multi-specialty practices, mental health providers, telehealth providers, and surgery centers — from solo practices to large institutional groups.',
  },
  {
    category: 'Onboarding',
    question: 'How long does it take to onboard a new practice?',
    answer:
      'Most practices are fully onboarded within 2–3 weeks. The timeline depends on EHR access, payer enrollment status, and the complexity of your current billing. We provide a clear onboarding plan with milestones so you always know where things stand.',
  },
  {
    category: 'Onboarding',
    question: 'Will I need to change my EHR or practice management system?',
    answer:
      'No. We work with your existing EHR and practice management system. Our team is experienced with all major platforms including Epic, Cerner, eClinicalWorks, Athena, Kareo, AdvancedMD, and many others.',
  },
  {
    category: 'Onboarding',
    question: 'What happens to my existing accounts receivable during transition?',
    answer:
      'We can continue working your existing AR or perform a dedicated AR cleanup project. We assess your aging buckets during onboarding and recommend the best approach to recover outstanding revenue.',
  },
  {
    category: 'Onboarding',
    question: 'How do you handle my historical billing data?',
    answer:
      'Your data remains yours. We work within your systems and never lock you out of your own records. If you ever leave, your data stays with you and we provide a clean transition.',
  },
  {
    category: 'Pricing',
    question: 'How is LeverageRCM priced?',
    answer:
      'Our pricing is typically based on a percentage of net collections, meaning we only get paid when you get paid. This aligns our incentives with yours — we succeed when you collect more. We provide transparent pricing during your free consultation.',
  },
  {
    category: 'Pricing',
    question: 'Are there any hidden fees or setup charges?',
    answer:
      'No. We believe in transparent pricing. Any fees are clearly communicated and agreed upon before we begin. There are no surprise charges or long-term lock-in contracts.',
  },
  {
    category: 'Pricing',
    question: 'Do you charge for denied claims work?',
    answer:
      'Denial management and appeals are included in our service. We do not charge extra for working denials — recovering your denied revenue is part of maximizing your collections.',
  },
  {
    category: 'Pricing',
    question: 'Is there a minimum contract length?',
    answer:
      'We offer flexible arrangements. While we recommend a reasonable initial period to see measurable results, we do not believe in locking clients into long contracts they cannot exit. We earn your business every month.',
  },
  {
    category: 'Compliance',
    question: 'Are you HIPAA compliant?',
    answer:
      'Yes. We follow HIPAA requirements across all our processes, access controls, and workforce training. Our team completes HIPAA training and we operate with secure, audited systems to protect patient information.',
  },
  {
    category: 'Compliance',
    question: 'How do you protect patient data?',
    answer:
      'We use encrypted access channels, role-based permissions, activity logging, and secure remote infrastructure. Patient data is accessed only by authorized personnel for billing purposes and is never stored outside your systems.',
  },
  {
    category: 'Compliance',
    question: 'Are your coders certified?',
    answer:
      'Yes. All our medical coders hold certifications from AAPC or AHIMA, including CPC, CCS, and specialty credentials. We maintain continuing education to stay current with code set changes and payer policies.',
  },
  {
    category: 'Compliance',
    question: 'Do you support audits and compliance reviews?',
    answer:
      'Yes. Our coding is audit-ready with full traceability. We support internal and external audits, provide documentation when requested, and help you address any findings.',
  },
  {
    category: 'Services',
    question: 'What is medical coding and why does it matter?',
    answer:
      'Medical coding translates clinical documentation into standardized codes (CPT, ICD-10, HCPCS) that payers use to determine reimbursement. Accurate coding is the foundation of clean claims — undercoding loses revenue, overcoding triggers audits, and incorrect coding causes denials.',
  },
  {
    category: 'Services',
    question: 'What is prior authorization and why is it important?',
    answer:
      'Prior authorization is a payer requirement to approve certain procedures before they are performed. Without it, claims are denied and patients may be stuck with the bill. We manage the entire authorization process to keep procedures approved and your practice paid.',
  },
  {
    category: 'Services',
    question: 'What is denial management?',
    answer:
      'Denial management is the structured process of analyzing denied claims, identifying root causes, appealing where appropriate, and fixing upstream issues to prevent future denials. A strong denial program recovers revenue that would otherwise be written off.',
  },
  {
    category: 'Services',
    question: 'What are virtual medical assistant services?',
    answer:
      'Virtual medical assistants are trained remote professionals who handle scheduling, eligibility verification, prior authorization, chart preparation, patient communication, and back-office tasks — extending your team capacity without the cost of in-house hires.',
  },
  {
    category: 'Services',
    question: 'Can you handle both professional and facility billing?',
    answer:
      'Yes. We manage professional, facility, and technical component billing depending on your practice type and the services rendered. Our teams are trained on the correct billing for each component.',
  },
  {
    category: 'Reporting',
    question: 'What reports will I receive?',
    answer:
      'You receive monthly financial reports, AR aging summaries, denial trend analysis, and KPI dashboards. We tailor reporting to your needs and walk through results with you so you always understand your revenue performance.',
  },
  {
    category: 'Reporting',
    question: 'How often do we meet to review performance?',
    answer:
      'We schedule monthly performance reviews with your dedicated account manager and quarterly strategic reviews to identify opportunities for revenue growth and process improvement.',
  },
  {
    category: 'Reporting',
    question: 'Can I see my billing data in real time?',
    answer:
      'Yes. Because we work within your EHR and practice management system, you retain real-time visibility into your billing, claims, and payments at all times.',
  },
  {
    category: 'Support',
    question: 'Will I have a dedicated account manager?',
    answer:
      'Yes. Every client is assigned a dedicated account manager who understands your specialty, your payers, and your goals. They are your primary point of contact for any questions or concerns.',
  },
  {
    category: 'Support',
    question: 'What are your support hours?',
    answer:
      'We provide dedicated support during extended business hours and offer 24/7 coverage options for larger practices and institutional clients. Your account manager is always reachable for urgent issues.',
  },
  {
    category: 'Support',
    question: 'How do I get started with LeverageRCM?',
    answer:
      'Simply request a free consultation through our contact form or call us. We will assess your current revenue cycle, identify opportunities for improvement, and provide a clear proposal — no obligation required.',
  },
];

export const faqCategories = ['All', 'General', 'Onboarding', 'Pricing', 'Compliance', 'Services', 'Reporting', 'Support'];
