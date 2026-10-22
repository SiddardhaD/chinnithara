import { Quote } from 'lucide-react';
import { Link } from 'react-router';
import { getProductName } from '../../services/catalog';
import { testimonials } from '../../data/testimonials';
import { buildGeneralMessage } from '../../utils/whatsapp';
import { CottonMotif, MoonMotif } from '../common/Motifs';
import { SectionHeading } from '../common/SectionHeading';
import { WhatsAppButton } from '../common/WhatsAppButton';

/**
 * Real customer reviews from `data/testimonials.ts`. While there are none, an honest
 * invitation to share feedback is shown instead. We never make reviews up.
 */
export function Testimonials() {
  if (!testimonials.length) {
    return (
      <section aria-labelledby="reviews-title" className="container-page py-5 sm:py-7">
        <div className="relative overflow-hidden rounded-[2rem] bg-ivory-deep px-6 py-8 text-center sm:px-12 sm:py-10">
          <MoonMotif className="absolute top-6 left-6 size-10 text-gold/80" />
          <CottonMotif className="absolute right-6 bottom-6 size-12 text-sage/70" />
          <SectionHeading id="reviews-title" title="Little words from" accent="our families" align="center" />
          <p className="mx-auto -mt-2 max-w-lg text-ink/75">
            We’re a new boutique, and our first little ones are just getting dressed. Once parents share their
            experience, their words will appear right here.
          </p>
          <div className="mx-auto mt-7 max-w-xs">
            <WhatsAppButton
              variant="outline"
              label="Share your experience"
              message={buildGeneralMessage(undefined, 'I’d love to share my experience with ChinniThara:')}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="reviews-title" className="container-page py-5 sm:py-7">
      <SectionHeading id="reviews-title" title="Little words from" accent="our families" align="center" />
      <ul className="scroll-row -mx-4 flex gap-4 overflow-x-auto px-4 scroll-px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {testimonials.map((t) => {
          const productName = t.productSlug ? getProductName(t.productSlug) : undefined;
          return (
            <li key={t.id} className="w-[85%] shrink-0 sm:w-auto">
              <figure className="flex h-full flex-col rounded-[var(--radius-soft)] border border-ink/10 bg-white p-6">
                <div className="flex items-center gap-3">
                  {t.photo ? (
                    <img
                      src={t.photo.src}
                      alt={t.photo.alt}
                      width={t.photo.width}
                      height={t.photo.height}
                      loading="lazy"
                      className="size-14 rounded-2xl object-cover"
                    />
                  ) : (
                    <span className="grid size-14 place-items-center rounded-2xl bg-blush-soft font-display text-2xl text-cocoa-deep">
                      {t.name.charAt(0)}
                    </span>
                  )}
                  <figcaption>
                    <p className="font-semibold text-ink">{t.name}</p>
                    {t.source && <p className="text-xs text-ink/60">via {t.source}</p>}
                  </figcaption>
                </div>
                <blockquote className="mt-4 flex-1 text-ink/85">
                  <Quote className="mb-2 size-5 text-gold" aria-hidden="true" />
                  {t.quote}
                </blockquote>
                {productName && t.productSlug && (
                  <Link
                    to={`/products/${t.productSlug}`}
                    className="mt-5 border-t border-ink/10 pt-4 text-sm font-semibold text-cocoa-deep hover:underline"
                  >
                    {productName}
                  </Link>
                )}
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
