import type { ProjectImage } from '../../data/projects';

type WorkImageProps = {
  image: ProjectImage;
  /** Images near the top of the page load eagerly; the rest defer. */
  priority?: boolean;
  /** Set by the parent card so the image reacts to hovering the whole link. */
  interactive?: boolean;
  className?: string;
};

/**
 * Renders one image at its designed aspect ratio. The outer box owns the ratio
 * and the crop; the image fills it. Hover scales the image inside the fixed box
 * rather than the box itself, so the grid never reflows.
 */
export function WorkImage({
  image,
  priority = false,
  interactive = false,
  className = '',
}: WorkImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-neutral-100 ${className}`}
      style={{ aspectRatio: image.ratio }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${
          interactive
            ? 'transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
            : ''
        }`}
        style={{ objectPosition: image.objectPosition ?? '50% 50%' }}
      />
    </div>
  );
}
