import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Product } from '../../types/product';
import { cn } from '../../utils/format';
import { GarmentIllustration } from '../common/GarmentIllustration';
import { ResponsiveImage } from '../common/ResponsiveImage';

/**
 * Product gallery.
 *
 * Images are grouped into "slides": when a design has both a flat photo and a lifestyle
 * photo (`lifestyleIndex`), those two form one group — the thumbnails show one photo per
 * design, and the main image becomes a swipeable slider between the group's photos.
 * Other images are groups of one.
 *
 * Pass `active`/`onActiveChange` (an index into `product.images`) to control it from outside.
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
  const trackRef = useRef<HTMLDivElement>(null);
  const images = product.images;

  // Build groups of image indexes.
  const grouped = new Set<number>();
  const groups: number[][] = [];
  for (const d of product.designs ?? []) {
    const members = [d.imageIndex, d.lifestyleIndex, ...(d.extraIndexes ?? [])].filter(
      (i): i is number => i !== undefined && !!images[i],
    );
    if (members.length > 1) {
      groups.push(members);
      members.forEach((i) => grouped.add(i));
    }
  }
  images.forEach((_, i) => {
    if (!grouped.has(i)) groups.push([i]);
  });
  groups.sort((a, b) => a[0] - b[0]);

  const groupIndex = Math.max(0, groups.findIndex((g) => g.includes(active)));
  const group = groups[groupIndex] ?? [0];
  const slide = Math.max(0, group.indexOf(active));

  // Keep the slider's scroll position in sync with the active image.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const target = slide * track.clientWidth;
    if (Math.abs(track.scrollLeft - target) > 4) track.scrollTo({ left: target, behavior: 'smooth' });
  }, [slide, groupIndex]);

  if (!images.length) {
    return (
      <div className="aspect-square overflow-hidden rounded-[var(--radius-soft)]">
        <GarmentIllustration category={product.category} label="Genuine photos coming soon" />
      </div>
    );
  }

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (group[i] !== undefined && group[i] !== active) setActive(group[i]);
  };

  const arrowClass =
    'absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-[var(--shadow-whisper)] transition hover:bg-white disabled:opacity-0';

  return (
    <div className="flex min-w-0 flex-col gap-3 md:flex-row-reverse md:items-start md:gap-4">
      <div className="relative aspect-square min-w-0 flex-1 overflow-hidden rounded-[var(--radius-soft)] bg-ivory-deep">
        <div
          key={groupIndex}
          ref={trackRef}
          onScroll={onScroll}
          className="scroll-row flex h-full animate-fade-in overflow-x-auto [contain:paint]"
          aria-roledescription={group.length > 1 ? 'carousel' : undefined}
        >
          {group.map((imgIndex, i) => {
            const img = images[imgIndex];
            return (
              <div key={img.src} className="h-full w-full shrink-0" style={{ scrollSnapAlign: 'start' }}>
                <ResponsiveImage
                  image={img}
                  priority={groupIndex === 0 && i === 0}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className={cn('h-full w-full', img.width === img.height ? 'object-cover' : 'object-contain')}
                />
              </div>
            );
          })}
        </div>

        {group.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setActive(group[slide - 1])}
              disabled={slide === 0}
              className={cn(arrowClass, 'left-3')}
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setActive(group[slide + 1])}
              disabled={slide === group.length - 1}
              className={cn(arrowClass, 'right-3')}
              aria-label="Next photo"
            >
              <ChevronRight className="size-5" />
            </button>
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {group.map((imgIndex, i) => (
                <button
                  key={imgIndex}
                  type="button"
                  onClick={() => setActive(imgIndex)}
                  aria-label={`Photo ${i + 1} of ${group.length}`}
                  aria-current={i === slide}
                  className={cn(
                    'h-2 rounded-full bg-white shadow transition-all',
                    i === slide ? 'w-6' : 'w-2 opacity-60 hover:opacity-100',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {groups.length > 1 && (
        <div role="group" aria-label="Product images" className="flex gap-3 md:w-16 md:flex-col lg:w-20">
          {groups.map((g, gi) => {
            const img = images[g[0]];
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => setActive(g[0])}
                aria-label={`Show image ${gi + 1} of ${groups.length}`}
                aria-pressed={gi === groupIndex}
                className={cn(
                  'aspect-square max-w-[4.5rem] min-w-0 flex-1 overflow-hidden rounded-xl border-2 transition md:w-full md:max-w-none md:flex-none',
                  gi === groupIndex ? 'border-cocoa' : 'border-transparent opacity-75 hover:opacity-100',
                )}
              >
                <img
                  src={img.srcSet ? img.srcSet.split(' ')[0] : img.src}
                  alt=""
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
