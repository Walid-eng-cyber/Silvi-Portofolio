import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** The sticky navbar is 60px; the extra 16px keeps a section from touching it. */
const SCROLL_OFFSET = 76;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Owns scroll position for the whole app.
 *
 * Two problems this solves:
 *
 * 1. A plain `#about` anchor does nothing when you are on `/work/metasphere` —
 *    the element isn't in the document. Routing to `/#about` renders the home
 *    page first, so the scroll has to happen *after* that render, not during
 *    the click.
 * 2. The browser aligns an anchor target to the very top of the viewport, which
 *    puts it underneath the sticky navbar. `scrollIntoView` respects the
 *    `scroll-margin-top` set in index.css, so the section lands clear of it.
 *
 * Navigating to a route with no hash resets to the top, which is what you want
 * when opening a project.
 */
export function useScrollBehaviour() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const target = document.getElementById(hash.slice(1));
    if (!target) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    // Wait a frame so the incoming route has painted and the element has its
    // final position before we measure it.
    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({ behavior, block: 'start' });
    });

    return () => cancelAnimationFrame(frame);
    // `key` changes on every navigation, so clicking the same link twice still
    // scrolls back to the section.
  }, [pathname, hash, key]);
}

export { SCROLL_OFFSET };
