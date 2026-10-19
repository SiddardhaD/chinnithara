import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { instagramUrl, siteConfig } from '../../config/site';
import { cn } from '../../utils/format';
import { Wordmark } from '../common/Logo';
import { CottonMotif } from '../common/Motifs';
import { aboutNav, browseNav, shopNav } from './navigation';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('button, a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Keep keyboard focus inside the drawer while it is open.
      if (e.key === 'Tab' && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>('a, button');
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'block py-2.5 font-display text-[1.25rem] font-bold leading-tight transition-colors',
      isActive ? 'text-cocoa-deep' : 'text-brown hover:text-cocoa-deep',
    );

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Main menu">
      <div className="absolute inset-0 bg-ink/30 animate-fade-in" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className="relative flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-ivory px-6 pt-5 pb-8 shadow-xl animate-fade-up"
      >
        <div className="flex items-center justify-between">
          <Wordmark className="w-36" />
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full hover:bg-brown/5"
            aria-label="Close menu"
          >
            <X className="size-6 text-brown" />
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-8">
          <ul className="border-b border-brown/10 pb-4">
            {[...shopNav, ...browseNav].map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass} onClick={onClose} end={item.to === '/shop'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="pt-4">
            {aboutNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass} onClick={onClose}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-10 text-sm text-ink/75">
          <CottonMotif className="mb-3 size-10 text-sage" />
          <p className="font-display text-lg text-brown italic">{siteConfig.brand.tagline}</p>
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline">
              @{siteConfig.contact.instagramHandle}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
