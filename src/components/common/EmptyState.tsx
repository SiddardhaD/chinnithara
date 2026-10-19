import type { ReactNode } from 'react';
import { MoonMotif } from './Motifs';

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-[var(--radius-soft)] border border-dashed border-gold/60 bg-ivory-deep/60 px-6 py-14 text-center">
      <MoonMotif className="mb-4 size-12 text-gold" />
      <h2 className="text-2xl sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-md text-ink/80">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
