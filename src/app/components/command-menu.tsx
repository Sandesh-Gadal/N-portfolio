import { useEffect } from 'react';
import { ArrowRight, Copy, Download, Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from './ui/command';
import { profile } from '../data/profile';
import type { Theme } from '../lib/hooks';

/** Dispatch this from anywhere (e.g. the footer status bar) to open the palette. */
export const OPEN_COMMAND_EVENT = 'open-command-menu';

const sections = [
  { label: 'Home', id: 'top' },
  { label: 'Selected work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Toolbox', id: 'toolbox' },
  { label: 'Writing', id: 'writing' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' }
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: Theme;
  onToggleTheme: () => void;
};

export function CommandMenu({ open, onOpenChange, theme, onToggleTheme }: Props) {
  // ⌘K / Ctrl+K toggles; custom event opens.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    const onOpen = () => onOpenChange(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_COMMAND_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_COMMAND_EVENT, onOpen);
    };
  }, [open, onOpenChange]);

  const run = (fn: () => void) => () => {
    onOpenChange(false);
    fn();
  };

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command menu"
      description="Jump to a section or run an action"
    >
      <CommandInput placeholder="Type a command or search…" />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>Nothing matches. Try “work” or “email”.</CommandEmpty>

        <CommandGroup heading="Go to">
          {sections.map((s) => (
            <CommandItem key={s.id} onSelect={run(() => go(s.id))}>
              <ArrowRight />
              {s.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Actions">
          <CommandItem onSelect={run(() => navigator.clipboard?.writeText(profile.email))}>
            <Copy />
            Copy email address
          </CommandItem>
          <CommandItem onSelect={run(() => window.location.assign(`mailto:${profile.email}`))}>
            <Mail />
            Send an email
          </CommandItem>
          <CommandItem onSelect={run(() => openUrl(profile.resume))}>
            <Download />
            Open résumé (PDF)
          </CommandItem>
          <CommandItem onSelect={run(onToggleTheme)}>
            {theme === 'dark' ? <Sun /> : <Moon />}
            Switch to {theme === 'dark' ? 'light' : 'dark'} theme
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Elsewhere">
          <CommandItem onSelect={run(() => openUrl(profile.links.github))}>
            <Github />
            GitHub
          </CommandItem>
          <CommandItem onSelect={run(() => openUrl(profile.links.linkedin))}>
            <Linkedin />
            LinkedIn
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
