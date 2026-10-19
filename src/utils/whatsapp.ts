import { absoluteUrl, isWhatsAppConfigured, siteConfig } from '../config/site';
import { getSize } from '../data/sizes';
import type { Product, ProductDesign, SizeCode } from '../types/product';

/** Returns a properly encoded wa.me link, or null when no number is configured. */
export function buildWhatsAppUrl(message: string): string | null {
  if (!isWhatsAppConfigured) return null;
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productUrl(product: Product): string {
  return absoluteUrl(`/products/${product.slug}`);
}

/** Size-specific order enquiry from the product page. */
export function buildOrderMessage(
  product: Product,
  size: SizeCode,
  quantity: number,
  design?: ProductDesign | null,
): string {
  return [
    `Hello ${siteConfig.brand.name}! I'd like to order:`,
    '',
    `• Product: ${product.name}`,
    ...(design ? [`• Design: ${design.name}`] : []),
    `• Size: ${getSize(size).label}${getSize(size).kind === 'age' ? ` (${getSize(size).ageRange})` : ''}`,
    `• Quantity: ${quantity}`,
    `• Link: ${productUrl(product)}`,
    '',
    'Could you please confirm availability, price and delivery details?',
  ].join('\n');
}

/** General enquiry from a product card (no size chosen yet). */
export function buildProductEnquiryMessage(product: Product): string {
  return [
    `Hello ${siteConfig.brand.name}! I'm interested in the ${product.name}.`,
    `Link: ${productUrl(product)}`,
    '',
    'Could you share the available sizes, prints and price?',
  ].join('\n');
}

export function buildGeneralMessage(name?: string, note?: string): string {
  const lines = [`Hello ${siteConfig.brand.name}!`];
  if (name) lines.push(`My name is ${name}.`);
  lines.push(note?.trim() || "I'd like to know more about your babywear collection.");
  return lines.join('\n');
}
