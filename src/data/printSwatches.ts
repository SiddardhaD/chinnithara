/**
 * Fabric swatches shown on the homepage "Shop by Print" strip and the /prints page.
 * `img` is a square crop of a real product photo in /public/images/prints/<img>-320.webp.
 * `q` is the search term that finds the matching products (design names and colours).
 */
export type PrintSwatch = { name: string; q: string; img: string; blurb: string };

export const printSwatches: PrintSwatch[] = [
  { name: 'Penguins', q: 'penguins', img: 'penguins', blurb: 'Little pastel penguins and tiny daisies.' },
  { name: 'Bunnies', q: 'bunnies', img: 'bunnies', blurb: 'Bunny faces, hearts and tulips on lilac.' },
  { name: 'Peaches', q: 'peaches', img: 'peaches', blurb: 'Juicy peaches on soft pink.' },
  { name: 'Mangoes', q: 'mangoes', img: 'mangoes', blurb: 'Smiling mangoes and pineapples.' },
  { name: 'Toucans', q: 'toucans', img: 'toucans', blurb: 'Toucans, tropical leaves and hibiscus.' },
  { name: 'Leaves', q: 'leaves', img: 'leaves', blurb: 'Tiny white leaves on mustard and olive.' },
  { name: 'Butterflies', q: 'butterflies', img: 'butterflies', blurb: 'Pink and blue butterflies.' },
  { name: 'Moons & Clouds', q: 'moons', img: 'moons', blurb: 'Sleepy clouds, moons and stars.' },
  { name: 'Crabs', q: 'crabs', img: 'crabs', blurb: 'Happy little crabs and waves.' },
  { name: 'Birds', q: 'birds', img: 'birds', blurb: 'Songbirds, berries and leafy sprigs.' },
];
