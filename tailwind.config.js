/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [require('@tailwindcss/typography'),
            require('daisyui')],
  daisyui:{
    themes: ['dark',{
      buisness: {
        ...require('daisyui/src/theming/themes')['business'],
        primary: 'blue',
        secondary: 'teal',
        accent: '#923338'
      }
    }]
  }
}

