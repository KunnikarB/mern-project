import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pinky: {
          DEFAULT: '#ec4899',
          300: '#f472b6',
          600: '#db2777',
        },
        pinkyDark: '#be185d',
      },
    },
  },
  darkMode: 'class',
} satisfies Config;
