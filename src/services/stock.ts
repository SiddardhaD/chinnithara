/**
 * Live stock from a Google Sheet.
 *
 * The owner keeps a "Stock" tab with the columns:
 *   product_slug | design_id | size | quantity
 * (design_id and size may be blank for products without designs / with one size).
 * That ONE tab is published as CSV (File → Share → Publish to web → Stock → CSV) and its
 * URL is set in VITE_STOCK_SHEET_URL. Only stock numbers are public, never sales or money.
 *
 * If the URL isn't set or the sheet can't be loaded, the site behaves exactly as before
 * ("Availability confirmed on WhatsApp").
 */
import { siteConfig } from '../config/site';

export type StockTable = Map<string, number>;

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
  const [iSlug, iDesign, iSize, iQty] = ['product_slug', 'design_id', 'size', 'quantity'].map(col);
  if (iSlug < 0 || iQty < 0) return table;
  for (const r of rows) {
    const slug = r[iSlug]?.trim();
    const qty = Number.parseInt(r[iQty] ?? '', 10);
    if (!slug || Number.isNaN(qty)) continue;
    table.set(key(slug, iDesign >= 0 ? r[iDesign] : '', iSize >= 0 ? r[iSize] : ''), Math.max(0, qty));
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

/**
 * Quantity for a product, optionally narrowed by design and size.
 * Rows that leave design/size blank match any design/size. Returns undefined when the
 * sheet has no row for this product (= not tracked).
 */
export function quantityFor(table: StockTable, slug: string, design?: string, size?: string): number | undefined {
  const s = slug.toLowerCase();
  let found = false;
  let total = 0;
  for (const [k, qty] of table) {
    const [kSlug, kDesign, kSize] = k.split('|');
    if (kSlug !== s) continue;
    if (design && kDesign && kDesign !== design.toLowerCase()) continue;
    if (size && kSize && kSize !== size.toLowerCase()) continue;
    found = true;
    total += qty;
  }
  return found ? total : undefined;
}
