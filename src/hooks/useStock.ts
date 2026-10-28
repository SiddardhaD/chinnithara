import { useEffect, useState } from 'react';
import { loadStock, priceFor, quantityFor, type StockTable } from '../services/stock';

/** Number at or below which a "Only N left" badge is shown. */
export const LOW_STOCK = 3;

export type StockLevel = { qty: number; label: string; tone: 'ok' | 'low' | 'out' };

export function describeStock(qty: number | undefined): StockLevel | null {
  if (qty === undefined) return null;
  if (qty <= 0) return { qty, label: 'Sold out', tone: 'out' };
  if (qty <= LOW_STOCK) return { qty, label: `Only ${qty} left`, tone: 'low' };
  return { qty, label: 'In stock', tone: 'ok' };
}

/** Live stock from the Google Sheet. `level()` returns null when the product isn't tracked. */
export function useStock() {
  const [table, setTable] = useState<StockTable | null>(null);
  useEffect(() => {
    let alive = true;
    loadStock().then((t) => alive && setTable(t));
    return () => {
      alive = false;
    };
  }, []);
  return {
    ready: table !== null,
    level: (slug: string, design?: string, size?: string) =>
      table ? describeStock(quantityFor(table, slug, design, size)) : null,
    price: (slug: string, design?: string, size?: string) => (table ? priceFor(table, slug, design, size) : undefined),
  };
}
