import { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue
} from 'motion/react';
import {
  AppWindow,
  ArrowDown,
  ArrowUpRight,
  Code,
  Cpu,
  Database,
  Milk,
  Nfc,
  Server,
  Smartphone,
  type LucideIcon
} from 'lucide-react';
import { profile } from '../data/profile';
import { experience } from '../data/experience';
import { useGreeting, useLocalTime, useVisitCount } from '../lib/hooks';
import { Avatar } from './avatar';

// The three.js orb (./hero-orb.tsx) is kept but not rendered; lazy-import it into Stage to bring it back.

/** Entrance animation; none under reduced motion so content is there immediately. */
const riseFor = (reduced: boolean | null) => (delay: number) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const }
      };

const [current, partTime] = experience;

/** What the avatar says after the greeting, in turn. Every line is true and also in the data. */
const FACTS = [
  `Right now: leading the build at ${current.company}.`,
  "We're automating milk collection, from analyser to database.",
  `Part-time, I'm building an MIS platform for ${partTime.company}.`,
  'Before that: NFC attendance, a journal platform and a farming app.'
];

/**
 * Centred hero, one column: the animated portrait at the top, then the name, the headline,
 * the status line and the actions. On scroll the avatar sinks into the orb and the text fades.
 */
export function HeroSection() {
  const time = useLocalTime(profile.timeZone);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const rise = riseFor(reduced);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden">
      <Backdrop />
      <FloatingIcons progress={scrollYProgress} />
      <Corners time={time} />

      <div className="page relative flex flex-col items-center pb-16 pt-24 text-center md:min-h-svh md:justify-center md:pb-12 md:pt-24">
        <motion.div {...rise(0)} aria-hidden>
          <Stage progress={scrollYProgress} />
        </motion.div>

        <motion.div style={{ opacity: fade, y: textY }} className="flex flex-col items-center">
          <motion.h1 {...rise(0.1)} className="mt-6">
            <span className="display block text-[clamp(2.25rem,5.5vw,4rem)] leading-none">
              Sandesh Gadal<span className="text-signal">.</span>
            </span>
            <span className="mt-4 block max-w-xl text-balance text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium leading-snug text-muted-foreground">
              Full-stack developer, from the database to the{' '}
              <span className="font-display font-semibold italic text-signal-ink">device</span>.
            </span>
          </motion.h1>

          <motion.p {...rise(0.18)} className="tag mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {profile.available && (
              <span className="inline-flex items-center gap-2 text-foreground">
                <span className="led animate-pulse-led" aria-hidden /> Available for work
              </span>
            )}
            <span>Lead developer at {current.company}</span>
            <span className="md:hidden">
              Bharatpur, Nepal · <time>{time}</time> NPT
            </span>
          </motion.p>

          <motion.div {...rise(0.26)} className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="#work" className="key key-signal">
              See my work <ArrowDown className="size-4" aria-hidden />
            </a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="key key-plain">
              Résumé <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Background depth for the hero: a faint grid that fades out toward the edges. Decorative.
 */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_42%,black_25%,transparent_75%)]" />
    </div>
  );
}

/** Small tiles for things he builds, scattered in the hero's empty sides. */
const ICONS: { Icon: LucideIcon; x: number; y: number; depth: number; accent?: boolean }[] = [
  { Icon: Database, x: 21, y: 32, depth: 0.7 },
  { Icon: Server, x: 11, y: 48, depth: 1 },
  { Icon: AppWindow, x: 22, y: 61, depth: 0.8 },
  { Icon: Code, x: 12, y: 72, depth: 0.5 },
  { Icon: Cpu, x: 79, y: 32, depth: 0.8, accent: true },
  { Icon: Milk, x: 89, y: 48, depth: 0.6, accent: true },
  { Icon: Nfc, x: 78, y: 61, depth: 1 },
  { Icon: Smartphone, x: 88, y: 72, depth: 0.5 }
];

/**
 * Floating icon tiles (lg and up) for what he builds: data, servers, interfaces, code,
 * chips, the milk analysers, NFC and Android. They bob gently, drift toward the pointer
 * and move at different speeds on scroll, by depth. Decorative.
 */
function FloatingIcons({ progress }: { progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, px, py]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {ICONS.map((item, i) => (
        <FloatingIcon key={i} {...item} index={i} sx={sx} sy={sy} progress={progress} reduced={Boolean(reduced)} />
      ))}
    </div>
  );
}

function FloatingIcon({
  Icon,
  x,
  y,
  depth,
  accent,
  index,
  sx,
  sy,
  progress,
  reduced
}: (typeof ICONS)[number] & {
  index: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const tx = useTransform(sx, (v) => (reduced ? 0 : v * -36 * depth));
  const ty = useTransform([sy, progress], ([v, p]: number[]) => (reduced ? 0 : v * -28 * depth - p * 220 * depth));

  return (
    <motion.div style={{ left: `${x}%`, top: `${y}%`, x: tx, y: ty }} className="absolute">
      <span
        className={`grid size-12 -translate-x-1/2 -translate-y-1/2 animate-float place-items-center rounded-2xl border bg-panel/80 ${
          accent ? 'border-signal/40 text-signal' : 'border-line-strong text-muted-foreground'
        }`}
        style={{ animationDelay: `${index * -0.7}s`, animationDuration: `${4 + (index % 3)}s` }}
      >
        <Icon className="size-5" strokeWidth={1.6} />
      </span>
    </motion.div>
  );
}

const cornerMark = 'before:absolute before:size-3 before:border-line-strong before:content-[""]';

/**
 * Viewfinder-style details in the four corners of the hero (md and up), each carrying real
 * information: current work, location and local time, a scroll cue, and the visit count.
 */
function Corners({ time }: { time: string }) {
  const visits = useVisitCount();

  return (
    <div className="page pointer-events-none absolute inset-x-0 bottom-8 top-24 hidden md:block">
      <div
        className={`${cornerMark} absolute left-4 top-0 max-w-56 pl-5 pt-4 text-left before:left-0 before:top-0 before:border-l before:border-t md:left-8`}
      >
        <p className="tag text-[10px]">Now building</p>
        <p className="mt-1 text-sm font-medium leading-snug">Automatic milk collection system</p>
        <p className="meta mt-1">{current.company}</p>
      </div>

      <div
        className={`${cornerMark} absolute right-4 top-0 pr-5 pt-4 text-right before:right-0 before:top-0 before:border-r before:border-t md:right-8`}
      >
        <p className="tag text-[10px]">Based in</p>
        <p className="mt-1 text-sm font-medium">Bharatpur, Nepal</p>
        <p className="meta mt-1">
          27.68°N 84.43°E · <time>{time}</time> NPT
        </p>
      </div>

      <a
        href="#work"
        className={`${cornerMark} pointer-events-auto absolute bottom-0 left-4 flex items-end gap-3 pb-4 pl-5 before:bottom-0 before:left-0 before:border-b before:border-l md:left-8`}
      >
        <span aria-hidden className="relative h-8 w-4 overflow-hidden rounded-full border border-line-strong">
          <span className="absolute left-1/2 top-1 size-1.5 -translate-x-1/2 animate-scroll-cue rounded-full bg-signal" />
        </span>
        <span className="tag text-[10px]">Scroll to explore</span>
      </a>

      {visits !== null && (
        <div
          className={`${cornerMark} absolute bottom-0 right-4 pb-4 pr-5 text-right before:bottom-0 before:right-0 before:border-b before:border-r md:right-8`}
        >
          <p className="tag text-[10px]">Visits so far</p>
          <p className="mt-1 font-mono text-lg font-medium text-signal">{visits.toLocaleString('en-US')}</p>
        </div>
      )}
    </div>
  );
}

/**
 * The portrait: the animated avatar (fading at the base) inside a slowly turning dashed ring,
 * with a thought bubble typing a greeting and real facts. Decorative; the facts are in the page copy.
 */
function Stage({ progress }: { progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const meY = useTransform(progress, [0, 1], [0, reduced ? 0 : 90]);
  const scale = useTransform(progress, [0, 1], [1, reduced ? 1 : 1.12]);
  const greeting = useGreeting();
  const lines = useMemo(() => [greeting, ...FACTS], [greeting]);
  const line = useTypewriter(lines, Boolean(reduced));

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        style={{ scale }}
        className="relative aspect-square w-[min(88vw,22rem)] md:w-[min(clamp(18rem,31vw,27rem),46svh)]"
      >
        {/* Turning dashed ring */}
        <div className="absolute inset-[2%] animate-orbit rounded-full border border-dashed border-line-strong" />

        {/* Me, fading out at the base */}
        <motion.div
          style={{ y: meY }}
          className="absolute bottom-0 left-1/2 w-[80%] -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_78%,transparent)]"
        >
          <Avatar badge={false} size="w-full h-auto" />
        </motion.div>

        {/* Thought bubble, right above the head; two small circles trail down to it */}
        <div className="absolute bottom-[83%] left-1/2 w-64 -translate-x-1/2">
          <p className="min-h-16 rounded-[2rem] border border-line-strong bg-panel px-5 py-3.5 text-center text-sm font-medium leading-snug">
            {line}
            {!reduced && (
              <span className="ml-0.5 inline-block h-3.5 w-0.5 translate-y-0.5 animate-pulse-led bg-signal" />
            )}
          </p>
          <span
            aria-hidden
            className="absolute -bottom-5 left-[47%] size-3.5 rounded-full border border-line-strong bg-panel"
          />
          <span
            aria-hidden
            className="absolute -bottom-8 left-[44%] size-2 rounded-full border border-line-strong bg-panel"
          />
        </div>
      </motion.div>
    </div>
  );
}

/** Types each line out, holds it, then moves to the next. Static first line (the greeting) under reduced motion. */
function useTypewriter(lines: string[], reduced: boolean) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const full = lines[index].length;
    const id =
      count < full
        ? window.setTimeout(() => setCount((c) => c + 1), 32)
        : window.setTimeout(() => {
            setIndex((i) => (i + 1) % lines.length);
            setCount(0);
          }, 2800);
    return () => window.clearTimeout(id);
  }, [count, index, lines, reduced]);

  return reduced ? lines[0] : lines[index].slice(0, count);
}
