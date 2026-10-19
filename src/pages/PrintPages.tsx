import { useParams } from 'react-router';
import { CollectionCard } from '../components/common/CollectionCard';
import { CottonMotif } from '../components/common/Motifs';
import { PageHeader } from '../components/common/PageHeader';
import { ResponsiveImage } from '../components/common/ResponsiveImage';
import { CatalogBrowser } from '../components/product/CatalogBrowser';
import { getPrint, prints } from '../data/prints';
import { useProducts } from '../hooks/useCatalog';
import { usePageMeta } from '../hooks/usePageMeta';
import type { Print } from '../types/product';
import { cn } from '../utils/format';
import { NotFoundPage } from './NotFoundPage';

const swatchTones = ['bg-blush-soft', 'bg-sage-soft', 'bg-linen'];

function PrintSwatch({ print, index }: { print: Print; index: number }) {
  if (print.swatch) {
    return <ResponsiveImage image={print.swatch} className="h-full w-full object-cover" />;
  }
  return (
    <div className={cn('flex h-full w-full flex-col items-center justify-center gap-3 text-cocoa', swatchTones[index % 3])}>
      <CottonMotif className="w-1/3 opacity-70" />
      <span className="px-4 text-center text-[0.68rem] font-semibold tracking-[0.08em] uppercase">Ask for current designs</span>
    </div>
  );
}

export function PrintsIndexPage() {
  usePageMeta({
    title: 'Shop by Print',
    description: 'Discover ChinniThara babywear by print — birds and botanicals, assorted prints and more.',
    path: '/prints',
  });
  const { products } = useProducts();
  const available = prints.filter((pr) => products.some((p) => p.print === pr.slug));

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Shop by Print' }]}
        eyebrow="Prints"
        title="Shop by print"
        description="Little birds, gentle botanicals and cheerful colour. Assorted designs change with each batch — ask us on WhatsApp to see what’s in."
      />
      <div className="container-page py-6 sm:py-8">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3">
          {available.map((print, i) => {
            const count = products.filter((p) => p.print === print.slug).length;
            return (
              <li key={print.slug}>
                <CollectionCard
                  to={`/prints/${print.slug}`}
                  title={print.name}
                  description={`${count} ${count === 1 ? 'piece' : 'pieces'} · ${print.description}`}
                  shape={i % 2 === 0 ? 'arch' : 'soft'}
                  media={<PrintSwatch print={print} index={i} />}
                />
              </li>
            );
          })}
        </ul>
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
