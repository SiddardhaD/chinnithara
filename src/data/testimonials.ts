import type { Testimonial } from '../types/product';

/**
 * Customer reviews shown on the homepage.
 *
 * Only add reviews real customers actually gave you, with their permission to share them
 * (and to show their photo, if you include one). Never write reviews yourself.
 *
 * While this list is empty, the homepage shows an invitation to share feedback instead.
 *
 * Example:
 * {
 *   id: 'review-001',
 *   name: 'Customer first name',
 *   quote: 'Exactly what the customer wrote.',
 *   source: 'WhatsApp',
 *   productSlug: 'muslin-zip-frock',
 *   date: '2026-11-02',
 * },
 */
export const testimonials: Testimonial[] = [];
