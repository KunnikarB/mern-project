import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Doto', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
} satisfies Config;
