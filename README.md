# ChinniThara — Babywear Boutique Website

**చిన్ని Thara · Little comforts. Endless wonders. · Exquisite Baby Clothing**

A static, responsive babywear and muslin-essentials catalogue built with React, Vite, TypeScript, Tailwind CSS and React Router.
Customers browse the collection, choose a size and send a prefilled order enquiry on WhatsApp.
There is no backend, database, checkout or payment. It can be hosted for free.

---

## 1. Quick start

Requirements: **Node.js 20 or newer** (built and tested on Node 24).

```bash
npm install          # install dependencies
cp .env.example .env # then fill in your details (see section 2)
npm run dev          # start the dev server at http://localhost:5173
```

Other commands:

```bash
npm run typecheck    # TypeScript checks only
npm run build        # type-check and build the production site into dist/
npm run preview      # serve the production build at http://localhost:4173
```

---

## 2. Configuration

All public business details are set in **`.env`** (copy it from `.env.example`). Restart `npm run dev` after editing.

| Variable | What it does | Example format |
|---|---|---|
| `VITE_WHATSAPP_NUMBER` | Business WhatsApp number: digits only, with country code | `91XXXXXXXXXX` |
| `VITE_SITE_URL` | Live website address, no trailing slash. Used for canonical tags, share links and `sitemap.xml` | `https://www.your-domain.in` |
| `VITE_INSTAGRAM_HANDLE` | Instagram username, without the @ | `chinnithara` |
| `VITE_CONTACT_EMAIL` | Optional public email address | `hello@your-domain.in` |

> ⚠️ Everything starting with `VITE_` ends up in the public website. **Never** put passwords or secret keys in `.env`.

Until `VITE_WHATSAPP_NUMBER` is set, every WhatsApp button shows a friendly "being set up" message instead of a broken link.

Other settings are in [`src/config/site.ts`](src/config/site.ts):

- **`announcement`**: the slim bar at the top of the page. Set `message: ''` to hide it. Don't advertise offers that don't exist.
- **`contact.location`**: shown on the Contact page and in the footer.
- **`catalogue.showDraftListings`**: set to `false` to hide listings that don't have photos yet.
- **`policiesAreDraft`**: set to `false` after the policy pages have been reviewed (see section 5).

Brand colours and fonts are defined once in [`src/styles/index.css`](src/styles/index.css) (`@theme` block).

---

## 3. Managing products

All product content is in **[`src/data/products.ts`](src/data/products.ts)**. Each product follows the `Product` type in [`src/types/product.ts`](src/types/product.ts).

### Add or edit a product

1. Put the photos in `public/images/products/<product-slug>/` (see the image guidelines below).
2. Add or update the entry in `products.ts`:
   - `slug`: the URL (`/products/<slug>`). **Don't change it once the site is live.**
   - `price`: retail price in ₹. Leave it out to show "Price on request".
   - `compareAtPrice`: only when a genuine sale is running.
   - `availableSizes`: size codes from [`src/data/sizes.ts`](src/data/sizes.ts).
   - `availability`: only set it (`in-stock`, `limited`, `sold-out`) if you actually track stock. Otherwise customers see "Confirmed when you enquire on WhatsApp".
   - `fabric` and `washCare`: only verified information.
   - `listingStatus`: `'live'` once real photos and details are in place.
3. New print? Add it to [`src/data/prints.ts`](src/data/prints.ts). The swatch must be a crop of a real product photo.
4. Run `npm run build` to check for mistakes.

Collections ([`src/data/categories.ts`](src/data/categories.ts)) are filters, so products appear in them automatically.

### Homepage carousel and reviews

- **Carousel slides**: [`src/data/banners.ts`](src/data/banners.ts). Add a landscape photo (about 1600 × 900, WebP) to `public/images/banners/` and set `image` on a slide. Slides without a photo show a designed panel. The carousel opens on the **second** slide, so keep your strongest one there.
- **Customer reviews**: [`src/data/testimonials.ts`](src/data/testimonials.ts). Add only real reviews that customers agreed to share. While the list is empty, the homepage shows a "Share your experience" invitation instead.

### Products with several designs

For assorted products (like the Muslin Knot Frock), add one photo per design to `images` and list each design in `designs` with its `imageIndex`. Customers must pick a design and a size before ordering, and the chosen design is included in the WhatsApp message.

### Live stock from Google Sheets

1. In Google Sheets, create a tab named **Stock** and import [`docs/stock-template.csv`](docs/stock-template.csv) (File → Import). It lists every product, design and size.
2. Fill in the **quantity** and **price** columns (price in rupees, e.g. `499`). Use **mrp** only when a genuine sale is running and it's higher than the price; the site then shows it struck through with the % off. Different prices per design or size are fine: cards show "From ₹…" and the product page shows the exact price once a design and size are chosen. Leave a row blank to stop tracking it, which shows "Confirmed on WhatsApp".
3. File → Share → **Publish to web** → choose **only the Stock tab** → **Comma-separated values (.csv)** → Publish, and copy the link.
4. Set `VITE_STOCK_SHEET_URL` to that link (in `.env` and in Cloudflare build variables) and redeploy once.

After that, editing a quantity in the sheet updates the website within a few minutes. Google caches published sheets for up to about 5 minutes. Rules: `0` shows **Sold out** and the button becomes "Ask about restocking"; `1–3` shows **Only N left**; more than 3 shows **In stock**. Keep sales and money in other tabs. Only the Stock tab is published.

### Image guidelines

- Use **genuine photos of the actual products only**. Don't use supplier flyers, AI images or stock photos.
- Export to **WebP**. Provide a ~600px and a ~1000–1200px version for `srcSet`.
- Square (1:1) images work best for product cards and the gallery.
- Write descriptive `alt` text, e.g. "Bird print frock laid flat, showing the gathered skirt".

Products without photos show a designed line-drawing placeholder labelled "Photos coming soon". It is never presented as the real product.

---

## 4. Asset sources

| Asset | Source | Notes |
|---|---|---|
| `public/images/brand/chinnithara-logo*.{png,webp}` | `Little comforts. Endless wonders. (1).png` (official logo) | Used unaltered, only resized proportionally |
| `public/images/brand/chinnithara-wordmark*.{png,webp}` | Cut from the official logo (the separate wordmark file was clipped at the top) | Cream background made transparent; letterforms and colours unchanged |
| `public/favicon*`, `icon-*.png`, `apple-touch-icon.png`, `chinnithara-moon-mark-240.webp` | Square crop of the moon-and-baby emblem from the official logo | |
| `public/og-image.jpg` | Official logo centred on brand ivory (1200×630) | Social share image |
| Product list (`src/data/products.ts`) | Supplier invoice: 12 muslin lines, assorted designs, "white on print" or "dyed on print" | Invoice unit costs are wholesale and are never shown |

**Not used:** the supplier's promotional flyers and catalogue PDF. They carry another company's branding and phone numbers, and the catalogue states its images may be AI-generated, so they don't show your actual stock.

---

## 5. Missing information: complete before launch

- [ ] **WhatsApp business number**: `VITE_WHATSAPP_NUMBER`
- [ ] **Website domain**: `VITE_SITE_URL` (also enables `sitemap.xml`)
- [ ] **Instagram handle** and optional **email**
- [ ] **Retail prices** for every product. The purchase plan only lists wholesale costs, which must never be shown.
- [ ] **Genuine photos** for the 9 draft listings: 4 clothing items (white-print co-ord set, boxy co-ord set, jabla, romper) and 5 muslin essentials (swaddle, bath towel, hooded towel, wash cloth, cloth nappy). ✅ Done: knot frock, colour-print co-ord set and zip frock (5 designs each).
- [ ] **Nappy size**: the invoice gives none, so 3–6 months comes from the purchase plan (marked `TODO`).
- [ ] **Garment measurements** for the size guide (optional)
- [ ] **Policy details** shown as highlighted *"(to be confirmed)"* text: delivery regions, dispatch time, exchange window, return-shipping costs, refund policy, payment methods and jurisdiction city. Search the code for `<Tbc`, fill in each one, then set `policiesAreDraft: false`.

---

## 6. Deployment (free hosting)

The site builds to static files in `dist/`. Any static host works. These have free plans:

**Netlify**: build command `npm run build`, publish directory `dist`. SPA routing is handled by `netlify.toml`.

**Vercel**: import the repo. It detects Vite automatically, and `vercel.json` handles SPA routing.

**Cloudflare (Workers)**: connect the repo, build command `npm run build`, deploy command `npx wrangler deploy`. `wrangler.jsonc` serves `dist` with SPA routing. Add the `VITE_*` values under *Settings → Build → Variables and secrets* (they're needed at build time).

**Cloudflare Pages**: build command `npm run build`, output directory `dist`.

On every host, add the `VITE_*` environment variables in the dashboard, since `.env` is not committed. Then redeploy.

After launch:
- Submit `https://your-domain/sitemap.xml` in Google Search Console.
- Share a product link on WhatsApp to check that the preview image appears.

---

## 7. Project structure

```
public/                 static files served as-is (images, favicons, manifest, _redirects)
src/
  config/site.ts        business settings (contact, announcement, flags)
  data/                 products, prints, categories/collections, sizes & age groups
  types/product.ts      the Product data model
  services/catalog.ts   the only module that knows where data comes from
  hooks/                useProducts / useProduct (data access), usePageMeta (SEO)
  utils/                WhatsApp links, filters & sorting, search, formatting
  components/
    layout/             Header, MobileMenu, Footer, AnnouncementBar, Layout
    product/            ProductCard, ProductGrid, ProductGallery, SizeSelector, SizeGuide, FilterPanel, CatalogBrowser
    common/             Logo, WhatsAppButton, SearchBar, Breadcrumbs, EmptyState, CollectionCard, motifs…
    home/               HeroSection
  pages/                one file per page (policies grouped in PolicyPages.tsx)
  styles/index.css      Tailwind theme tokens and base styles
vite.config.ts          also generates robots.txt and sitemap.xml at build time
```

---

## 8. Future backend: Supabase (not implemented)

The frontend reads products only through `src/services/catalog.ts` and the hooks in `src/hooks/useCatalog.ts`. The hooks already return a `status` field, so pages are ready for a loading state. To move to a database:

1. **Supabase PostgreSQL**: create `products`, `product_images`, `product_variants` (size + stock) and `orders` tables that match the `Product` type. Turn on **Row Level Security**: public `select` on published products only, and no public writes.
2. **Data access**: replace the functions in `catalog.ts` with Supabase queries using the public *anon* key, which is safe in the browser when RLS is on. Make the hooks async, ideally with a caching library such as TanStack Query. Components keep working unchanged.
3. **Images**: move product photos to **Supabase Storage** or an image CDN (e.g. Cloudflare Images) and store their URLs in `product_images`.
4. **Admin dashboard**: a separate protected area using **Supabase Auth**, limited to an admin role through RLS policies, for adding products, editing prices, updating stock and managing orders.
5. **Payments**: an Indian payment gateway (e.g. Razorpay, Cashfree). Create orders and **verify payment signatures on the server**, in a Supabase Edge Function or similar, never in the browser.
6. **Secrets**: the Supabase *service-role* key and payment-gateway secrets must live only in server-side environments (Edge Functions or hosting secrets). Never put them in `VITE_*` variables.

Until then, WhatsApp remains the ordering channel. The site never claims an order is confirmed, stock is reserved or payment is complete.
# chinnithara
