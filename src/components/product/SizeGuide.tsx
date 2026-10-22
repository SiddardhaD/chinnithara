import { Ruler } from 'lucide-react';
import { sizes } from '../../data/sizes';
import type { SizeCode } from '../../types/product';
import { cn } from '../../utils/format';

/**
 * Age-based size guide. Garment measurements are intentionally not shown until they are
 * confirmed. Add them to `data/sizes.ts` when they're available.
 */
export function SizeGuide({ highlight = [] }: { highlight?: SizeCode[] }) {
  return (
    <details className="group rounded-2xl border border-brown/15 bg-ivory-deep/60 open:bg-ivory-deep">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-brown [&::-webkit-details-marker]:hidden">
        <Ruler className="size-4 text-cocoa" aria-hidden="true" />
        Size guide
        <span className="ml-auto text-lg leading-none transition-transform group-open:rotate-45" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="px-4 pb-4">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Size labels and matching baby ages</caption>
          <thead>
            <tr className="border-b border-brown/15 text-xs tracking-wide text-sage-deep uppercase">
              <th scope="col" className="py-2 font-bold">Size</th>
              <th scope="col" className="py-2 font-bold">Approx. age</th>
            </tr>
          </thead>
          <tbody>
            {sizes
              .filter((s) => s.kind === 'age' && s.code !== 'NB')
              .map((s) => (
                <tr
                  key={s.code}
                  className={cn('border-b border-brown/10 last:border-0', highlight.includes(s.code) && 'font-semibold text-brown')}
                >
                  <td className="py-2">{s.label}</td>
                  <td className="py-2">
                    {s.ageRange}
                    {highlight.includes(s.code) && <span className="ml-2 text-xs text-cocoa-deep">This piece</span>}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-ink/75">
          Every baby grows at their own pace. If your little one is between sizes, we suggest sizing up.
          Detailed garment measurements are available on request over WhatsApp.
        </p>
      </div>
    </details>
  );
}
