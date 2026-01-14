import { motion } from 'motion/react';
import { Heart, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const footerLinks = {
  sections: [
    {
      title: 'Navigation',
      links: [
        { label: 'Projects', href: '#projects' },
        { label: 'Blog', href: '#blog' },
        { label: 'Skills', href: '#skills' },
        { label: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Social',
      links: [
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'Twitter', href: 'https://twitter.com' }
      ]
    }
  ],
  social: [
    { icon: Github, href: 'https://github.com' },
    { icon: Linkedin, href: 'https://linkedin.com' },
    // { icon: Twitter, href: 'https://twitter.com' }, 
    { icon: Mail, href: 'mailto:gadalsandesh123@gmail.com' }
  ]
};

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="relative border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/30">
                SG
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Sandesh Gadal
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed mb-4">
              Full-Stack Developer passionate about building innovative solutions with cutting-edge technology.
              Let's create something amazing together.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {footerLinks.sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by Sandesh Gadal
            </p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
    </footer>
  );
}
