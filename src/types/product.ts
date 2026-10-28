export type SizeCode =
  | 'NB'
  | '0-3M'
  | '3-6M'
  | '6-9M'
  | '9-12M'
  | '12-18M'
  | '18-24M'
  | '12-24M'
  // Dimension sizes for muslin essentials (towels, swaddles, wash cloths)
  | '75x150CM'
  | '100x100CM'
  | '75x75CM'
  | '27x27CM'
  // A complete kit sold as one set
  | 'SET';

export type AgeGroupSlug = '0-3-months' | '3-6-months' | '6-12-months' | '12-24-months';

export type CategorySlug = 'co-ord-sets' | 'frocks' | 'jablas' | 'rompers' | 'essentials' | 'kits';

export type PrintSlug = 'white-on-print' | 'dyed-on-print';

export type PrintFamily = 'animal' | 'botanical' | 'rainbow' | 'assorted' | 'plain';

export type Closure = 'zip' | 'button' | 'press-stud' | 'side-button' | 'shoulder-knot' | 'tie';

/**
 * Only set when real stock data exists. When undefined, the site asks customers to
 * check availability on WhatsApp instead of guessing.
 */
export type Availability = 'in-stock' | 'limited' | 'sold-out';

/**
 * `live` means real photos and details are in place.
 * `draft` means a real product line that is still waiting for photos or a price.
 */
export type ListingStatus = 'live' | 'draft';

export interface ProductImage {
  src: string;
  /** Optional responsive sources, e.g. "/a-600.webp 600w, /a-1066.webp 1066w". */
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
}

/** One design (print/colour) of a product that comes in several, e.g. assorted frocks. */
export interface ProductDesign {
  id: string;
  name: string;
  /** Short colour note, e.g. "Aqua". */
  colour: string;
  /** Index into `product.images` showing this design. */
  imageIndex: number;
  /** Optional second photo of this design in use (e.g. a baby wrapped in the swaddle). */
  lifestyleIndex?: number;
  /** Further photos of this design, shown after the others in the same slider. */
  extraIndexes?: number[];
}

/** One piece inside a kit. Links to the product it comes from. */
export interface KitItem {
  productSlug: string;
  /** Design shown in the kit photo. Prints can be swapped on request. */
  designId?: string;
  qty: number;
}

export interface Product {
  id: string;
  /** The URL segment. Don't change it once published, because links depend on it. */
  slug: string;
  name: string;
  /** One line for cards and meta descriptions. */
  summary: string;
  /** Paragraphs for the product page. Describe only what is verified. */
  description: string[];
  /** Retail price in INR. Leave it out until confirmed and the site shows "Price on request". */
  price?: number;
  /** Previous price. Only set this when a genuine sale is running. */
  compareAtPrice?: number;
  /** Empty array = a designed placeholder is shown (documented in README). */
  images: ProductImage[];
  category: CategorySlug;
  /** Human-readable style, e.g. "Sleeveless co-ord set". */
  style: string;
  closure?: Closure;
  /** Short note shown under the gallery, e.g. when photos show a sibling product. */
  photoNote?: string;
  /** Slugs of the same product in other sizes (shown as a size switch with measurements). */
  sizeSiblings?: string[];
  /** Hide this product everywhere on the site (kept in the data for later). */
  hidden?: boolean;
  /** For kits: the pieces inside, shown as "What's inside" on the product page. */
  kitItems?: KitItem[];
  /** When set, customers choose a design before ordering. */
  designs?: ProductDesign[];
  print: PrintSlug;
  colour?: string;
  availableSizes: SizeCode[];
  /** Only fill in when verified with the supplier / garment label. */
  fabric?: string;
  /** Product-specific care. When absent, general muslin care tips are shown instead. */
  washCare?: string[];
  featured?: boolean;
  isNewArrival?: boolean;
  availability?: Availability;
  listingStatus: ListingStatus;
  /** Date the listing was added (YYYY-MM-DD), used for "newest" sorting. */
  addedOn: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface Collection {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  /** Returns true when a product belongs in this collection. */
  matches: (product: Product) => boolean;
}

export interface Print {
  slug: PrintSlug;
  name: string;
  family: PrintFamily;
  description: string;
  swatch?: ProductImage;
}

export interface SizeInfo {
  code: SizeCode;
  /** 'age' sizes appear in the size guide and Shop by Age; 'dimension' sizes don't. */
  kind: 'age' | 'dimension';
  label: string;
  ageRange: string;
  minMonths: number;
  maxMonths: number;
}

export interface AgeGroup {
  slug: AgeGroupSlug;
  name: string;
  description: string;
  minMonths: number;
  maxMonths: number;
}

/** A real customer review. Only add reviews customers actually gave (with their permission). */
export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  /** Where the review came from, e.g. "WhatsApp", "Instagram", "Google". */
  source?: string;
  /** Slug of the product they bought, if known. */
  productSlug?: string;
  /** Optional photo shared by the customer (with permission), under /public/images/testimonials/. */
  photo?: ProductImage;
  /** ISO date the review was received. */
  date: string;
}

/** One slide of the homepage carousel. */
export interface Banner {
  id: string;
  eyebrow: string;
  title: string;
  /** Optional second line of the title, shown in the accent colour. */
  titleAccent?: string;
  text: string;
  cta: { label: string; to: string };
  /** A genuine photo. Without one, a designed panel is shown instead. */
  image?: ProductImage & { objectPosition?: string };
  /** Line drawing used on designed panels. */
  illustration?: CategorySlug;
  /** Show the official moon emblem instead of an illustration. */
  emblem?: boolean;
  tone: 'blush' | 'sage' | 'linen' | 'cream';
  /**
   * 'split' (default): text panel beside the image.
   * 'full': a wide 16:9 campaign photo fills the slide on desktop, with the text over a soft
   * fade on the left (keep the left ~30% of the photo free of people). On phones the photo
   * sits above the text.
   */
  layout?: 'split' | 'full';
}
