import { motion } from 'motion/react';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

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
          className="mb-16"
        >
          <div className="eyebrow mb-4">// 02 — Technical Insights</div>
          <h2 className="heading-xl mb-4">Blog</h2>
          <p className="text-lg text-slate-400 max-w-2xl">
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
              <div className="panel-interactive h-full p-8">
                {/* Category & Featured Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="tag">{blog.category}</span>
                  {blog.featured && (
                    <span className="tag bg-accent-soft border-accent-border text-accent">FEATURED</span>
                  )}
                  <div className="flex items-center gap-1 ml-auto text-slate-500 text-xs font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-accent transition-colors leading-tight">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-slate-500 hover:text-accent transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="h-px bg-white/10 mb-6" />

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>

                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors group/btn"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
