import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import db from '@astrojs/db';


// https://astro.build/config
export default defineConfig({
  site: 'https://crision-olt.github.io/',
  base: '/cio-spotify/',
  integrations: [db(), react(), tailwind({ config: { applyBaseStyles: false } }), sitemap()],
});
