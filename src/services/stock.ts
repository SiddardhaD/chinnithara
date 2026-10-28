/**
 * Live stock from a Google Sheet.
 *
 * The owner keeps a "Stock" tab with the columns:
 *   product_slug | design_id | size | quantity | price | mrp
 * `price` is the selling price in rupees. `mrp` is optional: fill it only when a genuine
 * sale is running and the price is lower, and the site shows it struck through.
 * (design_id and size may be blank for products without designs / with one size).
 * That ONE tab is published as CSV (File → Share → Publish to web → Stock → CSV) and its
 * URL is set in VITE_STOCK_SHEET_URL. Only stock numbers are public, never sales or money.
 *
 * If the URL isn't set or the sheet can't be loaded, the site behaves exactly as before
 * ("Availability confirmed on WhatsApp").
 */
import { siteConfig } from '../config/site';

export type StockRow = { qty?: number; price?: number; mrp?: number };
export type StockTable = Map<string, StockRow>;

const key = (slug: string, design = '', size = '') =>
  [slug, design, size].map((v) => v.trim().toLowerCase()).join('|');

/** Minimal CSV parser (handles quoted cells and commas inside quotes). */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(cell);
      cell = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else cell += c;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim()));
}

export function parseStock(csv: string): StockTable {
  const [header, ...rows] = parseCsv(csv);
  const table: StockTable = new Map();
  if (!header) return table;
  const col = (name: string) => header.findIndex((h) => h.trim().toLowerCase() === name);
  const [iSlug, iDesign, iSize, iQty, iPrice, iMrp] = ['product_slug', 'design_id', 'size', 'quantity', 'price', 'mrp'].map(col);
  if (iSlug < 0) return table;
  // Accepts "499", "₹499" or "1,299". Blank or invalid cells are treated as not set.
  const num = (i: number, r: string[]) => {
    if (i < 0) return undefined;
    const n = Number.parseFloat((r[i] ?? '').replace(/[₹,\s]/g, ''));
    return Number.isFinite(n) && n >= 0 ? n : undefined;
  };
  for (const r of rows) {
    const slug = r[iSlug]?.trim();
    if (!slug) continue;
    const qty = num(iQty, r);
    const price = num(iPrice, r);
    const mrp = num(iMrp, r);
    if (qty === undefined && price === undefined) continue;
    table.set(key(slug, iDesign >= 0 ? r[iDesign] : '', iSize >= 0 ? r[iSize] : ''), {
      qty: qty === undefined ? undefined : Math.floor(qty),
      price,
      mrp: mrp !== undefined && price !== undefined && mrp > price ? mrp : undefined,
    });
  }
  return table;
}

let pending: Promise<StockTable | null> | null = null;

/** Loads the sheet once per page visit. Resolves to null when stock tracking is off or fails. */
export function loadStock(): Promise<StockTable | null> {
  if (!siteConfig.stockSheetUrl) return Promise.resolve(null);
  pending ??= fetch(siteConfig.stockSheetUrl, { cache: 'no-store' })
    .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`))))
    .then(parseStock)
    .catch((err) => {
      console.warn('[stock] Could not load the stock sheet:', err);
      return null;
    });
  return pending;
}

/** Rows for a product, narrowed by design and size. Blank design/size cells match any. */
function matchingRows(table: StockTable, slug: string, design?: string, size?: string): StockRow[] {
  const s = slug.toLowerCase();
  const out: StockRow[] = [];
  for (const [k, row] of table) {
    const [kSlug, kDesign, kSize] = k.split('|');
    if (kSlug !== s) continue;
    if (design && kDesign && kDesign !== design.toLowerCase()) continue;
    if (size && kSize && kSize !== size.toLowerCase()) continue;
    out.push(row);
  }
  return out;
}

/**
 * Quantity for a product, optionally narrowed by design and size.
 * Returns undefined when the sheet has no quantity for it (not tracked).
 */
export function quantityFor(table: StockTable, slug: string, design?: string, size?: string): number | undefined {
  const rows = matchingRows(table, slug, design, size).filter((r) => r.qty !== undefined);
  return rows.length ? rows.reduce((sum, r) => sum + r.qty!, 0) : undefined;
}

export type PriceRange = { min: number; max: number; mrp?: number };

/** Lowest and highest price for the matching rows, or undefined when no price is set. */
export function priceFor(table: StockTable, slug: string, design?: string, size?: string): PriceRange | undefined {
  const rows = matchingRows(table, slug, design, size).filter((r) => r.price !== undefined);
  if (!rows.length) return undefined;
  const prices = rows.map((r) => r.price!);
  const min = Math.min(...prices);
  const cheapest = rows.find((r) => r.price === min);
  return { min, max: Math.max(...prices), mrp: cheapest?.mrp };
}
