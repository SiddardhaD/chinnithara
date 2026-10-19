import { Link } from 'react-router';
import { CloudMotif, MoonMotif } from '../components/common/Motifs';
import { usePageMeta } from '../hooks/usePageMeta';

export function NotFoundPage() {
  usePageMeta({
    title: 'Page not found',
    description: 'Sorry, this page could not be found.',
    noindex: true,
  });

  return (
    <section className="container-page flex flex-col items-center py-20 text-center sm:py-28">
      <div className="relative">
        <MoonMotif className="size-28 text-gold sm:size-36" />
        <CloudMotif className="absolute -right-12 -bottom-2 w-24 text-sage sm:w-28" />
      </div>
      <p className="eyebrow mt-10">Error 404</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Shh… this page is fast asleep</h1>
      <p className="mt-4 max-w-md text-lg text-ink/80">
        We couldn’t find what you were looking for. It may have moved, or the link might be mistyped.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link to="/shop" className="btn btn-outline">
          Shop all
        </Link>
      </div>
    </section>
  );
}
