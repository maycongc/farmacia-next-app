/** Tailwind v3 config */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '150ms',
      },
    },
  },
  plugins: [],
  safelist: [
    // Garantir preservação se algum build futuro não detectar @apply
    'focus-visible:ring-2',
    'focus-visible:ring-brand-500',
    'focus-visible:ring-offset-2',
  ],
};
