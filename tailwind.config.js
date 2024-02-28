/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    plugins: [
		require("@tailwindcss/typography"),
      	require('daisyui')
    ],
	theme: {
		/*Primary Palette*/
		colors: {
			'union-red': '#923338;',
			'union-garnet': '#822438',
			'union-stone': '#b3b38c',
			'union-light-stone': '#e4e2d2',
			'union-gray': '#6c6f70',
			'union-white': '#eeeeee',

			'union-gold': '#D7941D;',
			'union-metallic-gold': '#85714D',
			'union-navy': '#003261',
			'union-blue': '#237FA4',
			'union-blue-light': '#5ABCE1',
			'union-green': '#5C8827;',
			'union-green-light': '#AEBC21',
			'union-orange': '#F58F20',
			'union-orange-light': '#FCB54D',

			'rbb-black': '#111111',
			'rbb-dark': '#2b2b2b',
			'rbb-gray': ' #484848',
			'rbb-light': '#303030',
			'rbb-light': '#363636',
			'rbb-lightest': '#aaa',
			'rbb-white': '#f7f7f7',
		},
		extend:{
			backgroundImage: {
				'white-noise': "url(/img/white_noise.jpg)"
			}
		}
	},
    daisyui:{
      themes: [
		{
			rbb: {
				...require("daisyui/src/theming/themes")["corporate"],
				"primary": "#f7f7f7",
				"secondary": "#e4e2d2",
				"accent": "#923338",
				"accent-content": "#991b1b",
				"neutral": "#2b2b2b",
				"base-100": "#111",
				 
				"neutral": "#eeeeee",						 
				"base-100": "#d6d6d6",
				"base-200": "#bebebe",
				"base-300": "#a7a7a7",						 
				"info": "#7dd3fc",						 
				"success": "#16a34a",						 
				"warning": "#ca8a04",						 
				"error": "#991b1b",
				/**
				"primary":"#eeeeee",
				"primary-content":"#eeeeee",
				"secondary":"#eeeeee",
				"secondary-content":"#eeeeee",
				"accent":"#eeeeee",
				"accent-content":"#eeeeee",
				"neutral":"#eeeeee",
				"neutral-content":"#eeeeee",
				"base-100":"#eeeeee",
				"base-200":"#eeeeee",
				"base-300":"#eeeeee",
				"base-content":"#eeeeee",
				"info":"#eeeeee",
				"info-content":"#eeeeee",
				"success":"#eeeeee",
				"success-content":"#eeeeee",
				"warning-content":"#eeeeee",
				"error":"#eeeeee",
				"error-content":"#eeeeee",
				*/
        	},
        },
		{
			courses:{
				
			}
		}]
    }
};