import type { Print } from '../types/product';

/**
 * Print library. Add a new entry whenever a product with a new print is listed.
 * Swatches must be crops of genuine product photos.
 *
 * "White on print" and "Dyed on print" are the supplier invoice's pattern types:
 * assorted prints on a white base, or on a coloured (dyed) base.
 */
export const prints: Print[] = [
  {
    slug: 'white-on-print',
    name: 'White Base Prints',
    family: 'assorted',
    description:
      'Assorted prints on a fresh white base. Designs vary by batch — message us on WhatsApp to see what’s in.',
  },
  {
    slug: 'dyed-on-print',
    name: 'Colour Base Prints',
    family: 'assorted',
    description:
      'Assorted prints on a soft coloured base. Designs vary by batch — message us on WhatsApp to see what’s in.',
  },
];

export function getPrint(slug: string): Print | undefined {
  return prints.find((p) => p.slug === slug);
}
