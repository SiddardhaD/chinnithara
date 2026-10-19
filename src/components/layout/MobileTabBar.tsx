import { Home, LayoutGrid, MessageCircle, Search, Shirt } from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router';
import { isWhatsAppConfigured } from '../../config/site';
import { cn } from '../../utils/format';
import { buildGeneralMessage, buildWhatsAppUrl } from '../../utils/whatsapp';

/** Fired by the Search tab; the Header listens and opens the search dialog. */
export const OPEN_SEARCH_EVENT = 'ct:open-search';

const itemClass = 'flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-[0.68rem] font-semibold';

function TabLink({ to, end, icon, label }: { to: string; end?: boolean; icon: ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => cn(itemClass, isActive ? 'text-cocoa-deep' : 'text-ink/60 hover:text-ink')}
    >
      {({ isActive }) => (
        <>
          <span className={cn('grid h-7 w-12 place-items-center rounded-full transition-colors', isActive && 'bg-blush-soft')}>
            {icon}
          </span>
          {label}
        </>
      )}
    </NavLink>
  );
}

/** App-style bottom navigation, shown below the `lg` breakpoint. */
export function MobileTabBar() {
  const whatsappUrl = isWhatsAppConfigured ? buildWhatsAppUrl(buildGeneralMessage()) : null;
  const iconClass = 'size-5';

  return (
    <nav
      aria-label="Quick navigation"
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-xl items-stretch px-1">
        <TabLink to="/" end icon={<Home className={iconClass} />} label="Home" />
        <TabLink to="/shop" end icon={<Shirt className={iconClass} />} label="Shop" />
        <TabLink to="/collections" icon={<LayoutGrid className={iconClass} />} label="Categories" />
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))}
          className={cn(itemClass, 'text-ink/60 hover:text-ink')}
        >
          <span className="grid h-7 w-12 place-items-center">
            <Search className={iconClass} />
          </span>
          Search
        </button>
        {whatsappUrl ? (
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={cn(itemClass, 'text-whatsapp')}>
            <span className="grid h-7 w-12 place-items-center">
              <MessageCircle className={iconClass} />
            </span>
            Chat
            <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
        ) : (
          <TabLink to="/contact" icon={<MessageCircle className={iconClass} />} label="Contact" />
        )}
      </div>
    </nav>
  );
}
