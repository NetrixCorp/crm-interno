import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0D0D0D',
          red: '#FF2E2E',
          white: '#FFFFFF',
          'black-soft': '#1A1A1A',
          'gray-dark': '#2C2C2C',
          'gray-light': '#F4F4F2',
          'gray-mid': '#CCCCCC',
        },
      },
    },
  },
  plugins: [],
}

export default config
