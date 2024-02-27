/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-findjob': "url('./src/assets/BG_IT.jpg')"
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#239ce2',
        'sub-blue1': '#5B6D93',
        'sub-blue2': '#CBDCE3',
        'primary-white': '#EEEEE4',
        'primary-black': '#364042',
        'primary-red': '#C06A47',
        'primary-gray': '#8C8A7B',
      }
    },
  },
  plugins: [],
  important: true,
}

