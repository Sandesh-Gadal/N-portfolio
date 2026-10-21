export type Faq = { q: string; a: string };

// Rendered in the FAQ section AND mirrored in index.html (FAQPage JSON-LD + the no-JS fallback).
// Change all three together, or search engines see answers that aren't on the page.
export const faq: Faq[] = [
  {
    q: 'What kind of work do you take on?',
    a: "Backend work in Laravel and MySQL: schema design, REST APIs, slow-query fixes and deployment. I also connect physical devices to those backends; I've put milk analysers and NFC card readers into production systems. If you need a Laravel developer in Nepal whose backend has to take data from hardware, that's my strongest fit."
  },
  {
    q: 'Are you available for freelance, contract or full-time work?',
    a: "Yes, all three. I work remotely, or on-site if you're in Chitwan."
  },
  {
    q: 'What time zone do you work in?',
    a: 'Nepal Time, UTC+5:45. My afternoon overlaps the European morning: 14:00 in Bharatpur is 09:15 in Berlin in winter.'
  },
  {
    q: 'Can you connect hardware we already have to a web system?',
    a: "That's most of my current job at Hexa Labs. Send me the device model and how it outputs data, and I'll tell you what the integration involves."
  },
  {
    q: 'Do you only do backend?',
    a: 'Backend is my focus. I build the React front end too when a project needs one, as with the journal platform and the Chitwan Computer storefront.'
  }
];
