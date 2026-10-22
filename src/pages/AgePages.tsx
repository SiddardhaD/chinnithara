import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { MoonMotif } from '../components/common/Motifs';
import { PageHeader } from '../components/common/PageHeader';
import { CatalogBrowser } from '../components/product/CatalogBrowser';
import { ageGroups, sizeFitsAgeGroup } from '../data/sizes';
import { useProducts } from '../hooks/useCatalog';
import { usePageMeta } from '../hooks/usePageMeta';
import type { AgeGroup, Product } from '../types/product';
import { cn } from '../utils/format';
import { NotFoundPage } from './NotFoundPage';

const inGroup = (group: AgeGroup) => (p: Product) => p.availableSizes.some((s) => sizeFitsAgeGroup(s, group));

const tones = ['bg-blush-soft', 'bg-sage-soft', 'bg-linen'];

export function AgeIndexPage() {
  usePageMeta({
    title: 'Shop by Age',
    description: 'Find ChinniThara babywear by age, from newborn to 2 years.',
    path: '/age',
  });
  const { products } = useProducts();

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Shop by Age' }]}
        eyebrow="Sizes up to 2 years"
        title="Shop by age"
        description="Choose your little one’s age to see the pieces made for this stage."
      />
      <div className="container-page py-6 sm:py-8">
        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {ageGroups.map((group, i) => {
            const count = products.filter(inGroup(group)).length;
            return (
              <li key={group.slug}>
                <Link
                  to={`/age/${group.slug}`}
                  className={cn(
                    'group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-[var(--radius-soft)] p-7 transition-transform duration-300 hover:-translate-y-1 sm:min-h-72 sm:p-9',
                    tones[i],
                  )}
                >
                  <MoonMotif
                    className={cn(
                      'absolute -right-4 -bottom-4 size-40 text-cocoa/25 transition-transform duration-700 group-hover:rotate-12',
                    )}
                  />
                  <p className="eyebrow">{count} {count === 1 ? 'piece' : 'pieces'}</p>
                  <div className="relative">
                    <h2 className="text-3xl sm:text-4xl">{group.name}</h2>
                    <p className="mt-2 max-w-xs text-ink/80">{group.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brown">
                      Shop {group.name}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export function AgePage() {
  const { slug = '' } = useParams();
  const group = ageGroups.find((g) => g.slug === slug);
  const { products } = useProducts();

  usePageMeta({
    title: group ? `Babywear for ${group.name}` : 'Age group not found',
    description: group ? `ChinniThara pieces for little ones aged ${group.name}. ${group.description}` : 'Not found.',
    path: `/age/${slug}`,
    noindex: !group,
  });

  if (!group) return <NotFoundPage />;
  const items = products.filter(inGroup(group));

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Shop by Age', to: '/age' }, { label: group.name }]}
        eyebrow="Shop by age"
        title={group.name}
        description={group.description}
      />
      <div className="container-page py-6 sm:py-8">
        <CatalogBrowser products={items} hiddenFacets={['age']} />
      </div>
    </>
  );
}
