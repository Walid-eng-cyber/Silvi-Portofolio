import type { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  /**
   * The footer block sits at x=21 in Figma rather than the 48px gutter the rest
   * of the page uses, so it opts into the narrower inset.
   */
  inset?: 'page' | 'edge';
  className?: string;
};

/** Gutters step up with the viewport rather than jumping straight to 48px. */
const INSET = {
  page: 'px-5 sm:px-8 md:px-12',
  edge: 'px-3 sm:px-4 md:px-[21px]',
} as const;

export function Container({
  children,
  inset = 'page',
  className = '',
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] ${INSET[inset]} ${className}`}>
      {children}
    </div>
  );
}
