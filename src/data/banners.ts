import type { Banner } from '../types/product';

/**
 * Homepage carousel slides, in display order. The carousel opens centred on the
 * SECOND slide, so keep your strongest slide in position two.
 *
 * To use a real campaign photo, add a landscape image (about 1600 × 900, WebP) to
 * /public/images/banners/ and set `image` on a slide. Slides without an image show a
 * designed panel (illustration or emblem). Never use photos of products you don't stock.
 */
const frock = '/images/products/bird-garden-muslin-frock';

export const banners: Banner[] = [
  {
    id: 'knot-frocks',
    eyebrow: 'New · 3–6 months',
    title: 'Little knot',
    titleAccent: 'frocks',
    text: 'Tie-up shoulder bows and soft gathered muslin — in five sweet designs.',
    cta: { label: 'Shop knot frocks', to: '/products/muslin-knot-frock' },
    image: {
      src: '/images/banners/knot-frocks-1672.webp',
      srcSet: '/images/banners/knot-frocks-960.webp 960w, /images/banners/knot-frocks-1672.webp 1672w',
      alt: 'Three smiling baby girls lying on a cream blanket in aqua, pink peach and lemon mango muslin knot frocks',
      width: 1672,
      height: 940,
      objectPosition: '60% 50%',
    },
    layout: 'full',
    tone: 'cream',
  },
  {
    id: 'co-ord-edit',
    eyebrow: 'New · Sizes up to 2 years',
    title: 'The Muslin',
    titleAccent: 'Co-ord Edit',
    text: 'Snap-front tops and pull-on shorts in sweet little prints.',
    cta: { label: 'Shop co-ord sets', to: '/collections/muslin-co-ord-sets' },
    image: {
      src: '/images/banners/co-ord-edit-1672.webp',
      srcSet: '/images/banners/co-ord-edit-960.webp 960w, /images/banners/co-ord-edit-1672.webp 1672w',
      alt: 'Four laughing babies in matching muslin co-ord sets in yellow, pink, lilac and aqua prints, playing on a cream rug',
      width: 1672,
      height: 941,
      objectPosition: '60% 50%',
    },
    layout: 'full',
    tone: 'cream',
  },
  {
    id: 'hero-frock',
    eyebrow: 'Exquisite Baby Clothing',
    title: 'Little outfits.',
    titleAccent: 'Big little moments.',
    text: 'Thoughtfully chosen babywear in soft muslin and delightful prints.',
    cta: { label: 'Explore the collection', to: '/shop' },
    image: {
      src: `${frock}/flatlay-wide-1600.webp`,
      srcSet: `${frock}/flatlay-wide-960.webp 960w, ${frock}/flatlay-wide-1600.webp 1600w`,
      alt: 'The Bird Garden muslin frock laid flat beside white daisies on a wooden table',
      width: 1600,
      height: 1066,
      objectPosition: '62% 50%',
    },
    tone: 'linen',
  },
  {
    id: 'co-ords',
    eyebrow: 'Matching sets',
    title: 'Muslin co-ord sets',
    text: 'Snap-front tops with pull-on shorts — five sweet colour-print designs for 18–24 months.',
    cta: { label: 'Shop co-ord sets', to: '/collections/muslin-co-ord-sets' },
    image: {
      src: '/images/products/muslin-co-ord-set-colour-print/lilac-bunnies-1080.webp',
      srcSet:
        '/images/products/muslin-co-ord-set-colour-print/lilac-bunnies-600.webp 600w, /images/products/muslin-co-ord-set-colour-print/lilac-bunnies-1080.webp 1080w',
      alt: 'Lilac muslin co-ord set with a bunny print: sleeveless snap-front top and shorts',
      width: 1080,
      height: 1080,
    },
    tone: 'sage',
  },
  {
    id: 'brand',
    eyebrow: 'Welcome to ChinniThara',
    title: 'Little comforts.',
    titleAccent: 'Endless wonders.',
    text: 'A babywear boutique for little ones up to two years old.',
    cta: { label: 'Discover our story', to: '/our-story' },
    emblem: true,
    tone: 'cream',
  },
  {
    id: 'essentials',
    eyebrow: 'Baby care',
    title: 'Muslin essentials',
    text: 'Swaddles, bath and hooded towels, wash cloths and cloth nappies.',
    cta: { label: 'Shop essentials', to: '/collections/muslin-essentials' },
    illustration: 'essentials',
    tone: 'blush',
  },
];
