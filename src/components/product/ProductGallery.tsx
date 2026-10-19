import { useState } from 'react';
import type { Product } from '../../types/product';
import { cn } from '../../utils/format';
import { GarmentIllustration } from '../common/GarmentIllustration';
import { ResponsiveImage } from '../common/ResponsiveImage';

/**
 * Main image + thumbnails. Pass `active`/`onActiveChange` to control it from outside
 * (the product page does this so choosing a design shows that design's photo).
 */
export function ProductGallery({
  product,
  active: controlledActive,
  onActiveChange,
}: {
  product: Product;
  active?: number;
  onActiveChange?: (index: number) => void;
}) {
  const [internalActive, setInternalActive] = useState(0);
  const active = controlledActive ?? internalActive;
  const setActive = (i: number) => {
    setInternalActive(i);
    onActiveChange?.(i);
  };
  const images = product.images;

  if (!images.length) {
    return (
      <div className="aspect-square overflow-hidden rounded-[var(--radius-soft)]">
        <GarmentIllustration category={product.category} label="Genuine photos coming soon" />
      </div>
    );
  }

  const current = images[Math.min(active, images.length - 1)];
  const isSquare = current.width === current.height;

  return (
    <div className="flex min-w-0 flex-col gap-3 md:flex-row-reverse md:items-start md:gap-4">
      <div className="relative aspect-square min-w-0 flex-1 overflow-hidden rounded-[var(--radius-soft)] bg-ivory-deep">
        <ResponsiveImage
          key={current.src}
          image={current}
          priority={active === 0}
          sizes="(min-width: 1024px) 46vw, 100vw"
          className={cn('h-full w-full animate-fade-in', isSquare ? 'object-cover' : 'object-contain')}
        />
      </div>

      {images.length > 1 && (
        <div role="group" aria-label="Product images" className="flex gap-3 md:w-16 md:flex-col lg:w-20">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-pressed={i === active}
              className={cn(
                'aspect-square max-w-[4.5rem] min-w-0 flex-1 overflow-hidden rounded-xl border-2 transition md:w-full md:max-w-none md:flex-none',
                i === active ? 'border-cocoa' : 'border-transparent opacity-75 hover:opacity-100',
              )}
            >
              <img
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
