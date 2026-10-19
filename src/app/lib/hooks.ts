import { useEffect, useState } from 'react';
import { fetchVisitCount } from '../services/visits';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

/**
 * Light/dark theme. index.html applies the initial class before paint;
 * this hook reads it back and keeps <html> + localStorage in sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle };
}

/** Current wall-clock time in a given IANA time zone, refreshed every 30s. */
export function useLocalTime(timeZone: string) {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);

  return time;
}

/** Total page visits, or null while loading / if the counter service is unavailable. */
export function useVisitCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetchVisitCount().then((value) => alive && setCount(value));
    return () => {
      alive = false;
    };
  }, []);

  return count;
}

const RETURNING_KEY = 'visited-before';

// Read once per page load (not per render) so StrictMode's double render can't flip it.
const isReturning = (() => {
  try {
    const seen = localStorage.getItem(RETURNING_KEY) === '1';
    localStorage.setItem(RETURNING_KEY, '1');
    return seen;
  } catch {
    return false; // Storage unavailable: treat as a first visit.
  }
})();

/**
 * A greeting in the visitor's own local time, e.g. "Namaste, good evening!".
 * Returning visitors (same browser) get "Welcome back". Remembered only in localStorage.
 */
export function useGreeting() {
  const [greeting] = useState(() => {
    const returning = isReturning;
    const hour = new Date().getHours();
    const part =
      hour >= 5 && hour < 12 ? 'good morning' : hour >= 12 && hour < 17 ? 'good afternoon' : hour >= 17 && hour < 22 ? 'good evening' : 'up late';

    if (returning) return part === 'up late' ? 'Welcome back, night owl.' : `Welcome back, and ${part}!`;
    return part === 'up late' ? 'Namaste! Thanks for stopping by this late.' : `Namaste, ${part}! Thanks for stopping by.`;
  });

  return greeting;
}

/** Id of the section currently nearest the top of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
