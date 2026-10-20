import { Link, useParams } from 'react-router';
import { PageHeader } from '../components/common/PageHeader';
import { CatalogBrowser } from '../components/product/CatalogBrowser';
import { printSwatches } from '../data/printSwatches';
import { getPrint, prints } from '../data/prints';
import { useProducts } from '../hooks/useCatalog';
import { usePageMeta } from '../hooks/usePageMeta';
import type { Product } from '../types/product';
import { matchesQuery } from '../utils/search';
import { NotFoundPage } from './NotFoundPage';

/** First image of a product, preferring the photo of the design that matches the print. */
function previewFor(product: Product, q: string) {
  const term = q.toLowerCase().replace(/s$/, '');
  const design = product.designs?.find((d) => d.name.toLowerCase().includes(term));
  return product.images[design?.imageIndex ?? 0];
}

export function PrintsIndexPage() {
  usePageMeta({
    title: 'Shop by Print',
    description: 'Discover ChinniThara babywear by print — penguins, bunnies, peaches, mangoes, toucans, butterflies and more.',
    path: '/prints',
  });
  const { products } = useProducts();
  const bases = prints.filter((pr) => pr.family === 'assorted' && products.some((p) => p.print === pr.slug));

  const cards = printSwatches
    .map((s) => ({ ...s, items: products.filter((p) => matchesQuery(p, s.q)) }))
    .filter((c) => c.items.length > 0);

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Shop by Print' }]}
        eyebrow="Prints"
        title="Shop by print"
        description="Little prints with a lot of personality. Pick a favourite to see every piece it comes on."
      >
        {bases.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-ink/60">Browse by base:</span>
            {bases.map((b) => (
              <Link
                key={b.slug}
                to={`/prints/${b.slug}`}
                className="rounded-full border border-ink/15 bg-white px-4 py-1.5 text-sm font-semibold text-ink transition hover:border-ink"
              >
                {b.name}
              </Link>
            ))}
          </div>
        )}
      </PageHeader>

      <div className="container-page py-6 sm:py-8">
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {cards.map((c) => (
            <li key={c.q}>
              <Link
                to={`/shop?q=${encodeURIComponent(c.q)}`}
                className="group flex h-full flex-col items-center rounded-[var(--radius-soft)] border border-ink/8 bg-white p-4 text-center transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[var(--shadow-whisper)] sm:p-5"
              >
                <span className="block size-24 overflow-hidden rounded-full ring-1 ring-ink/10 ring-offset-4 ring-offset-white transition group-hover:ring-2 group-hover:ring-cocoa sm:size-28">
                  <img
                    src={`/images/prints/${c.img}-320.webp`}
                    alt=""
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </span>
                <h2 className="mt-4 text-lg leading-tight group-hover:text-cocoa-deep">{c.name}</h2>
                <p className="mt-1 text-xs text-ink/60">{c.blurb}</p>
                <div className="mt-auto flex items-center gap-2 pt-4">
                  <span className="flex -space-x-2">
                    {c.items.slice(0, 3).map((p) => {
                      const img = previewFor(p, c.q);
                      return img ? (
                        <img
                          key={p.id}
                          src={img.srcSet ? img.srcSet.split(' ')[0] : img.src}
                          alt=""
                          width={40}
                          height={40}
                          loading="lazy"
                          className="size-8 rounded-full border-2 border-white object-cover"
                        />
                      ) : null;
                    })}
                  </span>
                  <span className="text-xs font-semibold text-ink/70">
                    {c.items.length} {c.items.length === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-ink/60">
          New prints arrive with every batch —{' '}
          <Link to="/contact" className="font-semibold text-cocoa-deep underline underline-offset-2">
            message us
          </Link>{' '}
          to see what’s just in.
        </p>
      </div>
    </>
  );
}

export function PrintPage() {
  const { slug = '' } = useParams();
  const print = getPrint(slug);
  const { products } = useProducts();

  usePageMeta({
    title: print ? `${print.name} Print` : 'Print not found',
    description: print?.description ?? 'This print could not be found.',
    path: `/prints/${slug}`,
    image: print?.swatch?.src,
    noindex: !print,
  });

  if (!print) return <NotFoundPage />;
  const items = products.filter((p) => p.print === print.slug);

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Shop by Print', to: '/prints' }, { label: print.name }]}
        eyebrow="Print"
        title={print.name}
        description={print.description}
      />
      <div className="container-page py-6 sm:py-8">
        <CatalogBrowser products={items} hiddenFacets={['print']} />
      </div>
    </>
  );
}
