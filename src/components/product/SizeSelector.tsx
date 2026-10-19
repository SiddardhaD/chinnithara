import { forwardRef, useId } from 'react';
import { getSize, sortSizes } from '../../data/sizes';
import type { SizeCode } from '../../types/product';
import { cn } from '../../utils/format';

type Props = {
  sizes: SizeCode[];
  value: SizeCode | null;
  onChange: (size: SizeCode) => void;
  error?: string;
};

/** Accessible size picker built on native radio inputs (arrow keys work out of the box). */
export const SizeSelector = forwardRef<HTMLFieldSetElement, Props>(function SizeSelector(
  { sizes, value, onChange, error },
  ref,
) {
  const name = useId();
  const errorId = `${name}-error`;

  return (
    <fieldset ref={ref} tabIndex={-1} aria-describedby={error ? errorId : undefined} className="focus:outline-none">
      <legend className="mb-3 text-sm font-semibold text-brown">
        Size
        {value && getSize(value).kind === 'age' && (
          <span className="font-normal text-ink/75"> — {getSize(value).ageRange}</span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {sortSizes(sizes).map((code) => {
          const size = getSize(code);
          const checked = value === code;
          return (
            <label
              key={code}
              className={cn(
                'relative flex min-h-11 min-w-[4.5rem] cursor-pointer items-center justify-center rounded-full border px-4 text-sm font-semibold transition',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cocoa-deep',
                checked
                  ? 'border-brown bg-brown text-ivory'
                  : 'border-brown/30 text-brown hover:border-brown',
                error && !checked && 'border-cocoa',
              )}
            >
              <input
                type="radio"
                name={name}
                value={code}
                checked={checked}
                onChange={() => onChange(code)}
                className="sr-only"
              />
              {size.label}
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
