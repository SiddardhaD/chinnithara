import { siteConfig } from '../../config/site';
import { cn } from '../../utils/format';

/** The official చిన్ని Thara wordmark, used as supplied and only scaled. */
export function Wordmark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <img
      src="/images/brand/chinnithara-wordmark-480.webp"
      srcSet="/images/brand/chinnithara-wordmark-480.webp 480w, /images/brand/chinnithara-wordmark-960.webp 960w"
      sizes="(min-width: 1024px) 220px, 170px"
      width={480}
      height={114}
      alt={siteConfig.brand.name}
      className={cn('h-auto select-none', className)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
    />
  );
}

/** Full official logo lockup: sleeping baby on a golden moon, wordmark, tagline and descriptor. */
export function FullLogo({ className }: { className?: string }) {
  return (
    <img
      src="/images/brand/chinnithara-logo-480.webp"
      srcSet="/images/brand/chinnithara-logo-480.webp 480w, /images/brand/chinnithara-logo-800.webp 800w"
      sizes="(min-width: 1024px) 320px, 240px"
      width={480}
      height={480}
      alt={`${siteConfig.brand.name} logo: a baby sleeping on a golden crescent moon among clouds and cotton flowers. ${siteConfig.brand.tagline} ${siteConfig.brand.descriptor}.`}
      className={cn('h-auto rounded-[1.5rem] bg-logo-cream select-none', className)}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
