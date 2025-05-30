import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";




export default defineConfig({
  integrations: [
    starlight({
      title: "Stellar Spectrum Docs",
      // Si quieres, puedes agregar más opciones
    }
 [tailwind()],
),

  ],
});
