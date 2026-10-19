import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';
import { writing } from '../data/writing';
import { Reveal, Section } from './section';

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** Writing as cards: a cover with the title, then summary and reading details. */
export function WritingSection() {
  return (
    <Section
      id="writing"
      label="Writing"
      title={
        <>
          Field <em>notes</em>
        </>
      }
      lede="Plain-language tutorials on the things I found harder to learn than they should have been."
    >
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {writing.map((article, i) => (
          <li key={article.url}>
            <Reveal delay={i * 0.06} className="h-full">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line-strong bg-panel transition duration-300 hover:-translate-y-1 hover:border-signal/50"
              >
                {/* Cover */}
                <div className="screen relative flex aspect-video flex-col justify-between rounded-none p-6">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(var(--screen-line)_1px,transparent_1px),linear-gradient(90deg,var(--screen-line)_1px,transparent_1px)] bg-size-[28px_28px] mask-[linear-gradient(to_bottom,black,transparent_85%)]"
                  />
                  <span className="relative flex items-center justify-between gap-3">
                    <span className="pin border-screen-line text-on-screen-muted">{article.topic}</span>
                    <ArrowUpRight
                      className="size-5 text-on-screen-muted transition-transform duration-300 group-hover:rotate-45 group-hover:text-trace"
                      aria-hidden
                    />
                  </span>
                  <h3 className="display relative text-2xl leading-tight md:text-[1.7rem]">{article.title}</h3>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="leading-relaxed text-muted-foreground">{article.summary}</p>
                  <p className="meta mt-auto flex flex-wrap gap-x-2 pt-6">
                    <span>{article.publication}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={article.date}>{dateFormat.format(new Date(article.date))}</time>
                    <span aria-hidden>·</span>
                    <span>{article.readingMinutes} min read</span>
                  </p>
                </div>
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </Reveal>
          </li>
        ))}

        <li>
          <Reveal delay={writing.length * 0.06} className="h-full">
            <div className="flex h-full min-h-72 flex-col justify-between rounded-2xl border border-dashed border-line-strong p-6">
              <div>
                <p className="tag">Coming up</p>
                <p className="display mt-3 text-2xl leading-tight">More notes on the way.</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Follow along on LinkedIn or GitHub for the next ones.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="key key-plain h-10 px-4"
                >
                  LinkedIn <ArrowUpRight className="size-4" aria-hidden />
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="key key-plain h-10 px-4"
                >
                  GitHub <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </div>
          </Reveal>
        </li>
      </ul>
    </Section>
  );
}
