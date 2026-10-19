import type { ReactNode } from 'react';
import { cn } from '../../utils/format';

/** Hand-drawn underline used beneath an accented heading word. */
function Swoosh() {
  return (
    <svg
      viewBox="0 0 120 12"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-2.5 w-full text-cocoa/70"
    >
      <path d="M2 9C30 3 78 1 118 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  action,
  align = 'left',
  as: Tag = 'h2',
  id,
}: {
  eyebrow?: string;
  title: string;
  /** Optional word(s) after the title, shown in the accent colour with an underline. */
  accent?: string;
  description?: ReactNode;
  action?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  id?: string;
}) {
  return (
    <div
      className={cn(
        'mb-4 flex flex-col gap-3 sm:mb-6',
        align === 'center' ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between',
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <Tag id={id} className={Tag === 'h1' ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-[1.55rem] sm:text-[1.9rem] lg:text-[2.2rem]'}>
          {title}
          {accent && (
            <>
              {' '}
              <span className="relative inline-block text-cocoa">
                {accent}
                <Swoosh />
              </span>
            </>
          )}
        </Tag>
        {description && <p className={cn('text-base text-ink/80 sm:text-lg', accent ? 'mt-5' : 'mt-3')}>{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
