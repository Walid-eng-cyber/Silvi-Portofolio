import { Link } from 'react-router-dom';
import { WorkImage } from './ui/WorkImage';
import { getProject, type GridEntry } from '../data/projects';

type ProjectCardProps = {
  entry: GridEntry;
  priority?: boolean;
};

/** Title and caption line under each grid image. */
function Caption({ title, caption }: { title?: string; caption: string }) {
  return (
    <div className="mt-3 flex flex-col gap-0.5 text-[12px] leading-[16px] sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      {/* Entries without a detail page have no title — skip the empty heading. */}
      {title && <h3 className="font-extrabold">{title}</h3>}
      <p className="text-neutral-500 sm:ml-auto sm:text-right">{caption}</p>
    </div>
  );
}

/**
 * A grid image, in one of three states:
 *
 *   - a project with a detail frame  → links to /work/<slug>
 *   - an image with an external href → opens that site in a new tab
 *   - an image with neither          → renders as a plain, non-interactive image
 *
 * The Figma home frame shows images with no labels at all. The caption line is
 * added so a visitor can tell what a piece is — it sits at 12px in the same
 * weight as the education note, so it reads as a footnote.
 */
export function ProjectCard({ entry, priority = false }: ProjectCardProps) {
  if (entry.kind === 'image') {
    const isInteractive = Boolean(entry.href || entry.to);
    const body = (
      <>
        <WorkImage
          image={entry.image}
          priority={priority}
          interactive={isInteractive}
        />
        <Caption caption={entry.caption} />
      </>
    );

    if (entry.to) {
      return (
        <Link to={entry.to} className="group block" aria-label={entry.caption}>
          {body}
        </Link>
      );
    }

    if (!entry.href) return <div>{body}</div>;

    return (
      <a
        href={entry.href}
        target="_blank"
        rel="noreferrer noopener"
        className="group block"
        aria-label={`${entry.caption} — opens in a new tab`}
      >
        {body}
      </a>
    );
  }

  const project = getProject(entry.slug);
  if (!project) return null;

  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block"
      aria-label={`${project.titleLead} — ${project.caption}`}
    >
      <WorkImage image={project.cover} priority={priority} interactive />
      <Caption title={project.titleLead} caption={project.caption} />
    </Link>
  );
}
