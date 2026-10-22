import type { CategorySlug } from '../../types/product';
import { cn } from '../../utils/format';
import { CloudMotif, MoonMotif } from './Motifs';

/**
 * Intentional placeholder for listings that don't have genuine photos yet.
 * A simple line drawing of the garment type. It is never presented as the actual product.
 */
const paths: Record<CategorySlug, string> = {
  'co-ord-sets':
    'M38 18c4 4 8 6 12 6s8-2 12-6l14 6-4 12-6-2v26H34V34l-6 2-4-12 14-6Z M36 66h28l4 20H54l-4-10-4 10H32l4-20Z',
  frocks: 'M40 16c3 4 6 6 10 6s7-2 10-6l6 4-2 14 4 6 16 40H16l16-40 4-6-2-14 6-4Z',
  jablas: 'M38 18c4 4 8 6 12 6s8-2 12-6l10 4-2 14-4-1v45H34V35l-4 1-2-14 10-4Z M58 38v30',
  // A stack of folded muslin cloths, used for swaddles, towels and wash cloths.
  essentials:
    'M20 62h60v14H20Z M24 48h52v14H24Z M28 34h44v14H28Z M20 69h60 M24 55h52 M28 41h44',
  rompers:
    'M38 16c4 4 8 6 12 6s8-2 12-6l10 4-2 14-4-1v30l-6 16H54l-4-8-4 8H40l-6-16V33l-4 1-2-14 10-4Z',
};

const tones = [
  'bg-blush-soft text-cocoa',
  'bg-sage-soft text-sage-deep',
  'bg-linen text-cocoa',
  'bg-ivory-deep text-sage-deep',
];

export function GarmentIllustration({
  category,
  label = 'Photos coming soon',
  tone = 0,
  className,
}: {
  category: CategorySlug;
  label?: string;
  tone?: number;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Illustration of a ${category.replace(/-/g, ' ')}${label ? `, ${label.toLowerCase()}` : ''}`}
      className={cn(
        'relative flex h-full w-full flex-col items-center justify-center overflow-hidden',
        tones[tone % tones.length],
        className,
      )}
    >
      <MoonMotif className="absolute top-[9%] right-[10%] w-[14%] opacity-50" />
      <CloudMotif className="absolute bottom-[5%] left-[6%] w-[20%] opacity-35" />
      <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className="w-[46%] max-w-[11rem]">
        <path
          d={paths[category]}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      {label && (
        <span className="mt-3 text-[0.68rem] font-semibold tracking-[0.08em] uppercase opacity-80">{label}</span>
      )}
    </div>
  );
}
