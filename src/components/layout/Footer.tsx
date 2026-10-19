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
      <h2 className="mb-4 font-display text-lg text-ink">{title}</h2>
      {children}
    </div>
  );
}

const linkClass = 'link-underline text-ink/75 hover:text-ink';

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

export function Footer() {
  const { contact, brand } = siteConfig;
  const whatsappUrl = isWhatsAppConfigured ? buildWhatsAppUrl(buildGeneralMessage()) : null;
  const phone = isWhatsAppConfigured ? formatPhone(contact.whatsappNumber) : '';
  const socialClass =
    'grid size-11 place-items-center rounded-full bg-white text-ink shadow-[var(--shadow-whisper)] transition hover:-translate-y-0.5';

  return (
    <footer className="mt-10 bg-ivory-deep lg:mt-12">
      {/* Social row */}
      {(instagramUrl || whatsappUrl) && (
        <div className="flex justify-center gap-3 border-b border-ink/5 py-8">
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

      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:gap-12 lg:py-16">
        <FooterColumn title="About">
          <img
            src="/images/brand/chinnithara-moon-mark-240.webp"
            alt=""
            width={240}
            height={240}
            loading="lazy"
            className="mb-4 size-20 rounded-full bg-logo-cream ring-1 ring-gold/30"
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

      <div className="border-t border-ink/10">
        <div className="container-page flex flex-col items-center gap-1 py-6 text-center text-sm text-ink/65 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="font-display text-base text-ink/80 italic">{brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
