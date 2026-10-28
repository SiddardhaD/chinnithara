import { Gift } from 'lucide-react';
import { Link } from 'react-router';
import { useProducts } from '../../hooks/useCatalog';
import { useStock } from '../../hooks/useStock';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/format';

/**
 * "What's inside" list for kits. Each piece links to its own product page with the same
 * design selected. When every piece has a price in the sheet, it also shows what the
 * pieces would cost bought separately.
 */
export function KitContents({ kit }: { kit: Product }) {
  const { products } = useProducts();
  const stock = useStock();
  const items = (kit.kitItems ?? [])
    .map((item) => {
      const product = products.find((p) => p.slug === item.productSlug);
      if (!product) return null;
      const design = product.designs?.find((d) => d.id === item.designId);
      const image = product.images[design?.imageIndex ?? 0];
      const price = stock.price(product.slug, design?.id)?.min ?? product.price;
      return { item, product, design, image, price };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
  if (!items.length) return null;

  const pieces = items.reduce((n, x) => n + x.item.qty, 0);
  const allPriced = items.every((x) => x.price !== undefined);
  const worth = allPriced ? items.reduce((sum, x) => sum + x.price! * x.item.qty, 0) : undefined;

  return (
    <section aria-labelledby="kit-title" className="rounded-2xl border border-brown/15 bg-ivory-deep/60 p-4">
      <h2 id="kit-title" className="flex items-center gap-2 text-sm font-semibold text-brown">
        <Gift className="size-4 text-cocoa" aria-hidden="true" />
        What’s inside
        <span className="font-normal text-ink/60">· {pieces} pieces</span>
      </h2>
      <ul className="mt-3 divide-y divide-ink/8">
        {items.map(({ item, product, design, image }) => (
          <li key={`${product.slug}-${design?.id ?? ''}`}>
            <Link
              to={`/products/${product.slug}${design ? `?design=${design.id}` : ''}`}
              className="group flex items-center gap-3 py-2.5"
            >
              {image && (
                <img
                  src={image.srcSet ? image.srcSet.split(' ')[0] : image.src}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  className="size-14 shrink-0 rounded-xl object-cover"
                />
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink group-hover:text-cocoa-deep">
                  {item.qty > 1 && `${item.qty} × `}
                  {product.name}
                </span>
                {design && <span className="block text-xs text-ink/60">{design.name}</span>}
              </span>
              <span className="text-xs font-semibold text-cocoa-deep opacity-0 transition group-hover:opacity-100">View →</span>
            </Link>
          </li>
        ))}
      </ul>
      {worth !== undefined && (
        <p className="mt-2 border-t border-ink/8 pt-3 text-sm text-ink/70">
          Worth <span className="font-semibold text-ink">{formatPrice(worth)}</span> if bought separately.
        </p>
      )}
    </section>
  );
}
