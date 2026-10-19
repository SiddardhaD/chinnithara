import { categories } from '../data/categories';
import { prints } from '../data/prints';
import { ageGroups, sizeFitsAgeGroup, sizes } from '../data/sizes';
import type { AgeGroupSlug, CategorySlug, PrintSlug, Product, SizeCode } from '../types/product';
import { matchesQuery } from './search';

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
] as const;

export type SortValue = (typeof sortOptions)[number]['value'];

export type Filters = {
  q: string;
  style: CategorySlug[];
  age: AgeGroupSlug[];
  size: SizeCode[];
  print: PrintSlug[];
  sort: SortValue;
};

export type FacetKey = 'style' | 'age' | 'size' | 'print';

function list<T extends string>(params: URLSearchParams, key: string, allowed: readonly T[]): T[] {
  const raw = params.get(key);
  if (!raw) return [];
  return raw.split(',').filter((v): v is T => (allowed as readonly string[]).includes(v));
}

export function parseFilters(params: URLSearchParams): Filters {
  const sort = params.get('sort');
  return {
    q: params.get('q') ?? '',
    style: list(params, 'style', categories.map((c) => c.slug)),
    age: list(params, 'age', ageGroups.map((a) => a.slug)),
    size: list(params, 'size', sizes.map((s) => s.code)),
    print: list(params, 'print', prints.map((p) => p.slug)),
    sort: sortOptions.some((o) => o.value === sort) ? (sort as SortValue) : 'featured',
  };
}

export function filtersToParams(filters: Filters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.q.trim()) params.set('q', filters.q.trim());
  (['style', 'age', 'size', 'print'] as const).forEach((key) => {
    if (filters[key].length) params.set(key, filters[key].join(','));
  });
  if (filters.sort !== 'featured') params.set('sort', filters.sort);
  return params;
}

export function activeFilterCount(f: Filters): number {
  return f.style.length + f.age.length + f.size.length + f.print.length + (f.q.trim() ? 1 : 0);
}

export function productMatchesFacet(product: Product, key: FacetKey, value: string): boolean {
  switch (key) {
    case 'style':
      return product.category === value;
    case 'print':
      return product.print === value;
    case 'size':
      return product.availableSizes.includes(value as SizeCode);
    case 'age': {
      const group = ageGroups.find((g) => g.slug === value);
      return !!group && product.availableSizes.some((s) => sizeFitsAgeGroup(s, group));
    }
  }
}

/** Values within one facet are OR-ed; different facets are AND-ed. */
export function applyFilters(products: Product[], f: Filters): Product[] {
  const facets: FacetKey[] = ['style', 'age', 'size', 'print'];
  const filtered = products.filter(
    (p) =>
      matchesQuery(p, f.q) &&
      facets.every((key) => !f[key].length || f[key].some((v) => productMatchesFacet(p, key, v))),
  );
  return sortProducts(filtered, f.sort);
}

export function sortProducts(products: Product[], sort: SortValue): Product[] {
  const out = [...products];
  // Products without a confirmed price always sort after priced ones.
  const byPrice = (dir: 1 | -1) => (a: Product, b: Product) => {
    if (a.price === undefined && b.price === undefined) return 0;
    if (a.price === undefined) return 1;
    if (b.price === undefined) return -1;
    return (a.price - b.price) * dir;
  };
  switch (sort) {
    case 'newest':
      return out.sort((a, b) => b.addedOn.localeCompare(a.addedOn));
    case 'price-asc':
      return out.sort(byPrice(1));
    case 'price-desc':
      return out.sort(byPrice(-1));
    case 'name-asc':
      return out.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return out.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return out;
  }
}

/** Facet options that actually exist in the catalogue, with product counts. */
export function facetOptions(products: Product[]) {
  const count = (key: FacetKey, value: string) => products.filter((p) => productMatchesFacet(p, key, value)).length;
  const withCounts = <T extends { value: string }>(key: FacetKey, opts: T[]) =>
    opts.map((o) => ({ ...o, count: count(key, o.value) })).filter((o) => o.count > 0);

  return {
    style: withCounts('style', categories.map((c) => ({ value: c.slug, label: c.name }))),
    age: withCounts('age', ageGroups.map((a) => ({ value: a.slug, label: a.name }))),
    size: withCounts('size', sizes.map((s) => ({ value: s.code, label: s.label }))),
    print: withCounts('print', prints.map((p) => ({ value: p.slug, label: p.name }))),
  };
}
