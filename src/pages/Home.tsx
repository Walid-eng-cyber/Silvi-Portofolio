import { Hero } from '../components/Hero';
import { WorkGrid } from '../components/WorkGrid';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { homeGrid } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function Home() {
  useDocumentTitle('Silvia Castillo Angulo — Creative Director & Art Director');

  return (
    <>
      <main>
        <Hero />

        <WorkGrid
          id="work"
          pair={homeGrid.rowA}
          wide={homeGrid.wideA}
          priority
          className="mt-12 md:mt-[47px]"
        />

        <About />

        <WorkGrid
          pair={homeGrid.rowB}
          wide={homeGrid.wideB}
          className="mt-16 md:mt-[82px]"
        />
      </main>

      <Contact />
    </>
  );
}
