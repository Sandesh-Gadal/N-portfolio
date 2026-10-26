import { useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { sendContactEmail } from '../services/mail';
import { profile } from '../data/profile';
import { Avatar } from './avatar';
import { Reveal, SectionLabel } from './section';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const fieldClass =
  'rounded-lg border-screen-line bg-screen-2 font-mono text-[15px] text-on-screen placeholder:text-on-screen-muted/60 focus-visible:border-signal focus-visible:ring-signal/30';

const statusLine: Record<Status, string> = {
  idle: '> ready',
  sending: '> transmitting…',
  sent: "> sent. I'll reply by email.",
  error: `> failed. Please email ${profile.email} directly.`
};

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  // Once copied, the address stays on screen so the visitor can see what they copied.
  const [revealed, setRevealed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');
    const result = await sendContactEmail(formRef.current);
    if (result.success) {
      formRef.current.reset();
      setStatus('sent');
      // GTM: trigger on this custom event, mark it as a key event in GA4.
      (window as Window & { dataLayer?: object[] }).dataLayer?.push({ event: 'contact_form_sent' });
    } else {
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setRevealed(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="page py-10 md:py-16">
      <div className="screen overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--screen-line)_1.1px,transparent_1.3px)] bg-size-[24px_24px]" />

        <div className="relative grid grid-cols-1 gap-14 px-6 py-16 md:px-12 md:py-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center justify-between gap-6">
              <SectionLabel label="Contact" onScreen />
              <Avatar pose="wave" size="size-16 md:size-20" />
            </div>
            <h2 id="contact-title" className="display mt-6 text-[clamp(2.75rem,7vw,5.5rem)]">
              Got a system <span className="block text-trace">to build?</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-on-screen-muted">
              I'm open to full-time roles, contracts and freelance work on Laravel, APIs, databases and device
              integrations, remote or on-site in Chitwan. Tell me what you're building; I usually reply within a day,
              Nepal time.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {/* Buttons rather than a printed address, so the email isn't in the HTML for scrapers. */}
              <button type="button" onClick={copyEmail} className="key key-screen">
                {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                {copied ? 'Email copied' : 'Copy email address'}
              </button>
              <button
                type="button"
                onClick={() => (window.location.href = `mailto:${profile.email}`)}
                className="key key-screen"
              >
                <Mail className="size-4" aria-hidden /> Open in mail app
              </button>
              <p role="status" className="w-full font-mono text-sm text-on-screen-muted">
                {revealed ? `${profile.email} is on your clipboard.` : ''}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                ['GitHub', profile.links.github],
                ['LinkedIn', profile.links.linkedin]
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="key key-screen">
                  {label} <ArrowUpRight className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-screen-line bg-screen p-5 md:p-7"
            >
              <div className="mb-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-on-screen-muted">
                <span>tx · message</span>
                <span className="flex items-center gap-2">
                  <span
                    className={`led ${status === 'sending' ? 'led-signal animate-pulse-led' : status === 'error' ? 'led-signal' : status === 'sent' ? '' : 'led-off'}`}
                    aria-hidden
                  />
                  {status}
                </span>
              </div>

              <div className="grid gap-5">
                <div>
                  <label htmlFor="name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-on-screen-muted">
                    Name
                  </label>
                  <Input id="name" name="name" autoComplete="name" required className={`h-12 ${fieldClass}`} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-on-screen-muted">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" autoComplete="email" required className={`h-12 ${fieldClass}`} />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-on-screen-muted">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="What are you building, and where could I help?"
                    className={`min-h-36 ${fieldClass}`}
                  />
                </div>

                <button type="submit" disabled={status === 'sending'} className="key key-signal w-full">
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <Send className="size-4" aria-hidden />
                </button>

                <p role="status" aria-live="polite" className="min-h-5 font-mono text-xs text-on-screen-muted">
                  {statusLine[status]}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
