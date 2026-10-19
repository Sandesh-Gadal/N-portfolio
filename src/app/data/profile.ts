import resumePdf from '../../assets/pdfs/CV-(sandesh-gadal) .pdf';

export const profile = {
  name: 'Sandesh Gadal',
  role: 'Backend & IoT engineer',
  location: 'Bharatpur, Chitwan, Nepal',
  timeZone: 'Asia/Kathmandu',
  email: 'gadalsandesh123@gmail.com',
  available: true,
  resume: resumePdf as string,
  links: {
    github: 'https://github.com/Sandesh-Gadal',
    linkedin: 'https://www.linkedin.com/in/sandesh-gadal-743560293',
    holopin: 'https://holopin.io/@sandeshgadal'
  }
} as const;
