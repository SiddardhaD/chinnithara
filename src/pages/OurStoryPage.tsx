import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CloudMotif, CottonMotif, MoonMotif } from '../components/common/Motifs';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * Our Story images. Replace the paths when new photos are ready:
 *  • hero  — wide 16:9 mood photo, left third kept empty for the title (public/images/story/)
 *  • calm  — generic calm mood photo (no logo, no product), e.g. a moonlit nursery corner
 */
const storyImages = {
  hero: {
    src: '/images/banners/brand-sleep-1672.webp',
    srcSet: '/images/banners/brand-sleep-960.webp 960w, /images/banners/brand-sleep-1672.webp 1672w',
    alt: 'A baby sleeping peacefully on a cream muslin blanket beside a moon cushion and cotton flowers',
    width: 1672,
    height: 941,
  },
  /** Generic calm mood photo for "Behind the moon" (4:3 or square). Set to null to show the illustration. */
  calm: null as null | { src: string; alt: string; width: number; height: number },
};

const values = [
  {
    icon: MoonMotif,
    title: 'Comfort first',
    text: 'Easy cuts, simple closures and soft muslin, chosen with little bodies — and busy parents — in mind.',
  },
  {
    icon: CottonMotif,
    title: 'Thoughtfully chosen',
    text: 'A small, considered collection. Every style and print is picked with care.',
  },
  {
    icon: CloudMotif,
    title: 'A personal touch',
    text: 'Every message is answered by a real person on WhatsApp — from sizing to prints.',
  },
];

const collection = [
  { label: 'Co-ord sets', to: '/collections/muslin-co-ord-sets', img: '/images/products/muslin-co-ord-set-colour-print/lilac-bunnies-600.webp' },
  { label: 'Frocks', to: '/collections/frocks', img: '/images/products/muslin-zip-frock/aqua-toucans-600.webp' },
  { label: 'Jablas', to: '/collections/jablas-and-rompers', img: '/images/products/side-button-muslin-jabla/ice-creams-flat-600.webp' },
  { label: 'Essentials', to: '/collections/muslin-essentials', img: '/images/products/muslin-cloth-nappy/moons-clouds-600.webp' },
];

export function OurStoryPage() {
  usePageMeta({
    title: 'Our Story',
    description:
      'ChinniThara is a babywear boutique offering thoughtfully chosen muslin clothing and baby essentials. Little comforts. Endless wonders.',
    path: '/our-story',
  });

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: 'Our Story' }]} />
        <div className="relative mt-4 grid overflow-hidden rounded-[1.5rem] bg-logo-cream lg:block lg:h-[30rem] lg:rounded-[2rem]">
          <img
            src={storyImages.hero.src}
            srcSet={storyImages.hero.srcSet}
            sizes="(min-width: 1280px) 1200px, 100vw"
            width={storyImages.hero.width}
            height={storyImages.hero.height}
            alt={storyImages.hero.alt}
            fetchPriority="high"
            className="aspect-video w-full object-cover object-[65%_50%] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-gradient-to-r from-logo-cream via-logo-cream/70 via-30% to-transparent to-60% lg:block"
          />
          <div className="relative px-5 py-6 sm:px-8 lg:flex lg:h-full lg:max-w-md lg:flex-col lg:justify-center lg:px-12">
            <p className="eyebrow mb-2">Our story</p>
            <h1 className="text-[1.9rem] leading-tight sm:text-4xl lg:text-[2.6rem]">
              Little comforts.
              <br />
              <span className="text-cocoa">Endless wonders.</span>
            </h1>
            <p className="mt-3 text-ink/75">A babywear boutique for little ones up to two years old.</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-page py-8 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <MoonMotif className="mx-auto mb-4 size-10 text-gold" />
          <p className="font-display text-xl leading-snug font-bold text-brown sm:text-2xl">
            We believe the smallest outfits carry the biggest memories — first smiles, first outings, first birthdays.
          </p>
          <p className="mt-4 text-ink/75 sm:text-lg">
            ChinniThara brings together soft muslin co-ord sets, pretty frocks, jablas and everyday baby essentials in
            prints that feel gentle, happy and easy to love. Our aim is simple: pieces that keep babies comfortable and
            make those moments feel a little more special.
          </p>
        </div>
      </section>

      {/* Behind the name + care photo */}
      <section className="container-page pb-8 sm:pb-12">
        <div className="grid items-center gap-6 rounded-[2rem] bg-ivory-deep p-4 sm:p-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-10">
          {storyImages.calm ? (
            <img
              src={storyImages.calm.src}
              width={storyImages.calm.width}
              height={storyImages.calm.height}
              alt={storyImages.calm.alt}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-logo-cream via-[#fbf1df] to-blush-soft"
            >
              <div className="absolute top-[12%] left-1/2 size-[46%] -translate-x-1/2 rounded-full bg-gold/15 blur-2xl" />
              <MoonMotif className="absolute top-[14%] left-1/2 w-[34%] -translate-x-1/2 text-gold" />
              <CloudMotif className="absolute top-[56%] left-[12%] w-[30%] text-cocoa/40" />
              <CloudMotif className="absolute top-[64%] right-[10%] w-[24%] text-cocoa/30" />
              <CottonMotif className="absolute bottom-[6%] left-[38%] w-[14%] text-sage-deep/60" />
              <CottonMotif className="absolute bottom-[10%] left-[52%] w-[10%] text-sage-deep/45" />
              {[['18%', '20%'], ['78%', '18%'], ['84%', '44%'], ['10%', '42%'], ['66%', '8%']].map(([l, t]) => (
                <span key={l + t} className="absolute size-1.5 rounded-full bg-gold/70" style={{ left: l, top: t }} />
              ))}
            </div>
          )}
          <div className="px-1">
            <p className="eyebrow mb-2">Behind the moon</p>
            <h2 className="text-[1.6rem] sm:text-[2rem]">
              A little world of <span className="text-cocoa">calm</span>
            </h2>
            <div className="mt-3 space-y-3 text-ink/75">
              <p>
                <strong className="font-semibold text-ink">Chinni</strong> means “little” in Telugu. Our logo shows a
                baby sleeping peacefully on a golden crescent moon, surrounded by soft clouds and cotton flowers —
                restful, warm and full of quiet wonder.
              </p>
              <p>
                That same feeling guides everything we choose: soft muslin, gentle colours, sweet prints, and styles
                that are simple to put on and lovely to look at.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-page pb-8 sm:pb-12">
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-5">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-[var(--radius-soft)] border border-ink/8 bg-white p-5 sm:p-6">
              <span className="grid size-12 place-items-center rounded-full bg-blush-soft text-cocoa-deep">
                <Icon className="size-7" />
              </span>
              <h3 className="mt-3 text-lg">{title}</h3>
              <p className="mt-1 text-sm text-ink/70">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Collection + CTA */}
      <section className="container-page pb-4">
        <div className="rounded-[2rem] border border-ink/8 bg-white p-5 text-center sm:p-8">
          <h2 className="text-[1.5rem] sm:text-[1.9rem]">
            Explore the <span className="text-cocoa">collection</span>
          </h2>
          <ul className="mx-auto mt-5 grid max-w-3xl grid-cols-4 gap-2 sm:gap-4">
            {collection.map((c) => (
              <li key={c.to}>
                <Link to={c.to} className="group block">
                  <img
                    src={c.img}
                    alt=""
                    width={600}
                    height={600}
                    loading="lazy"
                    className="aspect-square w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="mt-2 block text-xs font-semibold text-ink/80 group-hover:text-cocoa-deep sm:text-sm">
                    {c.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/shop" className="btn btn-primary">
              Shop all
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Say hello
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
