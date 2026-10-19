import { Link } from 'react-router';
import { siteConfig } from '../../config/site';
import { MoonMotif } from '../common/Motifs';

export function AnnouncementBar() {
  const { message, linkLabel, linkTo } = siteConfig.announcement;
  if (!message) return null;

  return (
    <div className="bg-brown text-ivory">
      <p className="container-page flex min-h-8 flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-1.5 text-center text-[0.75rem] sm:min-h-9 sm:text-[0.78rem] tracking-normal">
        <MoonMotif className="hidden size-3.5 text-gold sm:block" />
        <span>{message}</span>
        {linkLabel && linkTo && (
          <Link to={linkTo} className="hidden font-semibold text-gold-soft underline-offset-4 hover:underline sm:inline">
            {linkLabel}
          </Link>
        )}
      </p>
    </div>
  );
}
