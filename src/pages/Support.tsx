import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/icon.png'

const TOC_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'contact', label: 'Contact Us' },
  { id: 'in-app', label: 'Help in the App' },
  { id: 'orders', label: 'Orders & Disputes' },
  { id: 'what-to-include', label: 'What to Include' },
  { id: 'hours', label: 'Hours' },
  { id: 'related', label: 'Related' },
] as const

export default function Support() {
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
        <aside className="hidden shrink-0 border-r border-gray-300 pl-0 pr-6 lg:block lg:w-56">
          <nav className="sticky top-8 text-center">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-dark/70">
              On this page
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

        <main className="min-w-0 flex-1">
          <div className="mb-8 flex flex-col items-center text-center">
            <Link
              to="/"
              className="focus:outline-none focus:ring-2 focus:ring-gold-active focus:ring-offset-2 rounded"
            >
              <img src={logo} alt="Surespot" className="h-16 w-auto sm:h-20" />
            </Link>
            <h1 className="mt-6 mb-2 text-3xl font-bold text-text-dark">Support</h1>
            <p className="mx-auto max-w-xl text-sm text-text-dark/70">
              We are here to help with orders, payments, delivery, and your account.
            </p>
          </div>

          <div className="space-y-10">
            <section
              id="overview"
              ref={(el) => { sectionRefs.current.overview = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">1. Overview</h2>
              <p className="leading-relaxed">
                The fastest way to get help is through the Surespot app, where you can message
                support, report an order issue, or open a dispute. You can also reach us by
                email or phone using the details below.
              </p>
            </section>

            <section
              id="contact"
              ref={(el) => { sectionRefs.current.contact = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">2. Contact Us</h2>
              <ul className="list-inside list-disc space-y-2 leading-relaxed">
                <li>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:admin@surespot.ng"
                    className="text-gold-active underline hover:no-underline"
                  >
                    admin@surespot.ng
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+2348163395600" className="text-gold-active underline hover:no-underline">
                    +234 816 339 5600
                  </a>
                </li>
                <li>
                  <strong>Address:</strong> 1, Iba Junction Bus Stop, Lasu Isheri Road, Iba, Ojo,
                  Lagos State
                </li>
              </ul>
            </section>

            <section
              id="in-app"
              ref={(el) => { sectionRefs.current['in-app'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">3. Help in the App</h2>
              <p className="mb-2 leading-relaxed">
                For account questions, general questions, or help with the app:
              </p>
              <ol className="list-inside list-decimal space-y-1 leading-relaxed">
                <li>Open the Surespot app.</li>
                <li>
                  Go to <strong>Profile</strong> → <strong>Contact Support</strong>.
                </li>
                <li>Describe your issue and send your message. You can attach photos if needed.</li>
              </ol>
            </section>

            <section
              id="orders"
              ref={(el) => { sectionRefs.current.orders = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">4. Orders & Disputes</h2>
              <p className="mb-2 leading-relaxed">
                If something went wrong with an order (wrong items, missing items, quality, or
                delivery), you can raise a dispute in the app:
              </p>
              <ol className="list-inside list-decimal space-y-1 leading-relaxed">
                <li>
                  Go to <strong>Profile</strong> → <strong>Contact Support</strong> →{' '}
                  <strong>Order Disputes</strong>.
                </li>
                <li>Select the order and describe what happened.</li>
                <li>Attach photos if they help explain the issue.</li>
              </ol>
              <p className="mt-3 leading-relaxed">
                Our team will review your case and reply as soon as possible. For refund rules
                and cancellations, see our{' '}
                <Link to="/terms" className="text-gold-active underline hover:no-underline">
                  Terms of Service
                </Link>
                .
              </p>
            </section>

            <section
              id="what-to-include"
              ref={(el) => { sectionRefs.current['what-to-include'] = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">5. What to Include</h2>
              <p className="mb-2 leading-relaxed">To resolve your issue faster, please include:</p>
              <ul className="list-inside list-disc space-y-1 leading-relaxed">
                <li>Your registered phone number or email.</li>
                <li>Order number (if the issue is about a specific order).</li>
                <li>A short description of what happened.</li>
                <li>Photos of wrong or damaged items, if applicable.</li>
              </ul>
            </section>

            <section
              id="hours"
              ref={(el) => { sectionRefs.current.hours = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">6. Support Hours</h2>
              <p className="leading-relaxed">
                Our ordering hours are <strong>Monday–Sunday, 9:00 AM – 10:00 PM</strong>. We
                aim to respond to messages and emails during these hours; complex cases may
                take longer.
              </p>
            </section>

            <section
              id="related"
              ref={(el) => { sectionRefs.current.related = el }}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 text-xl font-semibold">7. Related</h2>
              <ul className="list-inside list-disc space-y-1 leading-relaxed">
                <li>
                  <Link to="/privacy" className="text-gold-active underline hover:no-underline">
                    Privacy Policy
                  </Link>{' '}
                  — how we handle your data.
                </li>
                <li>
                  <Link to="/terms" className="text-gold-active underline hover:no-underline">
                    Terms of Service
                  </Link>{' '}
                  — orders, refunds, and use of the service.
                </li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
