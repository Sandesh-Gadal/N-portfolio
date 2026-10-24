import { useEffect, useState } from 'react';
import { Command, Menu, Moon, Sun, X } from 'lucide-react';
import { CommandMenu } from './command-menu';
import { useActiveSection, useTheme } from '../lib/hooks';

const navItems = [
  { label: 'Work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Toolbox', id: 'toolbox' },
  { label: 'Writing', id: 'writing' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' }
];

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled || open ? 'border-line-strong bg-paper' : 'border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:font-semibold focus:text-on-signal"
      >
        Skip to content
      </a>

      <nav aria-label="Primary" className="page flex h-16 items-center justify-between gap-4">
        <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
          <span aria-hidden className="grid size-8 place-items-center rounded-md bg-screen font-display text-sm font-bold text-trace">SG</span>
          <span className="tag sr-only text-foreground sm:not-sr-only">Sandesh Gadal</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className={`led size-1.5 ${isActive ? 'led-signal' : 'led-off'}`} aria-hidden />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command menu"
            className="key key-plain hidden h-9 px-2.5 text-[11px] sm:inline-flex"
          >
            <Command className="size-3.5" aria-hidden />K
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="key key-plain size-9 px-0"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="key key-plain size-9 px-0 lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <CommandMenu open={paletteOpen} onOpenChange={setPaletteOpen} theme={theme} onToggleTheme={toggle} />

      {open && (
        <ul id="mobile-nav" className="page grid pb-4 lg:hidden">
          {navItems.map((item) => (
            <li key={item.id} className="border-t border-line">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-3.5"
              >
                <span className="display text-3xl">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
