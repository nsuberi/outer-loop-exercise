import { products } from '../../data/catalog';
import type { Product } from '../../types';

/** Storefront routes stay inside this local demo. */
export function productHref(productId: string): string {
  return `/shop/${productId}`;
}

/**
 * Resolve a storefront slug to a product. Forgiving by design (Spec 02):
 * shortened or legacy links such as `/shop/rice` should still land on a
 * relevant product instead of a dead end.
 */
export function findProductBySlug(slug?: string): Product | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return products.find((item) => item.id === normalized || item.id.startsWith(normalized));
}
