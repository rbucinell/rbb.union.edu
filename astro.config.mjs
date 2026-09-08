import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    sites: 'http://rbb.union.edu',
    output: 'static',
    build: {
        format: 'file'
    },
    integrations: [ sitemap() ]
});