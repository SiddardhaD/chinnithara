import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

/** A horizontally scrolling row of product cards, with arrow buttons on larger screens. */
export function ProductRail({ products, label }: { products: Product[]; label: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        aria-label={label}
        className="scroll-row -mx-4 flex gap-4 overflow-x-auto [contain:paint] px-4 py-1 sm:-mx-6 sm:gap-6 sm:px-6 lg:mx-0 lg:px-0"
      >
        {products.map((product, i) => (
          <li key={product.id} className="w-[64%] shrink-0 sm:w-[40%] md:w-[30%] lg:w-[23%] xl:w-[19%]">
            <ProductCard product={product} index={i} />
          </li>
        ))}
      </ul>
      {products.length > 4 && (
        <>
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="absolute top-[34%] -left-5 hidden size-11 place-items-center rounded-full bg-white text-ink shadow-[var(--shadow-whisper)] transition hover:bg-ivory-deep lg:grid"
            aria-label={`Scroll ${label} left`}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="absolute top-[34%] -right-5 hidden size-11 place-items-center rounded-full bg-white text-ink shadow-[var(--shadow-whisper)] transition hover:bg-ivory-deep lg:grid"
            aria-label={`Scroll ${label} right`}
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}
    </div>
  );
}
