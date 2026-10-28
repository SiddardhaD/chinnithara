import { useEffect } from 'react';
import { absoluteUrl, siteConfig } from '../config/site';

type PageMeta = {
  title: string;
  description: string;
  /** Path for the canonical URL, e.g. "/shop". Defaults to the current path. */
  path?: string;
  image?: string;
  type?: 'website' | 'product';
  noindex?: boolean;
  /** Use the title exactly as given, without adding " | ChinniThara". */
  rawTitle?: boolean;
  /** Structured data (schema.org) for this page, e.g. a Product. */
  jsonLd?: object | null;
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Sets title, description, canonical and Open Graph tags for the current page. */
export function usePageMeta({ title, description, path, image, type = 'website', noindex, rawTitle, jsonLd }: PageMeta) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : '';
  useEffect(() => {
    const fullTitle = rawTitle || title === siteConfig.brand.name ? title : `${title} | ${siteConfig.brand.name}`;
    const url = absoluteUrl(path ?? window.location.pathname);
    const img = absoluteUrl(image ?? '/og-image.jpg');

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setCanonical(url);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:type', type);

    document.getElementById('page-jsonld')?.remove();
    if (ld) {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = 'page-jsonld';
      el.textContent = ld;
      document.head.appendChild(el);
    }
  }, [title, description, path, image, type, noindex, rawTitle, ld]);
}
