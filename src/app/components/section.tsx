import { useRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { gsap, useGsap } from '../lib/gsap';
import { useReducedMotion } from '../lib/hooks';

type SectionProps = {
  id: string;
  /** Short label above the title, e.g. "Selected work". */
  label: string;
  /** Headline. Wrap one word in <em> to set it in the accent red. */
  title: ReactNode;
  lede?: ReactNode;
  /** Optional element shown to the right of the header (e.g. the avatar). */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Label above every section title: a small red ring, then the label. */
export function SectionLabel({ label, onScreen = false }: { label: string; onScreen?: boolean }) {
  return (
    <p className={`tag flex items-center gap-2.5 ${onScreen ? 'text-on-screen-muted' : ''}`}>
      <span className="via" aria-hidden />
      {label}
    </p>
  );
}

/** Classes for a section headline; `<em>` turns accent red. */
export const headlineClass =
  'display text-[2.6rem] sm:text-6xl md:text-7xl [&_em]:not-italic [&_em]:text-signal';

/** Shared section shell: label + headline + optional lede and aside. */
export function Section({ id, label, title, lede, aside, className = '', children }: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  // Title wipes up into place as the section scrolls in.
  useGsap(ref, (root) => {
    const h2 = root.querySelector('h2');
    if (!h2) return;
    gsap.from(h2, {
      yPercent: 35,
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: h2, start: 'top 88%', once: true }
    });
  });

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className={`page py-20 md:py-28 ${className}`}>
      <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
        <div className="min-w-0 max-w-3xl">
          <SectionLabel label={label} />
          <h2 id={`${id}-title`} className={`mt-5 ${headlineClass}`}>
            {title}
          </h2>
          {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lede}</p>}
        </div>
        {aside}
      </Reveal>
      <div className="mt-10 md:mt-14">{children}</div>
    </section>
  );
}

/** Fade-and-rise on first view; static under prefers-reduced-motion. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  // Reduced motion: no fade at all, content is simply there.
  if (useReducedMotion()) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
