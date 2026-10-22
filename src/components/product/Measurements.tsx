import { Ruler } from 'lucide-react';
import { Link } from 'react-router';
import type { Product, SizeCode } from '../../types/product';
import { cn } from '../../utils/format';

/** "75x150CM" → [75, 150] (width, height in cm). Age sizes return null. */
function parseDimensions(code: SizeCode): [number, number] | null {
  const m = /^(\d+)x(\d+)CM$/i.exec(code);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

const MAX_CM = 150;

/** A to-scale outline of the item with its measurements. */
function SizeDrawing({ w, h }: { w: number; h: number }) {
  const box = 92;
  const pw = (w / MAX_CM) * box;
  const ph = (h / MAX_CM) * box;
  const x = (120 - pw) / 2 + 6;
  const y = (110 - ph) / 2 + 4;
  return (
    <svg viewBox="0 0 132 126" className="h-auto w-full max-w-[9rem]" aria-hidden="true">
      <rect x={x} y={y} width={pw} height={ph} rx="4" className="fill-blush-soft stroke-cocoa" strokeWidth="1.5" />
      {/* width marker */}
      <line x1={x} y1={y + ph + 6} x2={x + pw} y2={y + ph + 6} className="stroke-ink/40" strokeWidth="1" />
      <text x={x + pw / 2} y={y + ph + 15} textAnchor="middle" className="fill-ink/70 text-[7px] font-semibold">
        {w} cm
      </text>
      {/* height marker */}
      <line x1={x - 5} y1={y} x2={x - 5} y2={y + ph} className="stroke-ink/40" strokeWidth="1" />
      <text
        x={x - 8}
        y={y + ph / 2}
        textAnchor="middle"
        transform={`rotate(-90 ${x - 8} ${y + ph / 2})`}
        className="fill-ink/70 text-[7px] font-semibold"
      >
        {h} cm
      </text>
    </svg>
  );
}

/**
 * Measurements for dimension-sized items (swaddles, towels, wash cloths), drawn to scale.
 * When the same item comes in other sizes (`sizeSiblings`), they're shown side by side and
 * link to each other, keeping the chosen design.
 */
export function Measurements({
  product,
  siblings,
  designId,
}: {
  product: Product;
  siblings: Product[];
  designId?: string;
}) {
  const options = [product, ...siblings]
    .map((p) => ({ p, dims: parseDimensions(p.availableSizes[0]) }))
    .filter((o): o is { p: Product; dims: [number, number] } => !!o.dims)
    .sort((a, b) => a.dims[0] * a.dims[1] - b.dims[0] * b.dims[1]);
  if (!options.length) return null;

  return (
    <section aria-labelledby="measurements-title" className="rounded-2xl border border-brown/15 bg-ivory-deep/60 p-4">
      <h2 id="measurements-title" className="flex items-center gap-2 text-sm font-semibold text-brown">
        <Ruler className="size-4 text-cocoa" aria-hidden="true" />
        Measurements
        {options.length > 1 && <span className="font-normal text-ink/60">· same prints, {options.length} sizes</span>}
      </h2>
      <ul className={cn('mt-3 grid gap-3', options.length > 1 ? 'grid-cols-2' : 'grid-cols-1 sm:max-w-[16rem]')}>
        {options.map(({ p, dims: [w, h] }) => {
          const current = p.id === product.id;
          const body = (
            <>
              <SizeDrawing w={w} h={h} />
              <span className="mt-1 block text-sm font-semibold text-ink">{p.style}</span>
              <span className="block text-xs text-ink/65">
                {w} × {h} cm
              </span>
              {current ? (
                <span className="mt-1.5 inline-block rounded-full bg-ink px-2 py-0.5 text-[0.65rem] font-bold text-white">
                  This item
                </span>
              ) : (
                <span className="mt-1.5 inline-block text-xs font-semibold text-cocoa-deep group-hover:underline">
                  View {p.style.toLowerCase()} →
                </span>
              )}
            </>
          );
          return (
            <li key={p.id}>
              {current ? (
                <div className="flex h-full flex-col items-center rounded-xl border-2 border-ink bg-white p-3 text-center">{body}</div>
              ) : (
                <Link
                  to={`/products/${p.slug}${designId ? `?design=${designId}` : ''}`}
                  className="group flex h-full flex-col items-center rounded-xl border-2 border-transparent bg-white p-3 text-center transition hover:border-ink/25"
                >
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
