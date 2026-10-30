import type { TeamMember, TeamCategoryInfo } from "../types/team-member";

export const TEAM_CATEGORIES: readonly TeamCategoryInfo[] = [
  {
    id: "all",
    label: "All Specialists",
    index: "01",
  },
  {
    id: "technology",
    label: "Technology",
    index: "02",
  },
  {
    id: "clinical-research",
    label: "Clinical & Research",
    index: "03",
  },
  {
    id: "pharmaceutical",
    label: "Pharmaceutical",
    index: "04",
  },
  {
    id: "marketing",
    label: "Marketing",
    index: "05",
  },
] as const;

/**
 * 4 Founding Leadership & Executive Officers
 * Strictly ordered: CEO -> CTO -> Business (CBO) -> Marketing (CMO)
 */
export const LEADERSHIP_MEMBERS: readonly TeamMember[] = [
  // 1. CEO
  {
    id: "maryam-ebrahim",
    name: "Maryam Ebrahim",
    role: "Founder & CEO",
    category: "leadership",
    secondaryCategory: "clinical-research",
    initials: "ME",
    badgeId: "PID-EXE-01",
    photoUrl: "/team/MaryamEbrahim.jpg",
    bio: `Maryam conceived PulseID and leads it as CEO, having started as its clinical lead and as the researcher behind the original study. With a medical background, she works where clinical practice meets data.

Her research on a chronic disease with no recorded patient data, and her observations of unrecorded over-the-counter medication use during clinical rounds, showed her that missing records, not missing knowledge, hold back diagnosis and treatment in Egypt.

She now directs PulseID's product vision, clinical and data strategy, fundraising, and partnerships, leading a multidisciplinary team. Her work was recognized as Best Presentation at PASID 2026 and through PulseID's win at Startup Grind MNU.`,
    socials: {
      linkedin: "https://www.linkedin.com/in/maryam-ebrahim1",
    },
  },

  // 2. CTO
  {
    id: "mohamed-helmy",
    name: "Mohamed Helmy",
    role: "Co-founder & CTO",
    category: "leadership",
    secondaryCategory: "technology",
    initials: "MH",
    badgeId: "PID-EXE-02",
    photoUrl: "/team/MohamedHelmy.jpg",
    bio: `I lead the technical vision and oversee the development of the PulseID platform—an AI-powered, interoperable healthcare platform designed to enhance patient safety and revolutionize the delivery of healthcare services.

With a strong background in software engineering, cybersecurity, and scientific research, I combine technical expertise with an analytical, research-driven mindset, enabling me to tackle complex challenges and devise effective solutions.

I established and lead the technical team, driving product innovation and steering the platform’s evolution by developing new features and designing the technical solutions required to bring them to life. I also oversee system architecture, the integration of AI technologies, and key technical decision-making, ensuring that every solution contributes to building a smart, secure, and scalable healthcare ecosystem.`,
    socials: {
      linkedin: "https://www.linkedin.com/in/mohahelmy7?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  },

  // 3. Business (CBO)
  {
    id: "youssef-elgendy",
    name: "Youssef Elgendy",
    role: "Co-founder & CBO",
    category: "leadership",
    secondaryCategory: "marketing",
    initials: "YE",
    badgeId: "PID-EXE-03",
    photoUrl: "/team/YoussefElgendy.jpg",
    bio: `• Business Modeling & Strategy: Built the financial business model, strategic growth plan, and defined the commercial strategy and Go-to-Market (GTM) framework for PulseID across multiple targeted revenue streams.

• Partnership Framework: Designed the institutional partnership framework targeting pharmacies and insurance partners in the Delta region.

• Commercial Leadership & Strategic Alignment: Led core business development efforts and aligned institutional strategies to accelerate market penetration and support the project's long-term growth objectives.`,
    socials: {
      linkedin: "https://www.linkedin.com/in/youssef-elgendyy",
    },
  },

  // 4. Marketing (CMO)
  {
    id: "mahmoud-ibrahim",
    name: "Mahmoud Ibrahim",
    role: "Chief Marketing Officer",
    category: "leadership",
    secondaryCategory: "marketing",
    initials: "MI",
    badgeId: "PID-EXE-04",
    photoUrl: "/team/MahmoudIbrahim.jpg",
    bio: `• Defining PulseID's brand identity and building a compelling market presence.

• Driving marketing strategies, growth, and strategic partnerships.

• Turning innovative ideas into impactful stories that connect with people and create real value.`,
    socials: {
      linkedin: "https://www.linkedin.com/in/maibsa",
    },
  },
] as const;

/**
 * 14 Multidisciplinary Specialists (Technology, Pharma, Marketing, Clinical & Research)
 */
export const SPECIALIST_MEMBERS: readonly TeamMember[] = [
  // Technology
  {
    id: "ahmed-mohamed-albelasy",
    name: "Ahmed Mohamed Albelasy",
    role: "Backend Developer",
    category: "technology",
    initials: "AA",
    badgeId: "PID-ENG-01",
    bio: "Designing secure, high-concurrency healthcare data pipelines and backend microservices architecture.",
    socials: {
      linkedin: "https://www.linkedin.com/in/ahmed-mohamed-a08922a2?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  },
  {
    id: "mostafa-hussein",
    name: "Mostafa Hussein",
    role: "UI/UX Designer",
    category: "technology",
    initials: "MH",
    badgeId: "PID-DSN-02",
    bio: "Designing accessible, intuitive clinical workflows and human-centered healthcare interfaces.",
    socials: {
      linkedin: "https://www.linkedin.com/in/mostafa-hussein-b148a6287?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  },
  {
    id: "mohamed-mahrous",
    name: "Mohamed Mahrous",
    role: "Cybersecurity Specialist",
    category: "technology",
    initials: "MM",
    badgeId: "PID-SEC-03",
    bio: "Hardening healthcare infrastructure with end-to-end encryption and compliance-grade security protocols.",
    socials: {
      linkedin: "https://www.linkedin.com/in/mohamed-mahrous-134586256?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  },
  {
    id: "mohamed-mostafa-badr",
    name: "Mohamed Mostafa Badr",
    role: "AI Engineer",
    category: "technology",
    initials: "MB",
    badgeId: "PID-AIM-04",
    bio: "Developing predictive clinical models and intelligent diagnostic decision-support algorithms.",
    socials: {
      linkedin: "https://www.linkedin.com/in/mohamed-mostafa-badr-b10568264?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  },
  {
    id: "abdelrahman-ataa",
    name: "Abdelrahman Ataa",
    role: "Frontend Developer",
    category: "technology",
    initials: "AA",
    badgeId: "PID-ENG-05",
    bio: "Architecting responsive, high-performance web applications and interactive client experiences.",
    socials: {
      linkedin: "https://www.linkedin.com/in/abdelrahman-ataa-b557b8219/",
    },
  },

  // Pharmaceutical
  {
    id: "mahmoud-aun",
    name: "Mahmoud Aun",
    role: "Pharmaceutical Lead",
    category: "pharmaceutical",
    initials: "MA",
    badgeId: "PID-PHM-01",
    bio: "Overseeing pharmaceutical integration, drug interaction verification, and formulary accuracy across regional pharmacies.",
    socials: {},
  },

  // Marketing
  {
    id: "omar-hammam",
    name: "Omar Hammam",
    role: "Marketing Co-lead",
    category: "marketing",
    initials: "OH",
    badgeId: "PID-MKT-01",
    bio: "Leading community outreach, multi-channel growth campaigns, and ecosystem partner acquisition.",
    socials: {},
  },

  // Clinical & Research
  {
    id: "fatmaa-elsharawy",
    name: "Fatmaa Elsharawy",
    role: "Clinical Research Lead",
    category: "clinical-research",
    initials: "FE",
    badgeId: "PID-CLN-05",
    bio: "Directing primary clinical research methodologies, study protocols, and institutional research validation.",
    socials: {},
  },
  {
    id: "mohammed-hssan",
    name: "Mohammed Hssan",
    role: "Clinical Data Associate",
    category: "clinical-research",
    initials: "MH",
    badgeId: "PID-CLN-01",
    bio: "Curating and standardizing clinical trial data and longitudinal patient record taxonomies.",
    socials: {},
  },
  {
    id: "nada-askar",
    name: "Nada Askar",
    role: "Clinical Data Associate",
    category: "clinical-research",
    initials: "NA",
    badgeId: "PID-CLN-02",
    bio: "Conducting clinical data verification, medical nomenclature mapping, and protocol alignment.",
    socials: {},
  },
  {
    id: "arwa-reda",
    name: "Arwa Reda",
    role: "Clinical Data Associate",
    category: "clinical-research",
    initials: "AR",
    badgeId: "PID-CLN-03",
    bio: "Analyzing patient cohort data and ensuring clinical records interoperability standards.",
    socials: {},
  },
  {
    id: "amira-alaa",
    name: "Amira Alaa",
    role: "Clinical Data Associate",
    category: "clinical-research",
    initials: "AA",
    badgeId: "PID-CLN-04",
    bio: "Assisting in observational health studies and validating demographic clinical indices.",
    socials: {},
  },
  {
    id: "omar-ahmed",
    name: "Omar Ahmed",
    role: "Clinical Data Associate",
    category: "clinical-research",
    initials: "OA",
    badgeId: "PID-CLN-06",
    bio: "Supporting clinical data integrity checks, field trial assessments, and statistical logging.",
    socials: {},
  },
  {
    id: "abdalkarim",
    name: "Abdalkarim",
    role: "Clinical Data Associate",
    category: "clinical-research",
    initials: "AK",
    badgeId: "PID-CLN-07",
    bio: "Evaluating clinical feedback loops, data governance hygiene, and terminology accuracy.",
    socials: {},
  },
] as const;

/**
 * Combined Team Roster (18 Members Total)
 */
export const TEAM_MEMBERS: readonly TeamMember[] = [
  ...LEADERSHIP_MEMBERS,
  ...SPECIALIST_MEMBERS,
] as const;
