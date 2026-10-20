import { forwardRef, useId } from 'react';
import type { Product, ProductDesign } from '../../types/product';
import { cn } from '../../utils/format';

type Props = {
  product: Product;
  value: ProductDesign | null;
  onChange: (design: ProductDesign) => void;
  error?: string;
  /** Live stock: true when a design is sold out (shown dimmed, still selectable for restock enquiries). */
  isSoldOut?: (designId: string) => boolean;
};

/** Photo swatches for products that come in several designs (native radios underneath). */
export const DesignSelector = forwardRef<HTMLFieldSetElement, Props>(function DesignSelector(
  { product, value, onChange, error, isSoldOut },
  ref,
) {
  const name = useId();
  const errorId = `${name}-error`;
  const designs = product.designs ?? [];

  return (
    <fieldset ref={ref} tabIndex={-1} aria-describedby={error ? errorId : undefined} className="focus:outline-none">
      <legend className="mb-3 text-sm font-semibold text-brown">
        Design{value ? <span className="font-normal text-ink/75"> — {value.name}</span> : ` (${designs.length})`}
      </legend>
      <div className="flex flex-wrap gap-3">
        {designs.map((design) => {
          const image = product.images[design.imageIndex];
          const checked = value?.id === design.id;
          return (
            <label
              key={design.id}
              title={design.name}
              className={cn(
                'relative block size-16 cursor-pointer overflow-hidden rounded-2xl border-2 transition sm:size-[4.5rem]',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cocoa-deep',
                checked ? 'border-ink' : error ? 'border-cocoa/60' : 'border-transparent hover:border-ink/30',
              )}
            >
              <input
                type="radio"
                name={name}
                value={design.id}
                checked={checked}
                onChange={() => onChange(design)}
                className="sr-only"
              />
              <span className="sr-only">
                {design.name}
                {isSoldOut?.(design.id) && ' (sold out)'}
              </span>
              {isSoldOut?.(design.id) && (
                <span className="absolute inset-0 z-10 grid place-items-center bg-white/55 text-[0.6rem] font-bold text-ink uppercase">
                  Sold out
                </span>
              )}
              {image && (
                <img
                  src={image.srcSet ? image.srcSet.split(' ')[0] : image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  className="h-full w-full scale-[1.35] object-cover"
                />
              )}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm font-semibold text-cocoa-deep">
          {error}
        </p>
      )}
    </fieldset>
  );
});
