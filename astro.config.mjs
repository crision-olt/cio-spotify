import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
  site: 'https://crision-olt.github.io/',
  base: '/cio-spotify/',
  integrations: [ react(), tailwind({ config: { applyBaseStyles: false } }), sitemap()],
});
