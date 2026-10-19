import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

type PreloaderProps = {
  onFinish: () => void;
};

const BOOT_LINES = [
  '$ initializing_portfolio --env=production',
  '$ loading skills.sh ................. [OK]',
  '$ loading experience.sh ............. [OK]',
  '$ ready'
];

export function Preloader({ onFinish }: PreloaderProps) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      const finishTimer = setTimeout(onFinish, 400);
      return () => clearTimeout(finishTimer);
    }
    const timer = setTimeout(() => setLineIndex((i) => i + 1), 320);
    return () => clearTimeout(timer);
  }, [lineIndex, onFinish]);

  return (
    <motion.div
      className="fixed inset-0 bg-app-bg flex items-center justify-center z-100 px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="w-full max-w-md font-mono text-sm">
        <div className="space-y-2 mb-6 min-h-32">
          {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={i === BOOT_LINES.length - 1 ? 'text-accent' : 'text-slate-400'}
            >
              {line}
            </motion.p>
          ))}
        </div>
        <div className="h-px w-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min((lineIndex / BOOT_LINES.length) * 100, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Preloader;
