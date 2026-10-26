import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { experience, type Role } from '../data/experience';
import { Avatar } from './avatar';
import { Section } from './section';
import { useReducedMotion } from '../lib/hooks';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const NOW = (() => {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
})();

/**
 * "May 2025" → absolute month index; "Present" → now.
 * Year-only parts ("2024 — 2025", a term) are placed mid-year to mid-year.
 */
function toMonth(part: string, edge: 'start' | 'end') {
  const p = part.trim().toLowerCase();
  if (p === 'present') return NOW;
  const bits = p.split(/\s+/);
  if (bits.length === 1) return Number(bits[0]) * 12 + (edge === 'start' ? 6 : 5);
  return Number(bits[1]) * 12 + MONTHS.indexOf(bits[0].slice(0, 3));
}

function span(role: Role) {
  const [from, to] = role.period.split('—');
  return { start: toMonth(from, 'start'), end: toMonth(to, 'end') };
}

const isCurrent = (role: Role) => role.period.includes('Present');

function duration(role: Role) {
  if (role.term) return role.term;
  const { start, end } = span(role);
  // A running role counts whole months so far; a finished one includes its last month.
  const months = end - start + (isCurrent(role) ? 0 : 1);
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr`, m && `${m} mo`].filter(Boolean).join(' ') || '1 mo';
}

// Oldest first: the bottom step is where it started, the top step is the latest role.
const steps = [...experience].sort((a, b) => span(a).start - span(b).start);
const FIRST_YEAR = Math.floor(span(steps[0]).start / 12);
const RISE = 64; // px each step rises (large screens)
const HEADROOM = 250; // px above the top tread for its label, the avatar and the flag

const year = (role: Role) => Math.floor(span(role).start / 12);

/**
 * Experience as a staircase drawn with one plain line: the first job on the bottom step, each
 * later role a step higher, and the avatar with a "Now" flag on the top step. Each role's
 * details sit on its tread; hovering (or focusing) a step opens a card with what was done there.
 * The line draws in from left to right when it scrolls into view.
 * Large screens climb left → right; small screens climb bottom → top down the page, with the
 * details always shown since there's no hover.
 */
export function ExperienceSection() {
  const reduced = useReducedMotion();
  const n = steps.length;
  // Watch a wrapper, not the clipped list: a fully clipped element never counts as in view.
  const stairs = useRef<HTMLDivElement>(null);
  const shown = useInView(stairs, { once: true, margin: '-80px' });
  // Once drawn, the clip opens past the box so the hover cards aren't cut off.
  const draw = {
    initial: reduced ? false : ({ clipPath: 'inset(0% 100% 0% 0%)' } as const),
    animate: shown ? { clipPath: 'inset(-300% -40% -300% 0%)' } : undefined,
    transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] as const }
  };

  return (
    <Section
      id="experience"
      label="Experience"
      title={
        <>
          Where I've <em>worked</em>
        </>
      }
      lede={`${n} roles since ${FIRST_YEAR}, from a repair bench in Chitwan to leading an IoT build. Some ran side by side.`}
    >
      {/* Large screens: steps climb left to right */}
      <div ref={stairs}>
        <motion.ol {...draw} className="relative hidden items-end md:flex" style={{ height: n * RISE + HEADROOM }}>
          {steps.map((role, i) => {
            const live = isCurrent(role);
            const top = i === n - 1;
            const flip = i === n - 1; // only the top step opens leftward, so it stays on screen
            return (
              <li
                key={`${role.company}-${role.title}`}
                tabIndex={0}
                className={`group relative flex-1 border-t-2 outline-none transition-colors hover:border-signal focus-visible:border-signal ${live ? 'border-signal' : 'border-foreground/70'}`}
                style={{ height: (i + 1) * RISE }}
              >
                {/* Riser up to this tread */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 border-l-2 ${live ? 'border-signal' : 'border-foreground/70'}`}
                  style={{ height: i === 0 ? RISE : RISE + 2, marginTop: -2 }}
                />
                {/* What's on this step */}
                <div className="absolute bottom-full left-0 w-full pb-3 pl-3 pr-2">
                  {top && <Climber />}
                  <StepLabel role={role} />
                </div>
                {/* What was done there, on hover or focus */}
                <div
                  className={`pointer-events-none absolute top-3 z-20 w-72 translate-y-1 rounded-xl border border-line-strong bg-panel p-4 opacity-0 shadow-xl transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ${
                    flip ? 'right-0' : 'left-0'
                  }`}
                >
                  <p className="meta text-[11px]">{role.period}</p>
                  <Points role={role} />
                </div>
              </li>
            );
          })}
        </motion.ol>
      </div>

      {/* Small screens: newest at the top, each step further right */}
      <ol className="md:hidden">
        {[...steps].reverse().map((role, i) => {
          const live = isCurrent(role);
          return (
            <li
              key={`${role.company}-${role.title}`}
              className={`border-l-2 border-t-2 pb-6 pl-4 pt-3 ${live ? 'border-signal' : 'border-foreground/70'}`}
              style={{ marginLeft: `${(n - 1 - i) * 0.4}rem` }}
            >
              {i === 0 && <Climber />}
              <StepLabel role={role} />
              <Points role={role} />
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

function StepLabel({ role }: { role: Role }) {
  const live = isCurrent(role);
  return (
    <div>
      <p className={`display text-2xl leading-none ${live ? 'text-signal' : 'text-muted-foreground'}`}>{year(role)}</p>
      {/* Company is part of the heading so each one names the organisation ("Admin Lead, Code for Change"). */}
      <h3 className="mt-1.5 text-sm font-semibold leading-snug">
        {role.title}
        <span className="sr-only">, </span>
        <span className="block text-xs text-signal-ink">{role.company}</span>
      </h3>
      <p className="meta mt-0.5 text-[11px]">
        {duration(role)}
        {role.kind && ` · ${role.kind}`}
        {live && <span className="sr-only"> (current role)</span>}
      </p>
    </div>
  );
}

function Points({ role }: { role: Role }) {
  return (
    <ul className="mt-2.5 grid gap-1.5">
      {role.points.map((p) => (
        <li key={p} className="flex gap-2 text-[13px] leading-snug text-muted-foreground">
          <span className="via mt-1 shrink-0" aria-hidden />
          {p}
        </li>
      ))}
    </ul>
  );
}

/** The avatar on the top step, holding a waving "Now" flag. Decorative. */
function Climber() {
  return (
    <div aria-hidden className="relative mb-2 w-fit">
      <svg viewBox="0 0 60 90" className="absolute -right-10 bottom-6 h-20 w-14 overflow-visible">
        <line x1="8" y1="88" x2="8" y2="4" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M9 6 Q24 0 36 6 T58 8 V30 Q46 24 34 30 T9 28 Z"
          fill="var(--fill)"
          className="origin-left animate-[flag_1.6s_ease-in-out_infinite] [transform-box:fill-box]"
        />
        <text x="16" y="21" fontSize="9" fontWeight="800" fill="var(--on-fill)" fontFamily="var(--font-display)">
          NOW
        </text>
      </svg>
      <Avatar badge={false} size="size-20" />
    </div>
  );
}
