import { Menu, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { instagramUrl, isWhatsAppConfigured } from '../../config/site';
import { cn } from '../../utils/format';
import { buildGeneralMessage, buildWhatsAppUrl } from '../../utils/whatsapp';
import { InstagramIcon } from '../common/InstagramIcon';
import { Wordmark } from '../common/Logo';
import { SearchBar } from '../common/SearchBar';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { MobileMenu } from './MobileMenu';
import { OPEN_SEARCH_EVENT } from './MobileTabBar';
import { headerNav } from './navigation';

const iconButton = 'grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative block py-2.5 text-[0.84rem] font-semibold xl:text-[0.92rem] whitespace-nowrap transition-colors',
    'after:absolute after:inset-x-0 after:bottom-1 after:h-[2px] after:origin-left after:rounded-full after:bg-cocoa after:transition-transform after:duration-300',
    isActive ? 'text-ink after:scale-x-100' : 'text-ink/75 after:scale-x-0 hover:text-ink hover:after:scale-x-100',
  );

/**
 * Two-tier header.
 * Desktop: social icons · centred logo · search/chat, then a row of category links.
 * Mobile: menu · logo · search (plus the bottom tab bar).
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const whatsappUrl = isWhatsAppConfigured ? buildWhatsAppUrl(buildGeneralMessage()) : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const open = () => setSearchOpen(true);
    window.addEventListener(OPEN_SEARCH_EVENT, open);
    return () => window.removeEventListener(OPEN_SEARCH_EVENT, open);
  }, []);

  // Close overlays when the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300',
          scrolled ? 'border-ink/10 shadow-[0_6px_20px_-18px_rgb(0_0_0/0.5)]' : 'border-ink/5',
        )}
      >
        {/* Top row */}
        <div
          className={cn(
            'container-page grid grid-cols-[1fr_auto_1fr] items-center gap-3 transition-[height] duration-300',
            scrolled ? 'h-14 lg:h-16' : 'h-14 lg:h-[5.25rem]',
          )}
        >
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={cn(iconButton, '-ml-2 lg:hidden')}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="size-6" />
            </button>
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(iconButton, '-ml-2 hidden lg:grid')}
                aria-label="ChinniThara on Instagram (opens in a new tab)"
              >
                <InstagramIcon className="size-5" />
              </a>
            )}
          </div>

          <Link to="/" className="flex items-center gap-2.5 rounded-md" aria-label="ChinniThara home">
            <img
              src="/images/brand/chinnithara-emblem-240.webp"
              srcSet="/images/brand/chinnithara-emblem-240.webp 240w, /images/brand/chinnithara-emblem-480.webp 480w"
              sizes="80px"
              alt=""
              width={240}
              height={170}
              className={cn('hidden h-auto transition-all duration-300 lg:block', scrolled ? 'w-14' : 'w-20')}
            />
            <Wordmark priority className="w-[132px] sm:w-[160px] lg:w-[190px] xl:w-[210px]" />
          </Link>

          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={cn(iconButton, '-mr-2 lg:mr-0')}
              aria-label="Search the collection"
            >
              <Search className="size-5" />
            </button>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(iconButton, '-mr-2 hidden text-whatsapp lg:grid')}
                aria-label="Chat with us on WhatsApp (opens in a new tab)"
              >
                <WhatsAppIcon className="size-5" />
              </a>
            )}
          </div>
        </div>

        {/* Category row (desktop) */}
        <nav aria-label="Primary" className="hidden border-t border-ink/5 lg:block">
          <ul className="container-page flex flex-wrap items-center justify-center gap-x-5 xl:gap-x-9">
            {headerNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClass} end={item.to === '/shop'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <SearchBar open={searchOpen} onClose={closeSearch} />
    </>
  );
}
