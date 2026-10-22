import type { Product } from '../../types/product';
import { cn } from '../../utils/format';
import { ProductCard } from './ProductCard';

/**
 * `grid` shows 2 columns on mobile and 3 or 4 on larger screens.
 * `carousel` is a swipeable row on phones and a normal grid from `md` up.
 */
export function ProductGrid({
  products,
  columns = 4,
  priorityCount = 0,
  layout = 'grid',
}: {
  products: Product[];
  columns?: 3 | 4;
  priorityCount?: number;
  layout?: 'grid' | 'carousel';
}) {
  const carousel = layout === 'carousel';
  return (
    <ul
      className={cn(
        carousel
          ? 'scroll-row -mx-4 flex gap-4 overflow-x-auto px-4 scroll-px-4 pb-2 sm:-mx-6 sm:px-6 sm:scroll-px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-10 md:overflow-visible md:px-0 md:pb-0'
          : 'grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3',
        columns === 4 && 'xl:grid-cols-4',
      )}
    >
      {products.map((product, i) => (
        <li key={product.id} className={cn(carousel && 'w-[64%] shrink-0 sm:w-[40%] md:w-auto')}>
          <ProductCard product={product} index={i} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
