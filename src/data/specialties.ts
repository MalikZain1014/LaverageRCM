import {
  HeartPulse,
  Sparkles,
  Stethoscope,
  Activity,
  Brain,
  Scan,
  Bone,
  Pill,
  type LucideIcon,
} from 'lucide-react';

export interface SpecialtyDetail {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  billingChallenges: string[];
  howWeHelp: string[];
  codingExpertise: string[];
  claimsManagement: string[];
  revenueOptimization: string[];
  compliance: string[];
  faqs: { q: string; a: string }[];
}

export const specialties: SpecialtyDetail[] = [
  {
    slug: 'cardiology',
    name: 'Cardiology',
    short: 'Complex cardiovascular coding and claims management for high-value procedures.',
    icon: HeartPulse,
    billingChallenges: [
      'Complex procedure coding for catheterization and stenting',
      'Frequent use of multiple CPT modifiers',
      'High denial rates on interventional procedures',
      'Bundling rules under NCCI edits',
      'Device and supply reimbursement tracking',
    ],
    howWeHelp: [
      'Specialty-trained cardiology coders familiar with EP and interventional procedures',
      'Pre-submission scrubbing against NCCI edits and payer rules',
      'Aggressive appeal of denied interventional claims',
      'Device and supply cost reconciliation',
    ],
    codingExpertise: [
      '92920–92944 coronary intervention codes',
      '93450–93464 catheterization codes',
      '93600–93662 EP study codes',
      'Correct use of modifier 51, 59, and X{EPSU}',
    ],
    claimsManagement: [
      'Clean claim submission to Medicare and commercial payers',
      'Tracking of global periods and related procedures',
      'Denial management for medical necessity and bundling',
    ],
    revenueOptimization: [
      'Capture of all billable devices and supplies',
      'Accurate documentation feedback to providers',
      'AR follow-up on high-dollar interventional claims',
    ],
    compliance: [
      'NCCI edit compliance',
      'Medical necessity documentation aligned with LCDs and NCDs',
      'Audit-ready coding with full traceability',
    ],
    faqs: [
      { q: 'Do you handle both professional and facility cardiology billing?', a: 'Yes. We manage professional, facility, and technical component billing for cardiology practices and hospital cardiology departments.' },
      { q: 'Can you code EP studies and ablations?', a: 'Yes. Our coders are trained on the full range of electrophysiology codes and modifiers.' },
    ],
  },
  {
    slug: 'dermatology',
    name: 'Dermatology',
    short: 'Precise coding for medical and cosmetic dermatology with strong denial defense.',
    icon: Sparkles,
    billingChallenges: [
      'Distinguishing medical vs. cosmetic procedures',
      'Biopsy and destruction code selection',
      'Mohs surgery multi-stage coding',
      'High volume of patient responsibility balances',
    ],
    howWeHelp: [
      'Coders trained on dermatology-specific CPT and modifier rules',
      'Clear patient financial responsibility communication',
      'Accurate Mohs surgery and repair coding',
      'Strong appeal of cosmetic-denied claims with medical necessity support',
    ],
    codingExpertise: [
      '11102–11107 biopsy codes',
      '17000–17286 destruction codes',
      '17300–17304 Mohs surgery codes',
      '12001–13151 repair codes',
    ],
    claimsManagement: [
      'Pre-visit eligibility for high-deductible plans',
      'Clean claim submission with supporting photos when required',
      'Denial management for medical necessity',
    ],
    revenueOptimization: [
      'Point-of-service copay and deductible collection',
      'Accurate capture of all destruction and biopsy units',
      'Patient balance management with statements and payment plans',
    ],
    compliance: [
      'Clear documentation of medical necessity for borderline procedures',
      'Cosmetic procedure exclusion from insurance billing',
      'Audit-ready documentation',
    ],
    faqs: [
      { q: 'How do you handle cosmetic vs. medical billing?', a: 'We work with your providers to clearly document medical necessity and bill only covered services, collecting cosmetic services directly from patients.' },
      { q: 'Do you support Mohs surgery practices?', a: 'Yes. Our coders are trained on Mohs surgery staging and repair coding.' },
    ],
  },
  {
    slug: 'family-medicine',
    name: 'Family Medicine',
    short: 'Full-spectrum primary care billing from wellness visits to chronic care management.',
    icon: Stethoscope,
    billingChallenges: [
      'Mix of preventive and problem-oriented visits',
      'Chronic care management and principal illness billing',
      'Annual wellness visit documentation',
      'Transition of care management coding',
    ],
    howWeHelp: [
      'Accurate E/M coding with 2021 guidelines',
      'Capture of chronic care management revenue',
      'Wellness visit documentation support',
      'Care management billing for qualified patients',
    ],
    codingExpertise: [
      '99202–99215 office E/M codes',
      '99381–99397 preventive visit codes',
      '99490–99439 chronic care management codes',
      '99495–99496 transitional care management',
    ],
    claimsManagement: [
      'Preventive and problem visit bundling compliance',
      'Care management time documentation tracking',
      'Denial management for medical necessity',
    ],
    revenueOptimization: [
      'Capture of all care management revenue',
      'Wellness visit completion tracking',
      'Annual patient recall and gap closure',
    ],
    compliance: [
      'Time-based documentation for care management',
      'Medical necessity for high-level E/M visits',
      'Preventive visit coverage verification',
    ],
    faqs: [
      { q: 'Can you help us capture chronic care management revenue?', a: 'Yes. We identify eligible patients, support time documentation, and bill CCM codes correctly.' },
      { q: 'Do you handle Medicare annual wellness visits?', a: 'Yes, including the initial, subsequent, and IPPE visits.' },
    ],
  },
  {
    slug: 'internal-medicine',
    name: 'Internal Medicine',
    short: 'Specialized billing for internal medicine with complex chronic disease management.',
    icon: Activity,
    billingChallenges: [
      'Complex chronic disease management coding',
      'High-level E/M visit documentation',
      'Multiple comorbidity coding accuracy',
      'Prolonged service and time-based coding',
    ],
    howWeHelp: [
      'Accurate E/M coding reflecting visit complexity',
      'Hierarchical condition category coding support',
      'Prolonged service capture',
      'Comorbidity coding for risk adjustment',
    ],
    codingExpertise: [
      '99202–99215 office E/M codes',
      '99217–99226 inpatient E/M codes',
      '99417 prolonged service codes',
      'Chronic care and principal illness management codes',
    ],
    claimsManagement: [
      'Medical necessity documentation for high-level visits',
      'Time-based coding compliance',
      'Denial management for E/M downcoding',
    ],
    revenueOptimization: [
      'HCC-optimized diagnosis coding',
      'Capture of all time-based services',
      'Care management revenue identification',
    ],
    compliance: [
      'Time documentation for prolonged services',
      'Medical necessity for inpatient visits',
      'Audit-ready E/M documentation',
    ],
    faqs: [
      { q: 'Do you support risk adjustment coding?', a: 'Yes. We ensure all chronic conditions are captured and documented to support accurate HCC coding.' },
      { q: 'Can you handle inpatient internal medicine rounding?', a: 'Yes, including admission, subsequent, and discharge visit coding.' },
    ],
  },
  {
    slug: 'psychiatry',
    name: 'Psychiatry',
    short: 'Behavioral health billing expertise for psychiatry and mental health practices.',
    icon: Brain,
    billingChallenges: [
      'Behavioral health E/M vs. psychotherapy coding',
      'Time-based add-on code documentation',
      'High patient responsibility and out-of-network scenarios',
      'Frequent coverage verification challenges',
    ],
    howWeHelp: [
      'Behavioral health-specific coding expertise',
      'Accurate time-based add-on coding',
      'Out-of-network claim management',
      'Patient balance communication and payment plans',
    ],
    codingExpertise: [
      '90791–90792 psychiatric diagnostic codes',
      '90832–90853 psychotherapy codes',
      '90863 pharmacologic management add-on',
      '99202–99215 E/M with psychotherapy add-ons',
    ],
    claimsManagement: [
      'Behavioral health benefit verification',
      'Out-of-network claim submission with single-case agreements',
      'Denial management for medical necessity',
    ],
    revenueOptimization: [
      'Capture of all billable time units',
      'Add-on code capture for medication management',
      'Patient collection support',
    ],
    compliance: [
      'Time documentation for psychotherapy codes',
      'Medical necessity for behavioral health visits',
      'Separate E/M and psychotherapy documentation',
    ],
    faqs: [
      { q: 'Do you handle out-of-network psychiatry billing?', a: 'Yes, including single-case agreements and patient balance management.' },
      { q: 'Can you code E/M with psychotherapy add-ons?', a: 'Yes. We ensure proper documentation supports both the E/M and add-on psychotherapy code.' },
    ],
  },
  {
    slug: 'radiology',
    name: 'Radiology',
    short: 'Professional and technical radiology billing with strong modifier management.',
    icon: Scan,
    billingChallenges: [
      'Professional vs. technical component billing',
      'High volume of imaging CPT codes',
      'Payer-specific imaging authorization requirements',
      'Bundling rules across imaging modalities',
    ],
    howWeHelp: [
      'Radiology-trained coders for all modalities',
      'Correct modifier 26 and TC application',
      'Imaging authorization management',
      'Bundling compliance across modalities',
    ],
    codingExpertise: [
      '70010–76499 diagnostic radiology codes',
      '70500–70577 CT codes',
      '70540–70559 MRI codes',
      '76000–76000 fluoroscopy codes',
    ],
    claimsManagement: [
      'Professional and technical component submission',
      'Imaging authorization verification',
      'Denial management for medical necessity',
    ],
    revenueOptimization: [
      'Capture of all contrast and technique charges',
      'Correct component billing for each payer',
      'AR follow-up on high-volume imaging claims',
    ],
    compliance: [
      'Modifier 26 and TC compliance',
      'Medical necessity aligned with imaging LCDs',
      'Contrast documentation support',
    ],
    faqs: [
      { q: 'Do you bill both professional and technical components?', a: 'Yes. We manage professional, technical, and global radiology billing per payer rules.' },
      { q: 'Can you handle high-volume imaging claims?', a: 'Yes. Our radiology team is built for high-volume, multi-modality billing.' },
    ],
  },
  {
    slug: 'orthopaedics',
    name: 'Orthopaedics',
    short: 'Surgical and procedural orthopaedic billing with global period expertise.',
    icon: Bone,
    billingChallenges: [
      'Surgical global period management',
      'Fracture care and casting code selection',
      'Multiple procedure and modifier rules',
      'Implant and device reimbursement',
    ],
    howWeHelp: [
      'Orthopaedic-trained surgical coders',
      'Global period and post-operative claim management',
      'Correct fracture and casting code selection',
      'Implant and device cost capture',
    ],
    codingExpertise: [
      '20000–29999 musculoskeletal procedure codes',
      '24500–24516 fracture care codes',
      'Modifier 51, 59, and 78 for surgical cases',
      'Global package and post-operative coding',
    ],
    claimsManagement: [
      'Surgical claim submission with correct modifiers',
      'Global period claim tracking',
      'Denial management for bundling and medical necessity',
    ],
    revenueOptimization: [
      'Implant and supply capture',
      'Global period revenue protection',
      'Post-operative visit documentation',
    ],
    compliance: [
      'NCCI edit compliance for surgical procedures',
      'Global period documentation',
      'Medical necessity for surgical intervention',
    ],
    faqs: [
      { q: 'Do you handle global surgical package billing?', a: 'Yes. We track global periods and manage post-operative claims correctly.' },
      { q: 'Can you capture implant costs?', a: 'Yes. We reconcile implant and device costs against reimbursement.' },
    ],
  },
  {
    slug: 'gastroenterology',
    name: 'Gastroenterology',
    short: 'Endoscopy and GI procedure billing with sedation and biopsy coding expertise.',
    icon: Pill,
    billingChallenges: [
      'Endoscopy and colonoscopy coding complexity',
      'Sedation and anesthesia coding',
      'Biopsy and polypectomy code selection',
      'Screening vs. diagnostic visit coding',
    ],
    howWeHelp: [
      'GI-trained coders for endoscopy procedures',
      'Correct screening vs. diagnostic coding',
      'Biopsy and polypectomy code accuracy',
      'Sedation coding compliance',
    ],
    codingExpertise: [
      '45300–45398 colonoscopy codes',
      '43200–43259 EGD codes',
      '45380–45385 polypectomy codes',
      '00740–00731 anesthesia codes for GI',
    ],
    claimsManagement: [
      'Screening vs. diagnostic claim submission',
      'Biopsy and pathology coordination',
      'Denial management for medical necessity',
    ],
    revenueOptimization: [
      'Capture of all biopsy and polypectomy procedures',
      'Sedation code capture',
      'Screening-to-diagnostic conversion handling',
    ],
    compliance: [
      'Screening vs. diagnostic documentation',
      'Medical necessity for endoscopy procedures',
      'Sedation documentation support',
    ],
    faqs: [
      { q: 'How do you handle screening-to-diagnostic colonoscopy conversion?', a: 'We correctly code the conversion and document the clinical findings that support diagnostic billing.' },
      { q: 'Do you coordinate with pathology billing?', a: 'Yes. We coordinate biopsy claims with pathology services to avoid duplicate billing.' },
    ],
  },
  {
    slug: 'neurology',
    name: 'Neurology',
    short: 'Neurology billing for EEG, EMG, and complex neurological procedures.',
    icon: Activity,
    billingChallenges: [
      'EEG and EMG procedure coding',
      'Nerve conduction study coding',
      'Botox injection coding and supply tracking',
      'Complex E/M for chronic neurological conditions',
    ],
    howWeHelp: [
      'Neurology-trained coders for diagnostic and therapeutic procedures',
      'Accurate nerve conduction and EMG coding',
      'Botox supply and injection tracking',
      'Chronic condition management coding',
    ],
    codingExpertise: [
      '95800–95836 EEG codes',
      '95860–95870 EMG codes',
      '95861–95863 nerve conduction codes',
      '64600–64612 chemodenervation codes',
    ],
    claimsManagement: [
      'Diagnostic procedure claim submission',
      'Botox supply reimbursement tracking',
      'Denial management for medical necessity',
    ],
    revenueOptimization: [
      'Capture of all diagnostic study units',
      'Botox supply cost recovery',
      'Chronic condition care management',
    ],
    compliance: [
      'Time and unit documentation for diagnostic studies',
      'Medical necessity for neurodiagnostic procedures',
      'Supply documentation for injectables',
    ],
    faqs: [
      { q: 'Do you handle Botox supply billing?', a: 'Yes. We track Botox units and supply costs for accurate reimbursement.' },
      { q: 'Can you code nerve conduction studies?', a: 'Yes. Our coders are trained on NCS and EMG coding.' },
    ],
  },
  {
    slug: 'pain-management',
    name: 'Pain Management',
    short: 'Interventional pain procedure billing with authorization and modifier expertise.',
    icon: Activity,
    billingChallenges: [
      'High prior authorization requirements',
      'Interventional procedure coding complexity',
      'Fluoroscopy and injection code bundling',
      'Multiple procedure and modifier rules',
    ],
    howWeHelp: [
      'Pain management-specific coding expertise',
      'Prior authorization management for injections',
      'Fluoroscopy and injection code accuracy',
      'Modifier compliance for multiple procedures',
    ],
    codingExpertise: [
      '62300–62328 epidural injection codes',
      '64400–64530 nerve block codes',
      '77002–77003 fluoroscopy codes',
      'Modifier 25, 50, and 59 for pain procedures',
    ],
    claimsManagement: [
      'Prior authorization for interventional procedures',
      'Injection claim submission with correct modifiers',
      'Denial management for medical necessity',
    ],
    revenueOptimization: [
      'Capture of all injection and fluoroscopy charges',
      'Authorization-driven scheduling',
      'AR follow-up on high-value procedures',
    ],
    compliance: [
      'Medical necessity for interventional procedures',
      'Fluoroscopy documentation',
      'Modifier compliance for bundled services',
    ],
    faqs: [
      { q: 'Do you manage prior authorizations for injections?', a: 'Yes. We handle the full authorization process for interventional pain procedures.' },
      { q: 'Can you code fluoroscopy with injections?', a: 'Yes. We correctly apply fluoroscopy codes with injection procedures.' },
    ],
  },
  {
    slug: 'urgent-care',
    name: 'Urgent Care',
    short: 'High-volume urgent care billing with rapid eligibility and same-day claims.',
    icon: Stethoscope,
    billingChallenges: [
      'High patient volume and rapid turnover',
      'Walk-in eligibility verification',
      'Mix of E/M levels and minor procedures',
      'Multiple payer plans per day',
    ],
    howWeHelp: [
      'Rapid eligibility verification for walk-ins',
      'Same-day claim submission',
      'E/M and minor procedure coding accuracy',
      'High-volume claim management',
    ],
    codingExpertise: [
      '99202–99215 E/M codes',
      'Simple repair and splinting codes',
      'S9088–S9098 urgent care-specific codes',
      'Modifier 25 for E/M with procedures',
    ],
    claimsManagement: [
      'Real-time eligibility for walk-in patients',
      'Same-day claim submission',
      'Denial management for E/M and procedure bundling',
    ],
    revenueOptimization: [
      'Point-of-service copay collection',
      'Capture of all minor procedures',
      'High-volume AR follow-up',
    ],
    compliance: [
      'Modifier 25 documentation for E/M with procedures',
      'Medical necessity for urgent care visits',
      'Urgent care place of service coding',
    ],
    faqs: [
      { q: 'Can you verify walk-in patients in real time?', a: 'Yes. We provide real-time eligibility checks for walk-in urgent care visits.' },
      { q: 'Do you handle high claim volumes?', a: 'Yes. Our urgent care team is built for high-volume, rapid-cycle billing.' },
    ],
  },
  {
    slug: 'pediatrics',
    name: 'Pediatrics',
    short: 'Pediatric billing from well-child visits to immunizations and chronic care.',
    icon: Stethoscope,
    billingChallenges: [
      'Well-child visit and immunization coding',
      'Vaccine supply and administration tracking',
      'Chronic pediatric condition management',
      'Parental financial responsibility communication',
    ],
    howWeHelp: [
      'Pediatric-specific coding for well and sick visits',
      'Vaccine product and administration capture',
      'Chronic condition management coding',
      'Family-friendly patient billing',
    ],
    codingExpertise: [
      '99381–99397 well-child codes',
      '90460–90474 immunization codes',
      'Modifier 25 for well visits with problems',
      'Chronic care management codes',
    ],
    claimsManagement: [
      'Immunization claim submission with product codes',
      'Well and sick visit bundling compliance',
      'Denial management for vaccine claims',
    ],
    revenueOptimization: [
      'Vaccine product and administration capture',
      'Well-child visit completion tracking',
      'Chronic condition care management',
    ],
    compliance: [
      'Vaccine documentation and tracking',
      'Modifier 25 for well visits with problems',
      'Immunization registry reporting support',
    ],
    faqs: [
      { q: 'Do you handle vaccine supply billing?', a: 'Yes. We capture both vaccine product and administration codes for full reimbursement.' },
      { q: 'Can you manage well and sick visit coding?', a: 'Yes, including correct modifier 25 application when problems are addressed at well visits.' },
    ],
  },
  {
    slug: 'primary-care',
    name: 'Primary Care',
    short: 'Primary care billing with preventive, chronic, and care management expertise.',
    icon: Stethoscope,
    billingChallenges: [
      'Preventive and problem visit mix',
      'Chronic care management capture',
      'Annual wellness visit completion',
      'Care coordination documentation',
    ],
    howWeHelp: [
      'Accurate E/M and preventive coding',
      'Chronic care management revenue capture',
      'Wellness visit documentation support',
      'Care coordination billing',
    ],
    codingExpertise: [
      '99202–99215 E/M codes',
      '99381–99397 preventive codes',
      '99490–99439 chronic care management',
      '99495–99496 transitional care management',
    ],
    claimsManagement: [
      'Preventive and problem visit compliance',
      'Care management time documentation',
      'Denial management for medical necessity',
    ],
    revenueOptimization: [
      'Chronic care management capture',
      'Wellness visit gap closure',
      'Annual patient recall',
    ],
    compliance: [
      'Time documentation for care management',
      'Medical necessity for high-level visits',
      'Preventive visit coverage verification',
    ],
    faqs: [
      { q: 'Can you help us capture care management revenue?', a: 'Yes. We identify eligible patients and bill care management codes correctly.' },
      { q: 'Do you handle Medicare wellness visits?', a: 'Yes, including initial, subsequent, and IPPE visits.' },
    ],
  },
  {
    slug: 'behavioral-health',
    name: 'Behavioral Health',
    short: 'Behavioral health billing for therapy, counseling, and mental health services.',
    icon: Brain,
    billingChallenges: [
      'Time-based therapy code documentation',
      'Behavioral health benefit verification',
      'Out-of-network and sliding scale scenarios',
      'High patient responsibility balances',
    ],
    howWeHelp: [
      'Behavioral health-specific coding',
      'Accurate time-based therapy coding',
      'Out-of-network claim management',
      'Compassionate patient collections',
    ],
    codingExpertise: [
      '90832–90853 psychotherapy codes',
      '90791–90792 diagnostic evaluation codes',
      '90863 medication management add-on',
      'H0001–H0015 behavioral health codes',
    ],
    claimsManagement: [
      'Behavioral health benefit verification',
      'Out-of-network claim submission',
      'Denial management for medical necessity',
    ],
    revenueOptimization: [
      'Capture of all billable time units',
      'Add-on code capture',
      'Patient balance management',
    ],
    compliance: [
      'Time documentation for therapy codes',
      'Medical necessity for behavioral health',
      'Separate E/M and therapy documentation',
    ],
    faqs: [
      { q: 'Do you handle out-of-network behavioral health billing?', a: 'Yes, including single-case agreements and patient balance management.' },
      { q: 'Can you code group and family therapy?', a: 'Yes. We code individual, group, and family therapy sessions correctly.' },
    ],
  },
  {
    slug: 'general-surgery',
    name: 'General Surgery',
    short: 'Surgical billing with global period, modifier, and implant expertise.',
    icon: Activity,
    billingChallenges: [
      'Surgical global period management',
      'Multiple procedure and modifier rules',
      'Implant and supply reimbursement',
      'Bundling under NCCI edits',
    ],
    howWeHelp: [
      'Surgical-trained coders',
      'Global period and post-operative management',
      'Implant and supply cost capture',
      'Modifier compliance for surgical cases',
    ],
    codingExpertise: [
      '40000–69999 digestive and surgical codes',
      'Modifier 51, 59, 78, and 79',
      'Global package coding',
      'Laparoscopic vs. open procedure coding',
    ],
    claimsManagement: [
      'Surgical claim submission with correct modifiers',
      'Global period claim tracking',
      'Denial management for bundling',
    ],
    revenueOptimization: [
      'Implant and supply capture',
      'Global period revenue protection',
      'AR follow-up on high-value surgical claims',
    ],
    compliance: [
      'NCCI edit compliance',
      'Global period documentation',
      'Medical necessity for surgical intervention',
    ],
    faqs: [
      { q: 'Do you handle global surgical packages?', a: 'Yes. We track global periods and manage post-operative claims correctly.' },
      { q: 'Can you capture implant costs?', a: 'Yes. We reconcile implant costs against reimbursement for surgical cases.' },
    ],
  },
];

export const specialtySlugs = specialties.map((s) => s.slug);
