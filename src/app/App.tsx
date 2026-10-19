import { MotionConfig } from 'motion/react';
import { Navbar } from './components/navbar';
import { HeroSection } from './components/hero-section';
import { ProjectsSection } from './components/projects-section';
import { ExperienceSection } from './components/experience-section';
import { SkillsSection } from './components/skills-section';
import { WritingSection } from './components/writing-section';
import { AboutSection } from './components/about-section';
import { ContactSection } from './components/contact-section';
import { Footer } from './components/footer';

// Section order is the page order. Section numbers ("01", "02"…) live in each
// component; renumber them if you reorder here.
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main id="main">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <WritingSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </MotionConfig>
  );
}
