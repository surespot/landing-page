import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/icon.png'

const TOC_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'location-data', label: 'Location Data' },
  { id: 'payments', label: 'Payments' },
  { id: 'how-we-share', label: 'How We Share Information' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'your-rights', label: 'Your Rights and Choices' },
  { id: 'security', label: 'Security' },
  { id: 'childrens-privacy', label: "Children's Privacy" },
  { id: 'international-transfers', label: 'International Transfers' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
] as const

export default function PrivacyPolicy() {
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
            <h1 className="mt-6 mb-2 text-3xl font-bold text-text-dark">Privacy Policy</h1>
            <p className="mb-0 text-sm text-text-dark/70">Last Updated: March 4, 2026</p>
          </div>

          <div className="space-y-10">
            <section
              id="overview"
              ref={(el) => { sectionRefs.current.overview = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">1. Overview</h2>
              <p className="leading-relaxed">
                Surespot (“we,” “us,” or “our”) values your privacy. This Privacy Policy
                explains how we collect, use, share, and protect personal information when you
                use the Surespot customer app, website, and related services (the “Services”).
              </p>
            </section>

            <section
              id="information-we-collect"
              ref={(el) => { sectionRefs.current['information-we-collect'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">2. Information We Collect</h2>
              <p className="mb-4 leading-relaxed">
                We collect information in three main ways: information you provide,
                information collected automatically, and information from third parties.
              </p>

              <h3 className="mb-2 mt-6 text-lg font-medium">2.1 Information You Provide</h3>
              <ul className="list-inside list-disc space-y-1 leading-relaxed">
                <li><strong>Account details:</strong> first name, last name, phone number, email address, password (if applicable), and date of birth.</li>
                <li><strong>Profile data:</strong> profile photo or avatar.</li>
                <li><strong>Addresses:</strong> saved delivery addresses, labels (for example “Home”), and delivery instructions.</li>
                <li><strong>Orders:</strong> items, quantities, special instructions, and contact phone for delivery.</li>
                <li><strong>Support requests:</strong> descriptions, contact phone, and image attachments you choose to upload.</li>
                <li>Reviews and ratings you submit.</li>
              </ul>

              <h3 className="mb-2 mt-6 text-lg font-medium">2.2 Information Collected Automatically</h3>
              <ul className="list-inside list-disc space-y-1 leading-relaxed">
                <li><strong>Device data:</strong> model, OS version, device identifiers.</li>
                <li><strong>App usage data:</strong> features you use, screens visited, timestamps, and crash logs.</li>
                <li><strong>Log data:</strong> IP address and basic analytics.</li>
                <li><strong>Location data:</strong> precise location when you use location‑enabled features (for example, address selection, delivery tracking, or availability of Surespot branches).</li>
              </ul>

              <h3 className="mb-2 mt-6 text-lg font-medium">2.3 Information from Third Parties</h3>
              <ul className="list-inside list-disc space-y-1 leading-relaxed">
                <li>Payment providers (for example Paystack) provide transaction status and references.</li>
                <li>Mapping and place services (for example Google Places) return address suggestions and coordinates.</li>
              </ul>
            </section>

            <section
              id="how-we-use"
              ref={(el) => { sectionRefs.current['how-we-use'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">3. How We Use Your Information</h2>
              <p className="mb-2 leading-relaxed">We use information to:</p>
              <ul className="list-inside list-disc space-y-1 leading-relaxed">
                <li>Create and manage your account.</li>
                <li>Process orders, payments, and refunds.</li>
                <li>Provide delivery services and order updates.</li>
                <li>Save and manage delivery addresses.</li>
                <li>Provide customer support and resolve issues.</li>
                <li>Send service communications (order updates, confirmations, and essential notices).</li>
                <li>Improve app performance, security, and user experience.</li>
                <li>Prevent fraud, abuse, and unauthorized access.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section
              id="location-data"
              ref={(el) => { sectionRefs.current['location-data'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">4. Location Data</h2>
              <p className="mb-2 leading-relaxed">
                When you enable location permissions, we collect location data to:
              </p>
              <ul className="list-inside list-disc space-y-1 leading-relaxed">
                <li>Suggest or auto‑fill delivery addresses.</li>
                <li>Support delivery tracking.</li>
                <li>Improve service availability and timing estimates.</li>
              </ul>
              <p className="mt-2 leading-relaxed">
                You can disable location permissions in your device settings, but some
                features may be limited.
              </p>
            </section>

            <section
              id="payments"
              ref={(el) => { sectionRefs.current.payments = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">5. Payments</h2>
              <p className="leading-relaxed">
                Payments are processed through third‑party providers. We store transaction
                records, references, and statuses necessary to complete and reconcile orders.
                We do not store full card details on our servers.
              </p>
            </section>

            <section
              id="how-we-share"
              ref={(el) => { sectionRefs.current['how-we-share'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">6. How We Share Information</h2>
              <p className="mb-2 leading-relaxed">
                We do not sell your personal information. We may share information with:
              </p>
              <ul className="list-inside list-disc space-y-1 leading-relaxed">
                <li>Surespot staff and delivery riders to fulfill your orders.</li>
                <li>Payment processors to complete transactions.</li>
                <li>Service providers that support our operations (hosting, analytics, messaging, or support tools).</li>
                <li>Legal or regulatory authorities when required by law or to protect rights and safety.</li>
                <li>Successors or acquirers in the event of a merger or business transfer.</li>
                <li>Other parties only with your consent.</li>
              </ul>
            </section>

            <section
              id="data-retention"
              ref={(el) => { sectionRefs.current['data-retention'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">7. Data Retention</h2>
              <p className="leading-relaxed">
                We keep personal information as long as needed to provide the Services, comply
                with legal obligations, resolve disputes, and enforce agreements. You may
                request deletion of your account, subject to legal or operational retention
                requirements.
              </p>
            </section>

            <section
              id="your-rights"
              ref={(el) => { sectionRefs.current['your-rights'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">8. Your Rights and Choices</h2>
              <p className="mb-2 leading-relaxed">
                Depending on your location, you may have rights to:
              </p>
              <ul className="list-inside list-disc space-y-1 leading-relaxed">
                <li>Access your personal information.</li>
                <li>Correct inaccurate information.</li>
                <li>Request deletion of personal data.</li>
                <li>Withdraw consent for certain processing.</li>
                <li>Restrict or object to certain uses of your data.</li>
              </ul>
              <p className="mt-2 leading-relaxed">
                To exercise these rights, contact support at{' '}
                <a href="mailto:support@surespot.com" className="text-gold-active underline hover:no-underline">support@surespot.com</a>.
              </p>
            </section>

            <section
              id="security"
              ref={(el) => { sectionRefs.current.security = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">9. Security</h2>
              <p className="leading-relaxed">
                We use administrative, technical, and physical safeguards to protect your
                data. However, no system is completely secure, and we cannot guarantee
                absolute security.
              </p>
            </section>

            <section
              id="childrens-privacy"
              ref={(el) => { sectionRefs.current['childrens-privacy'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">10. Children’s Privacy</h2>
              <p className="leading-relaxed">
                The Services are not intended for individuals under 18. We do not knowingly
                collect personal information from children. If you believe a child has
                provided personal data, contact us to remove it.
              </p>
            </section>

            <section
              id="international-transfers"
              ref={(el) => { sectionRefs.current['international-transfers'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">11. International Transfers</h2>
              <p className="leading-relaxed">
                Your information may be processed or stored in Nigeria or other countries
                where we or our service providers operate. We take reasonable steps to protect
                your information in transit and storage.
              </p>
            </section>

            <section
              id="changes"
              ref={(el) => { sectionRefs.current.changes = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">12. Changes to This Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will post the updated
                version and revise the “Last Updated” date. Continued use of the Services
                after changes means you accept the updated policy.
              </p>
            </section>

            <section
              id="contact"
              ref={(el) => { sectionRefs.current.contact = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">13. Contact Us</h2>
              <p className="leading-relaxed">
                For questions or privacy requests, contact us at{' '}
                <a href="mailto:support@surespot.com" className="text-gold-active underline hover:no-underline">support@surespot.com</a>.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
