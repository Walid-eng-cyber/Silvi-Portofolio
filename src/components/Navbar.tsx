import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from './ui/Container';
import { nav } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTION_IDS = ['home', 'work', 'about', 'contact'];
/** Stable reference — an inline [] would re-run the observer effect every render. */
const NO_SECTIONS: string[] = [];

export function Navbar() {
  const { pathname, hash, key } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const onHome = pathname === '/';
  const active = useActiveSection(onHome ? SECTION_IDS : NO_SECTIONS);

  const LINK_BASE =
    'relative after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-current after:transition-[width] after:duration-300 hover:after:w-full focus-visible:after:w-full motion-reduce:after:transition-none';
  const CENTER_LINK_BASE =
    'inline-block text-[12px] leading-[1.1] transition-all duration-300 hover:text-[28px] focus-visible:text-[28px]';

  useEffect(() => setMenuOpen(false), [pathname, hash, key]);

  // While the panel covers the screen, the page behind it must not scroll.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Escape closes and returns focus to the button that opened it.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) panelRef.current?.focus();
  }, [menuOpen]);

  /** Keeps Tab inside the open panel rather than walking into the page behind. */
  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return;

    const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href]');
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const isActive = (href: string) => onHome && `/#${active}` === href;
  const underline = (href: string) =>
    isActive(href) ? 'after:w-full' : 'after:w-0';

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-sm text-black">
        <Container className="flex h-[60px] items-center">
          <nav
            aria-label="Primary"
            className="flex w-full items-center justify-between gap-4 text-[12px] leading-[1.1] md:grid md:grid-cols-3"
          >
            <Link
              to="/#home"
              className={`font-extrabold after:w-0 md:justify-self-start ${LINK_BASE}`}
            >
              <span className="sm:hidden">Silvia Castillo Angulo</span>
              <span className="hidden sm:inline">{nav.brand}</span>
            </Link>

            {onHome ? (
              <ul className="hidden items-center font-extrabold md:flex md:justify-self-center md:gap-[26px]">
                {nav.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      aria-current={isActive(link.href) ? 'true' : undefined}
                      className={CENTER_LINK_BASE}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              /* On a detail page the frames replace the three links with a
                 single large "Work" label, which doubles as the way back. */
              <Link
                to="/#work"
                className="hidden text-[32px] font-extrabold leading-[1.1] md:block md:justify-self-center"
              >
                Work
              </Link>
            )}

            <Link
              to={nav.cta.href}
              className={`hidden font-black md:inline-block md:justify-self-end ${LINK_BASE} ${underline(nav.cta.href)}`}
            >
              {nav.cta.label}
            </Link>

            {/* 44px square keeps the tap target at the accessible minimum. */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center md:hidden"
            >
              <span className="sr-only">
                {menuOpen ? 'Close menu' : 'Open menu'}
              </span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 motion-reduce:transition-none ${
                    menuOpen ? 'top-[6px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 motion-reduce:transition-none ${
                    menuOpen ? 'top-[6px] -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </nav>
        </Container>
      </header>

      {/*
        Rendered as a sibling of the header, not inside it: `backdrop-blur`
        creates a containing block, so a fixed panel nested in the header would
        position against the header box rather than the viewport.
      */}
      <div
        id="mobile-menu"
        ref={panelRef}
        tabIndex={-1}
        hidden={!menuOpen}
        onKeyDown={trapFocus}
        className="fixed inset-x-0 bottom-0 top-[60px] z-40 overflow-y-auto bg-white px-6 pb-10 pt-8 text-black md:hidden"
      >
        <ul className="flex flex-col gap-6 text-[28px] font-extrabold leading-[1.1]">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                aria-current={isActive(link.href) ? 'true' : undefined}
                className="inline-block py-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to={nav.cta.href}
          className="mt-10 inline-block border-b border-current pb-1 text-[16px] font-black"
        >
          {nav.cta.label}
        </Link>
      </div>
    </>
  );
}
