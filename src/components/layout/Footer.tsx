import { Mail, MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { instagramUrl, isWhatsAppConfigured, siteConfig } from '../../config/site';
import { formatPhone } from '../../utils/phone';
import { buildGeneralMessage, buildWhatsAppUrl } from '../../utils/whatsapp';
import { InstagramIcon } from '../common/InstagramIcon';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { aboutNav, policyNav, shopNav } from './navigation';

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 font-footer text-[1.3rem] font-medium tracking-[-0.01em] text-ink">{title}</h2>
      {children}
    </div>
  );
}

const linkClass = 'link-underline text-ink/85 hover:text-ink';

function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-white text-cocoa-deep" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink/55">{label}</p>
        <div className="break-words text-ink/85">{children}</div>
      </div>
    </li>
  );
}

/** Phone footer: brand block, tap-to-contact buttons, folding link groups and a slim bottom bar. */
function MobileFooter() {
  const { contact, brand } = siteConfig;
  const whatsappUrl = isWhatsAppConfigured ? buildWhatsAppUrl(buildGeneralMessage()) : null;

  const actions = [
    whatsappUrl && { href: whatsappUrl, label: 'WhatsApp', icon: <WhatsAppIcon className="size-5" />, tone: 'text-whatsapp', external: true },
    isWhatsAppConfigured && { href: `tel:+${contact.whatsappNumber}`, label: 'Call', icon: <Phone className="size-5" />, tone: 'text-cocoa-deep' },
    contact.email && { href: `mailto:${contact.email}`, label: 'Email', icon: <Mail className="size-5" />, tone: 'text-cocoa-deep' },
    instagramUrl && { href: instagramUrl, label: 'Instagram', icon: <InstagramIcon className="size-5" />, tone: 'text-ink', external: true },
  ].filter(Boolean) as Array<{ href: string; label: string; icon: ReactNode; tone: string; external?: boolean }>;

  const groups = [
    { title: 'Shop', items: shopNav },
    { title: 'About us', items: aboutNav },
    { title: 'Help & policies', items: policyNav },
  ];

  return (
    <div className="md:hidden">
      {/* Brand block */}
      <div className="relative overflow-hidden bg-logo-cream px-6 pt-9 pb-8 text-center">
        <div aria-hidden="true" className="absolute top-6 left-1/2 size-48 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
        <img
          src="/images/brand/chinnithara-emblem-240.webp"
          srcSet="/images/brand/chinnithara-emblem-240.webp 240w, /images/brand/chinnithara-emblem-480.webp 480w"
          sizes="160px"
          alt=""
          width={240}
          height={170}
          loading="lazy"
          className="relative mx-auto h-auto w-40"
        />
        <img
          src="/images/brand/chinnithara-wordmark-480.webp"
          alt={brand.name}
          width={480}
          height={114}
          loading="lazy"
          className="relative mx-auto mt-2 h-auto w-44"
        />
        <p className="relative mt-3 text-[0.7rem] font-bold tracking-[0.18em] text-cocoa-deep uppercase">{brand.tagline}</p>
        <p className="relative mx-auto mt-3 max-w-xs text-sm text-ink/70">
          Thoughtfully chosen muslin babywear and baby-care essentials for little ones up to 2 years.
        </p>

        {actions.length > 0 && (
          <ul className="relative mt-6 grid grid-cols-4 gap-2">
            {actions.map((a) => (
              <li key={a.label}>
                <a
                  href={a.href}
                  {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/80 px-1 py-3 shadow-[var(--shadow-whisper)] transition active:scale-95"
                >
                  <span className={a.tone}>{a.icon}</span>
                  <span className="text-[0.7rem] font-semibold text-ink/80">{a.label}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Link groups */}
      <div className="px-4 py-2">
        {groups.map((g) => (
          <details key={g.title} className="group border-b border-ink/10 last:border-0">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-footer text-[1.05rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
              {g.title}
              <span
                aria-hidden="true"
                className="grid size-7 place-items-center rounded-full bg-white text-lg leading-none text-ink/70 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 pb-4">
              {g.items.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="block py-1.5 text-sm text-ink/70 active:text-cocoa-deep">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
        <p className="flex items-start gap-2 py-4 text-sm text-ink/65">
          <MapPin className="mt-0.5 size-4 shrink-0 text-cocoa" aria-hidden="true" />
          Based in {contact.location}
        </p>
      </div>

      <p className="border-t border-ink/10 px-4 py-4 text-center text-xs text-ink/55">
        © {new Date().getFullYear()} {brand.name}. Made with love for little ones.
      </p>
    </div>
  );
}

export function Footer() {
  const { contact, brand } = siteConfig;
  const whatsappUrl = isWhatsAppConfigured ? buildWhatsAppUrl(buildGeneralMessage()) : null;
  const phone = isWhatsAppConfigured ? formatPhone(contact.whatsappNumber) : '';
  const socialClass =
    'grid size-11 place-items-center rounded-full bg-white text-ink shadow-[var(--shadow-whisper)] transition hover:-translate-y-0.5';

  return (
    <footer className="mt-10 bg-ivory-deep font-footer text-[1.02rem] lg:mt-12">
      <MobileFooter />

      {/* Social row (tablet and desktop) */}
      {(instagramUrl || whatsappUrl) && (
        <div className="hidden justify-center gap-3 border-b border-ink/5 py-8 md:flex">
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="Instagram (opens in a new tab)">
              <InstagramIcon className="size-5" />
            </a>
          )}
          {whatsappUrl && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${socialClass} text-whatsapp`} aria-label="WhatsApp (opens in a new tab)">
              <WhatsAppIcon className="size-5" />
            </a>
          )}
        </div>
      )}

      <div className="container-page hidden gap-10 py-12 md:grid md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:gap-12 lg:py-16">
        <FooterColumn title="About">
          <img
            src="/images/brand/chinnithara-emblem-240.webp"
            srcSet="/images/brand/chinnithara-emblem-240.webp 240w, /images/brand/chinnithara-emblem-480.webp 480w"
            sizes="128px"
            alt=""
            width={240}
            height={170}
            loading="lazy"
            className="mb-4 h-auto w-32"
          />
          <p className="max-w-sm text-ink/75">
            <strong className="font-semibold text-ink">{brand.name}</strong> is a babywear boutique offering
            thoughtfully chosen muslin clothing and baby-care essentials for little ones up to 2 years.
          </p>
        </FooterColumn>

        <FooterColumn title="Shop">
          <ul className="space-y-2.5">
            {shopNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Quick links">
          <ul className="space-y-2.5">
            {[...aboutNav, ...policyNav].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Contact">
          <ul className="space-y-4">
            {phone && (
              <ContactRow icon={<Phone className="size-4" />} label="Call or WhatsApp">
                <a href={`tel:+${contact.whatsappNumber}`} className="hover:underline">
                  {phone}
                </a>
              </ContactRow>
            )}
            {contact.email && (
              <ContactRow icon={<Mail className="size-4" />} label="Email">
                <a href={`mailto:${contact.email}`} className="break-all hover:underline">
                  {contact.email}
                </a>
              </ContactRow>
            )}
            <ContactRow icon={<MapPin className="size-4" />} label="Based in">
              {contact.location}
            </ContactRow>
          </ul>
        </FooterColumn>
      </div>

      <div className="hidden border-t border-ink/10 md:block">
        <div className="container-page flex flex-col items-center gap-1 py-6 text-center text-sm text-ink/65 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="font-footer text-base text-ink/75">{brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
