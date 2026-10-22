import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { getPrint } from '../../data/prints';
import { getSize, sortSizes } from '../../data/sizes';
import type { Product } from '../../types/product';
import { useStock } from '../../hooks/useStock';
import { buildProductEnquiryMessage } from '../../utils/whatsapp';
import { GarmentIllustration } from '../common/GarmentIllustration';
import { ResponsiveImage } from '../common/ResponsiveImage';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { ProductPrice } from './ProductPrice';

const cardSizes = '(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw';

export function ProductCard({ product, index = 0, priority = false }: { product: Product; index?: number; priority?: boolean }) {
  const [primary, secondary] = product.images;
  const href = `/products/${product.slug}`;
  const sizeText = sortSizes(product.availableSizes)
    .map((s) => getSize(s).label)
    .join(' · ');
  const print = getPrint(product.print);
  const stockLevel = useStock().level(product.slug);

  return (
    <article className="group flex h-full flex-col">
      <Link
        to={href}
        className="relative block aspect-square overflow-hidden rounded-[var(--radius-soft)] bg-ivory-deep"
        aria-label={`View details for ${product.name}`}
      >
        {primary ? (
          <>
            <ResponsiveImage
              image={primary}
              sizes={cardSizes}
              priority={priority}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {secondary && (
              <ResponsiveImage
                image={secondary}
                sizes={cardSizes}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <GarmentIllustration
            category={product.category}
            tone={index}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
        {stockLevel && stockLevel.tone !== 'ok' && (
          <span
            className={`absolute top-3 right-3 z-10 rounded-full px-2.5 py-1 text-[0.68rem] font-bold text-white ${
              stockLevel.tone === 'out' ? 'bg-ink/80' : 'bg-[#b5651d]'
            }`}
          >
            {stockLevel.label}
          </span>
        )}
        {print && print.family !== 'assorted' && print.family !== 'plain' && (
          <span className="absolute top-3 left-3 rounded-full bg-ivory/90 px-2.5 py-1 text-[0.66rem] font-bold tracking-[0.05em] text-brown uppercase backdrop-blur">
            {print.name}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[0.7rem] font-bold tracking-[0.06em] text-sage-deep uppercase">{product.style}</p>
        <h3 className="mt-1 text-[1.02rem] leading-snug sm:text-[1.1rem]">
          <Link to={href} className="hover:text-cocoa-deep">
            {product.name}
          </Link>
        </h3>
        <ProductPrice product={product} className="mt-1 text-[0.95rem]" />
        {(sizeText || product.designs) && (
          <p className="mt-1 text-xs text-ink/70">
            <span className="sr-only">Sizes: </span>
            {sizeText}
            {product.designs && product.designs.length > 1 && (
              <span className="text-cocoa-deep"> · {product.designs.length} designs</span>
            )}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-3">
          <Link
            to={href}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brown hover:text-cocoa-deep"
          >
            View details
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <WhatsAppButton variant="compact" label="Enquire" message={buildProductEnquiryMessage(product)} />
        </div>
      </div>
    </article>
  );
}
