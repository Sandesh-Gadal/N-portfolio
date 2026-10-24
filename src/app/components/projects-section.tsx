import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Image, MonitorPlay, Pause, Play } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { Avatar } from './avatar';
import { Reveal, Section } from './section';
import { useReducedMotion } from '../lib/hooks';

/** How long each project stays up before the slideshow moves on. */
const INTERVAL = 6000;

/**
 * Selected work as a slideshow: one project at a time (a browser-window card with its
 * details beside it), and a row of small thumbnails underneath to pick from. Advances every
 * few seconds; pauses on hover/focus, while the live preview is open, when off-screen, or via
 * the pause button. No autoplay under reduced motion. Thumbnails are ARIA tabs.
 */
export function ProjectsSection() {
  const n = projects.length;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [liveSlug, setLiveSlug] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  const playing = !reduced && !userPaused && !hovering && inView && liveSlug === null;

  const go = (next: number, focus = false) => {
    const i = (next + n) % n;
    setDirection(next > active || (active === n - 1 && i === 0) ? 1 : -1);
    setActive(i);
    setLiveSlug(null);
    if (focus) tabs.current[i]?.focus();
  };

  // Picking a thumbnail far below the project (small screens) brings the project back into view.
  const pick = (i: number) => {
    go(i);
    const top = panelRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 64) panelRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  // Advance on a timer while playing.
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      setDirection(1);
      setActive((a) => (a + 1) % n);
    }, INTERVAL);
    return () => window.clearTimeout(id);
  }, [playing, active, n]);

  // Only run while the section is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (step) {
      e.preventDefault();
      go(active + step, true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      go(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      go(n - 1, true);
    }
  };

  const project = projects[active];

  return (
    <Section
      id="work"
      label="Selected work"
      title={
        <>
          Things I've <em>shipped</em>
        </>
      }
      lede="Laravel backends with React or Android on top: a farming app, a college journal platform, a storefront for the shop where I started, and an NFC attendance system."
      aside={
        <Avatar
          say="The NFC one is where software met hardware for me."
          size="size-20 md:size-24"
          className="hidden md:flex"
        />
      }
    >
      <Reveal>
        <div
          ref={rootRef}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovering(false);
          }}
          className="flex flex-col"
        >
          {/* The one project on show */}
          <div
            ref={panelRef}
            role="tabpanel"
            id="work-panel"
            aria-labelledby={`tab-${project.slug}`}
            aria-live={playing ? 'off' : 'polite'}
            className="relative scroll-mt-24 overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={project.slug}
                custom={direction}
                initial={reduced ? false : { opacity: 0, x: 60 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -60 * direction }}
                transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10"
              >
                {/* Capped by viewport height so the card and the thumbnails fit on one laptop screen */}
                <div className="mx-auto w-full max-w-[calc(52svh*1.6)] lg:col-span-6">
                  <Card
                    project={project}
                    live={liveSlug === project.slug}
                    onToggleLive={() => setLiveSlug((s) => (s === project.slug ? null : project.slug))}
                  />
                </div>
                <div className="lg:col-span-6">
                  <Details project={project} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail carousel: above the project on small screens, so a tap changes what is right below it */}
          <div className="order-first mb-6 lg:order-none lg:mb-0">
            <div className="flex items-center justify-between gap-4 lg:mt-8">
              <p className="tag min-w-0 truncate">
                {project.title}{' '}
                <span className="text-muted-foreground/70">
                  · {active + 1} of {n}
                </span>
              </p>
              <div className="flex items-center gap-2">
                {!reduced && (
                  <button
                    type="button"
                    onClick={() => setUserPaused((p) => !p)}
                    aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
                    className="key key-plain size-9 px-0"
                  >
                    {userPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  aria-label="Previous project"
                  className="key key-plain size-9 px-0"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  aria-label="Next project"
                  className="key key-plain size-9 px-0"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Projects"
              onKeyDown={onKeyDown}
              className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2"
            >
              {projects.map((p, i) => {
                const selected = i === active;
                return (
                  <button
                    key={p.slug}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    id={`tab-${p.slug}`}
                    aria-selected={selected}
                    aria-controls="work-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => pick(i)}
                    className={`group relative w-36 shrink-0 snap-start overflow-hidden rounded-lg border text-left transition-colors md:w-44 ${
                      selected ? 'border-signal/60 bg-panel' : 'border-line-strong bg-panel/60 hover:bg-panel'
                    }`}
                  >
                    <span className="block aspect-video overflow-hidden border-b border-line">
                      <img
                        src={p.thumb}
                        alt={`${p.title} thumbnail`}
                        aria-hidden
                        loading="lazy"
                        className={`size-full object-cover object-top transition duration-500 group-hover:scale-105 ${
                          selected ? '' : 'opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0'
                        }`}
                      />
                    </span>
                    <span className="flex items-center justify-between gap-2 px-2.5 py-2">
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-semibold">{p.title}</span>
                        <span className="block truncate text-[11px] text-muted-foreground">{p.context}</span>
                      </span>
                      <span className={`led ${p.live ? '' : 'led-off'}`} aria-hidden />
                    </span>
                    {/* Time until the slideshow moves on */}
                    {selected && (
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
                        <span
                          key={`${active}-${playing}`}
                          className={`block h-full origin-left bg-signal ${playing ? 'animate-progress' : 'scale-x-0'}`}
                          style={{ ['--progress-duration' as string]: `${INTERVAL}ms` }}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/** Browser-window card: window bar with the real host, then the screenshot (or the live site). */
function Card({ project, live, onToggleLive }: { project: Project; live: boolean; onToggleLive: () => void }) {
  const host = project.live ? new URL(project.live).host : (project.source?.replace('https://', '') ?? 'offline');
  const canPreview = Boolean(project.preview && project.live);

  return (
    <div className="screen flex aspect-16/10 flex-col overflow-hidden">
      <div className="flex h-9 shrink-0 items-center gap-3 px-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-on-screen-muted/35" />
          <span className="size-2.5 rounded-full bg-on-screen-muted/35" />
          <span className="size-2.5 rounded-full bg-on-screen-muted/35" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-screen-2 px-2.5 py-1 font-mono text-[11px] text-on-screen-muted">
          <span className={`led size-1.5 ${project.live ? '' : 'led-off'}`} aria-hidden />
          <span className="truncate">{host}</span>
        </span>
        {canPreview && (
          <button
            type="button"
            onClick={onToggleLive}
            aria-pressed={live}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-screen-line px-2 py-1 text-xs font-semibold text-on-screen transition-colors hover:bg-screen-2"
          >
            {live ? <Image className="size-3.5" aria-hidden /> : <MonitorPlay className="size-3.5" aria-hidden />}
            {live ? 'Screenshot' : 'Live preview'}
          </button>
        )}
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {live ? (
          <LivePreview url={project.live!} title={project.title} poster={project.image} />
        ) : (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            decoding="async"
            className="absolute inset-0 size-full object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}

function Details({ project }: { project: Project }) {
  return (
    <article>
      <p className="tag">{project.context}</p>
      <h3 className="display mt-2 text-2xl md:text-3xl">{project.title}</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">{project.summary}</p>

      <p className="tag mt-6">What I did</p>
      <ul className="mt-3 grid gap-2.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-[15px] leading-snug">
            <span className="via mt-1" aria-hidden />
            {h}
          </li>
        ))}
      </ul>

      <ul aria-label="Stack" className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <li key={s} className="pin">
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="key key-signal h-10 px-4">
            Visit live <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">: {project.title}</span>
          </a>
        )}
        {project.source && (
          <a href={project.source} target="_blank" rel="noopener noreferrer" className="key key-plain h-10 px-4">
            <Github className="size-4" aria-hidden /> Source
            <span className="sr-only">code for {project.title}</span>
          </a>
        )}
      </div>
    </article>
  );
}

const FRAME_W = 1440;

/**
 * The real site in an iframe, rendered at desktop width and scaled down to fill the card.
 * Only mounted when asked for, so nothing extra loads by default. The screenshot shows
 * underneath until the site has loaded.
 */
function LivePreview({ url, title, poster }: { url: string; title: string; poster: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ scale: 0, height: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = (w: number, h: number) => setSize({ scale: w / FRAME_W, height: h / (w / FRAME_W) });
    const r = el.getBoundingClientRect();
    measure(r.width, r.height);
    const ro = new ResizeObserver(([entry]) => measure(entry.contentRect.width, entry.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={box} className="absolute inset-0 bg-screen-2">
      <img
        src={poster}
        alt=""
        aria-hidden
        className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
      />
      {size.scale > 0 && (
        <iframe
          src={url}
          title={`Live preview of ${title}`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
          className={`absolute left-0 top-0 origin-top-left border-0 bg-white transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: FRAME_W, height: size.height, transform: `scale(${size.scale})` }}
        />
      )}
      {!loaded && (
        <p
          role="status"
          className="absolute bottom-3 left-3 rounded-md bg-screen/90 px-2.5 py-1 font-mono text-[11px] text-on-screen"
        >
          Loading live site…
        </p>
      )}
    </div>
  );
}
