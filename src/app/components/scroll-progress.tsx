import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  // Using Framer Motion's useScroll is much more performant than manual event listeners
  const { scrollYProgress } = useScroll();

  // useSpring smooths the movement without the "lag" of CSS transitions
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-9999 origin-left"
      style={{
        scaleX,
        background: '#22d3ee',
        boxShadow: '0 0 8px rgba(34,211,238,0.6)'
      }}
    />
  );
}
