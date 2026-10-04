import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Surespot Food Delivery | Lagos',
    description:
      'Order your favorite Surespot meals in Lagos. Fast delivery and pickup, 9AM–10PM daily. Get the app for a simple, reliable food experience.',
  },
  '/terms': {
    title: 'Terms of Service | Surespot',
    description: 'Surespot Terms of Service (Customers). Last updated March 4, 2026.',
  },
  '/privacy': {
    title: 'Privacy Policy | Surespot',
    description: 'Surespot Privacy Policy (Customers). How we collect, use, and protect your information.',
  },
  '/support': {
    title: 'Support | Surespot',
    description:
      'Contact Surespot support by email or phone, get help in the app, and learn how to report order issues.',
  },
}

const SITE = 'https://surespot.ng'

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null
  if (!el) { el = create(); document.head.appendChild(el) }
  el.setAttribute(attr, value)
}

export default function DocHead() {
  const { pathname } = useLocation()
  const meta = ROUTE_META[pathname] ?? ROUTE_META['/']

  useEffect(() => {
    document.title = meta.title
    const url = SITE + (ROUTE_META[pathname] ? pathname : '/')
    const link = (rel: string) => () => Object.assign(document.createElement('link'), { rel })
    const metaTag = (key: string, name: string) => () => {
      const m = document.createElement('meta'); m.setAttribute(key, name); return m
    }
    setTag('meta[name="description"]', metaTag('name', 'description'), 'content', meta.description)
    setTag('link[rel="canonical"]', link('canonical'), 'href', url)
    setTag('meta[property="og:url"]', metaTag('property', 'og:url'), 'content', url)
    setTag('meta[property="og:title"]', metaTag('property', 'og:title'), 'content', meta.title)
    setTag('meta[property="og:description"]', metaTag('property', 'og:description'), 'content', meta.description)
    setTag('meta[name="twitter:title"]', metaTag('name', 'twitter:title'), 'content', meta.title)
    setTag('meta[name="twitter:description"]', metaTag('name', 'twitter:description'), 'content', meta.description)
  }, [meta.title, meta.description, pathname])

  return null
}
