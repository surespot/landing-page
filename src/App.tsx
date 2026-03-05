import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import googlePlayBadge from './assets/google-play-badge.png'
import appStoreBadge from './assets/Download_on_the_App_Store_Badge.png'
import logo from './assets/icon.png'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const aboutRef = useRef<HTMLDivElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLDivElement | null>(null)

  const baseMenuItems = [
    { name: 'Jollof Rice', price: '₦1,500', rating: '4.8', time: '20–25 mins' },
    { name: 'Amala', price: '₦1,500', rating: '4.7', time: '20–25 mins' },
    { name: 'Spaghetti', price: '₦1,800', rating: '4.8', time: '25–30 mins' },
    { name: 'Bread and Beans', price: '₦800', rating: '4.6', time: '15–25 mins' },
  ] as const

  const menuItems = [...baseMenuItems, ...baseMenuItems]
  const pageSize = 4
  const pageCount = Math.ceil(menuItems.length / pageSize)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return

    const firstCard = el.querySelector('article') as HTMLElement | null
    const cardWidth = firstCard?.offsetWidth ?? 0
    const gap = 24 // Tailwind gap-6 = 1.5rem ≈ 24px
    const pageStride = pageSize * cardWidth + gap * (pageSize - 1)

    const target =
      page === 0 ? 0 : Math.min(pageStride * page, el.scrollWidth - el.clientWidth)

    el.scrollTo({
      left: target,
      behavior: 'smooth',
    })
  }, [page])

  useEffect(() => {
    const refs = [heroRef, aboutRef, menuRef, footerRef]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    )
    refs.forEach((r) => {
      const el = r.current
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <div id="home" className="hero text-text-light">
      <div className="hero-inner flex min-h-screen flex-col">
        {/* Top nav */}
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Surespot logo" className="h-12 w-auto sm:h-14" />
          </div>

          <nav className="hidden items-center gap-10 text-sm font-medium text-text-light/80 md:flex">
            <a href="#home" className="nav-link hover:text-text-light">
              Home
            </a>
            <a href="#about" className="nav-link hover:text-text-light">
              About
            </a>
            <a href="#menu" className="nav-link hover:text-text-light">
              Menu
            </a>
            <a href="#contact" className="nav-link hover:text-text-light">
              Contact Us
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isMenuOpen}
              className="relative z-40 flex h-10 w-12 flex-col items-center justify-center gap-1 md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <>
                  <span className="absolute top-1/2 left-1/2 h-0.5 w-7 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded bg-text-dark" />
                  <span className="absolute top-1/2 left-1/2 h-0.5 w-7 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded bg-text-dark" />
                </>
              ) : (
                <>
                  <span className="block h-0.5 w-7 rounded bg-white" />
                  <span className="block h-0.5 w-7 rounded bg-white" />
                  <span className="block h-0.5 w-7 rounded bg-white" />
                </>
              )}
            </button>

            {/* Desktop CTA */}
            <button
              className="hidden rounded-full bg-gold-active px-5 py-2 text-sm font-semibold text-text-dark shadow-md shadow-black/30 transition hover:bg-gold-passive md:inline-flex"
              type="button"
            >
              Get the App
            </button>
          </div>
        </header>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 z-30 md:hidden ${
            isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation"
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Panel */}
          <nav
            className={`absolute inset-y-0 right-0 flex w-64 transform flex-col gap-6 bg-surface-cream px-6 py-10 text-base font-medium text-surface-brown shadow-xl transition-transform duration-300 ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <a href="#home" className="nav-link nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="#about" className="nav-link nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a href="#menu" className="nav-link nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              Menu
            </a>
            <a href="#contact" className="nav-link nav-link-mobile" onClick={() => setIsMenuOpen(false)}>
              Contact Us
            </a>
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gold-active px-5 py-2 text-sm font-semibold text-text-dark shadow-md shadow-black/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Get the App
            </button>
          </nav>
        </div>

        {/* Hero content */}
        <main
          ref={heroRef}
          className="fade-in-up mx-auto flex w-full max-w-6xl flex-1 items-center px-4 pb-16 pt-4 lg:px-8"
        >
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h1 className="text-3xl font-semibold leading-tight text-text-light sm:text-4xl lg:text-5xl">
              Your Favorite Meals,
              <span className="block">
                <span className="text-gold-active">Fast</span>
                {' and '}
                <span className="text-gold-active">Sure</span>
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-sm text-text-light/80 sm:text-base">
              Browse menus from top restaurants near you, place your order in seconds, and
              track it every step of the way. With fast delivery and dependable service,
              Surespot makes getting your favorite meals simple and stress-free.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play"
                  className="h-12 w-40 object-contain"
                />
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="h-12 w-40 object-contain"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>

      {/* About section */}
      <section id="about" className="bg-white py-16 text-text-dark lg:py-24">
        <div
          ref={aboutRef}
          className="fade-in-up mx-auto flex max-w-6xl flex-col gap-12 px-4 lg:flex-row lg:items-center lg:px-8"
        >
          {/* Text column */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">About Us</h2>
            <p className="text-sm leading-relaxed text-text-dark/90 sm:text-base">
              Surespot was created to make food delivery simple, reliable, and enjoyable. We
              connect customers with our local restaurants, ensuring every order is handled
              with care from kitchen to doorstep.
            </p>
            <p className="text-sm leading-relaxed text-text-dark/90 sm:text-base">
              Our goal is to remove the stress from ordering food by offering a smooth
              experience, real-time updates, and dependable delivery you can count on.
              Whether it&apos;s a quick lunch or a family dinner, Surespot helps you get your
              favorite meals fast and sure.
            </p>
          </div>

          {/* Image column */}
          <div className="flex-1 flex items-center">
            <div className="about-media-outer mx-auto">
              <div className="about-media" />
            </div>
          </div>
        </div>
      </section>

      {/* Popular menu */}
      <section id="menu" className="bg-surface-cream py-16 text-text-dark lg:py-24">
        <div
          ref={menuRef}
          className="fade-in-up mx-auto flex max-w-6xl flex-col gap-10 px-9 lg:px-8"
        >
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Popular <span className="text-gold-active">Menu</span>
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-text-dark/80 sm:text-base">
              Discover some of our popular dishes that our customers cannot get enough of.
            </p>
          </div>

          <div
            ref={carouselRef}
            className="menu-carousel flex gap-6 overflow-x-auto pb-4 pl-5 pr-3 sm:pl-8 sm:pr-4 snap-x snap-mandatory scroll-smooth xl:overflow-hidden"
          >
            {menuItems.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_24px_rgba(0,0,0,0.12)] sm:w-56 xl:w-56"
              >
                <div className="relative h-36 bg-cover bg-center" style={{ backgroundImage: "url('./assets/bg.png')" }}>
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-surface-cream/95 px-2 py-1 text-xs font-semibold text-text-dark shadow-sm">
                    <span>{item.rating}</span>
                    <span>★</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold sm:text-base">{item.name}</h3>
                    <p className="text-sm font-semibold text-gold-active">{item.price}</p>
                  </div>
                  <p className="text-xs text-text-dark/70">
                    Delicious meal prepared fresh and delivered hot, just the way you like it.
                  </p>
                  <div className="mt-auto pt-2 text-xs text-text-dark/60">
                    <span>⏱ {item.time}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 hidden items-center justify-center gap-4 lg:flex">
            <button
              type="button"
              aria-label="Previous menu items"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-arrow-gold-passive text-text-dark disabled:opacity-40"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next menu items"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-active text-text-dark disabled:opacity-40"
              disabled={page >= pageCount - 1}
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-surface-brown py-12 text-text-light lg:py-16">
        <div
          ref={footerRef}
          className="fade-in-up mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:px-8"
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start">
              <img src={logo} alt="Surespot logo" className="h-12 w-auto sm:h-14" />
            </div>

            <div className="grid flex-1 gap-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-base font-semibold">Opening Hours</h3>
                <div className="space-y-1 text-text-light/80">
                  <p>Mon–Sun: 09:00 AM → 10:00 PM</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold">Contact Us</h3>
                <div className="space-y-1 text-text-light/80">
                  <p>1, Iba Junction Bus Stop, Lasu Isheri Road</p>
                  <p>Iba, Ojo, Lagos State</p>
                  <p>+234 816 339 5600</p>
                  <p>admin@surespot.ng</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold">Other Links</h3>
                <div className="space-y-1 text-text-light/80">
                  <Link to="/privacy" className="block text-left hover:text-text-light">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="block text-left hover:text-text-light">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <img
              src={googlePlayBadge}
              alt="Get it on Google Play"
              className="h-10 w-36 object-contain sm:h-12 sm:w-40"
            />
            <img
              src={appStoreBadge}
              alt="Download on the App Store"
              className="h-10 w-36 object-contain sm:h-12 sm:w-40"
            />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
