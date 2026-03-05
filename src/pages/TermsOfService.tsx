import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/icon.png'

const TOC_ITEMS = [
  { id: 'acceptance', label: 'Acceptance' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'your-account', label: 'Your Account' },
  { id: 'the-services', label: 'The Services' },
  { id: 'orders-and-pricing', label: 'Orders and Pricing' },
  { id: 'payment-processing', label: 'Payment Processing' },
  { id: 'delivery-and-pickup', label: 'Delivery and Pickup' },
  { id: 'cancellations-and-refunds', label: 'Cancellations and Refunds' },
  { id: 'promotions', label: 'Promotions' },
  { id: 'user-content', label: 'User Content' },
  { id: 'prohibited-conduct', label: 'Prohibited Conduct' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'third-party-services', label: 'Third-Party Services' },
  { id: 'service-changes', label: 'Service Changes' },
  { id: 'termination', label: 'Termination' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'limitation-of-liability', label: 'Limitation of Liability' },
  { id: 'indemnity', label: 'Indemnity' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'contact', label: 'Contact' },
] as const

export default function TermsOfService() {
  const [activeId, setActiveId] = useState<string>(TOC_ITEMS[0].id)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const onScroll = () => {
      const viewportTop = window.scrollY + 150
      let current: string = TOC_ITEMS[0].id
      for (const { id } of TOC_ITEMS) {
        const el = sectionRefs.current[id]
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= viewportTop) current = id
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-text-dark">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 lg:flex-row lg:gap-12 lg:px-8">
        {/* Sidebar - Table of Contents */}
        <aside className="hidden shrink-0 border-r border-gray-300 pl-0 pr-6 lg:block lg:w-56">
          <nav className="sticky top-8 text-center">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-dark/70">
              Table of Contents
            </h2>
            <ul className="space-y-1">
              {TOC_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`block rounded py-1.5 px-2 text-sm transition-colors ${
                      activeId === id
                        ? 'bg-text-dark/10 font-medium text-text-dark'
                        : 'text-text-dark/70 hover:bg-text-dark/5 hover:text-text-dark'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="mb-8 flex flex-col items-center text-center">
            <Link
              to="/"
              className="focus:outline-none focus:ring-2 focus:ring-gold-active focus:ring-offset-2 rounded"
            >
              <img src={logo} alt="Surespot" className="h-16 w-auto sm:h-20" />
            </Link>
            <h1 className="mt-6 mb-2 text-3xl font-bold text-text-dark">Terms of Service</h1>
            <p className="mb-0 text-sm text-text-dark/70">Last Updated: March 4, 2026</p>
          </div>

          <div className="space-y-10">
            <section
              id="acceptance"
              ref={(el) => { sectionRefs.current.acceptance = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">1. Acceptance of These Terms</h2>
              <p className="leading-relaxed">
                By creating an account or using Surespot’s app, website, or services (the
                “Services”), you agree to these Terms. If you do not agree, do not use the
                Services.
              </p>
            </section>

            <section
              id="eligibility"
              ref={(el) => { sectionRefs.current.eligibility = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">2. Eligibility</h2>
              <p className="leading-relaxed">
                You must be at least 18 years old and able to form a binding contract. You are
                responsible for complying with all laws that apply to your use of the
                Services.
              </p>
            </section>

            <section
              id="your-account"
              ref={(el) => { sectionRefs.current['your-account'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">3. Your Account</h2>
              <p className="leading-relaxed">
                You must provide accurate and complete information, keep it updated, and
                safeguard your login credentials. You are responsible for all activity on your
                account. If you suspect unauthorized use, contact support immediately.
              </p>
            </section>

            <section
              id="the-services"
              ref={(el) => { sectionRefs.current['the-services'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">4. The Services</h2>
              <p className="leading-relaxed">
                The app and website let you order food from Surespot's branches
                and arrange delivery or pickup via our delivery riders. Availability, menus, pricing, and delivery estimates can
                change.
              </p>
            </section>

            <section
              id="orders-and-pricing"
              ref={(el) => { sectionRefs.current['orders-and-pricing'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">5. Orders and Pricing</h2>
              <p className="leading-relaxed">
                By placing an order, you agree to pay all applicable charges, including item
                prices, delivery fees, service charges, taxes, and tips (if any). Prices may
                change before you place an order. We may cancel or refuse orders to prevent
                fraud, for safety, or for other operational reasons.
              </p>
            </section>

            <section
              id="payment-processing"
              ref={(el) => { sectionRefs.current['payment-processing'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">6. Payment Processing</h2>
              <p className="leading-relaxed">
                Payments are processed through third‑party providers such as Paystack. You
                authorize us and our payment partners to process payments and store
                transaction records and references. Payment failures may result in order
                cancellation.
              </p>
            </section>

            <section
              id="delivery-and-pickup"
              ref={(el) => { sectionRefs.current['delivery-and-pickup'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">7. Delivery and Pickup</h2>
              <p className="leading-relaxed">
                Delivery times are estimates. You are responsible for providing accurate
                delivery details and being available to receive your order. For door‑delivery
                orders, a delivery confirmation code may be required to complete the delivery.
                If you choose pickup, you are responsible for arriving at the correct location
                and time.
              </p>
            </section>

            <section
              id="cancellations-and-refunds"
              ref={(el) => { sectionRefs.current['cancellations-and-refunds'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">8. Cancellations and Refunds</h2>
              <p className="leading-relaxed">
                Cancellation and refund eligibility depends on order status, kitchen
                preparation, and delivery progress. We may limit or deny refunds for late
                cancellations, repeated issues, or suspected abuse. Refunds, when approved,
                may take time to appear depending on the payment provider.
              </p>
            </section>

            <section
              id="promotions"
              ref={(el) => { sectionRefs.current.promotions = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">9. Promotions</h2>
              <p className="leading-relaxed">
                Promotional offers and discount codes are subject to additional rules and may
                be modified or withdrawn at any time. Misuse of promotions may result in
                account suspension.
              </p>
            </section>

            <section
              id="user-content"
              ref={(el) => { sectionRefs.current['user-content'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">10. User Content</h2>
              <p className="leading-relaxed">
                You may submit reviews, support requests, chat messages, or other content. You
                grant Surespot a worldwide, non‑exclusive, royalty‑free license to use,
                display, and distribute your content for operating and improving the Services.
                You are responsible for the content you submit and must not post illegal,
                harmful, or abusive content.
              </p>
            </section>

            <section
              id="prohibited-conduct"
              ref={(el) => { sectionRefs.current['prohibited-conduct'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">11. Prohibited Conduct</h2>
              <p className="mb-2 leading-relaxed">You agree not to:</p>
              <ul className="list-inside list-disc space-y-1 leading-relaxed">
                <li>Use the Services for unlawful purposes.</li>
                <li>Provide false information, impersonate others, or access accounts without permission.</li>
                <li>Interfere with or disrupt the Services or related systems.</li>
                <li>Submit malicious code, spam, or abusive content.</li>
                <li>Abuse promotions, refunds, or payment systems.</li>
              </ul>
            </section>

            <section
              id="privacy"
              ref={(el) => { sectionRefs.current.privacy = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">12. Privacy</h2>
              <p className="leading-relaxed">
                Our Privacy Policy explains how we collect, use, and share personal
                information, including location data, saved addresses, order information,
                support attachments, and device data. By using the Services, you consent to
                these practices. Please review the Privacy Policy in the app.
              </p>
            </section>

            <section
              id="third-party-services"
              ref={(el) => { sectionRefs.current['third-party-services'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">13. Third‑Party Services</h2>
              <p className="leading-relaxed">
                The Services use third‑party tools (for example, payment processors and
                mapping services). We are not responsible for third‑party services, and their
                terms apply to your use of those services.
              </p>
            </section>

            <section
              id="service-changes"
              ref={(el) => { sectionRefs.current['service-changes'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">14. Service Changes</h2>
              <p className="leading-relaxed">
                We may modify, suspend, or discontinue parts of the Services at any time,
                including features, availability, or pricing.
              </p>
            </section>

            <section
              id="termination"
              ref={(el) => { sectionRefs.current.termination = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">15. Termination</h2>
              <p className="leading-relaxed">
                We may suspend or terminate your account if you violate these Terms, engage in
                fraud or abuse, or for other reasons necessary to protect the Services and
                other users. You may stop using the Services at any time.
              </p>
            </section>

            <section
              id="disclaimers"
              ref={(el) => { sectionRefs.current.disclaimers = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">16. Disclaimers</h2>
              <p className="leading-relaxed">
                The Services are provided “as is” and “as available.” We do not guarantee
                uninterrupted access, error‑free performance, or that deliveries will meet
                specific timing expectations.
              </p>
            </section>

            <section
              id="limitation-of-liability"
              ref={(el) => { sectionRefs.current['limitation-of-liability'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">17. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the fullest extent permitted by law, Surespot is not liable for indirect,
                incidental, special, consequential, or punitive damages, or for loss of
                profits, data, or goodwill arising from your use of the Services.
              </p>
            </section>

            <section
              id="indemnity"
              ref={(el) => { sectionRefs.current.indemnity = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">18. Indemnity</h2>
              <p className="leading-relaxed">
                You agree to defend and indemnify Surespot against claims arising from your
                misuse of the Services, your content, or your violation of these Terms.
              </p>
            </section>

            <section
              id="governing-law"
              ref={(el) => { sectionRefs.current['governing-law'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">19. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms are governed by the laws of Nigeria, without regard to
                conflict‑of‑law rules.
              </p>
            </section>

            <section
              id="contact"
              ref={(el) => { sectionRefs.current.contact = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">20. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions, contact support at{' '}
                <a href="mailto:support@surespot.com" className="text-gold-active underline hover:no-underline">support@surespot.com</a>.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
