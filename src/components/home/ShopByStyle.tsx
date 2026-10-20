import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { collections } from '../../data/categories';
import type { CategorySlug, Product } from '../../types/product';
import { GarmentIllustration } from '../common/GarmentIllustration';
import { SectionHeading } from '../common/SectionHeading';

/** Homepage style tiles, in the same order as the header menu. */
const tiles: Array<{ slug: string; illustration: CategorySlug; cover?: string }> = [
  {
    slug: 'muslin-co-ord-sets',
    illustration: 'co-ord-sets',
    cover: '/images/products/muslin-co-ord-set-colour-print/aqua-penguins-600.webp',
  },
  { slug: 'frocks', illustration: 'frocks', cover: '/images/products/muslin-zip-frock/aqua-toucans-600.webp' },
  {
    slug: 'jablas-and-rompers',
    illustration: 'jablas',
    cover: '/images/products/side-button-muslin-jabla/ice-creams-flat-600.webp',
  },
  {
    slug: 'muslin-essentials',
    illustration: 'essentials',
    cover: '/images/products/muslin-cloth-nappy/moons-clouds-600.webp',
  },
];

/** Uniform image tiles with the style name on a soft white panel. */
export function ShopByStyle({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="collections-title" className="container-page py-5 sm:py-7">
      <SectionHeading
        id="collections-title"
        title="Shop by"
        accent="Style"
        action={
          <Link to="/collections" className="link-underline text-sm font-semibold text-ink">
            All collections →
          </Link>
        }
      />
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {tiles.map((tile, i) => {
          const collection = collections.find((c) => c.slug === tile.slug);
          if (!collection) return null;
          const count = products.filter(collection.matches).length;
          return (
            <li key={tile.slug}>
              <Link
                to={`/collections/${collection.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-soft)] bg-ivory-deep"
              >
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                  {tile.cover ? (
                    <img
                      src={tile.cover}
                      alt=""
                      width={600}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <GarmentIllustration category={tile.illustration} tone={i} label="" className="pb-[22%]" />
                  )}
                </div>
                <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-2xl bg-white/92 px-3 py-2.5 backdrop-blur-sm sm:inset-x-3 sm:bottom-3 sm:px-4 sm:py-3">
                  <div className="min-w-0">
                    <h3 className="text-[0.9rem] leading-tight sm:text-[1.1rem]">{collection.name}</h3>
                    <p className="mt-0.5 text-xs text-ink/60">
                      {count} {count === 1 ? 'piece' : 'pieces'}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden size-9 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-0.5 sm:grid"
                  >
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
