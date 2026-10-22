import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import type { Product } from '../../types/product';
import {
  activeFilterCount,
  applyFilters,
  facetOptions,
  filtersToParams,
  parseFilters,
  sortOptions,
  type FacetKey,
  type Filters,
  type SortValue,
} from '../../utils/filters';
import { EmptyState } from '../common/EmptyState';
import { FilterPanel } from './FilterPanel';
import { ProductGrid } from './ProductGrid';

/**
 * Search + filter + sort + grid. Filter state lives in the URL so results are shareable
 * and survive refresh / back navigation.
 */
export function CatalogBrowser({ products, hiddenFacets = [] }: { products: Product[]; hiddenFacets?: FacetKey[] }) {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(params), [params]);
  const [query, setQuery] = useState(filters.q);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const lastWrittenQuery = useRef(filters.q);

  // Keep the text box in sync when the URL changes from elsewhere (e.g. header search).
  useEffect(() => {
    if (filters.q !== lastWrittenQuery.current) {
      lastWrittenQuery.current = filters.q;
      setQuery(filters.q);
    }
  }, [filters.q]);

  const update = useCallback(
    (next: Partial<Filters>) =>
      setParams((prev) => filtersToParams({ ...parseFilters(prev), ...next }), {
        replace: true,
        preventScrollReset: true,
      }),
    [setParams],
  );

  // Debounce typing into the URL.
  useEffect(() => {
    if (query === lastWrittenQuery.current) return;
    const t = window.setTimeout(() => {
      lastWrittenQuery.current = query;
      update({ q: query });
    }, 250);
    return () => window.clearTimeout(t);
  }, [query, update]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  const results = useMemo(() => applyFilters(products, filters), [products, filters]);
  const options = useMemo(() => facetOptions(products), [products]);
  const activeCount = activeFilterCount(filters);

  const toggle = (key: FacetKey, value: string) => {
    const current = filters[key] as string[];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    update({ [key]: next } as Partial<Filters>);
  };
  const clear = () => {
    lastWrittenQuery.current = '';
    setQuery('');
    update({ q: '', style: [], age: [], size: [], print: [] });
  };

  const chips = (['style', 'age', 'size', 'print'] as FacetKey[]).flatMap((key) =>
    (filters[key] as string[]).map((value) => ({
      key,
      value,
      label: options[key].find((o) => o.value === value)?.label ?? value,
    })),
  );

  const panel = (
    <FilterPanel
      filters={filters}
      options={options}
      hidden={hiddenFacets}
      onToggle={toggle}
      onClear={clear}
      activeCount={activeCount}
    />
  );

  return (
    <div className="lg:grid lg:grid-cols-[12.5rem_1fr] lg:gap-8">
      <aside className="hidden lg:block" aria-label="Filters">
        <div className="sticky top-36">{panel}</div>
      </aside>

      <div className="min-w-0">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-cocoa" aria-hidden="true" />
            <label htmlFor="catalog-search" className="sr-only">
              Search by product name or print
            </label>
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or print"
              className="h-12 w-full rounded-full border border-brown/20 bg-white/70 pr-4 pl-11 text-[0.95rem] text-ink placeholder:text-ink/45 focus:border-brown focus:outline-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="btn btn-outline h-12 flex-1 lg:hidden"
              aria-expanded={drawerOpen}
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters{activeCount > 0 && ` (${activeCount})`}
            </button>
            <label className="sr-only" htmlFor="catalog-sort">
              Sort products
            </label>
            <select
              id="catalog-sort"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as SortValue })}
              className="h-12 flex-1 cursor-pointer rounded-full border border-brown/20 bg-white/70 px-4 text-sm font-semibold text-brown focus:border-brown focus:outline-none sm:flex-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2" aria-live="polite">
          <p className="mr-2 text-sm text-ink/75">
            {results.length} {results.length === 1 ? 'piece' : 'pieces'}
            {filters.q.trim() && (
              <>
                {' '}
                for “<span className="text-brown">{filters.q.trim()}</span>”
              </>
            )}
          </p>
          {chips.map((chip) => (
            <button
              key={`${chip.key}-${chip.value}`}
              type="button"
              onClick={() => toggle(chip.key, chip.value)}
              className="inline-flex min-h-8 items-center gap-1 rounded-full bg-linen px-3 text-xs font-semibold text-brown hover:bg-gold-soft"
            >
              {chip.label}
              <X className="size-3.5" aria-hidden="true" />
              <span className="sr-only">, remove filter</span>
            </button>
          ))}
        </div>

        {results.length ? (
          <ProductGrid products={results} columns={3} priorityCount={2} />
        ) : (
          <EmptyState
            title="No little pieces match… yet"
            message="Try removing a filter or searching for something else. New prints and styles are added regularly."
            action={
              <button type="button" onClick={clear} className="btn btn-primary">
                Clear filters
              </button>
            }
          />
        )}
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-ink/30 animate-fade-in" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[85svh] flex-col rounded-t-[1.75rem] bg-ivory animate-fade-up">
            <div className="flex items-center justify-between border-b border-brown/10 px-5 py-4">
              <h2 className="text-2xl">Filters</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="grid size-11 place-items-center rounded-full hover:bg-brown/5"
                aria-label="Close filters"
                autoFocus
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-5">{panel}</div>
            <div className="border-t border-brown/10 p-4">
              <button type="button" onClick={() => setDrawerOpen(false)} className="btn btn-primary w-full">
                Show {results.length} {results.length === 1 ? 'piece' : 'pieces'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
