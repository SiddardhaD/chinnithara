import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { FullLogo } from '../components/common/Logo';
import { CloudMotif, CottonMotif, MoonMotif, SprigMotif } from '../components/common/Motifs';
import { PageHeader } from '../components/common/PageHeader';
import { siteConfig } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

const frock = '/images/products/bird-garden-muslin-frock';

const values = [
  {
    icon: MoonMotif,
    title: 'Comfort first',
    text: 'Easy cuts, simple closures and muslin styles chosen with little bodies — and busy parents — in mind.',
  },
  {
    icon: CottonMotif,
    title: 'Thoughtfully chosen',
    text: 'We keep our collection small and considered, choosing each style and print with care.',
  },
  {
    icon: CloudMotif,
    title: 'A personal touch',
    text: 'Every enquiry is answered by a real person on WhatsApp — ask us anything, from sizing to prints.',
  },
];

export function OurStoryPage() {
  usePageMeta({
    title: 'Our Story',
    description:
      'ChinniThara is a babywear boutique offering thoughtfully chosen muslin co-ords and frocks. Little comforts. Endless wonders.',
    path: '/our-story',
  });

  return (
    <>
      <PageHeader crumbs={[{ label: 'Our Story' }]} eyebrow="About us" title="Our story" />

      <section className="container-page grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-display text-3xl leading-snug text-brown sm:text-4xl">
            “{siteConfig.brand.tagline}”
          </p>
          <div className="mt-6 space-y-4 text-lg text-ink/80">
            <p>
              ChinniThara is a babywear boutique for little ones up to two years old. We bring together soft muslin
              co-ord sets, pretty frocks and everyday essentials in prints that feel gentle, happy and easy to love.
            </p>
            <p>
              We believe the smallest outfits carry the biggest memories — first smiles, first outings, first
              birthdays. Our aim is simple: pieces that keep babies comfortable and make those moments feel a little
              more special.
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <FullLogo className="mx-auto w-full max-w-md" />
        </div>
      </section>

      <section className="bg-blush-soft/50 py-10 sm:py-14">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="overflow-hidden rounded-[var(--radius-arch)]">
            <img
              src={`${frock}/front-1066.webp`}
              srcSet={`${frock}/front-600.webp 600w, ${frock}/front-1066.webp 1066w`}
              sizes="(min-width: 1024px) 45vw, 100vw"
              width={1066}
              height={1066}
              loading="lazy"
              decoding="async"
              alt="The Bird Garden Muslin Frock laid flat on a wooden table"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow mb-3">Behind the moon</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.4rem]">A little world of calm</h2>
            <div className="mt-5 space-y-4 text-lg text-ink/80">
              <p>
                Our logo shows a baby sleeping peacefully on a golden crescent moon, surrounded by soft clouds and
                cotton flowers. It captures everything we want ChinniThara to feel like — restful, warm and full of
                quiet wonder.
              </p>
              <p>
                That same feeling guides what we choose: natural, gentle colours, sweet prints, and styles that are
                simple to put on and lovely to look at.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <SprigMotif className="mx-auto mb-6 w-32 text-gold" />
        <ul className="grid gap-10 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="text-center">
              <Icon className="mx-auto size-14 text-cocoa" />
              <h3 className="mt-4 text-2xl sm:text-3xl">{title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-ink/80">{text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/shop" className="btn btn-primary">
            Explore the Collection
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Say hello
          </Link>
        </div>
      </section>
    </>
  );
}
