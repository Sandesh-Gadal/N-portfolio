import resumePdf from '../../assets/pdfs/CV-(sandesh-gadal) .pdf';

export const profile = {
  name: 'Sandesh Gadal',
  role: 'Backend & IoT engineer',
  location: 'Bharatpur, Chitwan, Nepal',
  timeZone: 'Asia/Kathmandu',
  // Joined at runtime so the address isn't a plain string in the HTML or JS for scrapers to harvest.
  // Components show it only after a click (copy / open in mail app); never render it during SSR.
  email: ['gadalsandesh123', 'gmail.com'].join('@'),
  available: true,
  resume: resumePdf as string,
  links: {
    github: 'https://github.com/Sandesh-Gadal',
    linkedin: 'https://www.linkedin.com/in/sandesh-gadal-743560293',
    holopin: 'https://holopin.io/@sandeshgadal'
  }
} as const;
