import { Link } from 'react-router';
import { SectionHeading } from '../common/SectionHeading';

/**
 * Round fabric swatches cut from real product photos (public/images/prints/).
 * Each opens Shop All filtered by the print name, so it stays correct as products change.
 */
const swatches = [
  { name: 'Penguins', q: 'penguins', img: 'penguins' },
  { name: 'Bunnies', q: 'bunnies', img: 'bunnies' },
  { name: 'Peaches', q: 'peaches', img: 'peaches' },
  { name: 'Mangoes', q: 'mangoes', img: 'mangoes' },
  { name: 'Toucans', q: 'toucans', img: 'toucans' },
  { name: 'Leaves', q: 'leaves', img: 'leaves' },
  { name: 'Butterflies', q: 'butterflies', img: 'butterflies' },
  { name: 'Moons & Clouds', q: 'moons', img: 'moons' },
  { name: 'Crabs', q: 'crabs', img: 'crabs' },
  { name: 'Birds', q: 'birds', img: 'birds' },
];

export function ShopByPrintStrip() {
  return (
    <section aria-labelledby="prints-title" className="container-page py-5 sm:py-7">
      <SectionHeading
        id="prints-title"
        title="Shop by"
        accent="Print"
        align="center"
        description="Find the little print they’ll love."
      />
      <ul className="scroll-row -mx-4 flex gap-4 overflow-x-auto [contain:paint] px-4 pt-1 pb-2 sm:gap-6 lg:mx-0 lg:grid lg:grid-cols-10 lg:gap-4 lg:overflow-visible lg:px-0">
        {swatches.map((s) => (
          <li key={s.q} className="shrink-0">
            <Link to={`/shop?q=${encodeURIComponent(s.q)}`} className="group flex w-20 flex-col items-center text-center sm:w-24 lg:w-auto">
              <span className="relative block size-20 rounded-full p-[3px] ring-1 ring-ink/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-2 group-hover:ring-cocoa sm:size-24 lg:size-[5.75rem] xl:size-[6.5rem]">
                <img
                  src={`/images/prints/${s.img}-320.webp`}
                  alt=""
                  width={320}
                  height={320}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
              <span className="mt-2.5 text-[0.82rem] leading-tight font-semibold text-ink/80 group-hover:text-cocoa-deep sm:text-sm">
                {s.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-center">
        <Link to="/prints" className="link-underline text-sm font-semibold text-ink">
          View all prints »
        </Link>
      </p>
    </section>
  );
}
