import  { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Zap, X as CloseIcon } from "lucide-react";
import loopixLogo from '../../assets/images/loopix.jpeg';
import codeforchangeLogo from '../../assets/images/Copy of Codefest Shareable shridhi.png';
import CCS from '../../assets/images/Chitwan Computer Logo - 1.png';
import oxfordLogo from '../../assets/images/oxfordlogo.png';
import encryptixLogo from '../../assets/images/encryptixlogo.png';

type Experience = {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  logo?: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Backend Developer',
    company: 'Loopix Creations',
    period: 'May 2025 - Present',
    logo: loopixLogo,
    description: 'Working as a Backend Developer focusing on building scalable and secure backend systems and optimizing databases.',
    achievements: [
      'Designed and implemented RESTful APIs using Laravel',
      'Optimized MySQL database queries to improve performance',
      'Handled deployment and maintenance in hybrid environments'
    ]
  },
  {
    id: 2,
    title: 'Admin Lead',
    company: 'Code for Change',
    period: 'Jan 2025 - Present',
    logo: codeforchangeLogo,
    description: 'Leading administrative and organizational activities within the Code for Change community.',
    achievements: [
      'Organized and managed multiple workshops and tech programs',
      'Coordinated with team members and external collaborators',
      'Strengthened leadership and project management skills'
    ]
  },
  {
    id: 3,
    title: 'Backend Developer Intern',
    company: 'OCEM',
    period: 'Nov 2024 - Jan 2025',
    logo: oxfordLogo,
    description: 'Built responsive user interfaces and integrated frontend components with Laravel backend services.',
    achievements: [
      'Developed UI components using React.js and Tailwind CSS',
      'Improved website responsiveness and usability',
      'Followed version control best practices with GitLab'
    ]
  },
  {
    id: 4,
    title: 'General Member',
    company: 'Code for Change',
    period: 'Jan 2024 - Dec 2024',
    logo: codeforchangeLogo,
    description: 'Active community member contributing to technical learning and event organization.',
    achievements: [
      'Participated in community-driven projects',
      'Assisted in organizing workshops and events',
      'Collaborated with developers from diverse backgrounds'
    ]
  },
  {
    id: 5,
    title: 'Web Developer',
    company: 'Self-employed',
    period: 'Sep 2023 - Dec 2024',
    description: 'Worked independently delivering websites and web applications for various clients.',
    achievements: [
      'Built full-stack applications using Laravel and React',
      'Handled end-to-end project development and deployment',
      'Improved client communication and problem-solving'
    ]
  },
  {
    id: 6,
    title: 'Web Development Intern',
    company: 'Encryptix',
    period: 'Jul 2024 - Aug 2024',
    logo: encryptixLogo,
    description: 'Remote internship focused on core web development fundamentals and real-world implementation.',
    achievements: [
      'Worked with semantic HTML, CSS, and JavaScript',
      'Developed small web projects and UI components',
      'Gained hands-on experience in web design principles'
    ]
  },
  {
    id: 7,
    title: 'Computer Service Tech',
    company: 'Chitwan Computer',
    period: 'Feb 2021 - Jul 2023',
    logo: CCS,
    description: 'Provided technical support, hardware maintenance, and troubleshooting services.',
    achievements: [
      'Diagnosed and repaired hardware and software issues',
      'Installed and maintained operating systems',
      'Developed strong foundational IT skills'
    ]
  }
];

export function ExperienceSection() {
  const [active, setActive] = useState<Experience | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      setIsMobile(window.innerWidth < 768);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const getPinPos = (index: number) => {
    const total = experiences.length;
    if (isMobile) {
      const centerX = containerWidth / 2;
      const waveAmplitude = 60; 
      const x = centerX + (index % 2 === 0 ? -waveAmplitude  : waveAmplitude);
      const y = index * 150 + 50; 
      return { x, y };
    }
    const x = (containerWidth / (total + 1)) * (index + 1);
    const y = index % 2 === 0 ? 80 : 220;
    return { x, y };
  };

  const generatePath = () => {
    if (containerWidth === 0) return "";
    
    if (isMobile) {
      let path = `M ${containerWidth / 2} 0 `;
      experiences.forEach((_, i) => {
        const { x, y } = getPinPos(i);
        const prevY = i === 0 ? 0 : getPinPos(i - 1).y;
        const cp1y = prevY + (y - prevY) / 2;
        path += `C ${containerWidth / 2} ${cp1y}, ${x} ${cp1y}, ${x} ${y} `;
      });
      return path;
    }

    let path = `M 0 150 `;
    experiences.forEach((_, i) => {
      const { x, y } = getPinPos(i);
      const prevX = i === 0 ? 0 : getPinPos(i - 1).x;
      const cp1x = prevX + (x - prevX) / 2;
      path += `C ${cp1x} 150, ${cp1x} ${y}, ${x} ${y} `;
    });
    path += `H ${containerWidth}`;
    return path;
  };

  const ANIMATION_DURATION = 2.5;

  return (
    <section id="experience" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 md:mb-24">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20"
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">My Journey</span>
        </motion.div>
        <h2 className="text-4xl md:text-7xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Experience
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div 
          ref={containerRef} 
          className="relative w-full" 
          style={{ height: isMobile ? `${experiences.length * 150}px` : '350px' }}
        >
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            <motion.path
              d={generatePath()}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
            />
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>

          {experiences.map((exp, i) => {
            const { x, y } = getPinPos(i);
            const isLeft = i % 2 === 0;
            const pinDelay = (i / experiences.length) * ANIMATION_DURATION;

            return (
              <motion.div
                key={exp.id}
                className="absolute flex items-center justify-center"
                style={{ left: x, top: y, width: '60px', height: '0px', translateX: '-40px' }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                
                transition={{ 
                  delay: pinDelay, 
                  type: "spring", 
                  stiffness: 200,
                  damping: 20 
                }}
              >
                <motion.div
                  onMouseEnter={() => !isMobile && setActive(exp)}
                  onMouseLeave={() => !isMobile && setActive(null)}
                  onClick={(e) => {
                    if (isMobile) {
                      e.stopPropagation();
                      setActive(exp);
                    }
                  }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="relative z-10 w-14 h-14 rounded-full bg-gray-950 border-2 border-cyan-500 flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.2)] overflow-hidden"
                >
                  {exp.logo ? (
                    <img src={exp.logo} alt={exp.company} className="w-full h-full p-2 object-contain scale-150 bg-white" />
                  ) : (
                    <MapPin className="w-8 h-8 text-cyan-400" />
                  )}
                </motion.div>

                <div 
                  className={`absolute w-36 md:w-48 transition-all ${
                    isMobile 
                      ? (isLeft ? "left-20 text-left" : "right-20 text-right") 
                      : (i % 2 === 0 ? "bottom-9 text-center" : "top-10 text-center")
                  }`}
                >
                  <h4 className="text-white font-bold text-xs md:text-sm leading-tight">{exp.title}</h4>
                  <p className="text-cyan-400 text-[10px] font-medium mt-1 uppercase">{exp.company}</p>
                  <p className="text-white text-[10px] font-medium mt-1 uppercase">{exp.period}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={isMobile ? {
              position: 'fixed',
              bottom: '20px',
              left: '20px',
              right: '20px',
              zIndex: 9999
            } : {
              position: 'fixed',
              left: mousePos.x + 25,
              top: mousePos.y + 25,
              pointerEvents: 'none',
              zIndex: 9999
            }}
            className="p-6 bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl ring-1 ring-white/10"
          >
            {isMobile && (
              <button onClick={() => setActive(null)} className="absolute top-4 right-4 text-gray-400"><CloseIcon size={20}/></button>
            )}
            <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest block mb-2">{active.period}</span>
            <h3 className="text-xl font-bold text-white mb-1">{active.title}</h3>
            <p className="text-cyan-400 text-sm mb-4">{active.company}</p>
            <div className="space-y-2">
              {active.achievements.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                  <p className="text-[11px] text-gray-400 leading-relaxed italic">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}