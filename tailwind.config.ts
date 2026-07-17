import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta calida y natural: verdes, beige y tonos tierra
        forest: {
          DEFAULT: '#2B3D2E',
          deep: '#1B2A1D',
          light: '#4C7A52',
        },
        cream: {
          DEFAULT: '#F6F4EE',
          card: '#FFFFFF',
        },
        sand: '#E7E2D6',
        clay: '#B08B4F',
        rose: {
          DEFAULT: '#C98B87',
          deep: '#A9645F',
        },
        ink: {
          DEFAULT: '#262519',
          soft: '#767462',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 20px rgba(38,37,25,0.07)',
      },
      borderRadius: {
        xl2: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
