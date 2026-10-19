import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { products } from './src/data/products';
import { collections } from './src/data/categories';
import { prints } from './src/data/prints';
import { ageGroups } from './src/data/sizes';

const staticRoutes = [
  '/',
  '/shop',
  '/collections',
  '/prints',
  '/age',
  '/our-story',
  '/contact',
  '/shipping-delivery',
  '/returns-exchanges',
  '/privacy-policy',
  '/terms-conditions',
];

/** Emits robots.txt always, and sitemap.xml when VITE_SITE_URL is configured. */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'chinnithara-seo-files',
    apply: 'build',
    generateBundle() {
      const origin = siteUrl.replace(/\/$/, '');
      const robots = ['User-agent: *', 'Allow: /'];

      if (origin) {
        const routes = [
          ...staticRoutes,
          ...collections.map((c) => `/collections/${c.slug}`),
          ...prints.map((p) => `/prints/${p.slug}`),
          ...ageGroups.map((a) => `/age/${a.slug}`),
          ...products.map((p) => `/products/${p.slug}`),
        ];
        const body = routes.map((r) => `  <url><loc>${origin}${r}</loc></url>`).join('\n');
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
        });
        robots.push('', `Sitemap: ${origin}/sitemap.xml`);
      } else {
        this.warn('VITE_SITE_URL is not set — sitemap.xml was skipped. See README → Configuration.');
      }

      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL ?? '')],
  };
});
