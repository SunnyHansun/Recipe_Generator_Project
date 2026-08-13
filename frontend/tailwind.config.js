/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fdfcfa',
          100: '#f7f4ef',
          200: '#ede8df',
          300: '#ddd4c8',
        },
        sage: {
          50: '#f4f9f4',
          100: '#e3efe4',
          200: '#c5dcc8',
          300: '#9bc4a1',
          400: '#6fa876',
          500: '#4d8c56',
          600: '#3a7043',
        },
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(0,0,0,0.06), 0 8px 24px -8px rgba(0,0,0,0.08)',
        'soft-lg':
          '0 4px 12px -4px rgba(0,0,0,0.06), 0 16px 40px -12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
