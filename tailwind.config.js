import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e0fb',
          300: '#7cc4f5',
          400: '#3aa3ec',
          500: '#0084ff',
          600: '#0068ff',
          700: '#004a99',
          800: '#003366',
          900: '#002244',
          950: '#001830',
        },
        accent: {
          50: '#fff4ec',
          100: '#ffe2cc',
          200: '#ffb88c',
          300: '#ff9b5c',
          400: '#f48238',
          500: '#e27121',
          600: '#c25a14',
          700: '#9b4510',
          800: '#73320c',
          900: '#4d2108',
        },
        ink: {
          DEFAULT: '#1e293b',
          muted: '#334155',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: [
          '"Be Vietnam Pro"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        display: [
          '"Be Vietnam Pro"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        'section-y': '5rem',
      },
      boxShadow: {
        card: '0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 51, 102, 0.12)',
      },
      borderRadius: {
        card: '0.75rem',
      },
    },
  },
  plugins: [forms, typography, animate],
};
