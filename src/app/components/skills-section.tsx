import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { AppWindow, Container, Cpu, Database, Server, type LucideIcon } from 'lucide-react';
import { layers, skills, type Layer } from '../data/skills';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { Reveal, Section } from './section';

type Usage = 'Daily' | 'Comfortable' | 'Learning';

const usageOf = new Map<string, Usage>(skills.flatMap((g) => g.items.map((item) => [item, g.label as Usage] as const)));

const chipClass: Record<Usage, string> = {
  Daily: 'border-ink bg-ink text-paper',
  Comfortable: 'border-line-strong bg-panel text-foreground',
  Learning: 'border-dashed border-line-strong text-muted-foreground'
};

const ICONS: Record<string, LucideIcon> = {
  Interface: AppWindow,
  'Server & APIs': Server,
  Data: Database,
  'Infra & tooling': Container,
  Devices: Cpu
};

/**
 * The stack as an exploded isometric diagram: one plate per layer, interface on top down to
 * devices. The plates pull apart as the section scrolls in. On large screens (motion allowed)
 * the stack then pins and scrolling steps through every layer, lifting each plate and showing
 * its tools (GSAP ScrollTrigger); clicking a plate jumps there. On smaller screens every layer's
 * tools are listed; on large screens with reduced motion, hover/click/tab selects a layer.
 */
export function SkillsSection() {
  const [active, setActive] = useState(0);
  const [scrollMode, setScrollMode] = useState(false);
  const reduced = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'center center'] });
  // Plates are bigger from md up, so they need more room between them.
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 768px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => setWide(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const open = wide ? 92 : 66;
  const spread = useTransform(scrollYProgress, [0, 1], reduced ? [open, open] : [16, open]);

  // Pin the stack and let scroll position pick the layer (large screens, motion allowed).
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    const n = layers.length;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      setScrollMode(true);
      triggerRef.current = ScrollTrigger.create({
        trigger: pin,
        start: 'center center',
        end: `+=${n * 340}`,
        pin: true,
        snap: {
          snapTo: (v) => Math.min(1, Math.max(0, (Math.floor(v * n) + 0.5) / n)),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.15
        },
        onUpdate: (self) => {
          const i = Math.min(n - 1, Math.floor(self.progress * n));
          setActive((prev) => (prev === i ? prev : i));
        }
      });
      return () => {
        triggerRef.current = null;
        setScrollMode(false);
      };
    });
    return () => mm.revert();
  }, []);

  /** In scroll mode, selecting a layer scrolls to its spot; otherwise it just selects. */
  const select = (i: number) => {
    const st = triggerRef.current;
    if (!st) return setActive(i);
    const n = layers.length;
    window.scrollTo({ top: st.start + ((i + 0.5) / n) * (st.end - st.start), behavior: reduced ? 'auto' : 'smooth' });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + layers.length) % layers.length;
    select(next);
    tabs.current[next]?.focus();
  };

  const layer = layers[active];

  return (
    <Section
      id="toolbox"
      label="Toolbox"
      title={
        <>
          The whole <em>stack</em>
        </>
      }
      lede={
        <>
          I build systems end to end: the <span className="text-foreground">database</span> underneath, the{' '}
          <span className="text-foreground">API</span> in the middle, the{' '}
          <span className="text-foreground">interface</span> people click, and the{' '}
          <span className="text-foreground">devices</span> out in the field. Here's what I use at each layer.
        </>
      }
    >
      <div ref={pinRef} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Exploded stack */}
        <div ref={stageRef} className="lg:col-span-7">
          <div
            role="tablist"
            aria-label="Stack layers"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="relative mx-auto h-100 w-full max-w-xl md:h-136"
          >
            {layers.map((l, i) => (
              <Plate
                key={l.label}
                layer={l}
                index={i}
                count={layers.length}
                spread={spread}
                selected={i === active}
                hoverSelects={!scrollMode}
                onSelect={() => select(i)}
                buttonRef={(el) => {
                  tabs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* Every layer, listed (smaller screens) */}
        <div className="grid divide-y divide-line lg:hidden">
          {layers.map((l) => (
            <div key={l.label} className="py-8 first:pt-0 last:pb-0">
              <LayerDetail layer={l} />
            </div>
          ))}
        </div>

        {/* Selected layer (large screens) */}
        <Reveal className="hidden lg:col-span-5 lg:block">
          {scrollMode && (
            <p className="tag mb-4 flex items-center gap-3" aria-hidden>
              <span className="flex gap-1">
                {layers.map((l, i) => (
                  <span
                    key={l.label}
                    className={`h-1 w-6 rounded-full transition-colors ${i === active ? 'bg-signal' : i < active ? 'bg-line-strong' : 'bg-line'}`}
                  />
                ))}
              </span>
              Scroll through the layers
            </p>
          )}
          <div role="tabpanel" id="stack-panel" aria-labelledby={`layer-${active}`} className="lg:min-h-80">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={layer.label}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduced ? 0 : 0.25, ease: 'easeOut' }}
              >
                <LayerDetail layer={layer} />
              </motion.div>
            </AnimatePresence>
          </div>

          <ul
            aria-label="How much I use each"
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-sm"
          >
            {skills.map((g) => (
              <li key={g.label} className="flex items-center gap-2">
                <span
                  className={`inline-block h-3.5 w-6 rounded-md border ${chipClass[g.label as Usage]}`}
                  aria-hidden
                />
                <span className="font-semibold">{g.label}</span>
                <span className="text-muted-foreground">{g.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

/** One isometric plate, positioned by its place in the stack and the current spread. */
function Plate({
  layer,
  index,
  count,
  spread,
  selected,
  hoverSelects,
  onSelect,
  buttonRef
}: {
  layer: Layer;
  index: number;
  count: number;
  spread: MotionValue<number>;
  selected: boolean;
  /** Hover selects only when scroll isn't driving the selection. */
  hoverSelects: boolean;
  onSelect: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  const y = useTransform(spread, (s) => (index - (count - 1) / 2) * s);
  const Icon = ICONS[layer.label] ?? Server;

  return (
    <motion.div style={{ y, zIndex: count - index }} className="absolute inset-x-0 top-1/2 h-0">
      <button
        ref={buttonRef}
        type="button"
        role="tab"
        id={`layer-${index}`}
        aria-selected={selected}
        aria-controls="stack-panel"
        tabIndex={selected ? 0 : -1}
        onClick={onSelect}
        onPointerEnter={(e) => hoverSelects && e.pointerType === 'mouse' && onSelect()}
        className="group absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 outline-none md:left-[40%]"
      >
        <span className="sr-only">
          {layer.label}: {layer.items.length} tools
        </span>
        {/* Lift when selected (screen space), then the isometric plate */}
        <span
          aria-hidden
          className={`block transition-transform duration-300 ${selected ? '-translate-y-3' : 'group-hover:-translate-y-1.5'}`}
        >
          <span
            className={`grid size-36 place-items-center rounded-2xl border transition-colors duration-300 transform-[rotateX(58deg)_rotateZ(45deg)] md:size-48 ${
              selected
                ? 'border-fill bg-fill text-on-fill'
                : 'border-line-strong bg-panel text-muted-foreground group-focus-visible:border-signal'
            }`}
            style={{
              boxShadow: selected
                ? '7px 7px 0 color-mix(in srgb, var(--fill) 55%, black)'
                : '7px 7px 0 var(--panel-2), 7px 7px 0 1px var(--line-strong)',
              backgroundImage: selected
                ? undefined
                : 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }}
          >
            <Icon className="size-8 -rotate-45 md:size-10" strokeWidth={1.4} />
          </span>
        </span>
      </button>

      {/* Label with a leader line (md and up) */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-[calc(40%+9.5rem)] top-0 hidden -translate-y-1/2 items-center gap-3 md:flex"
      >
        <span className={`h-px w-10 border-t border-dashed ${selected ? 'border-signal' : 'border-line-strong'}`} />
        <span>
          <span className={`block font-display text-lg font-bold leading-tight ${selected ? 'text-signal' : ''}`}>
            {layer.label}
          </span>
          <span className="block text-xs text-muted-foreground">{layer.items.length} tools</span>
        </span>
      </span>
    </motion.div>
  );
}

function LayerDetail({ layer }: { layer: Layer }) {
  const groups = (['Daily', 'Comfortable', 'Learning'] as Usage[])
    .map((usage) => ({ usage, items: layer.items.filter((item) => (usageOf.get(item) ?? 'Comfortable') === usage) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <p className="tag">{layer.note}</p>
      <h3 className="display mt-2 text-4xl md:text-5xl">{layer.label}</h3>
      <div className="mt-6 grid gap-5">
        {groups.map((g) => (
          <div key={g.usage}>
            <p className="text-sm font-semibold text-muted-foreground">{g.usage}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li key={item} className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${chipClass[g.usage]}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
