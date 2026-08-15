import {
  FileText,
  Code2,
  BadgeCheck,
  ShieldCheck,
  ClipboardCheck,
  ReceiptText,
  TrendingUp,
  AlertTriangle,
  Headset,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceDetail {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  whyItMatters: string;
  benefits: string[];
  workflow: { step: string; detail: string }[];
  process: { title: string; detail: string }[];
  industries: string[];
  faqs: { q: string; a: string }[];
}

export const services: ServiceDetail[] = [
  {
    slug: 'medical-billing',
    title: 'Medical Billing',
    short: 'End-to-end claim submission, payment posting, and follow-up that maximizes collections.',
    description:
      'Our medical billing service covers the complete revenue cycle — from charge entry and claim submission to payment posting, denial resolution, and patient collections — so your practice captures every dollar earned.',
    icon: FileText,
    whyItMatters:
      'Inaccurate or delayed billing is the single largest cause of revenue leakage. A clean, timely billing workflow directly improves cash flow, reduces denials, and lets your clinicians focus on patient care instead of paperwork.',
    benefits: [
      'Higher first-pass claim acceptance rates',
      'Faster reimbursement and improved cash flow',
      'Reduced administrative burden on your front office',
      'Transparent reporting on every claim and payment',
      'Dedicated billing specialists for your specialty',
      'Lower overhead compared to in-house billing staff',
    ],
    workflow: [
      { step: 'Patient Registration', detail: 'Accurate demographic and insurance capture at the point of scheduling.' },
      { step: 'Charge Entry', detail: 'Coders translate the encounter into compliant charges with CPT, HCPCS, and ICD-10 codes.' },
      { step: 'Claim Scrubbing', detail: 'Automated and manual checks catch errors before submission to reduce denials.' },
      { step: 'Claim Submission', detail: 'Clean claims filed electronically to commercial, Medicare, and Medicaid payers.' },
      { step: 'Payment Posting', detail: 'Remittances are posted and reconciled against expected reimbursement.' },
      { step: 'Follow-Up & Appeals', detail: 'Unpaid or denied claims are worked aggressively through resolution and appeal.' },
    ],
    process: [
      { title: 'Onboarding', detail: 'We audit your current billing, set up clearinghouse connectivity, and migrate payer rules.' },
      { title: 'Daily Operations', detail: 'A dedicated team handles charge entry, submission, posting, and follow-up every business day.' },
      { title: 'Reporting', detail: 'You receive monthly financial reports, aging summaries, and KPI dashboards.' },
      { title: 'Optimization', detail: 'Quarterly reviews identify denial trends and process improvements to grow revenue.' },
    ],
    industries: [
      'Independent Physicians',
      'Medical Clinics',
      'Group Practices',
      'Hospitals',
      'Telehealth Providers',
      'Surgery Centers',
    ],
    faqs: [
      { q: 'Do you work with our existing EHR?', a: 'Yes. We integrate with all major EHR and practice management systems including Epic, Cerner, eClinicalWorks, Athena, Kareo, AdvancedMD, and others.' },
      { q: 'How quickly can you take over our billing?', a: 'Most practices are fully onboarded within 2–3 weeks, depending on EHR access and payer enrollment status.' },
      { q: 'Will we still control our revenue?', a: 'Absolutely. Funds are deposited directly into your bank account. We manage the workflow, you retain full control of your money.' },
    ],
  },
  {
    slug: 'medical-coding',
    title: 'Medical Coding',
    short: 'Certified coders deliver accurate CPT, ICD-10, and HCPCS coding that drives clean claims.',
    description:
      'Our AAPC and AHIMA certified coders translate clinical documentation into precise codes that reflect the true complexity of care — reducing denials, supporting compliance, and capturing full reimbursement.',
    icon: Code2,
    whyItMatters:
      'Coding accuracy is the foundation of revenue integrity. Undercoding loses money, overcoding triggers audits, and incorrect coding causes denials. Certified coders protect both your revenue and your compliance posture.',
    benefits: [
      'AAPC and AHIMA certified coding specialists',
      'Specialty-specific coding expertise',
      'Reduced coding-related denials and rework',
      'Improved documentation feedback to providers',
      'Audit-ready coding with full traceability',
      'Faster turnaround on chart coding',
    ],
    workflow: [
      { step: 'Chart Review', detail: 'Coders review provider documentation for each encounter.' },
      { step: 'Code Assignment', detail: 'CPT, ICD-10-CM, and HCPCS codes assigned per official guidelines.' },
      { step: 'Modifier Application', detail: 'Correct modifiers applied to reflect procedure circumstances.' },
      { step: 'QA Review', detail: 'Senior coders audit a sample of charts for accuracy and consistency.' },
      { step: 'Documentation Feedback', detail: 'Queries sent to providers when documentation is incomplete.' },
      { step: 'Reporting', detail: 'Productivity and accuracy metrics shared with your team.' },
    ],
    process: [
      { title: 'Specialty Alignment', detail: 'Coders are assigned based on your specialty and payer mix.' },
      { title: 'Guideline Updates', detail: 'Our team stays current with annual code set changes and payer policies.' },
      { title: 'Quality Assurance', detail: 'A layered QA process catches errors before claims are submitted.' },
      { title: 'Continuous Improvement', detail: 'Trend analysis drives provider education and documentation improvement.' },
    ],
    industries: [
      'Multi-Specialty Practices',
      'Hospitals',
      'Surgery Centers',
      'Telehealth Providers',
      'Behavioral Health Providers',
      'Radiology Groups',
    ],
    faqs: [
      { q: 'Are your coders certified?', a: 'Yes. All coders hold AAPC or AHIMA certifications including CPC, CCS, and specialty credentials.' },
      { q: 'Can you handle high-volume coding?', a: 'We scale teams to your volume, including surge support for backlogs and seasonal peaks.' },
      { q: 'How do you handle documentation gaps?', a: 'Coders generate compliant physician queries to clarify documentation before coding is finalized.' },
    ],
  },
  {
    slug: 'credentialing',
    title: 'Credentialing',
    short: 'Complete provider enrollment and credentialing that keeps your physicians in-network and billable.',
    description:
      'We manage the entire credentialing lifecycle — from CAQH profile setup and payer enrollment to re-credentialing and privileging — so your providers are verified, in-network, and ready to bill without interruption.',
    icon: BadgeCheck,
    whyItMatters:
      'A provider who is not credentialed with a payer cannot legally bill for services. Lapses in credentialing cause weeks of lost revenue, delayed onboarding of new physicians, and compliance risk. Proactive credentialing protects cash flow.',
    benefits: [
      'Faster payer enrollment and onboarding',
      'CAQH profile creation and maintenance',
      'Proactive re-credentialing reminders',
      'Reduced risk of billing interruptions',
      'Centralized credential tracking',
      'Hospital privileging support',
    ],
    workflow: [
      { step: 'Application', detail: 'We collect and prepare all provider credentials and supporting documents.' },
      { step: 'CAQH Setup', detail: 'CAQH ProView profile created and kept current.' },
      { step: 'Payer Submission', detail: 'Applications submitted to commercial, Medicare, and Medicaid payers.' },
      { step: 'Follow-Up', detail: 'We track each application and respond to payer requests promptly.' },
      { step: 'Approval', detail: 'Effective dates confirmed and communicated to your billing team.' },
      { step: 'Maintenance', detail: 'Re-credentialing scheduled before expiration to prevent gaps.' },
    ],
    process: [
      { title: 'Document Gathering', detail: 'Licenses, malpractice, board certifications, and work history collected securely.' },
      { title: 'Primary Source Verification', detail: 'All credentials verified at the source per payer and accreditation requirements.' },
      { title: 'Payer Management', detail: 'We maintain relationships with payer credentialing departments to expedite approvals.' },
      { title: 'Ongoing Monitoring', detail: 'Expiration tracking ensures no credential ever lapses unnoticed.' },
    ],
    industries: [
      'Independent Physicians',
      'Group Practices',
      'Hospitals',
      'Telehealth Providers',
      'Mental Health Providers',
      'Healthcare Organizations',
    ],
    faqs: [
      { q: 'How long does credentialing take?', a: 'Typical payer credentialing takes 60–120 days. We work to compress timelines wherever possible through complete applications and proactive follow-up.' },
      { q: 'Do you handle re-credentialing?', a: 'Yes. We track every expiration date and begin re-credentialing well in advance to prevent any gap in billable status.' },
      { q: 'Can you credential providers in multiple states?', a: 'Yes, we manage multi-state credentialing including telehealth cross-state enrollment.' },
    ],
  },
  {
    slug: 'eligibility-verification',
    title: 'Eligibility Verification',
    short: 'Real-time insurance verification that prevents claim denials before services are rendered.',
    description:
      'We verify patient insurance eligibility, benefits, copays, deductibles, and coverage details before the visit — catching issues early so patients understand their financial responsibility and your claims get paid.',
    icon: ShieldCheck,
    whyItMatters:
      'Up to 75% of claim denials stem from eligibility issues. Verifying coverage before the encounter catches inactive policies, wrong plan codes, and coverage gaps — dramatically reducing front-end denials and improving point-of-service collections.',
    benefits: [
      'Reduced eligibility-related claim denials',
      'Improved point-of-service collections',
      'Fewer surprise patient bills',
      'Accurate copay and deductible capture',
      'Verification completed before the visit',
      'Coverage for commercial, Medicare, and Medicaid',
    ],
    workflow: [
      { step: 'Patient Capture', detail: 'Scheduled patient list pulled for upcoming appointments.' },
      { step: 'Verification', detail: 'Insurance verified through payer portals, clearinghouse, or phone.' },
      { step: 'Benefit Detail', detail: 'Copay, deductible, coinsurance, and out-of-pocket maximums captured.' },
      { step: 'Flagging', detail: 'Coverage issues flagged for front desk before the patient arrives.' },
      { step: 'Patient Communication', detail: 'Patients informed of expected financial responsibility.' },
      { step: 'Documentation', detail: 'Verification recorded in the patient account for billing reference.' },
    ],
    process: [
      { title: 'Pre-Visit Verification', detail: 'All scheduled patients verified 48–72 hours before the appointment.' },
      { title: 'Issue Resolution', detail: 'Coverage problems communicated to your staff for patient outreach.' },
      { title: 'Same-Day Checks', detail: 'Walk-in and add-on patients verified in real time.' },
      { title: 'Reporting', detail: 'Denial trends from eligibility gaps analyzed and addressed.' },
    ],
    industries: [
      'Medical Clinics',
      'Independent Physicians',
      'Group Practices',
      'Telehealth Providers',
      'Urgent Care Centers',
      'Surgery Centers',
    ],
    faqs: [
      { q: 'How far in advance do you verify eligibility?', a: 'We verify 48–72 hours before scheduled appointments, with same-day verification for walk-ins and add-ons.' },
      { q: 'Can you verify Medicare and Medicaid?', a: 'Yes, along with all major commercial payers and marketplace plans.' },
      { q: 'What happens if a patient is uninsured?', a: 'We flag uninsured patients so your front desk can discuss self-pay options before the visit.' },
    ],
  },
  {
    slug: 'prior-authorization',
    title: 'Prior Authorization',
    short: 'Proactive prior authorization management that prevents delayed and denied care.',
    description:
      'We handle the entire prior authorization process — identifying requirements, submitting requests, tracking status, and appealing denials — so procedures are approved before they are performed and your practice is paid.',
    icon: ClipboardCheck,
    whyItMatters:
      'Prior authorizations are one of the most time-consuming and denial-prone steps in revenue cycle. Delays frustrate patients, disrupt schedules, and risk lost revenue. Expert authorization management keeps care moving and claims clean.',
    benefits: [
      'Fewer denied procedures due to missing authorization',
      'Faster turnaround on authorization requests',
      'Reduced administrative burden on clinical staff',
      'Proactive tracking of every authorization request',
      'Experienced appeal of denied authorizations',
      'Specialty-specific authorization expertise',
    ],
    workflow: [
      { step: 'Requirement Check', detail: 'Scheduled procedures reviewed against payer authorization rules.' },
      { step: 'Documentation', detail: 'Clinical notes and supporting documentation gathered for the request.' },
      { step: 'Submission', detail: 'Authorization request submitted to the payer through the correct channel.' },
      { step: 'Tracking', detail: 'Each request tracked with reference numbers and expected response dates.' },
      { step: 'Follow-Up', detail: 'Pending requests actively followed up to avoid delays.' },
      { step: 'Appeal', detail: 'Denied authorizations appealed with additional clinical justification.' },
    ],
    process: [
      { title: 'Rule Library', detail: 'We maintain current authorization rules for each payer and procedure.' },
      { title: 'Submission', detail: 'Requests submitted via portal, fax, or phone per payer preference.' },
      { title: 'Status Management', detail: 'A dedicated tracker ensures no request is lost or forgotten.' },
      { title: 'Escalation', detail: 'Urgent requests escalated for peer-to-peer review when needed.' },
    ],
    industries: [
      'Surgery Centers',
      'Hospitals',
      'Radiology Groups',
      'Pain Management Practices',
      'Oncology Practices',
      'Orthopaedic Practices',
    ],
    faqs: [
      { q: 'How quickly can you submit an authorization?', a: 'Routine requests are submitted within 24 hours; urgent requests are submitted the same day.' },
      { q: 'What if the payer denies the authorization?', a: 'We initiate the appeal process immediately with additional clinical documentation and, when appropriate, request peer-to-peer review.' },
      { q: 'Do you handle retro-authorizations?', a: 'Yes, we pursue retro-authorization for services already rendered when medically necessary.' },
    ],
  },
  {
    slug: 'payment-posting',
    title: 'Payment Posting',
    short: 'Accurate remittance posting and reconciliation that keeps your books and AR in perfect shape.',
    description:
      'We post payments from ERAs, EOBs, and patient payments with precision — reconciling every remittance against expected reimbursement, identifying short-pays and denials, and keeping your accounts receivable accurate and actionable.',
    icon: ReceiptText,
    whyItMatters:
      'Payment posting is the backbone of accurate AR. Misposted payments distort your financial picture, hide denials, and create phantom balances. Accurate posting ensures your AR aging reflects reality and every discrepancy is investigated.',
    benefits: [
      'Accurate, same-day payment posting',
      'Reconciliation against expected reimbursement',
      'Early identification of denials and short-pays',
      'Clean AR aging for better follow-up',
      'Patient payment posting and balance billing',
      'Reduced write-offs from posting errors',
    ],
    workflow: [
      { step: 'Remittance Receipt', detail: 'ERAs and EOBs downloaded from clearinghouse and payer portals.' },
      { step: 'Posting', detail: 'Payments, adjustments, and denials posted to the correct patient accounts.' },
      { step: 'Reconciliation', detail: 'Posted amounts reconciled against expected reimbursement schedules.' },
      { step: 'Discrepancy Flagging', detail: 'Short-pays, denials, and unexpected adjustments flagged for review.' },
      { step: 'Patient Payments', detail: 'Patient payments posted and balances updated for statements.' },
      { step: 'Reporting', detail: 'Daily posting reports shared with your team.' },
    ],
    process: [
      { title: 'ERA Automation', detail: 'Automated ERA posting for speed and accuracy on high-volume payers.' },
      { title: 'Manual Review', detail: 'Complex remittances and paper EOBs handled by experienced posters.' },
      { title: 'Reconciliation', detail: 'Every deposit reconciled to the penny against posted payments.' },
      { title: 'Exception Handling', detail: 'Discrepancies routed to the denial team for immediate action.' },
    ],
    industries: [
      'Hospitals',
      'Group Practices',
      'Medical Clinics',
      'Surgery Centers',
      'Telehealth Providers',
      'Multi-Specialty Practices',
    ],
    faqs: [
      { q: 'Do you post paper EOBs as well as ERAs?', a: 'Yes. While ERAs are posted automatically, our team also handles paper EOBs and manual posting scenarios.' },
      { q: 'How quickly are payments posted?', a: 'Most payments are posted the same business day they are received.' },
      { q: 'Can you reconcile to our bank deposits?', a: 'Yes, we reconcile posted payments against bank deposits to ensure complete accuracy.' },
    ],
  },
  {
    slug: 'accounts-receivable-management',
    title: 'Accounts Receivable (AR) Management',
    short: 'Aggressive AR follow-up and aging management that recovers revenue you have earned.',
    description:
      'We actively manage your accounts receivable — working aging buckets, following up on unpaid claims, resolving payer disputes, and recovering revenue that would otherwise be written off. Our goal is to keep your days in AR low and your collections high.',
    icon: TrendingUp,
    whyItMatters:
      'Unworked AR is the silent killer of practice revenue. Claims that sit in aging buckets past 90 days become increasingly difficult to collect. Proactive AR management recovers thousands of dollars that practices lose to write-offs every year.',
    benefits: [
      'Lower days in AR',
      'Higher net collection rate',
      'Reduced write-offs and bad debt',
      'Aggressive follow-up on aging claims',
      'Payer-specific dispute resolution',
      'Clean AR aging reports',
    ],
    workflow: [
      { step: 'AR Analysis', detail: 'Aging buckets reviewed to prioritize highest-value claims.' },
      { step: 'Claim Follow-Up', detail: 'Each unpaid claim followed up with the payer via portal or phone.' },
      { step: 'Dispute Resolution', detail: 'Denials and short-pays investigated and appealed.' },
      { step: 'Patient AR', detail: 'Patient balances worked with statements, calls, and payment plans.' },
      { step: 'Write-Off Review', detail: 'Write-offs reviewed and approved before any balance is removed.' },
      { step: 'Reporting', detail: 'AR aging and recovery reports shared monthly.' },
    ],
    process: [
      { title: 'Aging Prioritization', detail: 'We focus on the buckets with the highest recovery potential.' },
      { title: 'Payer Follow-Up', detail: 'Every claim over 30 days is actively worked to resolution.' },
      { title: 'Denial Handoff', detail: 'Denials identified during AR work are routed to the denial team.' },
      { title: 'Recovery Reporting', detail: 'Recovered dollars tracked and reported so you see the ROI.' },
    ],
    industries: [
      'Hospitals',
      'Group Practices',
      'Independent Physicians',
      'Surgery Centers',
      'Medical Clinics',
      'Healthcare Organizations',
    ],
    faqs: [
      { q: 'What is a healthy days-in-AR target?', a: 'Most practices should target under 35 days in AR. We work to bring elevated AR down and keep it low.' },
      { q: 'Can you clean up old, legacy AR?', a: 'Yes. We specialize in AR cleanup projects for backlog buckets that have not been worked.' },
      { q: 'How do you handle patient collections?', a: 'We use statements, friendly calls, and payment plan options, always maintaining a respectful patient experience.' },
    ],
  },
  {
    slug: 'denial-management',
    title: 'Denial Management',
    short: 'Root-cause denial analysis and aggressive appeals that recover denied revenue.',
    description:
      'We attack denials at the root — analyzing trends, correcting and appealing denied claims, and fixing the upstream issues that cause them. Our denial management turns denied revenue into collected revenue and prevents future denials.',
    icon: AlertTriangle,
    whyItMatters:
      'Denials are rising across the industry, with some practices seeing 15–20% of claims denied. Every denied claim is earned revenue at risk. A structured denial management program recovers that revenue and prevents the same denials from recurring.',
    benefits: [
      'Higher denial recovery rate',
      'Root-cause analysis of denial trends',
      'Faster appeal submission and resolution',
      'Reduced future denials through process fixes',
      'Payer-specific denial expertise',
      'Detailed denial trending reports',
    ],
    workflow: [
      { step: 'Denial Capture', detail: 'All denials identified during posting and AR review.' },
      { step: 'Trend Analysis', detail: 'Denials categorized by payer, code, and reason to find patterns.' },
      { step: 'Root Cause', detail: 'Underlying causes identified — eligibility, coding, authorization, or registration.' },
      { step: 'Appeal', detail: 'Corrected claims and formal appeals submitted with supporting documentation.' },
      { step: 'Process Fix', detail: 'Upstream workflow corrected to prevent recurrence.' },
      { step: 'Reporting', detail: 'Denial rates and recovery tracked over time.' },
    ],
    process: [
      { title: 'Denial Triage', detail: 'Each denial assessed for appeal viability and timeline.' },
      { title: 'Appeal Drafting', detail: 'Appeals written with clinical and coding justification.' },
      { title: 'Payer Escalation', detail: 'Stuck appeals escalated through payer relationships.' },
      { title: 'Prevention', detail: 'Recurring denial reasons trigger workflow changes and staff education.' },
    ],
    industries: [
      'Hospitals',
      'Group Practices',
      'Surgery Centers',
      'Multi-Specialty Practices',
      'Telehealth Providers',
      'Healthcare Organizations',
    ],
    faqs: [
      { q: 'What percentage of denials can you recover?', a: 'While it varies by specialty and payer, our denial recovery program typically recovers a significant majority of appealable denials.' },
      { q: 'Do you handle both clinical and technical denials?', a: 'Yes. We manage coding denials, medical necessity denials, authorization denials, and registration or eligibility denials.' },
      { q: 'How do you prevent denials from recurring?', a: 'We analyze root causes and work with your team to correct the upstream processes causing repeat denials.' },
    ],
  },
  {
    slug: 'virtual-medical-assistant',
    title: 'Virtual Medical Assistant Services',
    short: 'Remote clinical and administrative support that extends your team without the overhead.',
    description:
      'Our virtual medical assistants handle scheduling, prior authorization, eligibility, chart prep, scribing, patient communication, and back-office tasks — giving your in-house team capacity to focus on patients while reducing staffing costs.',
    icon: Headset,
    whyItMatters:
      'Staffing shortages and rising labor costs strain every practice. Virtual assistants provide skilled, flexible support that scales with your volume — no benefits, no turnover headaches, and no office space required.',
    benefits: [
      'Lower staffing costs than in-house hires',
      'Trained healthcare support professionals',
      'Flexible hours including evenings and weekends',
      'Reduced front desk and back office burden',
      'HIPAA-trained remote workforce',
      'Scalable support that grows with your practice',
    ],
    workflow: [
      { step: 'Needs Assessment', detail: 'We map your workflow gaps and define the assistant scope of work.' },
      { step: 'Matching', detail: 'A trained assistant matched to your specialty and tools.' },
      { step: 'Onboarding', detail: 'Assistant trained on your EHR, protocols, and patient communication style.' },
      { step: 'Daily Support', detail: 'Assistant works your defined tasks during agreed hours.' },
      { step: 'Quality Monitoring', detail: 'Performance reviewed against agreed KPIs.' },
      { step: 'Scaling', detail: 'Add or adjust assistant hours as your needs change.' },
    ],
    process: [
      { title: 'Scope Definition', detail: 'We help you define exactly which tasks the assistant will own.' },
      { title: 'Secure Access', detail: 'HIPAA-compliant remote access to your systems configured.' },
      { title: 'Supervision', detail: 'Assistants are supervised by our team leads, not just left to self-manage.' },
      { title: 'Continuity', detail: 'Backup coverage ensures no gap if your primary assistant is unavailable.' },
    ],
    industries: [
      'Independent Physicians',
      'Medical Clinics',
      'Group Practices',
      'Telehealth Providers',
      'Mental Health Providers',
      'Multi-Specialty Practices',
    ],
    faqs: [
      { q: 'What tasks can a virtual medical assistant handle?', a: 'Scheduling, eligibility verification, prior authorization, chart prep, scribing, patient calls, referrals, and back-office documentation.' },
      { q: 'Are virtual assistants HIPAA-trained?', a: 'Yes. All assistants complete HIPAA training and work through secure, compliant access channels.' },
      { q: 'Can we start with just a few hours per week?', a: 'Yes. Support is fully flexible — start small and scale up as your needs grow.' },
    ],
  },
];

export const serviceSlugs = services.map((s) => s.slug);
