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
export function usePageMeta({ title, description, path, image, type = 'website', noindex }: PageMeta) {
  useEffect(() => {
    const fullTitle = title === siteConfig.brand.name ? title : `${title} | ${siteConfig.brand.name}`;
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
  }, [title, description, path, image, type, noindex]);
}
