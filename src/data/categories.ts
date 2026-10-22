import type { Category, Collection } from '../types/product';

/** Shop by Style. Every product belongs to exactly one category. */
export const categories: Category[] = [
  {
    slug: 'co-ord-sets',
    name: 'Muslin Co-ord Sets',
    description: 'Matching tops and bottoms in breezy muslin for an easy, put-together look.',
  },
  {
    slug: 'frocks',
    name: 'Frocks',
    description: 'Twirl-ready frocks, including zip and shoulder-knot styles.',
  },
  {
    slug: 'jablas',
    name: 'Jablas',
    description: 'Simple side-button jablas, a classic first outfit.',
  },
  {
    slug: 'rompers',
    name: 'Rompers',
    description: 'All-in-one rompers for easy dressing.',
  },
  {
    slug: 'essentials',
    name: 'Muslin Essentials',
    description: 'Swaddles, towels, wash cloths and nappies for everyday baby care.',
  },
];

/**
 * Curated collections shown on the homepage and /collections. They are filters over the
 * catalogue, so a product appears automatically once its data matches.
 */
export const collections: Collection[] = [
  {
    slug: 'muslin-co-ord-sets',
    name: 'Muslin Co-ord Sets',
    eyebrow: 'Matching sets',
    description: 'Sleeveless and boxy co-ords that keep little ones comfortable and looking sweet.',
    matches: (p) => p.category === 'co-ord-sets',
  },
  {
    slug: 'frocks',
    name: 'Frocks',
    eyebrow: 'For twirls',
    description: 'Gathered skirts, pretty prints and easy closures.',
    matches: (p) => p.category === 'frocks',
  },
  {
    slug: 'zip-frocks',
    name: 'Zip Frocks',
    eyebrow: 'Easy on, easy off',
    description: 'Frocks with a zip closure for quicker dressing.',
    matches: (p) => p.category === 'frocks' && p.closure === 'zip',
  },
  {
    slug: 'jablas-and-rompers',
    name: 'Jablas & Rompers',
    eyebrow: 'Everyday basics',
    description: 'Simple, easy pieces for the earliest months.',
    matches: (p) => p.category === 'jablas' || p.category === 'rompers',
  },
  {
    slug: 'muslin-essentials',
    name: 'Muslin Essentials',
    eyebrow: 'Baby care',
    description: 'Swaddles, bath and hooded towels, wash cloths and nappies.',
    matches: (p) => p.category === 'essentials',
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
