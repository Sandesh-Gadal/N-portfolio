export type Role = {
  title: string;
  company: string;
  /** Human-readable period, e.g. "May 2025 — Present". Year-only ("2024 — 2025") is allowed. */
  period: string;
  /** Shown instead of the computed duration, e.g. "1 yr term". */
  term?: string;
  /** Optional mono tag, e.g. "Remote", "Community". */
  kind?: string;
  points: string[];
};

// Newest first.
export const experience: Role[] = [
  {
    title: 'Project Manager / Lead Developer',
    company: 'Hexa Labs',
    // TODO(sandesh): confirm start month ("about 6 months" as of Oct 2026).
    period: 'Apr 2026 — Present',
    points: [
      'Lead development of an automatic milk collection system',
      'Design how the milk analysers connect, and bring their readings into the system',
      'Own third-party integrations and run the project day to day'
    ]
  },
  {
    title: 'Backend Developer',
    company: 'Loopix Creations',
    period: 'May 2025 — Present',
    kind: 'Part-time',
    points: [
      'Architect an MIS platform end to end: system design, database schema and backend logic',
      'Build REST APIs in Laravel and tune slow MySQL queries',
      'Deploy and maintain services across hybrid hosting'
    ]
  },
  {
    title: 'Admin Lead',
    company: 'Code for Change',
    // TODO(sandesh): exact months of the 2024–25 term.
    period: '2024 — 2025',
    term: '1 yr term',
    kind: 'Community',
    points: [
      'Planned and ran logistics for workshops and tech programmes',
      'Coordinated volunteers and external partners'
    ]
  },
  {
    title: 'Backend Developer Intern',
    company: 'OCEM',
    period: 'Nov 2024 — Jan 2025',
    points: [
      'Built React and Tailwind UI components connected to Laravel services',
      'Improved the responsiveness of existing pages',
      'Shipped through a GitLab merge-request review flow'
    ]
  },
  {
    title: 'Web Developer',
    company: 'Self-employed',
    period: 'Sep 2023 — Dec 2024',
    kind: 'Freelance',
    points: [
      'Delivered Laravel and React sites for clients, from scoping to deployment',
      'Handled client communication through to handover'
    ]
  },
  {
    title: 'Web Development Intern',
    company: 'Encryptix',
    period: 'Jul 2024 — Aug 2024',
    kind: 'Remote',
    points: ['Built small projects and UI components in semantic HTML, CSS and JavaScript']
  },
  {
    title: 'General Member',
    company: 'Code for Change',
    period: 'Jan 2024 — Dec 2024',
    kind: 'Community',
    points: ['Contributed to community projects and helped run workshops']
  },
  {
    title: 'Computer Service Technician',
    company: 'Chitwan Computer',
    period: 'Feb 2021 — Jul 2023',
    points: [
      'Diagnosed and repaired hardware and software faults',
      'Installed and maintained operating systems for customers'
    ]
  }
];
