export type Article = {
  title: string;
  /** Short subject tag shown on the card cover, e.g. "Linux". */
  topic: string;
  summary: string;
  publication: string;
  /** ISO date (YYYY-MM-DD) — formatted at render time. */
  date: string;
  readingMinutes: number;
  url: string;
};

// Newest first.
export const writing: Article[] = [
  {
    title: 'Essential Linux commands for beginners',
    topic: 'Linux',
    summary: 'The handful of terminal commands a new Linux user actually needs, and what each one does.',
    publication: 'BOSC Nepal',
    date: '2025-10-25',
    readingMinutes: 6,
    url: 'https://bosc.org.np/blogs/basic-linux-commands/'
  }
];
