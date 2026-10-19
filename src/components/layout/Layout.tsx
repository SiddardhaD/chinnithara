import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { AnnouncementBar } from './AnnouncementBar';
import { FloatingActions } from './FloatingActions';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileTabBar } from './MobileTabBar';

export function Layout() {
  const location = useLocation();
  const showTabBar = !location.pathname.startsWith('/products/');

  return (
    <div className={`flex min-h-svh flex-col ${showTabBar ? 'pb-tabbar' : 'pb-24 lg:pb-0'}`}>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-brown px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      {/* Keyed by path so each page gets a gentle entrance transition. */}
      <main id="main" key={location.pathname} className="flex-1 animate-fade-in" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      {showTabBar && <MobileTabBar />}
      <FloatingActions />
      <ScrollRestoration />
    </div>
  );
}
