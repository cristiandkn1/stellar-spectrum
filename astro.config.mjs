import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: "Stellar Spectrum Docs",
      // Puedes agregar más opciones aquí si quieres
    }),
  ],
});
