/**
 * Delicate line motifs drawn from the logo — moon, cloud, cotton flower, sprig.
 * Decorative only (aria-hidden). Use sparingly so photography stays the focus.
 */
type MotifProps = { className?: string };

export function MoonMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <path
        d="M40 8a26 26 0 1 0 16 44A22 22 0 0 1 40 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M50 14l1.2 2.8L54 18l-2.8 1.2L50 22l-1.2-2.8L46 18l2.8-1.2Z" fill="currentColor" />
    </svg>
  );
}

export function CloudMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 96 40" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14 34h66a12 12 0 0 0 0-24 16 16 0 0 0-29-4A13 13 0 0 0 30 16a10 10 0 0 0-16 18Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CottonMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="22" r="8" />
        <circle cx="22" cy="31" r="8" />
        <circle cx="42" cy="31" r="8" />
        <circle cx="32" cy="37" r="7" />
        <path d="M24 42c3 3 13 3 16 0M32 44v16M32 54c-4-3-9-3-12-1M32 50c4-3 9-3 12-1" />
      </g>
    </svg>
  );
}

export function SprigMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 120 24" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M4 12h112" />
        <path d="M60 12c-6-8-14-8-18-6 4 4 10 6 18 6Zm0 0c6-8 14-8 18-6-4 4-10 6-18 6Z" />
      </g>
      <circle cx="60" cy="12" r="2.2" fill="currentColor" />
    </svg>
  );
}
