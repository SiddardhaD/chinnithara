export type NavItem = { label: string; to: string };

/** Category row in the desktop header, and the "Shop" group elsewhere. */
export const shopNav: NavItem[] = [
  { label: 'Shop All', to: '/shop' },
  { label: 'Co-ord Sets', to: '/collections/muslin-co-ord-sets' },
  { label: 'Frocks', to: '/collections/frocks' },
  { label: 'Jablas & Rompers', to: '/collections/jablas-and-rompers' },
  { label: 'Muslin Essentials', to: '/collections/muslin-essentials' },
];

export const browseNav: NavItem[] = [
  { label: 'Shop by Style', to: '/collections' },
  { label: 'Shop by Print', to: '/prints' },
  { label: 'Shop by Age', to: '/age' },
];

export const aboutNav: NavItem[] = [
  { label: 'Our Story', to: '/our-story' },
  { label: 'Contact', to: '/contact' },
];

/** Desktop header category row. */
export const headerNav: NavItem[] = [
  ...shopNav,
  { label: 'Shop by Print', to: '/prints' },
  { label: 'Shop by Age', to: '/age' },
  ...aboutNav,
];

export const policyNav: NavItem[] = [
  { label: 'Shipping & Delivery', to: '/shipping-delivery' },
  { label: 'Returns & Exchanges', to: '/returns-exchanges' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-conditions' },
];
