import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { NotFound } from './pages/NotFound';
import { useScrollBehaviour } from './hooks/useScrollBehaviour';

export default function App() {
  // One place decides where the page sits after every navigation.
  useScrollBehaviour();

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-[68px] focus:z-[60] focus:bg-black focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to work
      </a>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
