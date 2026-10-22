import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { InstagramIcon as Instagram } from '../components/common/InstagramIcon';
import { useState, type ReactNode } from 'react';
import { MoonMotif } from '../components/common/Motifs';
import { PageHeader } from '../components/common/PageHeader';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { instagramUrl, isWhatsAppConfigured, siteConfig } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { buildGeneralMessage } from '../utils/whatsapp';

function ContactCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="rounded-[var(--radius-soft)] border border-brown/10 bg-white/60 p-6">
      <span className="grid size-11 place-items-center rounded-full bg-blush-soft text-cocoa-deep" aria-hidden="true">
        {icon}
      </span>
      <h2 className="mt-4 text-2xl">{title}</h2>
      <div className="mt-1 text-ink/80">{children}</div>
    </li>
  );
}

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Open any product, choose a size and tap “Order on WhatsApp”. Your selection is filled in automatically, and we’ll reply to confirm availability, price, delivery charges and payment details.',
  },
  {
    q: 'Can I see more prints?',
    a: 'Yes! Our assorted styles change with each batch. Message us on WhatsApp and we’ll share photos of the prints currently available.',
  },
  {
    q: 'Not sure about the size?',
    a: 'Our size guide lists the age range for every size. If your little one is between sizes, we usually suggest sizing up, and we’re always happy to help you choose.',
  },
];

export function ContactPage() {
  usePageMeta({
    title: 'Contact Us',
    description: 'Get in touch with ChinniThara on WhatsApp for orders, sizes and prints.',
    path: '/contact',
  });
  const { contact } = siteConfig;
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Say hello"
        title="We’d love to hear from you"
        description="Questions about sizes, prints or an order? Message us and a real person will get back to you."
      />

      <div className="container-page grid gap-10 py-8 sm:py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <ul className="grid gap-5 sm:grid-cols-2">
            <ContactCard icon={<MessageCircle className="size-5" />} title="WhatsApp">
              {isWhatsAppConfigured ? (
                <p>The quickest way to reach us for orders and questions.</p>
              ) : (
                <p>WhatsApp ordering is being set up and will be available very soon.</p>
              )}
            </ContactCard>
            <ContactCard icon={<Instagram className="size-5" />} title="Instagram">
              {instagramUrl ? (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-cocoa-deep underline underline-offset-2">
                  @{contact.instagramHandle}
                </a>
              ) : (
                <p>Coming soon.</p>
              )}
            </ContactCard>
            {contact.email && (
              <ContactCard icon={<Mail className="size-5" />} title="Email">
                <a href={`mailto:${contact.email}`} className="break-all text-cocoa-deep underline underline-offset-2">
                  {contact.email}
                </a>
              </ContactCard>
            )}
            <ContactCard icon={<MapPin className="size-5" />} title="Based in">
              <p>{contact.location}</p>
            </ContactCard>
          </ul>

          <section aria-labelledby="faq-title" className="mt-10">
            <h2 id="faq-title" className="text-3xl">
              Good to know
            </h2>
            <div className="mt-5 border-t border-brown/15">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-brown/15">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brown [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 text-ink/80">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <section
          aria-labelledby="message-title"
          className="relative self-start overflow-hidden rounded-[2rem] bg-sage-soft/70 p-6 sm:p-10"
        >
          <MoonMotif className="absolute -top-3 -right-3 size-24 text-sage-deep/30" />
          <h2 id="message-title" className="text-3xl sm:text-4xl">
            Send us a message
          </h2>
          <p className="mt-2 text-ink/80">
            Write your message here and we’ll open WhatsApp with it ready to send. Nothing is stored on this website.
          </p>
          <form className="mt-7 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-brown">
                Your name <span className="font-normal text-ink/60">(optional)</span>
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="h-12 w-full rounded-xl border border-brown/20 bg-ivory px-4 focus:border-brown focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="contact-note" className="mb-1.5 block text-sm font-semibold text-brown">
                Message
              </label>
              <textarea
                id="contact-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={5}
                placeholder="e.g. Do you have the zip frock in 18–24 months?"
                className="w-full rounded-xl border border-brown/20 bg-ivory px-4 py-3 focus:border-brown focus:outline-none"
              />
            </div>
            <WhatsAppButton message={buildGeneralMessage(name.trim(), note)} label="Continue on WhatsApp" />
          </form>
        </section>
      </div>
    </>
  );
}
