import { Command } from 'lucide-react';
import { profile } from '../data/profile';
import { useLocalTime } from '../lib/hooks';
import { OPEN_COMMAND_EVENT } from './command-menu';
import { VisitCounter } from './visit-counter';

export function Footer() {
  const time = useLocalTime(profile.timeZone);
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden pt-10">
      <div className="page flex flex-wrap items-end justify-between gap-6">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
            {[
              ['GitHub', profile.links.github],
              ['LinkedIn', profile.links.linkedin],
              ['Email', `mailto:${profile.email}`],
              ['Résumé', profile.resume]
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith('http') || label === 'Résumé' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="link"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <VisitCounter />
      </div>

      {/* Device status bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-screen-line bg-screen px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-on-screen-muted md:px-6">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2">
            <span className="led size-1.5" aria-hidden /> online
          </span>
          <span className="hidden sm:inline">© {year} {profile.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">React + Vite</span>
          <span>{time} NPT</span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_EVENT))}
            className="inline-flex items-center gap-1 rounded border border-screen-line px-1.5 py-0.5 hover:text-on-screen"
          >
            <Command className="size-3" aria-hidden />K <span className="sr-only">open command menu</span>
          </button>
          <a href="#top" className="hover:text-on-screen">
            ↑ top
          </a>
        </div>
      </div>
    </footer>
  );
}
