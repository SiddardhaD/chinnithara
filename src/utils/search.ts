import { getCategory } from '../data/categories';
import { getPrint } from '../data/prints';
import type { Product } from '../types/product';

/** Case-insensitive match on product name, style, category, print and colour. */
export function matchesQuery(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    product.name,
    product.style,
    product.colour,
    getCategory(product.category)?.name,
    getPrint(product.print)?.name,
    ...(product.designs ?? []).map((d) => `${d.name} ${d.colour}`),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return q.split(/\s+/).every((word) => haystack.includes(word));
}
