import { useState, useEffect } from 'react';
import { ParticlesBackground } from './components/particles-background';
import { Navbar } from './components/navbar';
import { HeroSection } from './components/hero-section';
import { ProjectsSection } from './components/projects-section';
import { BlogSection } from './components/blog-section';
import { SkillsSection } from './components/skills-section';
import { ExperienceSection } from './components/experience-section';
import { AboutSection } from './components/about-section';
import { ContactSection } from './components/contact-section';
import { Footer } from './components/footer';
import { ScrollProgress } from './components/scroll-progress';
import Preloader from './components/preloader';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'neon'>('dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Apply theme classes to document
    document.documentElement.classList.remove('theme-dark', 'theme-light', 'theme-neon');
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div id="home" className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticlesBackground />

      

      <AnimatePresence>

        {loading && <Preloader onFinish={() => setLoading(false)} />}
      </AnimatePresence>

        {!loading && (
           <>
                {/* Navigation */}
      {/* Scroll Progress */}
      <ScrollProgress />         
      <Navbar theme={theme} onThemeChange={setTheme} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <BlogSection />
        <SkillsSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
      </>
        )}

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}