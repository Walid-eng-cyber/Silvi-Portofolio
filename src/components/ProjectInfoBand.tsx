import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import type { Project } from '../data/projects';

type ProjectInfoBandProps = {
  project: Project;
};

/**
 * The two-column band under the hero: disciplines and effort on the left, the
 * written description on the right.
 *
 * The Figma frames set both columns on filled #ededed cards. Those panels were
 * removed on request, so the columns sit directly on the page. The 373 / 767
 * split from the frame is kept, and a hairline rule above the band gives the
 * two columns something to hang from now that the fills are gone.
 */
export function ProjectInfoBand({ project }: ProjectInfoBandProps) {
  return (
    <Container className="mt-10 md:mt-[55px]">
      <Reveal>
        <div className="grid grid-cols-1 gap-6 border-t border-black/10 pt-8 text-black md:grid-cols-[373fr_767fr] md:gap-10 md:pt-[42px]">
          <div>
            <h2 className="sr-only">Disciplines</h2>
            <ul className="text-[clamp(16px,4.4vw,20px)] font-medium leading-[1.6]">
              {project.disciplines.map((discipline) => (
                <li key={discipline}>{discipline}</li>
              ))}
              {/* Not every frame lists a time figure. */}
              {project.effort && (
                <li className="text-neutral-500">{project.effort}</li>
              )}
            </ul>
          </div>

          <div>
            <h2 className="sr-only">About this project</h2>
            <div className="space-y-5 text-[clamp(16px,4.4vw,20px)] font-normal leading-[1.45]">
              {project.description.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-block text-[clamp(16px,4.4vw,20px)] font-medium underline decoration-from-font underline-offset-4 transition-opacity duration-300 hover:opacity-60 motion-reduce:transition-none"
              >
                {project.link.label}
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
