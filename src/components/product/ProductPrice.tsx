import { useStock } from '../../hooks/useStock';
import type { Product } from '../../types/product';
import { cn, formatPrice } from '../../utils/format';

/**
 * Price from the Google Sheet when one is set (for the chosen design and size, if given),
 * otherwise the price in products.ts, otherwise "Price on request".
 * When designs or sizes are priced differently and none is chosen yet, it shows "From ₹…".
 */
export function ProductPrice({
  product,
  design,
  size,
  className,
}: {
  product: Product;
  design?: string;
  size?: string;
  className?: string;
}) {
  const live = useStock().price(product.slug, design, size);
  const price = live?.min ?? product.price;
  const was = live ? live.mrp : product.compareAtPrice;

  if (price === undefined) {
    return <p className={cn('text-ink/75', className)}>Price on request</p>;
  }
  const isRange = !!live && live.max > live.min;
  const onSale = !isRange && was !== undefined && was > price;
  return (
    <p className={cn('flex flex-wrap items-baseline gap-2 font-semibold text-brown', className)}>
      <span>
        {isRange && <span className="font-normal text-ink/60">From </span>}
        {formatPrice(price)}
      </span>
      {onSale && (
        <>
          <span className="sr-only">Previously</span>
          <s className="text-[0.9em] font-normal text-ink/55">{formatPrice(was!)}</s>
          <span className="rounded-full bg-blush-soft px-2 py-0.5 text-[0.7em] font-bold text-cocoa-deep">
            {Math.round(((was! - price) / was!) * 100)}% off
          </span>
        </>
      )}
    </p>
  );
}
