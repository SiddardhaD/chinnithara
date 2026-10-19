import { useId, useState } from 'react';
import { isWhatsAppConfigured } from '../../config/site';
import { cn } from '../../utils/format';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.08.8.82-3-.2-.31a8.2 8.2 0 1 1 6.94 3.84Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43l-.75-1.8c-.2-.47-.4-.4-.55-.41h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.77 4.77 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.69c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

type Props = {
  /** Prefilled message. `null` means the enquiry isn't ready (e.g. no size chosen). */
  message: string | null;
  label: string;
  /** Called instead of opening WhatsApp when `message` is null. */
  onNotReady?: () => void;
  variant?: 'solid' | 'outline' | 'compact';
  className?: string;
};

/**
 * Opens WhatsApp with a prefilled, URL-encoded message. When the business number isn't
 * configured yet, it shows a friendly notice instead of a broken link.
 */
export function WhatsAppButton({ message, label, onNotReady, variant = 'solid', className }: Props) {
  const [showSetupNotice, setShowSetupNotice] = useState(false);
  const noticeId = useId();

  const classes = cn(
    variant === 'solid' && 'btn btn-whatsapp',
    variant === 'outline' && 'btn btn-outline',
    variant === 'compact' &&
      'inline-flex items-center gap-1.5 text-sm font-semibold text-whatsapp hover:underline underline-offset-4 min-h-11',
    className,
  );
  const icon = <WhatsAppIcon className={variant === 'compact' ? 'size-4' : 'size-5'} />;

  const url = message ? buildWhatsAppUrl(message) : null;

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={classes}>
        {icon}
        {label}
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </a>
    );
  }

  return (
    <div className={cn(variant !== 'compact' && 'w-full', variant === 'compact' && 'inline-block')}>
      <button
        type="button"
        className={cn(classes, variant !== 'compact' && 'w-full')}
        aria-describedby={showSetupNotice ? noticeId : undefined}
        onClick={() => {
          if (!message) {
            onNotReady?.();
            return;
          }
          if (!isWhatsAppConfigured) setShowSetupNotice(true);
        }}
      >
        {icon}
        {label}
      </button>
      {showSetupNotice && (
        <p
          id={noticeId}
          role="status"
          className="mt-2 rounded-xl bg-gold-soft/60 px-3 py-2 text-left text-sm text-ink"
        >
          WhatsApp ordering is being set up and will be available very soon. Thank you for your
          patience!
          {import.meta.env.DEV && (
            <span className="mt-1 block text-xs text-cocoa-deep">
              Developer note: set <code>VITE_WHATSAPP_NUMBER</code> in <code>.env</code> (see README).
            </span>
          )}
        </p>
      )}
    </div>
  );
}
