import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, MessageSquare, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState, useRef } from 'react'; // Added useRef
import { sendContactEmail } from '../services/mail.ts';

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/Sandesh-Gadal', color: 'hover:text-purple-400' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/sandesh-gadal/', color: 'hover:text-cyan-400' },
];

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null); // Reference for EmailJS
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    try {
      const result = await sendContactEmail(formRef.current);
      
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear state
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* ... Header remains the same ... */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Let's Connect</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            {/* Added ref={formRef} here */}
            <form 
              ref={formRef} 
              onSubmit={handleSubmit} 
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-xl space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <Input
                  id="name"
                  name="name" // Matches {{name}} in EmailJS
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-gray-900/50 border-gray-700/50 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <Input
                  id="email"
                  name="email" // Matches {{email}} in EmailJS
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="bg-gray-900/50 border-gray-700/50 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <Textarea
                  id="message"
                  name="message" // Matches {{message}} in EmailJS
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-gray-900/50 border-gray-700/50 text-white resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === 'sending' || status === 'success'}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-cyan-500/30 transition-all"
              >
                {status === 'sending' ? (
                  "Sending..."
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Sent Successfully
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>

              {/* Success/Error Feedback */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-red-400 text-sm text-center"
                  >
                    Something went wrong. Please try again or email me directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* ... Contact Info Column remains the same ... */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-500">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:gadalsandesh123@gmail.com" className="text-white hover:text-cyan-400">
                    gadalsandesh123@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            {/* ... Social Links map ... */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-4 text-white">Connect on Social</h3>
              <div className="space-y-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/50 text-gray-400 ${social.color} transition-all group`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{social.name}</span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <p className="text-sm text-gray-400 mb-2">⚡ Quick Response</p>
              <p className="text-white font-medium">I typically respond within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}