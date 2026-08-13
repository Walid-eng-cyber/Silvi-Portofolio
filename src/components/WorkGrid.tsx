import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { ProjectCard } from './ProjectCard';
import type { GridEntry } from '../data/projects';

type WorkGridProps = {
  id?: string;
  /** Two side-by-side entries. Collapses to one column below md. */
  pair: GridEntry[];
  /** Optional full-width entry directly beneath the pair. */
  wide?: GridEntry;
  priority?: boolean;
  className?: string;
};

function entryKey(entry: GridEntry) {
  return entry.kind === 'project' ? entry.slug : entry.image.src;
}

export function WorkGrid({
  id,
  pair,
  wide,
  priority = false,
  className = '',
}: WorkGridProps) {
  return (
    <section id={id} className={className}>
      <Container>
        {/*
          Stacked on a phone, the 8px design gap leaves two unrelated projects
          almost touching, so vertical rhythm opens up while the horizontal gap
          stays at the designed value.
        */}
        {pair.length > 0 && (
          <div className="grid grid-cols-1 gap-x-2 gap-y-8 md:grid-cols-2 md:gap-y-10">
            {pair.map((entry, index) => (
              <Reveal key={entryKey(entry)} delay={index * 0.08}>
                <ProjectCard entry={entry} priority={priority} />
              </Reveal>
            ))}
          </div>
        )}

        {wide && (
          /* No top margin when this row is the only thing in the section. */
          <Reveal className={pair.length > 0 ? 'mt-8 md:mt-10' : ''}>
            <ProjectCard entry={wide} />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
