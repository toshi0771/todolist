/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple System Colors
        systemBlue: {
          light: '#007AFF',
          dark: '#0A84FF',
        },
        systemGreen: {
          light: '#34C759',
          dark: '#30D158',
        },
        systemRed: {
          light: '#FF3B30',
          dark: '#FF453A',
        },
        systemGray: {
          light: '#8E8E93',
          dark: '#8E8E93',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'SF Pro Display',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        // Apple Typography Scale
        'large-title': ['34px', { lineHeight: '41px', fontWeight: '700' }],
        'title-1': ['28px', { lineHeight: '34px', fontWeight: '700' }],
        'title-2': ['22px', { lineHeight: '28px', fontWeight: '700' }],
        'title-3': ['20px', { lineHeight: '25px', fontWeight: '600' }],
        'headline': ['17px', { lineHeight: '22px', fontWeight: '600' }],
        'body': ['17px', { lineHeight: '22px', fontWeight: '400' }],
        'callout': ['16px', { lineHeight: '21px', fontWeight: '400' }],
        'subhead': ['15px', { lineHeight: '20px', fontWeight: '400' }],
        'footnote': ['13px', { lineHeight: '18px', fontWeight: '400' }],
        'caption-1': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'caption-2': ['11px', { lineHeight: '13px', fontWeight: '400' }],
      },
      borderRadius: {
        'apple': '10px',
        'apple-lg': '14px',
        'apple-xl': '20px',
      },
      boxShadow: {
        'apple-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        'apple': '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        'apple-lg': '0 4px 16px 0 rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
