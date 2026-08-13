import { useEffect, useState } from 'react';

/**
 * Reports which of the given section ids is currently in view, so the navbar
 * can show where you are. Returns an empty string when none is (for example on
 * a project detail page).
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      setActive('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      // The top inset accounts for the navbar so a section doesn't count as
      // active while it is still hidden behind it.
      { rootMargin: '-76px 0px -55% 0px', threshold: [0.1, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
