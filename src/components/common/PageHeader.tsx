import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { CloudMotif } from './Motifs';

/**
 * Compact page header: breadcrumbs, then the title with its description beside it on
 * wide screens, so products start higher up the page.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  description,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-brown/10 bg-ivory-deep/70">
      <CloudMotif className="absolute top-3 -right-8 hidden w-28 text-gold/50 lg:block" />
      <div className="container-page py-4 sm:py-5">
        <Breadcrumbs items={crumbs} />
        <div className="mt-2.5 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="shrink-0">
            {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
            <h1 className="text-[1.65rem] leading-tight sm:text-[2rem] lg:text-[2.2rem]">{title}</h1>
          </div>
          {description && (
            <p className="mt-2 max-w-xl text-[0.95rem] text-ink/75 lg:mt-0 lg:pb-1 lg:text-right">{description}</p>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
