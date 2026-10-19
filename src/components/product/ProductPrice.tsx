import type { Product } from '../../types/product';
import { cn, formatPrice } from '../../utils/format';

export function ProductPrice({ product, className }: { product: Product; className?: string }) {
  if (product.price === undefined) {
    return <p className={cn('text-ink/75', className)}>Price on request</p>;
  }
  const onSale = product.compareAtPrice !== undefined && product.compareAtPrice > product.price;
  return (
    <p className={cn('flex flex-wrap items-baseline gap-2 font-semibold text-brown', className)}>
      <span>{formatPrice(product.price)}</span>
      {onSale && (
        <>
          <span className="sr-only">Previously</span>
          <s className="text-[0.9em] font-normal text-ink/55">{formatPrice(product.compareAtPrice!)}</s>
        </>
      )}
    </p>
  );
}
