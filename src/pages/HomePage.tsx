import { ArrowRight, MessageCircle, Ruler, Shirt, Sparkles } from 'lucide-react';
import { InstagramIcon as Instagram } from '../components/common/InstagramIcon';
import { Link } from 'react-router';
import { GarmentIllustration } from '../components/common/GarmentIllustration';
import { FullLogo } from '../components/common/Logo';
import { CottonMotif, SprigMotif } from '../components/common/Motifs';
import { ResponsiveImage } from '../components/common/ResponsiveImage';
import { SectionHeading } from '../components/common/SectionHeading';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { NewArrivalsTabs } from '../components/home/NewArrivalsTabs';
import { ShopByAge } from '../components/home/ShopByAge';
import { ShopByPrintStrip } from '../components/home/ShopByPrintStrip';
import { ShopByStyle } from '../components/home/ShopByStyle';
import { SwaddleSpotlight } from '../components/home/SwaddleSpotlight';
import { Testimonials } from '../components/home/Testimonials';
import { ProductPrice } from '../components/product/ProductPrice';
import { instagramUrl, siteConfig } from '../config/site';
import { banners } from '../data/banners';
import { instagramPosts } from '../data/instagramPosts';
import { useProducts } from '../hooks/useCatalog';
import { usePageMeta } from '../hooks/usePageMeta';


export function HomePage() {
  usePageMeta({
    title: siteConfig.brand.name,
    description:
      'ChinniThara — Exquisite Baby Clothing. Thoughtfully chosen muslin co-ord sets, frocks and baby essentials for little ones up to 2 years.',
    path: '/',
  });

  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const [hero, ...favourites] = featured;

  return (
    <>
      <HeroCarousel banners={banners} />
      <ShopByAge products={products} />
      <NewArrivalsTabs products={products} />

      <ShopByStyle products={products} />

      <ShopByPrintStrip />

      <SwaddleSpotlight product={products.find((p) => p.slug === 'muslin-swaddle')} />

      {/* G. Featured Little Favourites (no sales data yet, so not labelled "Bestsellers") */}
      {hero && (
        <section aria-labelledby="favourites-title" className="container-page py-5 sm:py-7">
          <SectionHeading
            id="favourites-title"
            title="Featured Little"
            accent="Favourites"
            align="center"
          />
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <Link to={`/products/${hero.slug}`} className="group block">
              <div className="overflow-hidden rounded-[var(--radius-soft)] bg-ivory-deep">
                {hero.images[0] ? (
                  <ResponsiveImage
                    image={hero.images[0]}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="aspect-square">
                    <GarmentIllustration category={hero.category} />
                  </div>
                )}
              </div>
              <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="eyebrow mb-1">{hero.style}</p>
                  <h3 className="text-3xl group-hover:text-cocoa-deep">{hero.name}</h3>
                </div>
                <ProductPrice product={hero} />
              </div>
            </Link>
            <ul className="grid content-start gap-6">
              {favourites.map((p, i) => (
                <li key={p.id}>
                  <Link
                    to={`/products/${p.slug}`}
                    className="group grid grid-cols-[6.5rem_1fr] items-center gap-5 rounded-[var(--radius-soft)] border border-brown/10 bg-white/50 p-3 transition hover:border-brown/30 hover:bg-white sm:grid-cols-[8rem_1fr]"
                  >
                    <div className="aspect-square overflow-hidden rounded-2xl">
                      {p.images[0] ? (
                        <ResponsiveImage image={p.images[0]} sizes="8rem" className="h-full w-full object-cover" />
                      ) : (
                        <GarmentIllustration category={p.category} tone={i + 1} label="Coming soon" />
                      )}
                    </div>
                    <div className="min-w-0 pr-2">
                      <p className="text-[0.68rem] font-bold tracking-[0.06em] text-sage-deep uppercase">{p.style}</p>
                      <h3 className="mt-1 text-xl leading-snug group-hover:text-cocoa-deep sm:text-2xl">{p.name}</h3>
                      <ProductPrice product={p} className="mt-1 text-sm" />
                    </div>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop" className="btn btn-primary w-full sm:w-auto">
                  Shop all pieces
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      <Testimonials />

      {/* H. Brand story */}
      <section aria-labelledby="story-title" className="container-page py-5 sm:py-7">
        <div className="grid items-center gap-10 rounded-[2rem] bg-logo-cream px-6 py-12 sm:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-16 lg:py-16">
          <FullLogo className="mx-auto w-64 sm:w-80" />
          <div>
            <p className="eyebrow mb-3">Our story</p>
            <h2 id="story-title" className="text-3xl sm:text-4xl lg:text-[2.4rem]">
              Little comforts, <em className="text-cocoa">endless wonders</em>
            </h2>
            <div className="mt-5 space-y-4 text-lg text-ink/80">
              <p>
                At ChinniThara, we believe little ones deserve pieces that feel as gentle as a lullaby and look as
                sweet as the moments they’re made for.
              </p>
              <p>
                We choose every style with care — comfortable cuts, easy closures and prints that make you smile —
                so you can focus on the cuddles, giggles and first adventures.
              </p>
            </div>
            <Link to="/our-story" className="btn btn-outline mt-8">
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* I. Brand highlights — only claims supported by business information */}
      <section aria-labelledby="highlights-title" className="container-page py-5 sm:py-7">
        <h2 id="highlights-title" className="sr-only">
          Why ChinniThara
        </h2>
        <SprigMotif className="mx-auto mb-6 w-32 text-gold" />
        <ul className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Shirt, title: 'Muslin styles', text: 'Co-ord sets, frocks, jablas, rompers and baby-care essentials in muslin.' },
            { icon: Ruler, title: 'Sizes up to 2 years', text: 'Clear age-based sizing for every piece.' },
            { icon: Sparkles, title: 'Thoughtfully chosen', text: 'Small, curated batches with prints we love.' },
            { icon: MessageCircle, title: 'Personal service', text: 'Ask us anything and order simply over WhatsApp.' },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex flex-col items-center px-4">
              <span className="grid size-14 place-items-center rounded-full bg-blush-soft text-cocoa-deep">
                <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-2xl">{title}</h3>
              <p className="mt-1 max-w-[16rem] text-sm text-ink/75">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* J. Instagram — a link out, not a fake live feed */}
      <section aria-labelledby="instagram-title" className="container-page pt-5 sm:pt-7">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow mb-3">Follow along</p>
            <h2 id="instagram-title" className="text-3xl sm:text-4xl">
              {instagramUrl ? `@${siteConfig.contact.instagramHandle}` : 'ChinniThara on Instagram'}
            </h2>
            <p className="mt-4 max-w-md text-lg text-ink/80">
              {instagramUrl
                ? 'New arrivals, styling ideas and little moments from the ChinniThara family.'
                : 'Our Instagram is coming soon — new arrivals, styling ideas and little moments.'}
            </p>
            {instagramUrl ? (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-7">
                <Instagram className="size-4" aria-hidden="true" />
                Visit our Instagram
              </a>
            ) : (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-linen px-4 py-2 text-sm font-semibold text-brown">
                <CottonMotif className="size-5 text-sage-deep" /> Coming soon
              </p>
            )}
          </div>
          <ul className="grid grid-cols-3 gap-2 sm:gap-3">
            {instagramPosts.slice(0, 3).map((post) => (
              <li key={post.img}>
                <a
                  href={post.url || instagramUrl || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-ivory-deep sm:rounded-2xl"
                >
                  <img
                    src={post.img}
                    alt={post.alt}
                    width={post.width}
                    height={post.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition duration-300 group-hover:bg-ink/35 group-hover:opacity-100">
                    <Instagram className="size-7" />
                  </span>
                  <span className="sr-only"> (opens Instagram in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
