import { useEffect } from 'react';

/** Dispatch this from anywhere (e.g. the footer status bar) to open the command palette. */
export const OPEN_COMMAND_EVENT = 'open-command-menu';

/**
 * ⌘K / Ctrl+K toggles the palette; OPEN_COMMAND_EVENT opens it. Lives outside command-menu.tsx
 * so the palette (cmdk + Radix Dialog) can load on first open instead of with the page.
 */
export function useCommandShortcut(open: boolean, setOpen: (open: boolean) => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_COMMAND_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_COMMAND_EVENT, onOpen);
    };
  }, [open, setOpen]);
}
