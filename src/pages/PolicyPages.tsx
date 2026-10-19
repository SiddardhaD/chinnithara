import { Info } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { PageHeader } from '../components/common/PageHeader';
import { siteConfig } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * Policy pages. Text inside <Tbc> marks details the owner must confirm before launch —
 * search the codebase for "<Tbc" to find them all, then set `policiesAreDraft` to false.
 */
const LAST_UPDATED = '18 October 2026';

function Tbc({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-gold-soft/70 px-1 text-ink" title="To be confirmed by ChinniThara">
      {children} <span className="text-xs text-cocoa-deep">(to be confirmed)</span>
    </mark>
  );
}

function PolicyLayout({
  title,
  path,
  description,
  children,
}: {
  title: string;
  path: string;
  description: string;
  children: ReactNode;
}) {
  usePageMeta({ title, description, path });
  return (
    <>
      <PageHeader crumbs={[{ label: title }]} eyebrow="Help" title={title}>
        <p className="mt-4 text-sm text-ink/70">Last updated: {LAST_UPDATED}</p>
      </PageHeader>
      <div className="container-page py-6 sm:py-8">
        {siteConfig.policiesAreDraft && (
          <p className="mb-6 flex max-w-[44rem] gap-3 rounded-2xl bg-gold-soft/50 px-5 py-4 text-sm text-ink">
            <Info className="mt-0.5 size-4 shrink-0 text-cocoa-deep" aria-hidden="true" />
            <span>
              We’re a new boutique and are finalising some details of this policy. If anything is unclear, please{' '}
              <Link to="/contact" className="font-semibold text-cocoa-deep underline">
                message us
              </Link>{' '}
              before ordering and we’ll be happy to help.
            </span>
          </p>
        )}
        <div className="prose-ct">{children}</div>
      </div>
    </>
  );
}

export function ShippingPage() {
  return (
    <PolicyLayout
      title="Shipping & Delivery"
      path="/shipping-delivery"
      description="How ChinniThara orders are confirmed, packed and delivered."
    >
      <h2>How ordering works</h2>
      <p>
        ChinniThara orders are placed over WhatsApp. When you tap “Order on WhatsApp” on a product, your selected
        product, size and quantity are sent to us. We then reply to confirm availability, the final price, any delivery
        charges and how to pay. Your order is confirmed only once we have confirmed these details and received payment.
      </p>

      <h2>Where we deliver</h2>
      <p>
        We are based in {siteConfig.contact.location}. We deliver to <Tbc>delivery regions / pin codes</Tbc>. If
        you’re unsure whether we can reach you, just ask before ordering.
      </p>

      <h2>Delivery charges</h2>
      <p>
        Delivery charges depend on your location and the size of your order. We always tell you the delivery charge on
        WhatsApp before you pay — there are no hidden costs.
      </p>

      <h2>Dispatch and delivery times</h2>
      <ul>
        <li>
          Orders are usually packed and dispatched within <Tbc>number of business days</Tbc> of payment confirmation.
        </li>
        <li>We will share an estimated delivery time for your location when we confirm your order.</li>
        <li>Delivery times may be longer during festivals, public holidays or severe weather.</li>
      </ul>

      <h2>Tracking</h2>
      <p>Where the courier provides tracking, we’ll share the tracking details with you on WhatsApp once your parcel is on its way.</p>

      <h2>Address details</h2>
      <p>
        Please double-check your full address, pin code and phone number when ordering. We can’t be responsible for
        delays caused by incomplete or incorrect addresses.
      </p>
    </PolicyLayout>
  );
}

export function ReturnsPage() {
  return (
    <PolicyLayout
      title="Returns & Exchanges"
      path="/returns-exchanges"
      description="ChinniThara’s returns and exchanges policy for babywear."
    >
      <p>
        We want every little outfit to fit and delight. If something isn’t right, please message us on WhatsApp and
        we’ll do our best to help.
      </p>

      <h2>Size exchanges</h2>
      <ul>
        <li>
          Size exchanges can be requested within <Tbc>number of days</Tbc> of delivery, subject to availability.
        </li>
        <li>
          For hygiene reasons, items must be unworn, unwashed and returned with original tags and packaging.
        </li>
        <li>
          Return shipping costs for exchanges: <Tbc>who pays return shipping</Tbc>.
        </li>
      </ul>

      <h2>Damaged or incorrect items</h2>
      <p>
        If your parcel arrives damaged, or you receive the wrong item, please contact us within{' '}
        <Tbc>time window, e.g. 48 hours</Tbc> of delivery with photos of the item and packaging. We’ll arrange a
        replacement or another suitable resolution.
      </p>

      <h2>Returns and refunds</h2>
      <p>
        Our policy on returns for a refund is: <Tbc>refund policy and timeline</Tbc>. Where a refund is approved, it
        will be made to the original payment method.
      </p>

      <h2>How to request an exchange</h2>
      <ul>
        <li>Message us on WhatsApp with your name, order details and the reason for the exchange.</li>
        <li>We’ll confirm whether the exchange is possible and share the return address.</li>
        <li>Once we receive and check the item, we’ll dispatch the replacement.</li>
      </ul>
    </PolicyLayout>
  );
}

export function PrivacyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      path="/privacy-policy"
      description="How ChinniThara handles your personal information."
    >
      <p>
        Your privacy matters to us. This policy explains what information we collect and how we use it. In short: this
        website doesn’t ask you to create an account, doesn’t use advertising trackers, and doesn’t store the messages
        you write.
      </p>

      <h2>Information we collect</h2>
      <h3>On this website</h3>
      <p>
        This website does not have user accounts, a checkout or analytics. Text you type into the contact form or
        product options is only used to prepare a WhatsApp message on your own device — it is not sent to or stored by
        this website.
      </p>
      <p>
        Your browser may store small technical settings needed for the site to work. Like most websites, our hosting
        provider may keep standard server logs (such as IP address and pages requested) for security and reliability.
      </p>
      <h3>When you contact us</h3>
      <p>
        When you message us on WhatsApp, Instagram or email, we receive the details you choose to share — such as your
        name, phone number, delivery address and order details. We use this information only to answer your questions,
        process and deliver your order, and provide after-sales support.
      </p>

      <h2>Third-party services</h2>
      <ul>
        <li>
          <strong>WhatsApp</strong> (Meta) — used for order enquiries. Messages are subject to WhatsApp’s own privacy
          policy.
        </li>
        <li>
          <strong>Google Fonts</strong> — our typefaces are loaded from Google’s servers, which receive your IP address
          when the fonts are downloaded.
        </li>
        <li>
          <strong>Courier partners</strong> — we share your name, address and phone number with the courier only to
          deliver your order.
        </li>
      </ul>

      <h2>How long we keep information</h2>
      <p>
        We keep order-related information only as long as needed to fulfil your order, provide support and meet legal
        or accounting requirements.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us at any time what information we hold about you, or request that we correct or delete it, by{' '}
        <Link to="/contact">contacting us</Link>.
      </p>

      <h2>Children’s privacy</h2>
      <p>
        Our products are for babies, but this website is intended for use by parents and adults. We do not knowingly
        collect information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The “Last updated” date above shows when it last changed.</p>
    </PolicyLayout>
  );
}

export function TermsPage() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      path="/terms-conditions"
      description="Terms for using the ChinniThara website and ordering via WhatsApp."
    >
      <p>
        By using this website or ordering from {siteConfig.brand.name}, you agree to these terms. Please read them
        together with our <Link to="/shipping-delivery">Shipping & Delivery</Link>,{' '}
        <Link to="/returns-exchanges">Returns & Exchanges</Link> and <Link to="/privacy-policy">Privacy Policy</Link>{' '}
        pages.
      </p>

      <h2>About this website</h2>
      <p>
        This website is a catalogue of our babywear. It does not take payments or confirm orders automatically. Product
        listings marked “Photos coming soon” describe styles we offer whose photos and prices are still being added.
      </p>

      <h2>Products, colours and sizes</h2>
      <ul>
        <li>We describe our products as accurately as we can. Colours may look slightly different on different screens.</li>
        <li>Assorted prints vary by batch; we’ll share the available designs before you order.</li>
        <li>Size guides are approximate — babies grow at different rates.</li>
      </ul>

      <h2>Prices and payment</h2>
      <ul>
        <li>All prices are in Indian Rupees (₹).</li>
        <li>The final price, including any delivery charge, is confirmed on WhatsApp before you pay.</li>
        <li>
          Accepted payment methods: <Tbc>payment methods, e.g. UPI / bank transfer</Tbc>.
        </li>
      </ul>

      <h2>Orders</h2>
      <p>
        Sending a WhatsApp enquiry does not create an order or reserve stock. An order is accepted only when we confirm
        it and receive your payment. We may decline an order — for example, if an item is no longer available — in which
        case any payment received will be refunded in full.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The ChinniThara name, logo, photographs and website content belong to {siteConfig.brand.name} and may not be
        copied or used without our written permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, our liability for any order is limited to the amount you paid for that order.
        Nothing in these terms limits your rights as a consumer under Indian law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts at{' '}
        <Tbc>city / district</Tbc>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? <Link to="/contact">Get in touch</Link>.
      </p>
    </PolicyLayout>
  );
}
