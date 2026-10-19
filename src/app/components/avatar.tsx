import { useEffect, useId, useRef } from 'react';

type Props = {
  /** `wave` raises a hand and waves. */
  pose?: 'idle' | 'wave';
  /** Optional speech bubble shown beside the avatar. */
  say?: string;
  /** Size of the svg, e.g. "size-24". */
  size?: string;
  /** Draw the round lime badge behind the bust. Off when it sits on its own backdrop. */
  badge?: boolean;
  className?: string;
};

/**
 * Illustrated avatar of Sandesh drawn from the profile photo: wavy dark hair,
 * short beard, ear stud, grey suit and tie. Blinks, breathes, and its eyes and
 * head follow the pointer. Static under prefers-reduced-motion. Decorative.
 */
export function Avatar({ pose = 'idle', say, size = 'size-28', badge = true, className = '' }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const clipId = `av-badge-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    const svg = ref.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = svg.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height * 0.42);
        const d = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, d / 260);
        svg.style.setProperty('--av-px', `${((dx / d) * 1.7 * reach).toFixed(2)}px`);
        svg.style.setProperty('--av-py', `${((dy / d) * 1.3 * reach).toFixed(2)}px`);
        svg.style.setProperty('--av-tilt', `${Math.max(-5, Math.min(5, dx / 90)).toFixed(2)}deg`);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div aria-hidden className={`flex items-center gap-3 ${className}`}>
      <svg ref={ref} viewBox="0 0 160 160" className={`${size} shrink-0`}>
        <defs>
          <clipPath id={clipId}>{badge ? <circle cx="80" cy="80" r="78" /> : <rect width="160" height="160" />}</clipPath>
        </defs>

        {badge && (
          <>
            <circle cx="80" cy="80" r="78" fill="var(--fill)" />
            <circle cx="80" cy="80" r="78" fill="none" stroke="var(--ink)" strokeOpacity="0.12" strokeWidth="2" />
          </>
        )}

        <g clipPath={`url(#${clipId})`}>
          <g className="av-breathe">
            {/* Suit, shirt, tie */}
            <path d="M14 168 C18 132 44 117 80 115 C116 117 142 132 146 168 Z" fill="var(--av-suit)" />
            <path d="M66 115 L80 142 L94 115 Z" fill="var(--av-shirt)" />
            <path d="M65 114 L56 124 L62 128 L58 134 L77 150 Z" fill="var(--av-suit-shade)" />
            <path d="M95 114 L104 124 L98 128 L102 134 L83 150 Z" fill="var(--av-suit-shade)" />
            <path d="M76.5 121 L83.5 121 L86 150 L80 160 L74 150 Z" fill="var(--av-tie)" />
            <path d="M75 116 L85 116 L83.5 122 L76.5 122 Z" fill="var(--av-tie-shade)" />
            <path d="M77 130 l3 3 l3 -3 M77 140 l3 3 l3 -3" stroke="var(--av-tie-shade)" strokeWidth="1.2" fill="none" />

            {/* Neck */}
            <path d="M70 94 L90 94 L91 117 C86 121 74 121 69 117 Z" fill="var(--av-skin-shade)" />

            <g className="av-head">
              {/* Ears + stud */}
              <ellipse cx="52.5" cy="72" rx="5.5" ry="8.5" fill="var(--av-skin-shade)" />
              <ellipse cx="107.5" cy="72" rx="5.5" ry="8.5" fill="var(--av-skin-shade)" />
              <circle cx="51.5" cy="80.5" r="1.6" fill="var(--av-eye)" />

              {/* Face */}
              <path
                d="M54 62 C54 40 66 32 80 32 C94 32 106 40 106 62 L106 76 C106 94 94 106 80 106 C66 106 54 94 54 76 Z"
                fill="var(--av-skin)"
              />

              {/* Beard + moustache */}
              <path
                d="M54.5 72 C55 94 66 107 80 107 C94 107 105 94 105.5 72 C103 84 99 91 93 93 C89 89.5 71 89.5 67 93 C61 91 57 84 54.5 72 Z"
                fill="var(--av-hair)"
                opacity="0.88"
              />
              <path d="M69.5 87.5 C74 84 86 84 90.5 87.5 C86 89.6 74 89.6 69.5 87.5 Z" fill="var(--av-hair)" />
              <path
                d="M74.5 93.2 Q80 95.6 85.5 93.2"
                stroke="var(--av-skin-shade)"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />

              {/* Nose */}
              <path
                d="M80 70 Q76.5 79 79.5 81.5 Q81.5 82.2 83 81"
                stroke="var(--av-skin-shade)"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />

              {/* Brows */}
              <path d="M62 58.5 Q68 55.5 74 58" stroke="var(--av-hair)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M86 58 Q92 55.5 98 58.5" stroke="var(--av-hair)" strokeWidth="3" fill="none" strokeLinecap="round" />

              {/* Eyes */}
              {[68, 92].map((cx) => (
                <g key={cx} className="av-blink">
                  <ellipse cx={cx} cy="65" rx="5" ry="3.3" fill="var(--av-eye)" />
                  <circle cx={cx} cy="65" r="2.5" fill="var(--av-hair)" className="av-pupil" />
                </g>
              ))}

              {/* Wavy hair */}
              <path
                d="M49 68 C44 48 48 30 61 22 C68 13 83 11 93 16 C105 16 115 26 114 40 C116 51 112 60 107 67 C106 57 102 50 97 46 C92 51 83 51 79 45 C75 51 66 53 61 48 C56 53 52 60 49 68 Z"
                fill="var(--av-hair)"
              />
              <path
                d="M59 31 C65 22 76 22 80 28 M82 22 C89 16 100 20 102 28 M63 39 C69 33 78 35 80 42 M88 34 C95 29 103 33 105 41"
                stroke="var(--av-skin-shade)"
                strokeOpacity="0.35"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {pose === 'wave' && (
              <g className="av-wave">
                <path d="M124 160 L132 106" stroke="var(--av-suit)" strokeWidth="15" strokeLinecap="round" />
                <path d="M130 112 L133 104" stroke="var(--av-shirt)" strokeWidth="15" strokeLinecap="butt" />
                <ellipse cx="134" cy="92" rx="8.5" ry="10.5" fill="var(--av-skin)" />
                <path d="M126 92 Q122 86 125 82" stroke="var(--av-skin)" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path
                  d="M130 84 L130 80 M134.5 83 L134.5 78.5 M139 84 L139 80.5"
                  stroke="var(--av-skin-shade)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </g>
            )}
          </g>
        </g>
      </svg>

      {say && (
        <p className="relative max-w-60 rounded-xl border border-line-strong bg-panel px-3.5 py-2.5 text-sm leading-snug text-foreground before:absolute before:-left-1.5 before:top-1/2 before:size-3 before:-translate-y-1/2 before:rotate-45 before:border-b before:border-l before:border-line-strong before:bg-panel">
          {say}
        </p>
      )}
    </div>
  );
}
