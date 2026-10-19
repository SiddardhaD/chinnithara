import { useId, useState } from 'react';
import { Link } from 'react-router';
import { collections } from '../../data/categories';
import type { Product } from '../../types/product';
import { cn } from '../../utils/format';
import { SectionHeading } from '../common/SectionHeading';
import { ProductRail } from '../product/ProductRail';

/** Tab order for the homepage — collections that have products appear as pills. */
const tabSlugs = ['muslin-co-ord-sets', 'frocks', 'jablas-and-rompers', 'muslin-essentials'];

export function NewArrivalsTabs({ products }: { products: Product[] }) {
  const newArrivals = products.filter((p) => p.isNewArrival);
  const tabs = [
    { slug: 'all', name: 'All', items: newArrivals },
    ...tabSlugs
      .map((slug) => collections.find((c) => c.slug === slug)!)
      .map((c) => ({ slug: c.slug, name: c.name, items: newArrivals.filter(c.matches) }))
      .filter((t) => t.items.length > 0),
  ];
  const [activeSlug, setActiveSlug] = useState('all');
  const baseId = useId();
  const active = tabs.find((t) => t.slug === activeSlug) ?? tabs[0];

  if (!newArrivals.length) return null;

  const viewAllHref = active.slug === 'all' ? '/shop?sort=newest' : `/collections/${active.slug}`;

  return (
    <section aria-labelledby="new-title" className="container-page py-5 sm:py-7">
      <SectionHeading id="new-title" title="New" accent="Arrivals" align="center" />

      <div
        role="tablist"
        aria-label="New arrivals by category"
        className="scroll-row -mx-4 flex gap-2 overflow-x-auto [contain:paint] px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-3 sm:px-0"
        onKeyDown={(e) => {
          if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
          const i = tabs.indexOf(active);
          const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
          setActiveSlug(next.slug);
          document.getElementById(`${baseId}-tab-${next.slug}`)?.focus();
        }}
      >
        {tabs.map((tab) => {
          const selected = tab.slug === active.slug;
          return (
            <button
              key={tab.slug}
              id={`${baseId}-tab-${tab.slug}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveSlug(tab.slug)}
              className={cn(
                'min-h-10 shrink-0 rounded-full px-5 text-sm font-semibold whitespace-nowrap transition-colors',
                selected ? 'bg-ink text-white' : 'bg-ivory-deep text-ink/80 hover:bg-linen hover:text-ink',
              )}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center">
        <Link to={viewAllHref} className="link-underline text-sm font-semibold text-ink">
          View all {active.slug === 'all' ? 'products' : active.name.toLowerCase()} »
        </Link>
      </p>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.slug}`}
        className="mt-6 animate-fade-in"
        key={active.slug}
      >
        <ProductRail products={active.items} label={`${active.name} new arrivals`} />
      </div>
    </section>
  );
}
