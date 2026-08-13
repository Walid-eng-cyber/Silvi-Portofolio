import { Link, useParams } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { WorkImage } from '../components/ui/WorkImage';
import { ProjectInfoBand } from '../components/ProjectInfoBand';
import { ProjectMedia } from '../components/ProjectMedia';
import { Contact } from '../components/Contact';
import { NotFound } from './NotFound';
import { getProject, getAdjacentProjects } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);

  useDocumentTitle(
    project
      ? `${project.titleLead} — Silvia Castillo Angulo`
      : 'Not found — Silvia Castillo Angulo',
  );

  if (!project) return <NotFound />;

  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <>
      <main id="project" className="pt-8 md:pt-[50px]">
        <Container>
          {/*
            Most frames set the title in two weights: the project name bold, the
            qualifier regular. The typography project has no qualifier, so the
            second span is only rendered when there is one.
          */}
          <Reveal>
            <h1 className="max-w-[715px] text-[clamp(30px,6.4vw,48px)] font-bold leading-[1.08]">
              {project.titleLead}
              {project.titleTrail && (
                <>
                  {' '}
                  <span className="font-normal">{project.titleTrail}</span>
                </>
              )}
            </h1>
          </Reveal>
        </Container>

        <Reveal className="mt-8 md:mt-[52px]">
          <Container>
            <WorkImage image={project.hero} priority />
          </Container>
        </Reveal>

        <ProjectInfoBand project={project} />

        {project.media.map((block) => (
          <ProjectMedia key={block.images[0].src} block={block} />
        ))}

        {/* Keeps a visitor moving through the work instead of dead-ending. */}
        <Container className="mt-16 md:mt-24">
          <nav
            aria-label="More projects"
            className="flex items-center justify-between gap-4 border-t border-black/10 pt-6 text-[12px] leading-[16px] sm:gap-6"
          >
            {previous && (
              <Link
                to={`/work/${previous.slug}`}
                className="group min-h-[44px] max-w-[45%] text-left"
              >
                <span className="block text-neutral-500">Previous</span>
                <span className="block font-extrabold group-hover:opacity-60">
                  {previous.titleLead}
                </span>
              </Link>
            )}

            {next && (
              <Link
                to={`/work/${next.slug}`}
                className="group ml-auto min-h-[44px] max-w-[45%] text-right"
              >
                <span className="block text-neutral-500">Next</span>
                <span className="block font-extrabold group-hover:opacity-60">
                  {next.titleLead}
                </span>
              </Link>
            )}
          </nav>
        </Container>
      </main>

      <div className="mt-16 md:mt-24">
        <Contact />
      </div>
    </>
  );
}
