import { Check } from 'lucide-react';
import type { FacetKey, Filters } from '../../utils/filters';
import { cn } from '../../utils/format';

type Option = { value: string; label: string; count: number };

const facetTitles: Record<FacetKey, string> = {
  style: 'Style',
  age: 'Age',
  size: 'Size',
  print: 'Print',
};

export function FilterPanel({
  filters,
  options,
  hidden = [],
  onToggle,
  onClear,
  activeCount,
}: {
  filters: Filters;
  options: Record<FacetKey, Option[]>;
  hidden?: FacetKey[];
  onToggle: (key: FacetKey, value: string) => void;
  onClear: () => void;
  activeCount: number;
}) {
  const facets = (Object.keys(facetTitles) as FacetKey[]).filter((k) => !hidden.includes(k) && options[k].length > 0);

  return (
    <div className="space-y-5">
      {facets.map((key) => (
        <fieldset key={key}>
          <legend className="eyebrow mb-1.5">{facetTitles[key]}</legend>
          <ul>
            {options[key].map((opt) => {
              const checked = (filters[key] as string[]).includes(opt.value);
              return (
                <li key={opt.value}>
                  <label className="group flex min-h-9 cursor-pointer items-center gap-2.5 rounded-lg px-1 text-[0.92rem] text-ink hover:text-brown has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-cocoa-deep">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(key, opt.value)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        'grid size-[1.1rem] shrink-0 place-items-center rounded-[5px] border transition',
                        checked ? 'border-brown bg-brown text-ivory' : 'border-brown/35 bg-white group-hover:border-brown',
                      )}
                    >
                      {checked && <Check className="size-3.5" strokeWidth={3} />}
                    </span>
                    <span className="flex-1">{opt.label}</span>
                    <span className="text-xs text-ink/60">{opt.count}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}

      <button
        type="button"
        onClick={onClear}
        disabled={activeCount === 0}
        className="text-sm font-semibold text-cocoa-deep underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:no-underline"
      >
        Clear all filters
      </button>
    </div>
  );
}
