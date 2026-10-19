import { Search, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useProducts } from '../../hooks/useCatalog';
import { matchesQuery } from '../../utils/search';

/** Search dialog with instant suggestions; Enter goes to the full Shop results. */
export function SearchBar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { products } = useProducts();
  const navigate = useNavigate();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const results = query.trim() ? products.filter((p) => matchesQuery(p, query)).slice(0, 5) : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 px-4 pt-20 backdrop-blur-[2px] animate-fade-in sm:pt-28"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-xl rounded-[var(--radius-soft)] bg-ivory p-4 shadow-[var(--shadow-whisper)] animate-fade-up sm:p-6">
        <h2 id={titleId} className="sr-only">
          Search the collection
        </h2>
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
            onClose();
          }}
          className="flex items-center gap-3 border-b border-brown/20 pb-3"
        >
          <Search className="size-5 shrink-0 text-cocoa" aria-hidden="true" />
          <label htmlFor="site-search" className="sr-only">
            Search by product name or print
          </label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search frocks, co-ords, prints…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent font-display text-lg font-semibold text-brown placeholder:font-normal placeholder:text-brown/40 focus:outline-none sm:text-xl"
          />
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full hover:bg-brown/5"
            aria-label="Close search"
          >
            <X className="size-5" />
          </button>
        </form>

        {query.trim() && (
          <div className="mt-3" aria-live="polite">
            {results.length ? (
              <ul className="divide-y divide-brown/10">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/products/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between gap-4 rounded-lg px-2 py-3 hover:bg-ivory-deep"
                    >
                      <span className="font-medium text-brown">{p.name}</span>
                      <span className="shrink-0 text-xs text-sage-deep">{p.style}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-2 py-3 text-sm text-ink/70">No matches yet — try “frock” or “co-ord”.</p>
            )}
            <button
              type="button"
              onClick={() => {
                navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
                onClose();
              }}
              className="mt-2 px-2 text-sm font-semibold text-cocoa-deep hover:underline"
            >
              See all results in Shop →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
