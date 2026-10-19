import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import { AgeIndexPage, AgePage } from './pages/AgePages';
import { CollectionPage, CollectionsIndexPage } from './pages/CollectionPages';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { PrivacyPage, ReturnsPage, ShippingPage, TermsPage } from './pages/PolicyPages';
import { PrintPage, PrintsIndexPage } from './pages/PrintPages';
import { ProductPage } from './pages/ProductPage';
import { ShopPage } from './pages/ShopPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/collections', element: <CollectionsIndexPage /> },
      { path: '/collections/:slug', element: <CollectionPage /> },
      { path: '/prints', element: <PrintsIndexPage /> },
      { path: '/prints/:slug', element: <PrintPage /> },
      { path: '/age', element: <AgeIndexPage /> },
      { path: '/age/:slug', element: <AgePage /> },
      { path: '/products/:slug', element: <ProductPage /> },
      { path: '/our-story', element: <OurStoryPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/shipping-delivery', element: <ShippingPage /> },
      { path: '/returns-exchanges', element: <ReturnsPage /> },
      { path: '/privacy-policy', element: <PrivacyPage /> },
      { path: '/terms-conditions', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
