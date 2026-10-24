import journalShot from '../../assets/images/BLog.webp';
import attendanceShot from '../../assets/images/eattendance.webp';
import chitwanShot from '../../assets/images/chitwan-computer-live.webp';
import aabhaaShot from '../../assets/images/aaabhaa.webp';
import journalThumb from '../../assets/images/thumbs/BLog.webp';
import attendanceThumb from '../../assets/images/thumbs/eattendance.webp';
import chitwanThumb from '../../assets/images/thumbs/chitwan-computer-live.webp';
import aabhaaThumb from '../../assets/images/thumbs/aaabhaa.webp';

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
  /** Small copy of `image` (352px wide) for the work tabs. */
  thumb: string;
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
    thumb: aabhaaThumb,
    source: 'https://github.com/Sandesh-Gadal/Aabhaa'
  },
  {
    slug: 'digital-journal',
    accent: 'blue',
    title: 'Digital Journal Publication System',
    context: 'Oxford College · Shipped',
    summary:
      'Takes an academic journal online end to end: submission, peer review, editorial decisions and publication. Authors, reviewers and editors each see only their own step.',
    highlights: [
      'Built role-based workflows for authors, reviewers and editors',
      'Built the React front end on a Laravel and MySQL back end'
    ],
    stack: ['React', 'Laravel', 'MySQL', 'Tailwind CSS'],
    // Was live at blog.oxfordcollege.edu.np; down for maintenance as of Oct 2026. Restore `live` when it's back.
    image: journalShot,
    thumb: journalThumb
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
    thumb: attendanceThumb,
    source: 'https://github.com/Sandesh-Gadal/eAttendance'
  },
  {
    slug: 'chitwan-computer',
    accent: 'purple',
    title: 'Chitwan Computer',
    context: 'Client work',
    summary:
      'Storefront and product catalogue for Chitwan Computer, the shop where I started out repairing machines. The owners update products from an admin panel themselves.',
    highlights: [
      'Built a Laravel admin for products and site content, so routine updates need no developer',
      'Built the React landing and product listing pages'
    ],
    stack: ['React', 'Laravel', 'MySQL', 'REST', 'Tailwind CSS'],
    image: chitwanShot,
    thumb: chitwanThumb,
    live: 'https://chitwancomputer.com.np',
    // Repo is private or gone (404 as of Oct 2026); add `source` back if it's made public.
    preview: true
  }
];
