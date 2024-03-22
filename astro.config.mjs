import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import alpine from '@astrojs/alpinejs';

// https://astro.build/config
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
    sites: 'http://rbb.union.edu',
    output: 'static',
    build: {
        format: 'file'
    },
    integrations: [ tailwind(), sitemap(), alpine() ]
});