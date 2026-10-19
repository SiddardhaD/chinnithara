import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-sage-deep">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <li>
          <Link to="/" className="link-underline hover:text-brown">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
            {item.to && i < items.length - 1 ? (
              <Link to={item.to} className="link-underline hover:text-brown">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-brown">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
