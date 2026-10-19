import { PageHeader } from '../components/common/PageHeader';
import { CatalogBrowser } from '../components/product/CatalogBrowser';
import { useProducts } from '../hooks/useCatalog';
import { usePageMeta } from '../hooks/usePageMeta';

export function ShopPage() {
  usePageMeta({
    title: 'Shop All Babywear',
    description:
      'Browse the full ChinniThara collection — muslin co-ord sets, frocks, jablas, rompers and muslin essentials for little ones up to 2 years.',
    path: '/shop',
  });
  const { products } = useProducts();

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Shop All' }]}
        eyebrow="The collection"
        title="Shop all"
        description="Every piece in one place. Filter by style, age, size or print to find the perfect little outfit."
      />
      <div className="container-page py-6 sm:py-8">
        <CatalogBrowser products={products} />
      </div>
    </>
  );
}
