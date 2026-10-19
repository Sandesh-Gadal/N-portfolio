import journalShot from '../../assets/images/BLog.png';
import attendanceShot from '../../assets/images/eattendance.png';
import chitwanShot from '../../assets/images/chitwan-computer-live.jpg';
import aabhaaShot from '../../assets/images/aaabhaa.png';

export type Accent = 'blue' | 'orange' | 'green' | 'purple';

export type Project = {
  slug: string;
  /** Card color. Rotate so neighbours differ. */
  accent: Accent;
  title: string;
  /** Short context line shown in mono above the title, e.g. "Client work". */
  context: string;
  /** One sentence: what it is and who it's for. */
  summary: string;
  /** 2–3 concrete things you did or decided. No adjectives without evidence. */
  highlights: string[];
  stack: string[];
  image: string;
  live?: string;
  /** Offer an embedded live preview of `live` (only for sites that load and allow framing). */
  preview?: boolean;
  source?: string;
};

// Order is display order. Put the strongest work first.
export const projects: Project[] = [
  {
    slug: 'aabhaa',
    accent: 'green',
    title: 'Aabhaa',
    context: 'Product · Android',
    summary:
      'A farming assistant that puts local weather, crop recommendations and soil NPK readings in one app.',
    highlights: [
      'Built the Android client in Java, backed by a Laravel API and Firebase',
      'Combined a third-party weather feed with soil nutrient data to drive the recommendations'
    ],
    stack: ['Java', 'Android', 'Laravel', 'Firebase', 'REST'],
    image: aabhaaShot,
    source: 'https://github.com/Sandesh-Gadal/Aabhaa'
  },
  {
    slug: 'digital-journal',
    accent: 'blue',
    title: 'Digital Journal Publication System',
    context: 'Oxford College · In production',
    summary:
      'Takes an academic journal online end to end: submission, peer review, editorial decisions and publication.',
    highlights: [
      'Built role-based workflows for authors, reviewers and editors',
      'Built the React front end on a Laravel and MySQL back end'
    ],
    stack: ['React', 'Laravel', 'MySQL', 'Tailwind CSS'],
    image: journalShot,
    live: 'https://blog.oxfordcollege.edu.np'
  },
  {
    slug: 'e-attendance',
    accent: 'orange',
    title: 'NFC E-Attendance',
    context: 'Open source',
    summary:
      'Students tap an NFC card and attendance is recorded. Reports build themselves, so nobody fills in a register by hand.',
    highlights: [
      'Built a Laravel REST API that receives card reads and writes attendance to MySQL',
      'Automated per-class and per-student reports'
    ],
    stack: ['Laravel', 'MySQL', 'NFC', 'REST', 'Bootstrap'],
    image: attendanceShot,
    source: 'https://github.com/Sandesh-Gadal/eAttendance'
  },
  {
    slug: 'chitwan-computer',
    accent: 'purple',
    title: 'Chitwan Computer',
    context: 'Client work',
    summary:
      'Storefront and product catalogue for a local computer shop, with an admin panel the owners use to update products themselves.',
    highlights: [
      'Built a Laravel admin for products and site content, so routine updates need no developer',
      'Built the React landing and product listing pages'
    ],
    stack: ['React', 'Laravel', 'MySQL', 'REST', 'Tailwind CSS'],
    image: chitwanShot,
    live: 'https://chitwancomputer.com.np',
    preview: true,
    source: 'https://github.com/Sandesh-Gadal/chitwan-computer-website'
  }
];
