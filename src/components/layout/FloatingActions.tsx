import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isWhatsAppConfigured } from '../../config/site';
import { cn } from '../../utils/format';
import { buildGeneralMessage, buildWhatsAppUrl } from '../../utils/whatsapp';
import { WhatsAppIcon } from '../common/WhatsAppButton';

/** Desktop-only floating WhatsApp "Chat" pill and back-to-top button. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const whatsappUrl = isWhatsAppConfigured ? buildWhatsAppUrl(buildGeneralMessage()) : null;

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-6 bottom-6 z-30 hidden flex-col items-end gap-3 lg:flex">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        className={cn(
          'grid size-12 place-items-center rounded-full bg-ink text-white shadow-lg transition-all duration-300 hover:bg-black',
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
        )}
      >
        <ArrowUp className="size-5" />
      </button>
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-whatsapp pr-5 pl-4 font-semibold text-white shadow-lg transition hover:bg-[#17603c]"
        >
          <WhatsAppIcon className="size-6" />
          Chat
          <span className="sr-only"> with us on WhatsApp (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
