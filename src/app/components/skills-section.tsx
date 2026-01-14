import { motion } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Zap, Code, Database, Cloud, Brain, Shield } from 'lucide-react';

const skillsData = [
  { skill: 'Frontend', value: 95 },
  { skill: 'Backend', value: 90 },
  { skill: 'DevOps', value: 85 },
  { skill: 'AI/ML', value: 80 },
  { skill: 'Cloud', value: 88 },
  { skill: 'Security', value: 82 }
];

const techStack = [
  {
    category: 'Frontend',
    icon: Code,
    color: 'from-cyan-500 to-blue-500',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion']
  },
  {
    category: 'Backend',
    icon: Database,
    color: 'from-purple-500 to-pink-500',
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'GraphQL']
  },
  {
    category: 'DevOps',
    icon: Cloud,
    color: 'from-green-500 to-emerald-500',
    technologies: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'GitHub Actions']
  },
  {
    category: 'AI/ML',
    icon: Brain,
    color: 'from-orange-500 to-red-500',
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face', 'LangChain']
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Tech Stack</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Tools
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies I work with to build exceptional products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-8 text-center text-white">Skill Proficiency</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: '#9ca3af', fontSize: 14 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: '#6b7280' }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="#22d3ee"
                    fill="#22d3ee"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-1 gap-6">
            {techStack.map((stack, index) => {
              const Icon = stack.icon;
              return (
                <motion.div
                  key={stack.category}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-xl hover:border-green-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-green-500/10">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stack.color} shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold mb-3 text-white">{stack.category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {stack.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-green-500/30 hover:text-green-400 transition-all cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
