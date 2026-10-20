import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import type { Product } from '../../types/product';
import { cn } from '../../utils/format';
import { ResponsiveImage } from '../common/ResponsiveImage';

/** Dot colours for the swaddle designs (keyed by design id). */
const dotColour: Record<string, string> = {
  'sage-sprigs': '#8fb04a',
  'pink-peaches': '#f2c4c8',
  'aqua-toucans': '#a9dfe6',
  'rust-blossoms': '#d9693f',
};

/**
 * Homepage spotlight for products whose designs have a flat + "in use" photo:
 * the two photos sit side by side and colour dots switch the design.
 */
export function SwaddleSpotlight({ product }: { product: Product | undefined }) {
  const designs = product?.designs?.filter((d) => d.lifestyleIndex !== undefined) ?? [];
  const [activeId, setActiveId] = useState(designs[0]?.id);
  if (!product || !designs.length) return null;
  const active = designs.find((d) => d.id === activeId) ?? designs[0];
  const flat = product.images[active.imageIndex];
  const worn = product.images[active.lifestyleIndex!];

  return (
    <section aria-labelledby="swaddle-title" className="container-page py-5 sm:py-7">
      <div className="grid items-center gap-6 overflow-hidden rounded-[2rem] bg-ivory-deep p-4 sm:p-6 lg:grid-cols-[1.35fr_1fr] lg:gap-10 lg:p-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[flat, worn].map((img, i) => (
            <figure key={img.src} className="relative overflow-hidden rounded-[1.25rem] bg-white">
              <ResponsiveImage
                image={img}
                sizes="(min-width: 1024px) 28vw, 45vw"
                className="aspect-square w-full animate-fade-in object-cover"
              />
              <figcaption className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.68rem] font-bold text-ink backdrop-blur sm:top-3 sm:left-3 sm:text-xs">
                {i === 0 ? 'Unwrapped' : 'All snug'}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="px-1 pb-2 lg:px-0 lg:pb-0">
          <p className="eyebrow mb-2">New · 100 × 100 cm</p>
          <h2 id="swaddle-title" className="text-[1.6rem] sm:text-[2rem]">
            Muslin <span className="text-cocoa">swaddles</span>
          </h2>
          <p className="mt-3 max-w-md text-ink/75">
            Soft, crinkled muslin that’s big enough to wrap your little one snugly — in four sweet designs.
          </p>

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-ink">
              Design: <span className="font-normal text-ink/70">{active.name}</span>
            </p>
            <div role="radiogroup" aria-label="Swaddle design" className="flex gap-2.5">
              {designs.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  role="radio"
                  aria-checked={d.id === active.id}
                  aria-label={d.name}
                  title={d.name}
                  onClick={() => setActiveId(d.id)}
                  className={cn(
                    'size-9 rounded-full border-2 border-white shadow-[var(--shadow-whisper)] transition',
                    d.id === active.id ? 'ring-2 ring-ink ring-offset-2 ring-offset-ivory-deep' : 'hover:scale-110',
                  )}
                  style={{ background: dotColour[d.id] ?? '#ddd' }}
                />
              ))}
            </div>
          </div>

          <Link to={`/products/${product.slug}?design=${active.id}`} className="btn btn-primary mt-6">
            Shop {active.name}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
