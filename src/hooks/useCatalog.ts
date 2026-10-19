import { useMemo } from 'react';
import { findProductBySlug, listProducts, listRelatedProducts } from '../services/catalog';
import type { Product } from '../types/product';

/**
 * Data-access hooks used by every page. They return a `status` so that a future
 * network-backed source (e.g. Supabase) can report 'loading' without changing callers.
 */
export type LoadStatus = 'loading' | 'ready';

export function useProducts(): { products: Product[]; status: LoadStatus } {
  const products = useMemo(() => listProducts(), []);
  return { products, status: 'ready' };
}

export function useProduct(slug: string | undefined): {
  product: Product | undefined;
  related: Product[];
  status: LoadStatus;
} {
  return useMemo(() => {
    const product = slug ? findProductBySlug(slug) : undefined;
    return { product, related: product ? listRelatedProducts(product) : [], status: 'ready' as const };
  }, [slug]);
}
