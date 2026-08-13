import { useEffect } from 'react';

/**
 * Keeps the browser tab and history entry meaningful per route. This is a
 * client-rendered app, so search engines that do not execute JavaScript will
 * still only see index.html — see the README note on prerendering.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
