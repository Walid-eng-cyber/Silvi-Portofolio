import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFound() {
  useDocumentTitle('Not found — Silvia Castillo Angulo');

  return (
    <main className="flex min-h-[60vh] items-center">
      <Container>
        <h1 className="text-[clamp(32px,6vw,64px)] font-extrabold leading-[1.05]">
          That page isn&rsquo;t here.
        </h1>
        <p className="mt-4 text-[16px] leading-[26px] text-neutral-500">
          The link may be out of date.
        </p>
        <Link
          to="/#work"
          className="mt-8 inline-block text-[12px] font-extrabold leading-[16px] underline underline-offset-4"
        >
          See the work
        </Link>
      </Container>
    </main>
  );
}
