import { Link } from 'react-router';
import type { Product } from '../../types/product';
import { SectionHeading } from '../common/SectionHeading';
import { ProductGrid } from '../product/ProductGrid';

/** Homepage section for curated kits. Hidden when there are none. */
export function KitsShowcase({ products }: { products: Product[] }) {
  const kits = products.filter((p) => p.category === 'kits');
  if (!kits.length) return null;
  return (
    <section aria-labelledby="kits-title" className="container-page py-5 sm:py-7">
      <div className="rounded-[2rem] bg-gradient-to-br from-logo-cream via-white to-sage-soft px-4 py-7 sm:px-8 sm:py-10">
        <SectionHeading
          id="kits-title"
          title="Baby Essentials"
          accent="Kits"
          align="center"
          description="Hand-picked muslin sets, ready to gift or to use every day."
        />
        <ProductGrid products={kits} columns={3} />
        <p className="mt-6 text-center">
          <Link to="/collections/baby-essentials-kits" className="link-underline text-sm font-semibold text-ink">
            View all kits »
          </Link>
        </p>
      </div>
    </section>
  );
}
