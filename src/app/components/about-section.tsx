import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';
import { Reveal, Section } from './section';

const facts = [
  { k: 'Currently', v: 'Lead Developer @ Hexa Labs' },
  { k: 'Part-time', v: 'Backend Developer @ Loopix Creations' },
  { k: 'Focus', v: 'APIs, databases, IoT integrations' },
  { k: 'Community', v: 'Code for Change (Admin Lead 2024–25)' },
  { k: 'Based in', v: 'Bharatpur, Chitwan (UTC+5:45)' }
];

export function AboutSection() {
  return (
    <Section
      id="about"
      label="About"
      title={
        <>
          Trace the fault to its <em>source</em>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div className="space-y-5 text-lg leading-relaxed md:text-xl">
            <p>
              I started out repairing computers at Chitwan Computer, a shop in Chitwan whose website I later built.
              That job taught me the habit I still work by:{' '}
              <span className="font-semibold text-signal-ink">trace the fault to its source</span> before touching
              anything.
            </p>
            <p className="text-muted-foreground">
              Today I work across the stack: Laravel, MySQL and API design on the back end, React on the front, and at
              Hexa Labs, the milk analysers that report into the system. I care about schemas that still make sense a
              year later, queries that hold up under load, and deployments someone else can repeat. Next, I'm going
              deeper on DevOps: containers, infrastructure as code and CI.
            </p>
            <p className="text-muted-foreground">
              Outside work, I served as Admin Lead at{' '}
              <strong className="font-semibold text-foreground">Code for Change</strong> for the 2024–25 term,
              organising workshops for students getting into tech. I also write tutorials when something was harder to
              learn than it should have been.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <dl className="grid grid-cols-1 border-t border-line-strong">
            {facts.map((f) => (
              <div
                key={f.k}
                className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-line-strong py-4"
              >
                <dt className="tag">{f.k}</dt>
                <dd className="mt-1 font-medium">{f.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-2">
            <a href={profile.resume} download className="key key-signal">
              Download resume
            </a>
            {[
              ['GitHub', profile.links.github],
              ['LinkedIn', profile.links.linkedin],
              ['Holopin', profile.links.holopin]
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="key key-plain">
                {label} <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
