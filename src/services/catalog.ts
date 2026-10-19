/**
 * Catalogue service — the ONLY module that knows where product data comes from.
 *
 * Today it reads local TypeScript data. To move to Supabase later, replace the bodies
 * of these functions with Supabase queries (and make the hooks in `hooks/useCatalog.ts`
 * async). Pages and components only use the hooks, so they don't need rewriting.
 */
import { siteConfig } from '../config/site';
import { products as localProducts } from '../data/products';
import type { Product } from '../types/product';

function visible(products: Product[]): Product[] {
  return siteConfig.catalogue.showDraftListings
    ? products
    : products.filter((p) => p.listingStatus === 'live');
}

/** Live listings first, then newest. */
function defaultOrder(a: Product, b: Product): number {
  if (a.listingStatus !== b.listingStatus) return a.listingStatus === 'live' ? -1 : 1;
  return b.addedOn.localeCompare(a.addedOn);
}

export function listProducts(): Product[] {
  return visible(localProducts).sort(defaultOrder);
}

export function findProductBySlug(slug: string): Product | undefined {
  return listProducts().find((p) => p.slug === slug);
}

export function listRelatedProducts(product: Product, limit = 4): Product[] {
  const others = listProducts().filter((p) => p.id !== product.id);
  const score = (p: Product) =>
    (p.category === product.category ? 2 : 0) + (p.print === product.print ? 1 : 0);
  return others.sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export function getProductName(slug: string): string | undefined {
  return findProductBySlug(slug)?.name;
}
