import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Cpu, Globe, Database, 
  Layers, Terminal, Zap, Fingerprint 
} from "lucide-react";

type PreloaderProps = {
  onFinish: () => void;
};

// Icons representing your tech stack
const TECH_ICONS = [
  { Icon: Code2, color: "text-cyan-400" },
  { Icon: Terminal, color: "text-purple-400" },
  { Icon: Cpu, color: "text-pink-400" },
  { Icon: Database, color: "text-blue-500" },
  { Icon: Globe, color: "text-emerald-400" },
  { Icon: Layers, color: "text-orange-400" },
  { Icon: Zap, color: "text-yellow-400" },
];

export default function Preloader({ onFinish }: PreloaderProps) {
  const [phase, setPhase] = useState<"bombarding" | "collapsing" | "expanding">("bombarding");

  useEffect(() => {
    // 1. Bombard with icons
    const timer1 = setTimeout(() => setPhase("collapsing"), 2500);
    // 2. Collapse/Charge up
    const timer2 = setTimeout(() => setPhase("expanding"), 3500);
    // 3. Final expansion and exit
    const timer3 = setTimeout(() => onFinish(), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 bg-gray-950 flex items-center justify-center z-[100] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* 1. Bombarding Icons */}
      <AnimatePresence>
        {phase === "bombarding" && (
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => {
              const { Icon, color } = TECH_ICONS[i % TECH_ICONS.length];
              return (
                <motion.div
                  key={i}
                  initial={{ 
                    x: (Math.random() - 0.5) * 1500, 
                    y: (Math.random() - 0.5) * 1500,
                    opacity: 0,
                    scale: 0.5,
                    rotate: 0
                  }}
                  animate={{ 
                    x: 0, 
                    y: 0, 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0.2],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity, 
                    delay: i * 0.15,
                    ease: "circIn"
                  }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${color}`}
                >
                  <Icon size={40} strokeWidth={1.5} className="drop-shadow-[0_0_10px_currentColor]" />
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* 2. The Core / Reaction Chamber */}
      <motion.div
        animate={
          phase === "collapsing" 
            ? { scale: [1, 0.8, 1.5], rotate: 180 } 
            : phase === "expanding" 
            ? { scale: 5, opacity: 0 } 
            : { scale: 1 }
        }
        transition={{ 
          duration: phase === "expanding" ? 0.8 : 0.5, 
          ease: "easeInOut" 
        }}
        className="relative flex items-center justify-center"
      >
        {/* Glowing Rings */}
        <div className="absolute w-32 h-32 border border-cyan-500/30 rounded-full animate-ping" />
        <div className="absolute w-24 h-24 border-2 border-purple-500/50 rounded-full animate-spin-slow" />
        
        {/* Central Icon */}
        <div className="relative p-6 bg-gray-900 rounded-2xl border border-white/10 shadow-2xl">
          <Fingerprint className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        </div>
      </motion.div>

      {/* 3. Status Terminal Text */}
      <div className="absolute bottom-20 flex flex-col items-center">
        <motion.div 
          className="font-mono text-xs tracking-[0.4em] uppercase text-gray-500"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {phase === "bombarding" && "Injecting Dependencies..."}
          {phase === "collapsing" && "Compiling Core Assets..."}
          {phase === "expanding" && "System Initialized"}
        </motion.div>
        
        {/* Loading Bar (Bottom) */}
        <div className="w-48 h-[2px] bg-gray-800 mt-4 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "linear" }}
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}} />
    </motion.div>
  );
}