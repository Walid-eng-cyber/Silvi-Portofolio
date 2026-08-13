import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { WorkImage } from './ui/WorkImage';
import type { MediaBlock } from '../data/projects';

/**
 * Renders the image blocks below the info band. Each layout collapses to a
 * single column on a phone, where a two-up row would leave each image too small
 * to read.
 */
export function ProjectMedia({ block }: { block: MediaBlock }) {
  const columns =
    block.layout === 'pair'
      ? 'md:grid-cols-2'
      : block.layout === 'quad'
        ? 'sm:grid-cols-2'
        : '';

  return (
    <Container className="mt-8 md:mt-12">
      <div className={`grid grid-cols-1 gap-2 ${columns}`}>
        {block.images.map((image, index) => (
          <Reveal key={image.src} delay={index * 0.06}>
            <WorkImage image={image} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
