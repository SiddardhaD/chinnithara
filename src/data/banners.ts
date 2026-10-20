import type { Banner } from '../types/product';

/**
 * Homepage carousel slides, in display order. The carousel opens centred on the
 * SECOND slide, so keep your strongest slide in position two.
 *
 * To use a real campaign photo, add a landscape image (about 1600 × 900, WebP) to
 * /public/images/banners/ and set `image` on a slide. Slides without an image show a
 * designed panel (illustration or emblem). Never use photos of products you don't stock.
 */

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
    id: 'zip-frocks',
    eyebrow: 'New · 12–24 months',
    title: 'Twirl-ready',
    titleAccent: 'zip frocks',
    text: 'Soft pleats, a rounded yoke and an easy back zip — in five sweet designs.',
    cta: { label: 'Shop zip frocks', to: '/products/muslin-zip-frock' },
    image: {
      src: '/images/banners/zip-frocks-1672.webp',
      srcSet: '/images/banners/zip-frocks-960.webp 960w, /images/banners/zip-frocks-1672.webp 1672w',
      alt: 'Three laughing toddler girls in aqua toucan, lilac bunny and mustard leaf muslin zip frocks, playing on a cream rug',
      width: 1672,
      height: 941,
      objectPosition: '75% 50%',
    },
    layout: 'full',
    tone: 'cream',
  },
  {
    id: 'rompers',
    eyebrow: 'New · 3–6 months',
    title: 'Snuggly muslin',
    titleAccent: 'rompers',
    text: 'Easy all-in-one rompers on a soft white base with playful little prints.',
    cta: { label: 'Shop rompers', to: '/collections/jablas-and-rompers' },
    image: {
      src: '/images/banners/rompers-1672.webp',
      srcSet: '/images/banners/rompers-960.webp 960w, /images/banners/rompers-1672.webp 1672w',
      alt: 'Three smiling babies lying on a cream blanket in white printed muslin rompers',
      width: 1672,
      height: 941,
      objectPosition: '70% 50%',
    },
    layout: 'full',
    tone: 'cream',
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
    title: 'Muslin',
    titleAccent: 'essentials',
    text: 'Swaddles, bath and hooded towels, wash cloths and cloth nappies.',
    cta: { label: 'Shop essentials', to: '/collections/muslin-essentials' },
    image: {
      src: '/images/banners/essentials-1672.webp',
      srcSet: '/images/banners/essentials-960.webp 960w, /images/banners/essentials-1672.webp 1672w',
      alt: 'Printed muslin swaddles, a hooded towel and colourful wash cloths arranged on a jute mat',
      width: 1672,
      height: 941,
      objectPosition: '70% 50%',
    },
    layout: 'full',
    tone: 'cream',
  },
];
