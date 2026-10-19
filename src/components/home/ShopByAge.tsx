import { Link } from 'react-router';
import { ageGroups, sizeFitsAgeGroup } from '../../data/sizes';
import type { Product } from '../../types/product';
import { cn } from '../../utils/format';
import { MoonMotif } from '../common/Motifs';
import { SectionHeading } from '../common/SectionHeading';

/** Soft watercolour-style washes behind each age circle. */
const washes = [
  'radial-gradient(circle at 35% 35%, #efe4f3 0%, #f5edf7 45%, transparent 70%)',
  'radial-gradient(circle at 40% 40%, #f8dcd6 0%, #fbeae6 45%, transparent 70%)',
  'radial-gradient(circle at 45% 35%, #d9ecf5 0%, #eaf4f9 45%, transparent 70%)',
  'radial-gradient(circle at 40% 45%, #d8eedf 0%, #e9f5ec 45%, transparent 70%)',
];

function splitAgeName(name: string): [string, string] {
  const [range, ...unit] = name.split(' ');
  return [range, unit.join(' ')];
}

/** Circular age tiles. Age groups with no products are hidden. */
export function ShopByAge({ products }: { products: Product[] }) {
  const groups = ageGroups.filter((g) => products.some((p) => p.availableSizes.some((s) => sizeFitsAgeGroup(s, g))));
  if (!groups.length) return null;

  return (
    <section aria-labelledby="age-title" className="container-page py-5 sm:py-7">
      <SectionHeading id="age-title" title="Shop by" accent="Age" align="center" />
      <ul className="flex flex-wrap justify-center gap-x-3 gap-y-6 sm:gap-x-12 sm:gap-y-8">
        {groups.map((group) => {
          const i = ageGroups.indexOf(group);
          const [range, unit] = splitAgeName(group.name);
          return (
            <li key={group.slug} className="w-[30%] sm:w-auto">
              <Link to={`/age/${group.slug}`} className="group flex flex-col items-center text-center">
                <span
                  className="relative grid size-[6.5rem] place-items-center rounded-full transition-transform duration-500 group-hover:-translate-y-1 sm:size-40"
                  style={{ background: washes[i % washes.length] }}
                >
                  <span className="grid size-[5rem] place-items-center rounded-full bg-white shadow-[var(--shadow-whisper)] sm:size-28">
                    <span className="flex flex-col items-center leading-none">
                      <span className="font-display text-[1.25rem] font-bold text-brown sm:text-[1.8rem]">{range}</span>
                      <span className="mt-1 text-[0.68rem] font-semibold tracking-[0.06em] text-ink/60 uppercase">
                        {unit}
                      </span>
                    </span>
                  </span>
                  <MoonMotif
                    className={cn(
                      'absolute top-1 right-1.5 size-6 text-gold transition-transform duration-500 group-hover:rotate-12 sm:size-8',
                    )}
                  />
                </span>
                <span className="mt-3 text-sm font-semibold text-ink group-hover:text-cocoa-deep sm:text-base">
                  {range} {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
