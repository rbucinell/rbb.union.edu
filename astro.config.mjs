import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";

// https://astro.build/config
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://rbucinell.github.io/rbb.union.edu/',
  vite: {
    plugins: [ tailwindcss() ],
  },
  integrations: [ icon(), sitemap() ]
});
