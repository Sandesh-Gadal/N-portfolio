import { useRef } from 'react';
import { useVisitCount } from '../lib/hooks';
import { gsap, useGsap } from '../lib/gsap';

const DIGITS = 6;

/**
 * Odometer-style page-visit counter. Counts up from zero when it scrolls into view.
 * Hidden entirely if the counter service is unavailable.
 */
export function VisitCounter() {
  const visits = useVisitCount();
  const ref = useRef<HTMLDivElement>(null);

  useGsap(
    ref,
    (root) => {
      if (visits === null) return;
      const tiles = Array.from(root.querySelectorAll<HTMLElement>('[data-digit]'));
      const state = { n: 0 };
      const render = () => {
        const text = String(Math.round(state.n)).padStart(DIGITS, '0');
        tiles.forEach((el, i) => (el.textContent = text[i]));
      };
      render();
      gsap.to(state, {
        n: visits,
        duration: 1.6,
        ease: 'power3.out',
        onUpdate: render,
        scrollTrigger: { trigger: root, start: 'top 90%', once: true }
      });
    },
    [visits]
  );

  if (visits === null) return null;
  const text = String(visits).padStart(DIGITS, '0');

  return (
    <div ref={ref} className="flex items-center gap-4">
      <p className="tag leading-tight">
        Visits
        <br />
        so far
      </p>
      <p role="img" className="flex gap-1" aria-label={`${visits.toLocaleString('en-US')} visits`}>
        {text.split('').map((d, i) => (
          <span
            key={i}
            data-digit
            aria-hidden
            className={`grid h-11 w-8 place-items-center rounded-md bg-screen font-mono text-xl font-medium ${
              i < DIGITS - String(visits).length ? 'text-on-screen-muted/40' : 'text-trace'
            }`}
          >
            {d}
          </span>
        ))}
      </p>
    </div>
  );
}
