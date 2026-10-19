import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { CloudMotif } from './Motifs';

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
      <CloudMotif className="absolute top-8 -right-6 hidden w-40 text-gold/70 md:block" />
      <div className="container-page py-5 sm:py-8">
        <Breadcrumbs items={crumbs} />
        <div className="mt-3 max-w-3xl sm:mt-5">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-[1.8rem] sm:text-4xl lg:text-[2.75rem]">{title}</h1>
          {description && <p className="mt-3 text-base text-ink/80 sm:mt-4 sm:text-lg">{description}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}
