import { motion } from 'motion/react';
import { ExternalLink, Github, Code2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import p1 from '../../assets/images/BLog.png';
import p2 from '../../assets/images/eattendance.png';
import p3 from '../../assets/images/ccs.png';
import p4 from '../../assets/images/aaabhaa.png';

const projects = [
  {
    id: 1,
    title: 'Digital Journal Publication System',
    description: 'A comprehensive platform designed to digitalize the academic lifecycle, from initial article submission and peer review to final online publication.',
    image: p1, // Updated to a library/writing theme
    tech: ['React', 'Laravel', 'MySQL', 'Tailwind CSS'],
    github: 'https://blog.oxfordcollege.edu.np', // Replace with your repo link
    demo: 'https://blog.oxfordcollege.edu.np',
    featured: false
  },
  {
    id: 2,
  title: 'NFC-Based E-Attendance System',
  description: 'NFC card–based attendance system built with Laravel and MySQL for accurate tracking and automated report generation.',
  image: p2,
  tech: ['Laravel', 'MySQL', 'NFC', 'REST API', 'Bootstrap'],
  github: 'https://github.com/Sandesh-Gadal/eAttendance',
  demo: 'https://github.com/Sandesh-Gadal/eAttendance',
  featured: false

  },
  {
  id: 3,
  title: 'Chitwan Computer Website',
  description: 'Business website for Chitwan Computer with a modern landing page, product listing, and a Laravel-based admin panel for managing products and content.',
  image: p3,
  tech: ['React', 'Laravel', 'MySQL', 'REST API', 'Tailwind CSS'],
  github: 'https://github.com/Sandesh-Gadal/chitwan-computer-website',
  demo: 'https://chitwancomputer.com',
  featured: false
},
{
  id: 4,
  title: 'Aabhaa – Smart Agricultural Assistant',
  description: 'Mobile-based agricultural application providing real-time weather updates, crop recommendations, and soil NPK data analysis to support data-driven farming decisions.',
  image: p4,
  tech: ['Java (Android)', 'Firebase', 'Laravel', 'Weather API', 'REST API'],
  github: 'https://github.com/Sandesh-Gadal/Aabhaa',
  demo: 'https://aabhaa.app',
  featured: true
},



];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Featured Work</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Innovative solutions built with cutting-edge technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/90 to-purple-500/90 backdrop-blur-sm">
                      <Sparkles className="w-3 h-3" />
                      <span className="text-xs font-medium">Featured</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500/30 hover:border-purple-500/50 bg-purple-500/5 hover:bg-purple-500/10 text-purple-400 hover:text-purple-300 flex items-center gap-2"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 flex items-center gap-2"
                      onClick={() => window.open(project.demo, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </Button>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
