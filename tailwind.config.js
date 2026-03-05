/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          active: 'var(--color-gold-active)',
          passive: 'var(--color-gold-passive)',
        },
        text: {
          dark: 'var(--color-text-dark)',
          light: 'var(--color-text-light)',
        },
        arrow: {
          gold: {
            passive: 'var(--color-arrow-gold-passive)',
            active: 'var(--color-arrow-gold-active)',
          },
          grey: {
            passive: 'var(--color-arrow-grey-passive)',
            active: 'var(--color-arrow-grey-active)',
          },
        },
        surface: {
          cream: 'var(--color-bg-cream)',
          brown: 'var(--color-bg-brown)',
        },
      },
    },
  },
  plugins: [],
}
