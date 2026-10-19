import { Info, Minus, Plus, Truck, WashingMachine } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductRail } from '../components/product/ProductRail';
import { ProductPrice } from '../components/product/ProductPrice';
import { SizeGuide } from '../components/product/SizeGuide';
import { DesignSelector } from '../components/product/DesignSelector';
import { SizeSelector } from '../components/product/SizeSelector';
import { getCategory } from '../data/categories';
import { getPrint } from '../data/prints';
import { getSize, isAgeSize } from '../data/sizes';
import { useProduct } from '../hooks/useCatalog';
import { usePageMeta } from '../hooks/usePageMeta';
import type { Availability, Closure, ProductDesign, SizeCode } from '../types/product';
import { buildOrderMessage } from '../utils/whatsapp';
import { NotFoundPage } from './NotFoundPage';

const MAX_QTY = 10;

/** General guidance — shown only when a product has no specific care instructions. */
const generalMuslinCare = [
  'Gentle machine or hand wash in cold water with similar colours.',
  'Use a mild detergent; avoid bleach.',
  'Dry in shade and iron on low heat if needed.',
];

const availabilityText: Record<Availability, string> = {
  'in-stock': 'In stock',
  limited: 'Limited pieces',
  'sold-out': 'Sold out',
};

const closureText: Record<Closure, string> = {
  zip: 'Zip',
  button: 'Buttons',
  'press-stud': 'Press studs',
  'side-button': 'Side buttons',
  'shoulder-knot': 'Shoulder ties',
};

function InfoBlock({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <details className="group border-b border-brown/15 py-1">
      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 font-semibold text-brown [&::-webkit-details-marker]:hidden">
        <span className="text-cocoa" aria-hidden="true">
          {icon}
        </span>
        {title}
        <span className="ml-auto text-xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="pb-5 pl-8 text-[0.95rem] text-ink/85">{children}</div>
    </details>
  );
}

export function ProductPage() {
  const { slug } = useParams();
  const { product, related } = useProduct(slug);
  const [size, setSize] = useState<SizeCode | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState('');
  const sizeRef = useRef<HTMLFieldSetElement>(null);
  const [design, setDesign] = useState<ProductDesign | null>(null);
  const [designError, setDesignError] = useState('');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const designRef = useRef<HTMLFieldSetElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  usePageMeta({
    title: product?.name ?? 'Product not found',
    description: product ? `${product.summary} Sizes and orders via WhatsApp.` : 'This product could not be found.',
    path: `/products/${slug ?? ''}`,
    image: product?.images[0]?.src,
    type: 'product',
    noindex: !product,
  });

  // Reset selections when navigating between products. A size is never preselected —
  // customers choose it explicitly before an order enquiry can be generated.
  useEffect(() => {
    setSize(null);
    setDesign(null);
    setDesignError('');
    setGalleryIndex(0);
    setQuantity(1);
    setSizeError('');
  }, [product]);

  // Mobile: show the sticky order bar only once the main CTA scrolls out of view.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setShowStickyCta(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    observer.observe(el);
    return () => observer.disconnect();
  }, [product]);

  if (!product) return <NotFoundPage />;

  const category = getCategory(product.category);
  const print = getPrint(product.print);
  const soldOut = product.availability === 'sold-out';
  const needsDesign = !!product.designs?.length;
  const ready = !!size && (!needsDesign || !!design);
  const message = ready && size ? buildOrderMessage(product, size, quantity, design) : null;
  const ctaLabel = soldOut ? 'Ask about restocking' : 'Order on WhatsApp';

  const requireSize = () => {
    // Point to the first missing choice: design, then size.
    if (needsDesign && !design) {
      setDesignError('Please choose a design first.');
      designRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      designRef.current?.focus({ preventScroll: true });
      if (!size) setSizeError('Please choose a size too.');
      return;
    }
    setSizeError('Please choose a size first so we can prepare your order enquiry.');
    sizeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    sizeRef.current?.focus({ preventScroll: true });
  };

  const details: Array<[string, string | undefined]> = [
    ['Style', product.style],
    ['Print', print?.name],
    ['Colour', product.colour],
    ['Fabric', product.fabric],
    ['Closure', product.closure ? closureText[product.closure] : undefined],
  ];

  return (
    <>
      <div className="container-page pt-4 pb-8 sm:pt-6 lg:pb-12">
        <Breadcrumbs
          items={[
            { label: 'Shop All', to: '/shop' },
            ...(category ? [{ label: category.name, to: `/shop?style=${category.slug}` }] : []),
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:mt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <ProductGallery
            product={product}
            active={galleryIndex}
            onActiveChange={(i) => {
              setGalleryIndex(i);
              // Tapping a design's photo also selects that design.
              const match = product.designs?.find((d) => d.imageIndex === i);
              if (match) {
                setDesign(match);
                setDesignError('');
              }
            }}
          />

          <div className="lg:sticky lg:top-36 lg:self-start">
            <p className="eyebrow">{product.style}</p>
            <h1 className="mt-2 text-[1.75rem] sm:text-4xl">{product.name}</h1>
            <ProductPrice product={product} className="mt-3 text-xl" />

            {product.listingStatus === 'draft' && (
              <p className="mt-4 flex gap-2 rounded-2xl bg-gold-soft/50 px-4 py-3 text-sm text-ink">
                <Info className="mt-0.5 size-4 shrink-0 text-cocoa-deep" aria-hidden="true" />
                Photos and pricing for this style are coming soon. Send us an enquiry and we’ll share the designs
                currently available.
              </p>
            )}

            <div className="mt-6 space-y-3 text-[1.02rem] text-ink/85">
              {product.description.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-y border-brown/15 py-5 text-sm">
              {details
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt className="font-semibold text-brown">{label}</dt>
                    <dd className="text-ink/85">{value}</dd>
                  </div>
                ))}
              <dt className="font-semibold text-brown">Availability</dt>
              <dd className="text-ink/85">
                {product.availability ? availabilityText[product.availability] : 'Confirmed when you enquire on WhatsApp'}
              </dd>
            </dl>

            <div className="mt-7 space-y-6">
              {needsDesign && (
                <DesignSelector
                  ref={designRef}
                  product={product}
                  value={design}
                  onChange={(d) => {
                    setDesign(d);
                    setDesignError('');
                    setGalleryIndex(d.imageIndex);
                  }}
                  error={designError}
                />
              )}

              <SizeSelector
                ref={sizeRef}
                sizes={product.availableSizes}
                value={size}
                onChange={(s) => {
                  setSize(s);
                  setSizeError('');
                }}
                error={sizeError}
              />

              <div>
                <p id="qty-label" className="mb-3 text-sm font-semibold text-brown">
                  Quantity
                </p>
                <div role="group" aria-labelledby="qty-label" className="inline-flex items-center rounded-full border border-brown/30">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="grid size-11 place-items-center rounded-full text-brown hover:bg-brown/5 disabled:opacity-35"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-4" />
                  </button>
                  <output aria-live="polite" className="w-10 text-center font-semibold text-brown">
                    {quantity}
                  </output>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(MAX_QTY, q + 1))}
                    disabled={quantity >= MAX_QTY}
                    className="grid size-11 place-items-center rounded-full text-brown hover:bg-brown/5 disabled:opacity-35"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <div ref={ctaRef}>
                <WhatsAppButton message={message} label={ctaLabel} onNotReady={requireSize} className="w-full" />
                <p className="mt-3 text-xs leading-relaxed text-ink/70">
                  This opens WhatsApp with your selection filled in. Your order is confirmed only after we reply with
                  availability, price and delivery details.
                </p>
              </div>

              {product.availableSizes.some(isAgeSize) && <SizeGuide highlight={product.availableSizes} />}
            </div>

            <div className="mt-8 border-t border-brown/15">
              <InfoBlock icon={<WashingMachine className="size-5" />} title="Care">
                {product.washCare ? (
                  <ul className="list-disc space-y-1 pl-4">
                    {product.washCare.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <p className="mb-2">General care tips for muslin — always check the garment label first:</p>
                    <ul className="list-disc space-y-1 pl-4">
                      {generalMuslinCare.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </>
                )}
              </InfoBlock>
              <InfoBlock icon={<Truck className="size-5" />} title="Delivery & exchanges">
                <p>
                  Delivery charges and timelines are shared on WhatsApp before you pay. Read our{' '}
                  <Link to="/shipping-delivery" className="text-cocoa-deep underline underline-offset-2">
                    Shipping & Delivery
                  </Link>{' '}
                  and{' '}
                  <Link to="/returns-exchanges" className="text-cocoa-deep underline underline-offset-2">
                    Returns & Exchanges
                  </Link>{' '}
                  policies for details.
                </p>
              </InfoBlock>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="container-page">
          <SectionHeading id="related-title" eyebrow="You may also love" title="More little favourites" />
          <ProductRail products={related} label="Related products" />
        </section>
      )}

      {/* Mobile sticky CTA — appears only after the main button scrolls away. */}
      <div
        className={`safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-brown/10 bg-white/95 px-4 pt-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
          showStickyCta ? 'translate-y-0' : 'pointer-events-none translate-y-full'
        }`}
        aria-hidden={!showStickyCta}
        inert={!showStickyCta}
      >
        <div className="mx-auto flex max-w-xl items-center gap-3 pb-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg text-brown">{product.name}</p>
            <p className="text-xs text-ink/70">{ready && size
                ? `${design ? `${design.name} · ` : ''}Size ${getSize(size).label} · Qty ${quantity}`
                : needsDesign
                  ? 'Choose a design and size'
                  : 'Choose a size to order'}</p>
          </div>
          <div className="w-44 shrink-0">
            <WhatsAppButton message={message} label="Order" onNotReady={requireSize} />
          </div>
        </div>
      </div>
    </>
  );
}
