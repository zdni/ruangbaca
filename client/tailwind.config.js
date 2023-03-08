/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        screens: {
          _xs: { raw: '(min-width: 425px)' },
          xs: { raw: '(max-width: 424px)' },
          short: { raw: '(max-height: 650px)' },
          xshort: { raw: '(max-height: 560px)' },
          xxshort: { raw: '(max-height: 490px)' },
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
  }
  