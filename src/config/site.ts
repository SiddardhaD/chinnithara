/**
 * Central business configuration.
 *
 * Contact values come from environment variables (see `.env.example`) so they can be
 * changed without touching code. Everything here is public, so never put secrets in it.
 */

const env = import.meta.env;

/** Accepts "handle", "@handle" or a full profile URL and returns just the handle. */
function parseInstagramHandle(value: string): string {
  return value
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
    .replace(/[?#].*$/, '')
    .replace(/\/+$/, '')
    .replace(/^@/, '');
}

/** Digits only, e.g. "91XXXXXXXXXX". Empty string = not configured yet. */
const whatsappDigits = (env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '').replace(/^0+/, '');
// wa.me needs the country code. A bare 10-digit Indian mobile number gets "91" added.
const whatsappNumber = /^[6-9]\d{9}$/.test(whatsappDigits) ? `91${whatsappDigits}` : whatsappDigits;

export const siteConfig = {
  brand: {
    name: 'ChinniThara',
    teluguName: 'చిన్ని Thara',
    tagline: 'Little comforts. Endless wonders.',
    descriptor: 'Exquisite Baby Clothing',
  },

  /** Published-CSV URL of the Google Sheet "Stock" tab (see services/stock.ts). Empty = off. */
  stockSheetUrl: (env.VITE_STOCK_SHEET_URL ?? '').trim(),

  /** Public site origin without trailing slash. Falls back to the browser origin. */
  siteUrl: (env.VITE_SITE_URL ?? '').replace(/\/$/, ''),

  /** Slim bar above the header. Set `message` to '' to hide it. Do not advertise offers that don't exist. */
  announcement: {
    message: 'Muslin co-ords & frocks for little ones up to 2 years',
    linkLabel: 'Shop the collection',
    linkTo: '/shop',
  },

  contact: {
    whatsappNumber,
    instagramHandle: parseInstagramHandle(env.VITE_INSTAGRAM_HANDLE ?? ''),
    email: env.VITE_CONTACT_EMAIL ?? '',
    /** From the business RFQ. Shown on the Contact page and footer. */
    location: 'Kavali, SPSR Nellore District, Andhra Pradesh',
  },

  catalogue: {
    /**
     * Draft listings are real product lines from the purchase plan that are still
     * waiting for photos and a confirmed retail price. Set to false to hide them.
     */
    showDraftListings: true,
  },

  /**
   * While true, policy pages show a short notice that terms are being finalised.
   * Switch to false once the owner has reviewed and confirmed every policy page.
   */
  policiesAreDraft: true,
} as const;

export const isWhatsAppConfigured = siteConfig.contact.whatsappNumber.length >= 10;

export const instagramUrl = siteConfig.contact.instagramHandle
  ? `https://www.instagram.com/${siteConfig.contact.instagramHandle}/`
  : '';

export function absoluteUrl(path: string): string {
  const origin = siteConfig.siteUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}
