import { useParams } from 'react-router';
import { CollectionCard } from '../components/common/CollectionCard';
import { GarmentIllustration } from '../components/common/GarmentIllustration';
import { PageHeader } from '../components/common/PageHeader';
import { ResponsiveImage } from '../components/common/ResponsiveImage';
import { CatalogBrowser } from '../components/product/CatalogBrowser';
import { collections, getCollection } from '../data/categories';
import { useProducts } from '../hooks/useCatalog';
import { usePageMeta } from '../hooks/usePageMeta';
import type { Product } from '../types/product';
import { NotFoundPage } from './NotFoundPage';

/** Cover for a collection card: the first genuine photo in it, else an illustration. */
function CollectionCover({ items, index }: { items: Product[]; index: number }) {
  const withPhoto = items.find((p) => p.images.length > 0);
  if (withPhoto) {
    return (
      <ResponsiveImage
        image={withPhoto.images[0]}
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="h-full w-full object-cover"
      />
    );
  }
  return <GarmentIllustration category={items[0]?.category ?? 'frocks'} tone={index} />;
}

export function CollectionsIndexPage() {
  usePageMeta({
    title: 'Shop by Style',
    description: 'Explore ChinniThara collections: muslin co-ord sets, frocks, jablas, rompers and essentials.',
    path: '/collections',
  });
  const { products } = useProducts();

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Shop by Style' }]}
        eyebrow="Collections"
        title="Shop by style"
        description="From matching co-ords to twirl-ready frocks. Choose a style to begin."
      />
      <div className="container-page py-6 sm:py-8">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {collections.map((c, i) => {
            const items = products.filter(c.matches);
            return (
              <li key={c.slug}>
                <CollectionCard
                  to={`/collections/${c.slug}`}
                  eyebrow={c.eyebrow}
                  title={c.name}
                  description={`${items.length} ${items.length === 1 ? 'piece' : 'pieces'}`}
                  shape={i % 2 === 0 ? 'arch' : 'soft'}
                  media={<CollectionCover items={items} index={i} />}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export function CollectionPage() {
  const { slug = '' } = useParams();
  const collection = getCollection(slug);
  const { products } = useProducts();

  usePageMeta({
    title: collection ? collection.name : 'Collection not found',
    description: collection?.description ?? 'This collection could not be found.',
    path: `/collections/${slug}`,
    noindex: !collection,
  });

  if (!collection) return <NotFoundPage />;
  const items = products.filter(collection.matches);

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Shop by Style', to: '/collections' }, { label: collection.name }]}
        eyebrow={collection.eyebrow}
        title={collection.name}
        description={collection.description}
      />
      <div className="container-page py-6 sm:py-8">
        <CatalogBrowser products={items} hiddenFacets={['style']} />
      </div>
    </>
  );
}
