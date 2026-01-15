import { motion } from 'motion/react';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const blogs = [
  {
    id: 1,
    title: 'Essential Basic Commands for Beginners',
    excerpt: 'A beginner-friendly guide to essential Linux commands that every new user should know to navigate and work efficiently in the terminal.',
    category: 'Linux',
    readTime: '6 min read',
    date: 'Oct 25, 2025',
    featured: true,
    author: 'Sandesh Gadal',
    tags: ['Linux', 'Basic Commands', 'Beginner'],
    link: 'https://bosc.org.np/blogs/basic-linux-commands/'
  }
];


export function BlogSection() {
  return (
    <section id="blog" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Technical Insights</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Blog
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thoughts on technology, development, and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20">
                {/* Category & Featured Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {blog.category}
                  </span>
                  {blog.featured && (
                    <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/20">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors leading-tight">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 mb-6" />

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 group/btn"
                  >
                    <a href={blog.link} className='flex items-center' target="_blank" rel="noopener noreferrer">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                 </a>
                  </Button>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
