import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { about } from '../data/content';

export function About() {
  return (
    <section id="about" className="mt-12 sm:mt-14 md:mt-[58px]">
      <Container>
        <Reveal>
          <p className="max-w-[1039px] text-[clamp(20px,4.6vw,36px)] font-extrabold leading-[1.167] [text-wrap:balance]">
            {about.statement}
          </p>
        </Reveal>

        {/*
          Education is a narrow right-hand footnote in the design. On a phone
          there is no room for a right-hand column, so it runs full width and
          the large gap above it collapses.
        */}
        <Reveal className="mt-10 sm:mt-16 md:mt-[146px]">
          <dl className="max-w-[339px] text-[12px] leading-[16px] md:ml-auto">
            <dt className="sr-only">Education</dt>
            {about.education.map((entry) => (
              <dd key={entry}>{entry}</dd>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
