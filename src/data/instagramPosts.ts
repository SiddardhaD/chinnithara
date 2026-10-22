/**
 * Instagram posts shown on the homepage "Follow along" section.
 *
 * Instagram doesn't allow a free, key-less live feed, so posts are added here by hand:
 * save the post image to /public/images/instagram/ (about 720px wide, WebP) and add a line.
 * Set `url` to the post's link (Instagram → ⋯ → Copy link); without it, the tile opens the profile.
 * Newest first — the first 4 are shown.
 */
export type InstagramPost = { img: string; alt: string; width: number; height: number; url?: string };

export const instagramPosts: InstagramPost[] = [
  {
    img: '/images/instagram/pure-muslin-720.webp',
    alt: 'Instagram post: “Pure Muslin. Pure Love.” — a smiling baby girl in a floral muslin dress',
    width: 720,
    height: 868,
  },
  {
    img: '/images/instagram/cloth-nappy-720.webp',
    alt: 'Instagram post: a laughing baby in a printed muslin cloth nappy on a cream blanket',
    width: 720,
    height: 866,
  },
  {
    img: '/images/instagram/wash-cloths-720.webp',
    alt: 'Instagram post: Muslin wash cloths — softness for every little moment',
    width: 720,
    height: 716,
  },
];
