import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '../../utils/format';

/** Visual entry point to a collection, print or age group. */
export function CollectionCard({
  to,
  eyebrow,
  title,
  description,
  media,
  shape = 'soft',
  className,
}: {
  to: string;
  eyebrow?: string;
  title: string;
  description?: string;
  media: ReactNode;
  shape?: 'soft' | 'arch';
  className?: string;
}) {
  return (
    <Link to={to} className={cn('group block', className)}>
      <div
        className={cn(
          'relative aspect-[4/5] overflow-hidden bg-ivory-deep',
          shape === 'arch' ? 'rounded-[var(--radius-arch)]' : 'rounded-[var(--radius-soft)]',
        )}
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">{media}</div>
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-ivory/90 text-brown opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="pt-4">
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <h3 className="text-[1.1rem] leading-tight transition-colors group-hover:text-cocoa-deep sm:text-[1.3rem]">{title}</h3>
        {description && <p className="mt-1.5 text-sm text-ink/75">{description}</p>}
      </div>
    </Link>
  );
}
