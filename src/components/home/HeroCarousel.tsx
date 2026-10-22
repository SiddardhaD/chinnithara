import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import type { Banner } from '../../types/product';
import { cn } from '../../utils/format';
import { GarmentIllustration } from '../common/GarmentIllustration';
import { CloudMotif, MoonMotif } from '../common/Motifs';

const AUTOPLAY_MS = 6000;

const toneClass: Record<Banner['tone'], string> = {
  blush: 'bg-blush-soft',
  sage: 'bg-sage-soft',
  linen: 'bg-linen',
  cream: 'bg-logo-cream',
};

function SlideMedia({ banner, priority }: { banner: Banner; priority: boolean }) {
  if (banner.image) {
    return (
      <img
        src={banner.image.src}
        srcSet={banner.image.srcSet}
        sizes="(min-width: 1024px) 40vw, 88vw"
        width={banner.image.width}
        height={banner.image.height}
        alt={banner.image.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className="h-full w-full object-cover"
        style={{ objectPosition: banner.image.objectPosition }}
      />
    );
  }
  if (banner.emblem) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-logo-cream">
        <img
          src="/images/brand/chinnithara-emblem-480.webp"
          alt="The ChinniThara emblem: a baby asleep on a golden crescent moon"
          width={480}
          height={340}
          loading={priority ? 'eager' : 'lazy'}
          className="h-[80%] w-auto"
        />
      </div>
    );
  }
  return (
    <GarmentIllustration
      category={banner.illustration ?? 'frocks'}
      label="Photos coming soon"
      tone={banner.tone === 'sage' ? 1 : banner.tone === 'blush' ? 0 : 2}
    />
  );
}

/**
 * Peek carousel: the active slide is centred with its neighbours visible on both sides.
 * Swipe or scroll natively; arrows, dots and autoplay drive the same scroll position.
 * Autoplay pauses on hover, keyboard focus, touch, hidden tabs and reduced-motion.
 */
export function HeroCarousel({ banners, startIndex = 1 }: { banners: Banner[]; startIndex?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const initial = banners.length > 2 ? Math.min(startIndex, banners.length - 1) : 0;
  const [active, setActive] = useState(initial);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number, smooth = true) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  // Start centred on the initial slide (no animation).
  useEffect(() => {
    goTo(initial, false);
  }, [goTo, initial]);

  // Track which slide is nearest the centre.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const centre = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDistance = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const el = child as HTMLElement;
          const distance = Math.abs(el.offsetLeft + el.clientWidth / 2 - centre);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = i;
          }
        });
        setActive(best);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Autoplay.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduceMotion || banners.length < 2) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      goTo((active + 1) % banners.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [active, paused, banners.length, goTo]);

  if (!banners.length) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative pt-3 pb-2 sm:pt-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        className="scroll-row flex gap-3 overflow-x-auto [contain:paint] px-[6%] sm:gap-5 lg:px-[13%]"
      >
        {banners.map((banner, i) => (
          <article
            key={banner.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${banners.length}: ${banner.title}`}
            aria-hidden={i !== active}
            style={{ scrollSnapAlign: 'center' }}
            onClick={i === active ? undefined : () => goTo(i)}
            className={cn(
              'relative grid w-[88%] shrink-0 overflow-hidden rounded-[1.5rem] transition-opacity duration-500 lg:w-[74%] lg:rounded-[2rem]',
              banner.layout === 'full' ? 'xl:block xl:h-[28rem]' : 'lg:grid-cols-[1fr_1.15fr]',
              toneClass[banner.tone],
              i === active ? 'opacity-100' : 'cursor-pointer opacity-60',
            )}
          >
            <div
              className={cn(
                'overflow-hidden',
                banner.layout === 'full'
                  ? 'aspect-video xl:absolute xl:inset-0 xl:aspect-auto'
                  : 'aspect-[16/10] lg:order-2 lg:aspect-auto lg:h-[26rem] xl:h-[28rem]',
              )}
            >
              <SlideMedia banner={banner} priority={i === initial} />
            </div>
            {banner.layout === 'full' && (
              <div
                aria-hidden="true"
                className="absolute inset-0 hidden bg-gradient-to-r from-white/95 via-white/70 via-25% to-transparent to-50% xl:block"
              />
            )}
            <div
              className={cn(
                'relative flex flex-col justify-center px-5 pt-5 pb-6 sm:px-8',
                banner.layout === 'full'
                  ? 'lg:px-10 lg:py-7 xl:absolute xl:inset-y-0 xl:left-0 xl:w-[18rem] xl:py-10 xl:pr-0 xl:pl-11'
                  : 'lg:order-1 lg:px-12 lg:py-10',
              )}
            >
              {banner.layout !== 'full' && (
                <MoonMotif className="absolute top-6 right-6 hidden size-8 text-gold lg:block" />
              )}
              <p className="eyebrow mb-2 sm:mb-3">{banner.eyebrow}</p>
              <h2
                className={cn(
                  'text-[1.5rem] leading-[1.15] sm:text-3xl',
                  banner.layout === 'full' ? 'lg:text-[1.9rem] xl:text-[2.2rem]' : 'lg:text-[2.5rem]',
                )}
              >
                {banner.title}
                {banner.titleAccent && (
                  <>
                    <br />
                    <em className="font-medium text-cocoa">{banner.titleAccent}</em>
                  </>
                )}
              </h2>
              <p className={cn('mt-3 max-w-sm text-sm text-ink/75 sm:text-base lg:mt-4', banner.layout === 'full' && 'xl:hidden')}>
                {banner.text}
              </p>
              <Link
                to={banner.cta.to}
                tabIndex={i === active ? 0 : -1}
                className="btn btn-primary mt-5 self-start lg:mt-7"
              >
                {banner.cta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              {banner.layout !== 'full' && (
                <CloudMotif className="absolute bottom-5 right-8 hidden w-20 text-gold/70 lg:block" />
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Arrows (desktop) */}
      <button
        type="button"
        onClick={() => goTo((active - 1 + banners.length) % banners.length)}
        className="absolute top-1/2 left-[7%] hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-[var(--shadow-whisper)] transition hover:bg-white lg:grid"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => goTo((active + 1) % banners.length)}
        className="absolute top-1/2 right-[7%] hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-[var(--shadow-whisper)] transition hover:bg-white lg:grid"
        aria-label="Next slide"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2" role="group" aria-label="Choose slide">
        {banners.map((banner, i) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${banner.title}`}
            aria-current={i === active}
            className="grid size-6 place-items-center"
          >
            <span
              className={cn(
                'block h-1.5 rounded-full transition-all duration-300',
                i === active ? 'w-6 bg-ink' : 'w-1.5 bg-ink/25',
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
