/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1DB954',
          hover: '#1ed760',
        },
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'progress-fast': 'progress 4s ease-in-out infinite',
        'in': 'in 0.7s ease-out',
        'fade-in': 'fadeIn 0.7s ease-out',
        'slide-in-from-bottom-4': 'slideInFromBottom 0.7s ease-out',
      },
      keyframes: {
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(1rem)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        in: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.hover'),
              },
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.DEFAULT'),
            },
            strong: {
              color: theme('colors.white'),
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.primary.DEFAULT'),
            },
            h3: {
              color: theme('colors.gray.200'),
            },
            code: {
              color: theme('colors.primary.DEFAULT'),
            },
          },
        },
        emerald: {
          css: {
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-code': theme('colors.primary.DEFAULT'),
            '--tw-prose-quotes': theme('colors.gray[300]'),
            '--tw-prose-quote-borders': theme('colors.primary.DEFAULT'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
