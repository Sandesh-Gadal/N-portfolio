import { motion } from 'motion/react';
import { User, Award, Download, MapPin, Coffee } from 'lucide-react';
import { Button } from './ui/button';
import pic from '../../assets/images/profile-pic.png';
import pdf from '../../assets/pdfs/CV-(sandesh-gadal) .pdf'

const achievements = [
  { label: 'Years Experience', value: '1+' },
  { label: 'Projects Completed', value: '10+' },
  { label: 'Open Source Contributions', value: '50+' },
  { label: 'Technical Articles', value: '10+' }
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
            <User className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">Get to Know Me</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8 p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-xl shadow-2xl">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-orange-900 to-yellow-400 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-5xl">
                    <img 
                    src={pic} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-xs font-medium flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Available for work
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center mb-2 text-white">Sandesh Gadal</h3>
              <p className="text-center text-gray-400 mb-6">Full-Stack Developer </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span className="text-sm">Bharatpur, Chitwan, Nepal</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Coffee className="w-4 h-4 text-orange-400" />
                  <span className="text-sm">Tech enthusiast & Coffee lover ☕</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
              <a href={pdf} download>Download Resume</a>
              </Button>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Bio */}
            <div className="px-8 pb-24 pt-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                <User className="w-6 h-6 text-orange-400" />
                Biography
              </h3>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  I'm a passionate full-stack developer with 1+ years of experience in building scalable web applications and backend systems. I have worked across projects from NFC-based attendance systems, multi-cloud platforms, to various web and mobile apps.
                </p>
                <p>
                  Skilled in Laravel, React.js, MySQL, REST APIs, and modern frontend/backend development. I have a strong foundation in database design, project planning, and DevOps practices, ensuring efficient and reliable solutions.
                </p>
                <p>
                  I enjoy collaborating on innovative projects, contributing to open-source, writing technical articles, and exploring emerging technologies to continuously grow my skills.
                </p>
              </div>
            </div>
</motion.div>
            {/* Achievements Grid */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-orange-400" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-500/5 to-yellow-500/5 border border-orange-500/20 hover:border-orange-500/40 transition-all"
                  >
                    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                      {achievement.value}
                    </div>
                    <div className="text-sm text-gray-400">{achievement.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Holopin Badges */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-xl lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-orange-400" />
                Holopin Badges
              </h3>
              <div className="flex justify-center">
                <img 
                  src="https://holopin.io/api/user/board?user=sandeshgadal" 
                  alt="Sandesh Gadal's Holopin Board" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          
        </div>
      </div>
    </section>
  );
}
