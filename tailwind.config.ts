/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e2c97e',
          dim: '#8a6f30',
        },
        dark: {
          DEFAULT: '#2a1e0e',
          2: '#3a2c16',
          3: '#4a3a20',
        },
        cream: {
          DEFAULT: '#f0ebe0',
          2: '#f5f0e8',
          3: '#ede8dc',
          4: '#d4c4a0',
        },
        stone: '#7a6a50',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'Arial', 'sans-serif'],
        display: ['var(--font-cinzel)', 'serif'],
      },
      letterSpacing: {
        widest2: '0.4em',
        widest3: '0.5em',
      },
      animation: {
        'fade-up': 'fadeUp 1.4s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.8s ease both',
        shimmer: 'shimmer 2s ease infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%,100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
