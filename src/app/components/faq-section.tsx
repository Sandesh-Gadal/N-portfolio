import { faq } from '../data/faq';
import { Reveal, Section } from './section';

/** Questions people ask before hiring. Plain, always-open rows so every answer is on the page. */
export function FaqSection() {
  return (
    <Section
      id="faq"
      label="FAQ"
      title={
        <>
          Before you <em>ask</em>
        </>
      }
    >
      <dl className="grid grid-cols-1 border-t border-line-strong">
        {faq.map((item, i) => (
          <Reveal
            key={item.q}
            delay={i * 0.04}
            className="grid grid-cols-1 gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-10"
          >
            <dt className="text-lg font-semibold leading-snug md:col-span-5">{item.q}</dt>
            <dd className="leading-relaxed text-muted-foreground md:col-span-7">{item.a}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
