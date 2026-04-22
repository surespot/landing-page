import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import googlePlayBadge from './assets/google-play-badge.png'
import appStoreBadge from './assets/Download_on_the_App_Store_Badge.png'
import logo from './assets/logo.png'
import friedRiceImg from './assets/fried rice.webp'

// ─── Types ────────────────────────────────────────────────────────────────────

type MenuItem = {
  name: string
  price: string
  rating: string
  time: string
  tag?: string
  blurb?: string
  imageUrl?: string
}

type FoodItemApi = {
  name?: string
  price?: number
  formattedPrice?: string
  currency?: string
  averageRating?: number
  eta?: string
  estimatedTime?: { min?: number; max?: number }
  imageUrl?: string
  imageUrls?: string[]
}

// ─── Static data ──────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'how',      label: 'How it works' },
  { id: 'menu',     label: 'Menu' },
  { id: 'coverage', label: 'Coverage' },
  { id: 'faq',      label: 'FAQ' },
]

const MENU_ITEMS_FALLBACK: MenuItem[] = [
  { name: 'Jollof Rice',        price: '₦1,500', rating: '4.8', time: '20–25 min', tag: 'Local',     blurb: 'Smoky, party-style jollof cooked low over firewood. Served with plantain and chicken.' },
  { name: 'Amala & Ewedu',      price: '₦1,500', rating: '4.7', time: '20–25 min', tag: 'Signature', blurb: 'Soft yam flour swallow with silky ewedu, gbegiri and assorted stew.' },
  { name: 'Pepper Spaghetti',   price: '₦1,800', rating: '4.8', time: '25–30 min', tag: 'Hot',       blurb: 'Stir-fried spaghetti in our house pepper sauce with grilled peppered chicken.' },
  { name: 'Bread & Beans',      price: '₦800',   rating: '4.6', time: '15–20 min', tag: 'Breakfast', blurb: 'Proper ewa agoyin with sweet fried plantain and fresh Agege bread on the side.' },
  { name: 'Fried Rice Combo',   price: '₦2,200', rating: '4.9', time: '25–30 min', tag: 'Chef pick', blurb: "Jollof's calmer cousin with mixed veg, peppered turkey and a side of coleslaw." },
  { name: 'Suya Wrap',          price: '₦1,300', rating: '4.7', time: '15–20 min', tag: 'Street',    blurb: 'Hand-carved suya, fresh onions and yaji spice rolled in warm shawarma bread.' },
  { name: 'Egusi & Pounded Yam',price: '₦2,000', rating: '4.8', time: '25–30 min', tag: 'Classic',   blurb: 'Egusi rich with spinach, goat meat and stockfish. Pounded yam soft, stretchy, proper.' },
  { name: 'Peppered Snail',     price: '₦3,200', rating: '4.9', time: '30–35 min', tag: 'Treat',     blurb: 'Giant land snails tossed in scotch bonnet and bell pepper sauce. A Lagos weekend thing.' },
]

const STEPS = [
  { icon: 'i-search', label: 'Step 01', title: 'Pick what you crave',   text: 'Browse our menu and filter by cuisine, price, or what\'s trending in your area.', darkTitle: true },
  { icon: 'i-chef',   label: 'Step 02', title: 'We get the kitchen cooking', text: 'Your order goes straight to one of our kitchens close to you. Freshly prepared, no shortcuts, we promise.', darkTitle: true },
  { icon: 'i-bike',   label: 'Step 03', title: 'Rider on the way',           text: 'A nearby Surespot Eatery rider picks it up hot. Get status updates as your order moves, and message the rider directly if anything comes up.' },
  { icon: 'i-door',   label: 'Step 04', title: 'Knock knock, chop time',     text: 'Delivered to your door, still steaming. Tip the rider, rate the meal, plan the next round.', darkTitle: true },
]

const LAGOS_AREAS = [
  { id: 'iba',    name: 'Iba / Ojo',         fee: '₦0 – ₦400',     time: '20–30 min', kitchens: 14, x: 18, y: 60, featured: true, note: 'HQ neighbourhood. Free delivery under 2 km.' },
  { id: 'festac', name: 'Festac & Satellite', fee: '₦400 – ₦700',   time: '25–35 min', kitchens: 22, x: 32, y: 56, note: 'Popular with lunch orders and party jollof runs.' },
  { id: 'ikeja',  name: 'Ikeja & Alausa',     fee: '₦600 – ₦900',   time: '30–40 min', kitchens: 38, x: 52, y: 30, note: 'Office crowd, breakfast rush from 8–10 am.' },
  { id: 'yaba',   name: 'Yaba & Surulere',    fee: '₦500 – ₦800',   time: '25–35 min', kitchens: 29, x: 62, y: 46, note: 'Students and friends, late-night suya runs.' },
  { id: 'lekki',  name: 'Lekki Phase 1',      fee: '₦700 – ₦1,100', time: '30–45 min', kitchens: 41, x: 82, y: 58, note: 'Wide selection, weekend enjoyment favourite.' },
  { id: 'vi',     name: 'Victoria Island',    fee: '₦700 – ₦1,000', time: '30–40 min', kitchens: 26, x: 72, y: 66, note: 'Business lunch runs and hotel orders.' },
]

const FEATURES = [
  { id: 'browse',  icon: 'i-search',  title: 'One app, all your favourites',    text: 'Saved orders, nearby kitchens and last-seen promos, all in one place. Reorder your usual in two taps.' },
  { id: 'track',   icon: 'i-pin',     title: 'Track your food every step',    text: 'See your order move from kitchen to door: placed, cooking, out for delivery, arrived. Chat with support directly from the order screen.' },
  { id: 'pay',     icon: 'i-card',    title: 'Pay your way',             text: 'Card, transfer, USSD, or cash on delivery. Save a default and skip the checkout stress.' },
  // Spots loyalty — coming soon
  // { id: 'rewards', icon: 'i-sparkle', title: 'Spots — our little loyalty thing', text: 'Earn Spots on every order. Cash them in for free delivery, meal discounts, or a surprise combo drop.' },
]

const FAQ_ITEMS = [
  { q: 'Where in Lagos do you deliver?',      a: 'We currently cover Iba/Ojo, Festac, Satellite Town, Ikeja, Alausa, Yaba, Surulere, Lekki Phase 1 and Victoria Island. New areas are added monthly, so tap the map above to check coverage, or drop your address in the app for the latest.' },
  { q: 'How long does delivery take?',         a: "Most orders arrive in 25–35 minutes, depending on your area and kitchen prep time. You'll see a live ETA once a rider accepts your order, and we update it if traffic holds us up." },
  { q: 'What payment methods do you accept?',  a: "Card, bank transfer, USSD, and cash on delivery. All in-app payments are secured by Paystack, so your money is safe." },
  { q: 'My food came late or wrong. What now?',a: "Tap Help on the order in the app or email admin@surespot.ng within 24 hours. We'll refund, resend, or credit you, whichever sorts it out fastest." },
  { q: 'How do I become a Surespot rider?',    a: "Tap \"Ride with us\" below. You'll need a working bike, a smartphone, and a valid ID. Training is same-week and you earn from your first delivery." },
]

const DRIFT_ITEMS = [
  { emblem: 'f-bowl',     bg: '#3a2a1f', size: 96,  top: '22%', left: '6%',  dx: 18,  dy: -22, r1: -8,  r2: 10,  dur: '10s' },
  { emblem: 'f-plantain', bg: '#d4a017', size: 110, top: '60%', left: '8%',  dx: -12, dy: 14,  r1: 4,   r2: -12, dur: '12s' },
  { emblem: 'f-drink',    bg: '#ef5543', size: 76,  top: '18%', left: '72%', dx: -16, dy: 22,  r1: 10,  r2: -6,  dur: '9s' },
  { emblem: 'f-pepper',   bg: '#4a3426', size: 88,  top: '68%', left: '70%', dx: -14, dy: -18, r1: -6,  r2: 10,  dur: '11s' },
  { emblem: 'f-bowl',     bg: '#f1c232', size: 58,  top: '35%', left: '80%', dx: -10, dy: -14, r1: 0,   r2: 18,  dur: '8s' },
  { emblem: 'f-plantain', bg: '#3a2a1f', size: 54,  top: '78%', left: '38%', dx: -8,  dy: -10, r1: -12, r2: 4,   dur: '13s' },
]

const API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined

// ─── Icon helper ──────────────────────────────────────────────────────────────

const Icon = ({
  id,
  size = 20,
  className,
  style,
}: {
  id: string
  size?: number
  className?: string
  style?: React.CSSProperties
}) => (
  <svg width={size} height={size} className={className} style={style} aria-hidden="true">
    <use href={`#${id}`} />
  </svg>
)

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [isMenuOpen,     setIsMenuOpen]     = useState(false)
  const [scrolled,       setScrolled]       = useState(false)
  const [activeId,       setActiveId]       = useState('home')
  const [faqOpen,        setFaqOpen]        = useState<number>(0)
  const [activeFeature,  setActiveFeature]  = useState('browse')
  const [coverageActive, setCoverageActive] = useState('iba')
  const [newsChannel,    setNewsChannel]    = useState<'email' | 'whatsapp'>('email')
  const [newsValue,      setNewsValue]      = useState('')
  const [newsSent,       setNewsSent]       = useState(false)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft,  setCanScrollLeft]  = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const [menuItems,        setMenuItems]        = useState<MenuItem[]>(() => API_BASE ? [] : [...MENU_ITEMS_FALLBACK])
  const [isLoadingMenu,    setIsLoadingMenu]    = useState(() => Boolean(API_BASE))
  const [noRemoteMenuItems,setNoRemoteMenuItems]= useState(false)

  // ── Nav scroll state ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Scrollspy ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const ids = ['home', 'about', 'how', 'menu', 'coverage', 'faq']
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // ── Carousel scroll state ─────────────────────────────────────────────────
  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }
  useEffect(() => { updateScrollState() }, [menuItems])

  const scrollMenu = (dir: number) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('.menu-card') as HTMLElement | null
    const step = card ? card.offsetWidth + 18 : 300
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // ── API fetch ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const apiBase = API_BASE
    if (!apiBase) {
      setMenuItems([...MENU_ITEMS_FALLBACK])
      setNoRemoteMenuItems(false)
      setIsLoadingMenu(false)
      return
    }

    let cancelled = false

    const loadPopular = async () => {
      try {
        const url = new URL('/food-items/popular', apiBase)
        url.searchParams.set('page', '1')
        url.searchParams.set('limit', '8')

        const res = await fetch(url.toString())
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const json = await res.json()
        const items = json?.data?.items ?? []

        if (!Array.isArray(items) || items.length === 0) {
          if (cancelled) return
          setMenuItems([])
          setNoRemoteMenuItems(true)
          return
        }

        const mapped: MenuItem[] = (items as FoodItemApi[]).map((item, i) => {
          const rawPrice  = typeof item.price === 'number' ? item.price : undefined
          const currency  = typeof item.currency === 'string' ? item.currency : 'NGN'

          const formattedPrice =
            typeof item.formattedPrice === 'string'
              ? item.formattedPrice
              : rawPrice != null
              ? new Intl.NumberFormat('en-NG', { style: 'currency', currency, minimumFractionDigits: 0 }).format(rawPrice / 100)
              : '—'

          const avgRating =
            typeof item.averageRating === 'number' && !Number.isNaN(item.averageRating)
              ? item.averageRating
              : undefined

          const eta =
            typeof item.eta === 'string'
              ? item.eta
              : item.estimatedTime &&
                typeof item.estimatedTime.min === 'number' &&
                typeof item.estimatedTime.max === 'number'
              ? `${item.estimatedTime.min}–${item.estimatedTime.max} min`
              : '20–25 min'

          const imageUrl =
            typeof item.imageUrl === 'string' && item.imageUrl.trim() !== ''
              ? item.imageUrl.trim()
              : Array.isArray(item.imageUrls) && item.imageUrls.length > 0
              ? item.imageUrls.find(u => typeof u === 'string' && u.trim() !== '')?.trim()
              : undefined

          const fallback = MENU_ITEMS_FALLBACK[i % MENU_ITEMS_FALLBACK.length]

          return {
            name:   item.name ?? 'Meal',
            price:  formattedPrice,
            rating: avgRating != null ? avgRating.toFixed(1) : '4.8',
            time:   eta,
            tag:    fallback.tag,
            blurb:  fallback.blurb,
            ...(imageUrl ? { imageUrl } : {}),
          }
        })

        if (cancelled) return
        setMenuItems(mapped)
        setNoRemoteMenuItems(false)
      } catch {
        if (cancelled) return
        setMenuItems([...MENU_ITEMS_FALLBACK])
        setNoRemoteMenuItems(false)
      } finally {
        if (!cancelled) setIsLoadingMenu(false)
      }
    }

    loadPopular()
    return () => { cancelled = true }
  }, [])

  const activeArea = LAGOS_AREAS.find(a => a.id === coverageActive) ?? LAGOS_AREAS[0]

  const landPath   = 'M 40 200 Q 60 140 140 130 Q 220 120 300 100 Q 370 95 430 130 Q 470 160 460 210 Q 450 260 400 290 Q 330 320 280 300 Q 240 290 200 310 Q 150 330 100 310 Q 50 280 40 200 Z'
  const lagoonPath = 'M 80 320 Q 180 340 280 330 Q 340 325 400 340 Q 460 360 420 390 Q 340 400 240 390 Q 140 380 80 370 Z'

  return (
    <>
      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap nav-inner">
          <a href="#home" aria-label="Surespot home" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Surespot" style={{ height: 48, width: 'auto' }} />
          </a>
          <nav className="nav-links" aria-label="Primary">
            {NAV_SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} className={`nav-link ${activeId === s.id ? 'active' : ''}`}>
                {s.label}
              </a>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="#app" className="btn btn-gold nav-cta">Get the app <Icon id="i-arrow-right" size={16} /></a>
            <button
              className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(o => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          {NAV_SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} onClick={() => setIsMenuOpen(false)}>{s.label}</a>
          ))}
          <a
            href="#app"
            className="btn btn-gold"
            onClick={() => setIsMenuOpen(false)}
            style={{ justifyContent: 'center', marginTop: 6 }}
          >
            Get the app
          </a>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="home" className="hero spy-offset">
        <div className="hero-grain" />
        {DRIFT_ITEMS.map((d, i) => (
          <div
            key={i}
            className="drift"
            style={{
              width: d.size, height: d.size, top: d.top, left: d.left,
              background: d.bg,
              '--dx': `${d.dx}px`, '--dy': `${d.dy}px`,
              '--r1': `${d.r1}deg`, '--r2': `${d.r2}deg`,
              '--dur': d.dur,
              animationDelay: `-${i * 1.2}s`,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 64 64" aria-hidden="true"><use href={`#${d.emblem}`} /></svg>
          </div>
        ))}
        <div className="wrap hero-content">
          <span className="hero-tag">
            <span className="pulse" />
            Live across Lagos · 9am – 10pm
          </span>
          <h1>
            Your favourite meals,<br />
            <em>fast</em> <span className="and">&amp;</span> <em>sure</em>.
          </h1>
          <p className="hero-sub">
            From jollof that tastes like Saturday to pepper spaghetti that wakes you up, Surespot brings Lagos flavours to your door, hot and on time. No long talk.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-gold" href="#app"><Icon id="i-bag" size={16} /> Order now</a>
            <a className="btn btn-ghost-light" href="#how">How it works <Icon id="i-arrow-right" size={14} /></a>
          </div>
          <div className="hero-stats">
            <div><span className="num">40k+</span>meals delivered</div>
            <div><span className="num">28 min</span>average delivery</div>
            <div><span className="num">9</span>Lagos areas covered</div>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <span className="line" />
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1, 2, 3].map(i => (
            <span key={i}>
              <em>Fast</em> <span className="star" /> <em>Sure</em> <span className="star" /> Fresh <span className="star" /> Local <span className="star" /> Hot <span className="star" /> On time <span className="star" />
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="section-pad on-cream spy-offset">
        <div className="wrap about-grid">
          <div className="about-copy">
            <span className="eyebrow" style={{ color: 'var(--gold-700)' }}>About Surespot Eatery</span>
            <h2 className="display h2" style={{ marginTop: 14 }}>
              Food delivery that feels like <em className="italic-swash">home</em>.
            </h2>
            <p className="body-lg" style={{ marginTop: 18, color: 'var(--text-muted-dark)' }}>
              Surespot Eatery started in Iba with one simple idea: ordering food in Lagos should be easy, honest, and sweet.
            </p>
            <p className="body" style={{ marginTop: 12, color: 'var(--text-muted-dark)' }}>
              We run our own kitchens, handle riders ourselves, and keep an eye on every order end-to-end. If a meal's late or cold, we're the ones picking up the phone, not a chatbot.
            </p>
            <div className="about-cards">
              <div className="about-card"><div className="num">2023</div><div className="label">Founded in Iba, Lagos</div></div>
              <div className="about-card"><div className="num">40k+</div><div className="label">Meals delivered this year</div></div>
              <div className="about-card"><div className="num">4.8★</div><div className="label">Average customer rating</div></div>
              <div className="about-card"><div className="num">93%</div><div className="label">Orders on time or earlier</div></div>
            </div>
          </div>
          <div
            className="about-media"
            style={{ backgroundImage: `url(${friedRiceImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="sticker">fast<br /><em style={{ fontStyle: 'italic' }}>&amp;</em><br />sure</div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how" className="section-pad on-brown spy-offset">
        <div className="wrap">
          <div className="section-head split">
            <div>
              <span className="eyebrow" style={{ color: 'var(--gold-400)' }}>How it works</span>
              <h2 className="display h2" style={{ marginTop: 14, color: 'var(--text-light)' }}>Four taps. One hot plate.</h2>
            </div>
            <p style={{ color: 'rgba(255,251,235,0.7)' }}>From crave to chop in under 35 minutes. Here's how Surespot Eatery moves.</p>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div key={i} className={`step ${i === 2 ? 'dark' : ''}`}>
                <div className="step-icon"><Icon id={s.icon} size={26} /></div>
                <div className="step-meta">{s.label}</div>
                <h3 className={`step-title ${s.darkTitle ? 'dark-title' : ''}`}>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR MENU ─────────────────────────────────────────────────── */}
      <section id="menu" className="section-pad on-cream-100 spy-offset">
        <div className="wrap">
          <div className="section-head split">
            <div>
              <span className="eyebrow" style={{ color: 'var(--gold-700)' }}>Popular menu</span>
              <h2 className="display h2" style={{ marginTop: 14 }}>
                What Lagos is eating <em className="italic-swash">this week</em>.
              </h2>
            </div>
            <div className="menu-controls">
              <button
                className="menu-ctrl"
                aria-label="Previous"
                disabled={isLoadingMenu || noRemoteMenuItems || !canScrollLeft}
                onClick={() => scrollMenu(-1)}
              >
                <Icon id="i-arrow-left" size={18} />
              </button>
              <button
                className="menu-ctrl"
                aria-label="Next"
                disabled={isLoadingMenu || noRemoteMenuItems || !canScrollRight}
                onClick={() => scrollMenu(1)}
              >
                <Icon id="i-arrow-right" size={18} />
              </button>
            </div>
          </div>

          {noRemoteMenuItems ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted-dark)', padding: '40px 0' }}>
              No items to show right now. Check back later.
            </p>
          ) : isLoadingMenu ? (
            <div className="menu-scroll" aria-busy="true" aria-label="Loading popular menu">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="menu-card">
                  <div className="menu-img skeleton" />
                  <div className="menu-body">
                    <div className="menu-top">
                      <div className="skeleton" style={{ height: 16, width: 120, borderRadius: 4 }} />
                      <div className="skeleton" style={{ height: 16, width: 60, borderRadius: 4 }} />
                    </div>
                    <div className="skeleton" style={{ height: 12, width: '100%', borderRadius: 4 }} />
                    <div className="skeleton" style={{ height: 12, width: '70%', borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="menu-scroll" ref={scrollRef} onScroll={updateScrollState}>
              {menuItems.map((item, i) => (
                <article className="menu-card" key={`${item.name}-${i}`}>
                  <div
                    className="menu-img"
                    style={
                      item.imageUrl
                        ? { backgroundImage: `url(${JSON.stringify(item.imageUrl)})` }
                        : { background: `linear-gradient(135deg, hsl(${(i * 47) % 360} 60% 70%), hsl(${(i * 47 + 60) % 360} 55% 50%))` }
                    }
                  >
                    {item.tag && <span className="tag">{item.tag}</span>}
                    <span className="rating">
                      <Icon id="i-star" size={11} className="star" /> {item.rating}
                    </span>
                  </div>
                  <div className="menu-body">
                    <div className="menu-top">
                      <h3>{item.name}</h3>
                      <span className="price">{item.price}</span>
                    </div>
                    <p>{item.blurb ?? 'Delicious meal prepared fresh and delivered hot, just the way you like it.'}</p>
                    <div className="menu-foot">
                      <span className="time">
                        <Icon id="i-clock" size={12} style={{ verticalAlign: -2 }} />
                        {item.time}
                      </span>
                      <button className="add"><Icon id="i-plus" size={12} /> Add</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── RIDER CTA ────────────────────────────────────────────────────── */}
      <section id="join" className="section-pad on-cream spy-offset">
        <div className="wrap">
          <div className="rider">
            <div className="rider-copy">
              <span className="eyebrow" style={{ color: 'var(--gold-400)' }}>Work with us</span>
              <h2 className="display h2" style={{ color: 'var(--text-light)' }}>
                Ride with Surespot. <em className="italic-swash">Make money.</em>
              </h2>
              <p className="body-lg">
                Join Lagos riders moving Surespot orders. Weekly payouts, fuel support, and shift flexibility, whether you ride full-time or just for side hustle.
              </p>
              <ul className="rider-list">
                {['Weekly payouts via bank transfer', 'Easy onboarding, start the same week', 'Choose your own shifts', 'Training and support from day one'].map((b, i) => (
                  <li key={i}><span className="check">✓</span><span>{b}</span></li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                <a className="btn btn-gold" href="#">Start rider application <Icon id="i-arrow-right" size={14} /></a>
              </div>
            </div>
            <div className="rider-visual" aria-hidden="true">
              {[
                { cls: 'b1', top: 'Last week',   big: '₦82,400', bot: 'avg rider earnings' },
                { cls: 'b3', top: 'Active now',  big: '412',     bot: 'riders across Lagos' },
                { cls: 'b2', top: 'This month',  big: '96%',     bot: 'payout on time' },
              ].map((b, i) => (
                <div key={i} className={`badge ${b.cls}`}>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>{b.top}</span>
                  <span className="big">{b.big}</span>
                  <span style={{ fontSize: 12 }}>{b.bot}</span>
                </div>
              ))}
              <svg viewBox="0 0 400 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} aria-hidden="true">
                <defs>
                  <pattern id="rider-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#fffbeb" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#rider-dots)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── COVERAGE MAP ─────────────────────────────────────────────────── */}
      <section id="coverage" className="section-pad on-cream-100 spy-offset">
        <div className="wrap">
          <div className="section-head split">
            <div>
              <span className="eyebrow" style={{ color: 'var(--gold-700)' }}>Coverage</span>
              <h2 className="display h2" style={{ marginTop: 14 }}>
                We're <em className="italic-swash">already</em> in your area.
              </h2>
            </div>
            <p>Tap a pin to see delivery times, fees and how many kitchens are live in each area.</p>
          </div>
          <div className="map-wrap">
            <div className="map">
              <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="mapGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#fffbeb" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect className="grid-lines" width="500" height="400" fill="url(#mapGrid)" />
                <path d={landPath}   fill="rgba(58,42,31,0.8)" stroke="rgba(241,194,50,0.3)" strokeWidth="1" />
                <path d={lagoonPath} fill="rgba(241,194,50,0.08)" stroke="rgba(241,194,50,0.2)" strokeWidth="1" strokeDasharray="3 4" />
                <path d="M 40 180 Q 200 170 460 200" fill="none" stroke="rgba(255,251,235,0.15)" strokeWidth="1.5" />
                <path d="M 100 130 Q 250 220 400 290" fill="none" stroke="rgba(255,251,235,0.15)" strokeWidth="1.5" />
                {LAGOS_AREAS.map(a => (
                  <circle
                    key={`z-${a.id}`}
                    className={`zone ${coverageActive === a.id ? 'active' : ''}`}
                    cx={a.x / 100 * 500} cy={a.y / 100 * 400} r="36"
                    onClick={() => setCoverageActive(a.id)}
                  />
                ))}
                {LAGOS_AREAS.map(a => (
                  <g key={`p-${a.id}`} className={`pin ${coverageActive === a.id ? 'active' : ''}`} onClick={() => setCoverageActive(a.id)}>
                    <circle className="outer" cx={a.x / 100 * 500} cy={a.y / 100 * 400} r="14" />
                    <circle className="inner" cx={a.x / 100 * 500} cy={a.y / 100 * 400} r="6" />
                    <text x={a.x / 100 * 500} y={a.y / 100 * 400 - 22} textAnchor="middle">{a.name}</text>
                  </g>
                ))}
              </svg>
              <div className="map-legend">
                <span><span className="dot" style={{ background: 'var(--gold-500)' }} /> Available</span>
                <span><span className="dot" style={{ background: 'var(--red-500)' }} /> Selected</span>
              </div>
            </div>
            <div className="area-panel">
              {activeArea.featured && <span className="chip">HQ area</span>}
              <h3>{activeArea.name}</h3>
              <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,251,235,0.7)', lineHeight: 1.55 }}>{activeArea.note}</p>
              <div>
                <div className="row"><span className="k">Delivery time</span><span className="v">{activeArea.time}</span></div>
                <div className="row"><span className="k">Delivery fee</span><span className="v">{activeArea.fee}</span></div>
                <div className="row"><span className="k">Kitchens live</span><span className="v">{activeArea.kitchens}</span></div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,251,235,0.55)', marginBottom: 8, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>All areas</div>
                <ul className="area-list">
                  {LAGOS_AREAS.map(a => (
                    <li key={a.id} className={coverageActive === a.id ? 'active' : ''} onClick={() => setCoverageActive(a.id)}>{a.name}</li>
                  ))}
                </ul>
              </div>
              <a className="btn btn-gold" href="#" style={{ justifyContent: 'center', marginTop: 6 }}>Check your exact address</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── APP FEATURES ─────────────────────────────────────────────────── */}
      <section id="app" className="section-pad on-cream spy-offset">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow" style={{ color: 'var(--gold-700)' }}>The app</span>
            <h2 className="display h2" style={{ marginTop: 14 }}>Simple app. <em className="italic-swash">Big</em> on flavour.</h2>
          </div>
          <div className="features">
            <div className="features-list">
              {FEATURES.map(f => (
                <div key={f.id} className={`feature-item ${activeFeature === f.id ? 'active' : ''}`} onClick={() => setActiveFeature(f.id)}>
                  <div className="feature-icon"><Icon id={f.icon} size={20} /></div>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'center' }}>
                <a className="btn btn-dark" href="#">
                  App Store
                </a>
                <a className="btn btn-dark" href="#">
                  Google Play
                </a>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="phone-stage">
              <div className="phone-ring" aria-hidden="true"><div className="dot" /></div>
              <div className="phone">
                <div className="notch" />
                <div className="phone-screen">
                  <div className="ps-status"><span>9:41</span><span>●●● 5G</span></div>

                  {/* Browse frame */}
                  <div className={`ps-frame ${activeFeature === 'browse' ? 'active' : ''}`}>
                    <div className="ps-top">
                      <div className="ps-avatar">T</div>
                      <div><div className="hi">Good afternoon</div><div className="name">Tunde 👋</div></div>
                      <Icon id="i-bell" size={18} style={{ marginLeft: 'auto' }} />
                    </div>
                    <div className="ps-search"><Icon id="i-search" size={14} /> Search meals near Iba…</div>
                    <div className="ps-chips">
                      <span className="ps-chip active">All</span>
                      <span className="ps-chip">Jollof</span>
                      <span className="ps-chip">Swallow</span>
                      <span className="ps-chip">Pasta</span>
                    </div>
                    <div className="ps-card">
                      <div className="ps-card-img" style={{ background: 'linear-gradient(135deg,#ef5543,#a87b08)' }} />
                      <div className="ps-card-body"><span className="n">Jollof Rice Combo</span><span className="m">★ 4.8 · 25 min · ₦1,500</span></div>
                      <span className="p">₦1,500</span>
                    </div>
                    <div className="ps-card">
                      <div className="ps-card-img" />
                      <div className="ps-card-body"><span className="n">Amala & Ewedu</span><span className="m">★ 4.7 · 20 min · ₦1,500</span></div>
                      <span className="p">₦1,500</span>
                    </div>
                    <div className="ps-card">
                      <div className="ps-card-img" style={{ background: 'linear-gradient(135deg,#3cb371,#1b5e38)' }} />
                      <div className="ps-card-body"><span className="n">Pepper Spaghetti</span><span className="m">★ 4.8 · 25 min · ₦1,800</span></div>
                      <span className="p">₦1,800</span>
                    </div>
                  </div>

                  {/* Track frame */}
                  <div className={`ps-frame ${activeFeature === 'track' ? 'active' : ''}`}>
                    <div className="ps-top">
                      <div className="ps-avatar" style={{ background: 'var(--brown-900)', color: 'var(--gold-400)' }}>◀</div>
                      <div><div className="hi">Order #SS-4421</div><div className="name">Being prepared</div></div>
                    </div>
                    <div className="ps-track">
                      <span className="state">🍳 KITCHEN IS COOKING</span>
                      <span className="eta">Est. arrival 3:12 PM</span>
                      <div className="bar"><div style={{ width: '45%' }} /></div>
                      <div className="ps-track-steps">
                        <span>✓ Placed</span>
                        <span style={{ color: 'var(--gold-700)' }}>● Cooking</span>
                        <span>En route</span>
                        <span>Delivered</span>
                      </div>
                    </div>
                    <div style={{ background: 'var(--cream-200)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>Need help?</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted-dark)' }}>Chat with our team now</div>
                      </div>
                      <div style={{ background: 'var(--brown-900)', color: 'var(--text-light)', borderRadius: 999, padding: '7px 14px', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>Chat</div>
                    </div>
                  </div>

                  {/* Pay frame */}
                  <div className={`ps-frame ${activeFeature === 'pay' ? 'active' : ''}`}>
                    <div className="ps-top">
                      <div className="ps-avatar"><Icon id="i-card" size={18} /></div>
                      <div><div className="hi">Checkout</div><div className="name">Payment</div></div>
                    </div>
                    <div className="ps-search" style={{ background: 'var(--brown-900)', color: 'var(--gold-300)', justifyContent: 'space-between' }}>
                      <span>•••• •••• •••• 4217</span><span>▾</span>
                    </div>
                    <div className="ps-chips">
                      <span className="ps-chip active">Card</span>
                      <span className="ps-chip">Transfer</span>
                      <span className="ps-chip">USSD</span>
                      <span className="ps-chip">Cash</span>
                    </div>
                    <div style={{ background: 'var(--cream-200)', borderRadius: 14, padding: 14, display: 'grid', gap: 4 }}>
                      <div className="ps-pay-row"><span>Subtotal</span><span>₦3,300</span></div>
                      <div className="ps-pay-row"><span>Delivery (Iba)</span><span>₦0</span></div>
                      <div className="ps-pay-row"><span>Spots discount</span><span style={{ color: 'var(--green-500)' }}>−₦200</span></div>
                      <div className="ps-pay-row ps-pay-total"><span>Total</span><span>₦3,100</span></div>
                    </div>
                    <div className="ps-btn">Pay ₦3,100</div>
                  </div>

                  {/* Spots rewards — coming soon
                  <div className={`ps-frame ${activeFeature === 'rewards' ? 'active' : ''}`}>
                    <div className="ps-top">
                      <div className="ps-avatar" style={{ background: 'var(--red-500)', color: '#fff' }}>✦</div>
                      <div><div className="hi">Your Spots</div><div className="name">Gold tier</div></div>
                    </div>
                    <div style={{ background: 'linear-gradient(135deg,#f1c232,#d4a017)', borderRadius: 16, padding: 18, color: 'var(--brown-900)', display: 'grid', gap: 6, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Balance</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: '-0.02em' }}>2,840 Spots</span>
                      <span style={{ fontSize: 11, opacity: 0.7 }}>160 more spots to Platinum</span>
                    </div>
                    <div className="ps-card">
                      <div className="ps-card-img" style={{ background: 'var(--brown-900)', display: 'grid', placeItems: 'center', color: 'var(--gold-400)', fontSize: 22 }}>🍗</div>
                      <div className="ps-card-body"><span className="n">Free Peppered Chicken</span><span className="m">1,500 Spots</span></div>
                      <span className="p">Redeem</span>
                    </div>
                    <div className="ps-card">
                      <div className="ps-card-img" style={{ background: 'var(--red-500)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 22 }}>🛵</div>
                      <div className="ps-card-body"><span className="n">Free delivery (3×)</span><span className="m">800 Spots</span></div>
                      <span className="p">Redeem</span>
                    </div>
                  </div>
                  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section className="section-pad on-cream-100">
        <div className="wrap">
          <div className="newsletter">
            <div>
              <span className="eyebrow" style={{ color: 'var(--brown-900)' }}>Stay in the loop</span>
              <h2 className="display h2" style={{ marginTop: 14 }}>
                Awoof, combos, <em className="italic-swash">free delivery</em> Fridays.
              </h2>
              <p className="body-lg">
                Get weekly Lagos food tips, new kitchen alerts, and first dibs on limited combos by email or WhatsApp. No spam, we promise.
              </p>
            </div>
            <form className="newsletter-form" onSubmit={e => { e.preventDefault(); setNewsSent(true) }}>
              <div className="channel-switch">
                <button type="button" className={`channel-btn ${newsChannel === 'email'    ? 'active' : ''}`} onClick={() => setNewsChannel('email')}>Email</button>
                <button type="button" className={`channel-btn ${newsChannel === 'whatsapp' ? 'active' : ''}`} onClick={() => setNewsChannel('whatsapp')}>WhatsApp</button>
              </div>
              <div className="input-row">
                <input
                  type={newsChannel === 'email' ? 'email' : 'tel'}
                  placeholder={newsChannel === 'email' ? 'you@example.com' : '+234 816 000 0000'}
                  value={newsValue}
                  onChange={e => setNewsValue(e.target.value)}
                  aria-label={newsChannel === 'email' ? 'Email address' : 'Phone number'}
                />
                <button className="btn btn-dark newsletter-submit-btn" type="submit">
                  {newsSent ? (
                    <>
                      <span className="mobile-only">✓</span>
                      <span className="desktop-only">Subscribed ✓</span>
                    </>
                  ) : (
                    <>
                      <span className="desktop-only">Subscribe</span>
                      <Icon id="i-arrow-right" size={14} />
                    </>
                  )}
                </button>
              </div>
              <div className="newsletter-note">
                <Icon id="i-bell" size={12} /> Unsubscribe anytime.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="section-pad on-cream spy-offset">
        <div className="wrap">
          <div className="faq-grid">
            <div>
              <span className="eyebrow" style={{ color: 'var(--gold-700)' }}>FAQ</span>
              <h2 className="display h2" style={{ marginTop: 14 }}>
                Quick questions, <em className="italic-swash">straight</em> answers.
              </h2>
              <p className="body" style={{ marginTop: 16, color: 'var(--text-muted-dark)' }}>
                Still stuck? Ring us on <strong>+234 816 339 5600</strong> or email{' '}
                <a href="mailto:admin@surespot.ng" style={{ textDecoration: 'underline' }}>admin@surespot.ng</a>, a real human will reply.
              </p>
              <a className="btn btn-ghost-dark" href="#contact" style={{ marginTop: 18 }}>
                Contact support <Icon id="i-arrow-right" size={14} />
              </a>
            </div>
            <div className="faq-list">
              {FAQ_ITEMS.map((f, i) => (
                <div key={i} className={`faq-item ${faqOpen === i ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} aria-expanded={faqOpen === i}>
                    <span>{f.q}</span>
                    <span className="icon"><Icon id="i-plus" size={14} /></span>
                  </button>
                  <div className="faq-a"><div><p>{f.a}</p></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer id="contact" className="site">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot foot-brand">
              <img src={logo} alt="Surespot" style={{ height: 64, width: 'auto', objectFit: 'contain' }} />
              <p>Surespot Eatery brings your favourite Lagos meals fast and sure, from our own kitchens to your doorstep, hot and on time.</p>
              <div className="badges">
                <a href="#" className="store-badge-img">
                  <img src={appStoreBadge} alt="Download on App Store" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
                </a>
                <a href="#" className="store-badge-img">
                  <img src={googlePlayBadge} alt="Get it on Google Play" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
                </a>
              </div>
            </div>
            <div className="foot">
              <h4>Opening Hours</h4>
              <ul><li>Mon–Sun: 09:00 AM to 10:00 PM</li></ul>
            </div>
            <div className="foot">
              <h4>Contact Us</h4>
              <ul>
                <li>1, Iba Junction Bus Stop, Lasu Isheri Road</li>
                <li>Iba, Ojo, Lagos State</li>
                <li><a href="tel:+2348163395600">+234 816 339 5600</a></li>
                <li><a href="mailto:admin@surespot.ng">admin@surespot.ng</a></li>
              </ul>
            </div>
            <div className="foot">
              <h4>Other Links</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/support">Support</Link></li>
                <li><a href="#join">Ride with us</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Surespot Foods Ltd. Made in Lagos.</span>
            <span>Fast <span style={{ color: 'var(--gold-400)' }}>&amp;</span> Sure.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
