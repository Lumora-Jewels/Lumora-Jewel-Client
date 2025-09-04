import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#F4F6FF',
        gold: '#F3C623',
        orange: '#EB8317',
        navy: '#10375C',
      },
      fontFamily: {
        italianno: ['Italianno', 'cursive'],
        josefin: ['Josefin Sans', 'sans-serif'],
      },
      maxWidth: {
        boundary: '1440px',
      },
    },
  },
  plugins: [],
}

export default config