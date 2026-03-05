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
}

export default function DocHead() {
  const { pathname } = useLocation()
  const meta = ROUTE_META[pathname] ?? ROUTE_META['/']

  useEffect(() => {
    document.title = meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', meta.description)
  }, [meta.title, meta.description])

  return null
}
